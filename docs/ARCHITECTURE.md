# Architecture

## The shape of it

This is a **static site with one function attached**. There is no database, no
session store and no server-rendered HTML. Vercel serves the compiled React
bundle from a CDN, and a single serverless function handles the only thing that
genuinely needs a server: sending an email without exposing SMTP credentials to
the browser.

```
Browser
  │
  ├── GET /            ──▶  Vercel CDN  ──▶  client/build/index.html + JS/CSS
  │                                          (SPA rewrite sends every non-/api
  │                                           path here)
  │
  └── POST /api/contact ─▶  api/contact.js (serverless, Node)
                              │  validate → escape → nodemailer
                              ▼
                            SMTP provider  ──▶  your inbox
```

## Why one handler runs in two places

`api/contact.js` is the whole backend. It is deployed by Vercel as a serverless
function, but it is *also* mounted by `server.js` for local development:

```js
// server.js — dev only, never deployed
app.post("/api/contact", require("./api/contact"));
```

This works because the two runtimes agree on the contract the handler uses:
`req.method`, a pre-parsed `req.body`, and `res.status().json()`. Vercel's Node
runtime provides those natively; Express provides them with `express.json()`.

The alternative was requiring the Vercel CLI (`vercel dev`) for any local work.
Sharing one handler means `npm run dev` is enough, and — more importantly —
there is no second copy of the email logic to drift out of sync. An earlier
version of this repo had exactly that problem: a `netlify/` directory holding a
stale duplicate of the contact controller.

## Request path for the contact form

1. `client/src/pages/Contact/Contact.js` holds form state in a single `form`
   object and submits through a real `<form onSubmit>`.
2. It guards on empty fields and **returns** before the network call. (This is
   worth stating because the original code showed an error toast and then sent
   the request anyway.)
3. `axios.post("/api/contact", form)` — a relative URL. In dev, CRA's `proxy`
   forwards it to `localhost:8080`; in production it resolves against the
   Vercel origin. No `REACT_APP_API_URL` is needed.
4. `api/contact.js` rejects non-POST, drops honeypot submissions, validates
   presence, email shape and length, then sends via Nodemailer.
5. Visitor input is HTML-escaped before interpolation into the mail body, and
   sent as `text` alongside `html`. `replyTo` is set to the sender's address.
6. Errors are logged server-side; the browser gets a generic message so SMTP
   internals aren't leaked.

## Front-end structure

**There is no router.** This surprises people reading the code for the first
time — the site is one page, and `react-scroll` moves between sections by
matching its `to` prop against the `id` on each `<section>`. Those ids
(`home`, `about`, `education`, `techstack`, `projects`, `work`, `contact`) are
the closest thing to routes.

`client/src/utils/navLinks.js` is the single source for the nav list, shared by
`NavLinks.js` and rendered in three contexts — expanded sidebar, collapsed
icon-only sidebar, and mobile menu. Previously this markup was written out
three separate times.

### Content as data

Everything a visitor reads lives in `client/src/utils/`, not in JSX:

| File | Consumed by |
|---|---|
| `profile.js` | `Home`, `About`, `Contact`, `Menus`, `App` footer |
| `projects.js` | `Projects` → `ProjectCard` |
| `work.js` | `WorkExp` → `TimelineItem` |
| `education.js` | `Education` → `TimelineItem` |
| `TechstackList.js` | `Techstack` |
| `navLinks.js` | `NavLinks` |

`ProjectCard` and `TimelineItem` are the shared renderers. Before they existed,
`Projects.js` repeated a near-identical card block six times and the two
timeline pages repeated their element markup five times with identical inline
style objects.

### Theming

`ThemeContext` sets `data-theme` on `<html>` and mirrors it to `localStorage`.
On first visit it falls back to `prefers-color-scheme`. Both storage calls are
wrapped in `try/catch` because `localStorage` throws in some privacy modes, and
an unhandled throw during render would blank the page.

Dark mode works by **swapping token values**, not by re-declaring component
rules:

```css
:root            { --surface: #ffffff; --text: #1e1e2c; }
:root[data-theme="dark"] { --surface: #6d3357; --text: #f4eee0; }
```

Any new component that uses `var(--surface)` and `var(--text)` gets both themes
for free. The earlier approach — one `#dark` rule plus hardcoded
`background: "white"` inline on child components — meant dark mode was only
half applied.

### Layout and breakpoints

The desktop sidebar is `position: fixed`, so every section offsets itself by
the sidebar's width. That width is published as a custom property that
`Sidebar.js` updates when it collapses:

```js
document.documentElement.style.setProperty(
  "--sidebar-width", expanded ? "200px" : "90px"
);
```

Sections then use `margin-left: var(--sidebar-width)` inside a
`@media (min-width: 992px)` block. Previously each section hardcoded its own
offset (200px, 140px, 130px, 120px, 150px…) which neither matched the sidebar
nor responded to collapsing.

The breakpoint is **992px**, applied consistently: the sidebar hides below
`991.98px` and the mobile nav hides at `992px` and up. The original code cut
over at exactly `600px` in both directions, which left the 601–991px tablet
range showing the sidebar with content squeezed underneath — and made the
behaviour at precisely 600px ambiguous.

## Known constraints

- **Client-side rendering only.** Crawlers that don't execute JavaScript get an
  empty `<div id="root">`. Meta tags, Open Graph and JSON-LD are static in
  `index.html`, so link previews and social sharing work correctly — but the
  body content is invisible to non-JS crawlers. If organic search ranking
  becomes a goal, migrating to Next.js is the real fix.
- **Bootstrap CSS is loaded from a CDN**, so its version isn't tracked in
  `package.json`. Only the grid and a few utility classes are used. (The
  Bootstrap JS bundle and Popper were also loaded but never used — they have
  been removed.)
- **Project card images are hotlinked stock photos.** They should be replaced
  with real screenshots; see `client/src/utils/projects.js`.

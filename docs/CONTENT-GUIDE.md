# Content guide

Every piece of text and every link a visitor sees comes from
`client/src/utils/`. You should not need to edit any JSX to make this portfolio
your own.

After editing, `npm run dev` hot-reloads immediately.

---

## `profile.js` — who you are

Used by the hero, About section, footer, sidebar photo and contact links.

```js
export const profile = {
  name: "Beerappa Methre",
  role: "Backend Software Engineer",
  headlines: ["FullStack Developer!", "Mern Stack Developer!"],
  bio: `...`,
  whatsapp: "916363101185",
  resumeFileName: "beerappa-methre-resume.pdf",
};
```

| Field | Notes |
|---|---|
| `name` | Appears in the mobile nav title, footer, and image alt text |
| `role` | Used in the About image alt text |
| `headlines` | Strings the typewriter cycles through. Add as many as you like |
| `bio` | One template literal. Line breaks in the source don't render — it's a single paragraph |
| `whatsapp` | **Digits only, including country code, no `+`.** Builds `https://wa.me/<number>` |
| `resumeFileName` | The filename the visitor's browser saves the PDF as |

`socials` in the same file drives the contact icons:

```js
{ _id: 1, name: "LinkedIn", url: "https://…", color: "#0a66c2" }
```

`name` must be one of `LinkedIn`, `GitHub` or `Facebook` — it maps to an icon
in `Contact.js` via `SOCIAL_ICONS`. To add another network, add an entry to
that map alongside an icon import.

---

## `projects.js` — the project cards

```js
{
  _id: 1,
  title: "Ghar Dekho",
  category: "Full Stack",          // the badge on the card corner
  tags: ["React", "Node.js"],      // the pill badges under the image
  url: "https://…",                // where "View" goes
  image: "https://…",              // card image
  description: "…",                // shown on the card body
}
```

`_id` must be unique — it's the React list key. Cards render in array order, so
put your strongest work first.

> **Replace the images.** Every `image` is currently a hotlinked stock photo
> from Unsplash, futurecdn or themewagon. Stock photography on project cards
> reads as placeholder to anyone reviewing this portfolio, and hotlinking means
> the image can disappear without warning. Take a screenshot of each project,
> save it under `client/src/assets/images/projects/`, then import and reference
> it:
>
> ```js
> import gharDekho from "../assets/images/projects/ghar-dekho.png";
> // …
> image: gharDekho,
> ```
>
> Aim for roughly 600×400 and compress before committing — see
> [Images](#images) below.

---

## `work.js` — work experience timeline

```js
{
  _id: 1,
  title: "Software Engineer 1",
  subtitle: "Cogneo Technologies",
  date: "Aug 2024 - Present",
  points: ["Engineered high-performance APIs…", "…"],
}
```

`points` renders as a bulleted list. Write each entry as a plain sentence —
don't add `•` or `<br />`, the list markup handles that.

Newest role first.

---

## `education.js` — education timeline

```js
{ _id: 1, title: "B.Tech", subtitle: "IIIT Guwahati, Assam", date: "2020 - 2024" }
```

Same shape as `work.js` without `points`. Most recent first.

---

## `TechstackList.js` — the tech grid

```js
{ _id: 1, name: "Python", icon: SiPython }
```

`icon` is a component reference from [react-icons](https://react-icons.github.io/react-icons/) —
import it at the top of the file, and pass the component itself, **not** JSX
(`SiPython`, not `<SiPython />`).

---

## `navLinks.js` — the navigation

```js
{ _id: 1, to: "home", label: "Home", icon: FcHome }
```

`to` must match the `id` on the corresponding `<section>` — `react-scroll`
resolves targets by DOM id. If you add a section, you must do both: give the
section an `id`, and add a matching entry here.

---

## Assets

### Resume

Replace `client/public/resume.pdf`. Keep the filename — `Home.js` links to
`/resume.pdf`. It lives in `public/` rather than `src/` so the ~190 KB file is
fetched on click instead of being pulled into the JS bundle.

### Images

Replace `client/src/assets/images/Git.jpeg` with your own photo (used in the
sidebar at 180×180 and in About).

The current file is **225 KB**, which is far larger than needed for the sizes
it's displayed at. Before committing a replacement, compress it —
[Squoosh](https://squoosh.app/) is the quickest option. Export at roughly
400×500 for About, and prefer WebP:

```js
import profilePic from "../assets/images/profile.webp";
```

### Favicon and social preview

- Replace `favicon.ico`, `logo192.png` and `logo512.png` in `client/public/` —
  these are still the default React logo.
- Add `og-image.png` (1200×630) to `client/public/`. Without it, links shared
  to LinkedIn, Slack or WhatsApp show no preview image.

---

## Site metadata

These aren't in `utils/` — edit them directly:

| File | What to change |
|---|---|
| `client/public/index.html` | `<title>`, description, author, canonical URL, Open Graph and Twitter tags, JSON-LD `Person` block |
| `client/public/manifest.json` | App name and theme colour |
| `client/public/robots.txt` | The `Sitemap:` URL |
| `client/public/sitemap.xml` | The `<loc>` URL |

All four contain the placeholder domain `https://beerappa-portfolio.vercel.app`.
Replace it everywhere once you know your real URL.

---

## Colours

Colours are design tokens at the top of `client/src/index.css`. Change a value
once and it applies everywhere, in both themes:

```css
:root {
  --accent: #138781;      /* headings, buttons, timeline titles */
  --highlight: #f29f67;   /* hover states, active nav, focus rings */
  --ink: #1e1e2c;         /* nav background, hero background */
  --gold: #e0b50f;        /* typewriter text, tag badges */
}

:root[data-theme="dark"] {
  --bg: #5f264a;
  /* …only the tokens that differ need redefining */
}
```

Avoid hardcoding hex values in component CSS — a colour that isn't a token
won't respond to the theme switch.

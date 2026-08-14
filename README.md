# Portfolio — Beerappa Methre

A single-page personal portfolio: React front end, with a serverless contact
form that delivers messages over SMTP. Deployed on Vercel.

> **Live:** _add your Vercel URL here once deployed_

---

## Features

- **One-page scroll layout** — Home, About, Education, Tech Stack, Projects,
  Work Experience and Contact, navigated by smooth-scroll anchors.
- **Light / dark theme** that remembers your choice and honours your OS
  `prefers-color-scheme` on first visit.
- **Working contact form** — posts to a serverless function that sends you an
  email, with `replyTo` set to the sender so you can reply directly.
- **Spam-resistant** via a honeypot field, with input escaping and length
  limits on the server.
- **Responsive** across mobile, tablet and desktop; a collapsible sidebar on
  desktop and a hamburger menu below 992px.
- **Accessible** — semantic landmarks, keyboard-operable controls, visible
  focus rings, a skip link, and reduced-motion support.
- **Content lives in data files**, not JSX — see [Customising](#customising).

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 18 (Create React App) |
| Styling | Plain CSS with custom-property design tokens + Bootstrap 5 grid (CDN) |
| Navigation | `react-scroll` anchors — no router, it's one page |
| Animation | `typewriter-effect`, `react-vertical-timeline-component` |
| Notifications | `react-toastify` |
| API | One Vercel serverless function (Node.js) |
| Email | Nodemailer over SMTP |
| Local dev API | Express (`server.js`) — not deployed |
| Hosting | Vercel |

## Project structure

```
.
├── api/
│   └── contact.js          # serverless handler — the entire backend
├── client/                 # Create React App front end
│   ├── public/             # index.html (meta/SEO), manifest, robots, sitemap, resume.pdf
│   └── src/
│       ├── components/     # Sidebar, Menus, MobileNav, NavLinks, ProjectCard, TimelineItem
│       ├── context/        # ThemeContext — light/dark, persisted
│       ├── pages/          # One folder per section, each with its own CSS
│       ├── utils/          # ← all site content lives here
│       └── index.css       # design tokens + global styles
├── docs/                   # architecture, deployment, content guide
├── server.js               # local-dev-only Express wrapper around api/contact.js
├── vercel.json             # build + SPA rewrite config
└── .env.example            # copy to .env
```

## Quick start

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone <your-repo-url>
cd Portfoliyo

# install both halves
npm install
npm install --prefix client

# configure email credentials
cp .env.example .env      # then edit .env with real values
```

Run the front end and the dev API together:

```bash
npm run dev
```

- Front end → <http://localhost:3000>
- Dev API → <http://localhost:8080>

CRA proxies `/api/*` to port 8080 (see `proxy` in `client/package.json`), so the
contact form works locally exactly as it does in production.

### Other scripts

| Command | What it does |
|---|---|
| `npm run dev` | Front end + dev API together |
| `npm run client` | Front end only |
| `npm run server` | Dev API only (nodemon) |
| `npm run build` | Production build into `client/build` |
| `npm test` | Front-end test suite |
| `npm run lint` | ESLint over `api/` and `server.js` |

## Environment variables

Set these in `.env` locally, and in **Vercel → Project → Settings →
Environment Variables** for deployments.

| Variable | Required | Description |
|---|---|---|
| `SMTP_HOST` | yes | SMTP server hostname, e.g. `smtp.gmail.com` |
| `SMTP_PORT` | yes | `587` (STARTTLS) or `465` (implicit TLS) |
| `SMTP_USERNAME` | yes | SMTP account username |
| `SMTP_PASSWORD` | yes | SMTP password — for Gmail, an [App Password](https://myaccount.google.com/apppasswords) |
| `SMTP_FROM_EMAIL` | yes | Address messages are sent *from* |
| `CONTACT_TO_EMAIL` | no | Where messages land. Defaults to `SMTP_FROM_EMAIL` |
| `PORT` | no | Local dev API port. Default `8080`. Unused on Vercel |

## API

### `POST /api/contact`

**Request**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "msg": "Hello!",
  "website": ""
}
```

`website` is the honeypot — the form renders it hidden and empty. If it arrives
non-empty the request is treated as a bot, answered `200`, and no mail is sent.

**Responses**

| Status | Body | When |
|---|---|---|
| `200` | `{ "success": true, "message": "Your message was sent successfully" }` | Sent (or silently dropped as spam) |
| `400` | `{ "success": false, "message": "Please provide all fields" }` | Missing field, malformed email, or over the length limit |
| `405` | `{ "success": false, "message": "Method not allowed" }` | Non-POST request |
| `500` | `{ "success": false, "message": "Sorry, the message could not be sent…" }` | SMTP failure — details are logged server-side only |

Limits: `name` ≤ 100, `email` ≤ 200, `msg` ≤ 5000 characters.

## Customising

All content is data, not markup. To make this portfolio your own, edit these
files — you should not need to touch any JSX:

| File | Contains |
|---|---|
| `client/src/utils/profile.js` | Name, role, bio, typewriter headlines, WhatsApp number, social links |
| `client/src/utils/projects.js` | Project cards |
| `client/src/utils/work.js` | Work experience timeline |
| `client/src/utils/education.js` | Education timeline |
| `client/src/utils/TechstackList.js` | Tech stack icons |
| `client/src/utils/navLinks.js` | Sidebar / mobile nav items |

Then swap the assets: `client/public/resume.pdf`,
`client/src/assets/images/profile.jpg`, `client/public/og-image.jpg`, and the
favicon set in `client/public/`.

Point the site at your domain in one step — this rewrites `index.html`,
`robots.txt` and `sitemap.xml` together:

```bash
npm run set-domain -- https://your-real-domain.com
```

See [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) for field-by-field detail.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — how the pieces fit together and why
- [Deployment](docs/DEPLOYMENT.md) — deploying to Vercel step by step
- [Content guide](docs/CONTENT-GUIDE.md) — editing your own content

## License

[MIT](LICENSE)

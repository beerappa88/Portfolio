# Deployment (Vercel)

Vercel serves `client/build` from its CDN and runs `api/contact.js` as a
serverless function. `server.js` is **not** deployed — it exists only so local
development works without the Vercel CLI.

## One-time setup

### 1. Push to a Git remote

Vercel deploys from GitHub, GitLab or Bitbucket.

```bash
git init                    # if not already a repo
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Confirm `.env` is **not** in the commit before pushing:

```bash
git ls-files | grep -i "\.env$"     # must print nothing
```

### 2. Import the project

In the [Vercel dashboard](https://vercel.com/new), import the repository.

`vercel.json` already declares the build, so the defaults should be left alone:

| Setting | Value | Source |
|---|---|---|
| Framework preset | Other | — |
| Build command | `npm install --prefix client && npm run build --prefix client` | `vercel.json` |
| Output directory | `client/build` | `vercel.json` |
| Install command | `npm install` | default (installs `nodemailer` for the function) |

The `rewrites` rule in `vercel.json` sends every non-`/api` path to
`index.html`, so deep links and refreshes don't 404.

### 3. Add environment variables

**Settings → Environment Variables.** Add each of these for *Production*,
*Preview* and *Development*:

| Variable | Example |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USERNAME` | `you@gmail.com` |
| `SMTP_PASSWORD` | Gmail [App Password](https://myaccount.google.com/apppasswords) |
| `SMTP_FROM_EMAIL` | `you@gmail.com` |
| `CONTACT_TO_EMAIL` | `you@gmail.com` |

Do **not** set `PORT` — Vercel manages the runtime.

> Environment variables are read at function invocation, but changing one does
> not update an existing deployment. **Redeploy after editing them.**

### 4. Deploy

Vercel builds on push. Verify on the deployment URL:

- [ ] Page loads, styling applied, sidebar and mobile nav both behave
- [ ] Theme toggle works and survives a refresh
- [ ] Resume downloads from `/resume.pdf`
- [ ] Contact form sends and the email arrives
- [ ] A deep link like `/#projects` loads without a 404

### 5. Update the URLs

Three files still contain the placeholder domain
`https://beerappa-portfolio.vercel.app`. Replace it with your real URL:

- `client/public/index.html` — `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`
- `client/public/robots.txt` — the `Sitemap:` line
- `client/public/sitemap.xml` — `<loc>`

Also add an `og-image.png` (1200×630) to `client/public/` — without it, link
previews on LinkedIn and WhatsApp will show no image.

## Custom domain

**Settings → Domains → Add.** Vercel issues the TLS certificate automatically.
For an apex domain, point an `A` record at Vercel's IP; for a subdomain, a
`CNAME` to `cname.vercel-dns.com`. Remember to update the URLs from step 5.

## Preview deployments

Every push to a non-production branch gets its own URL. Because preview
deployments use the same environment variables, **a test submission from a
preview sends a real email** — keep that in mind when testing.

## Testing the function locally

`npm run dev` covers day-to-day work. To exercise the actual Vercel runtime:

```bash
npm i -g vercel
vercel dev
```

This reads `.env`, serves the built front end and runs `api/contact.js` as it
would in production. Use it when debugging something that behaves differently
deployed than under Express — a body-parsing or header difference, for example.

Direct check of the endpoint:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","msg":"Hello"}'
```

## Rollback

**Deployments** tab → pick a known-good deployment → **⋯ → Promote to
Production**. This is instant and needs no rebuild, since Vercel keeps every
previous build.

To roll back the source as well:

```bash
git revert <bad-commit>
git push
```

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Form returns 500 | Wrong SMTP credentials, or env vars added without redeploying. Check **Deployments → Functions → Logs** |
| Gmail rejects auth | Regular account password used instead of an App Password |
| Form returns 404 | `api/contact.js` missing from the repo, or the rewrite is swallowing `/api` — confirm `vercel.json` is committed |
| Deep links 404 | `rewrites` missing from `vercel.json` |
| Build fails on missing module | Front-end dependency listed in the root `package.json` instead of `client/package.json` |
| Function fails on `nodemailer` | `nodemailer` must stay in the **root** `package.json` `dependencies` — the function is bundled from the root, not from `client/` |

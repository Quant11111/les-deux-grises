# CLAUDE.md

Guidance for working in this repository.

## What this is

Marketing + catalogue website for **Les Deux Grises**, a show-jumping horse
breeding farm. Bilingual (FR/EN), image-heavy, with a private admin panel to
manage the horse catalogue and the newsletter list.

Live domain: `https://lesdeuxgrises.com` (served with `next start` on port 3001,
typically behind PM2 + a reverse proxy).

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **next-intl** for i18n (`/[locale]/…`, locales `en` default + `fr`)
- **Prisma 5** + **PostgreSQL** (data layer)
- **MUI**, **styled-components** and **CSS Modules** for styling (mixed; CSS
  Modules dominate the public pages)
- **sonner** for toasts
- **@aws-sdk/client-s3** for admin image uploads
- Images stored in **S3**, served through a **CloudFront** CDN
- Package manager: **pnpm** (pinned via `packageManager`; use `corepack pnpm …`)

## Run / build

```bash
corepack pnpm install
corepack pnpm prisma generate          # generate the Prisma client
docker compose up -d                    # local Postgres on 127.0.0.1:5433
corepack pnpm prisma migrate deploy     # apply migrations (or `migrate dev`)
corepack pnpm dev                       # http://localhost:3000
corepack pnpm build && corepack pnpm start   # prod build, served on :3001
```

Copy `.env.example` → `.env` and fill it in. See **Environment** below.

## Project layout

```
src/
  app/
    [locale]/                  public pages (home, about, horses, contact, privacy, admin)
      horses/page.tsx          horse list  (server component → DB)
      horses/[horseId]/        horse detail (server component → DB) + carousel
      admin/                   admin panel (client) + layout (noindex)
    api/
      emails/route.ts          newsletter subscribe/unsubscribe (+ admin-only list)
      admin/                   login, logout, session, horses CRUD, reorder, seed, upload
    db.ts                      Prisma client singleton
  horses/
    horses.json                seed source (legacy data, imported into the DB)
    types.ts                   Horse / Ancestor types (shared)
    horsesRepository.ts        server-only DB access (read + CRUD + seed)
    normalize.ts               prune empty pedigree branches before saving
  server/
    adminAuth.ts               signed httpOnly session cookie + guards
    s3.ts                      S3 upload helper
  ui/                          shared components (Navbar, Footer, Hero, …)
  utils/
    cdn.ts                     build CDN URLs from stored image keys
    themeVariables.ts          brand palette (mirrors globals.css CSS vars)
  i18n/ , middleware.ts        next-intl routing
messages/{en,fr}.json          translations
prisma/                        schema + migrations
```

## Data flow (horses)

Horses live in the **`Horse`** table. Each row stores the full nested object
(general info + pedigree + gallery) in a `data` JSON column, plus mirrored
scalar columns (`name` unique, `category`, `position` for ordering).

- Public reads go through `src/horses/horsesRepository.ts`
  (`getAllHorses`, `getHorseByName`). The horse list and detail pages are
  `export const dynamic = "force-dynamic"` so admin edits show immediately.
- The shape returned is **identical** to the legacy `horses.json` objects, so
  the existing rendering (`HorsePageContent`, `HorsesSection`, `InfoBlock`) is
  untouched — they just receive data via props instead of a static import.
- `src/horses/horses.json` is kept as the **seed source**: the admin "Importer
  depuis horses.json" button (`POST /api/admin/seed`) upserts it into the DB.
  Run this once after the first migration to populate the catalogue.

### Images

Only the S3 **key** is stored on a horse (e.g.
`ldgexportsquentin/horse/nikita/nikitaprofilepic.png`). `cdnUrl(key)` in
`src/utils/cdn.ts` turns it into a full URL. `img` = profile picture, `imgs[]` =
gallery (shown in the carousel on the detail page, before the external link).

## Admin panel

- URL: `/[locale]/admin` (e.g. `/fr/admin`). **Not linked anywhere** — you must
  know the path. The route is `noindex` (see `admin/layout.tsx`).
- Auth: password (`ADMIN_PASSWORD`) → server sets a **signed, httpOnly session
  cookie** (`src/server/adminAuth.ts`). Every admin API route validates the
  cookie server-side via `guardAdmin()`; knowing the URL is not enough.
- Features: full horse CRUD, drag-free reorder (up/down), profile-photo framing
  (move + zoom + preview before validation → `ImageCropper.tsx`), gallery
  management, one-click seed from `horses.json`, and the newsletter email list.
- Image uploads go to S3 (`POST /api/admin/upload`); they fail with a clear 503
  if the S3 env vars are missing.

## Environment

See `.env.example` for the full list. Summary:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | Postgres connection |
| `ADMIN_PASSWORD` | yes | Admin login |
| `ADMIN_SESSION_SECRET` | recommended | Signs the admin session cookie (falls back to `ADMIN_PASSWORD`) |
| `S3_REGION`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | for uploads | Admin image upload to S3 |
| `S3_KEY_PREFIX` | optional | Key prefix (default `ldgexportsquentin/horse`) |
| `S3_ENDPOINT` | optional | Custom S3-compatible endpoint |
| `NEXT_PUBLIC_CDN_URL` | optional | CDN base for image URLs (defaults to current CloudFront) |
| `NEXT_PUBLIC_API_URL` | no | Legacy, currently unused |

If you change `NEXT_PUBLIC_CDN_URL` to a new host, also add it to
`images.remotePatterns` in `next.config.mjs` (Next.js Image allowlist).

## Conventions & gotchas

- **Do not import `horses.json` in components** anymore — read through the
  repository (server) and pass data down as props.
- `src/horses/horsesRepository.ts` and `src/server/*` are **server-only**
  (Prisma / Node APIs). Never import them from a client component.
- The brand palette is defined twice: CSS variables in
  `src/app/[locale]/globals.css` and JS in `src/utils/themeVariables.ts`. Keep
  them in sync; prefer the `rgb(var(--token))` CSS variables in styles.
- Translations live in `messages/{en,fr}.json`. The admin UI is intentionally
  French-only (internal tool) and not translated.
- pnpm isn't on PATH in plain shells here — use `corepack pnpm …`.
```

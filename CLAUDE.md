# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (Next.js on port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint with auto-fix across src/
npm run format       # Prettier format across src/
npm run analyze      # Bundle analysis (sets ANALYZE=true)
```

There are no automated tests in this project.

## Architecture Overview

This is the **public-facing frontend** for Learntech Edu Solutions (learntechww.com) — an education consultancy for study-in-India and study-abroad. The admin panel was split into a separate `learntech-admin` repo; this repo contains only public pages.

### Page & Layout Pattern

Every page in `src/pages/` follows this pattern:

```tsx
Page.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
Page.guestGuard = true   // all public pages use guestGuard
```

`FrontLayout` (`src/@core/layouts/FrontLayout.tsx`) wraps content with the shared `<Header>` and `<Footer>`.

Pages themselves are thin shells — they read the route slug, pass it as a prop to a **view component**, and declare the layout. All UI and data-fetching logic lives in `src/views/<PageName>/`.

### View Component Pattern

Views in `src/views/` follow a consistent structure:
- The view's `index.tsx` fetches data client-side via `useEffect`/`useCallback` using the axios instance from `src/configs/axios.ts`
- Data is passed as `data` props into sub-components under `Components/`
- SEO meta tags (`<title>`, `<meta>`, JSON-LD schema) are set inside the view's `<Head>` block using API-returned fields (`meta_title`, `meta_description`, `meta_keyword`)
- On fetch error, pages redirect to `/404` via `router.push("/404")`

### API & Data Fetching

- **`src/configs/axios.ts`** — public API client; `baseURL` is `NEXT_PUBLIC_API_URI`
- **`src/configs/adminaxios.ts`** — admin API client (used by AuthContext for login/me endpoints)
- All data fetching is **client-side** (no `getServerSideProps` / `getStaticProps`). This means SEO meta tags are rendered after JS loads, not server-side.
- API base: `https://newapi.learntechww.com/`

### Authentication

`src/context/AuthContext.tsx` provides auth state globally. Auth token is stored as a cookie under the key `x-access-token` (set in `src/configs/auth.ts`). On init, the context hits `auth/me` to rehydrate the user.

The `Guard` component in `_app.tsx` wraps every page:
- `guestGuard: true` → renders via `GuestGuard` (no redirect for unauthenticated users — used by all public pages)
- `authGuard: true` (default) → renders via `AuthGuard` (redirects to `/login` if unauthenticated)

### Middleware

`src/middleware.ts` runs on every non-asset request and does two things:
1. **URL redirects** — fetches redirect rules from `${NEXT_PUBLIC_API_URI}redirecturls` and caches them in-memory for 24 hours (Map for O(1) lookups)
2. **Trailing slash normalization** — strips trailing slashes with a 301 redirect

### `src/@core/` Directory

This is the UI framework layer (derived from a MUI admin template). It provides:
- **Theme** (`src/@core/theme/`) — MUI theme with overrides, `ThemeComponent` wraps the app
- **Layouts** — `FrontLayout`, `BlankLayout`, `VerticalLayout`, `HorizontalLayout`
- **Reusable components** — carousels, auth forms, custom MUI wrappers under `src/@core/components/`
- **Settings context** — `src/@core/context/settingsContext` manages theme mode/direction; `themeConfig.ts` sets defaults

### Dynamic Routes

Slug-based pages (e.g., `/university/[...slug]`, `/college/[...slug]`) extract `slug[0]` as the entity ID and pass it to the view. The slug array can contain an ID and a human-readable slug segment; only index 0 (the ID) is used for API calls.

## Environment Variables

```
NEXT_PUBLIC_API_URI       # Backend API base URL (trailing slash required)
NEXT_PUBLIC_IMG_URL       # CDN/image base URL
NEXT_PUBLIC_WEB_URL       # Public site URL (used for canonical tags and schema)
NEXTAUTH_SECRET           # NextAuth secret

```

Local development: uncomment the `# Local` block in `.env` to point at `localhost:5000`.

## TypeScript & Linting Notes

- `noImplicitAny` is disabled; `@typescript-eslint/no-explicit-any` is off — `any` types are used freely throughout
- Most strict TypeScript rules are turned off; only `unused-imports` warnings are enforced
- Icon components (e.g., `FiChevronLeft` from react-icons) must be cast as `React.ElementType` when passed as props to MUI components
- Path alias `src/` maps to the `src/` directory (set via `baseUrl: "."` in tsconfig)



Priority	Action	Page(s)
P0	Migrate dynamic page data to getServerSideProps	All inner pages (news, college, course, exam)
P1	Replace <h6> with <p> in news list sidebar	newsList/index.tsx
P1	Add OG + Twitter Card meta tags	All 4 inner page templates
P1	Add NewsArticle schema to news pages	InnerNewsPage/index.tsx
P1	Fix LCP: add priority to banner image	BannerSec/index.tsx
P2	Add global fallback meta description + robots to _app.tsx	_app.tsx
P2	Fix generic alt text on news images	newsList, BannerSec
P2	Remove console.log from production	InnerNewsPage/index.tsx:24-27
P3	Fix < meta space typo	DisclaimerPage, EducationLoanPage
P3	Fix WebSite SearchAction schema	_app.tsx
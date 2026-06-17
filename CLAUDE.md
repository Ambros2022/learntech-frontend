# CLAUDE.md

# Mission

Build/maintain production-grade web platforms prioritizing:

* SEO
* Performance + core webvitals green
* Crawlability
* Accessibility
* Scalability
* Security
* Maintainability

Supported project types:

* Lead Generation Websites
* Education Portals
* College/University Listing Platforms
* Blogs
* News Portals
* Dynamic CMS Websites
* Directory Platforms

---

# Approved Stack

Frontend

* Next.js 16 App Router
* React 18
* TypeScript

Backend

* Node.js
* Express.js
* MySQL

Deployment

* Vercel / VPS / Coolify
* DigitalOcean

CDN

* Cloudflare Free
* Bunny Free Tier (if approved)

---

# Non-Negotiable Targets

SEO

* 100% crawlable
* 100% indexable
* Canonical correct
* Zero duplicate URLs
* Programmatic SEO ready

Performance

* Lighthouse ≥ 95
* LCP < 2.0s
* INP < 200ms
* CLS < 0.1
* TTFB < 300ms

Accessibility

* Proper heading hierarchy
* Keyboard accessible
* Alt text for images

---

# Core Engineering Rules

1. Server First
2. SEO First
3. Performance First
4. Simplicity Over Complexity
5. Delete Before Adding
6. Native Before Dependency
7. Measure Before Optimizing

---

# Next.js Architecture Rules

Default: Server Components. Client Components only when necessary.

Allowed Client Components:

* Forms
* Filters
* Search
* Modals
* Tabs
* Sliders
* Interactive Widgets

Forbidden:

```tsx
"use client"
```

at page level unless absolutely required.

---

# Rendering Strategy

## Static Content

Tag-based revalidation (preferred for ISR):

```ts
const res = await fetch(API_URL, {
  next: {
    tags: ["entity-slug"]
  }
})
```

Trigger on-demand revalidation:

```ts
revalidateTag("entity-slug")
```

Examples: Blogs, News, Course Pages, College Pages, University Pages

Rendering: SSG, ISR

---

## Real-Time Content

```tsx
fetch(url, {
  cache: "no-store"
})
```

Only when necessary.

---

# Data Fetching Rules

Prefer:

```ts
const res = await fetch(API_URL, {
  next: {
    tags: ["entity-slug"]
  }
})
```

Avoid:

```ts
axios
```

inside Server Components.

Never fetch SEO content in:

```tsx
useEffect()
```

---

# Metadata Rules

Every indexable page must have: Title, Description, Canonical, Open Graph, Twitter Tags.

Use:

```tsx
generateMetadata()
```

Never use:

```tsx
next/head
```

in App Router.

---

# SEO Rules

If Google should rank it → render server-side.

Examples: H1, H2, Content, Listings, Internal Links

Never load ranking content via JavaScript.

---

# Structured Data Rules

JSON-LD only.

Supported: Organization, Article, NewsArticle, FAQPage, Course, BreadcrumbList

Rules:
* Must match visible content
* Must be server rendered
* No fabricated data

---

# URL Rules

Allowed:

```text
/college/123/aiims-delhi
/course/mba
/blog/seo-guide
```

Avoid:

```text
?page=1
?id=123
&type=blog
```

for primary content URLs.

---

# Internal Linking Rules

All important links must exist in HTML.

Examples: Colleges, Courses, Universities, Blogs, Categories

Avoid JS-generated navigation.

---

# Sitemap Rules

Mandatory: Sitemap Index, Split Sitemaps, Max 50,000 URLs per sitemap

Examples: sitemap-colleges.xml, sitemap-courses.xml, sitemap-blogs.xml, sitemap-news.xml

---

# Crawl Budget Rules

Avoid: Infinite filters, Crawl traps, Duplicate routes, Query parameter URLs

Prefer: Clean URLs, Canonicals, Controlled pagination

---

# Image Rules

Mandatory:

```tsx
next/image
```

Requirements: width, height, sizes, lazy loading

Avoid:

```html
<img />
```

unless absolutely necessary.

---

# CSS Load Order Rules

In `src/app/layout.tsx` (root layout), imports must be in this exact order:

```ts
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/globals.css'   // must be last — overrides Bootstrap variables
```

Rules:
* `globals.css` always last so `:root` overrides (e.g. `--bs-body-font-family`) win over Bootstrap defaults
* Never import Bootstrap CSS in nested layouts — only root layout
* Poppins font applied via `--bs-body-font-family` CSS variable override in `globals.css`

---

# Font Rules

Use:

```tsx
next/font
```

Requirements: Self-hosted, font-display: swap

Avoid: Google font CDN requests

---

# Component Architecture

Good

Page (Server)
├── Hero (Server)
├── Content (Server)
├── Listings (Server)
├── Links (Server)
└── Form (Client)

Bad

Page (Client)
├── Fetch
├── SEO Content
├── Metadata
└── Listings

---

# Lazy Loading Rules

Lazy Load (below fold): Testimonials, Sliders, Counters, Videos, Maps

Do NOT Lazy Load: Hero, H1, Content, Internal Links

---

# Dependency Governance Rules

## Core Principle

Every dependency adds: JavaScript, Build time, Security risk, Maintenance cost, Technical debt

Default answer: NO. Dependency must justify existence.

---

# Package Selection Hierarchy

1. Native Browser APIs
2. Next.js Features
3. React Features
4. Small Libraries
5. Large Libraries

---

# Preferred Libraries

Forms: react-hook-form, zod
Validation: zod
Carousel: embla-carousel
Icons: lucide-react
State: React Context
Fetch: native fetch
Animation: CSS, Framer Motion (only when required)
Charts: Recharts
Date: date-fns
Notifications: sonner — always named import: `import { toast } from 'sonner'` (no default export)
Images: next/image
Fonts: next/font

---

# Avoid Heavy Libraries

Avoid: formik, yup, axios, moment, react-multi-carousel, react-spring, aos, swiper, slick-carousel, bootstrap javascript, large icon packs

Use lighter alternatives.

---

# Bundle Budget Rules

Landing Pages: Target < 80KB
Content Pages: Target < 50KB
General Pages: Target < 100KB
Warnings: > 150KB
Failure: > 200KB

---

# Package Approval Checklist

Before installing:
* Can native APIs solve it?
* Can React solve it?
* Can Next.js solve it?
* SSR compatible?
* App Router compatible?
* Tree-shakeable?
* Actively maintained?

If unclear: DO NOT INSTALL.

---

# Package Elimination Rule

When touching code, evaluate:
* Can dependency be removed?
* Can native code replace it?
* Can lighter library replace it?

Goal: Reduce dependencies continuously.

---

# Backend Rules

Use: REST APIs, Typed responses, Validation on all inputs

Avoid: Over-fetching, Under-fetching

---



# Caching Rules

Priority: 1. CDN 2. Next.js Cache 3. ISR 4. Revalidation Tags

Preferred:

```ts
fetch(url, {
  next: {
    tags: ["entity"]
  }
})
```

---

# Security Rules

Mandatory: Input Validation, SQL Injection Protection, Rate Limiting, CSP Headers, Secure Cookies, Secret Isolation

Never expose: Tokens, API Keys, Secrets

---

# Core Web Vitals Enforcement

Build fails if: LCP regresses, CLS regresses, INP regresses

Performance monitoring required.

---

# AI Agent Rules

Always:
* Prefer Server Components
* Prefer SEO-safe implementations
* Prefer lower bundle size
* Prefer deletion over abstraction

Never:
* Introduce hidden logic
* Introduce SEO regressions
* Introduce crawl traps
* Introduce unnecessary dependencies

---

# Debug Checklist

Disable JavaScript. Verify: Content visible, Headings visible, Links visible, Metadata present

If content disappears → fix architecture.

---

# Pre-Merge Checklist

[ ] Metadata exists
[ ] Canonical exists
[ ] JSON-LD exists
[ ] Lighthouse > 95
[ ] No hydration errors
[ ] No console errors
[ ] No duplicate URLs
[ ] No unnecessary client components
[ ] No SEO content rendered client-side
[ ] Bundle size within budget
[ ] Dependency review completed

---

# Final Law

If feature harms: SEO, UI/UX, Performance, Crawlability, Accessibility, Core Web Vitals

IT DOES NOT SHIP.

---

# Reference Architecture (from kerlastudy-Frontend)

Proven patterns from kerlastudy-Frontend. Must adopt here.

---

## ClientWrappers Pattern

Heavy client components lazy-loaded from single `ClientWrappers.tsx`:

```tsx
// src/components/ClientWrappers.tsx
"use client";
import dynamic from "next/dynamic";

export const LazyEnquiryForm = dynamic(
  () => import("@/components/EnquiryForm"),
  { ssr: false, loading: () => <FormSkeleton /> }
);

export const LazyEmblaCarousel = dynamic(
  () => import("@/components/Embla/EmblaCarousel"),
  { ssr: false, loading: () => <CardGridSkeleton count={4} /> }
);
```

Rules:
* All forms: `ssr: false`
* All carousels/sliders: `ssr: false`
* All modals/popups: `ssr: false`
* Every wrapper must have skeleton `loading` fallback to prevent CLS
* Server components import from `ClientWrappers` — not directly

---

## ClientProviders Pattern

Single `"use client"` boundary for all providers (`src/app/components/ClientProviders.tsx`):

```tsx
'use client'
export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>       {/* MUI SSR — keep while any MUI component remains */}
      <AuthProvider>
        <NProgressBar />    {/* route transition bar — showSpinner: false */}
        <BootstrapClient /> {/* Bootstrap JS init */}
        {children}
      </AuthProvider>
    </EmotionRegistry>
  )
}
```

Rules:
* Root layout imports only `ClientProviders` — never individual providers
* `NProgressBar` must call `NProgress.configure({ showSpinner: false })` at module level to prevent "N" spinner rendering
* Remove `EmotionRegistry` only after all MUI components eliminated

---

## AnimateOnScroll Pattern

No AOS, no Framer Motion for scroll animations. Use native `IntersectionObserver`:

```tsx
// src/components/AnimateOnScroll.tsx — "use client"
// Variants: fade-up | fade-down | fade-left | fade-right | zoom-in | fade
// Uses IntersectionObserver + inline styles, zero CSS dependency
```

Rules:
* `once: true` default — animate once, done
* `willChange: "opacity, transform"` for GPU compositing
* Check `getBoundingClientRect` on mount to skip animation if already visible

---

## JsonLd Pattern

XSS-safe JSON-LD serializer — never use raw `JSON.stringify`:

```tsx
// src/components/JsonLd.tsx — Server Component (no "use client")
function serializeJsonLd(schema) {
  return JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(//g, "\\u2028")
    .replace(//g, "\\u2029");
}

export default function JsonLd({ schema, id }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
```

---

## FetchClient Pattern

Replace axios with native `fetch`-based client (`src/utils/fetch.ts`):

```ts
// Axios-compatible interface over native fetch
// Supports: interceptors, params, FormData, AbortError
// baseURL from process.env.API_URL || NEXT_PUBLIC_API_URL
const api = new FetchClient({ baseURL: process.env.API_URL });
export default api;
```

Rules:
* Client Components and API routes only
* Server Components use `fetch()` directly with `next.tags`
* Never import axios

---



---
Many APIs at common location: `src/lib/api/common.ts`



## Breadcrumb Pattern

```tsx
// src/app/components/Breadcrumb.tsx — memo'd
// Props: items: { label: string; href?: string }[]
// Last item: no link, aria-current="page"
// Icon: lucide-react ChevronRight (not a CSS pseudo-element)
export const Breadcrumb = memo(({ items }) => { ... });
```

Always pair with `BreadcrumbList` JSON-LD structured data on same page.

---

## Reusable Generic Components

**Before building a new component, check these first.**

### SearchBar — `src/components/ui/SearchBar/index.tsx`

Generic autocomplete search. Bootstrap-only, no MUI.

```tsx
// Props
interface Props {
  placeholder?: string
  onSearch: (query: string, signal?: AbortSignal) => Promise<SearchItem[]>
  className?: string
}
export interface SearchItem { id: string | number; label: string; href: string }
```

Usage: wrap with a page-specific fetch function, lazy-load via ClientWrappers.

Example — `src/components/ui/SearchBar/BlogSearchBar.tsx`:
```tsx
async function fetchBlogResults(query, signal) { /* fetch + map to SearchItem[] */ }
export default function BlogSearchBar() {
  return <SearchBar placeholder="Search for Blogs" onSearch={fetchBlogResults} />
}
```

Rules:
* `AbortController` ref cancels in-flight requests on new keystroke
* Full-bar focus ring via `focused` state on container (not native input focus ring)
* Idle right: `bi-chevron-down`; text entered: `×` clear button
* Register lazy export in `ClientWrappers.tsx` as `LazyXxxSearchBar`

---

### ScrollTabs — `src/components/ui/ScrollTabs/index.tsx`

Mobile-responsive tab navigation. No carousel dependency.

```tsx
export interface TabItem { id: string; label: string }
interface Props {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (id: string) => void
  className?: string
}
```

Rules:
* Desktop: scrollable flex row
* Mobile: `< >` arrow buttons (`d-md-none`) + overflow scroll
* Mobile shows **2 tabs per page** via CSS module `width: calc(50% - 0.5rem)`
* Active tab auto-scrolls into view via `scrollIntoView`
* Do NOT use `infoBtn` class on scroll container — conflicts with globals `width: 90% !important`
* Active state: `.tabBtn:global(.active)` in CSS module (not `.tabBtn.active`)
* `Breadcrumb` must live in parent server component, not inside `ScrollTabs`

---

### CollegeCard — `src/components/colleges/CollegeCard.tsx`

```tsx
export interface CollegeItem {
  id: number; slug: string; name: string; address: string; banner_image: string
}
```

Link: `/college/{id}/{slug}` — Embla carousel via `LazyCollegeCarousel`.

---

### SchoolCard — `src/components/schools/SchoolCard.tsx`

Same shape as CollegeCard. Link: `/school/{id}/{slug}` — Embla carousel via `LazySchoolsCarousel`.

```tsx
export interface SchoolItem {
  id: number; slug: string; name: string; address: string; banner_image: string
}
```

---

### Card CSS Module Pattern — `CollegeCard.module.css` / `SchoolCard.module.css`

Standard card structure:
* `.card` — border, border-radius, hover lift + shadow
* `.imageWrap` — fixed height 190px, `position: relative` for `next/image fill`
* `.image` — `object-fit: cover`, hover scale
* `.body` — flex column, `flex: 1 1 auto`, `min-width: 0`
* `.title` — truncate via `text-overflow: ellipsis`
* `.location` — icon + text, icon `flex-shrink: 0`, text truncate
* `.actions` — flex row, both buttons `flex: 1 1 0 !important` equal width

New entity card (university, exam, etc.) → copy pattern, change link prefix only.

---

### ReviewSec — `src/views/InnerBoardPage/Components/ReviewSec/index.tsx`

Reusable review + rating component. Props decouple from any specific entity.

```tsx
interface Props {
  entityId: number | string   // college_id / school_id / board_id
  entityName: string          // shown in heading
}
```

Rules:
* Single `useEffect` + `Promise.all` for 3 parallel fetches + `AbortController` cleanup
* Native `fetch` only — no axios
* Registered as `LazyReviewSec` in ClientWrappers (`ssr: false`)
* Dislike API: send `dislike: 1`, not `dislike: 0`

---

### GlobalPopupEnquiry className Rule

```tsx
// CORRECT — caller's className replaces default, not augments it
<a className={className ?? `active btn ${styles.counsellingBtn}`}>

// WRONG — always appends counsellingBtn, overrides custom green/etc
<a className={`${className || 'active btn'} ${styles.counsellingBtn}`}>
```

Use `??` (nullish coalescing) not `||` so caller controls full class string.

---

## CSS Module vs globals.css

| Use CSS Module | Use globals.css |
|---|---|
| Component-specific styles | Site-wide utility classes |
| Page section (BannerSection, etc.) | Shared state classes (`.text-blue`, `.bg-skyBlue`) |
| Overriding Bootstrap for one component | Bootstrap variable overrides |
| Button variants tied to one component | Global button classes (`.freeBtn`, `.writeReviewBtn`) |

Rules:
* `globals.css` `!important` beats CSS module without `!important` — use `!important` in module to win
* CSS module `.class.active` → does NOT match global `active` string — use `.class:global(.active)`
* `100vw` in globals causes overflow (includes scrollbar) → use `100%` instead
* Prefer CSS modules for new component work; migrate globals progressively

---

## formUtils Pattern

Single source of truth for all form utilities — `src/@core/components/popup/formUtils.ts`:

```ts
export const PHONE_RULES: [RegExp, string][] = [...]
export const isValidPhone = (val: string) => PHONE_RULES.every(([re]) => re.test(val))
export const phoneSchema = z.string().refine(isValidPhone, { message: 'Invalid phone number' })

export async function submitEnquiry(fields: Record<string, string>) {
  const fd = new FormData()
  Object.entries(fields).forEach(([k, v]) => fd.append(k, v))
  fd.append('current_url', window.location.href)
  return fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/website/enquiry/post`, { method: 'POST', body: fd })
}
```

Rules:
* Never duplicate `PHONE_RULES`, `isValidPhone`, or phone zod schema in individual form files
* All forms import `phoneSchema` and `submitEnquiry` from `formUtils`
* `contact_number: phoneSchema` in every form zod schema
* `submitEnquiry` auto-appends `current_url` — do not append manually

---

## Form Migration Pattern

All forms: react-hook-form + zod + native fetch. No Formik, Yup, or axios.

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { phoneSchema, submitEnquiry } from 'src/@core/components/popup/formUtils'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string().min(1),
  contact_number: phoneSchema,
  email: z.string().email(),
})

const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
  resolver: zodResolver(schema),
})

const onSubmit = async (data) => {
  await submitEnquiry({ name: data.name, contact_number: data.contact_number, email: data.email })
  toast.success('Submitted!')
  reset()
}
```

Phone input → always use `LazyPhoneInputField` from ClientWrappers via `Controller`.

---

## BannerImage Component

Reusable wrapper for the repeated BannerBG.webp banner pattern — `src/components/ui/BannerImage.tsx`:

```tsx
// Props: alt (required), src, width, height, priority, className
// Defaults: src='/images/icons/BannerBG.webp', width=1400, height=300, priority=true, className='w-100'
import BannerImage from 'src/components/ui/BannerImage'

<BannerImage alt="Boards Banner" />
<BannerImage alt="Custom" src="/images/icons/Other.webp" className="w-100 custom" />
```

Rules:
* Replace every raw `<img src="/images/icons/BannerBG.webp">` with `<BannerImage alt="..." />`
* Never use `<img>` for banner — always `next/image` via this wrapper

---

## EntityCarouselClient Pattern

Generic carousel for college/school entities — `src/components/EntityCarouselClient.tsx`:

```tsx
export interface EntityItem { id: number; slug: string; name: string; address: string; banner_image: string }
export type EntityType = 'college' | 'school'

// Usage — thin wrapper per entity type:
// CollegeCarouselClient: <EntityCarouselClient type="college" items={colleges} />
// SchoolsCarouselClient: <EntityCarouselClient type="school" items={schools} />
```

Rules:
* Always includes hidden `<ul aria-hidden="true">` with all entity links for SEO (Googlebot crawls all links)
* Thin wrappers (`CollegeCarouselClient`, `SchoolsCarouselClient`) re-export `EntityItem` as entity-specific type
* Register as `LazyEntityCarousel` in ClientWrappers

---

## Server/Client SEO Split Pattern for Carousels

Heading + links in server HTML. Carousel JS only for interaction. Used in LatestUpdateSec, EntityCarouselClient.

```tsx
// Server component (index.tsx) — no 'use client'
export default function LatestUpdateSec({ updates }) {
  return (
    <section>
      <h2>...</h2>                               {/* SSR — Googlebot indexes */}
      <ul aria-hidden="true" style={clipRect}>   {/* SSR — all links crawlable */}
        {updates.map(u => <li><a href={...}>{u.name}</a></li>)}
      </ul>
      <CarouselClient updates={updates} />        {/* client boundary — interaction only */}
    </section>
  )
}

// Client component (CarouselClient.tsx) — 'use client'
// Only EmblaCarousel + card rendering. No heading. No links list.
```

clipRect style: `{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0,0,0,0)', whiteSpace:'nowrap' }`

Rules:
* `H1`, `H2`, all entity links → server rendered
* Never put headings inside `'use client'` carousel components
* Use direct `EmblaCarousel` import (not `LazyEmblaCarousel`) when component already has `'use client'`
* `LazyEmblaCarousel` only from server components via ClientWrappers

---

## InnerHeader Pattern

Existing generic banner for page-level headers — `src/views/SimplePage/InnerHeader.tsx`:

```tsx
// Props: title, description, imageSrc, imageAlt, children (search bar slot)
// Already handles: next/image, BannerBG default, responsive layout
// Use for any page with a banner + heading + optional search
import InnerHeader from 'src/views/SimplePage/InnerHeader'

<InnerHeader title="Boards" description="...">
  <LazyBoardSearchBar />
</InnerHeader>
```

Rules:
* Prefer `InnerHeader` over custom BannerSec — it's already optimized
* Add new search bars as children, not hardcoded inside InnerHeader

---

## getNewsList API Notes

`getNewsList` in `src/lib/api/common.ts`:
* Returns array directly — NOT `{ data, totalItems }`. Do not destructure `.data`
* Default `columnname: 'news_date'` may fail if column doesn't exist — always pass `columnname: 'created_at'` explicitly
* Filter by category: pass `{ category_id: N, columnname: 'created_at', size: 10 }`

```ts
// CORRECT
const updates = await getNewsList({ category_id: 8, size: 10, columnname: 'created_at' })

// WRONG — updates will be undefined
const { data: updates } = await getNewsList(...)
```
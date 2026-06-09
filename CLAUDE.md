# CLAUDE.md

# Mission

Build and maintain production-grade web platforms that prioritize:

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

Default:

* Server Components

Use Client Components only when necessary.

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

Trigger on-demand revalidation via:

```ts
revalidateTag("entity-slug")
```

Examples:

* Blogs
* News
* Course Pages
* College Pages
* University Pages

Rendering:

* SSG
* ISR

---

## Real-Time Content

```tsx
fetch(url, {
  cache: "no-store"
})
```

Use only when necessary.

---

# Data Fetching Rules

Always prefer:

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

Every indexable page must include:

* Title
* Description
* Canonical
* Open Graph
* Twitter Tags

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

If Google should rank it:

Render it on the server.

Examples:

* H1
* H2
* Content
* Listings
* Internal Links

Never load ranking content via JavaScript.

---

# Structured Data Rules

Use JSON-LD only.

Supported:

* Organization
* Article
* NewsArticle
* FAQPage
* Course
* BreadcrumbList

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

Examples:

* Colleges
* Courses
* Universities
* Blogs
* Categories

Avoid JS-generated navigation.

---

# Sitemap Rules

Mandatory

* Sitemap Index
* Split Sitemaps
* Max 50,000 URLs per sitemap

Examples

* sitemap-colleges.xml
* sitemap-courses.xml
* sitemap-blogs.xml
* sitemap-news.xml

---

# Crawl Budget Rules

Avoid

* Infinite filters
* Crawl traps
* Duplicate routes
* Query parameter URLs

Prefer:

* Clean URLs
* Canonicals
* Controlled pagination

---

# Image Rules

Mandatory:

```tsx
next/image
```

Requirements:

* width
* height
* sizes
* lazy loading

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

Requirements:

* Self-hosted
* font-display: swap

Avoid:

* Google font CDN requests

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

Lazy Load: below fold

* Testimonials
* Sliders
* Counters
* Videos
* Maps

Do NOT Lazy Load:

* Hero
* H1
* Content
* Internal Links

---

# Dependency Governance Rules

## Core Principle

Every dependency adds:

* JavaScript
* Build time
* Security risk
* Maintenance cost
* Technical debt

Default answer:

NO

Dependency must justify its existence.

---

# Package Selection Hierarchy

1. Native Browser APIs
2. Next.js Features
3. React Features
4. Small Libraries
5. Large Libraries

---

# Preferred Libraries

Forms

* react-hook-form
* zod

Validation

* zod

Carousel

* embla-carousel

Icons

* lucide-react

State

* React Context

Fetch

* native fetch

Animation

* CSS
* Framer Motion (only when required)

Charts

* Recharts

Date

* date-fns

Notifications

* sonner — always named import: `import { toast } from 'sonner'` (no default export)

Images

* next/image

Fonts

* next/font

---

# Avoid Heavy Libraries

Avoid:

* formik
* yup
* axios
* moment
* react-multi-carousel
* react-spring
* aos
* swiper
* slick-carousel
* bootstrap javascript
* large icon packs

Use lighter alternatives whenever possible.

---

# Bundle Budget Rules

Landing Pages

* Target < 80KB

Content Pages

* Target < 50KB

General Pages

* Target < 100KB

Warnings

* > 150KB

Failure

* > 200KB

---

# Package Approval Checklist

Before installing:

* Can native APIs solve it?
* Can React solve it?
* Can Next.js solve it?
* Is it SSR compatible?
* Is it App Router compatible?
* Is it tree-shakeable?
* Is it actively maintained?

If unclear:

DO NOT INSTALL.

---

# Package Elimination Rule

Whenever touching code:

Evaluate:

* Can dependency be removed?
* Can native code replace it?
* Can lighter library replace it?

Goal:

Reduce dependencies continuously.

---

# Backend Rules

Use:

* REST APIs
* Typed responses
* Validation on all inputs

Avoid:

* Over-fetching
* Under-fetching

---



# Caching Rules

Priority

1. CDN
2. Next.js Cache
3. ISR
4. Revalidation Tags

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

Mandatory:

* Input Validation
* SQL Injection Protection
* Rate Limiting
* CSP Headers
* Secure Cookies
* Secret Isolation

Never expose:

* Tokens
* API Keys
* Secrets

---

# Core Web Vitals Enforcement

Build fails if:

* LCP regresses
* CLS regresses
* INP regresses

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

Disable JavaScript.

Verify:

* Content visible
* Headings visible
* Links visible
* Metadata present

If content disappears:

Fix architecture.

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

If a feature harms:

* SEO
* UI/UX
* Performance
* Crawlability
* Accessibility
* Core Web Vitals

IT DOES NOT SHIP.

---

# Reference Architecture (from kerlastudy-Frontend)

These patterns are proven in kerlastudy-Frontend and must be adopted here.

---

## ClientWrappers Pattern

All heavy client components must be lazy-loaded from a single `ClientWrappers.tsx`:

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
* Every wrapper must have a skeleton `loading` fallback to prevent CLS
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
* `NProgressBar` must call `NProgress.configure({ showSpinner: false })` at module level to prevent the "N" spinner rendering
* Remove `EmotionRegistry` only after all MUI components are eliminated

---

## AnimateOnScroll Pattern

No AOS, no Framer Motion for scroll animations. Use the native `IntersectionObserver`:

```tsx
// src/components/AnimateOnScroll.tsx — "use client"
// Variants: fade-up | fade-down | fade-left | fade-right | zoom-in | fade
// Uses IntersectionObserver + inline styles, zero CSS dependency
```

Rules:
* `once: true` by default — animate once, then done
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
    .replace(/ /g, "\\u2028")
    .replace(/ /g, "\\u2029");
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

Replace axios with a native `fetch`-based client (`src/utils/fetch.ts`):

```ts
// Axios-compatible interface over native fetch
// Supports: interceptors, params, FormData, AbortError
// baseURL from process.env.API_URL || NEXT_PUBLIC_API_URL
const api = new FetchClient({ baseURL: process.env.API_URL });
export default api;
```

Rules:
* Use in Client Components and API routes only
* Server Components use `fetch()` directly with `next.tags`
* Never import axios

---

## SafeRouter Pattern

```ts
// src/utils/safeRouter.ts — "use client"
export function useSafeRouter() {
  try {
    const router = useRouter();
    return { push: (url) => router.push(url), isAvailable: true };
  } catch {
    return { push: (url) => (window.location.href = url), isAvailable: false };
  }
}
```

Use instead of `useRouter()` directly in any component that may render outside an App Router context.

---
also many apis are at common palace
(src/lib/api/common.ts)



## Breadcrumb Pattern

```tsx
// src/components/Breadcrumb.tsx — Server Component, memo'd
// Props: items: { label: string; href?: string }[]
// Last item: no link, aria-current="page"
// Icon: lucide-react ChevronRight (not a CSS pseudo-element)
export const Breadcrumb = memo(({ items }) => { ... });
```

Always pair with `BreadcrumbList` JSON-LD structured data on the same page.

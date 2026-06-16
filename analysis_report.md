# Middleware, Config & Dependencies — Analysis & Optimization Report

Based on the Vercel dashboard screenshot, **middleware is consuming 92.6% of Fluid Active CPU time** (4h 17m vs 20m 31s for functions). Here's a breakdown of the issues and recommended fixes.

---

## 1. Middleware ([middleware.ts](file:///c:/projects/learntechww-web/learntech-frontend/src/middleware.ts)) — 🔴 Critical

### Problems Found

| # | Issue | Severity | Impact |
|---|-------|----------|--------|
| 1 | **External API fetch on every cold-start** | 🔴 Critical | Each new edge function instance calls `fetch(redirecturls)`. The in-memory `redirectionsCache` is **per-isolate** — Vercel Edge spins up many isolates, so cache misses are frequent and each one triggers a full API call. |
| 2 | **Linear search with `.find()`** | 🟡 Medium | Every request scans the entire array. If you have 500+ redirect rules, this is O(n) per request. |
| 3 | **Conflicting trailing-slash logic** | 🟡 Medium | Middleware strips trailing slashes, but [next.config.js](file:///c:/projects/learntechww-web/learntech-frontend/next.config.js) has a [redirects()](file:///c:/projects/learntechww-web/learntech-frontend/next.config.js#13-28) function that **adds** trailing slashes (for Vercel requests). This creates redirect loops or unnecessary double-redirects. |
| 4 | **No matcher for static assets is comprehensive enough** | 🟢 Low | The regex matcher is complex and fragile. If any new static extension is introduced, it won't be excluded. |

### Recommendations

#### 1A. Eliminate the runtime API fetch entirely (Best option)

Move redirect rules to **build time** instead of fetching them at runtime in middleware:

```typescript
// next.config.js — fetch redirects at build time
module.exports = {
  async redirects() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}redirecturls`)
    const rules = await res.json()
    return rules.map(r => ({
      source: r.old_url,
      destination: r.new_url,
      permanent: true,
    }))
  },
}
```

> [!IMPORTANT]
> This approach means redirects update on each **deploy**, not in real-time. If you rarely change redirects, this is ideal. If redirects change frequently, use option 1B instead.

#### 1B. If runtime redirects are required — use a `Map` + edge-compatible cache

```typescript
import { NextRequest, NextResponse } from 'next/server'

let redirectMap: Map<string, string> | null = null
let lastCacheTime = 0
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip static files early (belt-and-suspenders with matcher)
  if (pathname.startsWith('/_next/') || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  try {
    const now = Date.now()
    if (!redirectMap || now - lastCacheTime > CACHE_TTL) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}redirecturls`, {
        next: { revalidate: 3600 } // Edge cache hint
      })
      if (res.ok) {
        const rules: { old_url: string; new_url: string }[] = await res.json()
        redirectMap = new Map(rules.map(r => [r.old_url, r.new_url]))
        lastCacheTime = now
      }
    }

    // O(1) lookup instead of O(n) .find()
    const newUrl = redirectMap?.get(pathname)
    if (newUrl) {
      return NextResponse.redirect(new URL(newUrl, request.url), 301)
    }
  } catch (error) {
    console.error('Middleware error:', error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next (Next.js internals)
     * - api routes
     * - static files by extension
     */
    '/((?!_next/|api/|admin/login|thank-you|write-review|app/dashboard(?:/.*)?|.*\\.(?:js|css|json|png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|eot|map)).*)',
  ],
}
```

---

## 2. [next.config.js](file:///c:/projects/learntechww-web/learntech-frontend/next.config.js) — 🟡 Medium

### Problems Found

| # | Issue | Severity |
|---|-------|----------|
| 1 | **`trailingSlash: false` + `skipTrailingSlashRedirect: true`** are contradictory and confusing. Comments say "REMOVE" but they're still present. | 🟡 |
| 2 | **[redirects()](file:///c:/projects/learntechww-web/learntech-frontend/next.config.js#13-28) adds trailing slashes** only for Vercel requests (`x-vercel-id` header), directly conflicting with middleware's trailing-slash stripping. | 🔴 |
| 3 | **`images.domains` is deprecated** in Next.js 14+. Use `images.remotePatterns` instead. | 🟡 |
| 4 | **`swcMinify: true`** is the default since Next.js 13, redundant line. | 🟢 |
| 5 | **`experimental.optimizeCss: true`** requires the `critters` package (which you do have), but this feature is still experimental and can cause issues. | 🟢 |

### Recommended Config

```js
/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: false,
  // Remove skipTrailingSlashRedirect — let Next.js handle it natively

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.learntechww.com' },
      { protocol: 'https', hostname: 'learntechww.com' },
    ],
  },

  async redirects() {
    // Build-time redirects from API (recommended — replaces middleware fetch)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}redirecturls`)
      const rules = await res.json()
      return rules.map(r => ({
        source: r.old_url,
        destination: r.new_url,
        permanent: true,
      }))
    } catch {
      return []
    }
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },

  experimental: {
    optimizeCss: true,
  },
}
```

---

## 3. [package.json](file:///c:/projects/learntechww-web/learntech-frontend/package.json) — 🟡 Medium

### Dependency Issues

| Package | Issue | Action |
|---------|-------|--------|
| `@material-ui/core` (v4) | **Deprecated** MUI v4 legacy package. You also have `@mui/material` v5. Likely unused or only partially used. | 🔴 Audit & remove |
| `@mui/utils` (v7.1.0) | **Version mismatch** — You're on MUI v5 but this is MUI v7. Can cause subtle bugs. | 🟡 Pin to `^5.x` |
| `react-router-dom` (v6) | **Unused in Next.js** — Next.js has its own router. Likely leftover. | 🟡 Audit & remove |
| `axios-mock-adapter` | **Test utility in production deps** — should be in `devDependencies`. | 🟢 Move |
| `react-web-share` + `next-share` | **Duplicate functionality** — both are sharing libraries. | 🟢 Keep one |
| `formik` + `react-hook-form` | **Duplicate functionality** — both are form libraries. | 🟢 Standardize on one |
| `jodit-pro-react` + `jodit-react` | **Two WYSIWYG editors** — keeping both increases bundle. | 🟢 Keep one |
| `react-credit-cards` | Referenced in `resolutions` but **not in dependencies**. Possibly removed but resolution left behind. | 🟢 Clean up |
| `react-draft-wysiwyg` | Referenced in `resolutions` but **not in dependencies**. Stale resolution. | 🟢 Clean up |
| `eslint-config-next` (v13) | **Major version mismatch** with Next.js 14. | 🟡 Update to `14.x` |
| `@types/node` (v18) | Outdated, should match your Node.js version. | 🟢 Update |
| `next export` script | **Removed in Next.js 14** — this command no longer exists. | 🟢 Remove script |

### Bundle Size Concerns

The following large packages are worth auditing for actual usage:
- `chart.js` + `react-chartjs-2` — Only needed if you have actual charts
- `react-spring` — Heavy animation library, consider CSS animations
- `bootstrap` + `react-bootstrap` alongside MUI — **two UI frameworks** is very unusual

---

## 4. Summary of Impact on CPU

The Vercel dashboard shows middleware consuming **92.6%** of CPU. This is almost certainly due to:

1. **Frequent API fetches** — Edge isolates don't share memory, so each new isolate fetches the redirect list from your API. With traffic spikes, this multiplies.
2. **Middleware runs on EVERY matching request** — Even page navigations that will never match a redirect still trigger the full middleware logic.

### Expected improvement from fixes:

| Fix | Expected CPU Reduction |
|-----|----------------------|
| Move redirects to build-time (`next.config.js redirects()`) | **~80-90%** — Eliminates the middleware entirely |
| Use `Map` instead of `.find()` (if keeping middleware) | **~5-15%** — Reduces per-request processing |
| Fix trailing-slash conflicts | **~5%** — Eliminates double-redirect scenarios |

---

## Recommended Priority Order

1. **Move redirect rules to [next.config.js](file:///c:/projects/learntechww-web/learntech-frontend/next.config.js) [redirects()](file:///c:/projects/learntechww-web/learntech-frontend/next.config.js#13-28)** — This alone will likely solve the 92.6% CPU problem
2. **Remove contradictory trailing-slash config** — Fix the conflicting settings
3. **Update `images.domains` to `images.remotePatterns`** — Deprecation fix
4. **Audit & remove duplicate/unused packages** — Reduce bundle size
5. **Update mismatched dependency versions** — `@mui/utils`, `eslint-config-next`

# Pages CPU & Edge Request Audit

> This covers everything **beyond the middleware** (already fixed). These are the next biggest opportunities.

---

## 🔴 Critical — `_document.tsx` Emotion SSR on Every Request

**File**: `src/pages/_document.tsx` (line 54)

`CustomDocument.getInitialProps` renders the full React tree **twice per request** on the server — once to extract critical Emotion CSS, once for the actual HTML. This runs on **every page load** because `_document` uses `getInitialProps` (which disables static optimization globally).

```diff
- CustomDocument.getInitialProps = async ctx => {
-   const cache = createEmotionCache()
-   const { extractCriticalToChunks } = createEmotionServer(cache)
-   ctx.renderPage = () => originalRenderPage({ enhanceApp: ... })
-   ...
- }
```

**Impact**: Every page incurs a double server-render + CSS extraction. This alone can explain a large chunk of function CPU.

> [!IMPORTANT]
> This is standard Emotion + Next.js SSR setup — but it means **no page on your site gets static optimization**. Next.js disables Automatic Static Optimization (ASO) when `_document` uses `getInitialProps`. Every page becomes a server-rendered function call.

**Fix**: Since almost all your content pages are fully client-side (CSR), you can eliminate the `getInitialProps` from `_document` and use a simpler emotion setup. Or, accept the overhead and move the high-traffic pages to ISR/SSG.

---

## 🔴 Critical — 18 Dynamic Pages Are Pure CSR (No SEO, High Edge Load)

**Files**: `college/[...slug].tsx`, `university/[...slug].tsx`, `course/[...slug].tsx`, `blog/[...slug].tsx`, `exam/[...slug].tsx`, `news/[...slug].tsx`, `board/[...slug].tsx`, `school/[...slug].tsx`, `scholarship/[...slug].tsx`, + 8 study-abroad `[...slug].tsx` pages

All 18 are **fully client-side rendered** — the server sends an empty shell, and the browser fetches all the data. This means:

1. **Every crawl by Google/Bing triggers a Vercel function** (to serve the HTML shell) + your API gets hit from the browser on every visit
2. No pre-rendering = **SEO crawlers see empty pages**
3. `getStaticPaths` is **not defined anywhere** — no pages are pre-built at deploy time

### Recommended Fix: Add `getStaticProps` + `getStaticPaths` with ISR

For example, for `college/[...slug].tsx`:

```typescript
export async function getStaticPaths() {
  // fetch the list of college slugs from your API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/website/colleges/slugs`)
  const slugs = await res.json()
  return {
    paths: slugs.map((s: string) => ({ params: { slug: [s] } })),
    fallback: 'blocking', // generate unknown slugs on-demand, then cache
  }
}

export async function getStaticProps({ params }) {
  const [id] = params.slug
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}api/website/college/get/${id}`)
  const data = await res.json()
  return {
    props: { pageData: data },
    revalidate: 60 * 60 * 6, // revalidate every 6 hours
  }
}
```

> [!TIP]
> Use `fallback: 'blocking'` so unknown slugs are generated on first request then cached as static. This is ISR — zero runtime cost for repeat visitors.

---

## 🟡 Medium — Homepage Has Two Duplicate Routes

| Route | File | ISR Revalidate |
|-------|------|----------------|
| `/` | `src/pages/index.tsx` | ❌ commented out |
| `/home` | `src/pages/home/index.tsx` | ✅ 12 hours |

The `/` page has `revalidate` commented out, meaning it **never re-fetches** after the first build. If banners change, the homepage won't update until the next deploy.

**Fix**: Uncomment `revalidate: 60 * 60 * 12` in `src/pages/index.tsx`.

```typescript
return {
  props: { banners: res.data.data || [] },
  revalidate: 60 * 60 * 12, // ← uncomment this
}
```

Also consider removing `/home` if it's a duplicate of `/`.

---

## 🟡 Medium — Sitemap Pages Use SSR (Should Use ISR or Static)

**Files**: `src/pages/sitemap/*.xml.js` (11 files)

These use `getServerSideProps` with `s-maxage=86400` (CDN-cached for 24h). The CDN cache headers are correct, but there's a critical bug:

```typescript
headers: { "Cache-Control": "no-cache" }  // ← sent to YOUR API
```

The fetch to `fetchSitemapXML` sends `no-cache` to your own API — meaning the **API is re-queried every time the CDN's cache expires** (every 24h), which affects your backend. This is fine for 11 niche sitemaps with low traffic, but remove `no-cache` to let your API cache the response too.

```diff
- headers: { "Cache-Control": "no-cache" }
+ // remove this header entirely
```

---

## 🟡 Medium — `_app.tsx` Bootstrap JS via `require()` in `useEffect`

```typescript
useEffect(() => {
  require('bootstrap/dist/js/bootstrap.bundle.min.js')
}, [])
```

This works but causes Bootstrap JS to be **evaluated on every client-side navigation** (because `_app.tsx` re-runs). It should be loaded once via `next/script`:

```typescript
// In _app.tsx JSX, alongside other <Script> tags:
<Script
  src="/bootstrap.bundle.min.js"  // copy to /public first
  strategy="afterInteractive"
/>
```

---

## 🟢 Low — Study-Abroad Pages: Hardcoded API Slug

In `study-in-usa/[...slug].tsx`:
```typescript
await axios.get(`api/website/abroadpagefindone/get/study-in-usa`) // hardcoded!
```

Each country's `[...slug].tsx` file is an identical copy of the same logic with a hardcoded country name. These 8 files could be consolidated into a single `study-in-[country]/[...slug].tsx` pattern or a shared hook — but this is a refactor, not a CPU issue.

---

## Priority Summary

| Priority | Fix | Expected Impact |
|----------|-----|-----------------|
| 🔴 1 | Add `getStaticProps` + `getStaticPaths` to college/university/course/blog/news/exam/school pages | Eliminates per-request function calls for highest-traffic pages |
| 🔴 2 | Understand Emotion `_document` double-render cost — consider ISR where possible | Reduces per-request CPU from double server render |
| 🟡 3 | Uncomment `revalidate` on `/` homepage | Homepage re-fetches on schedule |
| 🟡 4 | Remove `no-cache` header in `fetchSitemapXML` | Reduces backend API load |
| 🟢 5 | Move Bootstrap JS to `next/script` | Cleaner loading, minor perf |

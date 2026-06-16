SEO Audit — learntechww.com
Audited against codebase: June 2026 | Next.js 15 | Priority pages: College, University, Course, News

Executive Summary
The site has solid structural foundations (robots.txt, multiple sitemaps, canonical tags, breadcrumb + entity schema on key pages) but one architectural decision undermines nearly all of it: every high-value page renders its content and meta tags entirely client-side. Googlebot sees a spinner, not content, on first load. This is the single most important issue on the site. Everything else is secondary until this is addressed.

Top 5 priorities:

Migrate college/university/course/news/exam pages to getServerSideProps
Add OG + Twitter Card meta tags sitewide
Add NewsArticle schema to news pages
Fix broken WebSite SearchAction schema
Remove all console.log calls before next deploy
1. Technical SEO
1.1 Client-Side Rendering — Critical
Issue: Every inner page (/college/[...slug], /university/[...slug], /course/[...slug], /news/[...slug], /exam/[...slug]) fetches all content in useEffect after hydration. The <title>, <meta name="description">, canonical, and all structured data are set after the API call resolves.

Impact: High. When Googlebot first crawls these URLs it receives:

<title>Study in India | Study Abroad | Learntech Edu Solutions</title> (the _app.tsx fallback)
Empty <meta name="description">
No structured data
A full-viewport <CircularProgress /> spinner as the visible content
Googlebot does execute JavaScript (Wave 2 rendering), but it is delayed by days to weeks, inconsistent across crawls, and the rendered HTML never contains server-delivered meta tags. Dynamic meta tags in useEffect components are not reliable for indexation.

Evidence: InnerCollegePage/index.tsx:63-68, InnerNewsPage/index.tsx:45-56, InnerCoursePage/index.tsx:115-130, InnerExamPage/index.tsx:46-57

Fix: Convert each view's index.tsx to accept data as props. Move API calls to getServerSideProps in the page file. The view component becomes pure rendering — no useEffect, no loading state, no spinner on first paint.


// pages/college/[...slug].tsx
export const getServerSideProps = async ({ params }) => {
  const id = params.slug[0];
  const [pageRes, testRes] = await Promise.all([
    axios.get(`api/website/collegefindone/get/${id}`),
    axios.get(`api/website/testimonial/filter/get?page=1&size=15&college_id=${id}`)
  ]);
  return { props: { pagedata: pageRes.data.data, testdata: testRes.data.data } };
};
Priority: P0

1.2 robots.txt
Status: Good. Well-structured, correctly blocks /admin/, /dashboard/, /search/. Explicitly allows all major search bots and AI crawlers. Sitemap index listed at the bottom.

One issue: Sitemap URLs reference https://learntechww.com/sitemap/universities.xml etc. — these appear to be API-generated, not static files. Verify they return valid XML with 200 status (not 404 or redirects). A broken sitemap reference in robots.txt wastes crawl budget.

Priority: P2 — verify the dynamic sitemap routes are live.

1.3 XML Sitemaps
Status: public/sitemap.xml exists and covers static pages. Dynamic entity sitemaps are declared in robots.txt.

Issues:

Every URL uses <changefreq>always</changefreq> — this tells crawlers the page changes on every visit, which is misleading for most content. Google largely ignores changefreq and priority now, but incorrect values signal low quality of the sitemap metadata.
The static sitemap has no <lastmod> dates — adding these for recently updated pages helps Googlebot prioritize recrawling.
Confirm https://learntechww.com/sitemap/news.xml and the others return valid XML with <loc> entries that match canonical URLs exactly (no trailing slashes, correct domain).
Priority: P3

1.4 Canonical Tags
Status: All inner pages set self-referencing canonicals using router.asPath.

Issue: router.asPath includes query strings. If a user visits /college/123/my-college?ref=email, the canonical becomes that URL, not the clean slug. This can create canonical mismatches.

Evidence: InnerCollegePage/index.tsx:76 — href={\${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`}`

Fix: Use router.pathname combined with the resolved params, or strip query strings from asPath:


const canonicalPath = router.asPath.split('?')[0];
<link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${canonicalPath}`} />
Priority: P1

1.5 Trailing Slash Consistency
Status: next.config.js sets trailingSlash: false and skipTrailingSlashRedirect: true. The middleware handles trailing slash removal with 301 redirects. This is consistent and correct — middleware strips slashes before Next.js routing.

No issues found.

1.6 Global Meta Tags — _app.tsx
Issues found:

Issue	Location	Impact
No <meta name="robots"> globally	_app.tsx:124	Medium — inner pages set it individually, but static pages (about-us, contact-us, etc.) may not
No global fallback OG tags	_app.tsx:124	High — social shares across all pages show no image/card
Homepage does not set its own <title>	Homepage/index.tsx:37	Medium — relies on _app.tsx fallback title
<meta name='keywords'> in _app.tsx is Learntechweb	_app.tsx:126	Low — Google ignores keywords meta, but it's clutter
Priority: P1 for robots + OG fallback; P2 for homepage title.

1.7 WebSite SearchAction Schema — Broken
Issue: The WebSite schema in _app.tsx has an invalid SearchAction target:


"potentialAction": {
  "@type": "SearchAction",
  "target": "{search_term_string}",   // ← broken: no URL, just the placeholder
  "query-input": "required name=search_term_string"
}
The target must be a full URL template pointing to an actual search results page. If /search/ doesn't exist (it's disallowed in robots.txt), this schema is doubly wrong.

Evidence: _app.tsx:160-168

Fix: Either remove the potentialAction entirely, or wire it to a real search endpoint:


"target": {
  "@type": "EntryPoint",
  "urlTemplate": "https://learntechww.com/colleges?search={search_term_string}"
}
Priority: P1

1.8 Console Logs in Production
Issue: Multiple API response logs are active in production. These leak internal data structures to anyone with DevTools open and slightly slow down rendering.

File	Line(s)	Content
InnerNewsPage/index.tsx:24-27	Full API response + data logged	
InnerCoursePage/index.tsx:42	Course API response	
InnerExamPage/index.tsx:22	Exam API response	
InnerUniversityPage/index.tsx:26	Testimonials API response	
Homepage/Components/BannerSection/index.tsx:125	Search suggestions	
Fix: Delete all five. No fallback needed.

Priority: P2

1.9 Homepage Banner Preload — Hardcoded Filename
Issue: The LCP preload in the homepage banner is hardcoded:


href={`${process.env.NEXT_PUBLIC_IMG_URL}/banners/logo1734425264066.webp`}
The actual first banner is fetched dynamically from the API. When the banner is updated, this preload will fetch the wrong image, wasting bandwidth and not improving LCP.

Evidence: Homepage/Components/BannerSection/index.tsx:145-148

Fix: Once banners are available as props (via getStaticProps, which is already in place on the homepage), pass the first banner's image URL to the preload:


// In Homepage/index.tsx, pass banners[0] down to BannerSection
// In BannerSection, conditionally preload:
{banners?.[0] && (
  <link rel="preload" as="image" href={`${process.env.NEXT_PUBLIC_IMG_URL}/${banners[0].image}`} />
)}
Priority: P1

1.10 <link rel="logo"> — Invalid HTML
Issue: _document.tsx contains <link rel="logo" sizes="180x180" href="...">. The logo rel type is not a valid link relation. Browsers and validators will ignore it.

Evidence: _document.tsx:12

Fix: Replace with <link rel="apple-touch-icon" sizes="180x180" href="..."> if the intent is an iOS home screen icon, or remove it.

Priority: P3

2. On-Page SEO
2.1 Open Graph & Twitter Card — Missing Sitewide
Issue: Zero OG or Twitter Card meta tags on any page. Every page that gets shared on LinkedIn, WhatsApp, Facebook, or X shows a plain link with no image, no custom title, no description card.

For an education consultancy where college queries flow heavily through social platforms, this is a significant missed channel.

Fix: Add to every inner page view (college, university, course, news, exam):


{/* OG Tags */}
<meta property="og:type" content="website" />
<meta property="og:url" content={`${process.env.NEXT_PUBLIC_WEB_URL}${canonicalPath}`} />
<meta property="og:title" content={pagedata?.meta_title || fallbackTitle} />
<meta property="og:description" content={pagedata?.meta_description || fallbackDesc} />
<meta property="og:image" content={`${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.logo || pagedata?.image}`} />
<meta property="og:site_name" content="Learntech Edu Solutions" />

{/* Twitter */}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@learntechww" />
<meta name="twitter:title" content={pagedata?.meta_title || fallbackTitle} />
<meta name="twitter:description" content={pagedata?.meta_description || fallbackDesc} />
<meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.logo || pagedata?.image}`} />
Add a global fallback version of these in _app.tsx <Head> for pages that don't override them.

Priority: P1

2.2 Homepage Meta Tags
Issue: The homepage view (Homepage/index.tsx:37-58) sets a description and schema but no <title>. The fallback <title> from _app.tsx is used. That fallback (Study in India | Study Abroad | Learntech Edu Solutions) is fine as a title, but it should be explicitly declared in the homepage view to make intent clear and allow future customization.

Also: homepage has no <meta name="robots"> tag.

Priority: P2

2.3 Image Alt Text
Location	Issue
NewsList/index.tsx:11	alt="news-img" — generic, describes nothing
TopTrendingNewsSec/index.tsx:22	Uses alt={news.title} — correct
BannerSection/index.tsx:165	alt={\Banner ${index}`}` — generic for carousel
Fix: In NewsList, use alt={item.name}. In Homepage carousel, use alt={banner.alt || 'Learntech education banner'} if the API provides alt text, or a descriptive static fallback.

Priority: P2

2.4 Heading Structure
Found: College/University BannerSection uses <h1> for the institution name — correct. News listing sidebar uses <h6> for news titles instead of <p> (noted in CLAUDE.md P1).

Checking: InnerNewsPage/Components/newsList/index.tsx:15 — <h6 className="...card-text news-text"> is confirmed. This creates spurious heading hierarchy on news detail pages that already have a proper H1.

Fix: Change to <p className="...">.

Priority: P1

3. Structured Data
3.1 Schema Coverage by Page Type
Page	Schema present	Missing
Homepage	Organization, WebSite, LocalBusiness, Person	SearchAction broken; Person has empty url; LocalBusiness has empty @id
College detail	CollegeOrUniversity, FAQPage*, BreadcrumbList	OG image, NewsArticle N/A
University detail	CollegeOrUniversity, FAQPage*, BreadcrumbList	Same
Course detail	FAQPage*, BreadcrumbList	Course schema (@type: Course)
News detail	BreadcrumbList	NewsArticle schema
Exam detail	FAQPage*, BreadcrumbList	No dedicated exam schema
*Only emitted when FAQs exist — schema omitted entirely when the FAQ list is empty, which means breadcrumbs also don't appear for courses/exams without FAQs. This is a bug.

3.2 Course & Exam Breadcrumbs Conditional Bug
Issue: In InnerCoursePage/index.tsx:131-199 and InnerExamPage/index.tsx:58-129, BreadcrumbList is inside the same {formattedData?.length > 0 && ...} block as FAQPage. If a course or exam has no FAQs, neither FAQPage nor BreadcrumbList is emitted.

Fix: Split the two schemas into separate <script> blocks with independent conditions:


{/* Always emit breadcrumbs */}
<script type="application/ld+json">
  {JSON.stringify({ "@context": "https://schema.org/", "@type": "BreadcrumbList", ... })}
</script>

{/* Only emit FAQPage when there are FAQs */}
{formattedData?.length > 0 && (
  <script type="application/ld+json">
    {JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", ... })}
  </script>
)}
Priority: P1

3.3 Missing NewsArticle Schema
Issue: News detail pages (InnerNewsPage/index.tsx:58-86) only emit BreadcrumbList. No NewsArticle schema means Google cannot generate rich news snippets.

Fix — add after SSR migration:


<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": pagedata?.meta_title,
    "image": [pagedata?.imageUrl],
    "datePublished": pagedata?.created_at,
    "dateModified": pagedata?.updated_at,
    "author": { "@type": "Organization", "name": "Learntech Edu Solutions" },
    "publisher": {
      "@type": "Organization",
      "name": "Learntech Edu Solutions",
      "logo": { "@type": "ImageObject", "url": `${process.env.NEXT_PUBLIC_WEB_URL}/images/icons/learntech-logo.png` }
    },
    "description": pagedata?.meta_description
  })}
</script>
Priority: P1

3.4 Homepage Schema Errors
Schema	Problem
Person (Mansoor Ali)	"url": "" — empty string is invalid
LocalBusiness	"@id": "" — @id must be the canonical URL of the entity
Organization (in _app.tsx) + LocalBusiness (in Homepage)	Two separate entity representations of the same company with different @type — consolidate into one
Priority: P2

4. Content Quality
4.1 Thin Content Risk — Static Listing Pages
/colleges, /universities, /courses, /exams listing pages load data client-side with no SSR. Google sees empty listing pages on first crawl. These are high-traffic category pages that likely target broad head terms.

Priority: P0 (same fix as 1.1 — getServerSideProps)

4.2 Duplicate Fallback Meta Description
Every page that lacks a custom API meta description shows:

"Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."

If any significant number of pages have blank meta_description in the CMS, Google sees mass duplicate descriptions across hundreds of URLs — a soft quality signal.

Fix: Check CMS data completeness. Add a per-entity fallback that at least includes the entity name:


`${pagedata?.name} — Admission, fees, courses, and reviews at Learntech Edu Solutions.`
Priority: P2

5. Prioritized Action Plan
Immediate (P0) — Blocking indexation of core content
#	Action	Files
1	Migrate college, university, course, news, exam pages to getServerSideProps	pages/college/[...slug].tsx, pages/university/[...slug].tsx, pages/course/[...slug].tsx, pages/news/[...slug].tsx, pages/exam/[...slug].tsx + all corresponding view index files
High Impact (P1) — Fix immediately after P0
#	Action	Files
2	Add OG + Twitter Card meta tags to all inner page views	All InnerXxxPage/index.tsx
3	Add global OG fallback tags to _app.tsx	_app.tsx
4	Fix WebSite SearchAction schema target URL	_app.tsx:160
5	Add NewsArticle schema to news pages	InnerNewsPage/index.tsx
6	Fix BreadcrumbList conditional bug in course + exam pages	InnerCoursePage/index.tsx, InnerExamPage/index.tsx
7	Strip query strings from canonical URLs (router.asPath → asPath.split('?')[0])	All inner view index.tsx files
8	Fix LCP preload to use dynamic first banner URL	Homepage/Components/BannerSection/index.tsx
9	Replace <h6> with <p> in news sidebar	InnerNewsPage/Components/newsList/index.tsx:15
Quick Wins (P2) — Low effort, meaningful signal
#	Action	Files
10	Remove all 5 console.log calls	InnerNewsPage, InnerCoursePage, InnerExamPage, InnerUniversityPage, BannerSection
11	Add <meta name="robots" content="index, follow"> to _app.tsx globally	_app.tsx
12	Add explicit <title> to Homepage view	Homepage/index.tsx
13	Fix Person schema empty url, LocalBusiness empty @id	Homepage/index.tsx:48,65
14	Fix generic alt="news-img" → alt={item.name}	NewsList/index.tsx:11
15	Fix generic alt={\Banner ${index}`}` on homepage carousel	BannerSection/index.tsx:165
Cleanup (P3) — Low priority
#	Action	Files
16	Fix <link rel="logo"> → <link rel="apple-touch-icon">	_document.tsx:12
17	Fix sitemap changefreq: always → appropriate values	public/sitemap.xml
18	Verify all dynamic sitemap endpoints (/sitemap/colleges.xml etc.) return valid 200 XML	Server routes
19	Add preconnect to newapi.learntechww.com	_document.tsx
Share your GSC data when ready (Coverage report, Core Web Vitals, Top Queries) and I'll layer in data-backed findings on which pages are failing indexation, what keywords are close to page 1, and which URLs Google has already discovered vs. not.

Want me to start implementing any of these fixes now? The highest ROI first hit is the P0 CSR→SSR migration.
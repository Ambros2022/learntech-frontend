Summary of Issues Found
Critical Issues
140 H6 tags on news pages - The "Other Trending News" sidebar uses <h6> tags for news item titles in the newsList component. With ~140 news items, this creates 140 H6 elements on a single page. This is a heading structure abuse - these should be paragraphs or divs, not headings.

No Open Graph / Twitter Card tags on priority pages (news, college, course, exam) - Only the InnerBlogpage ExpertSec has OG tags. This means social sharing won't show proper previews.

Generic image alt text - News thumbnails and banners use placeholder descriptions like alt="news-img" and alt="banner-img" when they should be specific and descriptive.

Core Web Vitals are underperforming - LCP is hitting 3.4 seconds when it should be under 2.5 seconds, and INP is at 209ms, just barely exceeding the 200ms threshold.

High-Priority Issues
Global _app.tsx Head lacks a proper meta description - The fallback head only has a generic keyword tag with "Learntechweb" which provides no real value.

Open Graph tags are missing from most pages - Need to add social sharing metadata across the site.

Keywords are too generic - The fallback keyword "Learntechweb" appears across pages that don't have specific keywords defined.

News pages are missing Article schema - Only BreadcrumbList schema is present, so Google can't properly identify and surface news content.

CollegeOrUniversity schema is incomplete - The image property isn't specified in the schema markup.

Malformed meta tags exist - Some pages have a space in the meta tag syntax (< meta instead of <meta), which could cause parsing issues.

Medium-Priority Issues
NewsArticle schema needs to be added - This would help Google better understand the news content structure.

Social sharing tags are missing from most pages - Only blog pages have OG and Twitter meta tags, but college, course, exam, and news pages need them too.

Robots.txt references 12 sitemaps - This is actually good coverage.

H6 headings are semantically wrong for news lists - These should be paragraph or span elements instead.

Article schema is missing publication dates - datePublished and dateModified aren't included on news pages.

Client-side rendering is hurting SEO - Pages fetch data with useEffect after initial render, so Google sees loading states before the actual content. This needs to switch to server-side or static generation to populate meta tags before the page loads.

Target attribute appears incomplete - There's a truncated target="{search_term attribute that needs fixing.

No pagination support - The code doesn't handle page 2 or beyond.

Bootstrap CSS is render-blocking - It adds about 150KB of unnecessary overhead.

Debug logs left in production - There are console.log statements scattered through the code that should be removed.

The core problem is that relying on client-side rendering with API calls means the title and meta tags don't exist when search engines crawl the page. This is a fundamental SEO issue that needs to be addressed by moving to server-side or static generation.

I have enough data. Let me compile the full audit report.

Learntech SEO Audit Report — May 2026
Executive Summary
The site has solid bones — sitemaps, canonical tags, and schema markup on key templates — but several critical and high-impact issues are suppressing rankings. The most severe is client-side rendered meta tags: titles and descriptions for all priority pages (news, college, course, exam) are populated via useEffect + API calls, meaning Google sees empty/fallback values on the initial HTML crawl. Fix this first.

Top 5 Priority Issues:

Client-side rendered meta tags (all dynamic pages)
140 H6 heading tags on news article pages
Missing Open Graph / Twitter Card tags on all priority pages
LCP 3.4s — failing Core Web Vitals
Generic image alt text on news thumbnails and banners
Critical Findings
CRITICAL-1: Client-Side Meta Tags (All Dynamic Pages)
Issue: Every priority page template (InnerNewsPage, InnerCollegePage, InnerCoursePage, InnerExamPage, etc.) fetches page data via useEffect + axios. The <title> and <meta name="description"> are only populated after JavaScript loads AND the API responds. On initial HTML, Google sees the fallback defaults ("Study in India | Study Abroad | Learntech Edu Solutions") for every single news article, college, and exam page.

Evidence: src/views/InnerNewsPage/index.tsx:19-48 — getPagedata() runs in useEffect. Head tags at lines 52-55 depend on pagedata which starts as null.

Impact: High — Google indexes the default title and description for all dynamic pages. Every college, news, and exam page looks identical in SERPs.

Fix: Migrate dynamic pages to getServerSideProps. Fetch pagedata server-side and pass as props:


export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/website/newsfindone/get/${params.slug[0]}`);
  const data = await res.json();
  return { props: { pagedata: data.data } };
}
Priority: P0 — fix before anything else

CRITICAL-2: 140 H6 Tags on News Article Pages
Issue: The "Other Trending News" sidebar (src/views/InnerNewsPage/Components/newsList/index.tsx:15) wraps every news item title in <h6>. With ~140 news items rendered, each news article page has 140 heading tags — all H6. The screenshot confirms: H1:1, H2:3, H3:1, H4:1, H5:4, H6:140.

Impact: High — Google's heading parser sees 140 headings on a page. This signals poor document structure, dilutes the weight of real headings, and confuses topical relevance signals.

Fix: Replace <h6> with <p> or <span> in newsList/index.tsx:15:


// Before
<h6 className="align-content-center card-text news-text">{name}</h6>

// After
<p className="align-content-center card-text news-text mb-0">{name}</p>
Priority: P1

CRITICAL-3: Missing Open Graph & Twitter Card Tags
Issue: News, college, course, and exam page templates have zero Open Graph or Twitter Card meta tags. Only InnerBlogpage/Components/ExpertSec has OG/Twitter tags. When these pages are shared on social media, platforms show no image, no title preview — reducing CTR from social shares.

Evidence: grep -r "og:" across src/views/InnerNewsPage/, src/views/InnerCollegePage/, src/views/InnerCoursePage/, src/views/InnerExamPage/ — no matches.

Fix: Add to each inner page template's <Head>:


<meta property="og:type" content="article" />
<meta property="og:title" content={pagedata?.meta_title || "Learntech Edu Solutions"} />
<meta property="og:description" content={pagedata?.meta_description || ""} />
<meta property="og:image" content={`${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.banner_image}`} />
<meta property="og:url" content={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={pagedata?.meta_title || "Learntech Edu Solutions"} />
<meta name="twitter:description" content={pagedata?.meta_description || ""} />
Priority: P1

High-Impact Findings
HIGH-1: NewsArticle Schema Missing on News Pages
Issue: src/views/InnerNewsPage/index.tsx only has BreadcrumbList schema. There is no NewsArticle or Article schema. Google News and Discover use this schema to surface news content.

Fix: Add after the BreadcrumbList schema:


{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": pagedata?.name,
  "description": pagedata?.meta_description,
  "image": `${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.banner_image}`,
  "datePublished": pagedata?.createdAt,
  "dateModified": pagedata?.updatedAt,
  "author": { "@type": "Organization", "name": "Learntech Edu Solutions" },
  "publisher": {
    "@type": "Organization",
    "name": "Learntech Edu Solutions",
    "logo": { "@type": "ImageObject", "url": `${process.env.NEXT_PUBLIC_WEB_URL}/images/icons/learntech-logo.png` }
  }
}
Priority: P1 (especially for Google News eligibility)

HIGH-2: Core Web Vitals — LCP 3.4s (Failing)
Issue: From the screenshot: LCP = 3.4s (threshold: 2.5s), INP = 209ms (threshold: 200ms). Both are in the "Needs Improvement" zone.

Likely causes:

Banner image at BannerSec/index.tsx:10 uses <img> (not Next.js <Image>) with no priority or loading="eager" hint
Bootstrap CSS (~150KB) loaded globally in _app.tsx:56
Landing page CSS loaded via <link rel='stylesheet'> inside <Head> (render-blocking)
Fix:

Replace <img> on banner with Next.js <Image priority> component
Add <link rel="preload" as="image"> for the LCP image (see Homepage BannerSection — this pattern already exists there, apply to news banner)
Audit Bootstrap usage — replace with Tailwind or scoped CSS for frontend pages
Priority: P1

HIGH-3: Global Fallback Meta Description Missing
Issue: src/pages/_app.tsx:139-190 — the global <Head> has <title> and <meta name='keywords'> but no <meta name="description">. When a page's dynamic description hasn't loaded (or on pages without one), Google sees no description tag.

Also: <meta name='keywords' content='Learntechweb'> — the fallback keyword is "Learntechweb" (the brand handle), which provides no SEO value as a keyword.

Fix: Add to _app.tsx global Head:


<meta name="description" content="Learntech Edu Solutions provides admission guidance to students seeking top colleges in India & Abroad. Expert counselling for 1000+ institutions." />
<meta name="robots" content="index, follow" />
Priority: P2

HIGH-4: Generic Image Alt Text
Issue:

newsList/index.tsx:11: alt="news-img" — same alt on all ~140 thumbnail images
BannerSec/index.tsx:10: alt='banner-img' — generic on the hero image
CollegeInfoSection/index.tsx:132: alt="College Info" — generic
Fix:


// newsList — use the article name
alt={name}

// BannerSec — use the article title
alt={data?.name || 'News banner'}

// CollegeInfoSection
alt={`${data?.name} campus`}
Priority: P2

HIGH-5: Console.log Statements in Production
Issue: src/views/InnerNewsPage/index.tsx:24-27 has two console.log calls that expose full API responses in the browser. Not a direct SEO issue but indicates debug code in production — remove before next deploy.

Priority: P2 (cleanup)

Medium-Priority Findings
MED-1: Malformed Keywords Tag (< meta with space)
Issue: DisclaimerPage/index.tsx:37 and EducationLoanPage/index.tsx:78 have < meta name="keywords" (space between < and meta). This is invalid HTML that some parsers may not read correctly.

Fix: Remove the space — change < meta to <meta in both files.

Priority: P3

MED-2: WebSite Schema SearchAction Malformed
Issue: _app.tsx:178 — the SearchAction target is "{search_term_string}" (a bare string). The correct format requires a URL template.

Fix:


"target": {
  "@type": "EntryPoint",
  "urlTemplate": "https://learntechww.com/search?q={search_term_string}"
}
Priority: P3

MED-3: No Pagination Meta on News/Blog List Pages
Issue: MainNewsPage appears to load news without rel="next" / rel="prev" pagination signals or ?page=N URL parameters surfaced to crawlers.

Priority: P3

MED-4: skipTrailingSlashRedirect: true Risk
Issue: next.config.js:4 — skipTrailingSlashRedirect: true means both /news/83/slug and /news/83/slug/ are served without a redirect between them. Combined with trailingSlash: false, this can create duplicate content if any internal links accidentally include trailing slashes.

Priority: P3 — audit internal links for trailing slash consistency

Prioritized Action Plan
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
Robots/indexation fix summary (completed this session): Added <meta name="robots" content="index, follow" /> to 47 page templates across the site — news listing, news inner, all college/course/exam/blog/study-abroad pages. ✓

Want me to start implementing any of the P0/P1 fixes now?
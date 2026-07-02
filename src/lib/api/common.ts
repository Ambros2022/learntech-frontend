import { cache } from 'react'

const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

// ─────────────────────────────────────────────────────────────────────────────
// Helper: safe fetch with 30s timeout + Next.js native fetch cache
// next.tags  → tag-based revalidation via /api/revalidate?tag=xxx
// revalidate → time-based fallback (seconds)
// React.cache() deduplicates identical calls within the same server request
// ─────────────────────────────────────────────────────────────────────────────

async function safeFetch<T = any>(
  url: string,
  opts: { tags?: string[] } = {},
): Promise<T | null> {
  const { tags = [] } = opts
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { tags },
    } as RequestInit)
    if (!res.ok) return null
    return (await res.json()) ?? null
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error(`[API] Timeout: ${url}`)
    } else {
      console.error(`[API] Failed: ${url}`, error.message)
    }
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLEGES & UNIVERSITIES
// ─────────────────────────────────────────────────────────────────────────────

export const getCollegeById = cache(async (id: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/collegefindone/get/${id}`,
    { tags: [`college-${id}`] },
  )
  return json?.data ?? null
})

export const getColleges = cache(async (params?: Record<string, string | number>) => {
  const sp = new URLSearchParams({
    page: '1', size: '1000',
    ...Object.fromEntries(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)])),
  })
  const json = await safeFetch<any>(
    `${API_URL}/api/website/colleges/get?${sp}`,
    { tags: ['colleges'] },
  )
  return { data: json?.data ?? [], totalItems: json?.totalItems ?? 0 }
})

// ─────────────────────────────────────────────────────────────────────────────
// COLLEGE COURSES
// ─────────────────────────────────────────────────────────────────────────────

export const getCollegeCourse = cache(async (courseSlug: string, collegeId: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/coursefindone/get/${courseSlug}/${collegeId}`,
    { tags: [`course-${collegeId}-${courseSlug}`] },
  )
  return json?.data ?? null
})

// ─────────────────────────────────────────────────────────────────────────────
// STREAMS / COURSES (general)
// ─────────────────────────────────────────────────────────────────────────────

export const getAllGeneralCourses = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/generalcourse/get?page=1&size=1000`,
    { tags: ['all-general-courses'] },
  )
  return json?.data ?? []
})

export const getTrendingCourses = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/generalcourse/get?page=1&size=1000&is_trending=1`,
    { tags: ['trending-courses'] },
  )
  return json?.data ?? []
})

export const getCoursePageBanner = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/banner/get?promo_banner=All_courses_page`,
    { tags: ['course-page-banner'] },
  )
  return json?.data?.[0] ?? null
})

export const getStreamCourses = cache(async (page = 1, size = 12) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/stream/general/get?page=${page}&size=${size}`,
    { tags: ['stream-courses'] },
  )
  return { courses: json?.data ?? [], totalItems: json?.totalItems ?? 0 }
})

export const getStreamById = cache(async (id: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/streamfindone/get/${id}`,
    { tags: [`stream-${id}`] },
  )
  return json?.data ?? null
})

export const getStreams = cache(async (params?: Record<string, string | number>) => {
  const sp = new URLSearchParams({
    page: '1', size: '1000',
    ...Object.fromEntries(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)])),
  })
  const json = await safeFetch<any>(
    `${API_URL}/api/website/stream/get?${sp}`,
    { tags: ['streams'] },
  )
  return json?.data ?? []
})

export const getGeneralCourseBySlug = cache(async (courseSlug: string, streamId: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/general/stream/get/${courseSlug}/${streamId}`,
    { tags: [`general-course-${streamId}-${courseSlug}`] },
  )
  return json?.data ?? null
})

// ─────────────────────────────────────────────────────────────────────────────
// EXAMS
// ─────────────────────────────────────────────────────────────────────────────

export const getExamById = cache(async (id: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/examfindone/get/${id}`,
    { tags: [`exam-${id}`] },
  )
  return json?.data ?? null
})

export const getExams = cache(async (params?: Record<string, string | number>) => {
  const sp = new URLSearchParams({
    page: '1', size: '1000',
    ...Object.fromEntries(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)])),
  })
  const json = await safeFetch<any>(
    `${API_URL}/api/website/exams/get?${sp}`,
    { tags: ['exams'] },
  )
  return json?.data ?? []
})

// ─────────────────────────────────────────────────────────────────────────────
// NEWS
// ─────────────────────────────────────────────────────────────────────────────

export const getNewsById = cache(async (id: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/newsfindone/get/${id}`,
    { tags: [`news-${id}`] },
  )
  if (!json) return null
  const data = json.data
  if (Array.isArray(data)) return data[0] ?? null
  return data ?? null
})

export const getNewsList = cache(async (params?: Record<string, string | number>) => {
  const sp = new URLSearchParams({
    page: '1', size: '8', columnname: 'news_date', orderby: 'desc',
    ...Object.fromEntries(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)])),
  })
  const json = await safeFetch<any>(
    `${API_URL}/api/website/news/get?${sp}`,
    { tags: ['news'] },
  )
  return json?.data ?? []
})

// ─────────────────────────────────────────────────────────────────────────────
// BLOGS
// ─────────────────────────────────────────────────────────────────────────────

export const getBlogById = cache(async (id: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/blogfindone/get/${id}`,
    { tags: [`blog-${id}`] },
  )
  if (!json) return null
  const data = json.data
  if (Array.isArray(data)) return data[0] ?? null
  return data ?? null
})

export const getBlogs = cache(async (params?: Record<string, string | number>) => {
  const sp = new URLSearchParams({
    page: '1', size: '6', orderBy: 'created_at', order: 'desc',
    ...Object.fromEntries(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)])),
  })
  const json = await safeFetch<any>(
    `${API_URL}/api/website/blog/get?${sp}`,
    { tags: ['blogs'] },
  )
  return { blogs: json?.data ?? [], totalCount: json?.total ?? 0 }
})

export const getBlogsListing = cache(async (page = 1, size = 8) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/blog/get?orderby=desc&page=${page}&size=${size}`,
    { tags: ['blogs-listing'] },
  )
  return { blogs: json?.data ?? [], totalPages: json?.totalPages ?? 1 }
})

// ─────────────────────────────────────────────────────────────────────────────
// SCHOOLS
// ─────────────────────────────────────────────────────────────────────────────

export const getSchoolById = cache(async (id: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/schoolfindone/get/${id}`,
    { tags: [`school-${id}`] },
  )
  return json?.data ?? null
})

export const getSchools = cache(async (params?: Record<string, string | number>) => {
  const sp = new URLSearchParams({
    page: '1', size: '1000',
    ...Object.fromEntries(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)])),
  })
  const json = await safeFetch<any>(
    `${API_URL}/api/website/schools/get?${sp}`,
    { tags: ['schools'] },
  )
  return json?.data ?? []
})

// ─────────────────────────────────────────────────────────────────────────────
// BOARDS
// ─────────────────────────────────────────────────────────────────────────────

export const getBoardById = cache(async (id: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/schoolboardfindone/get/${id}`,
    { tags: [`board-${id}`] },
  )
  return json?.data ?? null
})

export const getBoards = cache(async (params?: Record<string, string | number>) => {
  const sp = new URLSearchParams({
    page: '1', size: '10',
    ...Object.fromEntries(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)])),
  })
  const json = await safeFetch<any>(
    `${API_URL}/api/website/schoolboard/get?${sp}`,
    { tags: ['boards'] },
  )
  return json?.data ?? []
})

// ─────────────────────────────────────────────────────────────────────────────
// SCHOLARSHIPS
// ─────────────────────────────────────────────────────────────────────────────

export const getScholarshipById = cache(async (id: string | number) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/scholarshipfindone/get/${id}`,
    { tags: [`scholarship-${id}`] },
  )
  return json?.data ?? null
})

export const getScholarships = cache(async (params?: Record<string, string | number>) => {
  const sp = new URLSearchParams({
    page: '1', size: '10',
    ...Object.fromEntries(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)])),
  })
  const json = await safeFetch<any>(
    `${API_URL}/api/website/scholarships/get?${sp}`,
    { tags: ['scholarships'] },
  )
  return json?.data ?? []
})

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────

export const getTestimonialsByCollege = cache(async (collegeId: string | number, size = 15) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/testimonial/filter/get?page=1&size=${size}&college_id=${collegeId}`,
    { tags: [`testimonials-college-${collegeId}`] },
  )
  return json?.data ?? []
})

export const getTestimonialsByStream = cache(async (streamId: string | number, size = 15) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/testimonial/filter/get?page=1&size=${size}&stream_id=${streamId}`,
    { tags: [`testimonials-stream-${streamId}`] },
  )
  return json?.data ?? []
})

export const getTestimonialsByGeneralCourse = cache(async (gcId: string | number, size = 15) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/testimonial/filter/get?page=1&size=${size}&general_course_id=${gcId}`,
    { tags: [`testimonials-gc-${gcId}`] },
  )
  return json?.data ?? []
})

// ─────────────────────────────────────────────────────────────────────────────
// BANNERS (homepage hero)
// ─────────────────────────────────────────────────────────────────────────────

export const getHeroBanners = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/banner/get?promo_banner=Draft&page=1&size=10000`,
    { tags: ['banners'] },
  )
  return json?.data ?? []
})

export const getAboutPageBanners = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/banner/get?promo_banner=All_about_page&page=1&size=10000`,
    { tags: ['about-banners'] },
  )
  return json?.data ?? []
})

export const getAdvertisePageBanners = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/banner/get?promo_banner=Advertise_page&page=1&size=10000`,
    { tags: ['advertise-banners'] },
  )
  return json?.data ?? []
})

export const getServicesBanners = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/banner/get?promo_banner=Services_Page&page=1&size=10000`,
    { tags: ['services-banners'] },
  )
  return json?.data ?? []
})

export const getAssociatedColleges = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/colleges/get?is_associated=1&page=1&size=10`,
    { tags: ['associated-colleges'] },
  )
  return json?.data ?? []
})

export const getAboutVideoTestimonials = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/allvideotestimonials/get?type=About_us_page`,
    { tags: ['about-video-testimonials'] },
  )
  const data = json?.data ?? []
  return data.filter((item: any) => item?.type === 'About_us_page')
})

// ─────────────────────────────────────────────────────────────────────────────
// ABROAD PAGES (study-in-xxx)
// ─────────────────────────────────────────────────────────────────────────────

export const getAbroadCountryPage = cache(async (country: string) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/abroadpagefindone/get/${country}`,
    { tags: [`abroad-${country}`] },
  )
  return json?.data ?? null
})

export const getOrganizationPage = cache(async (category: string) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/organizationpage/get?size=1000&categories=${category}`,
    { tags: [`organization-${category}`] },
  )
  return json?.data?.[0] ?? null
})

export const getCounsellorTeams = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/counsellorteams/get?orderby=asc&columnname=listing_order`,
    { tags: ['counsellors'] },
  )
  return json?.data ?? []
})

export const getAbroadCountries = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/country/get?page=1&size=10&india=false`,
    { tags: ['abroad-countries'] },
  )
  return json?.data ?? []
})

export const getAbroadPages = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/abroadpages/get?page=1&size=1000`,
    { tags: ['abroad-pages'] },
  )
  return json?.data ?? []
})

// ─────────────────────────────────────────────────────────────────────────────
// CMS PAGES (privacy-policy, disclaimer, terms, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export const getPageData = cache(async (slug: string) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/pagefindone/get/${slug}`,
    { tags: [`page-${slug}`] },
  )
  return json?.data ?? null
})

// ─────────────────────────────────────────────────────────────────────────────
// LATEST NEWS & BLOGS (homepage section)
// newsandblogs/get returns { news: { data: [...] } } or { blogs: { data: [...] } }
// ─────────────────────────────────────────────────────────────────────────────

export const getLatestNewsList = cache(async (size = 8) => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/newsandblogs/get?page=1&size=${size}&type=news&orderby=desc&columnname=created_at`,
    { tags: ['latest-news'] },
  )
  return json?.news?.data ?? []
})

export const getNewsSectionBanner = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/banner/get?promo_banner=Home_news_page&page=1&size=1`,
    { tags: ['news-section-banner'] },
  )
  return (json?.data?.[0] ?? null) as { image: string } | null
})

// ─────────────────────────────────────────────────────────────────────────────
// SITEMAP (bypasses cache — always fresh XML)
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION (header dropdowns — fetched server-side in (main)/layout.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const getStates = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/states/get?page=1&size=500&country_id=204`,
    { tags: ['nav-states'] },
  )
  return json?.data ?? []
})

export const getNavCourses = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/stream/get?page=1&size=100&orderby=asc&columnname=listing_order`,
    { tags: ['nav-courses'] },
  )
  return json?.data ?? []
})

export const getNavExams = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/stream_exams/get?page=1&size=100`,
    { tags: ['nav-exams'] },
  )
  return json?.data ?? []
})

export const getNavCountries = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/abroadpages/get?page=1&size=15`,
    { tags: ['nav-countries'] },
  )
  return json?.data ?? []
})

export const getNavNews = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/news/get?page=1&size=4&country_id=204&columnname=created_at&orderby=desc`,
    { tags: ['news'] },
  )
  return json?.data ?? []
})

export async function getNavData() {
  const [states, courses, exams, countries, news] = await Promise.all([
    getStates(),
    getNavCourses(),
    getNavExams(),
    getNavCountries(),
    getNavNews(),
  ])
  return { states, courses, exams, countries, news }
}

// ─────────────────────────────────────────────────────────────────────────────
// CAREER
// ─────────────────────────────────────────────────────────────────────────────

export const getJobPositions = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/jobposition/get`,
    { tags: ['job-positions'] },
  )
  return json?.data ?? []
})

export const getJobLocations = cache(async () => {
  const json = await safeFetch<any>(
    `${API_URL}/api/website/alljoblocation/get`,
    { tags: ['job-locations'] },
  )
  return json?.data ?? []
})

// ─────────────────────────────────────────────────────────────────────────────
// SITEMAP (bypasses cache — always fresh XML)
// ─────────────────────────────────────────────────────────────────────────────

export async function getSitemapXml(type: string): Promise<string | null> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)
  try {
    const res = await fetch(
      `${API_URL}/api/website/xmlgenerator/get?type=${type}`,
      { signal: controller.signal, cache: 'no-store' },
    )
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

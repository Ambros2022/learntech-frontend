# Next.js Revalidation Strategy Report

## 🏷️ Tag-Based Revalidation (On-Demand)

The following cache tags are used in your application's `fetch` requests. You can trigger on-demand revalidation in your CMS by calling your Next.js API route (e.g., `/api/revalidate?tag=TAG_NAME`).

| Tag Pattern | Description / Dynamic Variables |
| ----------- | ------------------------------- |
| `All_Scholarship_page` | Static tag |
| `Nri_page` | Static tag |
| `about` | Static tag |
| `accreditations` | Static tag |
| `admissions` | Static tag |
| `blog` | Static tag |
| `board` | Static tag |
| `citys` | Static tag |
| `college-search` | Static tag |
| `colleges` | Static tag |
| `contact` | Static tag |
| `cookies-policy` | Static tag |
| `courses` | Static tag |
| `disclaimer` | Static tag |
| `exams` | Static tag |
| `general-courses` | Static tag |
| `home-banners` | Static tag |
| `home-blogs` | Static tag |
| `home-news` | Static tag |
| `home-streams` | Static tag |
| `home-testimonials` | Static tag |
| `home-videos` | Static tag |
| `home-web-counters` | Static tag |
| `latest-colleges` | Static tag |
| `latest-news` | Static tag |
| `managements` | Static tag |
| `news` | Static tag |
| `news-and-event` | Static tag |
| `nri` | Static tag |
| `privacy-policy` | Static tag |
| `recognition-approval` | Static tag |
| `scholarship` | Static tag |
| `scholarships` | Static tag |
| `schoolboards` | Static tag |
| `schoollevels` | Static tag |
| `schooltypes` | Static tag |
| `services` | Static tag |
| `services_page` | Static tag |
| `streams` | Static tag |
| `students-speak` | Static tag |
| `studyabroad` | Static tag |
| `team` | Static tag |
| `team-members` | Static tag |
| `terms-and-conditions` | Static tag |
| `top-colleges` | Static tag |
| `top-exams` | Static tag |
| `top-schools` | Static tag |
| `top-universities` | Static tag |
| `universities` | Static tag |
| `blog-${slug}` | Dynamic tag |
| `college-${slug}` | Dynamic tag |
| `collegecourse-${collegeslug}-${courseslug}` | Dynamic tag |
| `course-${slug}` | Dynamic tag |
| `exam-${slug}` | Dynamic tag |
| `news-${slug}` | Dynamic tag |
| `school-${slug}` | Dynamic tag |
| `school-faq-${slug}` | Dynamic tag |
| `stream-${slug}` | Dynamic tag |

## ⏱️ Time-Based Revalidation (ISR) & SSR

The following files explicitly set `export const revalidate = ...`. 
- A value of `false` or `0` implies purely SSR.
- A numeric value implies ISR (revalidated every X seconds).

| File Path | Revalidate Value |
| --------- | ---------------- |
| `app\(main)\courses\[...slug]\page.tsx` | `false` |
| `app\[slug]\page.tsx` | `false` |

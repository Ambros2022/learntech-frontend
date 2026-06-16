'use client'
import React from 'react'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import BannerSection from './Components/BannerSection'
import CourseDetailSec from './Components/CourseDetailSec'
import ExpertSection from './Components/ExpertSection'
import Head from 'next/head'
import { useRouter } from 'src/hooks/useCompatRouter'

function InnerCourseCollegePage({ pagedata, Collegeid }) {
  const router = useRouter()
  const canonicalPath = router.asPath.split('?')[0]

  const title = pagedata?.meta_title || 'Study in India | Study Abroad | Learntech Edu Solutions'
  const description = pagedata?.meta_description || 'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.'
  const canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${canonicalPath}`
  const ogImage = `${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.college?.logo}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={pagedata?.meta_keyword || 'Learntechweb'} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Learntech Edu Solutions" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@learntechww" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Course',
              name: pagedata?.title,
              description: pagedata?.meta_description,
              provider: {
                '@type': 'CollegeOrUniversity',
                name: pagedata?.college?.name,
                url: `${process.env.NEXT_PUBLIC_WEB_URL}/college/${Collegeid}/${pagedata?.college?.slug}`,
              },
            },
            {
              '@context': 'https://schema.org/',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.NEXT_PUBLIC_WEB_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Colleges', item: `${process.env.NEXT_PUBLIC_WEB_URL}/colleges` },
                { '@type': 'ListItem', position: 3, name: pagedata?.college?.name, item: `${process.env.NEXT_PUBLIC_WEB_URL}/college/${Collegeid}/${pagedata?.college?.slug}` },
                { '@type': 'ListItem', position: 4, name: pagedata?.course_short_name, item: canonicalUrl },
              ],
            },
          ])}
        </script>
      </Head>

      <BannerSection data={pagedata} />
      <CourseDetailSec data={pagedata} />
      <ExpertSection collegeName={pagedata?.college?.name} courseName={pagedata?.title} />
      {pagedata && <TopFeaturedColleges data={pagedata} />}
    </>
  )
}

export default InnerCourseCollegePage

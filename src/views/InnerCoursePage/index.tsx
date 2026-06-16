'use client'
import React from 'react'
import BannerSection from './Components/BannerSection'
import OverviewSection from './Components/OverviewSection'
import ExpertSection from './Components/ExpertSection'
import OtherCourses from './Components/OtherCourses'
import OrganizationSection from './Components/OrganizationalSec'
import ExperTraineeSec from './Components/ExpertTrainneSec'
import Testimonial from './Components/TestimonialSec'
import Head from 'next/head'
import { useRouter } from 'src/hooks/useCompatRouter'

function InnerCoursePage({ pagedata, colleges, exams, streams, testdata }) {
  const router = useRouter()
  const canonicalPath = router.asPath.split('?')[0]

  const formattedData = pagedata?.streamfaqs?.map((item) => ({
    '@type': 'Question',
    name: item.questions,
    acceptedAnswer: { '@type': 'Answer', text: item.answers },
  }))

  const title = pagedata?.meta_title || 'Study in India | Study Abroad | Learntech Edu Solutions'
  const description = pagedata?.meta_description || 'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.'
  const canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${canonicalPath}`
  const ogImage = `${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.banner}` || `${process.env.NEXT_PUBLIC_WEB_URL}/images/icons/learntech-logo.png`

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

        {formattedData?.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: formattedData,
            })}
          </script>
        )}
        <script type="application/ld+json">
          {JSON.stringify([{
            '@context': 'https://schema.org/',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.NEXT_PUBLIC_WEB_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Courses', item: `${process.env.NEXT_PUBLIC_WEB_URL}/courses` },
              { '@type': 'ListItem', position: 3, name: pagedata?.short_name || pagedata?.name, item: canonicalUrl },
            ],
          }])}
        </script>
      </Head>

      <BannerSection data={pagedata} />
      <OverviewSection data={pagedata} collegedata={colleges} examdata={exams} />
      <OtherCourses streamdata={streams} />
      {testdata?.length > 0 && <Testimonial testimonials={testdata} />}
      <OrganizationSection data={pagedata} />
      <ExperTraineeSec data={pagedata} />
      <ExpertSection />
    </>
  )
}

export default InnerCoursePage

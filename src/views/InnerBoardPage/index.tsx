'use client'
import React from 'react'
import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import LocationSection from './Components/LocateSection'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import Head from 'next/head'
import { useRouter } from 'src/hooks/useCompatRouter'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const suffix = day >= 11 && day <= 13 ? 'th'
    : day % 10 === 1 ? 'st'
    : day % 10 === 2 ? 'nd'
    : day % 10 === 3 ? 'rd' : 'th'
  const [month, year] = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).split(' ')
  return `${day}${suffix} ${month} ${year}`
}

function InnerBoardPage({ pagedata, exams }) {
  const router = useRouter()
  const canonicalPath = router.asPath.split('?')[0]

  const now = new Date()
  const upcomingExams = exams
    .map((exam: any) => ({ ...exam, upcoming_date: new Date(exam.upcoming_date) }))
    .filter((exam: any) => exam.upcoming_date >= now)
    .sort((a: any, b: any) => a.upcoming_date.getTime() - b.upcoming_date.getTime())
    .map((exam: any) => ({ ...exam, date: formatDate(exam.upcoming_date.toISOString()) }))

  const formattedData = pagedata?.schoolboardfaqs?.map((item) => ({
    '@type': 'Question',
    name: item.questions,
    acceptedAnswer: { '@type': 'Answer', text: item.answers },
  }))

  const title = pagedata?.meta_title || 'Study in India | Study Abroad | Learntech Edu Solutions'
  const description = pagedata?.meta_description || 'Are you searching for which board is best for your child'
  const canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${canonicalPath}`
  const ogImage = `${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.icon}`

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
              { '@type': 'ListItem', position: 2, name: 'Boards', item: `${process.env.NEXT_PUBLIC_WEB_URL}/boards` },
              { '@type': 'ListItem', position: 3, name: pagedata?.short_name, item: canonicalUrl },
            ],
          }])}
        </script>
      </Head>

      <BannerSection data={pagedata} />
      <CollegeInfoSection data={pagedata} exams={upcomingExams} />
      <LocationSection data={pagedata} />
      <TopFeaturedColleges />
    </>
  )
}

export default InnerBoardPage

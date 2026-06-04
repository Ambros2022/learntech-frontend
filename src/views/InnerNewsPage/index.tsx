'use client'
import React from 'react'
import BannerSec from './Components/BannerSec'
import InfoSec from './Components/InfoSec'
import ExpertSection from './Components/ExpertSection'
import Head from 'next/head'
import { useRouter } from 'src/hooks/useCompatRouter'

function InnerNewsPage({ pagedata }) {
  const router = useRouter()
  const canonicalPath = router.asPath.split('?')[0]

  const title = pagedata?.meta_title || 'Study in India | Study Abroad | Learntech Edu Solutions'
  const description = pagedata?.meta_description || 'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.'
  const canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${canonicalPath}`
  const ogImage = pagedata?.imageUrl || `${process.env.NEXT_PUBLIC_WEB_URL}/images/icons/learntech-logo.png`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={pagedata?.meta_keyword || 'Learntechweb'} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
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
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: pagedata?.meta_title,
            image: [ogImage],
            datePublished: pagedata?.created_at,
            dateModified: pagedata?.updated_at,
            author: { '@type': 'Organization', name: 'Learntech Edu Solutions' },
            publisher: {
              '@type': 'Organization',
              name: 'Learntech Edu Solutions',
              logo: { '@type': 'ImageObject', url: `${process.env.NEXT_PUBLIC_WEB_URL}/images/icons/learntech-logo.png` },
            },
            description: pagedata?.meta_description,
            url: canonicalUrl,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify([{
            '@context': 'https://schema.org/',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.NEXT_PUBLIC_WEB_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'News', item: `${process.env.NEXT_PUBLIC_WEB_URL}/news` },
              { '@type': 'ListItem', position: 3, name: pagedata?.name, item: canonicalUrl },
            ],
          }])}
        </script>
      </Head>

      <BannerSec data={pagedata} />
      <InfoSec data={pagedata} />
      <ExpertSection />
    </>
  )
}

export default InnerNewsPage

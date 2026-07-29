import { getPageData } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import InnerHeader from 'src/views/SimplePage/InnerHeader'
import Breadcrumbs from 'src/views/SimplePage/Breadcrumb'
import DisclaimerText from 'src/views/DisclaimerPage/Components/DisclaimerText'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'

export async function generateMetadata() {
  const data = await getPageData('disclaimer')

  return {
    title: data?.meta_title || 'Disclaimer | Learntech Edu Solutions',
    description:
      data?.meta_description ||
      'Read the disclaimer of Learntech Edu Solutions Pvt. Ltd. for important information about the use of our website and services.',
    keywords: data?.meta_keyword || '',
    robots: 'index, follow',
    alternates: {
      canonical: `${BASE_URL}/disclaimer`,
    },
    openGraph: {
      title: data?.meta_title || 'Disclaimer | Learntech Edu Solutions',
      description:
        data?.meta_description ||
        'Read the disclaimer of Learntech Edu Solutions Pvt. Ltd. for important information about the use of our website and services.',
      url: `${BASE_URL}/disclaimer`,
      siteName: 'Learntech Edu Solutions',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/images/icons/learntech-logo.png`,
          width: 1200,
          height: 630,
          alt: 'Learntech Edu Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data?.meta_title || 'Disclaimer | Learntech Edu Solutions',
      description: data?.meta_description || '',
    },
  }
}

export default async function DisclaimerPage() {
  // React.cache() in getPageData deduplicates this call with the one in
  // generateMetadata — only one network request is made per server render.
  const data = await getPageData('disclaimer')

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Disclaimer',
        item: `${BASE_URL}/disclaimer`,
      },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data?.meta_title || 'Disclaimer | Learntech Edu Solutions',
    description:
      data?.meta_description ||
      'Read the disclaimer of Learntech Edu Solutions Pvt. Ltd. for important information about the use of our website and services.',
    url: `${BASE_URL}/disclaimer`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Learntech Edu Solutions',
      url: BASE_URL,
    },
    inLanguage: 'en-IN',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Disclaimer', item: `${BASE_URL}/disclaimer` },
      ],
    },
  }

  return (
    <>
      {/* Preload hero banner — tells browser to fetch BannerBG.webp immediately,
          reducing LCP. Next.js hoists <link> tags from Server Components into <head>. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preload" as="image" href="/images/icons/BannerBG.webp" />

      {/* Structured data — rendered in <head> by Next.js, zero client JS */}
      <JsonLd id="breadcrumb-schema" schema={breadcrumbSchema} />
      <JsonLd id="webpage-schema" schema={webPageSchema} />


      {/* Hero banner — next/image with priority ensures early fetch */}
      <InnerHeader
        title="Learntech Edu Solutions Pvt. Ltd."
        align="center"
      />

      <Breadcrumbs link="Disclaimer" />

      {/*
        CSS-only fade-up animation replaces <AnimateOnScroll> Client Component.
        Visually identical — uses the ltFadeUp @keyframes defined in globals.css.
        Zero JavaScript shipped to browser, zero hydration cost.
      */}
      <div className="animate-fade-up">
        <DisclaimerText data={data} />
      </div>
    </>
  )
}

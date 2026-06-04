import { getPageData } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import AnimateOnScroll from 'src/app/components/AnimateOnScroll'
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

  return (
    <>
      <JsonLd id="breadcrumb-schema" schema={breadcrumbSchema} />

      <InnerHeader
        title="Learntech Edu Solutions Pvt. Ltd."
        // description="Stay up-to-date with Top Colleges, Universities, Exam updates."
        align="center"
      />

      <Breadcrumbs link="Disclaimer" />

      <AnimateOnScroll variant="fade-up" duration={0.7}>
        <DisclaimerText data={data} />
      </AnimateOnScroll>
    </>
  )
}

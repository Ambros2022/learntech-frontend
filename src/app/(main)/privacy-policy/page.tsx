import { getPageData } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import AnimateOnScroll from 'src/app/components/AnimateOnScroll'
import InnerHeader from 'src/views/SimplePage/InnerHeader'
import Breadcrumbs from 'src/views/SimplePage/Breadcrumb'
import TermsText from 'src/views/PrivacyPolicyPage/Components/TermsText'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'

export async function generateMetadata() {
  const data = await getPageData('privacy-policy')

  return {
    title: data?.meta_title || 'Privacy Policy | Learntech Edu Solutions',
    description:
      data?.meta_description ||
      'Read the privacy policy of Learntech Edu Solutions to understand how we collect, use, and protect your personal information.',
    keywords: data?.meta_keyword || '',
    alternates: {
      canonical: `${BASE_URL}/privacy-policy`,
    },
    openGraph: {
      title: data?.meta_title || 'Privacy Policy | Learntech Edu Solutions',
      description:
        data?.meta_description ||
        'Read the privacy policy of Learntech Edu Solutions to understand how we collect, use, and protect your personal information.',
      url: `${BASE_URL}/privacy-policy`,
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
      title: data?.meta_title || 'Privacy Policy | Learntech Edu Solutions',
      description: data?.meta_description || '',
    },
  }
}

export default async function PrivacyPolicyPage() {
  // React.cache() deduplicates — no double fetch with generateMetadata
  const data = await getPageData('privacy-policy')

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
        name: 'Privacy Policy',
        item: `${BASE_URL}/privacy-policy`,
      },
    ],
  }

  return (
    <>
      <JsonLd id="breadcrumb-schema" schema={breadcrumbSchema} />

      <InnerHeader
        title="Privacy Policy"
        description="Stay up-to-date with Top Colleges, Universities, Exam updates."
        align="center"
      />

      <Breadcrumbs link="Privacy Policy" />

      <AnimateOnScroll variant="fade-up" duration={0.7}>
        <TermsText data={data} />
      </AnimateOnScroll>
    </>
  )
}

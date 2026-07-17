import { getPageData } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import ContactUsPage from 'src/views/ContactUsPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/contact-us'
const DEFAULT_TITLE = 'Contact Us | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Get in touch with Learntech Edu Solutions for personalized admission guidance. Fill the contact form to connect with our expert advisors for India & Abroad admissions.'

export async function generateMetadata() {
  const data = await getPageData('contact-us')
  const title = data?.meta_title || DEFAULT_TITLE
  const description = data?.meta_description || DEFAULT_DESCRIPTION
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  return {
    title,
    description,
    keywords: data?.meta_keyword || '',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function Page() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact Us',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Learntech Edu Solutions',
    url: BASE_URL,
    logo: `${BASE_URL}/images/icons/learntech-logo.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-1800-120-8696',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: "#80 (4), 'D' Main Rd, East End, 9th Block, Jayanagar",
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560041',
      addressCountry: 'IN',
    },
    email: 'info@learntechww.com',
    telephone: '+91-1800-120-8696',
  }

  return (
    <>
      <JsonLd id="contact-us-breadcrumb-schema" schema={breadcrumbSchema} />
      <JsonLd id="contact-us-organization-schema" schema={organizationSchema} />
      <ContactUsPage />
    </>
  )
}

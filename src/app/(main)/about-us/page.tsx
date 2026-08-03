import { getAboutPageBanners, getAboutVideoTestimonials, getPageData } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import AboutUsPage from 'src/views/AboutUsPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/about-us'
const DEFAULT_TITLE = 'About Learntech Edu Solutions | Study in India & Abroad'
const DEFAULT_DESCRIPTION =
  'Learn about Learntech Edu Solutions, an ISO certified educational consultancy offering admission guidance for students in India and abroad.'

export async function generateMetadata() {
  const data = await getPageData('about-us')
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
  const [banners, testimonials] = await Promise.all([
    getAboutPageBanners(),
    getAboutVideoTestimonials(),
  ])

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
        name: 'About Us',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Learntech Edu Solutions',
    url: `${BASE_URL}${PAGE_PATH}`,
    description: DEFAULT_DESCRIPTION,
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Learntech Edu Solutions',
      url: BASE_URL,
      logo: `${BASE_URL}/images/icons/learntech-logo.png`,
      foundingDate: '1994',
      description: DEFAULT_DESCRIPTION,
    },
  }

  return (
    <>
      <JsonLd id="about-breadcrumb-schema" schema={breadcrumbSchema} />
      <JsonLd id="about-page-schema" schema={aboutPageSchema} />
      <AboutUsPage banners={banners} testimonials={testimonials} />
    </>
  )
}

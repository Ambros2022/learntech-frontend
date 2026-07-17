import { getPageData, getOurTeamBanners, getOurTeams } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import OurTeamPage from 'src/views/OurteamPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/our-team'
const DEFAULT_TITLE = 'Study in India | Study Abroad | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.'

export async function generateMetadata() {
  const data = await getPageData('our-team')
  const title = data?.meta_title || DEFAULT_TITLE
  const description = data?.meta_description || DEFAULT_DESCRIPTION
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  return {
    title,
    description,
    keywords: data?.meta_keyword || 'Learntechweb',
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
  const [pagedata, banners, teamMembers] = await Promise.all([
    getPageData('our-team'),
    getOurTeamBanners(),
    getOurTeams(),
  ])

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
        name: 'Our Team',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      <JsonLd id="our-team-breadcrumb-schema" schema={breadcrumbSchema} />
      <OurTeamPage pagedata={pagedata} banners={banners} users={teamMembers} />
    </>
  )
}

import Homepage from 'src/views/Homepage'
import {
  getHeroBanners,
  getNewsList,
  getColleges,
  getAbroadCountries,
  getLatestNewsList,
  getNewsSectionBanner,
  getStreams,
} from 'src/lib/api/common'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'

export const metadata = {
  title: 'Learntech Edu Solutions | Admissions Across India & Abroad',
  description:
    'Learntech Edu Solutions helps students find the right universities, colleges, and courses across Karnataka, India, and abroad through expert, free admission counselling.',
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  openGraph: {
    title: 'Learntech Edu Solutions | Admissions Across India & Abroad',
    description:
      'Learntech Edu Solutions helps students find the right universities, colleges, and courses across Karnataka, India, and abroad through expert, free admission counselling.',
    url: `${BASE_URL}/`,
    siteName: 'Learntech Edu Solutions',
    images: [
      {
        url: `${BASE_URL}/images/icons/learntech-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Learntech Edu Solutions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learntech Edu Solutions | Admissions Across India & Abroad',
    description:
      'Learntech Edu Solutions helps students find the right universities, colleges, and courses across Karnataka, India, and abroad through expert, free admission counselling.',
    images: [`${BASE_URL}/images/icons/learntech-logo.png`],
  },
}

export default async function Page() {
  const [banners, news, abroadCountries, latestNewsItems, newsBanner, rawStreams] =
    await Promise.all([
      getHeroBanners(),
      getNewsList({ size: 10, columnname: 'created_at' }),
      getAbroadCountries(),
      getLatestNewsList(8),
      getNewsSectionBanner(),
      getStreams({ size: 50 }),
    ])

  const expertStreams = (rawStreams ?? []).map((s: any) => ({ id: s.id as number, name: s.name as string }))

  const abroadCountryId = abroadCountries[0]?.id ?? null
  const { data: abroadColleges } = abroadCountryId
    ? await getColleges({ country_id: abroadCountryId, size: 10 })
    : { data: [] }

  return (
    <Homepage
      banners={banners}
      news={news}
      studyAbroad={{ countries: abroadCountries, colleges: abroadColleges, countryId: abroadCountryId }}
      latestNews={{ news: latestNewsItems, banner: newsBanner }}
      expertStreams={expertStreams}
    />
  )
}

import Homepage from 'src/views/Homepage'
import { getHeroBanners, getNewsList, getColleges } from 'src/lib/api/common'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'

export const metadata = {
  title: 'Learntech Edu Solutions | Best Education Consultancy in Bangalore',
  description:
    'Discover top colleges, courses and career opportunities across India. Get expert admission guidance from Learntech Edu Solutions — trusted education consultants in Bangalore.',
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  openGraph: {
    title: 'Learntech Edu Solutions | Best Education Consultancy in Bangalore',
    description:
      'Discover top colleges, courses and career opportunities across India. Get expert admission guidance from Learntech Edu Solutions.',
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
    title: 'Learntech Edu Solutions | Best Education Consultancy in Bangalore',
    description:
      'Discover top colleges, courses and career opportunities across India.',
    images: [`${BASE_URL}/images/icons/learntech-logo.png`],
  },
}

export default async function Page() {
  const [banners, news, { data: colleges }] = await Promise.all([
    getHeroBanners(),
    getNewsList({ size: 10, columnname: 'created_at' }),
    getColleges({ size: 10, type: 'college' }),
  ])
  return <Homepage banners={banners} news={news} colleges={colleges} />
}

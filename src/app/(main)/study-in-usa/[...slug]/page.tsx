import { notFound } from 'next/navigation'
import AbroadUniversity from 'src/views/AbroadUniversity'
import { getAbroadCountryPage, getCollegeById, getTestimonialsByCollege } from 'src/lib/api/common'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'
const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (!slug?.[0]) return { title: 'Not Found', robots: 'noindex' }
  const pagedata = await getCollegeById(slug[0]).catch(() => null)
  if (!pagedata) return { title: 'Not Found', robots: 'noindex' }

  const url = `${BASE_URL}/study-in-usa/${slug[0]}/${slug[1] ?? pagedata.slug}`
  const title = pagedata.meta_title || `${pagedata.name || 'University'} - Study in USA | Learntech Edu Solutions`
  const description = pagedata.meta_description || `Detailed guide to ${pagedata.name || 'university'}, including courses offered, admission process, fees structure, ranking, and eligibility.`
  const keywords = pagedata.meta_keyword || `${pagedata.name || ''}, study in usa, university admission`
  const image = pagedata.logo ? `${IMG_BASE}/${pagedata.logo}` : `${BASE_URL}/images/og-image.png`

  return {
    title,
    description,
    keywords,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!slug?.[0]) notFound()

  const [pagedata, testdata, countryData] = await Promise.all([
    getCollegeById(slug[0]).catch(() => null),
    getTestimonialsByCollege(slug[0]).catch(() => []),
    getAbroadCountryPage('study-in-usa').catch(() => null),
  ])

  if (!pagedata) notFound()
  return <AbroadUniversity pagedata={pagedata} testdata={testdata ?? []} Countrydata={countryData} />
}

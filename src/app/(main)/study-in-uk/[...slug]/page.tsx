import { notFound } from 'next/navigation'
import AbroadUniversity from 'src/views/AbroadUniversity'
import { getAbroadCountryPage, getCollegeById, getTestimonialsByCollege } from 'src/lib/api/common'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (!slug?.[0]) return { title: 'Not Found', robots: 'noindex' }
  const pagedata = await getCollegeById(slug[0])
  if (!pagedata) return { title: 'Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/study-in-uk/${slug[0]}/${slug[1] ?? pagedata.slug}`
  return {
    title: pagedata.meta_title,
    description: pagedata.meta_description,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title: pagedata.meta_title, description: pagedata.meta_description, url },
    twitter: { card: 'summary_large_image', title: pagedata.meta_title, description: pagedata.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  if (!slug?.[0]) notFound()
  const [pagedata, testdata, countryData] = await Promise.all([
    getCollegeById(slug[0]),
    getTestimonialsByCollege(slug[0]),
    getAbroadCountryPage('study-in-uk'),
  ])
  if (!pagedata) notFound()
  return <AbroadUniversity pagedata={pagedata} testdata={testdata} Countrydata={countryData} />
}

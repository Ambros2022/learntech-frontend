import { notFound } from 'next/navigation'
import InnerUniversityPage from 'src/views/InnerUniversityPage'
import { getCollegeById, getTestimonialsByCollege } from 'src/lib/api/common'

type Props = { params: Promise<{ universityId: string; universitySlug: string }> }

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'
const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export async function generateMetadata({ params }: Props) {
  const { universityId } = await params
  const uni = await getCollegeById(universityId)
  if (!uni) return { title: 'University Not Found', robots: 'noindex' }
  const url = `${BASE_URL}/university/${uni.id}/${uni.slug}`
  const title = uni.meta_title || `${uni.name || 'University'} - Admission, Courses, Fees, Ranking`
  const description = uni.meta_description || `Find detailed information about ${uni.name || 'university'}, including courses offered, admission procedure, placement statistics, fees, and ranking.`
  const image = uni.logo ? [`${IMG_URL}/${uni.logo}`] : []

  return {
    title,
    description,
    keywords: uni.meta_keyword,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title, description, url, images: image },
    twitter: { card: 'summary_large_image', title, description, images: image },
  }
}

export default async function Page({ params }: Props) {
  const { universityId } = await params
  const [pagedata, testdata] = await Promise.all([getCollegeById(universityId), getTestimonialsByCollege(universityId)])
  if (!pagedata) notFound()
  return <InnerUniversityPage pagedata={pagedata} testdata={testdata} />
}


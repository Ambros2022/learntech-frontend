import { notFound } from 'next/navigation'
import InnerUniversityPage from 'src/views/InnerUniversityPage'
import { getCollegeById, getTestimonialsByCollege } from 'src/lib/api/common'

type Props = { params: Promise<{ universityId: string; universitySlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { universityId } = await params
  const uni = await getCollegeById(universityId)
  if (!uni) return { title: 'University Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/university/${uni.id}/${uni.slug}`
  return {
    title: uni.meta_title, description: uni.meta_description, keywords: uni.meta_keyword,
    robots: 'index, follow', alternates: { canonical: url },
    openGraph: { title: uni.meta_title, description: uni.meta_description, url, images: [`${process.env.NEXT_PUBLIC_IMG_URL}/${uni.logo}`] },
    twitter: { card: 'summary_large_image', title: uni.meta_title, description: uni.meta_description, images: [`${process.env.NEXT_PUBLIC_IMG_URL}/${uni.logo}`] },
  }
}

export default async function Page({ params }: Props) {
  const { universityId } = await params
  const [pagedata, testdata] = await Promise.all([getCollegeById(universityId), getTestimonialsByCollege(universityId)])
  if (!pagedata) notFound()
  return <InnerUniversityPage pagedata={pagedata} testdata={testdata} />
}

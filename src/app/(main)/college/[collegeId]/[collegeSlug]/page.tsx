import { notFound } from 'next/navigation'
import InnerCollegePage from 'src/views/InnerCollegePage'
import { getCollegeById } from 'src/lib/api/common'

type Props = { params: Promise<{ collegeId: string; collegeSlug: string }> }

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'
const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export async function generateMetadata({ params }: Props) {
  const { collegeId } = await params
  const college = await getCollegeById(collegeId)
  if (!college) return { title: 'College Not Found', robots: 'noindex' }
  const url = `${BASE_URL}/college/${college.id}/${college.slug}`
  const title = college.meta_title || `${college.name || 'College'} - Admission, Courses, Fees, Ranking`
  const description = college.meta_description || `Explore ${college.name || 'college'} admission process, course details, fees structure, ranking, and placement opportunities.`
  const image = college.logo ? [`${IMG_URL}/${college.logo}`] : []

  return {
    title,
    description,
    keywords: college.meta_keyword,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title, description, url, images: image },
    twitter: { card: 'summary_large_image', title, description, images: image },
  }
}

export default async function Page({ params }: Props) {
  const { collegeId } = await params
  const pagedata = await getCollegeById(collegeId)
  if (!pagedata) notFound()
  // @ts-expect-error async server component
  return <InnerCollegePage pagedata={pagedata} />
}


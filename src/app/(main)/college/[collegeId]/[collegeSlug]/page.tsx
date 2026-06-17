import { notFound } from 'next/navigation'
import InnerCollegePage from 'src/views/InnerCollegePage'
import { getCollegeById } from 'src/lib/api/common'

type Props = { params: Promise<{ collegeId: string; collegeSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { collegeId } = await params
  const college = await getCollegeById(collegeId)
  if (!college) return { title: 'College Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/college/${college.id}/${college.slug}`
  return {
    title: college.meta_title,
    description: college.meta_description,
    keywords: college.meta_keyword,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title: college.meta_title, description: college.meta_description, url, images: [`${process.env.NEXT_PUBLIC_IMG_URL}/${college.logo}`] },
    twitter: { card: 'summary_large_image', title: college.meta_title, description: college.meta_description, images: [`${process.env.NEXT_PUBLIC_IMG_URL}/${college.logo}`] },
  }
}

export default async function Page({ params }: Props) {
  const { collegeId } = await params
  const pagedata = await getCollegeById(collegeId)
  if (!pagedata) notFound()
  // @ts-expect-error async server component
  return <InnerCollegePage pagedata={pagedata} />
}

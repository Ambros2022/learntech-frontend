import { notFound } from 'next/navigation'
import InnerScholarshipPage from 'src/views/InnerScholarshipPage'
import { getScholarshipById, getScholarships } from 'src/lib/api/common'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const scholarship = await getScholarshipById(slug[0])
  if (!scholarship) return { title: 'Scholarship Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/scholarship/${slug[0]}/${slug[1] ?? scholarship.slug}`
  return {
    title: scholarship.meta_title,
    description: scholarship.meta_description,
    keywords: scholarship.meta_keyword,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title: scholarship.meta_title, description: scholarship.meta_description, url },
    twitter: { card: 'summary_large_image', title: scholarship.meta_title, description: scholarship.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const [pagedata, scholarships] = await Promise.all([
    getScholarshipById(slug[0]),
    getScholarships({ size: 20 }),
  ])
  if (!pagedata) notFound()
  return <InnerScholarshipPage pagedata={pagedata} scholarships={scholarships} />
}

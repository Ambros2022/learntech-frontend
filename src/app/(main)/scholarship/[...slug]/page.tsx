import { notFound } from 'next/navigation'
import InnerScholarshipPage from 'src/views/InnerScholarshipPage'
import { getScholarshipById } from 'src/lib/api/common'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const scholarship = await getScholarshipById(slug[0])
  if (!scholarship) return { title: 'Scholarship Not Found', robots: 'noindex' }
  return {
    title: scholarship.meta_title, description: scholarship.meta_description,
    robots: 'index, follow',
    openGraph: { title: scholarship.meta_title, description: scholarship.meta_description },
    twitter: { card: 'summary_large_image', title: scholarship.meta_title, description: scholarship.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const pagedata = await getScholarshipById(slug[0])
  if (!pagedata) notFound()
  return <InnerScholarshipPage id={slug[0]} />
}

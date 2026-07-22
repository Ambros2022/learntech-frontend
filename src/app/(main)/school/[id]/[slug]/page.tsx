import { notFound } from 'next/navigation'
import InnerSchoolPage from 'src/views/InnerSchoolPage'
import { getSchoolById } from 'src/lib/api/common'

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const school = await getSchoolById(id)
  if (!school) return { title: 'School Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/school/${school.id}/${school.slug}`
  return {
    title: school.meta_title, description: school.meta_description,
    robots: 'index, follow', alternates: { canonical: url },
    openGraph: { title: school.meta_title, description: school.meta_description, url },
    twitter: { card: 'summary_large_image', title: school.meta_title, description: school.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const pagedata = await getSchoolById(id)
  if (!pagedata) notFound()
  return <InnerSchoolPage pagedata={pagedata} />
}

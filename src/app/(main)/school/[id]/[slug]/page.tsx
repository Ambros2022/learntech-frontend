import { notFound } from 'next/navigation'
import InnerSchoolPage from 'src/views/InnerSchoolPage'
import { getSchoolById } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'

const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')
const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id, slug } = await params
  const school = await getSchoolById(id)
  if (!school) return { title: 'School Not Found', robots: { index: false, follow: false } }

  const url = `${WEB_URL}/school/${school.id}/${school.slug || slug}`
  const ogImage = school.icon ? `${IMG_URL}/${school.icon}` : undefined

  // Guard against empty strings returned by the API
  const DEFAULT_TITLE = `${school.name} | Learntech Edu Solutions`
  const DEFAULT_DESCRIPTION = `Explore ${school.name} — admissions, facilities, fee structure and more.`
  const title = school.meta_title?.trim() || DEFAULT_TITLE
  const description = school.meta_description?.trim() || DEFAULT_DESCRIPTION

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Learntech Edu Solutions',
      ...(ogImage && { images: [{ url: ogImage, width: 800, height: 600, alt: school.name }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@learntechww',
    },
  }
}

export default async function Page({ params }: Props) {
  const { id, slug } = await params
  const pagedata = await getSchoolById(id)
  if (!pagedata) notFound()

  const canonicalUrl = `${WEB_URL}/school/${pagedata.id}/${pagedata.slug || slug}`
  const ogImage = pagedata.icon ? `${IMG_URL}/${pagedata.icon}` : undefined

  const schoolSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: pagedata.name,
    url: canonicalUrl,
    ...(pagedata.address && { address: pagedata.address }),
    ...(ogImage && { image: ogImage }),
    ...(pagedata.description && { description: pagedata.description }),
  }

  return (
    <>
      <JsonLd id="school-schema" schema={schoolSchema} />
      <InnerSchoolPage pagedata={pagedata} />
    </>
  )
}

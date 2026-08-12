import { notFound, redirect } from 'next/navigation'
import { getBoardById, getExams, getSchools } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import InnerBoardPage from 'src/views/InnerBoardPage'

const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')
const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id, slug } = await params
  const board = await getBoardById(id)
  if (!board) return { title: 'Board Not Found', robots: { index: false, follow: false } }
  const url = `${WEB_URL}/board/${board.id}/${board.slug || slug}`
  const ogImage = board.icon ? `${IMG_URL}/${board.icon}` : undefined
  return {
    title: board.meta_title,
    description: board.meta_description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: board.meta_title,
      description: board.meta_description,
      url,
      siteName: 'Learntech Edu Solutions',
      ...(ogImage && { images: [{ url: ogImage, width: 800, height: 600, alt: board.name }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: board.meta_title,
      description: board.meta_description,
      site: '@learntechww',
    },
  }
}

export default async function Page({ params }: Props) {
  const { id, slug } = await params
  const [pagedata, exams, schools] = await Promise.all([
    getBoardById(id),
    getExams({ size: 10 }),
    getSchools({ page: '1', size: '20' }),
  ])
  if (!pagedata) notFound()
  if (pagedata.slug && pagedata.slug !== slug) redirect(`/board/${pagedata.id}/${pagedata.slug}`)

  const canonicalUrl = `${WEB_URL}/board/${pagedata.id}/${pagedata.slug || slug}`

  const faqEntities: any[] = (pagedata.schoolboardfaqs ?? []).map((item: any) => ({
    '@type': 'Question',
    name: item.questions,
    acceptedAnswer: { '@type': 'Answer', text: item.answers },
  }))

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${WEB_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Boards', item: `${WEB_URL}/boards` },
      { '@type': 'ListItem', position: 3, name: pagedata.short_name, item: canonicalUrl },
    ],
  }
  return (
    <>
      <JsonLd id="board-breadcrumb" schema={breadcrumbSchema} />
      {faqEntities.length > 0 && (
        <JsonLd
          id="board-faq"
          schema={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntities }}
        />
      )}
      <InnerBoardPage pagedata={pagedata} exams={exams} schools={schools} />
    </>
  )
}

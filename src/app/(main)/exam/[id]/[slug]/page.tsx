import { notFound } from 'next/navigation'
import InnerExamPage from 'src/views/InnerExamPage'
import {
  getExamById,
  getOrganizationPage,
  getCounsellorTeams,
  getExamPageBanner,
  getExamNewsLinks,
  getExams,
} from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com').replace(/\/+$/, '')

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const exam = await getExamById(id)
  if (!exam) return { title: 'Exam Not Found', robots: { index: false, follow: false } }

  const url = `${BASE_URL}/exam/${exam.id}/${exam.slug}`
  const title = exam.meta_title || `${exam.exam_title} Exam | Learntech Edu Solutions`
  const description = exam.meta_description || 'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to students in India & Abroad.'

  return {
    title,
    description,
    keywords: exam.meta_keyword || '',
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Learntech Edu Solutions',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/images/icons/learntech-logo.png`,
          width: 1200,
          height: 630,
          alt: 'Learntech Edu Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params

  const [pagedata, organizationPage, trainers, promoBanners, newsLinks, allExams] =
    await Promise.all([
      getExamById(id),
      getOrganizationPage('Exams'),
      getCounsellorTeams(),
      getExamPageBanner(),
      getExamNewsLinks(),
      getExams({ page: 1, size: 10 }),
    ])

  if (!pagedata) notFound()

  const examUrl = `${BASE_URL}/exam/${pagedata.id}/${pagedata.slug}`
  const logoUrl = `${BASE_URL}/images/icons/learntech-logo.png`

  // ── JSON-LD: Article (exam content page) ─────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pagedata.meta_title?.trim() || `${pagedata.exam_title} Exam | Learntech Edu Solutions`,
    description: pagedata.meta_description?.trim() || '',
    url: examUrl,
    datePublished: pagedata.created_at || new Date().toISOString(),
    dateModified: pagedata.updated_at || pagedata.created_at || new Date().toISOString(),
    author: { '@type': 'Organization', name: 'Learntech Edu Solutions', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Learntech Edu Solutions',
      logo: { '@type': 'ImageObject', url: logoUrl },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': examUrl },
  }

  // ── JSON-LD: FAQPage ──────────────────────────────────────────────────────
  const faqSchema =
    pagedata.examfaqs?.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: pagedata.examfaqs.map((item: any) => ({
            '@type': 'Question',
            name: item.questions,
            acceptedAnswer: { '@type': 'Answer', text: item.answers },
          })),
        }
      : null

  // ── JSON-LD: BreadcrumbList ───────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Exams', item: `${BASE_URL}/exams` },
      {
        '@type': 'ListItem',
        position: 3,
        name: pagedata.exam_title,
        item: examUrl,
      },
    ],
  }

  // ── Upcoming exams: filter + sort server-side ─────────────────────────────
  const now = Date.now()
  const upcomingExams = (allExams as any[])
    .filter((e) => e.upcoming_date && new Date(e.upcoming_date).getTime() >= now)
    .sort((a, b) => new Date(a.upcoming_date).getTime() - new Date(b.upcoming_date).getTime())
    .map((e) => ({
      id: e.id,
      slug: e.slug,
      title: e.exam_title,
      upcoming_date: e.upcoming_date as string, // ISO string — serialisable
    }))

  return (
    <>
      <JsonLd id="exam-article-schema" schema={articleSchema} />
      {faqSchema && <JsonLd id="exam-faq-schema" schema={faqSchema} />}
      <JsonLd id="exam-breadcrumb-schema" schema={breadcrumbSchema} />
      <InnerExamPage
        pagedata={pagedata}
        organizationPage={organizationPage}
        trainers={trainers}
        promoBanners={promoBanners}
        newsLinks={newsLinks}
        upcomingExams={upcomingExams}
      />
    </>
  )
}

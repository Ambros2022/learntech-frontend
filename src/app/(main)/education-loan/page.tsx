import { getPageData } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import EducationLoanPage from 'src/views/EducationLoanPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/education-loan'
const DEFAULT_TITLE = 'Education Loan for Students in India & Abroad | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Get complete guidance on education loans for studying in India and abroad. Learntech Edu Solutions helps students secure the best education loan options.'

export async function generateMetadata() {
  const data = await getPageData('education-loan')
  const title = data?.meta_title || DEFAULT_TITLE
  const description = data?.meta_description || DEFAULT_DESCRIPTION
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  return {
    title,
    description,
    keywords: data?.meta_keyword || '',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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
    robots: {
      index: true,
      follow: true,
    },
  }
}

const FAQ_DATA = [
  {
    questions: 'How can I apply for an educational loan?',
    answers:
      '<p>You can apply for an educational loan through banks, financial institutions, or directly through the educational institution\'s loan programs (if available).</p>',
  },
  {
    questions: 'What is the repayment period for an educational loan?',
    answers:
      '<p>Repayment periods can vary but typically range from 5 to 15 years, depending on the loan terms and lender.</p>',
  },
  {
    questions: 'What should you do if my loan application is denied?',
    answers:
      '<p>If your application is denied, review the reasons provided, address any issues, and consider reapplying or exploring alternative funding options.</p>',
  },
  {
    questions: 'Can I consolidate my educational loans?',
    answers:
      '<p>Yes, many lenders offer loan consolidation options to combine multiple loans into a single loan with one payment.</p>',
  },
  {
    questions: 'Are there any tax benefits associated with educational loans?',
    answers:
      '<p>In some cases, you may qualify for tax deductions on interest paid on educational loans. Consult a CA/ Auditor/ Tax Advisor for details.</p>',
  },
]

export default async function Page() {
  const pagedata = await getPageData('education-loan')

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.questions,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answers.replace(/<[^>]+>/g, ''),
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Education Loan',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      <JsonLd id="education-loan-faq-schema" schema={faqSchema} />
      <JsonLd id="education-loan-breadcrumb-schema" schema={breadcrumbSchema} />
      <EducationLoanPage pagedata={pagedata} faqData={FAQ_DATA} />
    </>
  )
}

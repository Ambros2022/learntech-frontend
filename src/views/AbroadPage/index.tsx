import BannerSec from './Components/BannerSec'
import StudySec from './Components/StudySec'
import TopUniversity from './Components/TopUniversity'
import FaqSec from './Components/FaqSec'
import OrganizationSection from './Components/OrganizationalSec'
import ExpertTraineeSec from './Components/ExpertTrainneSec'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

interface Props { data: any }

export default function AbroadPage({ data }: Props) {
  const faqSchema = data?.abroadpagefaqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.abroadpagefaqs.map((item: any) => ({
      '@type': 'Question',
      name: item.questions,
      acceptedAnswer: { '@type': 'Answer', text: item.answers.replace(/<\/?[^>]+(>|$)/g, '') },
    })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: data?.name || `Study in ${data?.country?.name || 'Abroad'}`, item: `${BASE_URL}/${data?.slug || ''}` },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data?.meta_title || `Study in ${data?.country?.name || 'Abroad'}`,
    description: data?.meta_description || `Comprehensive guide to top universities, eligibility, fees, and admissions to study in ${data?.country?.name || 'Abroad'}.`,
    url: `${BASE_URL}/${data?.slug || ''}`,
  }

  const programSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: `Study in ${data?.country?.name || 'Abroad'} Higher Education Programs`,
    description: `Explore degree and higher education study abroad opportunities in ${data?.country?.name || 'Abroad'}.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Learntech Edu Solutions',
      sameAs: BASE_URL,
    },
  }

  return (
    <>
      {faqSchema && <JsonLd schema={faqSchema} id="faq-schema" />}
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <JsonLd schema={webPageSchema} id="webpage-schema" />
      <JsonLd schema={programSchema} id="program-schema" />
      <BannerSec data={data} />
      <Breadcrumb items={[{ label: data?.name }]} />
      <StudySec data={data} />
      {/* @ts-expect-error async server component */}
      <OrganizationSection data={data} />
      {/* @ts-expect-error async server component */}
      <ExpertTraineeSec data={data} />
      {/* @ts-expect-error async server component */}
      <TopUniversity data={data} />
      {data?.abroadpagefaqs?.length > 0 && <FaqSec data={data} />}
    </>
  )
}

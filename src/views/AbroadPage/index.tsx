import BannerSec from './Components/BannerSec'
import StudySec from './Components/StudySec'
import TopUniversity from './Components/TopUniversity'
import FaqSec from './Components/FaqSec'
import OrganizationSection from './Components/OrganizationalSec'
import ExpertTraineeSec from './Components/ExpertTrainneSec'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')

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
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: data?.name, item: `${BASE_URL}/${data?.slug}` },
    ],
  }

  return (
    <>
      {faqSchema && <JsonLd schema={faqSchema} id="faq-schema" />}
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
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

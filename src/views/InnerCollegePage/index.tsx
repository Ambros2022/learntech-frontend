import JsonLd from 'src/app/components/JsonLd'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import FacilitiesSection from './Components/FacilitiesSection'
import LocationSection from './Components/LocateSection'
import FeaturedCollegeSection from 'src/views/Homepage/Components/FeaturedCollegeSection'
import ExpertSection from './Components/ExpertSection'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || ''
const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export default async function InnerCollegePage({ pagedata }: { pagedata: any }) {
  const collegeUrl = `${BASE_URL}/college/${pagedata.id}/${pagedata.slug}`

  const faqSchema = pagedata?.collegefaqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pagedata.collegefaqs.map((item: any) => ({
      '@type': 'Question',
      name: item.questions,
      acceptedAnswer: { '@type': 'Answer', text: item.answers },
    })),
  } : null

  const collegeSchema = {
    '@context': 'https://schema.org/',
    '@type': 'CollegeOrUniversity',
    name: pagedata?.meta_title,
    logo: `${IMG_URL}/${pagedata?.icon}`,
    url: collegeUrl,
    address: { '@type': 'PostalAddress', streetAddress: pagedata?.address },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Colleges', item: `${BASE_URL}/colleges` },
      { '@type': 'ListItem', position: 3, name: pagedata?.name, item: collegeUrl },
    ],
  }

  return (
    <>
      {faqSchema && <JsonLd schema={faqSchema} id="faq-schema" />}
      <JsonLd schema={collegeSchema} id="college-schema" />
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />

      <BannerSection data={pagedata} />
      <Breadcrumb items={[{ label: 'Colleges', href: '/colleges' }, { label: pagedata?.name }]} />
      <CollegeInfoSection data={pagedata} />
      <FacilitiesSection data={pagedata} />
      <LocationSection data={pagedata} />
      {/* @ts-expect-error async server component */}
      <FeaturedCollegeSection heading="Top Featured Colleges" />
      <ExpertSection collegeName={pagedata?.name} />
    </>
  )
}

import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import FacilitiesSection from './Components/FacilitiesSection'
import SchoolBannerSec from './Components/SchoolBannerSec'
import LocationSection from './Components/LocateSection'
import FeaturedSchoolSection from './Components/TopFeaturedColleges'
import ExpertSection from './Components/ExpertSection'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')

interface Props {
  pagedata: any
}

export default function InnerSchoolPage({ pagedata }: Props) {
  const faqSchema = pagedata?.schfaqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pagedata.schfaqs.map((item: any) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Schools', item: `${BASE_URL}/schools` },
      { '@type': 'ListItem', position: 3, name: pagedata?.name, item: `${BASE_URL}/school/${pagedata?.id}/${pagedata?.slug}` },
    ],
  }

  return (
    <>
      {faqSchema && <JsonLd schema={faqSchema} id="faq-schema" />}
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <BannerSection data={pagedata} />
      <Breadcrumb items={[
        { label: 'Schools', href: '/schools' },
        { label: pagedata?.name },
      ]} />
      <CollegeInfoSection data={pagedata} />
      <FacilitiesSection data={pagedata} />
      <SchoolBannerSec data={pagedata} />
      <LocationSection data={pagedata} />
      {/* @ts-expect-error async server component */}
      <FeaturedSchoolSection />
      <ExpertSection />
    </>
  )
}

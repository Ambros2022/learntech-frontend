import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import FacilitiesSection from './Components/FacilitiesSection'
import LocationSection from './Components/LocateSection'
import FeaturedUniversitySection from './Components/TopFeaturedColleges'
import ExpertSection from './Components/ExpertSection'
import TestimonialSec from './Components/TestimonialSec'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')

interface Props {
  pagedata: any
  testdata?: any[]
}

export default function InnerUniversityPage({ pagedata, testdata }: Props) {
  const faqSchema = pagedata?.collegefaqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pagedata.collegefaqs.map((item: any) => ({
      '@type': 'Question',
      name: item.questions,
      acceptedAnswer: { '@type': 'Answer', text: item.answers },
    })),
  } : null

  const uniSchema = {
    '@context': 'https://schema.org/',
    '@type': 'CollegeOrUniversity',
    name: pagedata?.meta_title,
    logo: `${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.icon}`,
    url: `${BASE_URL}/university/${pagedata?.id}/${pagedata?.slug}`,
    address: { '@type': 'PostalAddress', streetAddress: pagedata?.address },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Universities', item: `${BASE_URL}/universities` },
      { '@type': 'ListItem', position: 3, name: pagedata?.name, item: `${BASE_URL}/university/${pagedata?.id}/${pagedata?.slug}` },
    ],
  }

  return (
    <>
      {faqSchema && <JsonLd schema={faqSchema} id="faq-schema" />}
      <JsonLd schema={uniSchema} id="university-schema" />
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <BannerSection data={pagedata} />
      <Breadcrumb items={[
        { label: 'Universities', href: '/universities' },
        { label: pagedata?.name },
      ]} />
      <CollegeInfoSection data={pagedata} />
      <FacilitiesSection data={pagedata} />
      {testdata && testdata.length > 0 && <TestimonialSec testimonials={testdata} />}
      <LocationSection data={pagedata} />
      {/* @ts-expect-error async server component */}
      <FeaturedUniversitySection />
      <ExpertSection />
    </>
  )
}

import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import FacilitiesSection from './Components/FacilitiesSection'
import LocationSection from './Components/LocateSection'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import Testimonial from './Components/TestimonialSec'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

interface Props {
  pagedata: any
  testdata: any[]
  Countrydata: any
}

export default function AbroadUniversity({ pagedata, testdata, Countrydata }: Props) {
  const faqSchema = pagedata?.collegefaqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pagedata.collegefaqs.map((item: any) => ({
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
      { '@type': 'ListItem', position: 2, name: Countrydata?.name || 'Study Abroad', item: `${BASE_URL}/${Countrydata?.slug || ''}` },
      { '@type': 'ListItem', position: 3, name: pagedata?.name || 'University', item: `${BASE_URL}/${Countrydata?.slug || ''}/${pagedata?.id || ''}/${pagedata?.slug || ''}` },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pagedata?.meta_title || pagedata?.name,
    description: pagedata?.meta_description || `Explore admissions, courses, rankings, and fees for ${pagedata?.name} in ${Countrydata?.name || 'abroad'}.`,
    url: `${BASE_URL}/${Countrydata?.slug || ''}/${pagedata?.id || ''}/${pagedata?.slug || ''}`,
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: pagedata?.name,
    description: pagedata?.meta_description || `${pagedata?.name} courses, admission guide, and campus details.`,
    url: `${BASE_URL}/${Countrydata?.slug || ''}/${pagedata?.id || ''}/${pagedata?.slug || ''}`,
    ...(pagedata?.address ? {
      address: {
        '@type': 'PostalAddress',
        streetAddress: pagedata.address,
      },
    } : {}),
  }

  return (
    <>
      {faqSchema && <JsonLd schema={faqSchema} id="faq-schema" />}
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <JsonLd schema={webPageSchema} id="webpage-schema" />
      <JsonLd schema={organizationSchema} id="organization-schema" />
      <BannerSection data={pagedata} />
      <Breadcrumb items={[
        { label: Countrydata?.name, href: `/${Countrydata?.slug}` },
        { label: pagedata?.name },
      ]} />
      <CollegeInfoSection data={pagedata} />
      <FacilitiesSection data={pagedata} />
      {testdata?.length > 0 && <Testimonial testimonials={testdata} />}
      <LocationSection data={pagedata} />
      {/* @ts-expect-error async server component */}
      <TopFeaturedColleges
        countryId={Countrydata?.country_id}
        countrySlug={Countrydata?.slug}
        countryName={Countrydata?.country?.name}
      />
      {/* <ExpertSection /> */}
    </>
  )
}

import JsonLd from 'src/app/components/JsonLd'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import BannerSection from './Components/BannerSection'
import CourseInfoSection from './Components/CourseInfoSection'
import OtherCourses from './Components/OtherCourses'
import TestimonialSec from './Components/TestimonialSec'
import OrganizationSection from './Components/OrganizationalSec'
import ExpertTrainneSec from './Components/ExpertTrainneSec'
import ExpertSection from './Components/ExpertSection'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || ''

interface Props {
  pagedata: any
  colleges: any[]
  exams: any[]
  streams: any[]
  testdata: any[]
}

export default function InnerCoursePage({ pagedata, colleges, exams, streams, testdata }: Props) {
  const faqSchema = pagedata?.streamfaqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pagedata.streamfaqs.map((item: any) => ({
      '@type': 'Question',
      name: item.questions,
      acceptedAnswer: { '@type': 'Answer', text: item.answers },
    })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Courses', item: `${BASE_URL}/courses` },
      { '@type': 'ListItem', position: 3, name: pagedata?.short_name || pagedata?.name, item: `${BASE_URL}/course/${pagedata?.id}/${pagedata?.slug}` },
    ],
  }

  return (
    <>
      {faqSchema && <JsonLd schema={faqSchema} id="faq-schema" />}
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <BannerSection data={pagedata} />
      <Breadcrumb items={[{ label: 'Courses', href: '/courses' }, { label: pagedata?.name }]} />
      <CourseInfoSection data={pagedata} colleges={colleges} exams={exams} />
      {streams?.length > 0 && <OtherCourses streams={streams} />}
      {testdata?.length > 0 && <TestimonialSec testimonials={testdata} />}
      {/* @ts-expect-error async server component */}
      <OrganizationSection streamName={pagedata?.name} />
      {/* @ts-expect-error async server component */}
      <ExpertTrainneSec streamName={pagedata?.name} />
      <ExpertSection /> 
    </>
  )
}

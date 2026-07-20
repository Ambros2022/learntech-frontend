import JsonLd from 'src/app/components/JsonLd'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import BannerSection from './Components/BannerSection'
import OverviewSection from './Components/OverviewSection'
import PopularCourses from './Components/PopularCourses'
import TestimonialSec from './Components/TestimonialSec'
import OrganizationSection from './Components/OrganizationalSec'
import ExpertTraineeSec from './Components/ExpertTrainneSec'
import ExpertSection from './Components/ExpertSection'

interface Props {
  pagedata: any
  colleges: any[]
  exams: any[]
  testimonials: any[]
}

export default function SubInnerCoursePage({ pagedata, colleges, exams, testimonials }: Props) {
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL ?? ''

  const faqSchema = pagedata?.generalcoursefaqs?.length > 0
    ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pagedata.generalcoursefaqs.map((item: any) => ({
        '@type': 'Question',
        name: item.questions,
        acceptedAnswer: { '@type': 'Answer', text: item.answers },
      })),
    }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${webUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Courses', item: `${webUrl}/courses` },
      { '@type': 'ListItem', position: 3, name: pagedata?.streams?.name, item: `${webUrl}/course/${pagedata?.streams?.id}/${pagedata?.streams?.slug}` },
      { '@type': 'ListItem', position: 4, name: pagedata?.short_name, item: `${webUrl}/course/${pagedata?.streams?.id}/${pagedata?.streams?.slug}/${pagedata?.slug}` },
    ],
  }

  return (
    <>
      {faqSchema && <JsonLd schema={faqSchema} id="faq-schema" />}
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <BannerSection data={pagedata} />
      <Breadcrumb items={[
        { label: 'Courses', href: '/courses' },
        { label: pagedata?.streams?.name, href: `/course/${pagedata?.streams?.id}/${pagedata?.streams?.slug}` },
        { label: pagedata?.short_name },
      ]} />
      <OverviewSection data={pagedata} colleges={colleges} exams={exams} />
      {/* @ts-expect-error async server component */}
      <PopularCourses />
      <TestimonialSec testimonials={testimonials} />
      {/* @ts-expect-error async server component */}
      <OrganizationSection courseName={pagedata?.short_name} />
      {/* @ts-expect-error async server component */}
      <ExpertTraineeSec courseName={pagedata?.short_name} />
      <ExpertSection />
    </>
  )
}

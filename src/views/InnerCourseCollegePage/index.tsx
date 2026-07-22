import JsonLd from 'src/app/components/JsonLd'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import BannerSection from './Components/BannerSection'
import CourseDetailSec from './Components/CourseDetailSec'
import ExpertSection from './Components/ExpertSection'
import TopFeaturedColleges from './Components/TopFeaturedColleges'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || ''

export default async function InnerCourseCollegePage({ pagedata, Collegeid }: { pagedata: any; Collegeid: string }) {
  const collegeUrl = `${BASE_URL}/college/${Collegeid}/${pagedata?.college?.slug}`
  const courseUrl = `${collegeUrl}/${pagedata?.slug}`

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: pagedata?.title,
    description: pagedata?.meta_description,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: pagedata?.college?.name,
      url: collegeUrl,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Colleges', item: `${BASE_URL}/colleges` },
      { '@type': 'ListItem', position: 3, name: pagedata?.college?.name, item: collegeUrl },
      { '@type': 'ListItem', position: 4, name: pagedata?.course_short_name, item: courseUrl },
    ],
  }

  return (
    <>
      <JsonLd schema={courseSchema} id="course-schema" />
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <BannerSection data={pagedata} />
      <Breadcrumb items={[
        { label: 'Colleges', href: '/colleges' },
        { label: pagedata?.college?.name, href: collegeUrl },
        { label: pagedata?.course_short_name },
      ]} />
      <CourseDetailSec data={pagedata} />
      <ExpertSection collegeName={pagedata?.college?.name} courseName={pagedata?.title} />

      {/* @ts-expect-error async server component */}
      <TopFeaturedColleges streamId={pagedata?.generalcourse?.stream_id} shortName={pagedata?.short_name} />
    </>
  )
}

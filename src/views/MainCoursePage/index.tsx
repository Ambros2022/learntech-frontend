import JsonLd from 'src/app/components/JsonLd'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import BannerSec from './Components/BannerSec'
import BestCoursesSec from './Components/BestCoursesSec'
import CoursesContainer from './Components/CoursesCard'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

interface Props {
  trendingCourses: any[]
  initialCourses: any[]
  totalItems: number
  promoban: any | null
}

export default function MainCoursePage({ trendingCourses, initialCourses, totalItems, promoban }: Props) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Courses', item: `${BASE_URL}/courses` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Courses & Streams',
    description: 'Explore degree programs and streams in India',
    numberOfItems: initialCourses?.length || 0,
    itemListElement: (initialCourses || []).map((course: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.name,
      url: `${BASE_URL}/course/${course.id}/${course.slug}`,
    })),
  }

  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <JsonLd schema={itemListSchema} id="courses-itemlist-schema" />
      <BannerSec trendingCourses={trendingCourses} />
      <Breadcrumb items={[{ label: 'Courses' }]} />
      <BestCoursesSec />
      <CoursesContainer initialCourses={initialCourses} totalItems={totalItems} promoban={promoban} />
    </>
  )
}

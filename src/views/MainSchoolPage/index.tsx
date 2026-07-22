import BannerSection from './Components/BannerSection'
import TopSchoolsSection from './Components/TopCollegesSection'
import ExpertSection from './Components/ExpertSection'
import FeaturedBlogSection from './Components/TopFeaturedColleges'
import CollegeFilterSection from './Components/CollegeFilterSection'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')

interface Props {
  pagedata?: any
}

export default function MainSchoolPage({ pagedata }: Props) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Schools', item: `${BASE_URL}/schools` },
    ],
  }

  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <BannerSection />
      <Breadcrumb items={[{ label: 'Schools' }]} />
      <TopSchoolsSection data={pagedata} />
      <CollegeFilterSection />
      <ExpertSection />
      {/* @ts-expect-error async server component */}
      <FeaturedBlogSection />
    </>
  )
}

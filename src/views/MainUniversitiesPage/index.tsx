import BannerSection from './Components/BannerSection'
import TopUniversitiesSection from './Components/TopCollegesSection'
import ExpertSection from './Components/ExpertSection'
import FeaturedUniversitySection from './Components/TopFeaturedColleges'
import UniversityFilterSection from './Components/CollegeFilterSection'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')

interface Props {
  pagedata?: any
}

export default function MainUniversitiesPage({ pagedata }: Props) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Universities', item: `${BASE_URL}/universities` },
    ],
  }

  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <BannerSection />
      <Breadcrumb items={[{ label: 'Universities' }]} />
      <TopUniversitiesSection data={pagedata} />
      <UniversityFilterSection />
      <ExpertSection />
      {/* @ts-expect-error async server component */}
      <FeaturedUniversitySection />
    </>
  )
}

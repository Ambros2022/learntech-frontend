import BannerSection from './Components/BannerSection'
import TopUniversitiesSection from './Components/TopCollegesSection'
import ExpertSection from './Components/ExpertSection'
import FeaturedUniversitySection from './Components/TopFeaturedColleges'
import UniversityFilterSection from './Components/CollegeFilterSection'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

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

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Universities in India',
    description: 'Find top universities in India with expert admission guidance from Learntech Edu Solutions.',
    url: `${BASE_URL}/universities`,
  }

  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <JsonLd schema={itemListSchema} id="itemlist-schema" />
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

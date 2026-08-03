import JsonLd from 'src/app/components/JsonLd'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import BannerSection from './Components/BannerSection'
import TopCollegesSection from './Components/TopCollegesSection'
import CollegeFilterSection from './Components/CollegeFilterSection'
import ExpertSection from './Components/ExpertSection'
import FeaturedCollegeSection from 'src/views/Homepage/Components/FeaturedCollegeSection'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

export default function MainCollegePage({ pagedata }: { pagedata: any }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Colleges', item: `${BASE_URL}/colleges` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Colleges in India',
    description: 'Find top colleges in India with expert admission guidance from Learntech Edu Solutions.',
    url: `${BASE_URL}/colleges`,
  }

  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <JsonLd schema={itemListSchema} id="itemlist-schema" />
      <BannerSection />
      <Breadcrumb items={[{ label: 'Colleges' }]} />
      <TopCollegesSection data={pagedata} />
      <CollegeFilterSection />
      <ExpertSection />
      {/* @ts-expect-error async server component */}
      <FeaturedCollegeSection />
    </>
  )
}

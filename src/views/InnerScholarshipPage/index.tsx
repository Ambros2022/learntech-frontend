import JsonLd from 'src/app/components/JsonLd'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import BannerSection from './Components/BannerSection'
import OverviewSec from './Components/OverviewSec'

interface Props {
  pagedata: any
  scholarships: any[]
}

export default function InnerScholarshipPage({ pagedata, scholarships }: Props) {
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL ?? ''

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${webUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Scholarships', item: `${webUrl}/scholarships` },
      { '@type': 'ListItem', position: 3, name: pagedata.name, item: `${webUrl}/scholarship/${pagedata.id}/${pagedata.slug}` },
    ],
  }

  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <BannerSection data={pagedata} />
      <Breadcrumb items={[
        { label: 'Scholarships', href: '/scholarships' },
        { label: pagedata.name },
      ]} />
      <OverviewSec data={pagedata} scholarships={scholarships} />
    </>
  )
}

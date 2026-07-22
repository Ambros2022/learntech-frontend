import JsonLd from 'src/app/components/JsonLd'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import BannerSec from './Components/BannerSec'
import StudentsText from './Components/StudentsText'
import ServicesSec from './Components/ServicesSec'

interface Props {
  banners: any[]
}

export default function ServicesPage({ banners }: Props) {
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL ?? ''

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${webUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${webUrl}/services` },
    ],
  }

  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="breadcrumb-schema" />
      <BannerSec banners={banners} />
      <Breadcrumb items={[{ label: 'Services' }]} />
      <StudentsText />
      <ServicesSec />
    </>
  )
}

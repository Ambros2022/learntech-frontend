import BannerSec from './Components/BannerSec'
import BestSec from './Components/BestSec'
import BoardsSec from './Components/BoardsSec'
import LatestUpdateSec from './Components/LatestUpdates'
import JsonLd from 'src/app/components/JsonLd'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'

interface Props {
  boards: any[]
  updates: any[]
  pageData: any
}

export default function MainBoardPage({ boards, updates, pageData }: Props) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Boards', item: `${BASE_URL}/boards` },
    ],
  }

  return (
    <>
      <JsonLd schema={breadcrumb} id="breadcrumb-boards" />
      <BannerSec />
      <Breadcrumb items={[{ label: 'Boards' }]} />
      <BestSec data={pageData} />
      <BoardsSec boards={boards} />
      {updates.length > 0 && <LatestUpdateSec updates={updates} />}
    </>
  )
}

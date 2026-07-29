import BannerSec from './Components/BannerSec'
import BestSec from './Components/BestSec'
import BoardsSec from './Components/BoardsSec'
import LatestUpdateSec from './Components/LatestUpdates'
import { Breadcrumb } from 'src/app/components/Breadcrumb'

interface Props {
  boards: any[]
  updates: any[]
  pageData: any
}

export default function MainBoardPage({ boards, updates, pageData }: Props) {
  return (
    <>
      <BannerSec />
      <Breadcrumb items={[{ label: 'Boards' }]} />
      <BestSec data={pageData} />
      <BoardsSec boards={boards} />
      {updates.length > 0 && <LatestUpdateSec updates={updates} />}
    </>
  )
}

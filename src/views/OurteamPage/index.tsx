
import BannerSec from './Components/BannerSec'
import LeaderSec from './Components/LeaderSec'
import ServicesSec from './Components/ServicesSec'

type OurTeamPageProps = {
  pagedata: any
  banners: any[]
  users: any[]
}

const OurTeamPage = ({ banners, users }: OurTeamPageProps) => {
  return (
    <>
      <BannerSec banners={banners} />
      <LeaderSec users={users} />
      <ServicesSec />
    </>
  )
}

export default OurTeamPage
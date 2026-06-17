import BannerSec from './Components/BannerSec'
import AdvertiseSec from './Components/AdvertiseSec'
import AssociatedClg from './Components/AssociatedClgSec'
import type { CollegeItem } from 'src/components/colleges/CollegeCarouselClient'

type AdvertisePageProps = {
  banners: any[]
  colleges: CollegeItem[]
}

const AdvertisePage = ({ banners, colleges }: AdvertisePageProps) => {
  return (
    <>
      <BannerSec />
      <AdvertiseSec banners={banners} />
      <AssociatedClg colleges={colleges} />
    </>
  )
}

export default AdvertisePage

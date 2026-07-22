import BannerSec from './Components/BannerSec'
import LinkSec from './Components/LinkSec'

interface Props {
  data: any
}

export default function SiteMapPage({ data }: Props) {
  return (
    <>
      <BannerSec />
      <LinkSec data={data} />
    </>
  )
}
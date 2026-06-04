import Homepage from 'src/views/Homepage'
import { getHeroBanners } from 'src/lib/api/common'

export default async function Page() {
  const banners = await getHeroBanners()
  return <Homepage banners={banners} />
}

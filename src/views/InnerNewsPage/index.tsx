import BannerSec from './Components/BannerSec'
import InfoSec from './Components/InfoSec'
import ExpertSection from './Components/ExpertSection'

interface NewsListItem {
  imageSrc: string
  id: number | string
  name: string
  slug: string
}

interface Props {
  pagedata: any
  relatedNews: NewsListItem[]
  newsUrl: string
}

function InnerNewsPage({ pagedata, relatedNews, newsUrl }: Props) {
  return (
    <>
      <BannerSec data={pagedata} />
      <InfoSec data={pagedata} relatedNews={relatedNews} newsUrl={newsUrl} />
      <ExpertSection />
    </>
  )
}

export default InnerNewsPage

import BannerSec from './Components/BannerSec'
import GuidanceSec from './Components/GuidanceSec'
import { LazyWriteReviewForm } from 'src/app/components/ClientWrappers'

interface WriteReviewPageProps {
  pagedata?: any
}

export default function WriteReviewPage({ pagedata }: WriteReviewPageProps) {
  return (
    <>
      <BannerSec />
      <LazyWriteReviewForm />
      <GuidanceSec />
    </>
  )
}

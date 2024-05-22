import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import WriteReviewPage from 'src/views/WriteReviewPage'


const writeReview = () => {
  return (
    <>
      <WriteReviewPage />
    </>
  )
}

writeReview.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

writeReview.guestGuard = true

export default writeReview

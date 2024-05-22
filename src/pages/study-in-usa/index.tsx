import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import StudyInUsaPage from 'src/views/StudyInUsaPage'


const studyInUSA = () => {
  return (
    <>
      <StudyInUsaPage />
    </>
  )
}

studyInUSA.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

studyInUSA.guestGuard = true

export default studyInUSA

import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerCourseCollegePage from 'src/views/InnerCourseCollegePage'


const innerCourseCollege = () => {
  return <>
    <InnerCourseCollegePage />
  </>
}

innerCourseCollege.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

innerCourseCollege.guestGuard = true

export default innerCourseCollege

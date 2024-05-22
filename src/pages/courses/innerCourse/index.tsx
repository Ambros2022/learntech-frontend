import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerCoursePage from 'src/views/InnerCoursePage'


const innerCourse = () => {
  return <>
    <InnerCoursePage />
  </>
}

innerCourse.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

innerCourse.guestGuard = true

export default innerCourse;

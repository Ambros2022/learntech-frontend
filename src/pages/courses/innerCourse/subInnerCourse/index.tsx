import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import SubInnerCoursePage from 'src/views/SubInnerCoursePage'


const subInnerCourse = () => {
  return (
    <>
      <SubInnerCoursePage />
    </>
  )
}

subInnerCourse.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

subInnerCourse.guestGuard = true

export default subInnerCourse;

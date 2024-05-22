import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import CoursesPage from 'src/views/CoursePage'


const Courses = () => {
  return <>
    <CoursesPage />
  </>
}

Courses.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

Courses.guestGuard = true

export default Courses;

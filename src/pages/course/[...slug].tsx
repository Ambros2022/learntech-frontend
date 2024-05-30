import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerCoursePage from 'src/views/InnerCoursePage'
import MainCollegePage from 'src/views/MainCollegePage'


const course = () => {
    return <>
        <InnerCoursePage />
    </>
}

course.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

course.guestGuard = true

export default course

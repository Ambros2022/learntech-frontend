import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerCourseCollegePage from 'src/views/InnerCourseCollegePage'


const innerCollegeCourse = () => {
    return <>
        <InnerCourseCollegePage />
    </>
}

innerCollegeCourse.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

innerCollegeCourse.guestGuard = true

export default innerCollegeCourse

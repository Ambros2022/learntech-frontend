import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerSchoolPage from 'src/views/InnerSchoolPage'


const school = () => {
    return <>
        {/* <InnerSchoolPage /> */}
    </>
}

school.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

school.guestGuard = true

export default school

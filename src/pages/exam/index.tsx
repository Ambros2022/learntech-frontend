import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerExamPage from 'src/views/InnerExamPage'


const exam = () => {
    return <>
        <InnerExamPage />
    </>
}

exam.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

exam.guestGuard = true

export default exam

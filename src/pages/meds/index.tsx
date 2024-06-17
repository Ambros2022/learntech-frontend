import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainNewsPage from 'src/views/MainNewsPage'
import MedicalStudioPage from 'src/views/MedicalEduStudioPage'


const meds = () => {
    return <>
        <MedicalStudioPage />
    </>
}

meds.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

meds.guestGuard = true

export default meds

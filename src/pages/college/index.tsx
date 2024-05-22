import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import CollegePage from 'src/views/CollegePage'


const College = () => {
  return <>
    <CollegePage />
  </>
}

College.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

College.guestGuard = true

export default College

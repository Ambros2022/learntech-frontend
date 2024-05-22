import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerCollegePage from 'src/views/InnerCollegePage'


const InnerCollege = () => {
  return <>
    <InnerCollegePage />
  </>
}

InnerCollege.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

InnerCollege.guestGuard = true

export default InnerCollege;

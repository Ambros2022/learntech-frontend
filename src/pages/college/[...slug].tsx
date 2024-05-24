import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerCollegePage from 'src/views/InnerCollegePage'


const college = () => {
  return <>
    <InnerCollegePage />
  </>
}

college.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

college.guestGuard = true

export default college

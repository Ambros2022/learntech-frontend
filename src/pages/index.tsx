import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Homepage from 'src/views/Homepage'


const Home = () => {
  return <>
    <Homepage />
  </>
}

Home.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

Home.guestGuard = true

export default Home

import { ReactNode } from 'react'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Frontend from 'src/pages/home/index'



const Home = () => {
  return <Frontend />
}

Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Home.guestGuard = true

export default Home

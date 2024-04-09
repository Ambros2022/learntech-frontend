import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Work from './RamandeepWork'




const Home = () => {
  return <>
    <Work />
  </>
}

Home.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

Home.guestGuard = true

export default Home

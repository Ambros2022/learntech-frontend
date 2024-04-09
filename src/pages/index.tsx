import { ReactNode } from 'react'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Work from './RamandeepWork'

//**  Bootstrap css and js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


const Home = () => {
  return <>
    <Work />
  </>
}

Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Home.guestGuard = true

export default Home

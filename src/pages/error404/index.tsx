import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Error404Page from 'src/views/Error404Page'


const error404 = () => {
    return <>
        <Error404Page />
    </>
}

error404.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

error404.guestGuard = true

export default error404

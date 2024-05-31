import { ReactNode } from 'react'


// ** Layout Import

import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerNewsPage from 'src/views/InnerNewsPage'


const news = () => {
    return <>
        <InnerNewsPage />
    </>
}

news.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

news.guestGuard = true

export default news

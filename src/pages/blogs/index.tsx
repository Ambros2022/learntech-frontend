import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainBlogPage from 'src/views/MainBlogPage'


const news = () => {
    return <>
        <MainBlogPage />
    </>
}

news.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

news.guestGuard = true

export default news

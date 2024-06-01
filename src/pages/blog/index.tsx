import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerBlogPage from 'src/views/InnerBlogpage'


const Blog = () => {
    return <>
        <InnerBlogPage />
    </>
}

Blog.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

Blog.guestGuard = true

export default Blog

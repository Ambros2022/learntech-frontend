// import { ReactNode } from 'react'


// // ** Layout Import
// import FrontLayout from 'src/@core/layouts/FrontLayout'
// import InnerBlogPage from 'src/views/InnerBlogpage'


// const Blog = () => {
//     return <>
//         <InnerBlogPage />
//     </>
// }

// Blog.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

// Blog.guestGuard = true

// export default Blog


import { ReactNode, useEffect, useState } from 'react'
// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import { useRouter } from 'next/router';
import Spinner from 'src/@core/components/spinner';
import InnerCourseCollegePage from 'src/views/InnerCourseCollegePage'
import InnerBlogPage from 'src/views/InnerBlogpage'

const Blog = () => {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);


  if (!isRouterReady) {
    return <Spinner /> // Or a loading spinner
  }

  return <>

    {Array.isArray(router.query.slug) && (
      router.query.slug.length <= 2 ? (
        <InnerBlogPage id={router.query.slug[0]} />
      ) : (
        <InnerCourseCollegePage Collegeid={router.query.slug[0]} Courseslug={router.query.slug[2]} />
      )
    )}
  </>
}

Blog.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

Blog.guestGuard = true

export default Blog


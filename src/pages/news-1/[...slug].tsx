// import { ReactNode } from 'react'


// // ** Layout Import

// import FrontLayout from 'src/@core/layouts/FrontLayout'
// import InnerNewsPage from 'src/views/InnerNewsPage'


// const news = () => {
//     return <>
//         <InnerNewsPage />
//     </>
// }

// news.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

// news.guestGuard = true

// export default news



import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Spinner from 'src/@core/components/spinner'
import InnerNewsPage from 'src/views/InnerNewsPage'

const news = () => {
  const router = useRouter()
  const [isRouterReady, setIsRouterReady] = useState(false)

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true)
    }
  }, [router.isReady])

  if (!isRouterReady) {
    return <Spinner />
  }

  const { slug } = router.query

  return (
    <>
      {Array.isArray(slug) && slug.length <= 2 && (
        <InnerNewsPage id={slug[0]} />
      )}
    </>
  )
}

news.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

news.guestGuard = true

export default news



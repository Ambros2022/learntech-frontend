// import { ReactNode } from 'react'


// // ** Layout Import
// import FrontLayout from 'src/@core/layouts/FrontLayout'
// import InnerExamPage from 'src/views/InnerExamPage'


// const exam = () => {
//     return <>
//         <InnerExamPage />
//     </>
// }

// exam.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

// exam.guestGuard = true

// export default exam


// import { ReactNode, useEffect, useState } from 'react'
// // ** Layout Import
// import FrontLayout from 'src/@core/layouts/FrontLayout'
// import { useRouter } from 'next/router';
// import Spinner from 'src/@core/components/spinner';
// import InnerExamPage from 'src/views/InnerExamPage'

// const exam = () => {
//   const router = useRouter();
//   const [isRouterReady, setIsRouterReady] = useState(false);

//   useEffect(() => {
//     if (router.isReady) {
//       setIsRouterReady(true);
//     }
//   }, [router.isReady]);


//   if (!isRouterReady) {
//     return <Spinner /> // Or a loading spinner
//   }

//   return <>

//     {Array.isArray(router.query.slug) && (
//       router.query.slug.length <= 2 ? (
       
//         <InnerExamPage id={router.query.slug[0]} />
//       )
//     )}
//   </>
// }

// exam.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

// exam.guestGuard = true

// export default exam

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Spinner from 'src/@core/components/spinner'
import InnerExamPage from 'src/views/InnerExamPage'

const Exam = () => {
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
        <InnerExamPage id={slug[0]} />
      )}
    </>
  )
}

Exam.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

Exam.guestGuard = true

export default Exam


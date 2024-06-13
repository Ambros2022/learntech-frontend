import { ReactNode, useEffect, useState } from 'react'
// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerCollegePage from 'src/views/InnerCollegePage'
import { useRouter } from 'next/router';
import Spinner from 'src/@core/components/spinner';
import InnerCourseCollegePage from 'src/views/InnerCourseCollegePage'

const college = () => {
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
        <InnerCollegePage id={router.query.slug[0]} />
      ) : (
        <InnerCourseCollegePage Collegeid={router.query.slug[0]} Courseslug={router.query.slug[2]} />
      )
    )}
  </>
}

college.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

college.guestGuard = true

export default college

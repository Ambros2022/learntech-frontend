import { ReactNode, useEffect, useState } from 'react';
import FrontLayout from 'src/@core/layouts/FrontLayout';
import InnerCoursePage from 'src/views/InnerCoursePage';
import SubInnerCoursePage from 'src/views/SubInnerCoursePage';
import { useRouter } from 'next/router';
import Spinner from 'src/@core/components/spinner';

const CoursePage = () => {
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

  return (
    <>
      {Array.isArray(router.query.slug) && (
        router.query.slug.length <= 2 ? (
          <InnerCoursePage id={router.query.slug[0]} />
        ) : (
          <SubInnerCoursePage Streamid={router.query.slug[0]} Courseslug={router.query.slug[2]} />
        )
      )}

    </>
  );
};

CoursePage.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;

CoursePage.guestGuard = true;

export default CoursePage;

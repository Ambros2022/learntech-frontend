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

  const getSlugLength = (slug) => {
    if (!slug) return 0;
    return typeof slug === 'string' ? slug.length : Array.isArray(slug) ? slug.length : 0;
  };

  const slugLength = getSlugLength(router.query.slug);



  if (!isRouterReady) {
    return <Spinner /> // Or a loading spinner
  }

  return (
    <>
      {Array.isArray(router.query.slug) && (
        router.query.slug.length <= 2 ? (
          <InnerCoursePage id={router.query.slug[0]} />
        ) : (
          <SubInnerCoursePage id={router.query.slug[0]} />
        )
      )}

    </>
  );
};

CoursePage.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;

CoursePage.guestGuard = true;

export default CoursePage;

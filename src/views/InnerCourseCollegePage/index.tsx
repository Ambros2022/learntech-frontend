import React, { useCallback, useEffect, useState } from 'react'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import BannerSection from './Components/BannerSection'
import CourseDetailSec from './Components/CourseDetailSec'
import ExpertSection from './Components/ExpertSection'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

function InnerCourseCollegePage({ Collegeid, Courseslug }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const getPagedata = useCallback(async () => {
    try {
      const slug = Courseslug; // replace with actual slug
      const id = Collegeid; // replace with actual id



      const response = await axios.get(`/api/website/coursefindone/get/${slug}/${id}`);

      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [Collegeid, isMountedRef, router]);

  useEffect(() => {
    getPagedata();
  }, [getPagedata]);

  return (
    <>
      <Head>
        <title>{pagedata?.meta_title || "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata?.meta_description || "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."} />
        <meta name="keywords" content={pagedata?.meta_keyword || "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
        <script type="application/ld+json">
          {JSON.stringify(
            {
              "@context": "https://schema.org/",
              "@type": "CollegeOrUniversity",
              "name": `${pagedata?.meta_title}`,
              "logo": `${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.icon}`,
              "url": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": `${pagedata?.address}`
              }

            }
          )}
        </script>
      </Head>
      {!loading && pagedata && <BannerSection data={pagedata} />}
      {!loading && pagedata && <CourseDetailSec data={pagedata} />}

      <ExpertSection />
      {!loading && pagedata && <TopFeaturedColleges data={pagedata} />}
    </>
  )
}

export default InnerCourseCollegePage

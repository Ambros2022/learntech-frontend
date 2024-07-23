import React, { useCallback, useEffect, useState } from 'react'
import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import FacilitiesSection from './Components/FacilitiesSection'
import LocationSection from './Components/LocateSection'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import ExpertSection from './Components/ExpertSection'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';


function InnerBoardPage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true); 
  const [exams, setExams] = useState([]);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/schoolboardfindone/get/' + id);
      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [id, isMountedRef, router]);

  const getExams = useCallback(async () => {
    try {
      const response = await axios.get('/api/website/exams/get');
      if (isMountedRef.current) {
        setExams(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  }, [isMountedRef]);

  const formattedData = pagedata && pagedata.schoolboardfaqs && pagedata.schoolboardfaqs.map((item) => ({
    "@type": "Question",
    "name": item.questions,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answers,
    },
  }));



  useEffect(() => {
    getPagedata();
    getExams();
  }, [getPagedata, getExams]);
  return (
    <>
      <Head>
        <title>{pagedata?.meta_title || "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata?.meta_description || "Are you searching for which board is best for your child"} />
        <meta name="keywords" content={pagedata?.meta_keyword || "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
        <script type="application/ld+json">
          {JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": formattedData,
            }
          )}
        </script>
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
      {!loading && pagedata && <CollegeInfoSection data={pagedata} exams={exams}/>}
      {/* {!loading && pagedata && <FacilitiesSection data={pagedata} />} */}
      {!loading && pagedata && <LocationSection data={pagedata} />}


      <TopFeaturedColleges />

    </>
  )
}

export default InnerBoardPage

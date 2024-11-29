
import React, { useCallback, useEffect, useState } from 'react'
import BannerSec from './Components/BannerSec'
import OverviewSec from './Components/OverviewSec'

import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import UpcomingExamsSec from './Components/UpcomingExamsSec';
import OrganizationSection from './Components/OrganizationalSec';
import ExperTraineeSec from './Components/ExpertTrainneSec';

function InnerExamPage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  const [exams, setexams] = useState([]);
  const [streams, setStreams] = useState([]);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/examfindone/get/' + id);
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
      const response = await axios.get('api/website/exams/get', {
        params: {
          page: 1,
          size: 8,
        }
      });
      if (isMountedRef.current) {
        setColleges(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [id, isMountedRef]);

  const formattedData = pagedata && pagedata.examfaqs && pagedata.examfaqs.map((item) => ({
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

  }, [getPagedata]);
  return (
    <>
      <Head>
        <title>{pagedata?.meta_title || "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata?.meta_description || "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad. Call us today!"} />
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
      </Head>
      {!loading && pagedata && <BannerSec data={pagedata} />}
      {!loading && pagedata && <OverviewSec data={pagedata} />}
      <OrganizationSection data={pagedata}/>
      <ExperTraineeSec data={pagedata}/>
      {/* {!loading && pagedata && <UpcomingExamsSec data={news} />} */}

      {/* <OverviewSec /> */}
    </>
  )
}

export default InnerExamPage

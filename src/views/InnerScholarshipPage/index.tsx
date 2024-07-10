import React, { useCallback, useEffect, useState } from 'react'
import BannerSection from './Components/BannerSection'
import OverviewSec from './Components/OverviewSec'


import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';


function InnerScholarshipPage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true); 
  const [scholarship, setScholarship] = useState([]);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/scholarshipfindone/get/' + id);
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
      const response = await axios.get('/api/website/scholarships/get');
      if (isMountedRef.current) {
        setScholarship(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  }, [isMountedRef]);




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
      </Head>
      {!loading && pagedata && <BannerSection data={pagedata} />}
      {!loading && pagedata && <OverviewSec data={pagedata} scholarship ={scholarship} />}
    

    </>
  )
}

export default InnerScholarshipPage

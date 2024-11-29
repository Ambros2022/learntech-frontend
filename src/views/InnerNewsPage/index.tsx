
import React, { useCallback, useEffect, useState } from 'react'
import BannerSec from './Components/BannerSec'
import InfoSec from './Components/InfoSec'

import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ExpertSection from './Components/ExpertSection';

function InnerNewsPage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [exams, setexams] = useState([]);
  const [streams, setStreams] = useState([]);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('/api/website/newsfindone/get/' + id);
      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [id, isMountedRef, router]);

  const getNews = useCallback(async () => {
    try {
      const response = await axios.get('api/website/news/get', {
        params: {
          page: 1,
          size: 8,
        }
      });
      if (isMountedRef.current) {
        setNews(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [id, isMountedRef]);


 


  useEffect(() => {
    getPagedata();
    getNews();
   
  }, [getPagedata]);
  return (
    <>
      <Head>
        <title>{pagedata?.meta_title || "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata?.meta_description || "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad. Call us today!"} />
        <meta name="keywords" content={pagedata?.meta_keyword || "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
      </Head>

            {!loading && pagedata && <BannerSec data={pagedata}  />}
            {!loading && pagedata && <InfoSec data={pagedata}  />}
          
            <ExpertSection />
     
    </>
  )
}

export default InnerNewsPage

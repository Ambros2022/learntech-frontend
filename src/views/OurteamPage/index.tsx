
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BannerSec from './Components/BannerSec'
import LeaderSec from './Components/LeaderSec'
import ServicesSec from './Components/ServicesSec'

const OurTeamPage = () => {
    const router = useRouter()
    const isMountedRef = useIsMountedRef();
    const [pagedata, setPagedata] = useState<any>();
    const [trendingCourses, setTrendingCourses] = useState([]);

    const getPagedata = useCallback(async () => {
        try {
          const response = await axios.get(`api/website/pagefindone/get/${router.asPath}`);
          if (isMountedRef.current) {
    
            setPagedata(response.data.data);
          }
        } catch (error) {
          console.error('Failed to fetch trending courses:', error);
        }
      }, [isMountedRef]);




    useEffect(() => {
        getPagedata();
        //   getTrendingCourses();


    }, []);

    return (
        <>
            <Head>
                <title>{pagedata && pagedata?.meta_title ? pagedata?.meta_title : "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
                <meta name="description" content={pagedata && pagedata?.meta_description ? pagedata?.meta_description : "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad. Call us today!"} />
                <meta name="keywords" content={pagedata && pagedata?.meta_keyword ? pagedata?.meta_keyword : "Learntechweb"} />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
            </Head>
            <BannerSec />
            <LeaderSec />
            <ServicesSec />
        </>
    )
}

export default OurTeamPage
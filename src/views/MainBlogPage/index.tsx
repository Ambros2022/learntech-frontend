
import React, { useCallback, useEffect, useState } from 'react';
import BannerSec from './Components/BannerSec'
import BlogCards from './Components/BlogCards'
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';


function MainBlogPage() {
    const router = useRouter()
    const isMountedRef = useIsMountedRef();
    const [pagedata, setPagedata] = useState<any>();
    const [newsData, setNewsData] = useState([]);

    const [cardsData, setCardsData] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

   
    const getBlogsData = useCallback(async (page = 1) => {
        try {
            const roleparams = { page, size: 8 }; // Hardcoding cardsPerPage to 1
            const response = await axios.get('api/website/blog/get', { params: roleparams });
            setCardsData(response.data.data);
            setTotalPages(response.data.totalPages); // Set total pages from API response
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);


    const getPagedata = useCallback(async () => {
      try {
        const response = await axios.get('api/website/pagefindone/get/blogs');
        if (isMountedRef.current) {
  
          setPagedata(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch trending courses:', error);
      }
    }, [isMountedRef]);
  
   
    const getNewsData = useCallback(async () => {
      try {
          const response = await axios.get('api/website/news/get');
          setNewsData(response.data.data);
      } catch (err) {
          console.error(err);
      }
  }, [isMountedRef]);


  useEffect(() => {
    getBlogsData(currentPage);
}, [currentPage, getBlogsData]);


    useEffect(() => {
      getPagedata();
      getNewsData();
    }, [getNewsData,getPagedata ]);
    return (
        <>
            <Head>
                <title>{pagedata && pagedata?.meta_title ? pagedata?.meta_title : "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
                <meta name="description" content={pagedata && pagedata?.meta_description ? pagedata?.meta_description : "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad. Call us today!"} />
                <meta name="keywords" content={pagedata && pagedata?.meta_keyword ? pagedata?.meta_keyword : "Learntechweb"} />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
            </Head>
            <BannerSec />
            <BlogCards  newsData ={newsData} cardsData ={cardsData} totalPages= {totalPages} currentPage={currentPage} getBlogsData={getBlogsData}  setCurrentPage ={setCurrentPage} />
        </>
    )
}

export default MainBlogPage;

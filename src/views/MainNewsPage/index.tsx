
import BannerSection from './Components/BannerSection'
import TopTrendingNews from './Components/TopTrendingNewsSec'
import BrowseNewsSec from './Components/BrowseNewsSec'
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

const MainNewsPage = () => {
  const router = useRouter()
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [collegeData, setcollegeData] = useState([]);
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
  const [activeTab, setActiveTab] = useState('All');

  // Define the category name mapping
  const categoryNameMapping = {
    entrance_exams_news: 'Entrance Exams News',
    general_news: 'General News',
    admission_alert_news: 'Admission Alert News',
    results_announcement: 'Result Announcement',

  };


  const getNewsdata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/news/get')

      const newsData = response.data.data.map(news => ({
        id: news.id,
        title: news.name,
        description: news.meta_description,
        imageUrl: `${process.env.NEXT_PUBLIC_IMG_URL}/${news.banner_image}`


      }))
      setNewsItems(newsData)

    } catch (error) {
      console.error('Failed to fetch news data:', error)
      setLoading(true)

    }
  }, [])



  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/pagefindone/get/news');
      if (isMountedRef.current) {

        setPagedata(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [isMountedRef]);


  const getColleges = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 10000 };
      const response = await axios.get('api/website/colleges/get', { params: roleparams });
      setcollegeData(response.data.data);
    } catch (err) {
      console.error(err);
      setLoading(false); // Set loading to false in case of error
    }
  }, [isMountedRef]);

  const getCategoriesData = useCallback(async () => {
    try {
      const response = await axios.get('api/website/newscategory/get');
      if (response.data.status === 1) {
        const categories = response.data.data
          .filter(category => category.name !== 'default') // Filter out the "default" category
          .map(category => ({
            id: category.id,
            title: categoryNameMapping[category.name] || category.name
          }));
        // Add "All" category
        setCategories([{ id: 'all', title: 'All News' }, ...categories]);
        setActiveTab('all'); // Set "All" tab as active initially
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false); // Set loading to false in case of error
    }
  }, []);

  useEffect(() => {

    getCategoriesData()
    getColleges()

  }, [getCategoriesData, getColleges])



  useEffect(() => {
    getPagedata();
    getNewsdata()
    getColleges()
  }, [getPagedata, getNewsdata, getColleges]);

  return (
    <>
      <Head>
        <title>{pagedata && pagedata?.meta_title ? pagedata?.meta_title : "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata && pagedata?.meta_description ? pagedata?.meta_description : "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad. Call us today!"} />
        <meta name="keywords" content={pagedata && pagedata?.meta_keyword ? pagedata?.meta_keyword : "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
      </Head>
      <BannerSection />
      <TopTrendingNews newsItems={newsItems} loading={loading} />
      <BrowseNewsSec collegeData={collegeData} getColleges={getColleges} categories={categories} activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  )
}

export default MainNewsPage
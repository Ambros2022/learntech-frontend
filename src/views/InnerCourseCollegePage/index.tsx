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
  const [colleges, setColleges] = useState([]);
  const [exams, setexams] = useState([]);
  const [streams, setStreams] = useState([]);

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

  const getColleges = useCallback(async () => {
    try {
      const response = await axios.get('api/website/colleges/get', {
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
  }, [Collegeid, isMountedRef]);


  useEffect(() => {
    getPagedata();
    getColleges();
  }, [getPagedata]);

  return (
    <>
      {!loading && pagedata && <BannerSection data={pagedata} />}
      {!loading && pagedata && <CourseDetailSec data={pagedata} />}

      <ExpertSection />
      {!loading && pagedata && <TopFeaturedColleges data={pagedata} />}
    </>
  )
}

export default InnerCourseCollegePage

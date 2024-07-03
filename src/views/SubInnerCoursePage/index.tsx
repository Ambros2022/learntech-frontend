import React, { useCallback, useEffect, useState } from 'react';
import BannerSection from './Components/BannerSection';
import OverviewSection from './Components/OverviewSection';
import PopularCourses from './Components/PopularCourses';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ExpertSection from './Components/ExpertSection';

function SubInnerCoursePage({ Streamid, Courseslug }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  const [exams, setExams] = useState([]);

  const getPagedata = useCallback(async () => {
    try {
      const slug = Courseslug;
      const id = Streamid;

      const response = await axios.get(`/api/website/general/stream/get/${slug}/${id}`);

      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [Streamid, Courseslug, isMountedRef, router]);

  const getColleges = useCallback(async () => {
    try {
      const response = await axios.get('/api/website/colleges/get', {
        params: {
          page: 1,
          size: 8,
          stream_id: [Streamid]
        }
      });
      if (isMountedRef.current) {
        setColleges(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch colleges:', error);
    }
  }, [Streamid, isMountedRef]);

  const getExams = useCallback(async () => {
    try {
      const response = await axios.get('/api/website/exams/get', {
        params: {
          page: 1,
          size: 8,
          stream_id: Streamid
        }
      });
      if (isMountedRef.current) {
        setExams(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  }, [Streamid, isMountedRef]);

  useEffect(() => {
    getPagedata();
    getColleges();
    getExams();
  }, [getPagedata, getColleges, getExams]);

  return (
    <>
      {!loading && pagedata && <BannerSection data={pagedata} />}
      {!loading && pagedata && <OverviewSection data={pagedata} colleges={colleges} exams={exams} />}
      <PopularCourses />
      <ExpertSection />
    </>
  );
}

export default SubInnerCoursePage;

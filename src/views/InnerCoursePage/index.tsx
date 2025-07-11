import React, { useCallback, useEffect, useState } from 'react'
import BannerSection from './Components/BannerSection';
import OverviewSection from './Components/OverviewSection';
import ExpertSection from './Components/ExpertSection';
import OtherCourses from './Components/OtherCourses';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import OrganizationSection from './Components/OrganizationalSec';
import ExperTraineeSec from './Components/ExpertTrainneSec';
import Testimonial from './Components/TestimonialSec'
import { Box, CircularProgress } from '@mui/material'

function InnerCoursePage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  const [exams, setexams] = useState([]);
  const [streams, setStreams] = useState([]);
  const [testdata, setTestdata] = useState<any>(null);


  const gettestimonials = useCallback(async () => {
    try {
      const response = await axios.get('api/website/testimonial/filter/get?page=1&size=15&stream_id=' + id);
      if (isMountedRef.current) {
        setTestdata(response.data.data);

      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [id, isMountedRef, router]);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/streamfindone/get/' + id);
      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [id, isMountedRef, router]);

  const getColleges = useCallback(async () => {
    try {
      const response = await axios.get('api/website/colleges/get', {
        params: {
          page: 1,
          size: 1000,
          type: 'college',
          stream_id: [id]
        }
      });
      if (isMountedRef.current) {
        setColleges(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [id, isMountedRef]);

  const getExams = useCallback(async () => {
    try {
      const response = await axios.get('api/website/exams/get', {
        params: {
          page: 1,
          size: 1000,
          stream_id: id
        }
      });
      if (isMountedRef.current) {
        setexams(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [id, isMountedRef]);

  const getotherCourses = useCallback(async () => {
    try {
      const response = await axios.get('api/website/stream/get', {
        params: {
          page: 1,
          size: 1000,
          not_stream_id: id
        }
      });
      if (isMountedRef.current) {
        setStreams(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [id, isMountedRef]);


  const formattedData = pagedata && pagedata?.streamfaqs && pagedata?.streamfaqs.map((item) => ({
    "@type": "Question",
    "name": item.questions,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answers,
    },
  }));

  useEffect(() => {
    getPagedata();
    getColleges();
    getExams();
    getotherCourses();
    gettestimonials();
  }, [getPagedata]);

  return (
    <>
      <Head>
        <title>{pagedata?.meta_title || "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata?.meta_description || "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."} />
        <meta name="keywords" content={pagedata?.meta_keyword || "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
        {formattedData?.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": formattedData,
            })}
          </script>
        )}
      </Head>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <BannerSection data={pagedata} />
          <OverviewSection data={pagedata} collegedata={colleges} examdata={exams} />
          <OtherCourses streamdata={streams} />
          {testdata && testdata.length > 0 && <Testimonial testimonials={testdata} />}
          <OrganizationSection data={pagedata} />
          <ExperTraineeSec data={pagedata} />
          <ExpertSection />

        </>)
      }

    </>
  );
}

export default InnerCoursePage;

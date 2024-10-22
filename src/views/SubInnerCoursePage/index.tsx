import React, { useCallback, useEffect, useState } from 'react';
import BannerSection from './Components/BannerSection';
import OverviewSection from './Components/OverviewSection';
import PopularCourses from './Components/PopularCourses';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ExpertSection from './Components/ExpertSection';
import OrganizationSection from './Components/OrganizationalSec';
import ExperTraineeSec from './Components/ExpertTrainneSec';

interface Pagedata {
  meta_title?: string;
  meta_description?: string;
  meta_keyword?: string;
  generalcoursefaqs?: { questions: string; answers: string }[];
}

interface SubInnerCoursePageProps {
  Streamid: string;
  Courseslug: string;
}

const SubInnerCoursePage: React.FC<SubInnerCoursePageProps> = ({ Streamid, Courseslug }) => {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<Pagedata | null>(null);
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);

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

  const formattedData = pagedata?.generalcoursefaqs?.map((item) => ({
    "@type": "Question",
    "name": item.questions,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answers,
    },
  })) || [];

  useEffect(() => {
    getPagedata();
    getColleges();
    getExams();
  }, [getPagedata, getColleges, getExams]);

  return (
    <>
      <Head>
        <title>{pagedata?.meta_title || "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata?.meta_description || "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad. Call us today!"} />
        <meta name="keywords" content={pagedata?.meta_keyword || "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": formattedData,
          }
        )}} />
      </Head>
      {!loading && pagedata && <BannerSection data={pagedata} />}
      {!loading && pagedata && <OverviewSection data={pagedata} colleges={colleges} exams={exams} />}
      <PopularCourses />
      <OrganizationSection data={pagedata}/>
      <ExperTraineeSec data={pagedata}/>
      <ExpertSection />
    </>
  );
}

export default SubInnerCoursePage;

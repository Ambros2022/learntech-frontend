import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import YoutubeVideo from 'src/@core/components/youtube-videos';
import Image from 'next/image';
import * as Yup from 'yup';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import dynamic from 'next/dynamic';
import axios from 'src/configs/axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import NewsList from '../newsList';
import SideContactUsForm from 'src/@core/components/popup/SideContactUsForm';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import CustomCarousel from '../CustomCarousel';
import Carousel from 'react-multi-carousel';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'react-multi-carousel/lib/styles.css';


const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });

type ExamData = {
  exam_title: string;
  created_at: string;
  id: number;
  slug: string;
};

function OverviewSec({ data }) {
  const [examData, setExamData] = useState<ExamData[]>([]);
  const isMountedRef = useIsMountedRef();
  const [promoban, setPromoban] = useState<any[]>([]);






  const items = [
    { id: 'info', label: 'OVERVIEW', content: data.overview },
    { id: 'exams', label: 'EXAM DATES', content: data.exam_dates },
    { id: 'eligibility', label: 'ELIGIBILITY & REGISTRATION', content: data.eligibility_criteria },
    { id: 'admitcard', label: 'ADMIT CARD', content: data.admit_card },
    { id: 'examcenters', label: 'EXAM CENTRES', content: data.exam_centers },
    { id: 'syllabus', label: 'EXAM PATTERN & SYLLABUS', content: data.syllabus },
    { id: 'results', label: 'RESULT', content: data.results },
    { id: 'cutoff', label: 'CUTOFF', content: data.cutoff },
    { id: 'counseling', label: 'COUNSELLING', content: data.counseling },
    { id: 'prepretiontips', label: 'PREPARATION TIPS', content: data.prepretion_tips },
    { id: 'acceptcolleges', label: 'ACCEPTING COLLEGES', content: data.accept_colleges },
    { id: 'gallery', label: 'GALLERY', content: data.clggallery },
    {
      id: 'faq',
      label: 'FAQ',
      content: data.examfaqs && data.examfaqs.length > 0 ? <FaqSec data={data.examfaqs} /> : null
    },
  ].filter(item => item.content && item.content !== 'null'); ''

  const isMobileView = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 320 && window.innerWidth <= 767;
    }
    return false;
  };

  const [activeTab, setActiveTab] = useState(items[0].id);
  const [isMobile, setIsMobile] = useState(isMobileView());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPromobanner = useCallback(async () => {
    try {
      const response = await axios.get('api/website/banner/get?promo_banner=All_Exam_page');
      if (isMountedRef.current) {
        setPromoban(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [isMountedRef]);

  const getExams = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10000;

      const response = await axios.get('api/website/exams/get', { params: roleparams });
      setExamData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getExams();
    getPromobanner();
  }, [getPromobanner, getExams]);

  function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  const PromoAddBanner = ({ url }) => {
    return (
      <section className='bg-skyBlue addBanner rounded'>
        <div className="container py-5">
          <div className="card col-md-12 col-lg-9 col-xl-10 mx-auto p-0">
            <div className="row g-0">
              <div className="col-md-4 addImgClg position-relative">
                <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${url}`} width={200} height={200} className="img-fluid rounded-start" alt="clg-img" />
                <h2 className='position-absolute text-white' style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', zIndex: '3000', top: '50%', left: '50%', color: "white" }}>Ad</h2>
              </div>
              <div className="col-md-8">
                <div className="card-body" style={{ zIndex: '200' }}>
                  <h5 className="card-text">PES University</h5>
                  <h3 className="card-title fw-bold">B.Tech 2024 - Admissions Open</h3>
                  <Link href='/colleges' className='btn openAddBtn'>Open <i className="bi bi-chevron-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  function formatDate(date: Date): string {
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    const month = date.toLocaleString('en-GB', { month: 'long' });
    return `${day}${suffix} ${month}`;
  }

  const newsData = examData.map(data => ({
    date: formatDate(new Date(data.created_at)),
    title: data.exam_title,
    slug: data.slug,
    id: data.id,
  }));

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return (
        <div className="row">
          <div className="text-black pt-3">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="text-black pt-3">
          {content}
        </div>
      </div>
    );
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const renderTabs = () => items.map((tab, index) => {
    if (tab.content && tab.content !== '' && tab.content !== 'null' && tab.content !== '<p>null</p>') {
      return (
        <button
          key={index}
          className={`btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.id)}
          style={{ fontSize: '12px' }}
        >
          {tab.label}
        </button>
      );
    }
    return null;
  });

  return (
    <section className='clgInfoSec bg-white'>
      <div className="container">
        <div className='carouselInnerCourse position-relative exam' style={{ zIndex: '2' }}>
          <CustomCarousel items={items} setActiveTab={setActiveTab} />
        

            <div className="row">
              <div className="col-md-8 text-black pt-3">
                <div className="tab-content" id="nav-tabContent">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className={`tab-pane fade ${activeTab === item.id ? 'show active' : ''}`}
                      id={`nav-${item.id}`}
                      role="tabpanel"
                      aria-labelledby={`nav-${item.id}-tab`}
                    >
                      {renderContent(item.content)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-4 mb-md-5 fixed-column pt-5">
                <div className='bg-skyBlue px-lg-5 px-3  mb-5 rounded'>
                  <h2 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h2>
                  <SideContactUsForm />
                </div>
                <NewsList newsItems={newsData} />
              </div>
            </div>
          </div>
          {/* </div> */}
          {promoban.map((ele, index) => (
            <PromoAddBanner key={index} url={ele.banner_url} />
          ))}
        </div>
    </section>
  );
}

export default OverviewSec;

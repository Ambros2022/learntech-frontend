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
const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type ExamData = {
  exam_title: string;
  created_at: string;
};

function OverviewSec({ data }) {
  const [examData, setExamData] = useState<ExamData[]>([]);
  const isMountedRef = useIsMountedRef();
  const [promoban, setPromoban] = useState<any[]>([]);

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
      <>
        <section className='bg-skyBlue addBanner rounded'>
          <div className="container py-5">
            <div className="card col-md-12 col-lg-9 col-xl-10 mx-auto p-0">
              <div className="row g-0">
                <div className="col-md-4 addImgClg position-relative">
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL} /${url}`} width={200} height={200} className="img-fluid rounded-start" alt="clg-img" />
                  <div className="position-absolute iconsPosition">
                    {/* <div className="d-flex flex-column">
                                        <h6 className='btn nav-item bg-gray text-white text-center d-flex'><i className="bi bi-info-circle"></i></h6>
                                        <h6 className='btn bg-gray text-white text-center d-flex'><i className="bi bi-x-circle"></i></h6>
                                    </div> */}
                  </div>
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
      </>

    );
  }

  function formatDate(date: Date): string {
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    const month = date.toLocaleString('en-GB', { month: 'long' });
    return `${day}${suffix} ${month}`;
  }

  const newsData = examData.map(data => ({
    date: formatDate(new Date(data.created_at)),
    title: data.exam_title,
  }));

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const renderContent = (content) => (
    <div className="row">
      <div className="text-black pt-3">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

    </div>
  );

  return (
    <section className='clgInfoSec bg-white'>
      <div className="container">
        <div className='row'>
          <Carousel responsive={responsive} className="pt-2 text-center justify-content-start d-flex flex-fill gap-3 flex-wrap infoBtn mb-3">
            <button className="active btn mx-2 text-truncate nav-item" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-info" type="button" role="tab" aria-controls="nav-info" aria-selected="true">Overview</button>
            {data.exam_dates && data.exam_dates !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-exams-tab" data-bs-toggle="tab" data-bs-target="#nav-exams" type="button" role="tab" aria-controls="nav-exams" aria-selected="false">Exam Dates</button>}
            {data.eligibility_criteria && data.eligibility_criteria !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-eligibility-tab" data-bs-toggle="tab" data-bs-target="#nav-eligibility" type="button" role="tab" aria-controls="nav-eligibility" aria-selected="false">ELIGIBILITY & REGISTRATION</button>}
            {data.syllabus && data.syllabus !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-syllabus-tab" data-bs-toggle="tab" data-bs-target="#nav-syllabus" type="button" role="tab" aria-controls="nav-syllabus" aria-selected="false">EXAM PATTERN & SYLLABUS</button>}
            {data.cutoff && data.cutoff !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-cutoff-tab" data-bs-toggle="tab" data-bs-target="#nav-cutoff" type="button" role="tab" aria-controls="nav-cutoff" aria-selected="false">CUTOFF</button>}
            {data.admit_card && data.admit_card !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-admitcard-tab" data-bs-toggle="tab" data-bs-target="#nav-admitcard" type="button" role="tab" aria-controls="nav-admitcard" aria-selected="false">ADMIT CARD</button>}
            {data.exam_centers && data.exam_centers !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-examcenters-tab" data-bs-toggle="tab" data-bs-target="#nav-examcenters" type="button" role="tab" aria-controls="nav-examcenters" aria-selected="false">EXAM CENTRES</button>}
            {data.results && data.results !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-results-tab" data-bs-toggle="tab" data-bs-target="#nav-results" type="button" role="tab" aria-controls="nav-results" aria-selected="false">RESULT</button>}
            {data.prepretion_tips && data.prepretion_tips !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-prepretiontips-tab" data-bs-toggle="tab" data-bs-target="#nav-prepretiontips" type="button" role="tab" aria-controls="nav-prepretiontips" aria-selected="false">PREPARATION TIPS</button>}
            {data.counseling && data.counseling !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-counseling-tab" data-bs-toggle="tab" data-bs-target="#nav-counseling" type="button" role="tab" aria-controls="nav-counseling" aria-selected="false">COUNSELLING</button>}
            {data.accept_colleges && data.accept_colleges !== 'null' && <button className="btn mx-2 text-truncate nav-item" id="nav-acceptcolleges-tab" data-bs-toggle="tab" data-bs-target="#nav-acceptcolleges" type="button" role="tab" aria-controls="nav-acceptcolleges" aria-selected="false">ACCEPTING COLLEGES</button>}
            {data.clggallery && data.clggallery.length > 0 && <button className="btn mx-2 text-truncate nav-item" id="nav-gallery-tab" data-bs-toggle="tab" data-bs-target="#nav-gallery" type="button" role="tab" aria-controls="nav-gallery" aria-selected="false">Gallery</button>}
            {data.examfaqs && data.examfaqs.length > 0 && <button className="btn mx-2 text-truncate nav-item" id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>}
          </Carousel>


          <div className="col-md-8 text-black pt-3">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab">
                {renderContent(data.overview)}
              </div>
              <div className="tab-pane fade" id="nav-exams" role="tabpanel" aria-labelledby="nav-exams-tab">
                {renderContent(data.exam_dates)}
              </div>
              <div className="tab-pane fade" id="nav-eligibility" role="tabpanel" aria-labelledby="nav-eligibility-tab">
                {renderContent(data.eligibility_criteria)}
              </div>
              <div className="tab-pane fade" id="nav-syllabus" role="tabpanel" aria-labelledby="nav-syllabus-tab">
                {renderContent(data.syllabus)}
              </div>
              <div className="tab-pane fade" id="nav-cutoff" role="tabpanel" aria-labelledby="nav-cutoff-tab">
                {renderContent(data.cutoff)}
              </div>
              <div className="tab-pane fade" id="nav-admitcard" role="tabpanel" aria-labelledby="nav-admitcard-tab">
                {renderContent(data.admit_card)}
              </div>
              <div className="tab-pane fade" id="nav-examcenters" role="tabpanel" aria-labelledby="nav-examcenters-tab">
                {renderContent(data.exam_centers)}
              </div>
              <div className="tab-pane fade" id="nav-results" role="tabpanel" aria-labelledby="nav-results-tab">
                {renderContent(data.results)}
              </div>
              <div className="tab-pane fade" id="nav-prepretiontips" role="tabpanel" aria-labelledby="nav-prepretiontips-tab">
                {renderContent(data.prepretion_tips)}
              </div>
              <div className="tab-pane fade" id="nav-counseling" role="tabpanel" aria-labelledby="nav-counseling-tab">
                {renderContent(data.counseling)}
              </div>
              <div className="tab-pane fade" id="nav-acceptcolleges" role="tabpanel" aria-labelledby="nav-acceptcolleges-tab">
                {renderContent(data.accept_colleges)}
              </div>
              <div className="tab-pane fade" id="nav-faq" role="tabpanel" aria-labelledby="nav-faq-tab">
                <FaqSec data={data.examfaqs} />
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-md-5 fixed-column pt-5">
            <div className='bg-skyBlue px-lg-5 px-3 rounded'>
              <h5 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h5>
              <SideContactUsForm />
            </div>
            <NewsList newsItems={newsData} />
          </div>
        </div>
      </div>
      {promoban.length > 0 && <PromoAddBanner url={promoban[0].image} />}
    </section>
  );
}

export default OverviewSec;
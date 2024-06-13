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

type ExamData = {
  exam_title: string;
  created_at: string;
};

function OverviewSec({ data }) {
  const [examData, setExamData] = useState<ExamData[]>([]);
  const isMountedRef = useIsMountedRef();

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
  }, [getExams]);

  function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
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

  const renderContent = (content) => (
    <div className="row">
      <div className="order-2 order-md-1 col-md-8 text-black pt-3">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
     
    </div>
  );

  return (
    <section className='clgInfoSec bg-white'>
      <div className="container">
        <div className='row'>
        <div className="pt-2 text-center justify-content-start d-flex flex-fill flex-wrap infoBtn" id="nav-tab" role="tablist">
          <button className='active mb-3 btn' id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-info" type="button" role="tab" aria-controls="nav-info" aria-selected="true">Overview</button>
          {data.exam_dates && data.exam_dates !== 'null' && <button className='mb-3 btn' id="nav-exams-tab" data-bs-toggle="tab" data-bs-target="#nav-exams" type="button" role="tab" aria-controls="nav-exams" aria-selected="false">Exam Dates</button>}
          {data.eligibility_criteria && data.eligibility_criteria !== 'null' && <button className='mb-3 btn' id="nav-eligibility-tab" data-bs-toggle="tab" data-bs-target="#nav-eligibility" type="button" role="tab" aria-controls="nav-eligibility" aria-selected="false">ELIGIBILITY & REGISTRATION</button>}
          {data.syllabus && data.syllabus !== 'null' && <button className='mb-3 btn' id="nav-syllabus-tab" data-bs-toggle="tab" data-bs-target="#nav-syllabus" type="button" role="tab" aria-controls="nav-syllabus" aria-selected="false">EXAM PATTERN & SYLLABUS</button>}
          {data.cutoff && data.cutoff !== 'null' && <button className='mb-3 btn' id="nav-cutoff-tab" data-bs-toggle="tab" data-bs-target="#nav-cutoff" type="button" role="tab" aria-controls="nav-cutoff" aria-selected="false">CUTOFF</button>}
          {data.admit_card && data.admit_card !== 'null' && <button className='mb-3 btn' id="nav-admitcard-tab" data-bs-toggle="tab" data-bs-target="#nav-admitcard" type="button" role="tab" aria-controls="nav-admitcard" aria-selected="false">ADMIT CARD</button>}
          {data.exam_centers && data.exam_centers !== 'null' && <button className='mb-3 btn' id="nav-examcenters-tab" data-bs-toggle="tab" data-bs-target="#nav-examcenters" type="button" role="tab" aria-controls="nav-examcenters" aria-selected="false">EXAM CENTRES</button>}
          {data.results && data.results !== 'null' && <button className='mb-3 btn' id="nav-results-tab" data-bs-toggle="tab" data-bs-target="#nav-results" type="button" role="tab" aria-controls="nav-results" aria-selected="false">RESULT</button>}
          {data.prepretion_tips && data.prepretion_tips !== 'null' && <button className='mb-3 btn' id="nav-prepretiontips-tab" data-bs-toggle="tab" data-bs-target="#nav-prepretiontips" type="button" role="tab" aria-controls="nav-prepretiontips" aria-selected="false">PREPARATION TIPS</button>}
          {data.counseling && data.counseling !== 'null' && <button className='mb-3 btn' id="nav-counseling-tab" data-bs-toggle="tab" data-bs-target="#nav-counseling" type="button" role="tab" aria-controls="nav-counseling" aria-selected="false">COUNSELLING</button>}
          {data.accept_colleges && data.accept_colleges !== 'null' && <button className='mb-3 btn' id="nav-acceptcolleges-tab" data-bs-toggle="tab" data-bs-target="#nav-acceptcolleges" type="button" role="tab" aria-controls="nav-acceptcolleges" aria-selected="false">ACCEPTING COLLEGES</button>}
          {data.clggallery && data.clggallery.length > 0 && <button className='mb-3 btn' id="nav-gallery-tab" data-bs-toggle="tab" data-bs-target="#nav-gallery" type="button" role="tab" aria-controls="nav-gallery" aria-selected="false">Gallery</button>}
          {data.examfaqs && data.examfaqs.length > 0 && <button className='mb-3 btn' id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>}
        </div>


    <div className="order-2 order-md-1 col-md-8 text-black pt-3">
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
        <div className="col-md-4 mb-md-5 order-1 fixed-column">
        <div className='bg-skyBlue px-lg-5 px-3 rounded'>
          <h5 className='fw-bold text-blue text-center pt-3 mb-3'>Upcoming Exams</h5>
          <SideContactUsForm />
        </div>
        <NewsList newsItems={newsData} />
      </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSec;

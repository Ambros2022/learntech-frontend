import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });

function OverviewSection({ data, colleges, exams }) {

  const renderContent = (content) => (
    <div className="row pe-4">
      {/* <div className="order-2 order-md-1 col-md-8 text-black pt-3"> */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {/* </div> */}
    </div>
  );

  return (
    <>
      <section className='clgInfoSec bg-white'>
        <div className="container">
          <div className="pt-1 gap-3 text-center justify-content-center justify-content-md-start d-flex flex-fill flex-wrap infoBtn " id="nav-tab" role="tablist">
            {data.description && data.description !== 'null' && <button className='active mb-3 btn' id="nav-Overview-tab" data-bs-toggle="tab" data-bs-target="#nav-Overview" type="button" role="tab" aria-controls="nav-Overview" aria-selected="true">Overview</button>}
            {data.syllabus && data.syllabus !== 'null' && <button className='mb-3 btn' id="nav-Syllabus-tab" data-bs-toggle="tab" data-bs-target="#nav-Syllabus" type="button" role="tab" aria-controls="nav-Syllabus" aria-selected="false">Syllabus</button>}
            {data.admissions && data.admissions !== 'null' && <button className='mb-3 btn' id="nav-Admissions-tab" data-bs-toggle="tab" data-bs-target="#nav-Admissions" type="button" role="tab" aria-controls="nav-Admissions" aria-selected="false">Admissions</button>}
            {data.career_opportunities && data.career_opportunities !== 'null' && <button className='mb-3 btn' id="nav-Career-tab" data-bs-toggle="tab" data-bs-target="#nav-Career" type="button" role="tab" aria-controls="nav-Career" aria-selected="false">Career Opportunities</button>}
            {data.top_college && data.top_college !== 'null' && <button className='mb-3 btn' id="nav-Top-tab" data-bs-toggle="tab" data-bs-target="#nav-Top" type="button" role="tab" aria-controls="nav-Top" aria-selected="false">Top Colleges</button>}
            {data.generalcoursefaqs && data.generalcoursefaqs.length > 0 && <button className='mb-3 btn' id="nav-FAQ-tab" data-bs-toggle="tab" data-bs-target="#nav-FAQ" type="button" role="tab" aria-controls="nav-fee" aria-selected="false">FAQ</button>}
          </div>
          <div className="row">
            <div className="col-lg-9 col-md-8">
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-Overview" role="tabpanel" aria-labelledby="nav-Overview-tab">
                  {renderContent(data.description)}
                </div>
                <div className="tab-pane fade" id="nav-Syllabus" role="tabpanel" aria-labelledby="nav-Syllabus-tab">
                  {renderContent(data.syllabus)}
                </div>
                <div className="tab-pane fade" id="nav-Admissions" role="tabpanel" aria-labelledby="nav-Admissions-tab">
                  {renderContent(data.admissions)}
                </div>
                <div className="tab-pane fade" id="nav-Career" role="tabpanel" aria-labelledby="nav-Career-tab">
                  {renderContent(data.career_opportunities)}
                </div>
                <div className="tab-pane fade" id="nav-Top" role="tabpanel" aria-labelledby="nav-Top-tab">
                  {renderContent(data.top_college)}
                </div>
                <div className="tab-pane fade" id="nav-FAQ" role="tabpanel" aria-labelledby="nav-FAQ-tab">
                  <FaqSec data={data.generalcoursefaqs} />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 mb-md-5 mx-auto px-0">
              <div className="row imgCardConCrs mb-3">
                <div className="col-12 mb-3 px-0">
                  <div className='dental-crs-img flex-column d-flex justify-content-center'>
                    <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner}`} className='img-fluid' width={600} height={600} alt={`${data.name}-course-img`} />
                    {/* <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner}`} className='img-fluid' width={600} height={600} alt={`${data.name}-course-img`} /> */}
                    {/* <Image src='/images/icons/dental-course-img.jpg' className='' width={500} height={500} alt="dental-course-img" /> */}
                    <h6 className='text-center mb-3'>Are you interested in this course?</h6>
                    <GlobalEnquiryForm className="chkEligBtn mb-3 btn" buttonText={'Check Elgibility'} />
                  </div>
                </div>
                {colleges && colleges.length > 0 && (
                  <>
                    <h5 className='fw-bold text-blue pt-3 mb-3 text-center'>Top {data?.streams?.name} Colleges</h5>
                    <div className="col-12 cardConBrdr p-3 mb-3 bg-skyBlue  overflow-y-auto" style={{ maxHeight: 'calc(6 * 150px)' }}>
                      {colleges.map((college, index) => (
                        <Link href={`/college/${college.id}/${college.slug}`}>
                          <div key={index} className="mx-1 row card bg-skyBlue hover-card p-2 mb-3 d-flex flex-row">
                            <div className="col-md-5 align-content-center topCollegeImg mb-md-0 mb-3">
                              <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`} width={300} height={300} className='img-fluid rounded' alt='clg-img' />
                            </div>
                            <div className="col-md-7 align-content-center">
                              <h6 className='align-self-center mb-0 text-black ms-2 fw-bold'>{college.name}</h6>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>)}
                {exams && exams.length > 0 && (
                  <>
                    <h5 className='fw-bold text-blue pt-3 mb-3 text-center'>Top {data?.streams?.name} Exams</h5>
                    <div className="col-12 cardConBrdr p-3 bg-skyBlue  overflow-y-auto" style={{ maxHeight: 'calc(6 * 150px)' }}>
                      {exams?.map((exam, index) => (
                        <Link href={`/exam/${exam?.id}/${exam.slug}`}>
                          <div key={index} className="card p-2 mb-3 bg-skyBlue hover-card d-flex flex-row">
                            <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${exam.cover_image}`} width={90} height={60} className='img-fluid align-self-center' alt='clg-img' />
                            <h6 className='align-self-center fw-bold text-black ms-2 mb-0'>{exam.exam_title}</h6>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OverviewSection;

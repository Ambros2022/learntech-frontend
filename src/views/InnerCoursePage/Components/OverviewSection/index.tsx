import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });
function OverviewSection({ data, collegedata, examdata }) {



  return (
    <>
      <section className='clgInfoSec bg-white'>
        <div className="container">
          <div className=" text-center justify-content-center gap-3 justify-content-md-start d-flex flex-fill flex-wrap infoBtn " id="nav-tab" role="tablist">
            <button className='active mb-3 btn' id="nav-Overview-tab" data-bs-toggle="tab" data-bs-target="#nav-Overview" type="button" role="tab" aria-controls="nav-Overview" aria-selected="true">Overview</button>

            <button className='mb-3 btn' id="nav-UG-tab" data-bs-toggle="tab" data-bs-target="#nav-UG" type="button" role="tab" aria-controls="nav-UG" aria-selected="false">UG</button>
            <button className='mb-3 btn' id="nav-PG-tab" data-bs-toggle="tab" data-bs-target="#nav-PG" type="button" role="tab" aria-controls="nav-PG" aria-selected="false">PG</button>
            <button className='mb-3 btn' id="nav-Doctorate-tab" data-bs-toggle="tab" data-bs-target="#nav-Doctorate" type="button" role="tab" aria-controls="nav-Doctorate" aria-selected="false">Doctorate</button>
            <button className='mb-3 btn' id="nav-Diploma-tab" data-bs-toggle="tab" data-bs-target="#nav-Diploma" type="button" role="tab" aria-controls="nav-Diploma" aria-selected="false">Diploma</button>

            {data.top_college && data.top_college != '' ?
              <button className='mb-3 btn' id="nav-Top-tab" data-bs-toggle="tab" data-bs-target="#nav-Top" type="button" role="tab" aria-controls="nav-Top" aria-selected="false">Top Colleges</button>
              : ''}

            {data.streamfaqs && data.streamfaqs.length > 0 && <button className='mb-3 btn' id="nav-FAQ-tab" data-bs-toggle="tab" data-bs-target="#nav-FAQ" type="button" role="tab" aria-controls="nav-fee" aria-selected="false">FAQ</button>}
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-Overview" role="tabpanel" aria-labelledby="nav-Overview-tab">
                  <div className="row">
                    <div className="col-12 text-black mb-5 pe-5">
                      <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>

                  </div>
                </div>
                <div className="tab-pane fade" id="nav-PG" role="tabpanel" aria-labelledby="nav-PG-tab">
                  ...
                </div>
                <div className="tab-pane fade" id="nav-UG" role="tabpanel" aria-labelledby="nav-UG-tab">
                  ...
                </div>
                <div className="tab-pane fade" id="nav-Doctorate" role="tabpanel" aria-labelledby="nav-Doctorate-tab">
                  ...
                </div>
                <div className="tab-pane fade" id="nav-Diploma" role="tabpanel" aria-labelledby="nav-Diploma-tab">...</div>

                <div className="tab-pane fade" id="nav-Top" role="tabpanel" aria-labelledby="nav-Top-tab">
                  <div className='pe-5' dangerouslySetInnerHTML={{ __html: data.top_college }} />
                </div>
                <div className="tab-pane fade" id="nav-FAQ" role="tabpanel" aria-labelledby="nav-FAQ-tab">

                  <FaqSec data={data.streamfaqs} />

                </div>
              </div>
            </div>
            <div className="col-md-8 col-lg-3 mb-md-5 mx-auto px-0">
              <div className="row imgCardConCrs mb-3">
                <div className="col-12 mb-3 px-0">
                  <div className='dental-crs-img flex-column d-flex justify-content-center'>
                    <Image src='/images/icons/dental-course-img.jpg' className='' width={300} height={300} alt="dental-course-img" />
                    <small className='text-center mb-3'>Are you interested in this course?</small>
                    <GlobalEnquiryForm className="mb-3 btn chkEligBtn" buttonText="Check Elgibility" />
                    {/* <button className='mb-3 btn chkEligBtn'>Check Elgibility</button> */}
                  </div>
                </div>
                {collegedata && collegedata.length > 0 && (
                  <div key="e2" className="col-12 cardConBrdr p-3 mb-3 overflow-y-scroll text-center bg-skyBlue" style={{ height: '460px' }}>
                    <h5 className='fw-bold text-blue pt-3 mb-3'>Top {data.name} Colleges</h5>
                    {collegedata.map((val, ind) => (
                      <Link href={`/college/${val.id}/${val.slug}`} >
                        <div key={ind} className="card p-2 mb-3 d-flex flex-row bg-skyBlue hover-card">
                          <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${val.banner_image}`} className='img-fluid' width={90} height={60} alt={val.name}
                          />
                          <h6 className='align-content-center text-black mx-2'>{val.name}</h6>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {examdata && examdata.length > 0 && (
                  <div key="eee2" className="col-12 cardConBrdr p-3 mb-3 overflow-y-scroll text-center bg-skyBlue" style={{ height: '460px' }}>
                    <h5 className='fw-bold text-blue pt-3 mb-3'>Top {data.name} Exams</h5>
                    {examdata.map((val, ind) => (
                      <Link href={`/exam/${val.id}/${val.slug}`} >
                        <div key={ind} className="card bg-skyBlue hover-card p-2 mb-3 d-flex flex-row">
                          <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${val.cover_image}`} className='img-fluid' width={90} height={60} alt={val.exam_title}
                          />
                          <h6 className='align-content-center text-black mx-2'>{val.exam_title}</h6>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default OverviewSection;

import React from 'react'
import Link from 'next/link'
import YoutubeVideo from 'src/@core/components/youtube-videos'
import Image from 'next/image'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import dynamic from 'next/dynamic';
import ReviewSec from '../ReviewSec'
import ContactForm from 'src/@core/components/popup/ContactForm';
const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });


function CollegeInfoSection({ data, exams }) {
  return (
    <>
      <section className='clgInfoSec bg-white'>
        <section className="container InnerCollegeNavigationLink linkFontSize py-3">
          <p className='mb-3'><Link href="/">Home <i className='bi bi-chevron-right'></i></Link><Link href={"/boards"}> Boards <i className='bi bi-chevron-right'></i></Link><span className='text-blue' style={{ cursor: 'pointer' }}> {data.name}</span></p>
        </section>
        <div className="container">
          <div className="pt-3 text-center justify-content-start d-flex flex-fill flex-wrap infoBtn gap-3 " id="nav-tab" role="tablist">
            {
              data.info && data.info != '' && data.info != 'null' && data.info != '<p>null</p>' ?
                <button className='active btn' id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-info" type="button" role="tab" aria-controls="nav-info" aria-selected="true">Info</button>
                : ''
            }
            {
              data.time_table && data.time_table != '' && data.time_table != 'null' && data.time_table != '<p>null</p>' ?
                <button className='btn' id="nav-time_table-tab" data-bs-toggle="tab" data-bs-target="#nav-time_table" type="button" role="tab" aria-controls="nav-time_table" aria-selected="false">Time Table</button>
                : ''
            }
            {
              data.reg_form && data.reg_form != '' && data.reg_form != 'null' && data.reg_form != '<p>null</p>' ?
                <button className='btn' id="nav-reg_form-tab" data-bs-toggle="tab" data-bs-target="#nav-reg_form" type="button" role="tab" aria-controls="nav-reg_form" aria-selected="false">Registration Form</button>
                : ''
            }
            {
              data.syllabus && data.syllabus != '' && data.syllabus != 'null' && data.syllabus != '<p>null</p>' ?
                <button className='btn' id="nav-syllabus-tab" data-bs-toggle="tab" data-bs-target="#nav-syllabus" type="button" role="tab" aria-controls="nav-syllabus" aria-selected="false">Syllabus</button>
                : ''
            }
            {
              data.results && data.results != '' && data.results != 'null' && data.results != '<p>null</p>' ?
                <button className='btn' id="nav-Results-tab" data-bs-toggle="tab" data-bs-target="#nav-Results" type="button" role="tab" aria-controls="nav-Results" aria-selected="false">Results</button>
                : ''
            }
            {
              data.sample_paper && data.sample_paper != '' && data.sample_paper != 'null' && data.sample_paper != '<p>null</p>' ?
                <button className='btn' id="nav-sample_paper-tab" data-bs-toggle="tab" data-bs-target="#nav-sample_paper" type="button" role="tab" aria-controls="nav-sample_paper" aria-selected="false">Sample Papers</button>
                : ''
            }
            {
              data.hostel && data.hostel != '' && data.hostel != 'null' && data.hostel != '<p>null</p>' ?
                <button className='btn' id="nav-hostel-tab" data-bs-toggle="tab" data-bs-target="#nav-hostel" type="button" role="tab" aria-controls="nav-hostel" aria-selected="false">Infrastructure </button>
                : ''
            }
            {
              data.clggallery && data.clggallery.length > 0 ?
                <button className='btn' id="nav-gallery-tab" data-bs-toggle="tab" data-bs-target="#nav-gallery" type="button" role="tab" aria-controls="nav-gallery" aria-selected="false">Gallery</button>
                : ''
            }


            <button className='btn' id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">Reviews</button>

            {
              data.schoolboardfaqs && data.schoolboardfaqs.length > 0 ?
                <button className='btn' id="nav-schoolboardfaqs-tab" data-bs-toggle="tab" data-bs-target="#nav-schoolboardfaqs" type="button" role="tab" aria-controls="nav-schoolboardfaqs" aria-selected="false">FAQ</button>
                : ''
            }

          </div>
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-7 col-10 mx-auto">
              <div className="tab-content pt-5" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab">
                  <div dangerouslySetInnerHTML={{ __html: data.info }} />
                </div>
                <div className="tab-pane fade" id="nav-time_table" role="tabpanel" aria-labelledby="nav-time_table-tab">
                  <div dangerouslySetInnerHTML={{ __html: data.time_table }} ></div>
                </div>
                <div className="tab-pane fade" id="nav-reg_form" role="tabpanel" aria-labelledby="nav-reg_form-tab">
                  <div dangerouslySetInnerHTML={{ __html: data.reg_form }} >
                  </div>
                </div>

                <div className="tab-pane fade" id="nav-syllabus" role="tabpanel" aria-labelledby="nav-syllabus-tab">
                  <div dangerouslySetInnerHTML={{ __html: data.syllabus }} ></div>
                </div>
                <div className="tab-pane fade" id="nav-Results" role="tabpanel" aria-labelledby="nav-Results-tab">
                  <div dangerouslySetInnerHTML={{ __html: data.results }} ></div>
                </div>
                <div className="tab-pane fade" id="nav-sample_paper" role="tabpanel" aria-labelledby="nav-sample_paper-tab">
                  <div dangerouslySetInnerHTML={{ __html: data.sample_paper }} ></div>
                </div>

                <div className="tab-pane fade" id="nav-hostel" role="tabpanel" aria-labelledby="nav-hostel-tab">
                  <div dangerouslySetInnerHTML={{ __html: data.hostel }} ></div>
                </div >

                <div className="tab-pane fade " id="nav-gallery" role="tabpanel" aria-labelledby="nav-gallery-tab">
                  {/* <div className="row bg-skyBlue">
                {data.clggallery.map((item) => <div className="col-md-4 galleryImgStyle">
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} className='' width={300} height={300} alt='College Card' />
                </div>)}

              </div> */}
                </div>
                <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">
                  <ReviewSec />

                </div>

                <div className="tab-pane fade" id="nav-schoolboardfaqs" role="tabpanel" aria-labelledby="nav-schoolboardfaqs-tab">
                  <FaqSec data={data.schoolboardfaqs} />
                </div>

              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-5 col-10 mx-auto py-5">
              <ContactForm heading={'Contact US'} />
              <h4 className='fw-bold text-blue pt-3 mb-3 text-center'>Upcoming Exams</h4>
              <div className="col-12 cardConBrdr p-3 overflow-y-auto bg-skyBlue my-3" style={{ maxHeight: 'calc(7 * 90px)' }}>
                {exams.map((exam, index) => (
                  <Link href={`/exam/${exam.id}/${exam.slug}`}>
                    <div key={index} className="card bg-skyBlue hover-card p-2 d-flex mb-3">
                      <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-5 mx-auto">
                          <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${exam.cover_image}`} width={500} height={500} className='align-self-center innerBoardImg' alt='clg-img' />
                        </div>
                        <div className="col-xl-7 col-lg-7 col-md-7 d-flex justify-content-md-start justify-content-center">
                          <h6 className='m-0 align-self-center text-md-start text-center fw-bold text-black ms-2 mb-0'>{exam.exam_title} Exam</h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default CollegeInfoSection

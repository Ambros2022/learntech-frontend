import React from 'react'
import Link from 'next/link'
import YoutubeVideo from 'src/@core/components/youtube-videos'
import Image from 'next/image'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import dynamic from 'next/dynamic';
import ReviewSec from '../ReviewSec'
const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });


function CollegeInfoSection({ data }) {
  return (
    <>
      <section className='clgInfoSec bg-white'>
        <section className="container InnerCollegeNavigationLink linkFontSize py-3">
          <p className='mb-3'><Link href="/">Home <i className='bi bi-chevron-right'></i></Link><Link href={"/boards"}> Boards <i className='bi bi-chevron-right'></i></Link><span className='text-blue' style={{ cursor: 'pointer' }}> {data.name}</span></p>
        </section>
        <div className="container">
          <div className="pt-3 text-center justify-content-start d-flex flex-fill flex-wrap infoBtn gap-3 " id="nav-tab" role="tablist">
            <button className='active btn' id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-Overview" type="button" role="tab" aria-controls="nav-Overview" aria-selected="true">Overview</button>
            {
              data.course_fees && data.course_fees != '' && data.course_fees != 'null' && data.course_fees != '<p>null</p>' ?
                <button className='btn' id="nav-time_table-tab" data-bs-toggle="tab" data-bs-target="#nav-time_table" type="button" role="tab" aria-controls="nav-time_table" aria-selected="false">Time Table </button>
                : ''
            }
            {
              data.admissions && data.admissions != '' && data.admissions != 'null' && data.admissions != '<p>null</p>' ?
                <button className='btn' id="nav-registration_form-tab" data-bs-toggle="tab" data-bs-target="#nav-registration_form" type="button" role="tab" aria-controls="nav-registration_form" aria-selected="false">Registration Form</button>
                : ''
            }
            {
              data.placements && data.placements != '' && data.placements != 'null' && data.placements != '<p>null</p>' ?
                <button className='btn' id="nav-Syllabus-tab" data-bs-toggle="tab" data-bs-target="#nav-Syllabus" type="button" role="tab" aria-controls="nav-Syllabus" aria-selected="false">Syllabus</button>
                : ''
            }
            {
              data.rankings && data.rankings != '' && data.rankings != 'null' && data.rankings != '<p>null</p>' ?
                <button className='btn' id="nav-Results-tab" data-bs-toggle="tab" data-bs-target="#nav-Results" type="button" role="tab" aria-controls="nav-Results" aria-selected="false">Results</button>
                : ''
            }
            {
              data.scholarship && data.scholarship != '' && data.scholarship != 'null' && data.scholarship != '<p>null</p>' ?
                <button className='btn' id="nav-s Sample_Papers-tab" data-bs-toggle="tab" data-bs-target="#nav-s Sample_Papers" type="button" role="tab" aria-controls="nav-s Sample_Papers" aria-selected="false">Sample Papers</button>
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
              data.collegefaqs && data.collegefaqs.length > 0 ?
                <button className='btn' id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>
                : ''
            }

          </div>

          <div className="tab-content pt-5" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-Overview" role="tabpanel" aria-labelledby="nav-Overview-tab">
              <div className="row">
                <div className="order-2 order-md-1 col-md-8 col-lg-8 col-xl-9 text-black pt-3">
                  <div dangerouslySetInnerHTML={{ __html: data.info }} />
                </div>
                <div className="col-md-4 col-10 mx-md-0 mx-auto col-xl-3 col-lg-4 pt-3 rounded mb-md-5 order-1 order-md-2">
                  <div className="row gx-2">
                    {data.banner_image && data.banner_image !== "" && <div className="col-12 applyNowImg position-relative mb-2">
                      <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner_image}`} width={300} height={300} className='rounded' alt='College Card' />
                      <GlobalEnquiryForm className="applyNowImgbtn btn" />
                    </div>}
                    {data.video_url && data.video_url !== "" && <div className="col-12 yotubeImg position-relative mb-2">
                      <YoutubeVideo videoId={data.video_url} />
                    </div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-time_table" role="tabpanel" aria-labelledby="nav-time_table-tab">
              <div dangerouslySetInnerHTML={{ __html: data.course_fees }} ></div>
            </div>
            <div className="tab-pane fade" id="nav-registration_form" role="tabpanel" aria-labelledby="nav-registration_form-tab">
              <div dangerouslySetInnerHTML={{ __html: data.admissions }} >
              </div>
            </div>

            <div className="tab-pane fade" id="nav-Syllabus" role="tabpanel" aria-labelledby="nav-Syllabus-tab">
              <div dangerouslySetInnerHTML={{ __html: data.placements }} ></div>
            </div>
            <div className="tab-pane fade" id="nav-Results" role="tabpanel" aria-labelledby="nav-Results-tab">
              <div dangerouslySetInnerHTML={{ __html: data.rankings }} ></div>
            </div>
            <div className="tab-pane fade" id="nav-s Sample_Papers" role="tabpanel" aria-labelledby="nav-s Sample_Papers-tab">
              <div dangerouslySetInnerHTML={{ __html: data.scholarship }} ></div>
            </div>

            <div className="tab-pane fade" id="nav-hostel" role="tabpanel" aria-labelledby="nav-hostel-tab">
              <div dangerouslySetInnerHTML={{ __html: data.hostel }} ></div>
            </div >

            <div className="tab-pane fade " id="nav-gallery" role="tabpanel" aria-labelledby="nav-gallery-tab">
              <div className="row bg-skyBlue">
                {data.clggallery.map((item) => <div className="col-md-4 galleryImgStyle">
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} className='' width={300} height={300} alt='College Card' />
                </div>)}

              </div>
            </div>
            <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">
              <ReviewSec />

            </div>

            <div className="tab-pane fade" id="nav-faq" role="tabpanel" aria-labelledby="nav-faq-tab">
              <FaqSec data={data.collegefaqs} />
            </div>

          </div>
        </div>
      </section >
    </>
  )
}

export default CollegeInfoSection

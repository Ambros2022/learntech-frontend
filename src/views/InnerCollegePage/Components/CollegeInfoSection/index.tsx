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
        <section className="container InnerCollegeNavigationLink pt-2">
          <p className='mb-3'><Link href="/">Home</Link> {'>'} <Link href={"/colleges"}>Colleges</Link> {'>'} <span className='text-blue' style={{ cursor: 'pointer' }}>{data.name}</span></p>
        </section>
        <div className="container">
          <div className="pt-2 text-center justify-content-start d-flex flex-fill flex-wrap infoBtn gap-3 " id="nav-tab" role="tablist">
            <button className='active btn' id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-info" type="button" role="tab" aria-controls="nav-info" aria-selected="true">Info</button>
            {
              data.course_fees && data.course_fees != '' && data.course_fees != 'null' && data.course_fees != '<p>null</p>' ?
                <button className='btn' id="nav-fees-tab" data-bs-toggle="tab" data-bs-target="#nav-fees" type="button" role="tab" aria-controls="nav-fees" aria-selected="false">Courses &amp; Fee </button>
                : ''
            }
            {
              data.admissions && data.admissions != '' && data.admissions != 'null' && data.admissions != '<p>null</p>' ?
                <button className='btn' id="nav-admission-tab" data-bs-toggle="tab" data-bs-target="#nav-admission" type="button" role="tab" aria-controls="nav-admission" aria-selected="false">Admissions</button>
                : ''
            }
            {
              data.placements && data.placements != '' && data.placements != 'null' && data.placements != '<p>null</p>' ?
                <button className='btn' id="nav-placement-tab" data-bs-toggle="tab" data-bs-target="#nav-placement" type="button" role="tab" aria-controls="nav-placement" aria-selected="false">Placement</button>
                : ''
            }
            {
              data.rankings && data.rankings != '' && data.rankings != 'null' && data.rankings != '<p>null</p>' ?
                <button className='btn' id="nav-ranking-tab" data-bs-toggle="tab" data-bs-target="#nav-ranking" type="button" role="tab" aria-controls="nav-ranking" aria-selected="false">Ranking</button>
                : ''
            }
            {
              data.scholarship && data.scholarship != '' && data.scholarship != 'null' && data.scholarship != '<p>null</p>' ?
                <button className='btn' id="nav-scholarship-tab" data-bs-toggle="tab" data-bs-target="#nav-scholarship" type="button" role="tab" aria-controls="nav-scholarship" aria-selected="false">Scholarship</button>
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


            <button className='btn' id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">Review</button>

            {
              data.collegefaqs && data.collegefaqs.length > 0 ?
                <button className='btn' id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>
                : ''
            }

          </div>

          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab">
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
            <div className="tab-pane fade" id="nav-fees" role="tabpanel" aria-labelledby="nav-fees-tab">
              <div dangerouslySetInnerHTML={{ __html: data.course_fees }} ></div>
            </div>
            <div className="tab-pane fade" id="nav-admission" role="tabpanel" aria-labelledby="nav-admission-tab">
              <div dangerouslySetInnerHTML={{ __html: data.admissions }} >
              </div>
            </div>

            <div className="tab-pane fade" id="nav-placement" role="tabpanel" aria-labelledby="nav-placement-tab">
              <div dangerouslySetInnerHTML={{ __html: data.placements }} ></div>
            </div>
            <div className="tab-pane fade" id="nav-ranking" role="tabpanel" aria-labelledby="nav-ranking-tab">
              <div dangerouslySetInnerHTML={{ __html: data.rankings }} ></div>
            </div>
            <div className="tab-pane fade" id="nav-scholarship" role="tabpanel" aria-labelledby="nav-scholarship-tab">
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

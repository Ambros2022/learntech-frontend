import React from 'react'
import Link from 'next/link'
import YoutubeVideo from 'src/@core/components/youtube-videos'
import Image from 'next/image'


function CollegeInfoSection() {
  return (
    <>
      <section className='clgInfoSec bg-white'>
        <section className="container InnerCollegeNavigationLink pt-2">
          <p className='mb-3'><Link href="/">Home</Link> {'>'} <Link href={"/college"}>Colleges</Link> {'>'} <Link href="#">Yenepoya Medical College</Link> {'>'} <span className='text-blue'><Link href="#" className="text-blue">MBBS</Link></span></p>
        </section>
        <div className="container">
          <div className="pt-5 text-center justify-content-center d-flex flex-fill flex-wrap infoBtn " id="nav-tab" role="tablist">
            <button className='active mb-3 btn' id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-info" type="button" role="tab" aria-controls="nav-info" aria-selected="true">Info</button>
            <button className='mb-3 btn' id="nav-fees-tab" data-bs-toggle="tab" data-bs-target="#nav-fees" type="button" role="tab" aria-controls="nav-fees" aria-selected="false">Courses &amp; Fee </button>
            <button className='mb-3 btn' id="nav-admission-tab" data-bs-toggle="tab" data-bs-target="#nav-admission" type="button" role="tab" aria-controls="nav-admission" aria-selected="false">Admissions</button>
            <button className='mb-3 btn' id="nav-placement-tab" data-bs-toggle="tab" data-bs-target="#nav-placement" type="button" role="tab" aria-controls="nav-placement" aria-selected="false">Placement</button>
            <button className='mb-3 btn' id="nav-ranking-tab" data-bs-toggle="tab" data-bs-target="#nav-ranking" type="button" role="tab" aria-controls="nav-ranking" aria-selected="false">Ranking</button>
            <button className='mb-3 btn' id="nav-scholarship-tab" data-bs-toggle="tab" data-bs-target="#nav-scholarship" type="button" role="tab" aria-controls="nav-scholarship" aria-selected="false">Scholarship</button>
            <button className='mb-3 btn' id="nav-hostel-tab" data-bs-toggle="tab" data-bs-target="#nav-hostel" type="button" role="tab" aria-controls="nav-hostel" aria-selected="false">Hostel</button>
            <button className='mb-3 btn' id="nav-gallery-tab" data-bs-toggle="tab" data-bs-target="#nav-gallery" type="button" role="tab" aria-controls="nav-gallery" aria-selected="false">Gallery</button>
            <button className='mb-3 btn' id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">Review</button>
            <button className='mb-3 btn' id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#nav-faq" type="button" role="tab" aria-controls="nav-faq" aria-selected="false">FAQ</button>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab">
              <div className="row">
                <div className="order-2 order-md-1 col-md-7 text-black bg-skyBlue py-3 mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br></br><br></br> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className="col-md-5 mb-md-5 order-1 order-md-2">
                  <div className="row gx-2">
                    <div className="col-12 applyNowImg position-relative mb-2">
                      <Image src='/images/icons/filter-card.jpg' width={300} height={300} alt='College Card' />
                      <a href="#" className='btn'>Apply Now</a>
                    </div>
                    <div className="col-12 yotubeImg position-relative mb-2">
                      <YoutubeVideo videoId={'dQw4w9WgXcQ'} />
                      {/* <Image src='/images/icons/youtubeClg.jpg' width={300} height={300} alt='College Card' />
                      <a href="#" className='btn'><Image src="/images/icons/Youtube-logo.png" width={60} height={34} alt="Youtube Logo" /></a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-fees" role="tabpanel" aria-labelledby="nav-fees-tab">
              <div className="row">
                <div className="order-2 order-md-1 col-12 text-black mb-5">
                  <h4 className='fw-bold pt-3'>UG & PG Courses Offered by Yenepoya Medical College</h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="col-12 mb-md-5 order-1 order-md-2">
                  <div className="row">
                    <div className='table-responsive overflowScroll'>
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th>Course</th>
                            <th>Duration</th>
                            <th>Average Fees</th>
                            <th>Eligibility Criteria</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>MBBS</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                          <tr>
                            <td>MD</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                          <tr>
                            <td>MS</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                          <tr>
                            <td>MD Pediatrics</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                          <tr>
                            <td>MS Ophthalmology</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                          <tr>
                            <td>MD Anaesthesia</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                          <tr>
                            <td>MS Orthopedics</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                          <tr>
                            <td>MCh Urology</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                          <tr>
                            <td>MCh Surgical Oncology</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                          <tr>
                            <td>MD Psychiatry</td>
                            <td>2 Years</td>
                            <td>2.5 Lakh (1st Year)</td>
                            <td>10+2 with 70% + NEET</td>
                            <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-admission" role="tabpanel" aria-labelledby="nav-admission-tab">...</div>
            <div className="tab-pane fade" id="nav-placement" role="tabpanel" aria-labelledby="nav-placement-tab">...</div>
            <div className="tab-pane fade" id="nav-ranking" role="tabpanel" aria-labelledby="nav-ranking-tab">...</div>
            <div className="tab-pane fade" id="nav-scholarship" role="tabpanel" aria-labelledby="nav-scholarship-tab">...</div>
            <div className="tab-pane fade" id="nav-hostel" role="tabpanel" aria-labelledby="nav-hostel-tab">...</div>
            <div className="tab-pane fade" id="nav-gallery" role="tabpanel" aria-labelledby="nav-gallery-tab">...</div>
            <div className="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">...</div>
            <div className="tab-pane fade" id="nav-faq" role="tabpanel" aria-labelledby="nav-faq-tab">...</div>
          </div>
        </div>


      </section >
    </>
  )
}

export default CollegeInfoSection

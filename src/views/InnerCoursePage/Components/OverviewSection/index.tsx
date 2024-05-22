import Image from 'next/image';
import React from 'react'

function OverviewSection() {
  return (
    <>
      <section className='clgInfoSec bg-white'>
        <div className="container">
          <div className="pt-5 text-center justify-content-center justify-content-md-start d-flex flex-fill flex-wrap infoBtn " id="nav-tab" role="tablist">
            <button className='active mb-3 btn' id="nav-Overview-tab" data-bs-toggle="tab" data-bs-target="#nav-Overview" type="button" role="tab" aria-controls="nav-Overview" aria-selected="true">Overview</button>
            <button className='mb-3 btn' id="nav-UG-tab" data-bs-toggle="tab" data-bs-target="#nav-UG" type="button" role="tab" aria-controls="nav-UG" aria-selected="false">UG</button>
            <button className='mb-3 btn' id="nav-PG-tab" data-bs-toggle="tab" data-bs-target="#nav-PG" type="button" role="tab" aria-controls="nav-PG" aria-selected="false">PG</button>
            <button className='mb-3 btn' id="nav-Doctorate-tab" data-bs-toggle="tab" data-bs-target="#nav-Doctorate" type="button" role="tab" aria-controls="nav-Doctorate" aria-selected="false">Doctorate</button>
            <button className='mb-3 btn' id="nav-Diploma-tab" data-bs-toggle="tab" data-bs-target="#nav-Diploma" type="button" role="tab" aria-controls="nav-Diploma" aria-selected="false">Diploma</button>
            <button className='mb-3 btn' id="nav-Top-tab" data-bs-toggle="tab" data-bs-target="#nav-Top" type="button" role="tab" aria-controls="nav-Top" aria-selected="false">Top Colleges</button>
            <button className='mb-3 btn' id="nav-FAQ-tab" data-bs-toggle="tab" data-bs-target="#nav-FAQ" type="button" role="tab" aria-controls="nav-fee" aria-selected="false">FAQ</button>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-Overview" role="tabpanel" aria-labelledby="nav-Overview-tab">
              <div className="row ">
                <div className="order-2 order-md-1 col-md-8 col-lg-9 text-black mb-5 pe-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br></br><br></br>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br></br><br></br>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br></br><br></br>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br></br><br></br>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua<br></br><br></br>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br></br><br></br>
                </div>
                <div className="col-md-4 col-lg-3 mb-md-5 order-1 order-md-2 mx-0 px-0">
                  <div className="row imgCardConCrs mb-3">
                    <div className="col-12 mb-3 px-0">
                      <div className='dental-crs-img flex-column d-flex justify-content-center'>
                        <Image src='/images/icons/dental-course-img.jpg' className='' width={100} height={100} alt="dental-course-img" />
                        <small className='text-center mb-3'>Are you interested in this course?</small>
                        <button className='mb-3 btn chkEligBtn'>Check Elgibility</button>
                      </div>
                    </div>
                    <div className="col-12 cardConBrdr p-3 mb-3">
                      <h5 className='fw-bold text-blue pt-3 mb-3'>Top Dental Colleges</h5>
                      <div className="card p-2 mb-3 d-flex flex-row">
                        <Image src='/images/icons/filter-card.jpg' width={90} height={60} alt='clg-img' />
                        <small className='align-content-center text-black mx-2'>Kashmir University</small>
                      </div>
                      <div className="card p-2 mb-3 d-flex flex-row">
                        <Image src='/images/icons/filter-card.jpg' width={90} height={60} alt='clg-img' />
                        <small className='align-content-center text-black mx-2'>Kashmir University</small>
                      </div>
                      <div className="card p-2 mb-3 d-flex flex-row">
                        <Image src='/images/icons/filter-card.jpg' width={90} height={60} alt='clg-img' />
                        <small className='align-content-center text-black mx-2'>Kashmir University</small>
                      </div>
                      <div className="card p-2 mb-3 d-flex flex-row">
                        <Image src='/images/icons/filter-card.jpg' width={90} height={60} alt='clg-img' />
                        <small className='align-content-center text-black mx-2'>Kashmir University</small>
                      </div>
                    </div>
                    <div className="col-12 cardConBrdr p-3">
                      <h5 className='fw-bold text-blue pt-3 mb-3'>Top Dental Exams</h5>
                      <div className="card p-2 mb-3 d-flex flex-row">
                        <Image src='/images/icons/filter-card.jpg' width={90} height={60} alt='clg-img' />
                        <small className='align-content-center text-black mx-2'>AIPDGE</small>
                      </div>
                      <div className="card p-2 mb-3 d-flex flex-row">
                        <Image src='/images/icons/filter-card.jpg' width={90} height={60} alt='clg-img' />
                        <small className='align-content-center text-black mx-2'>NEET MDS</small>
                      </div>
                      <div className="card p-2 mb-3 d-flex flex-row">
                        <Image src='/images/icons/filter-card.jpg' width={90} height={60} alt='clg-img' />
                        <small className='align-content-center text-black mx-2'>CETPPMC</small>
                      </div>
                      <div className="card p-2 mb-3 d-flex flex-row">
                        <Image src='/images/icons/filter-card.jpg' width={90} height={60} alt='clg-img' />
                        <small className='align-content-center text-black mx-2'>MP DMAT</small>
                      </div>
                    </div>
                  </div>
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
              ...
            </div>
            <div className="tab-pane fade" id="nav-FAQ" role="tabpanel" aria-labelledby="nav-FAQ-tab">...</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OverviewSection;

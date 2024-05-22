import React from 'react'

function CourseDetailSec() {
  return (
    <>
      <section className='clgInfoSec bg-white'>
        <div className="container">
          <div className="pt-5 text-center justify-content-start d-flex flex-fill flex-wrap infoBtn " id="nav-tab" role="tablist">
            <button className='active mb-3 btn' id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-course" type="button" role="tab" aria-controls="nav-course" aria-selected="true">Course Details</button>
            <button className='mb-3 btn' id="nav-eligibility-tab" data-bs-toggle="tab" data-bs-target="#nav-eligibility" type="button" role="tab" aria-controls="nav-eligibility" aria-selected="false">Eligibility Criteria </button>
            <button className='mb-3 btn' id="nav-fee-tab" data-bs-toggle="tab" data-bs-target="#nav-fee" type="button" role="tab" aria-controls="nav-fee" aria-selected="false">Fee Structure</button>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-course" role="tabpanel" aria-labelledby="nav-course-tab">
              <div className="row">
                <div className="order-2 order-md-1 col-12 text-black mb-5">
                  <h4 className='fw-bold pt-2'>UG & PG Courses Offered by Yenepoya Medical College</h4>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br></br><br></br> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className="col-md-12 mb-md-5 order-1 order-md-2">
                  <div className="row">
                    <table className="table table-bordered w-75 mt-4 m-auto mb-3">
                      <thead>
                        <tr>
                          <th>Particulars</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Course Name</td>
                          <td>Bachelor of Medicine and Bachelor of Surgery</td>
                        </tr>
                        <tr>
                          <td>Abbreviation</td>
                          <td>Bachelor of Medicine and Bachelor of Surgery</td>
                        </tr>
                        <tr>
                          <td>Type</td>
                          <td>Bachelor of Medicine and Bachelor of Surgery</td>
                        </tr>
                        <tr>
                          <td>Level</td>
                          <td>Bachelor of Medicine and Bachelor of Surgery</td>
                        </tr>
                        <tr>
                          <td>Field</td>
                          <td>Bachelor of Medicine and Bachelor of Surgery</td>
                        </tr>
                        <tr>
                          <td>Course Duration</td>
                          <td>Bachelor of Medicine and Bachelor of Surgery</td>
                        </tr>
                        <tr>
                          <td>Medium</td>
                          <td>Bachelor of Medicine and Bachelor of Surgery</td>
                        </tr>
                        <tr>
                          <td>Modes</td>
                          <td>Bachelor of Medicine and Bachelor of Surgery</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-eligibility" role="tabpanel" aria-labelledby="nav-eligibility-tab">
              ...
            </div>
            <div className="tab-pane fade" id="nav-fee" role="tabpanel" aria-labelledby="nav-fee-tab">...</div>
          </div>
        </div>


      </section>
    </>
  )
}

export default CourseDetailSec;

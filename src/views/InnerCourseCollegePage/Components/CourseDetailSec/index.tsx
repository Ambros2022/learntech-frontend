import React from 'react'

function CourseDetailSec({ data }) {
  return (
    <>
      <section className='clgInfoSec bg-white'>
        <div className="container">
          <div className="pt-2 text-center justify-content-start d-flex flex-fill gap-3 flex-wrap infoBtn " id="nav-tab" role="tablist">
          {data.course_details && data.eligibility !== ''?<button className='active mb-3 btn' id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-course" type="button" role="tab" aria-controls="nav-course" aria-selected="true">Course Details</button>:''}

            {data.eligibility && data.eligibility !== ''?<button className='mb-3 btn' id="nav-eligibility-tab" data-bs-toggle="tab" data-bs-target="#nav-eligibility" type="button" role="tab" aria-controls="nav-eligibility" aria-selected="false">Eligibility Criteria </button>:''}

            {data.fee_structure && data.fee_structure !== '' ?<button className='mb-3 btn' id="nav-fee-tab" data-bs-toggle="tab" data-bs-target="#nav-fee" type="button" role="tab" aria-controls="nav-fee" aria-selected="false">Fee Structure</button>:""}
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-course" role="tabpanel" aria-labelledby="nav-course-tab">
              <div dangerouslySetInnerHTML={{ __html: data.course_details }} />
            </div>
            <div className="tab-pane fade" id="nav-eligibility" role="tabpanel" aria-labelledby="nav-eligibility-tab">
              <div dangerouslySetInnerHTML={{ __html: data.eligibility }} />
            </div>
            <div className="tab-pane fade" id="nav-fee" role="tabpanel" aria-labelledby="nav-fee-tab">
              <div dangerouslySetInnerHTML={{ __html: data.fee_structure }} />
            </div>
          </div>
        </div>


      </section>
    </>
  )
}

export default CourseDetailSec;

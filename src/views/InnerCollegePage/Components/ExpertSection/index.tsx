import React from 'react'
import ExpertEnquiryForm from 'src/@core/components/popup/ExpertEnquiryForm';

function ExpertSection() {

  return (
    <>
      <section className=" innerCollege bg-blue">
        <div className="container py-5">
          <h2 className="fw-bold text-white text-center">Get In Touch With Our Expert Counsellor</h2>
          <div className="pt-3 form container">
            <ExpertEnquiryForm></ExpertEnquiryForm>
          </div>
        </div>
      </section>
    </>
  )
}

export default ExpertSection

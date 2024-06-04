import React from 'react'
import 'intl-tel-input/build/css/intlTelInput.css';
import PhoneInput from 'src/@core/components/custom-phoneInputWithFlags';
import ExpertEnquiryForm from 'src/@core/components/popup/ExpertEnquiryForm';

function ExpertSection() {


  return (
    <>
      <section className="ExpertCon bg-white pt-5">
        <div className="container pb-5">
          <h3 className="fw-bold text-center">Get In Touch With Our Expert Counsellor</h3>

          <div className="pt-3 form container">
            <ExpertEnquiryForm></ExpertEnquiryForm>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default ExpertSection

import React from 'react'
import AnimatedCounter from '../AnimatedCounters/animatedCounter'
import AnimatedCounter2 from '../AnimatedCounters/animatedCounter2'
import AnimatedCounter3 from '../AnimatedCounters/animatedCounter3'
import Image from 'next/image'

function AnalysisSection() {
  return (
    <div className="Analysis-Section" id="animation4" data-aos="fade-up">
      <div className="container pt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4 mb-5">
            <div className="row">
              <div className="col-md-4 col-4 text-end">
                <Image src="/images/icons/applications-filled.svg" width={70} height={70} alt="applications-filled-icon" />
              </div>
              <div className="col-md-8 col-8 text-start mt-2 mt-md-0">
                <h4 className="fw-bold"><AnimatedCounter /></h4>
                <h6>Application Filled</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="row">
              <div className="col-md-4  col-4 text-end">
                <Image src="/images/icons/admission-done.svg" width={70} height={70} alt="admission-done-icon" />
              </div>
              <div className="col-md-8 col-8 text-start mt-2 mt-md-0">
                <h4 className="fw-bold"><AnimatedCounter2 /></h4>
                <h6>Admission Done</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="row">
              <div className="col-md-4 col-4 text-end">
                <Image src="/images/icons/expert-counsellor.svg" width={70} height={70} alt="expert-counsellor-icon" />
              </div>
              <div className="col-md-8 col-8 text-start mt-2 mt-md-0">
                <h4 className="fw-bold"><AnimatedCounter3 /></h4>
                <h6>Expert Counsellors</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisSection

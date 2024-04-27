import React from 'react'
import AnimatedCounter from '../AnimatedCounters/animatedCounter'
import AnimatedCounter2 from '../AnimatedCounters/animatedCounter2'
import AnimatedCounter3 from '../AnimatedCounters/animatedCounter3'

function AnalysisSection() {
    return (
        <div className="Analysis-Section" id="animation4" data-aos="fade-up">
            <div className="container pt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 mb-5">
                        <div className="row">
                            <div className="col-md-4 col-5 text-end">
                                <img src="images/icons/applications-filled.svg"></img>
                            </div>
                            <div className="col-md-8 col-7">
                                <h1 className="fw-bold"><AnimatedCounter /></h1>
                                <h6>Application Filled</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="row">
                            <div className="col-md-4 col-5 text-end">
                                <img src="images/icons/admission-done.svg"></img>
                            </div>
                            <div className="col-md-8 col-7">
                                <h1 className="fw-bold"><AnimatedCounter2 /></h1>
                                <h6>Admission Done</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="row">
                            <div className="col-md-4 col-5 text-end">
                                <img src="images/icons/expert-counsellor.svg"></img>
                            </div>
                            <div className="col-md-8 col-7">
                                <h1 className="fw-bold"><AnimatedCounter3 /></h1>
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
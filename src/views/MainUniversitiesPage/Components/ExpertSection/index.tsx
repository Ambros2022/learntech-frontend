import React from 'react';
import TALKExpertForm from 'src/@core/components/popup/TalkExpertEnqiiry';

function ExpertSection() {
  const handlePhoneChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <section className='collegeExpertSection bg-blue py-5'>
      <div className="row">
        <div className="col-md-5 d-flex innerCollege bg-blue g-0">
          <div className='container d-flex justify-content-center'>
            <div className='px-2 px-md-0 ps-lg-3 text-white text-spacing align-content-center'>
              <h2 className='fw-bold mb-3'>Did you Choose a University?
              </h2>
              <p>Did you find your desired university?</p>
              <p>Need more assistance?</p>
              <p>Get customized counseling from our experts now!</p>
            </div>
          </div>
        </div>
        <div className="col-md-7 bg-blue py-3 g-0">
          <h2 className='fw-bold text-center  text-white pb-2'>Talk to our Expert</h2>
          <TALKExpertForm type={'University Name'}/>
        </div>
      </div>
    </section>
  );
}

export default ExpertSection;

import React from 'react'
import 'intl-tel-input/build/css/intlTelInput.css';
import PhoneInput from 'src/@core/components/custom-phoneInputWithFlags';

function ExpertSection() {

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <>
      <section className="ExpertCon bg-white pt-5">
        <div className="container pb-5">
          <h3 className="fw-bold text-center">Get In Touch With Our Expert Counsellor</h3>
          <div className="pt-3 form container">
            <div className="row">
              <div className="col-md-6" id="animation16">
                <div className="mb-3 ms-md-5">
                  <label htmlFor="expertNameClgCourse" className="form-label">Name</label>
                  <input type="text" className="form-control" id="expertNameClgCourse" aria-describedby="expertNameClgCourse" />
                </div>
              </div>
              <div className="col-md-6" id="animation17">
                <div className="mb-3 me-md-5">
                  <label htmlFor="expertPhoneClgCourse" className="form-label">Phone Number</label>
                  <PhoneInput onChange={handlePhoneChange} ariaDescribedby="expertPhoneClgCourse"
                    id="expertPhoneClgCourse" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6" id="animation18">
                <div className="mb-3 ms-md-5">
                  <label htmlFor="expertEmailClgCourse" className="form-label">Email</label>
                  <input type="email" className="form-control" id="expertEmailClgCourse" aria-describedby="expertEmailClgCourse" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 me-md-5" id="animation19">
                  <label htmlFor="experptCourseClgOpt" className="form-label">Select Course</label>
                  <select className="form-select" aria-label="experptCourseClgOpt" defaultValue="">
                    <option value="" disabled></option>
                    <option value="bca">BCA</option>
                    <option value="btech">Btech</option>
                    <option value="bsc">BSC</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-center reqBtn">
              <button className="btn">Request for a Call Back</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ExpertSection

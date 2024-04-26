import React from 'react';
import PhoneInput from 'src/@core/components/custom-phoneInputWithFlags';

function ExpertSection() {
  const handlePhoneChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <section className='collegeExpertSection'>
      <div className="row">
        <div className="col-md-6 d-flex bg-blue justify-content-center">
          <div className='text-white text-spacing align-content-center'>
            <h2 className='fw-bold mb-3'>Did you choose a college?</h2>
            <p>Did you find your desired college?</p>
            <p>Need more assistance?</p>
            <p>Get customized counseling from our experts now!</p>
          </div>
        </div>
        <div className="col-md-6 bg-white text-black py-3">
          <h5 className='fw-bold text-center pb-2'>Talk to our Expert</h5>
          <form className='w-50 m-auto'>
            <div className="mb-2">
              <label htmlFor="expertName" className="form-label">Name</label>
              <input type="text" className="form-control" id="expertName" aria-describedby="expertName" />
            </div>
            <div className="mb-2">
              <label htmlFor="expertEmail" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="expertEmail" aria-describedby="expertEmail" />
            </div>
            <div className="mb-2">
              <label htmlFor="expertPhoneNumber" className="form-label">Phone Number</label>
              <PhoneInput onChange={handlePhoneChange} />
            </div>
            <div className="mb-2">
              <label htmlFor="expertCourse" className="form-label">Interested Course</label>
              <select className="form-select" aria-label="expertCourse" defaultValue="">
                <option value="" disabled></option>
                <option value="bca">BCA</option>
                <option value="btech">Btech</option>
                <option value="bsc">BSC</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="expertCollege" className="form-label">College Name</label>
              <input type="text" className="form-control" id="expertCollege" aria-describedby="expertCollege" />
            </div>
            <div className='mb-2 text-center'>
              <button type="submit" className="btn ExpertSbtBtn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ExpertSection;

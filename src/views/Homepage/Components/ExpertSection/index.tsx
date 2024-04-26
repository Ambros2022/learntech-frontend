import React from 'react'

function ExpertSection() {
  return (
    <section className="ExpertCon" id="animation15" data-aos="fade-up">
      <div className="container py-5">
        <h3 className="fw-bold text-center">Get In Touch With Our Expert Counsellor</h3>
        <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div className="form container">
          <div className="row">
            <div className="col-md-6" id="animation16">
              <div className="mb-3 ms-md-5">
                <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter Name"></input>
              </div>
            </div>
            <div className="col-md-6" id="animation17">
              <div className="mb-3 me-md-5">
                <input type="number" className="form-control" id="exampleInputMobile" aria-describedby="mobileHelp" placeholder="Enter Mobile"></input>
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col-md-6" id="animation18">
              <div className="mb-3 ms-md-5">
                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email"></input>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3 me-md-5" id="animation19">
                <input type="text" className="form-control" id="exampleInputStream" aria-describedby="streamHelp" placeholder="Enter Stream"></input>
              </div>
            </div>
          </div>
          <div className="text-center reqBtn">
            <button className="btn">Request for a Call Back</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpertSection

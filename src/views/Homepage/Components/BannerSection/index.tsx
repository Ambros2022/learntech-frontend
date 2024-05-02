import Image from 'next/image'
import React from 'react'

function BannerSection() {
  return (
    <section className="bannerCon bg-formClr" id="animation1">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active position-relative">
            <Image style={{ width: '100%', height: '100%', objectFit: 'cover' }} fill src="/images/icons/Banner Image.jpg" className="d-block w-100" alt="Banner-image" />
          </div>
          <div className="carousel-item">
            <Image style={{ width: '100%', height: '100%', objectFit: 'cover' }} fill src="/images/icons/Banner Image.jpg" className="d-block w-100" alt="Banner-image" />
          </div>
          <div className="carousel-item">
            <Image style={{ width: '100%', height: '100%', objectFit: 'cover' }} fill src="/images/icons/Banner Image.jpg" className="d-block w-100" alt="Banner-image" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="bannerFormSec">
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-7 mb-5" id="animation2">
                <div className="searchSec">
                  <p>Find Colleges, Courses & Exams that are best for you</p>
                  <div className="row">
                    <div className="col-7 col-md-8 col-lg-9">
                      <input type="search" placeholder="Search" className="form-control" id="exampleInputSearch" aria-describedby="searchHelp" />
                    </div>
                    <div className="col-5 text-center col-md-4 col-lg-3 p-0">
                      <button className="btn  searchBtn">Search</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 mb-5" id="animation3">
                <div className="searchForm">
                  <h5 className="pb-3 fw-bold text-center text-blue">Let’s build a better future for you</h5>
                  <form>
                    <div className="mb-3">
                      <input type="text" placeholder="Enter Name" className="form-control" id="exampleInputName" aria-describedby="NameHelp" />
                    </div>
                    <div className="mb-3">
                      <input type="email" placeholder="Enter Email" className="form-control" id="exampleInputEmail" aria-describedby="EmailHelp" />
                    </div>
                    <div className="mb-3">
                      <input type="text" placeholder="Enter Phone Number" className="form-control" id="exampleInputPhoneNumber" aria-describedby="PhoneNumberHelp" />
                    </div>
                    <div className="mb-3">
                      <input type="text" placeholder="Enter Course" className="form-control" id="exampleInputCourse" aria-describedby="courseHelp" />
                    </div>
                    <div className="mb-3">
                      <input type="text" placeholder="Enter Location" className="form-control" id="exampleInputLocation" aria-describedby="locationHelp" />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BannerSection

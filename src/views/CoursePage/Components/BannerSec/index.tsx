import React from 'react'
import Link from 'next/link'

function BannerSec() {

  return (
    <>
      <hr className='mt-0' />
      <section className="container CourseNavigationLink">
        <p><Link href={"/home"}>Home</Link>{'>'} <span className='text-blue'><Link className="text-blue" href={"/courses"}>Courses</Link></span></p>
      </section>
      <section className='bg-blue courseSec'>
        <div className="container">
          <h4 className='text-white fw-bold pt-5'>Choose By Interest</h4>
          <div>
            <div className="row">
              <div className="col-md-7 mb-3">
                <input type="search" className='form-control' placeholder='Search for course, degree or specialization' />
              </div>
              <div className="mb-3 col-md-2 col-6 col-lg-1 col-xl-1 d-flex justify-content-end justify-content-md-center">
                <button className='btn bg-white text-blue srchBtn'>Search</button>
              </div>
              <div className="col-md-3 col-6">
                <button className='btn bg-blue text-white checkBtn'>Check Eligibility</button>
              </div>
            </div>
          </div>
          <h4 className='text-white fw-bold pt-3'>Trending Courses</h4>
          <div className="d-flex gap-2 flex-wrap pb-5">
            <a href="#" className='btn trendCrsBtn'>MBBS</a>
            <a href="#" className='btn trendCrsBtn'>BDS</a>
            <a href="#" className='btn trendCrsBtn'>MBA</a>
            <a href="#" className='btn trendCrsBtn'>BBA</a>
            <a href="#" className='btn trendCrsBtn'>BCA</a>
            <a href="#" className='btn trendCrsBtn'>BSC</a>
            <a href="#" className='btn trendCrsBtn'>BHMS</a>
            <a href="#" className='btn trendCrsBtn'>BNYS</a>
          </div>
        </div>
      </section>
    </>
  )
}

export default BannerSec

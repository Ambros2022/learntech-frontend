import Link from 'next/link'
import React from 'react'

function BannerSec() {
  return (
    <>
      <hr className='m-0' />
      <p className='text-black container py-3 mb-0'><Link href={'/home'} className='text-black'>Home</Link> {'>'} <Link className="text-blue" href={'/study-in-usa'}>Study In USA</Link></p>
      <section className='studyInUsaCon'>
        <div className="container h-100 d-flex justify-content-center">
          <div className='text-white align-content-center text-center'>
            <h1 className='fw-bold'>Study in USA.</h1>
            <div className="searchSec1 text-start mb-4">
              <p className='mb-0'>Explore Top Universities and Colleges in USA.</p>
              <p>Get Updates on Tuition, Courses Offered, Duration and more.</p>
              <div className="row">
                <div className="col-7 col-md-8 col-lg-9">
                  <input type="search" placeholder="Find your dream college" className="form-control" id="exampleInputSearchClg" aria-describedby="exampleInputSearchClg" />
                </div>
                <div className="col-5 text-center col-md-4 col-lg-3 p-0">
                  <button className="btn searchBtn">Search</button>
                </div>
              </div>
            </div>
            <button className='btn helpMeBtn'>Help me with options</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default BannerSec

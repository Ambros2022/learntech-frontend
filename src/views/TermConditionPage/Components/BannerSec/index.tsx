import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
  return (
    <>
      <section className='bg-skyBlue TermCon w-100 py-5'>
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="align-content-center text-center">
              <h1 className='text-blue px-md-0 px-5 fw-bold'>Terms and Conditions</h1>
              <h6>Stay up-to-date with Top Colleges, Universities, Exam updates.</h6>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-2">
        <div className="container">
          <p className=''><Link className='text-black' href="/">Home</Link> {'>'} <span className='text-blue'><Link href="/terms-and-conditions" className="text-blue">Terms and Conditions</Link></span></p>
        </div>
      </section>
    </>
  )
}

export default BannerSec;
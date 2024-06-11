import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
  return (
    <>
      <section className='TermCon w-100 position-relative'>
        <Image src='/images/icons/Banner BG.png' height={300} width={1400} alt='banner-img' />
        <div className="container position-absolute h-100" style={{ top: '1px' }}>
          <div className="d-flex justify-content-center h-100">
            <div className="align-content-center text-center">
              <h1 className='text-white px-md-0 px-5 fw-bold'>Privacy Policy</h1>
              <h6 className='text-white'>Stay up-to-date with Top Colleges, Universities, Exam updates.</h6>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-2">
        <div className="container">
          <p className=''><Link className='text-black' href="/">Home</Link> {'>'} <span className='text-blue'><Link href="/privacy-policy" className="text-blue">Privacy Policy</Link></span></p>
        </div>
      </section>
    </>
  )
}

export default BannerSec;
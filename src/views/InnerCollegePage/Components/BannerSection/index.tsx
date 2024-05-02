import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function BannerSection() {

  return (
    <>
      <hr />
      <section className="container InnerCollegeNavigationLink">
        <p className='mb-4'><Link href="/home">Home</Link> {'>'} <Link href={"/college"}>Colleges</Link> {'>'} <Link href="#">Yenepoya Medical College</Link> {'>'} <span className='text-blue'><Link href="#" className="text-blue">MBBS</Link></span></p>
      </section>
      <section className='bg-gray collegeDetailBanner d-flex justify-content-center align-items-end'>
        <div className="collegeDetailCard mb-md-5">
          <div className="row">
            <div className="col-12 mb-3 col-md-2 text-md-start text-center">
              <Image src="/images/icons/filter-card.jpg" width={200} height={200} alt="College Image" />
            </div>
            <div className="col-md-8 col-12 text-white text-md-start text-center location-img">
              <h6 className='fw-bold'>Yenepoya Medical College</h6>
              <p className='mb-0'><Image width={200} height={200} src="/images/icons/Location Icon.svg" className='icon-white' alt={'location-icon'} />Mangalore, Karnataka</p>
              <p className='mb-3'>Approved by : National Medical Commission (NMC)</p>
            </div>
            <div className="col-12 col-md-2 text-md-start text-center mb-3">
              <a href="#" className='btn PrivateBtn'>Private</a>
            </div>
            <div>
              <div className="col-12 d-flex justify-content-md-end justify-content-center gap-2">
                <a href="#" className='btn downloadBtn'>Download Brochure</a>
                <a href="#" className='btn freeBtn'>Get Free Structure</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BannerSection

import React from 'react'
import Image from 'next/image'

function BannerSection() {

  return (
    <>
      <section className='bg-blue collegeDetailBanner'>
        <div className="container h-100 d-flex justify-content-center">
          <div className="align-content-center collegeDetailCard w-100">
            <div className="row">
              <div className="col-12 mb-3 col-md-2 text-md-start text-center">
                <Image src="/images/icons/filter-card.jpg" width={200} height={200} alt="College Image" />
              </div>
              <div className="col-md-6 col-12 text-white text-md-start text-center location-img">
                <h6 className='fw-bold'>Yenepoya Medical College</h6>
                <p className='mb-0'><Image width={200} height={200} src="/images/icons/Location Icon.svg" className='icon-white me-1' alt={'location-icon'} />Mangalore, Karnataka</p>
                <p className='mb-3'>Approved by : National Medical Commission (NMC)</p>
              </div>
              <div className="col-12 col-md-4 text-md-end text-center mb-3">
                <a href="#" className='btn btn-warning text-white me-2 ratingBtn'> &#9733; 4.5</a>
                <a href="#" className='btn PrivateBtn'>Private</a>
              </div>
              <div>
                <div className="col-12 d-flex justify-content-md-end  mt-md-3 mb-md-0 mb-3 justify-content-center gap-2">
                  <div className="d-flex justify-content-center">
                    <a href="#" className='align-content-center btn downloadBtn'>Download Brochure</a>
                  </div>
                  <div className='d-flex justify-content-center w-auto'>
                    <a href="#" className='align-content-center btn freeBtn'>Get Free Structure</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BannerSection

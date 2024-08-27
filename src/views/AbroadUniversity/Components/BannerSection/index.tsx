import React from 'react'
import Image from 'next/image'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
function BannerSection({ data }) {

  return (
    <>
      <section className='bg-blue collegeDetailBanner py-1'>
        <div className="container">
          <div className="card mb-3 w-100 collegeDetailCard">
            <div className="row g-0">
              <div className="col-lg-2 col-xl-2 col-md-3 pt-3">
                <div className='innerClgImg m-auto d-flex justify-content-center bg-white p-3 rounded'>
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.icon}`} width={200} height={200} alt={data.name} className='align-self-center img-fluid' />
                </div>
              </div>
              <div className="col-lg-7 col-xl-7 col-md-9">
                <div className="py-3 ps-md-2 text-white">
                  <h1 className="card-title fw-bold mb-3">{data.name}</h1>
                  <h6 className='mb-3 location-img'><i className='bi bi-geo-alt-fill me-2 fs-5 text-danger'></i>{data.address}</h6>
                  <h6 className='mb-3 location-img'>
                    <i className="bi bi-bank me-1"></i>  Estd {data?.established}
                  </h6>


                </div>
              </div>

              {data?.avg_rating && <div className="col-lg-3 col-xl-3 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-3">
                <div className="d-flex gap-2 justify-content-end">

                  <i className={`bi bi-star-fill ${data.avg_rating >= 1 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 2 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 3 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 4 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 5 ? "text-warning" : "text-white"} `}></i>

                  <h6 className='mb-0 text-white align-self-center'>{data.avg_rating}/5 Review</h6>
                </div>
              </div>}
            </div>
            <div className="d-flex justify-content-end flex-md-row flex-column gap-3 ps-md-0 ps-3">
              <GlobalEnquiryForm className='btn-success btn ' buttonText="Talk to Experts" />
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default BannerSection

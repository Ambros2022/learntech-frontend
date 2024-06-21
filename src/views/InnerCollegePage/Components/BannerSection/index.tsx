import React from 'react'
import Image from 'next/image'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
function BannerSection({ data }) {

  return (
    <>
      <section className='bg-blue collegeDetailBanner py-1'>
        <div className="container">
          <div className="card mb-3 collegeDetailCard">
            <div className="row g-0">
              <div className="col-lg-2 col-xl-1 col-md-2">
                <div className='innerClgImg ms-md-auto mx-auto'>
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.icon}`} width={100} height={100} alt={data.name} />
                </div>
              </div>
              <div className="col-lg-7 ps-3 col-xl-8 col-md-10">
                <div className="card-body text-white">
                  <h1 className="card-title fw-bold mb-3">{data.name}</h1>
                  <h6 className='mb-3 location-img'><Image width={20} height={20} src="/images/icons/Location Icon.svg" className='icon-yellow me-1' alt={'location-icon'} />{data.address}</h6>
                  <h6 className='mb-3'><i className="text-warning bi bi-trophy-fill me-1"></i><strong>Approved by :&nbsp;</strong>{
                    data.collegerecognitions && data.collegerecognitions.map((element, index) => {
                      return (
                        <>
                          {index == 0 ? ' ' + element.clgrecognitions.recognition_approval_name : ', ' + element.clgrecognitions.recognition_approval_name}
                        </>
                      )
                    })
                  }</h6>
                  {data.avg_rating && data.avg_rating !== "null" && "" && <button className='btn btn-warning text-white me-2 ratingBtn'> &#9733; {data.avg_rating}</button>}
                  <button className='btn PrivateBtn'>{data.college_type}</button><br />
                </div>
              </div>
              <div className="col-lg-3 col-xl-3 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-3">
                <div className="d-flex gap-2 justify-content-end">
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-white"></i>
                  <h6 className='mb-0 text-white align-self-center'>4/5 Review</h6>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end flex-md-row flex-column gap-3 ps-md-0 ps-3">
              <GlobalEnquiryForm pagename="Brochure" className='align-content-center btn downloadBtn' title="Download Brochure" />
              <GlobalEnquiryForm className='align-content-center btn freeBtn' buttonText="Get Fee Structure" />
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default BannerSection

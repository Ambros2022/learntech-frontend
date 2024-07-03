import React from 'react'
import Image from 'next/image'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
function BannerSection({ data }) {

  return (
    <>
      <section className='bg-blue collegeDetailBanner py-1'>
        <div className="container">
          <div className="card mb-3 collegeDetailCard text-md-start text-center">
            <div className="row">
              <div className="col-lg-2 col-xl-1 col-md-2 gx-0">
                <div className='innerClgImg ms-md-auto mx-auto mt-md-3 mt-4'>
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`} width={100} height={100} alt={data.name} />
                </div>
              </div>
              <div className="col-lg-7 ps-md-3 ps-0 col-xl-8 col-md-10">
                <div className="card-body text-white">
                  <h1 className="card-title fw-bold mb-3">{data.name}</h1>
                  <h6 className='mb-3 location-img'><Image width={20} height={20} src="/images/icons/Location Icon.svg" className='icon-yellow me-1' alt={'location-icon'} />{data.address}</h6>
                  <h6 className='mb-3'>
                    <strong><i className="text-warning bi bi-trophy-fill me-1"></i> Approvals and Recognition :&nbsp;</strong>
                    { data.boardrecognitions.length > 0 && data.boardrecognitions[0].brdrecognitions.recognition_approval_name}
                  </h6>
                  <div className='d-flex justify-content-md-start justify-content-center gap-md-5 gap-3 flex-wrap'>
                    <h6 className='mb-3'><strong>Est Year :&nbsp;</strong>{
                      data.established
                    }</h6>
                    <h6 className='mb-3'><strong>Gender Accepted :&nbsp;</strong>{
                      data.gender
                    }</h6>
                  </div>
                  {/* {data.avg_rating && data.avg_rating !== "null" && "" && <button className='btn btn-warning text-white me-2 ratingBtn'> &#9733; {data.avg_rating}</button>}
                  <button className='btn PrivateBtn'>{data.college_type}</button><br /> */}
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
            <div className="d-flex justify-content-md-end justify-content-center flex-md-row flex-column gap-3 ps-md-3 ps-0">
              <button className='btn btn-danger resultDateBtn'>{data.result_date}</button>
              <GlobalEnquiryForm className='align-content-center btn freeBtn' buttonText="Enquire Now" />
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default BannerSection

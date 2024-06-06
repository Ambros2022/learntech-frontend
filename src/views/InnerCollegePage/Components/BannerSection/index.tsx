import React from 'react'
import Image from 'next/image'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
function BannerSection({ data }) {

  return (
    <>
      <section className='bg-blue collegeDetailBanner'>
        <div className="container">
          <div className="card mb-3 collegeDetailCard">
            <div className="row g-0">
              <div className="col-lg-3 col-md-4">
                <div className='innerClgImg mx-auto'>
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.icon}`} width={200} height={200} alt={data.name} />
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="card-body text-white">
                  <h1 className="card-title fw-bold ">{data.name}</h1>
                  <h6 className='mb-2  location-img'><Image width={20} height={20} src="/images/icons/Location Icon.svg" className='icon-white me-1' alt={'location-icon'} />{data.address}</h6>
                  <h6 className='mb-3'><strong>Approved by :&nbsp;</strong>{
                    data.collegerecognitions && data.collegerecognitions.map((element, index) => {
                      return (
                        <>
                          {index == 0 ? ' ' + element.clgrecognitions.recognition_approval_name : ', ' + element.clgrecognitions.recognition_approval_name}
                        </>
                      )
                    })
                  }</h6>
                  {data.avg_rating && data.avg_rating !== "null" && "" && <button className='btn btn-warning text-white me-2 ratingBtn'> &#9733; {data.avg_rating}</button>}
                  <button className='btn PrivateBtn mb-3'>{data.college_type}</button><br />
                  <div className="d-flex justify-content-end flex-md-row flex-column gap-3">
                    <GlobalEnquiryForm pagename="Brochure" className='align-content-center btn downloadBtn' title="Download Brochure" />
                    <GlobalEnquiryForm className='align-content-center btn freeBtn' buttonText="Get Free Structure" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default BannerSection

import React from 'react'
import Image from 'next/image'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
function BannerSection({ data }) {

  return (
    <>
      <section className='bg-blue collegeDetailBanner'>
        <div className="container h-100 d-flex justify-content-center">
          <div className="align-content-center collegeDetailCard w-100">
            <div className="row">
              <div className="col-12 mb-3 col-md-2 text-md-start text-center">
                <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.icon}`} width={200} height={200} alt={data.name} />
              </div>
              <div className="col-md-6 col-12 text-white text-md-start text-center location-img">
                <h6 className='fw-bold'>{data.name}</h6>
                <p className='mb-2'><Image width={200} height={200} src="/images/icons/Location Icon.svg" className='icon-white me-1' alt={'location-icon'} />{data.address}</p>
                <p className='mb-3'><strong>Approved by :&nbsp;</strong>{
                  data.collegerecognitions && data.collegerecognitions.map((element, index) => {
                    return (
                      <>
                        {index == 0 ? ' ' + element.clgrecognitions.recognition_approval_name : ', ' + element.clgrecognitions.recognition_approval_name}
                      </>
                    )
                  })
                }</p>
              </div>
              <div className="col-12 col-md-4 text-md-end text-center mb-3">
                {data.avg_rating && data.avg_rating !== "null" && "" && <button className='btn btn-warning text-white me-2 ratingBtn'> &#9733; {data.avg_rating}</button>}
                <button className='btn PrivateBtn'>{data.college_type}</button>
              </div>
              <div>
                <div className="col-12 d-flex justify-content-md-end  mt-md-3 mb-md-0 mb-3 justify-content-center gap-2">
                  <div className="d-flex justify-content-center">
                    {/* <a href="#" className='align-content-center btn downloadBtn'>Download Brochure</a> */}
                    <GlobalEnquiryForm pagename="Brochure" className='align-content-center btn downloadBtn' title="Download Brochure" />
                  </div>
                  <div className='d-flex justify-content-center w-auto'>
                  <GlobalEnquiryForm className='align-content-center btn freeBtn' buttonText="Get Free Structure" />
                    {/* <a href="#" className='align-content-center btn freeBtn'>Get Free Structure</a> */}
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

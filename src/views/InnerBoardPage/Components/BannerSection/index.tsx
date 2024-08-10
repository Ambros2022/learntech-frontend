import React from 'react'
import Image from 'next/image'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
function BannerSection({ data }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <section className='bg-blue collegeDetailBanner py-1'>
        <div className="container ">
          <div className="card w-100 mb-3 collegeDetailCard text-md-start text-center">
            <div className="row">
              <div className="col-lg-2 col-xl-1 col-md-2 gx-0">
                <div className='innerClgImg mx-auto'>
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`} className='img-fluid mt-md-3 bg-white rounded' width={100} height={100} alt={data.name} />
                </div>
              </div>
              <div className="col-lg-7 ps-md-3 ps-0 col-xl-8 col-md-10">
                <div className="card-body text-white">
                  <h1 className="card-title fw-bold mb-3">{data.name}: Check Exam Details & Results</h1>
                  <h6 className='mb-3 location-img'><i className='bi bi-geo-alt-fill me-1 fs-5 text-danger'></i>{data.address}</h6>
                  <h6 className='mb-3'>
                    <><i className="text-warning bi bi-trophy-fill me-1"></i> Approvals and Recognition :&nbsp;</>
                    {data.boardrecognitions.length > 0 && data.boardrecognitions[0].brdrecognitions.recognition_approval_name}
                  </h6>
                  <div className='d-flex justify-content-md-start justify-content-center mt-4 gap-md-5 gap-3 flex-wrap'>
                    <h6 className='mb-3 fw-bold'>Est Year :&nbsp;<span className='fw-normal'>{
                      data.established
                    }</span></h6>
                    <h6 className='mb-3 fw-bold'><>Gender Accepted :&nbsp;</><span className='fw-normal'>{
                      data.gender
                    }</span></h6>
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
              <button className='btn btn-danger resultDateBtn'><><i className="me-2 bi bi-alarm-fill"></i>Result Date : {formatDate(data.result_date)}</></button>
              <GlobalEnquiryForm className='align-content-center btn freeBtn' buttonText="Enquire Now" />
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default BannerSection

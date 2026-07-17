import Image from 'next/image'
import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export default function BannerSection({ data }: { data: any }) {
  return (
    <section className='bg-blue collegeDetailBanner py-1'>
      <div className="container-fluid">
        <div className="card w-100 mb-3 collegeDetailCard">
          <div className="row g-0">
            <div className="col-lg-2 col-xl-1 text-center col-md-2 d-flex justify-content-between">
              <div className='innerClgImg mx-0 mx-md-auto mt-md-3'>
                <Image
                  src={`${IMG_BASE}/${data.logo}`}
                  alt={data.name}
                  width={100}
                  height={100}
                  priority
                  className="img-fluid p-2 bg-white rounded"
                />
              </div>
              {data?.avg_rating && data?.avg_rating !== 0 ? (
                <div className="d-flex justify-content-center align-items-center d-md-none col-lg-3 col-xl-3 col-md-10 pt-auto pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
                  <div className="d-flex gap-2 justify-content-md-end justify-content-start">
                    {[1, 2, 3, 4, 5].map(n => (
                      <i key={n} className={`bi bi-star-fill ${data.avg_rating >= n ? 'text-warning' : 'text-white'}`} />
                    ))}
                    <h6 className='mb-0 text-white align-self-center'>{data.avg_rating}/5 Review</h6>
                  </div>
                </div>
              ) : ''}
            </div>

            <div className="col-lg-7 ps-xl-5 col-xl-9 col-md-10">
              <div className="card-body text-white">
                <h1 className="card-title fw-bold mb-3 mt-3 mt-md-1">{data.name}</h1>
                <h6 className='mb-3 d-flex'>
                  <i className='bi bi-geo-alt-fill text-danger me-1' />
                  <span>{data.address}</span>
                </h6>
                <h6 className='mb-3 d-flex'>
                  <i className="text-warning bi bi-trophy-fill me-1" />
                  <strong className='flex-shrink-0'>Approved by :&nbsp;</strong>
                  <span>
                    {data.collegerecognitions?.map((el: any, i: number) => (
                      <span key={i}>{i === 0 ? ' ' : ', '}{el.clgrecognitions.recognition_approval_name}</span>
                    ))}
                  </span>
                </h6>
                <button className='btn PrivateBtn'>{data.college_type}</button>
              </div>
            </div>

            {data?.avg_rating && data?.avg_rating !== 0 ? (
              <div className="d-none d-md-block col-lg-3 col-xl-2 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
                <div className="d-flex gap-2 justify-content-md-end justify-content-start">
                  {[1, 2, 3, 4, 5].map(n => (
                    <i key={n} className={`bi bi-star-fill ${data.avg_rating >= n ? 'text-warning' : 'text-white'}`} />
                  ))}
                  <h6 className='mb-0 text-white align-self-center'>{data.avg_rating}/5 Review</h6>
                </div>
              </div>
            ) : ''}
          </div>

          <div className="d-flex justify-content-end flex-md-row flex-column gap-1 gap-md-3 align-items-center">
            <GlobalEnquiryForm pagename="Brochure" className='align-content-center btn downloadBtn' title="Download Brochure" collegeName={data.name} />
            <GlobalEnquiryForm className='align-content-center btn freeBtn' buttonText="Get Fee Structure" collegeName={data.name} />
          </div>
        </div>
      </div>
    </section>
  )
}

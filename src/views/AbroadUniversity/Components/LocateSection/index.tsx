import Image from 'next/image'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export default function LocationSection({ data }: { data: any }) {
  return (
    <section className='locationSec bg-white pb-5'>
      <div className="container">
        <h2 className='pt-0 text-center mb-4 text-blue fw-bold'>Location</h2>
        <div className="row px-3">
          <div className="col-md-6 mb-md-0 mb-3 d-flex justify-content-start locatedSec py-5 rounded px-md-5">
            <div className="w-100 card mb-3 bg-lightCard bg-white">
              <div className="row bg-white rounded">
                <div className="col-lg-4 mx-auto text-center locationClgImg" role="img" aria-label={data?.name}>
                  <Image
                    src={`${IMG_BASE}/${data.logo}`}
                    alt={data?.name || 'University Logo'}
                    width={100}
                    height={100}
                    loading="lazy"
                    className="clgImg"
                    style={{ objectFit: 'contain', display: 'block', margin: '0 auto' }}
                  />
                </div>
                <div className="col-lg-12 bg-blue d-flex">
                  <div className="card-body align-content-start text-white p-0 mt-2 text-lg-start text-center text-md-center">
                    <h3 className="card-title fw-bold mb-3">{data.name}</h3>
                    <h6 className="card-text mb-0 mt-2 innerTextAddress">
                      <i className='bi bi-geo-alt-fill me-2 text-danger fs-5' />
                      <span className="mt-2">{data.address}</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className='p-2 bg-blue rounded h-100 w-100'>
              {data.map && (
                <iframe src={data.map} width="100%" height="500px" loading="lazy" allowFullScreen className='rounded' />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

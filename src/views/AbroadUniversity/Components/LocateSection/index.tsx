import Image from 'next/image';

import dynamic from 'next/dynamic'




function LocationSection({ data }) {
  return (
    <>
      <section className='locationSec bg-white pb-5'>
        <div className="container">
          <h2 className='pt-0 text-center mb-4 text-blue fw-bold'>Location</h2>
          <div className="row px-3">
            <div className="col-md-6 mb-md-0 mb-3 d-flex justify-content-start locatedSec py-5 rounded px-md-5">
              <div className="w-100 card mb-3 bg-lightCard p-3">
                <div className="row g-0">
                  <div className="col-lg-4 mx-auto text-center locationClgImg bg-white p-3 rounded">
                    <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`} className='rounded clgImg mb-3' width={100} height={100} alt="College Image" />
                  </div>
                  <div className="col-lg-12 d-flex">
                    <div className="card-body align-content-start text-white p-0 mt-2 text-lg-start text-center text-md-center ">
                      <h3 className="card-title fw-bold mb-3">{data.name}</h3>
                      <h6 className="card-text mb-0 mt-2 innerTextAddress"><Image width={25} height={20} src="/images/icons/Location Icon.svg" className='icon-white' alt={'location-icon'} /><span className="mt-2">{data.address}</span></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className='p-2 bg-blue rounded h-100 w-100'>
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  src={data.map}
                  className='rounded'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LocationSection

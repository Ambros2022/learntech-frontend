import Image from 'next/image';

import dynamic from 'next/dynamic'




function LocationSection({ data }) {
  return (
    <>
      <section className='locationSec bg-white pb-5'>
        <div className="container">
          <h2 className='pt-0 text-center mb-4 text-blue fw-bold'>Locate The College</h2>
          <div className="row px-3">
            <div className="col-md-6 mb-md-0 mb-3 d-flex justify-content-start locatedSec px-md-5 g-0">
              <div className="w-100 card mb-3 bg-lightCard p-3">
                <div className="row g-0">
                  <div className="col-lg-4 mx-auto text-center locationClgImg">
                    <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`} className='rounded clgImg' width={100} height={100} alt="College Image" />
                  </div>
                  <div className="col-lg-12 d-flex">
                    <div className="card-body align-content-start text-white p-0 mt-2 text-lg-start text-center text-md-center ">
                      <h6 className="card-title fw-bold mb-0">{data.name}</h6>
                      <p className="card-text mb-0 mt-2 innerTextAddress"><small><Image width={25} height={20} src="/images/icons/Location Icon.svg" className='icon-white' alt={'location-icon'} /><span className="mt-2">{data.address}</span></small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 g-0">

              <iframe
                width="100%"
                height="300px"
                loading="lazy"
                allowFullScreen
                src={data.map}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LocationSection

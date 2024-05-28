import Image from 'next/image';

import dynamic from 'next/dynamic'


const GoogleMap = dynamic(() => import('./GoogleMap'), {
  ssr: false,
})

function LocationSection() {
  return (
    <>
      <section className='locationSec bg-white pb-5'>
        <div className="container">
          <h1 className='pt-0 text-center mb-4 text-blue fw-bold'>Locate The School</h1>
          <div className="row px-3">
            <div className="col-md-6 d-flex justify-content-start locatedSec px-md-5 g-0">
              <div className="w-100 align-self-center card mb-3 bg-lightCard p-3">
                <div className="row g-0">
                  <div className="col-lg-4 text-center text-md-center locationClgImg text-lg-start">
                    <Image src="/images/icons/filter-card.jpg" className='rounded clgImg' width={100} height={100} alt="College Image" />
                  </div>
                  <div className="col-lg-8 d-flex">
                    <div className="ms-lg-3 card-body align-content-center text-white p-0 mt-2 mt-lg-0 text-center text-md-start ">
                      <h6 className="card-title fw-bold mb-0">Yenepoya Medical College</h6>
                      <p className="card-text mb-0 mt-2"><small><Image width={25} height={20} src="/images/icons/Location Icon.svg" className='icon-white' alt={'location-icon'} /><span className="mt-2">Mangalore, Karnataka</span></small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 g-0">
              <GoogleMap latitude={40.7128} longitude={-74.0060} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LocationSection

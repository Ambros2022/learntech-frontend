import Image from 'next/image';
import GoogleMap from './GoogleMap';

function LocationSection() {
  return (
    <>
      <section className='locationSec bg-white py-5'>
        <div className="container">
          <div className="row">
            <div className="col-md-6 locatedSec px-5 g-0">
              <h3 className='pt-3 mb-4 text-white fw-bold'>Locate The College</h3>
              <div className="card mb-3 bg-lightCard p-3">
                <div className="row g-0">
                  <div className="col-lg-2 text-center text-md-center text-lg-start">
                    <Image src="/images/icons/filter-card.jpg" className='rounded clgImg' width={82} height={100} alt="College Image" />
                  </div>
                  <div className="col-lg-8">
                    <div className="card-body mx-1 text-white p-0 mt-2 mt-lg-0 text-center text-md-center text-lg-start mx-lg-2">
                      <h6 className="card-title fw-bold mb-0">Yenepoya Medical College</h6>
                      <p className="card-text mb-0"><small>Mangalore, Karnataka</small></p>
                      <p className="card-text"><small>Approved by : National Medical Commission (NMC)</small></p>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center text-md-center text-lg-start">
                    <a href="#" className='btn PrivateCardBtn'>Private</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 g-0"><GoogleMap /></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LocationSection

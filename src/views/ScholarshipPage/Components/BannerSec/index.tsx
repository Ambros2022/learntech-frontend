import React from 'react'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import { GlobalEnquiryForm, LazyScholarshipSearchBar as ScholarshipSearch } from 'src/app/components/ClientWrappers'

const BannerSec = () => {
  const buttonText = (
    <>
      Get <i className="bi bi-currency-rupee"></i>1 Lakh Scholarship
    </>
  )

  return (
    <>
      <section className="scholarshipSec">
        <div className="position-relative scholarShipImg">
          <img
            src="/images/icons/BannerBG.webp"
            width={1400}
            height={300}
            alt="banner-img"
            className="position-relative w-100"
          />
          <div className="position-absolute w-100 h-100" style={{ top: '0px' }}>
            <div className="container">
              <div className="py-5">
                <h1 className="fw-bold text-white mb-3">Explore Scholarships to Support Your Studies</h1>
                <div className="row">
                  <div className="col-md-8 col-xl-6 col-lg-6 col-10 mb-3 me-auto">
                    <ScholarshipSearch />
                  </div>
                </div>
                <div className="text-md-end mt-md-3 mt-0">
                  <GlobalEnquiryForm buttonText={buttonText} className="btn btn-warning" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Scholarships' }]} />
    </>
  )
}

export default BannerSec
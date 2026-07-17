import BannerImage from 'src/components/ui/BannerImage'
import { LazyBoardSearchBar, LazyGlobalEnquiryForm } from 'src/app/components/ClientWrappers'

export default function BannerSec() {
  return (
    <>
      <section className="position-relative boardSec">
        <BannerImage alt="Education Boards in India" />
        <div className="position-absolute w-100 h-100" style={{ top: 0 }}>
          <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
              <div className="align-content-center h-100">
                <h1 className="fw-bold text-white mb-4">Education Boards in India</h1>
                <div className="row d-flex g-3">
                  <div className="col-md-7 mb-md-0 mb-3 mx-auto">
                    <LazyBoardSearchBar />
                  </div>
                  <div className="col-md-5 d-flex justify-content-center">
                    <LazyGlobalEnquiryForm
                      buttonText="Get Board Details"
                      className="btn my-auto align-self-center btn-success2"
                    />
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

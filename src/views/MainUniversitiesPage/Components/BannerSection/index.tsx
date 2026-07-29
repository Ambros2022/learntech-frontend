import InnerHeader from 'src/views/SimplePage/InnerHeader'
import { LazyUniversitySearchBar, LazyGlobalEnquiryForm } from 'src/app/components/ClientWrappers'

export default function BannerSection() {
  return (
    <InnerHeader title="Know all About Top Universities, Placements, Admissions and Fee Structures" className="collegeBannerCon" titleClassName="fs-4 fw-bold text-md-center text-start">
      <div className="row g-3">
        <div className="col-md-7">
          <LazyUniversitySearchBar />
        </div>
        <div className="col-md-5 d-flex">
          <LazyGlobalEnquiryForm className="btn align-self-center btn-success2" />
        </div>
      </div>
    </InnerHeader>
  )
}

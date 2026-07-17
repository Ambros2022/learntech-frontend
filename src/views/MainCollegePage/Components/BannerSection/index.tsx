import InnerHeader from 'src/views/SimplePage/InnerHeader'
import { LazyCollegeSearchBar, LazyGlobalEnquiryForm } from 'src/app/components/ClientWrappers'

export default function BannerSection() {
  return (
    <InnerHeader title="Know all About Top Colleges, Placements, Admissions and Fee Structures">
      <div className="row g-3">
        <div className="col-md-7">
          <LazyCollegeSearchBar />
        </div>
        <div className="col-md-5 d-flex">
          <LazyGlobalEnquiryForm className="btn align-self-center btn-success2" />
        </div>
      </div>
    </InnerHeader>
  )
}

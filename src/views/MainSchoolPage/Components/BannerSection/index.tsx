import InnerHeader from 'src/views/SimplePage/InnerHeader'
import { LazySchoolSearchBar, LazyGlobalEnquiryForm } from 'src/app/components/ClientWrappers'

export default function BannerSection() {
  return (
    <InnerHeader
      title="Start Your Child's Journey with the Best Schools in India"
      className="collegeBannerCon"
      titleClassName="fs-4 fw-bold text-start"
    >
      <div className="row g-3">
        <div className="col-md-7">
          <LazySchoolSearchBar />
        </div>
        <div className="col-md-5 d-flex">
          <LazyGlobalEnquiryForm className="btn align-self-center btn-success2" />
        </div>
      </div>
    </InnerHeader>
  )
}

import { LazyGlobalEnquiryForm } from 'src/app/components/ClientWrappers'

export default function BannerSection({ data }: { data: any }) {
  return (
    <section className="bg-blue collegeCourseCon py-5 minehightnriquto">
      <div className="container h-100 flex-column column-gap-0 d-flex justify-content-center">
        <div className="align-items-center">
          <div className="row px-5 px-md-0">
            <div className="col-md-12 col-12">
              <div className="row">
                <div className="col-12">
                  <h1 className='text-white text-center'>
                    {data?.title} Course: Duration, Eligibility, Fee Structure
                    <br /><br />
                    <span>{data?.college?.name}</span>
                  </h1>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12 text-center">
                  <LazyGlobalEnquiryForm className='btn btn-success' collegeName={data?.college?.name} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

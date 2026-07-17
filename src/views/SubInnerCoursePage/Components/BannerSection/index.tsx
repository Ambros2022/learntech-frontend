import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'

export default function BannerSection({ data }: { data: any }) {
  return (
    <section className="bg-blue dentalCourseCon py-5 minehightcoursesneew">
      <div className="container h-100 flex-column column-gap-0 d-flex justify-content-center">
        <div className='align-items-center'>
          <h1 className='fw-bold text-white mb-3'>
            {data?.name} : Course, Duration, Eligibility, Fees, Admissions, Opportunities
          </h1>
          <div className='text-white mb-2 row'>
            <h4 className='col-12 mb-3 f20'>Duration : {data?.duration}</h4>
            <div className="d-flex">
              <GlobalEnquiryForm className='btn btn-success font-18' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

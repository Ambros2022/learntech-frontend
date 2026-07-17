import { LazyAbroadEnquiryForm } from 'src/app/components/ClientWrappers'

export default function StudySec({ data }: { data: any }) {
  return (
    <section className='bg-white studySec'>
      <div className='container pt-3 pb-2'>
        <h2 className='fw-bold text-blue mb-3 text-center text-md-start'>Study In {data?.country?.name}</h2>
        <div className="row pt-3 pb-2">
          <div className="col-md-6 col-lg-7 col-xl-7 text-black order-1 order-md-1">
            <div dangerouslySetInnerHTML={{ __html: data?.info }} />
          </div>
          <div className="col-md-6 col-lg-5 col-xl-5 order-2 order-md-2 mb-md-0 mb-3">
            <LazyAbroadEnquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}

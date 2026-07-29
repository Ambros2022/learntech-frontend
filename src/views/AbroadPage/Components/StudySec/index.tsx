import { LazyAbroadEnquiryForm } from 'src/app/components/ClientWrappers'

export default function StudySec({ data }: { data: any }) {
  return (
    <section className='bg-white studySec py-3'>
      <div className='container'>
        <h2 className='fw-bold text-blue mb-3 text-center text-md-start'>Study In {data?.country?.name}</h2>
        <div className="row align-items-start pt-2">
          <div className="col-12 col-lg-7 col-xl-7 text-black mb-4 mb-lg-0">
            <div className="bs-editor-text" dangerouslySetInnerHTML={{ __html: data?.info }} />
          </div>
          <div className="col-12 col-lg-5 col-xl-5">
            <LazyAbroadEnquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}

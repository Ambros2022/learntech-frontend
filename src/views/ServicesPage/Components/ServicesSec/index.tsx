import Image from 'next/image'
import { LazySideContactUsForm } from 'src/app/components/ClientWrappers'

export default function ServicesSec() {
  return (
    <section className='bg-skyBlue py-5'>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-xl-7 col-lg-7 col-10 mx-auto">
            <div className='d-flex justify-content-start servicesImg'>
              <Image
                src='/images/icons/ServicePage.webp'
                width={600}
                height={600}
                alt='services'
                className='align-self-center img-fluid'
                loading='lazy'
              />
            </div>
          </div>
          <div className="service col-md-6 col-xl-5 col-10 mx-auto h-100 col-lg-5 border rounded px-xl-5 px-lg-4 col-10 mx-md-0 me-auto pb-3">
            <h1 className='pt-3 mb-3 fw-bold text-blue text-center'>
              Interested in Our Services?
            </h1>
            <LazySideContactUsForm />
          </div>
        </div>
      </div>
    </section>
  )
}

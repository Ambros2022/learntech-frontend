import { Breadcrumb } from 'src/app/components/Breadcrumb'

const BannerSec = () => {
  return (
    <>
      <section className='scholarshipSec contactuspage bg-blue minehightinnercourse'>
        <div className='h-100 d-flex justify-content-center'>
          <div className=' w-100 h-100 innercourse_height' style={{ top: '0px' }}>
            <div className="container">
              <div className="py-5 text-start">
                <h1 className='fw-bold text-white mb-4 text-center'>Contact Us</h1>
                <p className='text-white text-center'>For students seeking admissions guidance or institutions looking to boost their branding, our expert team is ready to provide personalized support. Fill out the form below, and we&apos;ll get in touch with you shortly to address your specific needs and offer tailored solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Breadcrumb items={[{ label: 'Contact Us' }]} />
    </>
  )
}

export default BannerSec
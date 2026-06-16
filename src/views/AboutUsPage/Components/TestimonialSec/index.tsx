import Image from 'next/image'
import { LazyEmblaTabCarousel } from 'src/app/components/ClientWrappers'

export interface Testimonial {
  collegeTestimonials?: any
  full_url?: any
  name: string
  location: string
  institution: string
  image: string
  designation: string
  type: string
}

const TestimonialSec = ({ testimonials }: { testimonials: Testimonial[] }) => {
  if (!testimonials.length) return null

  const count = testimonials.length
  const hasOverflow = count > 1

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="text-blue fw-bold text-center mb-3">Testimonials</h2>
        <div className="position-relative">
          <LazyEmblaTabCarousel
            showDots={false}
            showArrows={hasOverflow}
            slidesToShowDesktop={2}
            slidesToShowTablet={2}
            slidesToShowMobile={1}
            autoplay={hasOverflow}
            autoplayDelay={2000}
            loop={hasOverflow}
          >
            {testimonials.map((testimonial, index) => (
              <div className="card p-3 bg-skyBlue border-0 mb-3 mx-md-2 mx-3" key={`${testimonial.name}-${index}`}>
                <div className="row d-flex">
                  <div className="col-md-3 col-lg-2 col-xl-2 align-content-center">
                    <div className="testimonalImg">
                      <Image src="/images/icons/userImage.webp" className="mx-auto" width={50} height={50} alt="" />
                    </div>
                  </div>
                  <div className="col-md-9 col-lg-10 col-xl-10 align-content-center">
                    <h3 className="text-blue text-center text-md-start h5">{testimonial.name}</h3>
                    <p className="text-black">{testimonial.full_url}</p>
                  </div>
                </div>
                <hr />
                <div className="d-flex">
                  <i className="bi bi-quote fs-1 text-blue align-self-start me-2"></i>
                  <p className="text-black mt-3 testimonialPara">{testimonial.designation}</p>
                  <i className="bi bi-quote align-self-end fs-1 text-blue ms-2"></i>
                </div>
              </div>
            ))}
          </LazyEmblaTabCarousel>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSec

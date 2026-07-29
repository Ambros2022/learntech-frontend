'use client'

import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'

interface Testimonial {
  id: number
  collegeTestimonials: {
    name: string
    designation: string
    video_url: string
  }
}

export default function TestimonialSec({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) return null

  return (
    <section className="bg-white pb-3">
      <div className="container">
        <h2 className="text-blue fw-bold text-center mb-3">Testimonials</h2>
        <div className="testimonialCarousel position-relative">
          <EmblaCarousel
            slidesToShowDesktop={2}
            slidesToShowTablet={2}
            slidesToShowMobile={1}
            autoplay
            autoplayDelay={2000}
            showDots={false}
            showArrows={testimonials.length > 2}
            loop
          >
            {testimonials.map((card) => (
              <div key={card.id} className="d-flex m-2">
                <div className="card p-3 d-flex flex-column flex-fill">
                  <div className="row flex-fill">
                    <div className="col-md-6 embedly-responsive d-flex align-items-center">
                      <iframe
                        width="100%"
                        height="auto"
                        src={card?.collegeTestimonials?.video_url}
                        allowFullScreen
                        className="embedly-embed"
                      />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-between">
                      <div className="p-2 flex-fill">
                        <h5 className="text-black fw-bold pt-2">{card?.collegeTestimonials?.name}</h5>
                        <p className="text-black studentSpeakCardBody overflow-y-auto">
                          {card?.collegeTestimonials?.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </EmblaCarousel>
        </div>
      </div>
    </section>
  )
}

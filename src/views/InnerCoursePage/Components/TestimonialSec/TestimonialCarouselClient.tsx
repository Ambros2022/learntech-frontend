'use client'

import EmblaTabCarousel from 'src/components/ui/Embla/EmblaTabCarousel'

interface Testimonial {
  id?: number
  streamTestimonials?: {
    video_url: string
    name: string
    designation: string
  }
}

export default function TestimonialCarouselClient({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <EmblaTabCarousel
      slidesToShowDesktop={2}
      slidesToShowTablet={1}
      slidesToShowMobile={1}
      showDots={false}
      showArrows={testimonials.length > 2}
      loop={false}
      autoplay={false}
    >
      {testimonials.map((card, i) => (
        <div key={card.id ?? i} className="d-flex m-2">
          <div className="card p-3 d-flex flex-column flex-fill">
            <div className="row flex-fill">
              <div className="col-md-6 embedly-responsive d-flex align-items-center">
                <iframe
                  width="100%"
                  height="auto"
                  src={card?.streamTestimonials?.video_url}
                  allowFullScreen
                  className="embedly-embed"
                  title={card?.streamTestimonials?.name ?? 'Testimonial'}
                />
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-between">
                <div className="p-2 flex-fill">
                  <h5 className="text-black fw-bold pt-2">{card?.streamTestimonials?.name}</h5>
                  <p className="text-black studentSpeakCardBody overflow-y-auto">
                    {card?.streamTestimonials?.designation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </EmblaTabCarousel>
  )
}

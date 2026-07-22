import { LazyTestimonialCarousel } from 'src/app/components/ClientWrappers'

interface Testimonial {
  id?: number
  streamTestimonials?: {
    video_url: string
    name: string
    designation: string
  }
}

export default function TestimonialSec({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) return null

  return (
    <section className="bg-white pb-3">
      <div className="container">
        <h2 className="text-blue fw-bold text-center mb-3">Testimonials</h2>
        <div className="testimonialCarousel position-relative">
          <LazyTestimonialCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  )
}

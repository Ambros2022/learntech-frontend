import { LazyExpertEnquiryForm } from 'src/app/components/ClientWrappers'
import type { Stream } from 'src/@core/components/popup/ExpertEnquiryForm'

interface Props {
  streams: Stream[]
}

export default function ExpertSection({ streams }: Props) {
  return (
    <section className="Expert-bg-skyBlue">
      <div className="container py-5 pt-3 py-md-5">
        <h2 className="fw-bold text-center text-blue mb-2">
          Connect with Our Elite Academic Advisors
        </h2>
        <p className="text-black">
          Unlock personalized strategies tailored to your educational goals. Let our experts guide
          you through every step of your academic journey, ensuring you make informed and impactful
          decisions.
        </p>
        <LazyExpertEnquiryForm placeholder="Stream" streams={streams} />
      </div>
    </section>
  )
}

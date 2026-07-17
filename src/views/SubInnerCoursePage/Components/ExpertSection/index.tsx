import { LazyExpertEnquiryForm } from 'src/app/components/ClientWrappers'

export default function ExpertSection() {
  return (
    <section className="Expert-bg-skyBlue innercourse_height" id="animation15">
      <div className="container py-5 py-md-5">
        <h3 className="fw-bold text-center text-blue mb-3">Get In Touch With Our Expert Counsellor</h3>
        <LazyExpertEnquiryForm placeholder='Stream' />
      </div>
    </section>
  )
}

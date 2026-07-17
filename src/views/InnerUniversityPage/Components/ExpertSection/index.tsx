import { LazyExpertEnquiryForm } from 'src/app/components/ClientWrappers'

export default function ExpertSection() {
  return (
    <section className="Expert-bg-skyBlue">
      <div className="container py-5">
        <h3 className="fw-bold text-center text-blue pb-2">Get In Touch With Our Expert Counsellor</h3>
        <LazyExpertEnquiryForm />
      </div>
    </section>
  )
}

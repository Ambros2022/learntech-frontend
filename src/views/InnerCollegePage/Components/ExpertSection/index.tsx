import { LazyExpertEnquiryForm } from 'src/app/components/ClientWrappers'

export default function ExpertSection({ collegeName }: { collegeName?: string }) {
  return (
    <section className="Expert-bg-skyBlue" id="animation15">
      <div className="container py-5 py-md-5">
        <h3 className="fw-bold text-center text-blue pb-2">Get In Touch With Our Expert Counsellor</h3>
        <LazyExpertEnquiryForm collegeName={collegeName} />
      </div>
    </section>
  )
}

import { LazyEnquiryForm } from 'src/app/components/ClientWrappers'

const ContactForm = ({ heading }: { heading?: string }) => {
  return (
    <div className="bg-skyBlue px-lg-5 px-3 rounded">
      <h2 className="fw-bold text-blue text-center pt-3 mb-3">{heading}</h2>
      <LazyEnquiryForm />
    </div>
  )
}

export default ContactForm

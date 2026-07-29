import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export default function SchoolBannerSec({ data }: { data: any }) {
  return (
    <section
      className='py-3 d-flex justify-content-center flex-column'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${IMG_BASE}/${data.banner_image})`,
        backgroundRepeat: 'no-repeat',
        height: '400px',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}
    >
      <h4 className='align-self-center text-center fw-bold p-3 text-white rounded'>
        Interested in Studying at This School?
      </h4>
      <h2 className='align-self-center text-center mx-md-0 mx-5 text-white fw-bold p-3 bg-blue rounded'>
        {data.name}
      </h2>
      <div className='text-center mt-3'>
        <GlobalEnquiryForm className='viewMoreCollegeBtn btn btn-success2' placeholder="Class" collegeName={data.name} />
      </div>
    </section>
  )
}

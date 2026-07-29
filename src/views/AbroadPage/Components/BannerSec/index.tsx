import { GlobalEnquiryForm, LazyAbroadSearchBar } from 'src/app/components/ClientWrappers'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export default function BannerSec({ data }: { data: any }) {
  const bgImageUrl = data?.backgroundimage ? `${IMG_BASE}/${data.backgroundimage}` : ''

  return (
    <>
      {bgImageUrl && <link rel="preload" as="image" href={bgImageUrl} />}
      <section
        className='studyInUsaCon'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.356), rgba(0,0,0,0.419)), url(${bgImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '400px',
        }}
      >
        <div className="container h-100 d-flex justify-content-center">
          <div className='text-white align-content-center text-center'>
            <h1 className='fw-bold'>Study in {data?.country?.name}</h1>
            <div className="searchSec1 text-center mb-4">
              <h3 className='mb-3'>Explore Top Colleges and Universities in {data?.country?.name}.</h3>
              <LazyAbroadSearchBar countryId={data?.country_id} countrySlug={data?.slug} />
            </div>
            <GlobalEnquiryForm buttonText="Help me with options" className="btn viewMoreCollegeBtn rounded" />
          </div>
        </div>
      </section>
    </>
  )
}

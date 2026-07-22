import Image from 'next/image'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export default function FacilitiesSection({ data }: { data: any }) {
  if (!data?.collegeamenities?.length) return null

  return (
    <section className='bg-white facilitiesSec py-3'>
      <div className="container bg-skyBlue px-4 py-3">
        <h2 className='pt-3 text-blue fw-bold text-center'>Facilities & Infrastructure</h2>
        <div className="row pt-3">
          {data.collegeamenities.map((card: any) => (
            <div key={card.id} className="col-6 col-md-3 col-lg-2 col-xl-2 mb-3 d-flex flex-wrap">
              <div className="card text-center py-1 flex-fill">
                <Image
                  src={`${IMG_BASE}/${card.clgamenities.amenities_logo}`}
                  alt={card.clgamenities.amenities_name}
                  width={50}
                  height={50}
                  className="card-img-top img-fluid mx-auto"
                  loading="lazy"
                />
                <h6 className="fw-bold text-truncate">{card.clgamenities.amenities_name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

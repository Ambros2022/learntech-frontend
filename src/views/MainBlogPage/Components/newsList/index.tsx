import Link from 'next/link'
import Image from 'next/image'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

const CollegeItem = ({ id, banner_image, title, slug }: any) => (
  <div className="col-md-12 col-10 mx-md-0 mx-auto">
    <Link href={`/college/${id}/${slug}`}>
      <div className="card mb-3 bg-skyBlue hover-card">
        <div className="row g-0">
          <div className="col-md-4 col-xl-3 col-lg-3 upcomingAdmission">
            <Image
              src={`${IMG_URL}/${banner_image}`}
              alt={title || 'college'}
              width={300}
              height={300}
              sizes="(max-width: 768px) 100vw, 150px"
              loading="lazy"
              className="mx-md-2 rounded img-fluid"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8 col-lg-9 col-xl-9">
            <div className="card-body">
              <h6 className="card-title fw-bold">{title}</h6>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
)

const NewsList = ({ newsItems }: { newsItems: any[] }) => {
  if (!newsItems?.length) return null
  return (
    <>
      <h4 className='fw-bold text-blue mt-3 text-center pt-3 mb-4'>Upcoming Admissions</h4>
      <div
        className='bg-skyBlue pt-3 examNewsSec rounded mt-3 px-4 height-fix-blogs'
        style={{ overflowY: 'auto', scrollbarWidth: 'thin' }}
      >
        <div className="row">
          {newsItems.map((item, index) => (
            <CollegeItem
              key={index}
              id={item.id}
              banner_image={item.banner_image}
              title={item.name}
              slug={item?.slug}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default NewsList

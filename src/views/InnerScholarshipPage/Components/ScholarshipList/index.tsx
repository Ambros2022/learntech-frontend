import Link from 'next/link'

const ScholarshipItem = ({ id, slug, title }: { id: number; slug: string; title: string }) => (
  <div className="col-12">
    <Link href={`/scholarship/${id}/${slug}`}>
      <div className="card mb-3 hover-card">
        <div className="card-body text-center">
          <h5 className="card-title fw-bold mb-0">{title}</h5>
        </div>
      </div>
    </Link>
  </div>
)

export default function ScholarshipList({ newsItems }: { newsItems: any[] }) {
  if (!newsItems?.length) return null
  return (
    <>
      <h2 className='fw-bold text-blue text-center pt-3 mb-3'>Similar Scholarship</h2>
      <div className='bg-skyBlue examNewsSec blogSec pt-3 mt-3 px-4 overflow-y-auto rounded' style={{ maxHeight: 'calc(7 * 115px)' }}>
        <div className="row">
          {newsItems.map((item) => (
            <ScholarshipItem key={item.id} id={item.id} title={item.name} slug={item.slug} />
          ))}
        </div>
      </div>
    </>
  )
}

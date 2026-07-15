import Link from 'next/link'
import { getColleges } from 'src/lib/api/common'
import { LazyCollegeCarousel } from 'src/app/components/ClientWrappers'

export default async function FeaturedCollegeSection({ heading = 'Featured Colleges' }: { heading?: string }) {
  const result = await getColleges({ size: 10, type: 'college' })
  const colleges = result?.data ?? []
  if (!colleges.length) return null

  return (
    <section className=" bg-white">
      <div className="container pt-4 pt-md-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-4 mb-md-5">{heading}</h2>
        <ul aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
          {colleges.map((c: any) => (
            <li key={c.id}><a href={`/college/${c.id}/${c.slug}`}>{c.name}</a></li>
          ))}
        </ul>
        <LazyCollegeCarousel colleges={colleges} />
        <div className="d-flex justify-content-center py-4">
          <Link href="/colleges" className="btn viewMoreClgBtn">Load More</Link>
        </div>
      </div>
    </section>
  )
}

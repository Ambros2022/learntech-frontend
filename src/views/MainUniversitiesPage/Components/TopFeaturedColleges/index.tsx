import Link from 'next/link'
import { getColleges } from 'src/lib/api/common'
import { LazyUniversityCarousel } from 'src/app/components/ClientWrappers'

const clipRect = { position: 'absolute' as const, width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' as const }

export default async function FeaturedUniversitySection() {
  const result = await getColleges({ size: 10, type: 'university' })
  const universities = result?.data ?? []
  if (!universities.length) return null

  return (
    <section className="FeaturedClgCon bg-white mb-4" >
      <div className="container pt-4 pt-md-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-4 mb-md-5">Top Featured Universities</h2>
        <ul aria-hidden="true" style={clipRect}>
          {universities.map((u: any) => (
            <li key={u.id}><a href={`/university/${u.id}/${u.slug}`}>{u.name}</a></li>
          ))}
        </ul>
        <LazyUniversityCarousel universities={universities} />
        {/* <div className="d-flex justify-content-center py-4">
          <Link href="/universities" className="btn viewMoreClgBtn">View More</Link>
        </div> */}
      </div>
    </section>
  )
}

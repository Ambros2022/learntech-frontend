import Link from 'next/link'
import { getSchools } from 'src/lib/api/common'
import { LazySchoolsCarousel } from 'src/app/components/ClientWrappers'

const clipRect = {
  position: 'absolute' as const, width: 1, height: 1,
  overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' as const,
}

export default async function FeaturedSchoolSection() {
  const schools = await getSchools({ size: 10 })
  if (!schools?.length) return null

  return (
    <section className="FeaturedClgCon bg-white">
      <div className="container pt-4 pt-md-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-4 mb-md-5">Top Featured Schools</h2>
        <ul aria-hidden="true" style={clipRect}>
          {schools.map((s: any) => (
            <li key={s.id}><a href={`/school/${s.id}/${s.slug}`}>{s.name}</a></li>
          ))}
        </ul>
        <LazySchoolsCarousel schools={schools} />
        <div className="d-flex justify-content-center py-4">
          <Link href="/schools" className="btn viewMoreClgBtn">View More</Link>
        </div>
      </div>
    </section>
  )
}

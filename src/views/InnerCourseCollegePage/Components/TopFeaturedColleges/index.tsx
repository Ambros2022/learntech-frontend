import Link from 'next/link'
import { getColleges } from 'src/lib/api/common'
import { LazyCollegeCarousel } from 'src/app/components/ClientWrappers'

interface Props {
  streamId?: number | null
  shortName?: string
}

const clipRect = { position: 'absolute' as const, width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' as const }

export default async function TopFeaturedColleges({ streamId, shortName }: Props) {
  const params: Record<string, string | number> = { size: 10, type: 'college' }
  if (streamId) params.stream_id = streamId
  const result = await getColleges(params)
  const colleges = result?.data ?? []
  if (!colleges.length) return null

  return (
    <section className=" bg-white">
      <div className="container pt-4 pt-md-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-4 mb-md-5">
          Top {shortName} Featured Colleges
        </h2>
        <ul aria-hidden="true" style={clipRect}>
          {colleges.map((c: any) => (
            <li key={c.id}><a href={`/college/${c.id}/${c.slug}`}>{c.name}</a></li>
          ))}
        </ul>
        <LazyCollegeCarousel colleges={colleges} />
        <div className="d-flex justify-content-center py-4">
          <Link href="/colleges" className="btn viewMoreClgBtn">View More</Link>
        </div>
      </div>
    </section>
  )
}

import { getColleges } from 'src/lib/api/common'
import { LazyAbroadCarousel } from 'src/app/components/ClientWrappers'

const clipRect = {
  position: 'absolute' as const, width: 1, height: 1,
  overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' as const,
}

interface Props {
  countryId: number
  countrySlug: string
  countryName?: string
}

export default async function TopFeaturedColleges({ countryId, countrySlug, countryName }: Props) {
  const result = await getColleges({ size: 10, type: 'university', country_id: countryId })
  const colleges = result?.data ?? []
  if (!colleges.length) return null

  return (
    <section className="FeaturedClgCon bg-white mb-4">
      <div className="container pt-4 pt-md-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-4 mb-md-5">
          Top Universities to Study in {countryName}
        </h2>
        <ul aria-hidden="true" style={clipRect}>
          {colleges.map((c: any) => (
            <li key={c.id}><a href={`/${countrySlug}/${c.id}/${c.slug}`}>{c.name}</a></li>
          ))}
        </ul>
        <LazyAbroadCarousel colleges={colleges} countrySlug={countrySlug} />
      </div>
    </section>
  )
}

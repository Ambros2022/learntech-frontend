import { getColleges } from 'src/lib/api/common'
import { LazyAbroadCarousel } from 'src/app/components/ClientWrappers'

const clipRect = {
  position: 'absolute' as const, width: 1, height: 1,
  overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' as const,
}

export default async function TopUniversity({ data }: { data: any }) {
  const result = await getColleges({ size: 10, type: 'university', country_id: data?.country_id })
  const colleges = result?.data ?? []
  if (!colleges.length) return null

  return (
    <section className='topUniSec'>
      <div className="container">
        <h2 className='pt-5 pb-3 fw-bold text-center text-blue'>
          Top Universities to <br className='d-block d-md-none' /> Study in {data?.country?.name}
        </h2>
      </div>
      <div className='position-relative topUniCardCon container pb-5'>
        <ul aria-hidden="true" style={clipRect}>
          {colleges.map((c: any) => (
            <li key={c.id}><a href={`/${data?.slug}/${c.id}/${c.slug}`}>{c.name}</a></li>
          ))}
        </ul>
        <LazyAbroadCarousel colleges={colleges} countrySlug={data?.slug} />
      </div>
    </section>
  )
}

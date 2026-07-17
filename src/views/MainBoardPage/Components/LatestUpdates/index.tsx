import LatestUpdateCarousel, { type NewsItem } from './LatestUpdateCarousel'

interface Props {
  updates: NewsItem[]
}

export default function LatestUpdateSec({ updates }: Props) {
  if (!updates.length) return null

  return (
    <section className="bg-white py-3">
      <div className="container">
        {/* SSR — Googlebot indexes heading + links */}
        <h2 className="fw-bold text-blue text-center">Latest Updates on Boards</h2>
        <ul
          aria-hidden="true"
          style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
        >
          {updates.map(item => (
            <li key={item.id}>
              <a href={`/news/${item.id}/${item.slug}`}>{item.name}</a>
            </li>
          ))}
        </ul>
        <div className="pt-4">
          <LatestUpdateCarousel updates={updates} />
        </div>
      </div>
    </section>
  )
}

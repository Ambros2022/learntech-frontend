import dynamic from 'next/dynamic'

interface NewsItem {
  id: number
  slug: string
  name: string
}

interface Props {
  newsLinks: NewsItem[]
}

const NewsLinkCarouselClient = dynamic(
  () => import('./NewsLinkCarouselClient'),
  { loading: () => <div style={{ height: 88 }} /> }
)

// Server Component — data pre-fetched in page.tsx via getExamNewsLinks().
// Lazily loaded with SSR enabled to preserve SEO.
export default function NewsLinkSection({ newsLinks }: Props) {
  if (!newsLinks?.length) return null

  const items = newsLinks.map((n) => ({ id: n.id, slug: n.slug, name: n.name }))

  return (
    <section
      className="newsLinkSec2 bg-blue py-3 position-relative"
      style={{ zIndex: 2 }}
    >
      <div className="container text-center py-3 newsLink2Container rounded">
        <NewsLinkCarouselClient items={items} />
      </div>
    </section>
  )
}

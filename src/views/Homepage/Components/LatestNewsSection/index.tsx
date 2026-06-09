import { LazyLatestNewsClient } from 'src/app/components/ClientWrappers'

export interface NewsOrBlogItem {
  id: number
  slug: string
  name: string
  meta_description?: string
  created_at?: string
}

interface BannerItem {
  image: string
}

interface Props {
  initialNews: NewsOrBlogItem[]
  banner: BannerItem | null
}

const IMG_BASE = process.env.NEXT_PUBLIC_IMG_URL || ''

export default function LatestNewsSection({ initialNews, banner }: Props) {
  const backgroundStyle = banner
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${IMG_BASE}/${banner.image})`,
        backgroundSize: 'cover' as const,
        backgroundRepeat: 'no-repeat' as const,
      }
    : {}

  return (
    <section className="latestNewsCon" style={backgroundStyle}>
      <div className="container pt-5">
        <h2 className="fw-bold text-white text-center">Latest News &amp; Blog</h2>
        <LazyLatestNewsClient initialNews={initialNews} />
      </div>
    </section>
  )
}

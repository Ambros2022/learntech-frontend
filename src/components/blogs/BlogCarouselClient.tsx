'use client'
import Image from 'next/image'
import Link from 'next/link'
import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'

export interface BlogItem {
  id: number
  name: string
  slug: string
  banner_image: string
  meta_title?: string
}

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

function BlogCard({ blog }: { blog: BlogItem }) {
  return (
    <div className="mx-2 h-100" style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        className="card hover-card h-100 bg-white"
        style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e8eef5', display: 'flex', flexDirection: 'column' }}
      >
        {/* image */}
        <Image
          src={`${IMG_URL}/${blog.banner_image}`}
          alt={blog.name}
          width={400}
          height={200}
          className="w-100"
          style={{ objectFit: 'contain', height: 170, display: 'block', flexShrink: 0, background: '#f0f4f8' }}
          loading="lazy"
        />

        {/* body */}
        <div
          className="d-flex flex-column px-3 py-3"
          style={{ flex: 1 }}
        >
          <h5
            className="fw-bold text-dark mb-2"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.95rem',
              lineHeight: 1.4,
              minHeight: '2.8em',
            }}
          >
            {blog.name}
          </h5>

          {blog.meta_title && (
            <p
              className="text-muted mb-0"
              style={{
                fontSize: '0.8rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.4,
                flex: 1,
              }}
            >
              {blog.meta_title}
            </p>
          )}

          <div className="mt-3">
            <Link
              href={`/blog/${blog.id}/${blog.slug}`}
              className="btn viewMoreClgBtn w-100"
              style={{ fontSize: '0.85rem' }}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BlogCarouselClient({ blogs }: { blogs: BlogItem[] }) {
  if (!blogs.length) return null
  return (
    <EmblaCarousel
      slidesToShowDesktop={4}
      slidesToShowTablet={2}
      slidesToShowMobile={1}
      autoplay
      autoplayDelay={2500}
      showDots={false}
      showArrows
      loop
    >
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </EmblaCarousel>
  )
}

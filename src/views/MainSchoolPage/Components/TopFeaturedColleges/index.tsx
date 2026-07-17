import Link from 'next/link'
import { getBlogs } from 'src/lib/api/common'
import { LazyBlogCarousel } from 'src/app/components/ClientWrappers'

const clipRect = {
  position: 'absolute' as const, width: 1, height: 1,
  overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' as const,
}

export default async function FeaturedBlogSection() {
  const { blogs } = await getBlogs({ size: 10, orderby: 'desc' })

  if (!blogs.length) return null

  return (
    <section className=" bg-white">
      <div className="container pt-4 pt-md-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-4 mb-md-5">Related Blogs</h2>
        <ul aria-hidden="true" style={clipRect}>
          {blogs.map((b: any) => (
            <li key={b.id}><a href={`/blog/${b.id}/${b.slug}`}>{b.name}</a></li>
          ))}
        </ul>
        <LazyBlogCarousel blogs={blogs} />
        <div className="d-flex justify-content-center py-4">
          <Link href="/blog" className="btn viewMoreClgBtn">View All Blogs</Link>
        </div>
      </div>
    </section>
  )
}

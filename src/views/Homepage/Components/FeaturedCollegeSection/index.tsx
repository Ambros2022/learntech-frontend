import Link from 'next/link'
import { LazyCollegeCarousel } from 'src/app/components/ClientWrappers'
import type { CollegeItem } from 'src/components/colleges/CollegeCarouselClient'

interface Props {
  colleges: CollegeItem[]
}

export default function FeaturedCollegeSection({ colleges }: Props) {
  return (
    <section className="FeaturedClgCon bg-white">
      <div className="container pt-4 pt-md-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-4 mb-md-5">Featured Colleges</h2>
        <LazyCollegeCarousel colleges={colleges} />
        <div className="d-flex justify-content-center py-4">
          <Link href="/colleges" className="btn viewMoreClgBtn">Load More</Link>
        </div>
      </div>
    </section>
  )
}

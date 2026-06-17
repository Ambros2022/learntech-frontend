import Link from 'next/link'
import { LazySchoolsCarousel } from 'src/app/components/ClientWrappers'

export default function TopFeaturedColleges({ schools }: { schools: any[] }) {
  if (!schools?.length) return null
  return (
    <section className="FeaturedClgCon bg-white">
      <div className="container pt-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-5">Top Featured Schools</h2>
        <LazySchoolsCarousel schools={schools} />
        <div className="d-flex justify-content-center  pt-3 pb-5">
          <Link href="/schools" className="btn viewMoreClgBtn">View More</Link>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { GlobalEnquiryForm, LazyCourseSearchBar } from 'src/app/components/ClientWrappers'

interface Props {
  trendingCourses: any[]
}

export default function BannerSec({ trendingCourses }: Props) {
  return (
    <section className='bg-blue courseSec'>
      <div className="container">
        <h1 className='text-white fw-bold pt-5 mb-3'>Best Courses to Study in India and Abroad</h1>
        <div className="row">
          <div className="col-md-7 mb-3">
            <LazyCourseSearchBar />
          </div>
        </div>
        <h2 className='text-white fw-bold pt-3 mb-3'>Trending Courses</h2>
        <div className="d-flex pb-5 gap-2 flex-wrap flex-md-row flex-column justify-content-between">
          <div className='d-flex gap-2 flex-wrap mb-2 mb-lg-0'>
            {trendingCourses.map((val) => (
              <Link
                key={val.id}
                href={`/course/${val?.streams?.id}/${val?.streams?.slug}/${val.slug}`}
                className='btn trendCrsBtn'
              >
                {val.short_name}
              </Link>
            ))}
          </div>
          <div className='align-content-center'>
            <GlobalEnquiryForm buttonText="Check Eligibility" className="btn btn-elg bg-warning text-white" />
          </div>
        </div>
      </div>
    </section>
  )
}

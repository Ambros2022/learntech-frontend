import React from 'react'
import Link from 'next/link';
import { LazyCollegeCarousel } from 'src/app/components/ClientWrappers';

function FeaturedCollegeSection({ colleges = [] }: { colleges?: any[] }) {
  if (!colleges.length) return null;

  return (
    <section className="FeaturedClgCon bg-white" id="animation5" data-aos="fade-up">
      <div className="container pt-0 position-relative">
        <h2 className="fw-bold text-blue text-center mb-5">Top Colleges</h2>
        <LazyCollegeCarousel colleges={colleges} />
        <div className="d-flex justify-content-center mt-5 mt-md-4 pb-5 pb-md-3">
          <Link href='/colleges' className='btn viewMoreClgBtn'>View All</Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollegeSection


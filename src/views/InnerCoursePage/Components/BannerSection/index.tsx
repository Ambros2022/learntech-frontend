import Link from 'next/link'
import React from 'react'

function BannerSection() {
  return (
    <>
      <hr className='m-0'></hr>
      <section className='pt-3'>
        <div className='container'>
          <p><Link href={'/home'} className="text-black">Home</Link> {'>'} <Link href={'/courses'} className="text-black">Courses</Link> {'>'} <Link href={'courses/innerCourse'} className="text-blue">Dental</Link></p>
        </div>
      </section>
      <section className="bg-blue dentalCourseCon py-5">
        <div className="container h-100 flex-column column-gap-0 d-flex justify-content-center">
          <div className='align-items-center'>
            <h2 className='text-center fw-bold text-white mb-3'>Dental Course</h2>
            <div className='text-center'>
              <button className='btn applyNowCourseBtn'>Apply Now</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BannerSection

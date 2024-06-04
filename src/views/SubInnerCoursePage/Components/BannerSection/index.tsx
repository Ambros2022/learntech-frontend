import Link from 'next/link'
import React from 'react'

function BannerSection() {
  return (
    <>
      <section className="bg-blue dentalCourseCon py-5">
        <div className="container h-100 flex-column column-gap-0 d-flex justify-content-center">
          <div className='align-items-center'>
            <h1 className=' fw-bold text-white mb-3'>BDS (Bachelor of Dental Surgery): Course, Duration, Eligibility, Fees, Admissions, Opportunities
            </h1>
            <div className='text-white  mb-2 row'>
              <h6 className='col-6'>Duration : 5 years</h6>

              <button  className='btn applyNowCourseBtn'>Apply Now</button>
            </div>
            <div className=''>
            
            </div>
          </div>
        </div>
      </section>
      <section className='py-3 bg-white'>
        <div className='container'>
          <p><Link href={'/'} className="text-black">Home</Link> {'>'} <Link href={'/courses'} className="text-black">Courses</Link> {'>'} <Link href={'courses/innerCourse'} className="text-black">Dental</Link> {'>'} <Link href={'courses/innerCourse/subInnerCourse'} className="text-blue">BDS</Link></p>
        </div>
      </section>
    </>
  )
}

export default BannerSection

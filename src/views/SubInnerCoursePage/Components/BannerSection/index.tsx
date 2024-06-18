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
              <h4 className='col-6 mb-3'>Duration : 5 years</h4>
              <div className="d-flex">
                <button className='btn applyNowCourseBtn'>Apply Now</button>
              </div>
            </div>
            <div className=''>

            </div>
          </div>
        </div>
      </section>
      <section className='py-3 bg-white'>
        <div className='container linkFontSize'>
          <p><Link href={'/'} className="text-black">Home <i className='bi bi-chevron-right'></i></Link><Link href={'/courses'} className="text-black"> Courses  <i className='bi bi-chevron-right'></i></Link> <Link href={'courses/innerCourse'} className="text-black">Dental  <i className='bi bi-chevron-right'></i></Link><Link href={'courses/innerCourse/subInnerCourse'} className="text-blue"> BDS</Link></p>
        </div>
      </section>
    </>
  )
}

export default BannerSection

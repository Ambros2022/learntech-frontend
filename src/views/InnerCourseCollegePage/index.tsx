import React from 'react'
import TopFeaturedColleges from '../CollegePage/Components/TopFeaturedColleges'
import BannerSection from '../InnerCollegePage/Components/BannerSection'
import CourseDetailSec from './Components/CourseDetailSec'
import ExpertSection from './Components/ExpertSection'

function InnerCourseCollegePage({id}) {
  return (
    <>
      {/* <BannerSection /> */}
      <CourseDetailSec />
      <ExpertSection />
      <TopFeaturedColleges />
    </>
  )
}

export default InnerCourseCollegePage

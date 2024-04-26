import React from 'react'
import TopFeaturedColleges from '../CollegePage/Components/TopFeaturedColleges'
import ExpertSection from '../InnerCollegePage/Components/ExpertSection'
import BannerSection from '../InnerCollegePage/Components/BannerSection'
import CourseDetailSec from './Components/CourseDetailSec'

function InnerCourseCollegePage() {
  return (
    <>
      <BannerSection />
      <CourseDetailSec />
      <ExpertSection />
      <TopFeaturedColleges />
    </>
  )
}

export default InnerCourseCollegePage

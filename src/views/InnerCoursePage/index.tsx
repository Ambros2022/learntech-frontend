import React from 'react'
import BannerSection from './Components/BannerSection';
import OverviewSection from './Components/OverviewSection';
import ExpertSection from './Components/ExpertSection';
import OtherCourses from './Components/OtherCourses';




function InnerCoursePage({ id }) {
 
  return (
    <>

      <BannerSection />
      <OverviewSection />
      <OtherCourses />
      <ExpertSection />
    </>
  )
}

export default InnerCoursePage;

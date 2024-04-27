import React from 'react'
import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import FacilitiesSection from './Components/FacilitiesSection'
import LocationSection from './Components/LocateSection'
import TopFeaturedColleges from '../CollegePage/Components/TopFeaturedColleges'
import ExpertSection from './Components/ExpertSection'

function InnerCollegePage() {
  return (
    <>
      <BannerSection />
      <CollegeInfoSection />
      <FacilitiesSection />
      <LocationSection />
      <TopFeaturedColleges />
      <ExpertSection />
    </>
  )
}

export default InnerCollegePage

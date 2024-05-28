import React from 'react'
import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import FacilitiesSection from './Components/FacilitiesSection'
import LocationSection from './Components/LocateSection'
import ExpertSection from './Components/ExpertSection'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import SchoolBanner from './Components/SchoolBanner'

function InnerSchoolPage() {
  return (
    <>
      <BannerSection />
      <CollegeInfoSection />
      <FacilitiesSection />
      <SchoolBanner />
      <LocationSection />
      <TopFeaturedColleges />
      <ExpertSection />
    </>
  )
}

export default InnerSchoolPage

import React from 'react'
import BannerSec from './Components/BannerSec'
import OverviewSec from './Components/OverviewSec'
import ExpertSec from './Components/ExpertSec'
import FeaturedCollegeSection from './Components/FeaturedCollegeSection'

type NriQuotaPageProps = {
  pagedata: any
  banners: any[]
  courses: any[]
  colleges: any[]
}

const NriQuotaPage = ({ pagedata, banners, courses, colleges }: NriQuotaPageProps) => {
  return (
    <>
      <BannerSec />
      <OverviewSec data={pagedata} banners={banners} courses={courses} />
      <ExpertSec />
      <FeaturedCollegeSection colleges={colleges} />
    </>
  )
}

export default NriQuotaPage
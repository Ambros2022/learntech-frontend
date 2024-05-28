import React from 'react'
import BannerSection from './Components/BannerSection';
import ExpertSection from './Components/ExpertSection';
import TopFeaturedColleges from './Components/TopFeaturedColleges';
// import BestCollegeSec from './Components/BestCollegeSec';
import TopCollegesSection from './Components/TopCollegesSection';
import CollegeFilterSection from './Components/CollegeFilterSection';

function MainSchoolPage() {
    return (
        <>
            <BannerSection />
            <TopCollegesSection />
            <CollegeFilterSection />
            {/* <BestCollegeSec /> */}
            <ExpertSection />
            <TopFeaturedColleges />
        </>
    )
}

export default MainSchoolPage;

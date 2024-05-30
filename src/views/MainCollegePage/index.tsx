import React from 'react'
import BannerSection from './Components/BannerSection';
import TopCollegesSection from './Components/TopCollegesSection';
import ExpertSection from './Components/ExpertSection';
import TopFeaturedColleges from './Components/TopFeaturedColleges';
import CollegeFilterSection from './Components/CollegeFilterSection';
import BestCollegeSec from './Components/BestCollegeSec';

function MainCollegePage() {
    return (
        <>
            <BannerSection />
            <TopCollegesSection />
            <CollegeFilterSection />
            <BestCollegeSec />
            <ExpertSection />
            <TopFeaturedColleges />
        </>
    )
}

export default MainCollegePage;

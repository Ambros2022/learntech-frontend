import React from 'react'
import BannerSection from './Components/BannerSection';
import TopCollegesSection from './Components/TopCollegesSection';
import ExpertSection from './Components/ExpertSection';
import TopFeaturedColleges from './Components/TopFeaturedColleges';
import CollegeFilterSection from './Components/CollegeFilterSection';

function MainCollegePage() {
    return (
        <>
            <BannerSection />
            <TopCollegesSection />
            <CollegeFilterSection />
            <ExpertSection />
            <TopFeaturedColleges />
        </>
    )
}

export default MainCollegePage;

import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import BannerSection from "./Components/BannerSection";
import NewsLinkSection from "./Components/NewsLinkSection";
import AnalysisSection from "./Components/AnalysisSection";
import FeaturedCollegeSection from "./Components/FeaturedCollegeSection";
import ExploreSection from "./Components/ExploreSection";
import StudyAbroadSection from "./Components/StudyAbroadSection";
import LatestNewsSection from "./Components/LatestNewsSection";
import ExpertSection from "./Components/ExpertSection";


const Work = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            offset: 200,
            easing: 'ease-in-sine',
            delay: 100,
            duration: 500,
        })
    }, []);

    return (
        <>
            <BannerSection />
            <NewsLinkSection />
            <AnalysisSection />
            <FeaturedCollegeSection />
            <ExploreSection />
            <StudyAbroadSection />
            <LatestNewsSection />
            <ExpertSection />
        </>
    );
}
export default Work;
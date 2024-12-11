import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BannerSection from "./Components/BannerSection";
import NewsLinkSection from "./Components/NewsLinkSection";
import AnalysisSection from "./Components/AnalysisSection";
import Head from "next/head";
const FeaturedCollegeSection = dynamic(() => import("./Components/FeaturedCollegeSection"), { ssr: false });
const ExploreSection = dynamic(() => import("./Components/ExploreSection"), { ssr: false });
const StudyAbroadSection = dynamic(() => import("./Components/StudyAbroadSection"), { ssr: false });
const LatestNewsSection = dynamic(() => import("./Components/LatestNewsSection"), { ssr: false });
const ExpertSection = dynamic(() => import("./Components/ExpertSection"), { ssr: false });

const Work = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 200,
      easing: 'ease-in-sine',
      delay: 100,
      duration: 1000,
    })
  }, []);

  return (
    <>
      <Head>

        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}`} />
      </Head>
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

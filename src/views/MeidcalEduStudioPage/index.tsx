import React, { useRef } from 'react'
import BannerSec from './Components/BannerSec'
import AchieverSec from './Components/AchieversSec'
import ProblemSec from './Components/ProblemSec'
import HelpSec from './Components/HelpSec'
import EducationSec from './Components/EducationSec'
import LearningSec from './Components/LearningSec'
import ServicesSec from './Components/ServicesSec'
import ExamSec from './Components/ExamSec'
import Header from './Components/Header'
import Footer from './Components/Footer'

const MedicalEduStudioPage = () => {

    const bannerSecRef = useRef<HTMLDivElement>(null);

    const scrollToBannerSec = () => {
        if (bannerSecRef.current) {
            bannerSecRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const examSecRef = useRef<HTMLDivElement>(null);


    const scrollToExamSec = () => {
        if (examSecRef.current) {
            examSecRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            <Header />
            <div ref={bannerSecRef}>
            <BannerSec />
            </div>
            <AchieverSec />
            <ProblemSec />
            <HelpSec />
            <EducationSec scrollToExamSec={scrollToExamSec} />
            <LearningSec />
            <ServicesSec  scrollToBannerSec={scrollToBannerSec} scrollToExamSec={scrollToExamSec}/>
            <ExamSec ref={examSecRef} />
            <Footer />
        </>
    )
}

export default MedicalEduStudioPage;


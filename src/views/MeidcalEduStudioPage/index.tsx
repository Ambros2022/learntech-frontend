import React from 'react'
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
    return (
        <>
            <Header/>
            <BannerSec />
            <AchieverSec />
            <ProblemSec />
            <HelpSec/>
            <EducationSec/>
            <LearningSec/>
            <ServicesSec/>
            <ExamSec/>
            <Footer/>
        </>
    )
}

export default MedicalEduStudioPage
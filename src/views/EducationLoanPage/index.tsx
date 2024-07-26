import React from 'react'
import BannerSec from './Components/BannerSec'
import AboutSec from './Components/AboutSec'
import DetailSec from './Components/DetailSec'
import StepSection from './Components/StepsSection'
import BankSec from './Components/BankSec'
import FaqSec from '../StudyInUsaPage/Components/FaqSec'
import LoanCalculator from './Components/LoanCalculator'




const EducationLoanPage = () => {

    return (
        <>
            <BannerSec />
            <AboutSec />
            <LoanCalculator />
            <DetailSec />
            <StepSection />
            <BankSec />
            <FaqSec />
        </>
    )
}

export default EducationLoanPage
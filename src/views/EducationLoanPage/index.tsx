import React from 'react'
import BannerSec from './Components/BannerSec'
import AboutSec from './Components/AboutSec'
import DetailSec from './Components/DetailSec'
import StepSection from './Components/StepsSection'
import BankSec from './Components/BankSec'
import FaqSec from './Components/FaqSec'
import LoanCalculator from './Components/LoanCalculator'




const EducationLoanPage = () => {

    const data = {
        abroadpagefaqs: [
            {
                questions: "What is the MBBS eligibility criteria?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            },
            {
                questions: "What is the MBBS course duration and fee?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            },
            {
                questions: "Name some of the best private colleges in Bangalore?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            },
            {
                questions: "How to get MBBS admission in Bangalore?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            },
            {
                questions: "Which are the top MBBS colleges in Bangalore?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            }
        ]
    };


    return (
        <>
            <BannerSec />
            <AboutSec />
            <LoanCalculator />
            <DetailSec />
            <StepSection />
            <BankSec />
            <FaqSec data={data} />
        </>
    )
}

export default EducationLoanPage
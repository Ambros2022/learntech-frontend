import React, { useCallback, useEffect, useState } from 'react'
import BannerSec from './Components/BannerSec'
import AboutSec from './Components/AboutSec'
import DetailSec from './Components/DetailSec'
import StepSection from './Components/StepsSection'
import BankSec from './Components/BankSec'
import FaqSec from './Components/FaqSec'
import LoanCalculator from './Components/LoanCalculator'
import { useRouter } from 'next/router'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head'



const EducationLoanPage = () => {

  const router = useRouter()
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>();

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get(`api/website/pagefindone/get${router.asPath}`);
      if (isMountedRef.current) {

        setPagedata(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [isMountedRef]);



  useEffect(() => {
    getPagedata();

  }, []);

  const data = {
    abroadpagefaqs: [
      {
        questions: "How can I apply for an educational loan?",
        answers: "<p>You can apply for an educational loan through banks, financial institutions, or directly through the educational institution's loan programs (if available).</p>"
      },
      {
        questions: "What is the repayment period for an educational loan?",
        answers: "<p>Repayment periods can vary but typically range from 5 to 15 years, depending on the loan terms and lender.</p>"
      },
      {
        questions: "What should you do if my loan application is denied?",
        answers: "<p>If your application is denied, review the reasons provided, address any issues, and consider reapplying or exploring alternative funding options.</p>"
      },
      {
        questions: "Can I consolidate my educational loans?",
        answers: "<p>Yes, many lenders offer loan consolidation options to combine multiple loans into a single loan with one payment.</p>"
      },
      {
        questions: "Are there any tax benefits associated with educational loans?",
        answers: "<p>In some cases, you may qualify for tax deductions on interest paid on educational loans. Consult a CA/ Auditor/ Tax Advisor for details.</p>"
      }
    ]
  };


  return (
    <>
      <Head>
        <title>{pagedata && pagedata?.meta_title ? pagedata?.meta_title : "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata && pagedata?.meta_description ? pagedata?.meta_description : "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."} />
          < meta name="keywords" content={pagedata && pagedata?.meta_keyword ? pagedata?.meta_keyword : "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
      </Head>
      <BannerSec />
      <AboutSec pagedata={pagedata} />
      <LoanCalculator />
      <DetailSec />
      <StepSection />
      <BankSec />
      <FaqSec data={data} />
    </>
  )
}

export default EducationLoanPage
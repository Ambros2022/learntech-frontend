import BannerSec from './Components/BannerSec'
import AboutSec from './Components/AboutSec'
import DetailSec from './Components/DetailSec'
import StepSection from './Components/StepsSection'
import BankSec from './Components/BankSec'
import FaqSec from './Components/FaqSec'
import { LazyLoanCalculator } from 'src/app/components/ClientWrappers'

type FaqItem = {
  questions: string
  answers: string
}

type EducationLoanPageProps = {
  pagedata: any
  faqData: FaqItem[]
}

const EducationLoanPage = ({ pagedata, faqData }: EducationLoanPageProps) => {
  const data = { abroadpagefaqs: faqData }

  return (
    <>
      <BannerSec />
      <AboutSec pagedata={pagedata} />
      <LazyLoanCalculator />
      <DetailSec />
      <StepSection />
      <BankSec />
      <FaqSec data={data} />
    </>
  )
}

export default EducationLoanPage
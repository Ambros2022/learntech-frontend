import BannerSec from './Components/BannerSec'
import { LazyMedicalSec as MedicalSec, LazyTopCountrySec as TopCountrySec } from 'src/app/components/ClientWrappers'
import FaqSec from '../EducationLoanPage/Components/FaqSec'
import ImportantSec from './Components/ImportantSec'
import ExpertSec from './Components/ExpertSec'

type FaqItem = {
  questions: string
  answers: string
}

type Tag = {
  id: number
  country_id: number
  name: string
  slug: string
  country: {
    id: number
    name: string
  }
}

type MbbsAbroadPageProps = {
  pagedata: any
  tags: Tag[]
  faqData: FaqItem[]
}

const MbbsAbroadPage = ({ pagedata, tags, faqData }: MbbsAbroadPageProps) => {
  const data = { abroadpagefaqs: faqData }

  return (
    <>
      <BannerSec />
      <MedicalSec data={pagedata} />
      <TopCountrySec />
      <FaqSec data={data} />
      <ImportantSec tags={tags} />
      <ExpertSec />
    </>
  )
}

export default MbbsAbroadPage
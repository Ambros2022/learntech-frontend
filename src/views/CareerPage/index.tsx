import BannerSec from './Components/BannerSec'
import AboutSec from './Components/AboutSec'
import CurrentOpeningSec from './Components/CurrentOpeningSec'
import ContactCareerSec from './Components/ContactCareerSec'
import DisclaimerSec from './Components/DisclaimerSec'

interface Props {
  pageData: any
  jobData: any[]
  locations: any[]
}

export default function CareerPage({ pageData, jobData, locations }: Props) {
  return (
    <>
      <BannerSec />
      <AboutSec data={pageData} />
      <CurrentOpeningSec jobData={jobData} />
      <ContactCareerSec locations={locations} data={jobData} />
      <DisclaimerSec data={pageData} />
    </>
  )
}


import BannerSec from './Components/BannerSec'
import ScholarshipAbroadSec from './Components/ScholarshipAbroadSec'
import FilterSec from './Components/FilterSec'

type ScholarshipPageProps = {
  pagedata: any
  abroadData: any[]
  levelOptions: any[]
  typeOptions: any[]
  countryData: any[]
  tabCountries: any[]
  banners: any[]
  initialScholarships: any[]
  initialTotalItems: number
}

const ScholarshipPage = ({
  pagedata,
  abroadData,
  levelOptions,
  typeOptions,
  countryData,
  tabCountries,
  banners,
  initialScholarships,
  initialTotalItems,
}: ScholarshipPageProps) => {
  return (
    <>
      <BannerSec />
      <ScholarshipAbroadSec data={pagedata} banners={banners} />
      <FilterSec
        abroadData={abroadData}
        levelOptions={levelOptions}
        typeOptions={typeOptions}
        countryData={countryData}
        tabCountries={tabCountries}
        initialScholarships={initialScholarships}
        initialTotalItems={initialTotalItems}
      />
    </>
  )
}

export default ScholarshipPage
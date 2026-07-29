import { type UpcomingExam } from 'src/lib/api/common'
import BannerSection from './Components/BannerSec'
import TopExamSec from './Components/TopExamSec'
import BrowsebyCategorySec from './Components/BrowseByCategorySec'

interface Props {
  pagedata: any
  countryData: any[]
  streams: any[]
  newsData: any[]
  newsDataAbroad: any[]
  initialExams: any[]
  initialExamsTotalPages: number
  initialAbroadExams: any[]
  initialAbroadExamsTotalPages: number
  initialAbroadExamsTotalItems: number
  upcomingExams: UpcomingExam[]
}

// Server Component — no 'use client' or React lifecycle hooks.
// All initial data fetches have been moved to the page.tsx file.
export default function MainExamPage({
  pagedata,
  countryData,
  streams,
  newsData,
  newsDataAbroad,
  initialExams,
  initialExamsTotalPages,
  initialAbroadExams,
  initialAbroadExamsTotalPages,
  initialAbroadExamsTotalItems,
  upcomingExams,
}: Props) {
  return (
    <>
      <BannerSection upcomingExams={upcomingExams} />
      <TopExamSec data={pagedata} />
      <BrowsebyCategorySec
        countryData={countryData}
        streams={streams}
        newsData={newsData}
        newsDataAbroad={newsDataAbroad}
        initialExams={initialExams}
        initialExamsTotalPages={initialExamsTotalPages}
        initialAbroadExams={initialAbroadExams}
        initialAbroadExamsTotalPages={initialAbroadExamsTotalPages}
        initialAbroadExamsTotalItems={initialAbroadExamsTotalItems}
      />
    </>
  )
}
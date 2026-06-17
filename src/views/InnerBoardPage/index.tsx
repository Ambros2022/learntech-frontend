import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import LocationSection from './Components/LocateSection'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import { Breadcrumb } from 'src/app/components/Breadcrumb'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const suffix =
    day >= 11 && day <= 13 ? 'th'
      : day % 10 === 1 ? 'st'
        : day % 10 === 2 ? 'nd'
          : day % 10 === 3 ? 'rd'
            : 'th'
  const [month, year] = date
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    .split(' ')
  return `${day}${suffix} ${month} ${year}`
}

type Props = {
  pagedata: any
  exams: any[]
  schools: any[]
}

export default function InnerBoardPage({ pagedata, exams, schools }: Props) {
  const now = new Date()
  const upcomingExams = exams
    .map((exam: any) => ({ ...exam, upcoming_date: new Date(exam.upcoming_date) }))
    .filter((exam: any) => exam.upcoming_date >= now)
    .sort((a: any, b: any) => a.upcoming_date.getTime() - b.upcoming_date.getTime())
    .map((exam: any) => ({ ...exam, date: formatDate(exam.upcoming_date.toISOString()) }))

  return (
    <>
      <BannerSection data={pagedata} />
      <div className="container InnerCollegeNavigationLink linkFontSize py-3">
        <Breadcrumb
          items={[
            { label: 'Boards', href: '/boards' },
            { label: pagedata.short_name },
          ]}
        />
      </div>
      <CollegeInfoSection data={pagedata} exams={upcomingExams} />
      <LocationSection data={pagedata} />
      <TopFeaturedColleges schools={schools} />
    </>
  )
}

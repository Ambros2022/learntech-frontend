import React from 'react'
import InnerHeader from 'src/views/SimplePage/InnerHeader'
import { LazyExamSearchBar, LazyUpcomingExams, LazyGlobalEnquiryFormExams } from 'src/app/components/ClientWrappers'
import { type UpcomingExam } from 'src/lib/api/common'
import { Breadcrumb } from 'src/app/components/Breadcrumb'

interface Props {
  upcomingExams: UpcomingExam[]
}

export default function BannerSection({ upcomingExams }: Props) {
  const hasExams = upcomingExams.length > 0

  return (
    <>
    <InnerHeader
      title="Entrance Exams in India and Abroad"
      minHeight={hasExams ? 420 : 220}
    >
      {/* Search bar */}
      <div className="row justify-content-center align-items-center mb-2">
        <div className="col-md-5 col-12">
          <LazyExamSearchBar />
        </div>
      </div>

      {/* Upcoming exams carousel — hidden when empty */}
      {hasExams && (
        <>
          <div className="row text-white text-md-start text-center pt-3 mb-3">
            <h2>Upcoming Entrance Exams</h2>
          </div>
          <div className='popularcourse'>
            <LazyUpcomingExams upcomingExams={upcomingExams} />
          </div>
        </>
      )}

      {/* CTA */}
      <div className='text-md-end text-center pt-4'>
        <LazyGlobalEnquiryFormExams
          buttonText="Get Exams Alert"
          className="btn alertExamBtn"
        />
      </div>
    </InnerHeader>
     <Breadcrumb items={[{ label: 'Exams' }]} />
     </>
  )
}
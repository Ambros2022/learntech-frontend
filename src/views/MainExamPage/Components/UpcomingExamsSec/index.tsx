'use client'
import React from 'react'
import Link from 'next/link'
import EmblaCarousel from 'src/components/ui/Embla/EmblaCarousel'
import { type UpcomingExam } from 'src/lib/api/common'

interface Props {
  upcomingExams: UpcomingExam[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const suffix = (n: number) => {
    if (n >= 11 && n <= 13) return 'th'
    switch (n % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }
  const [month, year] = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).split(' ')
  return `${day}${suffix(day)} ${month} ${year}`
}

function ExamCard({ id, title, date, slug }: { id: number; title: string; date: string; slug: string }) {
  return (
    <Link href={`/exam/${id}/${slug}`} style={{ textDecoration: 'none' }}>
      <div className="card text-center hover-card bg-skyBlue d-flex mx-2 border-0">
        <div className="row flex-fill">
          <div className="col-12 text-center text-md-start px-0">
            <div className="ms-2 card-body">
              <h4 className="card-title fw-bold text-blue text-truncate">{title}</h4>
              <h6 className="card-title mainText flex-fill text-truncate text-black">{date}</h6>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function PopularCourses({ upcomingExams }: Props) {
  if (!upcomingExams?.length) return null

  return (
    <section>
      <div
        className="topCarouselCardsCon bg-examsCarouselCr examsCardCarousel px-5 pt-3 pb-3 position-relative"
        style={{ zIndex: 2 }}
      >
        <EmblaCarousel
          showDots={false}
          showArrows
          loop
          autoplay
          autoplayDelay={2000}
          slidesToShowDesktop={7}
          slidesToShowTablet={4}
          slidesToShowMobile={1}
        >
          {upcomingExams.map(exam => (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.exam_title}
              date={formatDate(exam.upcoming_date)}
              slug={exam.slug}
            />
          ))}
        </EmblaCarousel>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import ScrollTabs from 'src/components/ui/ScrollTabs'
import type { TabItem } from 'src/components/ui/ScrollTabs'
import { LazySideContactUsForm, LazyBoardFaqSec } from 'src/app/components/ClientWrappers'
import styles from './OverviewTabsClient.module.css'

// ── types ──────────────────────────────────────────────────────────────────

export interface ExamTabItem {
  id: string
  label: string
  content: string | null
  isFaq?: boolean
  faqData?: { questions: string; answers: string }[]
}

export interface UpcomingExamItem {
  id: number
  slug: string
  title: string
  date: string // pre-formatted string
}

interface Props {
  items: ExamTabItem[]
  upcomingExams: UpcomingExamItem[]
}

// ── component ──────────────────────────────────────────────────────────────

export default function OverviewTabsClient({ items, upcomingExams }: Props) {
  const [activeTab, setActiveTab] = useState<string>(items[0]?.id ?? '')

  const tabItems: TabItem[] = items.map(item => ({ id: item.id, label: item.label }))
  const active = items.find(item => item.id === activeTab)

  return (
    <div className={styles.wrapper}>

      {/* ── Tab navigation — same ScrollTabs as CollegeInfoSection ── */}
      <ScrollTabs
        tabs={tabItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        alwaysShowArrows
      />

      {/* ── Tab content + sidebar ────────────────────────────────────── */}
      <div className="row">

        {/* Left: tab body */}
        <div className="col-md-8 text-black pt-3">
          {active?.isFaq && active.faqData?.length ? (
            <LazyBoardFaqSec data={active.faqData} />
          ) : active?.content ? (
            <div className="text-black pt-3">
              <div dangerouslySetInnerHTML={{ __html: active.content }} />
            </div>
          ) : null}
        </div>

        {/* Right: contact form + upcoming exams */}
        <div className={`col-md-4 mb-md-5 pt-5 ${styles.sidebar}`}>
          <div className='bg-skyBlue px-lg-5 px-3 mb-5 rounded'>
            <h2 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h2>
            <LazySideContactUsForm />
          </div>

          {upcomingExams.length > 0 && (
            <>
              <h4 className='fw-bold text-blue text-center mb-3'>Upcoming Exams</h4>
              <div
                className='bg-skyBlue blogSec examLatest mt-3 px-4 py-3 position-relative rounded'
                style={{ zIndex: 2 }}
              >
                <div className="row overflow-y-auto" style={{ maxHeight: 'calc(4 * 102px)' }}>
                  {upcomingExams.map((exam, index) => (
                    <div className="col-12" key={index}>
                      <Link href={`/exam/${exam.id}/${exam.slug}`}>
                        <div className="card mb-3 bg-skyBlue hover-card cardInnerExam">
                          <div className="row p-3 d-flex flex-row">
                            <div className="col-xl-7 col-lg-7 col-md-12 col-6 align-content-center mb-lg-0 mb-md-3 mb-0">
                              <p className='fw-bold text-blue mb-0 text-center examNewsText border-circle align-content-center text-md-truncate'>
                                {exam.date}
                              </p>
                            </div>
                            <div className="col-xl-5 col-lg-5 col-md-12 col-6 align-content-center">
                              <h6 className="card-title text-center fw-bold mb-0 align-content-center">
                                {exam.title}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

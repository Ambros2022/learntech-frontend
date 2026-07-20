'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import ScrollTabs from 'src/components/ui/ScrollTabs'
import { GlobalEnquiryForm, LazyBoardFaqSec } from 'src/app/components/ClientWrappers'
import type { TabItem } from 'src/components/ui/ScrollTabs'

export interface CourseTabData {
  id: string
  label: string
  html?: string
  courses?: { id: number; slug: string; name: string; duration: string }[]
  faqData?: { questions: string; answers: string }[]
}

interface Props {
  tabs: CourseTabData[]
  streamId: number
  streamSlug: string
  children: ReactNode
}

export default function CourseInfoTabsClient({ tabs, streamId, streamSlug, children }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 'overview')

  const tabItems: TabItem[] = tabs.map(t => ({ id: t.id, label: t.label }))
  const active = tabs.find(t => t.id === activeTab)

  return (
    <div className="container position-relative">
      <ScrollTabs tabs={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="row">
        <div className="col-12 pe-md-5">
          <div className="tab-content pt-3 bs-editor-text">

            {/* HTML tabs: overview, top colleges */}
            {active?.html && activeTab !== 'faq' && (
              <div dangerouslySetInnerHTML={{ __html: active.html }} />
            )}

            {/* Course type tabs: UG, PG, Doctorate, Diploma */}
            {active?.courses && active.courses.length > 0 && (
              <div>
                {active.courses.map(item => (
                  <div key={item.id} className="col-12 mb-3">
                    <div className="card bg-skyBlue hover-card p-3">
                      <h5 className='fw-bold text-blue text-center mb-3'>{item.name}</h5>
                      <h5 className='text-blue text-center mb-3'>
                        <span className='fw-bold'>Duration:</span>{' '}
                        <span className='text-black'>{item.duration}</span>
                      </h5>
                      <div className='justify-content-center d-flex gap-3 flex-wrap'>
                        <GlobalEnquiryForm buttonText='Apply Now' className='btn viewMoreCollegeBtn' />
                        <Link className='btn viewDetailBtn' href={`/course/${streamId}/${streamSlug}/${item.slug}`}>
                          View Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FAQ — lazy, mounts only when tab active */}
            {activeTab === 'faq' && active?.faqData && <LazyBoardFaqSec data={active.faqData} />}
          </div>
        </div>

        {/* Sidebar slot — server-rendered by parent */}
        {children}
      </div>
    </div>
  )
}

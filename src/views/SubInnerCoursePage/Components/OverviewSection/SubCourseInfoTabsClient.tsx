'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import ScrollTabs from 'src/components/ui/ScrollTabs'
import { LazyBoardFaqSec, GlobalEnquiryForm } from 'src/app/components/ClientWrappers'

export interface SubCourseTabData {
  id: string
  label: string
  html?: string
  courses?: { id: number; name: string; short_name: string; duration: string; slug: string; href: string }[]
  faqData?: { questions: string; answers: string }[]
}

interface Props {
  tabs: SubCourseTabData[]
  children: ReactNode
}

export default function SubCourseInfoTabsClient({ tabs, children }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 'overview')
  const active = tabs.find(t => t.id === activeTab)
  const tabItems = tabs.map(t => ({ id: t.id, label: t.label }))

  return (
    <div className="container position-relative">
      <ScrollTabs tabs={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="row pt-3">
        <div className="col-md-8 col-lg-9 pe-md-5 minehightinnercourse bs-editor-text">
          {active?.html && activeTab !== 'faq' && (
            <div className="minehightcoursesneew" dangerouslySetInnerHTML={{ __html: active.html }} />
          )}
          {active?.courses && active.courses.length > 0 && (
            <div className="row">
              {active.courses.map((item, i) => (
                <div key={item.id ?? i} className="col-md-6 mb-3">
                  <div className="card bg-skyBlue hover-card p-3">
                    <h5 className='fw-bold text-blue text-center mb-3'>{item.name}</h5>
                    <h5 className='fw-bold text-blue text-center mb-3'>{item.short_name}</h5>
                    <h5 className='text-blue text-center mb-3'>
                      <span className='fw-bold'>Duration:</span>{' '}
                      <span className='text-black'>{item.duration}</span>
                    </h5>
                    <div className='justify-content-center d-flex gap-3 flex-wrap'>
                      <GlobalEnquiryForm buttonText='Apply Now' className='btn viewMoreCollegeBtn' collegeName={item.name} />
                      <Link className='btn viewDetailBtn' href={item.href}>View Detail</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'faq' && active?.faqData && (
            <LazyBoardFaqSec data={active.faqData} />
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

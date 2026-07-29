'use client'

import { useState, type ReactNode } from 'react'

type ServiceTabsProps = {
  studentsContent: ReactNode
  collegesContent: ReactNode
}

const ServiceTabs = ({ studentsContent, collegesContent }: ServiceTabsProps) => {
  const [activeTab, setActiveTab] = useState<'students' | 'colleges'>('students')

  return (
    <>
      <div className="d-flex gap-3 flex-wrap ServiceTabs flex-row" id="myTab">
        <button
          type="button"
          className={`btn nav-link ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Digital Marketing Activities
        </button>
        <button
          type="button"
          className={`btn nav-link ${activeTab === 'colleges' ? 'active' : ''}`}
          onClick={() => setActiveTab('colleges')}
        >
          Field Marketing Initiatives
        </button>
      </div>
      <div className="tab-content pt-3">
        <div className={`advh3 tab-pane fade ${activeTab === 'students' ? 'show active' : ''}`} role="tabpanel">
          {studentsContent}
        </div>
        <div className={`advh3 tab-pane fade ${activeTab === 'colleges' ? 'show active' : ''}`} role="tabpanel">
          {collegesContent}
        </div>
      </div>
    </>
  )
}

export default ServiceTabs

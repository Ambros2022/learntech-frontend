'use client'
import { useState, type ReactNode } from 'react'

interface Props {
  studentsContent: ReactNode
  collegesContent: ReactNode
}

export default function StudentsTextTabsClient({ studentsContent, collegesContent }: Props) {
  const [activeTab, setActiveTab] = useState('students')

  return (
    <>
      <div className="d-flex gap-3 flex-wrap ServiceTabs flex-row" id="myTab">
        <button
          className={`btn nav-link ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          For Students
        </button>
        <button
          className={`btn nav-link ${activeTab === 'colleges' ? 'active' : ''}`}
          onClick={() => setActiveTab('colleges')}
        >
          For Colleges and Universities
        </button>
      </div>
      <div className="tab-content pt-3 serviceh2">
        <div className={`tab-pane fade ${activeTab === 'students' ? 'show active' : ''}`} role="tabpanel">
          {studentsContent}
        </div>
        <div className={`tab-pane fade ${activeTab === 'colleges' ? 'show active' : ''}`} role="tabpanel">
          {collegesContent}
        </div>
      </div>
    </>
  )
}

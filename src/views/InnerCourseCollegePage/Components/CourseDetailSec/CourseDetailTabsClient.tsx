'use client'
import { useState } from 'react'
import ScrollTabs from 'src/components/ui/ScrollTabs'

export interface CourseTabData {
  id: string
  label: string
  html?: string
}

export default function CourseDetailTabsClient({ tabs }: { tabs: CourseTabData[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? '')

  return (
    <>
      <ScrollTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="tab-content pt-5">
        {tabs.map(tab => (
          <div key={tab.id} className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}>
            <div dangerouslySetInnerHTML={{ __html: tab.html ?? '' }} />
          </div>
        ))}
      </div>
    </>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollTabs from 'src/components/ui/ScrollTabs'
import { LazyGlobalEnquiryForm, LazyReviewSec, LazyBoardFaqSec } from 'src/app/components/ClientWrappers'
import type { TabItem } from 'src/components/ui/ScrollTabs'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export interface CollegeTabData {
  id: string
  label: string
  html?: string
  imageUrl?: string
  videoUrl?: string
  gallery?: { image: string }[]
  faqData?: { questions: string; answers: string }[]
}

interface Props {
  tabs: CollegeTabData[]
  collegeName: string
  collegeId: number
}

export default function CollegeInfoTabsClient({ tabs, collegeName, collegeId }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 'info')

  const tabItems: TabItem[] = tabs.map(t => ({ id: t.id, label: t.label }))
  const active = tabs.find(t => t.id === activeTab)

  return (
    <div className="container position-relative innerClgCarousel">
      <ScrollTabs tabs={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="tab-content pt-5">
        {/* Info */}
        {activeTab === 'info' && active?.html && (
          <div className="row">
            <div className="col-md-7 col-lg-8 bs-editor-text">
              <div dangerouslySetInnerHTML={{ __html: active.html }} />
            </div>
            <div className="col-md-5 col-lg-4">
              {active.imageUrl && (
                <div className="position-relative innerClgImg2 mb-md-5 mb-3">
                  <Image src={`${IMG_BASE}/${active.imageUrl}`} alt={collegeName} width={700} height={700} loading="lazy" className="rounded img-fluid" />
                  <div className="position-absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <LazyGlobalEnquiryForm className="viewMoreCollegeBtn btn" collegeName={collegeName} />
                  </div>
                </div>
              )}
              {active.videoUrl && (
                <div className="clgVideo rounded">
                  <iframe width="100%" height="100%" className="rounded" src={active.videoUrl} title="College video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
              )}
            </div>
          </div>
        )}

        {/* HTML tabs */}
        {activeTab !== 'info' && activeTab !== 'gallery' && activeTab !== 'review' && activeTab !== 'faq' && active?.html && (
          <div dangerouslySetInnerHTML={{ __html: active.html }} />
        )}

        {/* Gallery */}
        {activeTab === 'gallery' && active?.gallery && (
          <div className="row">
            {active.gallery.map((item, i) => (
              <div key={i} className="col-6 col-md-4 p-4">
                <Image src={`${IMG_BASE}/${item.image}`} alt={`Gallery ${i + 1}`} width={500} height={300} loading="lazy" className="img-fluid rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Review — lazy, only mounts when tab active */}
        {activeTab === 'review' && <LazyReviewSec entityId={collegeId} entityName={collegeName} />}

        {/* FAQ — lazy, only mounts when tab active */}
        {activeTab === 'faq' && active?.faqData && <LazyBoardFaqSec data={active.faqData} />}
      </div>
    </div>
  )
}

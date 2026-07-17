'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollTabs from 'src/components/ui/ScrollTabs'
import { LazyBoardFaqSec, LazyReviewSec, LazyContactForm } from 'src/app/components/ClientWrappers'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

const EMPTY_CONTENT_VALUES = new Set(['', 'null', '<p>null</p>', '<p><br></p>'])

function isValidContent(v: any): boolean {
  if (!v) return false
  if (typeof v === 'string') return !EMPTY_CONTENT_VALUES.has(v.trim())
  return true
}

const CollegeInfoSection = ({ data, exams }: { data: any; exams: any[] }) => {
  const [activeTab, setActiveTab] = useState('info')

  const tabs = useMemo(() => {
    const all = [
      { id: 'info', label: 'Info', content: data.info },
      { id: 'time_table', label: 'Time Table', content: data.time_table },
      { id: 'reg_form', label: 'Registration Form', content: data.reg_form },
      { id: 'syllabus', label: 'Syllabus', content: data.syllabus },
      { id: 'results', label: 'Results', content: data.results },
      {
        id: 'sample_paper',
        label: 'Sample Papers',
        content: data.sample_paper && data.sample_paper > 0 ? data.sample_paper : null,
      },
      { id: 'hostel', label: 'Infrastructure', content: data.hostel },
      { id: 'gallery', label: 'Gallery', content: data.clggallery },
      { id: 'review', label: 'Reviews', content: <LazyReviewSec entityId={data.id} entityName={data.name} /> },
      {
        id: 'schoolboardfaqs',
        label: 'FAQ',
        content: data.schoolboardfaqs?.length
          ? <LazyBoardFaqSec data={data.schoolboardfaqs} />
          : null,
      },
    ]
    return all.filter((tab) => isValidContent(tab.content))
  }, [data])

  return (
    <>
      <section className="clgInfoSec bg-white">
        <div className="container bg-white position-relative innerClgCarousel">
          <ScrollTabs
            tabs={tabs.map((t) => ({ id: t.id, label: t.label }))}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <div className="row">
            {activeTab === 'info' ? (
              <>
                <div className="col-xl-8 col-lg-8 col-md-7 col-12 mx-auto">
                  <div className="tab-content pt-3">
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
                      >
                        {typeof tab.content === 'string' ? (
                          <div dangerouslySetInnerHTML={{ __html: tab.content }} />
                        ) : (
                          tab.content
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-5 col-12 mx-auto py-5">
                  <LazyContactForm heading="Contact Us" />
                  {exams.length > 0 && (
                    <>
                      <h2 className="fw-bold text-blue pt-3 mb-3 text-center mt-5">Upcoming Exams</h2>
                      <div
                        className="col-12 cardConBrdr p-3 overflow-y-auto bg-skyBlue my-3"
                        style={{ maxHeight: 'calc(7 * 90px)' }}
                      >
                        {exams.map((exam, index) => (
                          <Link href={`/exam/${exam.id}/${exam.slug}`} key={index}>
                            <div className="card bg-skyBlue hover-card p-2 d-flex mb-3">
                              <div className="row">
                                <div className="col-xl-5 col-lg-5 col-md-5 mx-auto text-md-start text-center">
                                  <Image
                                    src={`${IMG_URL}/${exam.logo}`}
                                    alt={exam.exam_title || 'exam'}
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                    className="align-self-center innerBoardImg"
                                  />
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 d-flex pt-md-0 pt-3 justify-content-md-start justify-content-center">
                                  <h6 className="m-0 align-self-center text-md-start text-center fw-bold text-black ms-2 mb-0">
                                    {exam.exam_title} Exam
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="col-12">
                <div className="tab-content pt-5">
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
                    >
                      {typeof tab.content === 'string' ? (
                        <div dangerouslySetInnerHTML={{ __html: tab.content }} />
                      ) : (
                        tab.content
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CollegeInfoSection

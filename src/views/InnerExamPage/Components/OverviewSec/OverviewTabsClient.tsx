'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { Tooltip } from '@mui/material'
import { LazySideContactUsForm, LazyBoardFaqSec } from 'src/app/components/ClientWrappers'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface TabItem {
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
  items: TabItem[]
  upcomingExams: UpcomingExamItem[]
}

export default function OverviewTabsClient({ items, upcomingExams }: Props) {
  const [activeTab, setActiveTab] = useState<string>(items[0]?.id ?? '')
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    align: 'start',
    loop: true,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className='carouselInnerCourse position-relative exam' style={{ zIndex: 2 }}>
      {/* ── Custom stylesheet inline to mimic react-multi-carousel item widths exactly without altering global CSS ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .exam-tabs-embla-viewport {
              overflow: hidden;
              width: 100%;
            }
            .exam-tabs-embla-container {
              display: flex;
              width: 100%;
            }
            .exam-tabs-embla-slide {
              flex: 0 0 14.2857% !important;
              min-width: 0;
            }
            @media (max-width: 1024px) {
              .exam-tabs-embla-slide {
                flex: 0 0 20% !important;
              }
            }
            @media (max-width: 768px) {
              .exam-tabs-embla-slide {
                flex: 0 0 33.3333% !important;
              }
            }
            @media (max-width: 464px) {
              .exam-tabs-embla-slide {
                flex: 0 0 50% !important;
              }
            }
            @media (max-width: 767px) {
              .exam-tabs-embla-viewport {
                flex: 1 1 auto !important;
                position: relative !important;
                width: 240px !important;
                margin: 0 auto !important;
              }
              .carouselInnerCourse .carousel-button-group {
                width: 240px !important;
                left: 0 !important;
                right: 0 !important;
                margin: 0 auto !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
              }
              .carouselInnerCourse .fi-left {
                margin-left: -60px !important;
              }
              .carouselInnerCourse .fi-right {
                margin-right: -60px !important;
              }
            }
          `,
        }}
      />

      {/* ── Tab navigation carousel ─────────────────────────────────────── */}
      <div className="react-multi-carousel-list pt-2 text-center infoBtn infoBtn2 justify-content-between d-flex position-relative">
        <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
          <span className='fi-left' onClick={scrollPrev}>
            <ChevronLeft style={{ cursor: 'pointer' }} />
          </span>
          <span className='fi-right' onClick={scrollNext}>
            <ChevronRight style={{ cursor: 'pointer' }} />
          </span>
        </div>

        <div className="exam-tabs-embla-viewport" ref={emblaRef}>
          <div className="react-multi-carousel-track d-flex exam-tabs-embla-container">
            {items.map((item) => (
              <div key={item.id} className="react-multi-carousel-item exam-tabs-embla-slide">
                <Tooltip title={item.label} arrow>
                  <button
                    className={`btn py-2 mx-2 nav-item ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      whiteSpace: 'nowrap',
                      fontSize: '13px',
                      width: 'auto',
                    }}
                  >
                    {item.label}
                  </button>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab content + sidebar ────────────────────────────────────────── */}
      <div className="row">
        {/* Left column — tab body */}
        <div className="col-md-8 text-black pt-3">
          <div className="tab-content" id="nav-tabContent">
            {items.map((item) => (
              <div
                key={item.id}
                className={`tab-pane fade ${activeTab === item.id ? 'show active' : ''}`}
                id={`nav-${item.id}`}
                role="tabpanel"
                aria-labelledby={`nav-${item.id}-tab`}
              >
                {item.isFaq && item.faqData?.length ? (
                  <LazyBoardFaqSec data={item.faqData} />
                ) : item.content ? (
                  <div className="row">
                    <div className="text-black pt-3">
                      {/* Render exact original HTML content with no ReadMore wrapper */}
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Right column — contact form + upcoming exams */}
        <div className="col-md-4 mb-md-5 fixed-column pt-5">
          <div className='bg-skyBlue px-lg-5 px-3 mb-5 rounded'>
            <h2 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h2>
            <LazySideContactUsForm />
          </div>

          {upcomingExams.length > 0 && (
            <>
              <h4 className='fw-bold text-blue text-start pt-0 pt-md-3 text-center mb-3'>
                Upcoming Exams
              </h4>
              <div
                className='bg-skyBlue blogSec examLatest mt-3 px-4 py-3 position-relative rounded'
                style={{ zIndex: 2 }}
              >
                <div
                  className="row overflow-y-auto"
                  style={{ maxHeight: 'calc(4 * 102px)' }}
                >
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

import Image from 'next/image'
import { format } from 'date-fns'
import { LazyExamAlertButton } from 'src/app/components/ClientWrappers'
import { Breadcrumb } from 'src/app/components/Breadcrumb'
import NewsLinkSection from '../NewsLinkSection'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

interface Props {
  data: any
  newsLinks: any[]
}

// Server Component — no 'use client'.
// Renders H1 (exam title + date) SSR for maximum LCP & SEO.
export default function BannerSec({ data, newsLinks }: Props) {
  const examDate = data?.upcoming_date
    ? format(new Date(data.upcoming_date), 'd MMM yyyy')
    : 'Date not available'

  return (
    <>
      <section className='collegeBannerCon bg-blue examsBannerCon pt-4 pb-4'>
        <div className='d-flex justify-content-center w-100 h-100'>
          <div className='align-content-center w-100 container'>
            <div className="row">
              <div className="col-lg-8 col-md-9 mx-md-auto innerExam">
                <div className="card mb-2">
                  <div className="row g-0 d-flex flex-row">
                    <div className="col-md-2 text-center mx-md-0 mx-auto d-flex justify-content-center">
                      <div className='innerClgImg'>
                        <Image
                          src={`${IMG_BASE}/${data?.logo}`}
                          alt={data?.exam_title ? `${data.exam_title} logo` : 'Exam logo'}
                          width={100}
                          height={100}
                          loading="lazy"
                          decoding="async"
                          className="img-fluid p-2 bg-white rounded"
                        />
                      </div>
                    </div>
                    <div className="col-md-9 d-flex justify-content-center justify-content-md-start align-content-center">
                      <div className="align-content-center">
                        <div className="p-lg-3">
                          {/* H1 — critical for LCP & SEO, rendered server-side */}
                          <h1 className="fw-bold text-white card-title py-3 py-md-0">
                            {data?.exam_title} Exam : {examDate}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-3 d-flex justify-content-center mb-3">
                <div className="align-content-center">
                  <div className='text-md-end text-center'>
                    {/* Client wrapper needed — buttonText contains JSX icon */}
                    <LazyExamAlertButton examTitle={data?.exam_title ?? ''} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News carousel — data pre-fetched server-side */}
      <NewsLinkSection newsLinks={newsLinks} />

      {/* Breadcrumb — server-rendered, paired with BreadcrumbList JSON-LD in page.tsx */}
      <Breadcrumb
        items={[
          { label: 'Exams', href: '/exams' },
          { label: data?.exam_title ?? 'Exam' },
        ]}
      />
    </>
  )
}

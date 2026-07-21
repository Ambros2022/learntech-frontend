import Image from 'next/image'
import Link from 'next/link'
import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'
import SubCourseInfoTabsClient, { SubCourseTabData } from './SubCourseInfoTabsClient'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL ?? '').replace(/\/+$/, '')

interface Props {
  data: any
  colleges: any[]
  exams: any[]
}

export default function OverviewSection({ data, colleges, exams }: Props) {
  const tabs: SubCourseTabData[] = ([
    data?.description
      ? { id: 'overview', label: 'Overview', html: data.description }
      : null,
    (() => {
      if (!data?.top_college) return null
      if (Array.isArray(data.top_college) && data.top_college.length > 0)
        return {
          id: 'top-colleges',
          label: 'Top Colleges',
          courses: data.top_college.map((item: any) => ({
            ...item,
            href: `/course/${item.id}/${data.slug}/${item.slug}`,
          })),
        }
      if (typeof data.top_college === 'string' && data.top_college)
        return { id: 'top-colleges', label: 'Top Colleges', html: data.top_college }
      return null
    })(),
    data?.admissions ? { id: 'admissions', label: 'Admissions', html: data.admissions } : null,
    data?.syllabus ? { id: 'syllabus', label: 'Syllabus', html: data.syllabus } : null,
    data?.career_opportunities ? { id: 'career', label: 'Career Opportunities', html: data.career_opportunities } : null,
    data?.generalcoursefaqs?.length > 0
      ? { id: 'faq', label: 'FAQ', faqData: data.generalcoursefaqs }
      : null,
  ] as (SubCourseTabData | null)[]).filter((t): t is SubCourseTabData => !!t)

  return (
    <section className='clgInfoSec innerClgCarousel bg-white subinner py-4'>
      <SubCourseInfoTabsClient tabs={tabs}>
        {/* Sidebar — server-rendered (zero hydration cost, SEO-crawlable) */}
        <div className="row imgCardConCrs">
          {(data?.banner || data?.streams?.banner) && (
            <div className="col-12 col-md-6 col-lg-12 mb-4">
              <div className='dental-crs-img flex-column d-flex justify-content-center align-items-center p-3 border rounded bg-white text-center h-100'>
                <Image
                  src={`${IMG_URL}/${data?.banner || data?.streams?.banner}`}
                  width={600}
                  height={600}
                  alt={`${data?.name ?? 'course'} image`}
                  className='img-fluid mb-3'
                  style={{ maxHeight: '220px', objectFit: 'contain' }}
                />
                <h6 className='text-center fw-bold mb-3'>Are you interested in this course?</h6>
                <GlobalEnquiryForm className="mb-2 btn chkEligBtn w-100" buttonText="Check Eligibility" />
              </div>
            </div>
          )}

          {colleges?.length > 0 && (
            <div className="col-12 col-md-6 col-lg-12 mb-4">
              <h4 className='fw-bold text-blue text-center mb-3'>Top {data?.streams?.name} Colleges</h4>
              <div
                className="cardConBrdr p-3 text-center overflow-y-auto bg-skyBlue rounded"
                style={{ maxHeight: '450px' }}
              >
                {colleges.map((val: any) => (
                  <Link key={val.id} href={`/college/${val.id}/${val.slug}`}>
                    <div className="card p-3 mb-3 d-flex flex-row bg-skyBlue hover-card">
                      <div className="row align-items-center w-100 m-0">
                        <div className="col-4 p-0">
                          <Image
                            src={`${IMG_URL}/${val.banner_image}`}
                            width={120}
                            height={80}
                            alt={val.name}
                            className='img-fluid rounded'
                            style={{ width: '100%', height: '65px', objectFit: 'cover', borderRadius: '6px' }}
                            loading="lazy"
                          />
                        </div>
                        <div className="col-8 ps-2 text-start">
                          <h6 className='text-start text-black fw-bold mb-0 small'>{val.name}</h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {exams?.length > 0 && (
            <div className="col-12 col-md-6 col-lg-12 mb-4">
              <h4 className='fw-bold text-blue text-center mb-3'>Top {data?.streams?.name} Exams</h4>
              <div
                className="cardConBrdr p-3 overflow-y-auto text-center bg-skyBlue rounded"
                style={{ maxHeight: '450px' }}
              >
                {exams.map((exam: any) => (
                  <Link key={exam.id} href={`/exam/${exam.id}/${exam.slug}`}>
                    <div className="card bg-skyBlue hover-card p-2 d-flex mb-3">
                      <div className="row align-items-center w-100 m-0">
                        <div className="col-4 p-0 text-center">
                          <Image
                            src={`${IMG_URL}/${exam.logo}`}
                            width={120}
                            height={80}
                            alt={exam.exam_title ?? 'exam'}
                            className='img-fluid'
                            style={{ width: '100%', height: '55px', objectFit: 'contain' }}
                            loading="lazy"
                          />
                        </div>
                        <div className="col-8 ps-2 text-start">
                          <h6 className='m-0 text-start fw-bold text-black small'>
                            {exam.exam_title}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </SubCourseInfoTabsClient>
    </section>
  )
}

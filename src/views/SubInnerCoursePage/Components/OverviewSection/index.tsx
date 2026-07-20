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
    <section className='clgInfoSec innerClgCarousel bg-white subinner'>
      <SubCourseInfoTabsClient tabs={tabs}>
        {/* Sidebar — server-rendered (zero hydration cost, SEO-crawlable) */}
        <div className="col-12 mb-md-5 mx-auto px-0">
          <div className="row imgCardConCrs mb-3">
            {data?.streams?.banner && (
              <div className="col-12 col-md-4 mb-5 px-0 px-md-3">
                <div className='dental-crs-img flex-column d-flex justify-content-center pb-2 h-100'>
                  <Image
                    src={`${IMG_URL}/${data.streams.banner}`}
                    width={600}
                    height={600}
                    alt={`${data?.name ?? 'course'} image`}
                    className='img-fluid'
                  />
                  <h6 className='text-center mb-3'>Are you interested in this course?</h6>
                  <GlobalEnquiryForm className="mb-3 btn chkEligBtn" buttonText="Check Eligibility" />
                </div>
              </div>
            )}

            {colleges?.length > 0 && (
              <div className="col-12 col-md-4 mb-5 px-0 px-md-3">
                <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Top {data?.streams?.name} Colleges</h4>
                <div
                  className="cardConBrdr p-3 text-center overflow-y-auto bg-skyBlue"
                  style={{ maxHeight: '450px' }}
                >
                  {colleges.map((val: any) => (
                    <Link key={val.id} href={`/college/${val.id}/${val.slug}`}>
                      <div className="card p-3 mb-3 d-flex flex-row bg-skyBlue hover-card">
                        <div className="row d-flex">
                          <div className="align-content-center col-md-5 col-xl-5 mb-md-0 mb-3 col-lg-5 topCollegeImg">
                            <Image
                              src={`${IMG_URL}/${val.banner_image}`}
                              width={500}
                              height={500}
                              alt={val.name}
                              className='img-fluid rounded'
                            />
                          </div>
                          <div className="align-content-center justify-content-md-start justify-content-center col-md-7 col-xl-7 col-lg-7">
                            <h6 className='align-content-center text-md-start text-center text-black fw-bold'>{val.name}</h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {exams?.length > 0 && (
              <div className="col-12 col-md-4 mb-5 px-0 px-md-3">
                <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Top {data?.streams?.name} Exams</h4>
                <div
                  className="cardConBrdr p-3 overflow-y-auto text-center bg-skyBlue"
                  style={{ maxHeight: '450px' }}
                >
                  {exams.map((exam: any) => (
                    <Link key={exam.id} href={`/exam/${exam.id}/${exam.slug}`}>
                      <div className="card bg-skyBlue hover-card p-2 d-flex mb-3">
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-5 mx-auto text-md-start text-center">
                            <Image
                              src={`${IMG_URL}/${exam.logo}`}
                              width={200}
                              height={200}
                              alt={exam.exam_title ?? 'exam'}
                              className='align-self-center innerBoardImg'
                            />
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-7 d-flex pt-md-0 pt-3 justify-content-md-start justify-content-center">
                            <h5 className='m-0 align-self-center text-md-start text-center fw-bold text-black ms-2 mb-0'>
                              {exam.exam_title}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SubCourseInfoTabsClient>
    </section>
  )
}

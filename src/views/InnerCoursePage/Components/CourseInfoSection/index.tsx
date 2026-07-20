import Image from 'next/image'
import Link from 'next/link'
import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'
import CourseInfoTabsClient, { type CourseTabData } from './CourseInfoTabsClient'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

const isEmpty = (val: any) =>
  !val || val === '' || val === 'null' || val === '<p>null</p>' || val === '<p><br></p>'

interface Props {
  data: any
  colleges: any[]
  exams: any[]
}

export default function CourseInfoSection({ data, colleges, exams }: Props) {
  const tabs: CourseTabData[] = [
    { id: 'overview', label: 'Overview', html: data.description },
    { id: 'ug', label: 'UG', courses: (data.general_courses ?? []).filter((c: any) => c.course_type === 'UG') },
    { id: 'pg', label: 'PG', courses: (data.general_courses ?? []).filter((c: any) => c.course_type === 'PG') },
    { id: 'doctorate', label: 'Doctorate', courses: (data.general_courses ?? []).filter((c: any) => c.course_type === 'Doctorate') },
    { id: 'diploma', label: 'Diploma', courses: (data.general_courses ?? []).filter((c: any) => c.course_type === 'Diploma') },
    { id: 'top', label: 'Top Colleges', html: data.top_college },
    { id: 'faq', label: 'FAQ', faqData: data.streamfaqs },
  ].filter(t =>
    (t.faqData && t.faqData.length > 0) ||
    (t.courses && t.courses.length > 0) ||
    (!t.faqData && !t.courses && !isEmpty(t.html))
  )

  return (
    <section className='clgInfoSec innerClgCarousel bg-white'>
      <CourseInfoTabsClient tabs={tabs} streamId={data.id} streamSlug={data.slug}>

        {/* Sidebar — server-rendered: no JS, crawlable, zero hydration cost */}
        <div className="col-12 mb-md-5 mx-auto px-0">
          <div className="row imgCardConCrs mb-3">

            {data.banner && (
              <div className="col-12 col-md-4 mb-5 px-0 px-md-3">
                <div className='dental-crs-img flex-column d-flex justify-content-center pb-3 h-100'>
                  <Image
                    src={`${IMG_URL}/${data.banner}`}
                    width={600}
                    height={600}
                    alt={`${data.name} course`}
                    className="img-fluid"
                  />
                  <h6 className='text-center mb-3'>Are you interested in this course?</h6>
                  <GlobalEnquiryForm className="mb-3 chkEligBtn" buttonText="Check Eligibility" />
                </div>
              </div>
            )}

            {colleges.length > 0 && (
              <div className="col-12 col-md-4 mb-5 px-0 px-md-3">
                <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Top {data.name} Colleges</h4>
                <div
                  className="cardConBrdr p-3 text-center overflow-y-auto bg-skyBlue"
                  style={{ maxHeight: '450px' }}
                >
                  {colleges.map(val => (
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
                              loading="lazy"
                            />
                          </div>
                          <div className="align-content-center col-md-7 col-xl-7 col-lg-7">
                            <h6 className='text-start text-black fw-bold'>{val.name}</h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {exams.length > 0 && (
              <div className="col-12 col-md-4 mb-5 px-0 px-md-3">
                <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Top {data.name} Exams</h4>
                <div
                  className="cardConBrdr p-3 overflow-y-auto text-center bg-skyBlue"
                  style={{ maxHeight: '450px' }}
                >
                  {exams.map(exam => (
                    <Link href={`/exam/${exam.id}/${exam.slug}`} key={exam.id}>
                      <div className="card bg-skyBlue hover-card p-2 d-flex mb-3">
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-5 mx-auto text-md-start text-center">
                            <Image
                              src={`${IMG_URL}/${exam.logo}`}
                              width={200}
                              height={200}
                              alt={exam.exam_title}
                              className='align-self-center innerBoardImg'
                              loading="lazy"
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

      </CourseInfoTabsClient>
    </section>
  )
}

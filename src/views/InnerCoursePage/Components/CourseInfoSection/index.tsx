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
    <section className='clgInfoSec innerClgCarousel bg-white py-4'>
      <CourseInfoTabsClient tabs={tabs} streamId={data.id} streamSlug={data.slug}>

        {/* Sidebar — server-rendered: no JS, crawlable, zero hydration cost */}
        <div className="row imgCardConCrs">

          {data.banner && (
            <div className="col-12 col-md-6 col-lg-12 mb-4">
              <div className='dental-crs-img flex-column d-flex justify-content-center align-items-center p-3 border rounded bg-white text-center h-100'>
                <Image
                  src={`${IMG_URL}/${data.banner}`}
                  width={600}
                  height={600}
                  alt={`${data.name} course`}
                  className="img-fluid mb-3"
                  style={{ maxHeight: '220px', objectFit: 'contain' }}
                />
                <h6 className='text-center fw-bold mb-3'>Are you interested in this course?</h6>
                <GlobalEnquiryForm className="mb-2 chkEligBtn w-100" buttonText="Check Eligibility" />
              </div>
            </div>
          )}

          {colleges.length > 0 && (
            <div className="col-12 col-md-6 col-lg-12 mb-4">
              <h4 className='fw-bold text-blue text-center mb-3'>Top {data.name} Colleges</h4>
              <div
                className="cardConBrdr p-3 text-center overflow-y-auto bg-skyBlue rounded"
                style={{ maxHeight: '450px' }}
              >
                {colleges.map(val => (
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

          {exams.length > 0 && (
            <div className="col-12 col-md-6 col-lg-12 mb-4">
              <h4 className='fw-bold text-blue text-center mb-3'>Top {data.name} Exams</h4>
              <div
                className="cardConBrdr p-3 overflow-y-auto text-center bg-skyBlue rounded"
                style={{ maxHeight: '450px' }}
              >
                {exams.map(exam => (
                  <Link href={`/exam/${exam.id}/${exam.slug}`} key={exam.id}>
                    <div className="card bg-skyBlue hover-card p-2 d-flex mb-3">
                      <div className="row align-items-center w-100 m-0">
                        <div className="col-4 p-0 text-center">
                          <Image
                            src={`${IMG_URL}/${exam.logo}`}
                            width={120}
                            height={80}
                            alt={exam.exam_title}
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

      </CourseInfoTabsClient>
    </section>
  )
}

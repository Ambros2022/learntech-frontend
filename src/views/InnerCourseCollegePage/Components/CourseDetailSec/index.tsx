import CourseDetailTabsClient, { type CourseTabData } from './CourseDetailTabsClient'

function isEmpty(html: string | null | undefined) {
  return !html || html === '' || html === 'null' || html === '<p>null</p>' || html === '<p><br></p>'
}

export default function CourseDetailSec({ data }: { data: any }) {
  const tabs: CourseTabData[] = [
    { id: 'info', label: 'Course Details', html: data?.course_details },
    { id: 'fees', label: 'Eligibility Criteria', html: data?.eligibility },
    { id: 'admission', label: 'Fee Structure', html: data?.fee_structure },
  ].filter(t => !isEmpty(t.html))

  if (!tabs.length) return null

  return (
    <section className='clgInfoSec bg-white minehightnriquto'>
      <div className="container position-relative innerClgCarousel">
        <CourseDetailTabsClient tabs={tabs} />
      </div>
    </section>
  )
}

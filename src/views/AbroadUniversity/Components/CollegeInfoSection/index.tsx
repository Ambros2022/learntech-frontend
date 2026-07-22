import CollegeInfoTabsClient, { type CollegeTabData } from 'src/views/InnerCollegePage/Components/CollegeInfoSection/CollegeInfoTabsClient'

const isEmpty = (val: any) =>
  !val || val === '' || val === 'null' || val === '<p>null</p>' || val === '<p><br></p>'

export default function CollegeInfoSection({ data }: { data: any }) {
  const tabs: CollegeTabData[] = [
    { id: 'info', label: 'Info', html: data.info, imageUrl: data.banner_image, videoUrl: data.video_url },
    { id: 'course_fees', label: 'Courses & Fees', html: data.course_fees },
    { id: 'admissions', label: 'Admissions', html: data.admissions },
    { id: 'rankings', label: 'Ranking', html: data.rankings },
    { id: 'scholarship', label: 'Scholarship', html: data.scholarship },
    { id: 'hostel', label: 'Infrastructure', html: data.hostel },
    { id: 'gallery', label: 'Gallery', gallery: data.clggallery },
    { id: 'faq', label: 'FAQ', faqData: data.collegefaqs },
    { id: 'review', label: 'Review' },
  ].filter(t =>
    t.id === 'review' ||
    (t.id === 'gallery' && t.gallery?.length > 0) ||
    (t.id === 'faq' && t.faqData?.length > 0) ||
    !isEmpty(t.html)
  )

  return (
    <section className='clgInfoSec bg-white'>
      <CollegeInfoTabsClient tabs={tabs} collegeName={data.name} collegeId={data.id} />
    </section>
  )
}

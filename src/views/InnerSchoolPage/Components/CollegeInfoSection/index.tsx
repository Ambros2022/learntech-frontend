import SchoolInfoTabsClient, { type SchoolTabData } from './SchoolInfoTabsClient'

const isEmpty = (val: any) =>
  !val || val === '' || val === 'null' || val === '<p>null</p>' || val === '<p><br></p>'

export default function CollegeInfoSection({ data }: { data: any }) {
  const embedUrl = data.video_url
    ? data.video_url.replace('watch?v=', 'embed/')
    : undefined

  const tabs: SchoolTabData[] = [
    { id: 'info', label: 'Info', html: data.info, imageUrl: data.banner_image, videoUrl: embedUrl },
    { id: 'admissions_process', label: 'Admission Process', html: data.admissions_process },
    { id: 'extracurriculars', label: 'Extracurriculars', html: data.extracurriculars },
    { id: 'gallery', label: 'Gallery', gallery: data.schgallery },
    { id: 'faq', label: 'FAQ', faqData: data.schfaqs },
    { id: 'review', label: 'Review' },
  ].filter(t =>
    t.id === 'review' ||
    (t.id === 'gallery' && t.gallery?.length > 0) ||
    (t.id === 'faq' && t.faqData?.length > 0) ||
    !isEmpty(t.html)
  )

  return (
    <section className="bg-white">
      <SchoolInfoTabsClient tabs={tabs} schoolName={data.name} schoolId={data.id} />
    </section>
  )
}

import Image from 'next/image'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

interface Props {
  data: any
  organizationPage: any // pre-fetched via getOrganizationPage('Exams') in page.tsx
}

// Server Component — no 'use client'.
// Data is fetched server-side in page.tsx via getOrganizationPage('Exams').
export default function OrganizationSection({ data, organizationPage }: Props) {
  if (!organizationPage) return null

  return (
    <section className='bg-white pt-5'>
      <div className="container bs-editor-text">
        <h2 className='text-center fw-bold text-blue mb-3'>
          {organizationPage.title} {data?.exam_short_name} Exam
        </h2>
        <div
          className='text-black'
          dangerouslySetInnerHTML={{ __html: organizationPage.content }}
        />
        <div className="d-flex mt-5 pt-md-5 pt-5 flex-wrap justify-content-center gap-3">
          {organizationPage.organizatiopagesteps?.map((step: any) => (
            <div
              key={step.id}
              className='card rounded-0 px-3 organizationalCard'
              style={{ marginBottom: '80px' }}
            >
              <div className='text-center organizationImg'>
                <Image
                  src={`${IMG_BASE}/${step.icon}`}
                  width={700}
                  height={700}
                  alt={step.name ? `${step.name} icon` : 'Organization step icon'}
                  className='mb-3 img-fluid'
                  style={{ marginTop: '-60px' }}
                  loading="lazy"
                />
                <i
                  className='bi text-blue bi-chevron-right right-arrow-orgazinational'
                  aria-hidden="true"
                />
                <h5 className='text-blue'>{step.title}</h5>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

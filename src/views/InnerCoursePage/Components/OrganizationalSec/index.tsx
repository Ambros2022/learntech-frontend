import Image from 'next/image'
import { getOrganizationPage } from 'src/lib/api/common'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export default async function OrganizationSection({ streamName }: { streamName: string }) {
  const organizationPage = await getOrganizationPage('Streams')
  if (!organizationPage) return null

  return (
    <section className='bg-white pt-3'>
      <div className="container">
        <h2 className='text-center fw-bold text-blue mb-3'>
          {organizationPage.title} {streamName} Courses
        </h2>
        <p className='text-black' dangerouslySetInnerHTML={{ __html: organizationPage.content }} />
        <div className="d-flex mt-5 pt-md-5 pt-3 flex-wrap justify-content-center gap-3">
          {(organizationPage.organizatiopagesteps ?? []).map((step: any) => (
            <div key={step.id} className='card rounded-0 px-3 organizationalCard' style={{ marginBottom: '80px' }}>
              <div className='text-center organizationImg'>
                <Image
                  src={`${IMG_URL}/${step.icon}`}
                  width={120}
                  height={120}
                  alt={step.name ?? step.title}
                  className='mb-3 img-fluid'
                  style={{ marginTop: '-60px' }}
                />
                <i className='bi text-blue bi-chevron-right right-arrow-orgazinational'></i>
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

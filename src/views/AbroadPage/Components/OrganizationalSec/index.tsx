import Image from 'next/image'
import { getOrganizationPage } from 'src/lib/api/common'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export default async function OrganizationSection({ data }: { data: any }) {
  const organizationPage = await getOrganizationPage('Study_Abroad')
  if (!organizationPage) return null

  return (
    <section className='bg-white pt-0'>
      <div className="container">
        <h2 className='text-center fw-bold text-blue mb-3'>
          Learntech&apos;s Approach for Study in {data?.country?.name}
        </h2>
        <p className='text-black pb-2' dangerouslySetInnerHTML={{ __html: organizationPage.content }} />
        <div className="d-flex mt-5 pt-md-5 pt-3 flex-wrap justify-content-center gap-3">
          {organizationPage.organizatiopagesteps.map((step: any) => (
            <div key={step.id} className='card rounded-0 px-3 organizationalCard' style={{ marginBottom: '80px' }}>
              <div className='text-center organizationImg'>
                <Image
                  src={`${IMG_BASE}/${step.icon}`}
                  width={200}
                  height={200}
                  alt={step.name}
                  className='mb-3 img-fluid'
                  style={{ marginTop: '-60px' }}
                  loading="lazy"
                />
                <i className='bi text-blue bi-chevron-right right-arrow-orgazinational' />
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

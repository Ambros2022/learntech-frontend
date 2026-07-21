import { LazyContactForm } from 'src/app/components/ClientWrappers'
import ScholarshipList from '../ScholarshipList'

interface Props {
  data: any
  scholarships: any[]
}

export default function OverviewSec({ data, scholarships }: Props) {
  return (
    <section className='innerBlogSec bg-white py-3'>
      <div className="container">
        <h2 className='fw-bold text-blue mb-3'>{data.name}</h2>
        <div className="row align-items-start mt-3">
          <div className="col-12 col-lg-8 pe-lg-4 mb-4 mb-lg-0">
            <div className="bs-editor-text" dangerouslySetInnerHTML={{ __html: data.overview }} />
          </div>
          <div className="col-12 col-lg-4 ps-lg-3">
            <div className='mb-4'>
              <LazyContactForm heading='Contact Us' />
            </div>
            <ScholarshipList newsItems={scholarships} />
          </div>
        </div>
      </div>
    </section>
  )
}

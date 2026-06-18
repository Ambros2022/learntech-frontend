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
        <div className="row mt-3">
          <div className="col-md-8">
            <div dangerouslySetInnerHTML={{ __html: data.overview }} />
          </div>
          <div className="col-md-4 ">
            <div className='mb-5'>
              <LazyContactForm heading='Contact Us' />
            </div>
            <ScholarshipList newsItems={scholarships} />
          </div>
        </div>
      </div>
    </section>
  )
}

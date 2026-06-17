import ReadMoreContent from 'src/components/ui/ReadMoreWrapper'
import { LazyContactForm } from 'src/app/components/ClientWrappers'

interface Props {
  data?: {
    meta_title?: string
    top_description?: string
  }
}

export default function BestSec({ data = {} }: Props) {
  return (
    <section className="bg-white pt-2 pb-md-5 pb-3">
      <div className="container">
        <h2 className="text-md-start text-center fw-bold text-blue">
          Best Education Boards in India
        </h2>
        <div className="row py-2">
          <div className="col-lg-8 col-md-7">
            {data.top_description && (
              <ReadMoreContent html={data.top_description} collapsedHeight={500} />
            )}
          </div>
          <div className="col-lg-4 pt-4 pt-md-0 col-md-5 mx-auto">
            <LazyContactForm heading="Contact Us" />
          </div>
        </div>
      </div>
    </section>
  )
}

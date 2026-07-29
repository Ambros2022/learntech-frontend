import React from 'react'
import { LazyContactForm as ContactForm } from 'src/app/components/ClientWrappers'
import ReadMoreContent from 'src/components/ui/ReadMoreWrapper'

interface ScholarshipAbroadSecProps {
  data?: {
    top_description?: string
  }
  banners: any[]
}

const ScholarshipAbroadSec = ({ data = {}, banners = [] }: ScholarshipAbroadSecProps) => {
  return (
    <section className="bg-white">
      <div className="container py-3">
        <h2 className="fw-bold text-blue">Scholarships in India and Abroad</h2>
        <div className="row pt-2">
          <div className="col-md-8">
            {data.top_description && (
              <ReadMoreContent
                html={data.top_description}
                collapsedHeight={750}
                buttonClassName="btn viewMoreClgBtn mb-5"
              />
            )}
          </div>
          <div className="col-md-4 pt-0 pt-md-0">
            <ContactForm heading="Contact Us" />

            <div className="scholarship-banner pt-3 pt-md-5">
              {banners?.map((banner, index) => (
                <img
                  key={banner.id || index}
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                  alt={`Banner ${index}`}
                  width={420}
                  height={400}
                  className="img-fluid"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScholarshipAbroadSec

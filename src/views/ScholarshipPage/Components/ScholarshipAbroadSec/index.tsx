import React from 'react'
import ContactForm from 'src/@core/components/popup/ContactForm'

const ScholarshipAbroadSec = ({data}) => {
  return (
    <>
      <section className='bg-white'>
        <div className="container py-3">
          <h2 className='fw-bold text-blue'>Scholarships in India and Abroad</h2>
          <div className="row pt-2">
            <div className="col-md-8">
              <p className='text-black'>
              {data?.meta_title || 'Default Title'}
              </p>
              <p className='text-black'>
              {data?.meta_description || 'Default Title'}
              </p>
            </div>
            <div className="col-md-4">
              <ContactForm heading={'Contact Us'}/>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ScholarshipAbroadSec
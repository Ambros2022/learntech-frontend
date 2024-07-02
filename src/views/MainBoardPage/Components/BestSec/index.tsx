import React from 'react'
import ContactForm from 'src/@core/components/popup/ContactForm'

const BestSec = ({ data = {} }: { data?: { meta_title?: string, meta_description?: string } }) => {
    return (
        <>
            <section className='bg-white pt-2 pb-5'>
                <div className="container">
                    <h2 className='text-center fw-bold text-blue'>Best Education Boards in India</h2>
                    <div className="row py-2">
                        <div className="col-lg-8 col-md-7">
                            <p className='text-black'>
                              {data.meta_title}
                            </p>
                            <p className='text-black'>
                              {data.meta_description}
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-5 col-10 mx-auto">
                            <ContactForm heading={'Contact Us'} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BestSec
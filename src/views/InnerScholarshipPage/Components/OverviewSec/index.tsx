import React, { useCallback, useEffect, useState } from 'react'

import ContactForm from 'src/@core/components/popup/ContactForm';
import ScholarshipList from '../ScholarshipList/index';


const OverviewSec = ({ data  , scholarship}) => {


    return (
        <section className='innerBlogSec bg-white py-5'>
            <div className="container">
                <h1 className='fw-bold text-blue mb-3'>{data.name}</h1>
                {/* <h6>Team Learntech | July 18, 2023, 13:55 IST</h6> */}

                <div className="row mt-5">
                    <div className="col-md-8">
                        <p className='text-black'>  <div dangerouslySetInnerHTML={{ __html: data.overview }} /></p>
                      

                    </div>
                    <div className="col-md-4">
                        <div className='mb-3'>
                            <ContactForm heading={'CONTACT US'} />
                        </div>
                        {/* <ScholarshipList ScholarshipItem={newsItems}  /> */}

                        {/* <ScholarshipList  /> */}
                        <ScholarshipList newsItems={scholarship} />
                        


                    </div>
                </div>
            </div>
        </section>
    )
}

export default OverviewSec
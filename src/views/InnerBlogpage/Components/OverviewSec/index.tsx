import React, { useCallback, useEffect, useState } from 'react'
import NewsList from '../newsList';
import BlogList from '../blogsList';
import ContactForm from 'src/@core/components/popup/ContactForm';
import axios from 'src/configs/axios';

const OverviewSec = ({ data, createdAt , newsData , blogsData }) => {

    return (
        <section className='innerBlogSec bg-white py-5'>
            <div className="container">
                {/* <h1 className='fw-bold text-blue mb-3'>{data.name}</h1>
                <h6>Team Learntech | {createdAt}</h6> */}
                <div className="row">
                    <div className="col-md-8">
                        <p className='text-black'>  <div dangerouslySetInnerHTML={{ __html: data.overview }} /></p>
                        {/* <p className='text-black'>{data.meta_description}</p>
                        <p className='text-black'>{data.meta_title}</p> */}

                    </div>
                    <div className="col-md-4">
                        <div className='mb-3'>
                            <ContactForm heading={'Get More Details'} />
                        </div>
                        <BlogList blogItems={blogsData} heading={'Latest Blogs'} />
                        <NewsList newsItems={newsData} heading={'Latest News'} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OverviewSec
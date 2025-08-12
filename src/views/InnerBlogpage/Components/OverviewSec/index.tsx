import React from 'react'
import NewsList from '../newsList';
import BlogList from '../blogsList';
import ContactForm from 'src/@core/components/popup/ContactForm';

const OverviewSec = ({ data , newsData , blogsData }) => {

    return (
        <section className='innerBlogSec bg-white pt-3'>
            <div className="container">
                {/* <h1 className='fw-bold text-blue mb-3'>{data.name}</h1>
                <h6>Team Learntech | {createdAt}</h6> */}
                <div className="row">
                    <div className="col-md-8">
                        <p className='text-black'>  <div dangerouslySetInnerHTML={{ __html: data?.overview }} /></p>
                     

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
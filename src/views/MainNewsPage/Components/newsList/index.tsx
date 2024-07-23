import React from 'react';
import Image from 'next/image';

// NewsItem component
const NewsItem = ({ id, banner_image, title }) => (
    <div className="col-md-12 col-10 mx-md-0 mx-auto">
        <a href={`/college/${id}/${title}`} >
            <div className="card mb-3 bg-skyBlue hover-card">
                <div className="row g-0">
                    <div className="col-md-4 col-xl-3 col-lg-3 upcomingAdmission">
                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner_image}`} width={300} height={300} className="mx-md-2 rounded img-fluid" alt="news-img" />
                    </div>
                    <div className="col-md-8 col-lg-9 col-xl-9">
                        <div className="card-body">
                            <h6 className="card-title  fw-bold">{title}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
);

// NewsList component
const NewsList = ({ newsItems }) => (
    <>
        <h4 className='fw-bold text-blue mt-3 text-center pt-3 mb-4'>Upcoming Admissions</h4>
        <div className='bg-skyBlue pt-3 examNewsSec rounded mt-3 px-4 overflow-y-auto'  style={{ maxHeight: 'calc(6 * 102px)' }}>
            <div className="row">
                {newsItems.map((item, index) => (
                    <NewsItem key={index} id={item.id} banner_image={item.banner_image} title={item.name} />
                ))}
            </div>
        </div>
    </>
);

export default NewsList;
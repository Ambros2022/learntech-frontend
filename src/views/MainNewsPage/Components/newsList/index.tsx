import React from 'react';
import Image from 'next/image';

// NewsItem component
const NewsItem = ({ imageSrc, title, text }) => (
    <div className="col-md-12 col-10 mx-md-0 mx-auto">
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4 upcomingAdmission">
                    <Image src={imageSrc} width={300} height={300} className="rounded-start img-fluid" alt="news-img" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-truncate fw-bold">{title}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// NewsList component
const NewsList = ({ newsItems }) => (
    <div className='bg-skyBlue examNewsSec rounded mt-3 px-4 overflow-y-scroll newsHeightScroll'>
        <h4 className='fw-bold text-blue text-md-start text-center pt-3 mb-3'>Upcoming Admissions</h4>
        <div className="row">
            {newsItems.map((item, index) => (
                <NewsItem key={index} imageSrc={item.imageSrc} title={item.title} text={item.text} />
            ))}
        </div>
    </div>
);

export default NewsList;
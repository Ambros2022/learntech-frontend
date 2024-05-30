import React from 'react';
import Image from 'next/image';

// NewsItem component
const NewsItem = ({ imageSrc, title, text }) => (
    <div className="col-12">
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <Image src={imageSrc} width={200} height={200} className="card-img-top img-fluid rounded-start" alt="news-img" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-truncate fw-bold">{title}</h5>
                        <small className="card-text">{text}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// NewsList component
const NewsList = ({ newsItems }) => (
    <div className='bg-skyBlue examNewsSec rounded mt-3 px-4 overflow-y-scroll' style={{ minHeight: '650px', maxHeight: '650px' }}>
        <h4 className='fw-bold text-blue text-start pt-3 mb-3'>Latest News</h4>
        <div className="row">
            {newsItems.map((item, index) => (
                <NewsItem key={index} imageSrc={item.imageSrc} title={item.title} text={item.text} />
            ))}
        </div>
    </div>
);

export default NewsList;
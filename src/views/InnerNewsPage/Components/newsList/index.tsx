import React from 'react';
import Image from 'next/image';

// NewsItem component
const NewsItem = ({ imageSrc, name }) => (
    <div className="col-12">
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <Image src={imageSrc} width={200} height={200} className="card-img-top img-fluid rounded-start" alt="news-img" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <small className="card-text">{name}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// NewsList component
const NewsList = ({ newsItems }) => (
    <div className='mb-5 bg-skyBlue innerNewsCard px-4 overflow-y-scroll rounded'>
        <h5 className='fw-bold text-center py-3 text-blue'>Other Trending News</h5>
        <div className="row">
            {newsItems.map((item, index) => (
                <NewsItem key={index} imageSrc={item.imageSrc} name={item.name} />
            ))}
        </div>
    </div>
);

export default NewsList;
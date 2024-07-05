import React from 'react';
import Image from 'next/image';

// NewsItem component
const NewsItem = ({ imageSrc, name ,id }) => (
    <div className="col-12">
        <div className="card mb-3 bg-skyBlue hover-card">
            <div className="row g-0">
                <div className="col-md-4">
                    <Image src={imageSrc} width={200} height={200} className="card-img-top img-fluid rounded-start" alt="news-img" />
                </div>
                <div className="col-md-8">
                    <a href={`/news/${id}/${name}`}>
                    <div className="card-body">
                        <small className="card-text text-black">{name}</small>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
);

// NewsList component
const NewsList = ({ newsItems, heading }) => (
    <div className='mb-5 bg-skyBlue innerNewsCard px-4 overflow-y-scroll rounded'>
        <h5 className='fw-bold text-center py-3 text-blue'>{heading}</h5>
        <div className="row">
            {newsItems.map((item, index) => (
                <NewsItem key={index} id={item.id} imageSrc={item.imageSrc} name={item.name} />
            ))}
        </div>
    </div>
);

export default NewsList;
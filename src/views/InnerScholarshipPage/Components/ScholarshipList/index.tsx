import React from 'react';
import Image from 'next/image';

// NewsItem component
const NewsItem = ({ id, title, text }) => (
    <div className="col-12">
         <a href={`/scholarship/${id}/${title}`} >
        <div className="card mb-3">
            <div className="row g-0">
              
                <div className="col-md-12">
                    <div className="card-body text-center">
                        <h5 className="card-title  fw-bold">{title}</h5>
                    </div>
                </div>
            </div>
        </div>
        </a>
    </div>
);

// NewsList component
const NewsList = ({ newsItems }) => (
    <div className='bg-skyBlue examNewsSec blogSec mt-3 px-4 overflow-y-scroll rounded' style={{ minHeight: '650px', maxHeight: '650px' }}>
        <h4 className='fw-bold text-blue text-center pt-3 mb-3'> Similar Scholarship</h4>
        <div className="row">
            {newsItems.map((item, index) => (
                <NewsItem key={index} id= {item.id}  title={item.name} text={item.text} />
            ))}
        </div>
    </div>
);

export default NewsList;
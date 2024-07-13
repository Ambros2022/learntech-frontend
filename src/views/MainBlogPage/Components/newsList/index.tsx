import React from 'react';
import Image from 'next/image';

// NewsItem component
const NewsItem = ({ id, banner_image, title, text }) => (
    <div className="col-12">
        <a href={`/news/${id}/${title}`} >
            <div className="card bg-skyBlue hover-card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner_image}`} width={200} height={200} className="ms-md-2 card-img-top img-fluid rounded-start" alt="news-img" />
                    </div>
                    <div className="col-md-8">
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
        <h4 className='fw-bold text-blue text-center  mt-3 pt-3 mb-3'>Latest News</h4>
        <div className='bg-skyBlue pt-3 examNewsSec blogSec mt-3 px-4 overflow-y-scroll rounded' style={{ minHeight: '650px', maxHeight: '650px' }}>
            <div className="row">
                {newsItems.map((item, index) => (
                    <NewsItem key={index} id={item.id} banner_image={item.banner_image} title={item.name} text={item.text} />
                ))}
            </div>
        </div>
    </>
);

export default NewsList;
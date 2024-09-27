import React from 'react';
import Image from 'next/image';

// NewsItem component
const NewsItem = ({ banner_image, id, title, text, slug}) => (


    <div className="col-12">
        <a href={`/news/${id}/${slug}`} >
            <div className="card mb-3 bg-skyBlue hover-card">
                <div className="row g-0 d-flex">
                    <div className="col-md-4 align-self-center">
                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner_image}`} width={200} height={200} className="ms-md-2 card-img-top img-fluid rounded" alt="news-img" />
                    </div>
                    <div className="col-md-8 align-self-center">
                        <div className="card-body">
                            <h6 className="card-title fw-bold">{title}</h6>
                            {/* <small className="card-text text-truncate ">{text}</small> */}
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
        <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Latest News Of India</h4>
        <div className='bg-skyBlue examNewsSec mt-3 px-4 py-3 overflow-y-auto' style={{ maxHeight: 'calc(3 * 160px)' }}>
            <div className="row " >
                {newsItems.map((item, index) => (
                    <NewsItem key={index} id={item.id} banner_image={item.banner_image} title={item.name} slug={item.slug} text={item.meta_description} />
                ))}
            </div>
        </div>
    </>
);

export default NewsList;
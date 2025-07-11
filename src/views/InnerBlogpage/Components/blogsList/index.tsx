import React from 'react';
import Link from 'next/link';

// NewsItem component
const NewsItem = ({ imageSrc, id, name,slug }) => (
    <div className="col-12">
        <div className="card mb-3 bg-skyBlue hover-card">
            <div className="row g-0">
                <div className="d-flex col-md-4">
                    <img src={imageSrc} width={200} height={200} style={{ width: '100%', height: '-webkit-fill-available', objectFit: 'contain' }} className=" ms-md-2 rounded align-self-center img-fluid rounded-start" alt="news-img" />
                </div>
                <div className="col-md-8 align-self-center">
                    <Link href={`/blog/${id}/${slug}`} className=''>
                        <div className="card-body d-flex">
                            <h6 className="card-text align-self-center text-black">{name}</h6>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

// NewsList component
const NewsList = ({ blogItems, heading }) => (
    <>
        <h4 className='fw-bold text-center py-3 text-blue'>{heading}</h4>
        <div className='mb-5 bg-skyBlue pt-3 innerNewsCard px-4 overflow-y-auto rounded' style={{ maxHeight: 'calc(20 * 115px)' }}>
            <div className="row">
                {blogItems.map((item, index) => (
                    <NewsItem key={index} id={item.id} imageSrc={item.imageSrc} name={item.name} slug={item?.slug} />
                ))}
            </div>
        </div>
    </>
);

export default NewsList;
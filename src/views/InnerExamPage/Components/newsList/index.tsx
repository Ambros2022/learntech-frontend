import React from 'react';

// NewsItem component
const NewsItem = ({ date, title }) => (
    <div className="col-12">
        <div className="card mb-3 cardInnerExam">
            <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center">
                    <div className="align-self-center mt-3 md-0">
                        <h3 className='fw-bold text-blue mb-0 text-center'>{date}</h3>
                    </div>
                </div>
                <div className="col-md-8 d-flex">
                    <div className="card-body align-content-center text-md-start text-center">
                        <h5 className="btn card-title text-truncate fw-bold">{title}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// NewsList component
const NewsList = ({ newsItems }) => (
    <div className='bg-skyBlue blogSec examLatest mt-3 px-4 overflow-y-scroll rounded'>
        <h4 className='fw-bold text-blue text-start pt-3 mb-3'>Upcoming Exams</h4>
        <div className="row">
            {newsItems.map((item, index) => (
                <NewsItem key={index} date={item.date} title={item.title} />
            ))}
        </div>
    </div>
);

export default NewsList;
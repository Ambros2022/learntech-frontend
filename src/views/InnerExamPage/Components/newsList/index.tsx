import React from 'react';

// NewsItem component
const NewsItem = ({ date, title }) => (
    <div className="col-12">
        <div className="card mb-3 cardInnerExam">
            <div className="card-body text-center">
                <h4 className='fw-bold text-blue mb-0 text-center'>{date}</h4>
                <h5 className="btn card-title text-center fw-bold mb-0">{title}</h5>
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
import React from 'react';

// NewsItem component
const NewsItem = ({ date, title }) => (
    <div className="col-12">
        <div className="card mb-3 p-3 d-flex justify-content-center cardInnerExam">
            <h4 className="btn card-title align-slef-center text-center mb-0 text-truncate fw-bold">{title}</h4>
            <h6 className='fw-bold align-self-center text-blue mb-0 text-center'>{date}</h6>
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
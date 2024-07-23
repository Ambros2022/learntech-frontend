import React from 'react';

// NewsItem component
const NewsItem = ({ date, title }) => (
    <div className="col-12">
        <div className="card mb-3 bg-skyBlue hover-card cardInnerExam">
            <div className="card-body text-center d-flex flex-md-row gap-md-0 gap-3 flex-wrap justify-content-xl-start justify-content-lg-center justify-content-center justify-content-md-center">
                <h5 className='fw-bold text-blue mb-0 text-center border-circle align-content-center'>{date}</h5>
                <h3 className="btn card-title text-center fw-bold mb-0  align-content-center">{title}</h3>
            </div>
        </div>
    </div>
);

// NewsList component
const NewsList = ({ newsItems }) => (
    <>
        <h4 className='fw-bold text-blue text-start pt-3 text-center mb-3'>Upcoming Exams</h4>
        <div className='bg-skyBlue blogSec examLatest mt-3 px-4 py-3 overflow-y-auto rounded' style={{ maxHeight: 'calc(6 * 150px)' }}>
            <div className="row">
                {newsItems.map((item, index) => (
                    <NewsItem key={index} date={item.date} title={item.title} />
                ))}
            </div>
        </div>
    </>
);

export default NewsList;
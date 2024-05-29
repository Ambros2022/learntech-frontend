import React from 'react';
import Image from 'next/image';

const ExamCard = ({ title, date }) => {
    return (
        <div className="col-md-4 col-12 mb-3">
            <div className="card examsCardRow">
                <Image src="/images/icons/filter-card.jpg" width={200} height={200} className="card-img-top" alt="exams-img" />
                <div className="card-body text-center">
                    <h5 className="fw-bold text-center card-title text-truncate">{title}</h5>
                    <small className="text-blue card-text text-truncate">{date}</small>
                </div>
            </div>
        </div>
    );
};

export default ExamCard;

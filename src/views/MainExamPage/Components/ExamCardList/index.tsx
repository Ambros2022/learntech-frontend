import React from 'react';
import Image from 'next/image';
import Link from 'next/link';




const ExamCard = ({ title, slug, id,  date, cover_image }) => {
    // Function to format the date
    const formatDate = (inputDate) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const suffix = (day === 1 || day === 21 || day === 31) ? 'st' :
                       (day === 2 || day === 22) ? 'nd' :
                       (day === 3 || day === 23) ? 'rd' : 'th';
        return `${day}${suffix} ${month}, ${year}`;
    };

    return (
        <div className="col-md-4 mb-3">
             <Link href={`/exam/${id}/${slug}`} >
            <div className="card hover-card examsCardRow">
                <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${cover_image}`} width={300} height={300} className="card-img-top" alt={title} />
                <div className="card-body text-center">
                    <h5 className="fw-bold text-center card-title text-truncate">{title}</h5>
                    {/* <small className="text-blue card-text text-truncate">{formatDate(date)}</small> */}
                </div>
            </div>
            </Link>
        </div>
    );
};

export default ExamCard;

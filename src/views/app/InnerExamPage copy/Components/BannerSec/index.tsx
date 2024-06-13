import React from 'react'
import PopularCourses from '../UpcomingExamsSec'
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';


function BannerSec({ data }) {
    // Ensure created_at is a valid date
    const examDate = data.created_at ? format(new Date(data.created_at), 'd MMM yyyy') : 'Date not available';

    return (
        <>
            <section className='collegeBannerCon bg-blue py-5 examsBannerCon'>
                <div className='d-flex justify-content-center w-100 h-100'>
                    <div className='align-content-center w-100 container'>
                        <div className="row">
                            <div className="col-lg-8 col-md-9 mx-md-auto innerExam">
                                <div className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-3 text-center text-md-start">
                                            <Image src="/images/icons/filter-card.jpg" width={200} height={200} alt="filter-card" className="img-fluid" />
                                        </div>
                                        <div className="col-md-9 d-flex justify-content-center justify-content-md-start">
                                            <div className="align-content-center">
                                                <div className="card-body">
                                                    <h3 className="fw-bold text-white card-title">
                                                        {data.exam_title} : {examDate}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-center mb-3">
                                <div className="align-content-center">
                                    <div className='text-md-end text-center'>
                                        <GlobalEnquiryForm
                                            buttonText={<><i className="bi bi-bell-fill"></i> Get NEED MDS Alert</>}
                                            className="btn alertExamBtn"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <PopularCourses />
                    </div>
                </div>
            </section>
            <div className="bg-white">
                <section className='container py-3 linkFontSize'>
                    <Link className="text-black" href='/'>Home <i className='bi bi-chevron-right'></i></Link><Link className='text-black' href='/exams'> Exams <i className='bi bi-chevron-right'></i></Link><Link className='text-blue' href='/exams'> NEET MDS</Link>
                </section>
            </div>
        </>
    )
}

export default BannerSec;

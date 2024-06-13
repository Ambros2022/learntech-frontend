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
            <section className='collegeBannerCon bg-blue examsBannerCon pt-4 pb-4'>
                <div className='d-flex justify-content-center w-100 h-100'>
                    <div className='align-content-center w-100 container'>
                        <div className="row">
                            <div className="col-lg-8 col-md-9 mx-md-auto innerExam">
                                <div className="card mb-5">
                                    <div className="row g-0">
                                        <div className="col-md-3 text-center ">
                                            <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.cover_image}`} width={100} height={100} alt={data.name} />
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
                            <div className="col-lg-4 d-flex justify-content-center mb-5">
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
                <section className='container InnerCollegeNavigationLink py-3'>
                    <p className='mb-3 '><Link href="/">Home</Link> {'>'} <Link href={"/exams"}>Exams</Link> {'>'} <span className='text-blue' style={{ cursor: 'pointer' }}>{data.slug}</span></p>
                </section>
            </div>
        </>
    )
}

export default BannerSec;

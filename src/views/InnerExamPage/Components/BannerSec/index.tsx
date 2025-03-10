import React from 'react'
import PopularCourses from '../UpcomingExamsSec'
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import NewsLinkSection from '../NewsLinkSection';


function BannerSec({ data }) {
    // Ensure upcoming_date is a valid date
    const examDate = data.upcoming_date ? format(new Date(data.upcoming_date), 'd MMM yyyy') : 'Date not available';

    return (
        <>
            <section className='collegeBannerCon bg-blue examsBannerCon pt-4 pb-4'>
                <div className='d-flex justify-content-center w-100 h-100'>
                    <div className='align-content-center w-100 container'>
                        <div className="row">
                            <div className="col-lg-8 col-md-9 mx-md-auto innerExam">
                                <div className="card mb-2">
                                    <div className="row g-0 d-flex flex-row">
                                        <div className="col-md-3 text-center innerClgImg mx-md-0 mx-auto align-content-center">
                                            <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`} width={100} height={100} className='bg-white p-2 rounded img-fluid' alt={data.name} />
                                        </div>
                                        <div className="col-md-9 d-flex justify-content-center justify-content-md-start align-content-center">
                                            <div className="align-content-center">
                                                <div className="p-lg-3">
                                                    <h3 className="fw-bold text-white card-title py-3 py-md-0">
                                                        {data.exam_title} Exam : {examDate}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-3 d-flex justify-content-center mb-3">
                                <div className="align-content-center">
                                    <div className='text-md-end text-center'>
                                        <GlobalEnquiryForm
                                            buttonText={<><i className="bi bi-bell-fill"></i> Get {data.exam_title} Alert</>}
                                            className="btn alertExamBtn"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <PopularCourses /> */}
                    </div>
                </div>
            </section>
            <div>  <NewsLinkSection /></div>

            <div className="bg-white">
                <section className='container InnerCollegeNavigationLink linkFontSize py-3'>
                    <p className='mb-3 '><Link href="/">Home <i className='bi bi-chevron-right'></i></Link><Link href={"/exams"}> Exams <i className='bi bi-chevron-right'></i></Link><span className='text-blue' style={{ cursor: 'pointer' }}> {data.exam_title}</span></p>
                </section>
            </div>
        </>
    )
}

export default BannerSec;

import React from 'react'
import PopularCourses from '../UpcomingExamsSec'
import Link from 'next/link';
import Image from 'next/image';

function BannerSec() {
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
                                                    <h3 className="fw-bold text-white card-title">MDS Exam : 9 FEB 2024
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
                                        <button className='btn alertExamBtn'><i className="bi bi-bell-fill"></i> Get NEED MDS Alert</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <h1 className='fw-bold text-center text-white mb-3'>
                            Entrance Exams in India
                        </h1>
                        <div className="row">
                            <div className="col-md-6 mb-3 mx-auto">
                                <input type="search" className='form-control' placeholder='Search for entrance exams' />
                            </div>
                        </div> */}
                        {/* <div className="row text-white text-md-start text-center pt-3 mb-3">
                            <h2>Upcoming Exams</h2>
                        </div> */}
                        <PopularCourses />
                    </div>
                </div>
            </section>
            <div className="bg-white">
                <section className='container py-3'>
                    <Link className="text-black fs-5" href='/'>Home <i className='bi bi-chevron-right'></i></Link><Link className='text-black fs-5' href='/exams'> Exams <i className='bi bi-chevron-right'></i></Link><Link className='text-blue fs-5' href='/exams'>NEET MDS</Link>
                </section>
            </div>
        </>
    )
}

export default BannerSec;
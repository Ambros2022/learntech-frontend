import React from 'react'
import PopularCourses from '../UpcomingExamsSec'
import Link from 'next/link';

function BannerSection() {
    return (
        <>
            <section className='bg-blue collegeBannerCon examsBannerCon'>
                <div className='d-flex justify-content-center w-100 h-100'>
                    <div className='align-content-center w-100 container'>
                        <h1 className='fw-bold text-center text-white mb-3'>
                            Entrance Exams in India
                        </h1>
                        <div className="row">
                            <div className="col-md-6 mb-3 mx-auto">
                                <input type="search" className='form-control' placeholder='Search for entrance exams' />
                            </div>
                        </div>
                        <div className="row text-white text-md-start text-center pt-3 mb-3">
                            <h2>Upcoming Exams</h2>
                        </div>
                        <PopularCourses />
                        <div className='text-md-end text-center pt-3'>
                            <button className='btn alertExamBtn'>Get Exams Alert</button>

                        </div>
                    </div>
                </div>
            </section>
            <section className='container py-3'>
                <Link className="text-black" href='/'>Home</Link> {'>'} <Link className='text-blue' href='/exams'>Exams</Link>
            </section>
        </>
    )
}

export default BannerSection;
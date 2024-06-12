import React, { useState } from 'react';
import Link from 'next/link';
import YoutubeVideo from 'src/@core/components/youtube-videos';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NewsList from '../newsList';
import CategoryCarousel from 'src/views/MainExamPage/Components/BrowseByCategorySec/CategoryCarousel';

function OverviewSec() {

    const [activeTab, setActiveTab] = useState('OVERVIEW');


    const [items, setItems] = useState([
        { id: 'OVERVIEW', label: 'OVERVIEW' },
        { id: 'EXAM-DATES', label: 'EXAM DATES' },
        { id: 'ELIGIBILITY-&-REGISTRATION', label: 'ELIGIBILITY & REGISTRATION' },
        { id: 'EXAM-PATTERN', label: 'EXAM PATTERN & SYLLABUS' },
        { id: 'CUTOFF', label: 'CUTOFF' },
        { id: 'ADMIT-CARD', label: 'ADMIT CARD' },
        { id: 'EXAM-CENTERS', label: 'EXAM CENTRES' },
        { id: 'RESULT', label: 'RESULT' },
        { id: 'PREPARATION', label: 'PREPARATION TIPS' },
        { id: 'COUNSELLING', label: 'COUNSELLING' },
        { id: 'ACCEPTING-COLLEGES', label: 'ACCEPTING COLLEGES' },
        { id: 'FAQS', label: 'FAQS' }
    ]);


    const newsData = [
        {
            date: '26th March',
            title: '1st Upcoming Exam',
        },
        {
            date: '26th March',
            title: '2nd Upcoming Exam',
        },
        {
            date: '26th March',
            title: '3rd Upcoming Exam',
        },
        {
            date: '26th March',
            title: '4th Upcoming Exam',
        },
        // Add more news items as needed
    ];

    const handleSubmit = async (values, { resetForm }) => {
        alert('Successfully Submitted');
        resetForm();
    };

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
        contact_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
        course: Yup.string().required('Course is required'),
        location: Yup.string().required('Location is required'),
        message: Yup.string().required('Message is required'),
    });



    const handleTabClick = (id) => {
        setActiveTab(id);
    };


    return (
        <section className='clgInfoSec bg-white pt-3'>
            <div className="container">
                <div className='OverviewCarousel position-relative px-5'>
                    <CategoryCarousel items={items} handleTabClick={handleTabClick} activeTab={activeTab} />
                </div>
                {/* <div className="pt-2 text-center justify-content-start gap-3 d-flex flex-fill flex-wrap infoBtn" id="nav-tab" role="tablist">
                    {[
                        { id: 'OVERVIEW', label: 'OVERVIEW' },
                        { id: 'EXAM-DATES', label: 'EXAM DATES' },
                        { id: 'ELIGIBILITY-&-REGISTRATION', label: 'ELIGIBILITY & REGISTRATION' },
                        { id: 'EXAM-PATTERN', label: 'EXAM PATTERN & SYLLABUS' },
                        { id: 'CUTOFF', label: 'CUTOFF' },
                        { id: 'ADMIT-CARD', label: 'ADMIT CARD' },
                        { id: 'EXAM-CENTERS', label: 'EXAM CENTRES' },
                        { id: 'RESULT', label: 'RESULT' },
                        { id: 'PREPARATION', label: 'PREPARATION TIPS' },
                        { id: 'COUNSELLING', label: 'COUNSELLING' },
                        { id: 'ACCEPTING-COLLEGES', label: 'ACCEPTING COLLEGES' },
                        { id: 'FAQS', label: 'FAQS' }
                    ].map((tab, index) => (
                        <button
                            key={index}
                            className={`btn ${index === 0 ? 'active' : ''}`}
                            id={`nav-${tab.id}-tab`}
                            data-bs-toggle="tab"
                            data-bs-target={`#nav-${tab.id}`}
                            type="button"
                            role="tab"
                            aria-controls={`nav-${tab.id}`}
                            aria-selected={index === 0 ? "true" : "false"}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div> */}
                <div className="tab-content pt-3" id="nav-tabContent">
                    {items.map((item, index) => (
                        <div key={index} className={`tab-pane fade ${activeTab === item.id ? 'show active' : ''}`} id={`nav-${item.id}`} role="tabpanel" aria-labelledby={`nav-${item.id}-tab`}>
                            {item.id === 'OVERVIEW' && (
                                <div className="row">
                                    <div className="col-md-7 col-lg-8 col-xl-8">
                                        <div className="text-black py-3 mb-5">
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium.</p>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, praesentium velit! At molestias eaque facilis porro ratione omnis fuga minima earum ex tempora, recusandae unde, eligendi fugit veritatis atque quam odit! Voluptatibus quaerat nostrum exercitationem officiis, aut tempore doloribus porro. Maxime illo ad neque voluptatem, omnis temporibus tempora obcaecati autem</p>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sint, illum nobis esse est, reiciendis totam eaque tempora rerum assumenda quasi provident hic iusto! Fugiat ab, nemo totam vero sit labore blanditiis? Dolorem saepe, ea sed quasi laborum ut eius illo nostrum aliquam nisi voluptate ipsum et distinctio sapiente libero repellendus ipsam numquam repudiandae, cumque iure debitis modi! Magni quam consequatur dolore molestiae nobis ab, totam recusandae? Corporis dolores quos nulla optio cumque doloribus, tempora id quis quod inventore iste dolorem! Perspiciatis, atque. Iure minima saepe asperiores voluptates, molestiae quasi enim veritatis dolor suscipit quibusdam corrupti nulla aspernatur explicabo dolorem!</p>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium.</p>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-lg-4 col-10 mx-auto col-xl-4 mb-md-5">
                                        <div className='bg-skyBlue px-lg-5 px-3 rounded'>
                                            <h5 className='fw-bold text-blue text-center pt-3 mb-3'>Upcoming Exams</h5>
                                            <Formik
                                                initialValues={{
                                                    name: '',
                                                    email: '',
                                                    contact_number: '',
                                                    message: '',
                                                    course: '',
                                                    location: '',
                                                }}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSubmit}
                                                resetForm
                                            >
                                                <Form>
                                                    <div className="mb-3">
                                                        <Field type="text" name="name" placeholder="Full Name*" className="form-control" />
                                                        <ErrorMessage name="name" component="div" className="error text-danger" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Field type="text" name="contact_number" placeholder="Contact Number*" className="form-control" />
                                                        <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Field type="email" name="email" placeholder="Email ID*" className="form-control" />
                                                        <ErrorMessage name="email" component="div" className="error text-danger" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Field type="text" name="location" placeholder="Location*" className="form-control" />
                                                        <ErrorMessage name="location" component="div" className="error text-danger" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Field type="text" name="course" placeholder="Interested Course*" className="form-control" />
                                                        <ErrorMessage name="course" component="div" className="error text-danger" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Field as="textarea" name="message" placeholder="Type your message" className="form-control" />
                                                        <ErrorMessage name="message" component="div" className="error text-danger" />
                                                    </div>

                                                    <div className="d-grid pb-3">
                                                        <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">Submit</button>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>
                                        <div className='mb-3'>
                                            <NewsList newsItems={newsData} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {item.id === 'EXAM-DATES' && (
                                <div className="row">
                                    <div className="order-2 order-md-1 col-12 text-black mb-5">
                                        <h4 className='fw-bold pt-3'>UG & PG Courses Offered by Yenepoya Medical College</h4>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </div>
                                    <div className="col-12 mb-md-5 order-1 order-md-2">
                                        <div className="row">
                                            <div className='table-responsive overflowScroll'>
                                                <table className='table table-bordered'>
                                                    <thead>
                                                        <tr>
                                                            <th>Course</th>
                                                            <th>Duration</th>
                                                            <th>Average Fees</th>
                                                            <th>Eligibility Criteria</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[
                                                            { course: 'MBBS', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' },
                                                            { course: 'MD', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' },
                                                            { course: 'MS', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' },
                                                            { course: 'MD Pediatrics', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' },
                                                            { course: 'MS Ophthalmology', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' },
                                                            { course: 'MD Anaesthesia', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' },
                                                            { course: 'MS Orthopedics', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' },
                                                            { course: 'MCh Urology', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' },
                                                            { course: 'MCh Surgical Oncology', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' },
                                                            { course: 'MD Psychiatry', duration: '2 Years', fees: '2.5 Lakh (1st Year)', eligibility: '10+2 with 70% + NEET' }
                                                        ].map((course, index) => (
                                                            <tr key={index}>
                                                                <td>{course.course}</td>
                                                                <td>{course.duration}</td>
                                                                <td>{course.fees}</td>
                                                                <td>{course.eligibility}</td>
                                                                <td className='d-lg-grid'><a href="#" className='btn ApplyNowBtn'>Apply Now</a></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Add similar structures for other tabs */}
                        </div>
                    ))}
                </div>
            </div >
        </section >
    );
}

export default OverviewSec;

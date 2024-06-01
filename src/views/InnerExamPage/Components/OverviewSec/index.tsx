import React from 'react';
import Link from 'next/link';
import YoutubeVideo from 'src/@core/components/youtube-videos';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NewsList from '../newsList';

function OverviewSec() {

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


    return (
        <section className='clgInfoSec bg-white'>
            <div className="container">
                <div className="pt-5 text-center justify-content-start d-flex flex-fill flex-wrap infoBtn" id="nav-tab" role="tablist">
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
                            className={`mb-3 btn ${index === 0 ? 'active' : ''}`}
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
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-OVERVIEW" role="tabpanel" aria-labelledby="nav-OVERVIEW-tab">
                        <div className="row">
                            <div className="order-2 order-md-1 col-md-7 text-black py-3 mb-5">
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium.</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, praesentium velit! At molestias eaque facilis porro ratione omnis fuga minima earum ex tempora, recusandae unde, eligendi fugit veritatis atque quam odit! Voluptatibus quaerat nostrum exercitationem officiis, aut tempore doloribus porro. Maxime illo ad neque voluptatem, omnis temporibus tempora obcaecati autem</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sint, illum nobis esse est, reiciendis totam eaque tempora rerum assumenda quasi provident hic iusto! Fugiat ab, nemo totam vero sit labore blanditiis? Dolorem saepe, ea sed quasi laborum ut eius illo nostrum aliquam nisi voluptate ipsum et distinctio sapiente libero repellendus ipsam numquam repudiandae, cumque iure debitis modi! Magni quam consequatur dolore molestiae nobis ab, totam recusandae? Corporis dolores quos nulla optio cumque doloribus, tempora id quis quod inventore iste dolorem! Perspiciatis, atque. Iure minima saepe asperiores voluptates, molestiae quasi enim veritatis dolor suscipit quibusdam corrupti nulla aspernatur explicabo dolorem!</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium.</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vero veniam iste tempora laboriosam. In explicabo eos quia natus at! Laudantium dolore quos quam obcaecati explicabo harum tempore impedit voluptatem nesciunt! Quod iusto ipsam facere quas reprehenderit ea corporis laudantium.</p>
                            </div>
                            <div className="col-md-5 mb-md-5 order-1 order-md-2">
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
                                <NewsList newsItems={newsData} />
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-EXAM-DATES" role="tabpanel" aria-labelledby="nav-EXAM-DATES-tab">
                        <div className="row">
                            <div className="order-2 order-md-1 col-12 text-black mb-5">
                                <h4 className='fw-bold pt-3'>UG & PG Courses Offered by Yenepoya Medical College</h4>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                {/* ... */}
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
                    </div>
                    {/* Add similar structure for remaining tabs */}
                    <div className="tab-pane fade" id="nav-ELIGIBILITY-&-REGISTRATION" role="tabpanel" aria-labelledby="nav-ELIGIBILITY-&-REGISTRATION-tab">...</div>
                    <div className="tab-pane fade" id="nav-EXAM-PATTERN" role="tabpanel" aria-labelledby="nav-EXAM-PATTERN-tab">...</div>
                    <div className="tab-pane fade" id="nav-CUTOFF" role="tabpanel" aria-labelledby="nav-CUTOFF-tab">...</div>
                    <div className="tab-pane fade" id="nav-ADMIT-CARD" role="tabpanel" aria-labelledby="nav-ADMIT-CARD-tab">...</div>
                    <div className="tab-pane fade" id="nav-EXAM-CENTERS" role="tabpanel" aria-labelledby="nav-EXAM-CENTERS-tab">...</div>
                    <div className="tab-pane fade" id="nav-RESULT" role="tabpanel" aria-labelledby="nav-RESULT-tab">...</div>
                    <div className="tab-pane fade" id="nav-PREPARATION" role="tabpanel" aria-labelledby="nav-PREPARATION-tab">...</div>
                    <div className="tab-pane fade" id="nav-COUNSELLING" role="tabpanel" aria-labelledby="nav-COUNSELLING-tab">...</div>
                    <div className="tab-pane fade" id="nav-ACCEPTING-COLLEGES" role="tabpanel" aria-labelledby="nav-ACCEPTING-COLLEGES-tab">...</div>
                    <div className="tab-pane fade" id="nav-FAQS" role="tabpanel" aria-labelledby="nav-FAQS-tab">...</div>
                </div>
            </div>
        </section>
    );
}

export default OverviewSec;

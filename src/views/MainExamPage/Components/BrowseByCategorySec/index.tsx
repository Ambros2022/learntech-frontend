import React, { useState } from 'react';
import CategoryCarousel from './CategoryCarousel'; // Adjust the import path as necessary
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NewsList from '../newsList';
import ExamCard from '../ExamCardList';

const BrowsebyCategorySec = () => {
    const examsData = {
        medical: [
            { title: 'NEET UG', date: '5th May, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            // ... other medical exams
        ],
        engineering: [
            { title: 'JEE Main', date: '15th April, 2024' },
            { title: 'BITSAT', date: '20th May, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            // ... other engineering exams
        ],
        dental: [
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            // ... other dental exams
        ],
        management: [
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            // ... other dental exams
        ],
        law: [
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            // ... other dental exams
        ],
        architecture: [
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            // ... other dental exams
        ],
        design: [
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'NEET MDS', date: '4th May, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            { title: 'AIIMS PG', date: '12th June, 2024' },
            // ... other dental exams
        ],
        // ... other categories with respective exams
    };

    const newsData = [
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 1',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 2',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 3',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            title: 'Card title 4',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        // Add more news items as needed
    ];

    const items = [
        { id: 'medical', title: 'Medical' },
        { id: 'engineering', title: 'Engineering' },
        { id: 'dental', title: 'Dental' },
        { id: 'management', title: 'Management' },
        { id: 'law', title: 'Law' },
        { id: 'architecture', title: 'Architecture' },
        { id: 'design', title: 'Design' },
        // ... other categories
    ];

    const [activeTab, setActiveTab] = useState(items[0].id);
    const [currentPage, setCurrentPage] = useState(1);
    const examsPerPage = 12;

    function handleTabClick(id) {
        setActiveTab(id);
        setCurrentPage(1); // Reset to the first page when changing tabs
    }

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

    const currentExams = examsData[activeTab]?.slice((currentPage - 1) * examsPerPage, currentPage * examsPerPage);
    const totalExams = examsData[activeTab]?.length || 0;
    const totalPages = Math.ceil(totalExams / examsPerPage);

    function handlePreviousPage() {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    function handleNextPage() {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }

    return (
        <section className='bg-white'>
            <div className="container categorySecCarousel position-relative px-5 pt-2 pb-5">
                <h2 className='fw-bold text-blue mb-5 text-center'>Browse By Category</h2>
                <CategoryCarousel items={items} handleTabClick={handleTabClick} activeTab={activeTab} />
                <div className="tab-content" id="pills-tabContent">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`tab-pane fade ${activeTab === item.id ? 'show active' : ''}`}
                            id={`pills-${item.id}`}
                            role="tabpanel"
                            aria-labelledby={`pills-${item.id}-tab`}
                        >
                            <div className='topCourseConCarousel pt-5'>
                                <div className="row ">
                                    <div className="col-lg-7 col-xl-8">
                                        <div className="row">
                                            {currentExams?.map((exam, index) => (
                                                <ExamCard key={index} title={exam.title} date={exam.date} />
                                            ))}
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination d-flex gap-3">
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
                                                            <span aria-hidden="true">{'<'}</span>
                                                        </button>
                                                    </li>
                                                    {Array.from({ length: totalPages }, (_, index) => (
                                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={handleNextPage} aria-label="Next">
                                                            <span aria-hidden="true">{'>'}</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-xl-4">
                                        <div className='bg-skyBlue px-lg-5 px-md-3 px-3 rounded'>
                                            <h5 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h5>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrowsebyCategorySec;

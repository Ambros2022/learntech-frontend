import React from 'react'
import NewsList from '../newsList';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const OverviewSec = () => {

    const blogsData = [
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        // Add more news items as needed
    ];
    const newsData = [
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
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
        <section className='innerBlogSec bg-white py-5'>
            <div className="container">
                <h1 className='fw-bold text-blue mb-3'>How to Get BDS Direct Admission in India</h1>
                <h6>Team Learntech | July 18, 2023, 13:55 IST</h6>
                <div className="row">
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">
                        <NewsList newsItems={blogsData} heading={'Latest Blogs'} />
                        <NewsList newsItems={newsData} heading={'Latest News'} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OverviewSec
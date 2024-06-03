import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactForm = ({ heading }) => {

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
        <div className='bg-skyBlue px-lg-5 px-3 rounded'>
            <h5 className='fw-bold text-blue text-center pt-3 mb-3'>{heading}</h5>
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
    )
}

export default ContactForm
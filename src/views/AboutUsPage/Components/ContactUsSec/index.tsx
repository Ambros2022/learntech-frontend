import Image from 'next/image';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactUsSec = () => {
    const initialValues = {
        fullName: '',
        email: '',
        mobileNumber: '',
        courseInMind: ''
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        mobileNumber: Yup.string().required('Mobile Number is required'),
        courseInMind: Yup.string().required('Course In Mind is required')
    });

    const onSubmit = (values,{resetForm}) => {
        console.log('Form data', values);
        resetForm();
    };

    return (
        <>
            <section>
                <div className="row g-0">
                    <div className="col-md-6 h-100">
                        <Image
                            src="/images/icons/contactImgForm.jfif"
                            width={1000}
                            height={1000}
                            alt="contact-us-img"
                            className="w-100 h-100"
                        />
                    </div>
                    <div className="col-md-6 position-relative">
                        <div className="bg-blue py-5 h-100 w-100 px-5 d-flex flex-column">
                            <div className="align-content-center h-100 w-100">
                                <h4 className="text-white fw-bold text-center mb-3">Contact Us</h4>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    <Form>
                                        <div className="row px-md-5">
                                            <div className="col-md-12 col-lg-6 col-xl-6 mb-lg-3 mb-3">
                                                <Field
                                                    type="text"
                                                    name="fullName"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                />
                                                <ErrorMessage name="fullName" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-md-12 col-lg-6 col-xl-6 mb-lg-0 mb-3">
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Email Id"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-md-12 col-lg-6 col-xl-6 mb-lg-0 mb-3">
                                                <Field
                                                    type="text"
                                                    name="mobileNumber"
                                                    className="form-control"
                                                    placeholder="Mobile Number"
                                                />
                                                <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-md-12 col-lg-6 col-xl-6 mb-lg-3 mb-3">
                                                <Field
                                                    type="text"
                                                    name="courseInMind"
                                                    className="form-control"
                                                    placeholder="Course In Mind"
                                                />
                                                <ErrorMessage name="courseInMind" component="div" className="text-danger" />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn submtBtn">Submit</button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUsSec;

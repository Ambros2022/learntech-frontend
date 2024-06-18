import Image from 'next/image';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SideContactUsFormfrom from 'src/@core/components/popup/SideContactUsForm';

const ServicesSec = () => {
    const formik = useFormik({
        initialValues: {
            Name: '',
            Email: '',
            Number: '',
            course: '',
            location: '',
            message: ''
        },
        validationSchema: Yup.object({
            Name: Yup.string().required('Name is required'),
            Email: Yup.string().email('Invalid email address').required('Email is required'),
            Number: Yup.string().required('Number is required'),
            course: Yup.string().required('Course is required'),
            location: Yup.string().required('Location is required'),
            message: Yup.string().required('Message is required')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            resetForm();
        },
    });

    return (
        <>
            <section className='bg-skyBlue py-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-xl-7 col-lg-6">
                            <div className='text-center h-100 d-flex justify-content-center servicesImg'>
                                <Image src='/images/icons/services.png' className='align-self-center' width={300} height={300} alt='services-img' />
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-5 col-lg-6 border rounded px-xl-5 px-lg-4 col-10 mx-md-0 mx-auto">
                            <h4 className='pt-3 mb-3 fw-bold text-blue text-center'>
                               Talk to Our Expert
                            </h4>
                            <SideContactUsFormfrom />
                            {/* <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3 row">
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            name="Name"
                                            className='form-control'
                                            placeholder='Enter Name'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.Name}
                                        />
                                        {formik.touched.Name && formik.errors.Name ? (
                                            <div className="text-danger">{formik.errors.Name}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-lg-6 mb-lg-0 mb-md-3 mb-3">
                                        <input
                                            type="email"
                                            name="Email"
                                            className='form-control'
                                            placeholder='Enter Email'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.Email}
                                        />
                                        {formik.touched.Email && formik.errors.Email ? (
                                            <div className="text-danger">{formik.errors.Email}</div>
                                        ) : null}
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            name="Number"
                                            className='form-control'
                                            placeholder='Enter Number'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.Number}
                                        />
                                        {formik.touched.Number && formik.errors.Number ? (
                                            <div className="text-danger">{formik.errors.Number}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-lg-6 mb-md-3 mb-lg-0 mb-3">
                                        <input
                                            type="text"
                                            name="course"
                                            className='form-control'
                                            placeholder='Interested Course'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.course}
                                        />
                                        {formik.touched.course && formik.errors.course ? (
                                            <div className="text-danger">{formik.errors.course}</div>
                                        ) : null}
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            name="location"
                                            className='form-control'
                                            placeholder='Enter Location'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.location}
                                        />
                                        {formik.touched.location && formik.errors.location ? (
                                            <div className="text-danger">{formik.errors.location}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-md-12">
                                        <textarea
                                            name="message"
                                            className='form-control'
                                            placeholder='Type your Message'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.message}
                                        />
                                        {formik.touched.message && formik.errors.message ? (
                                            <div className="text-danger">{formik.errors.message}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mb-3 text-center">
                                    <input type="submit" className='btn submitBtn' />
                                </div>
                            </form> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ServicesSec;

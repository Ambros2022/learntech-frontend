import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ExpertSec = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            comment: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            phone: Yup.string()
                .matches(/^[0-9]+$/, 'Must be only digits')
                .min(10, 'Must be at least 10 digits')
                .max(15, 'Must be 15 digits or less')
                .required('Required'),
            comment: Yup.string()
                .max(500, 'Must be 500 characters or less')
                .required('Required')
        }),
        onSubmit: values => {
            console.log(values);
        }
    });

    return (
        <>
            <section className='bg-skyBlue py-3'>
                <div className="container">
                    <div className="d-flex gap-3 flex-wrap mb-3">
                        <button className='btn btn-primary'><i className="bi bi-linkedin"></i> Share</button>
                        <button className='btn btn-info text-white'><i className="bi bi-facebook"></i> Share</button>
                        <button className='btn btn-dark text-white'><i className="bi bi-twitter-x"></i> Tweet</button>
                        <button className='btn btn-success text-white'><i className="bi bi-share-fill"></i> Share</button>
                        <button className='btn btn-danger text-white'><i className="bi bi-pinterest"></i> Pin</button>
                        <button className='btn btn-secondary text-white'><i className="bi bi-envelope"></i> Email</button>
                    </div>
                    <h2 className='fw-bold text-blue pt-3'>Leave a Comment</h2>
                    <div className="row py-3">
                        <div className="col-10 me-auto">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className='form-control'
                                                name='name'
                                                placeholder='Enter Name'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                            />
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className="text-danger">{formik.errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                className='form-control'
                                                name='email'
                                                placeholder='Enter Email'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className="text-danger">{formik.errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className='form-control'
                                                name='phone'
                                                placeholder='Enter Phone Number'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phone}
                                            />
                                            {formik.touched.phone && formik.errors.phone ? (
                                                <div className="text-danger">{formik.errors.phone}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <textarea
                                                className='form-control'
                                                name='comment'
                                                placeholder='Enter Comment'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.comment}
                                            />
                                            {formik.touched.comment && formik.errors.comment ? (
                                                <div className="text-danger">{formik.errors.comment}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <input type="submit" className='btn submitBtn' value="Submit" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ExpertSec;

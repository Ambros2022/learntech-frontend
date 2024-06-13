import Image from 'next/image';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SideContactUsFormfrom from 'src/@core/components/popup/SideContactUsForm';

const AdvertiseSec = ({ data }) => {


    return (
        <>
            <section className='bg-white'>
                <div className="container">
                    <h1 className='pt-3 mb-3 text-blue fw-bold'>
                        Advertise With Us
                    </h1>
                    <div className="row">
                        <div className="col-xl-9 col-lg-8 col-md-7">
                            <div dangerouslySetInnerHTML={{ __html: data?.top_description }} />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5">
                            <div className="row ">
                                <div className="col-md-12 col-lg-12 col-10 mx-md-0 mx-auto ">
                                <h4 className='text-center fw-bold text-blue pt-2'>Connect With Us</h4>
                                    <SideContactUsFormfrom />
                                    {/* <form onSubmit={formik.handleSubmit} className='bg-skyBlue rounded border p-3 mb-3'>
                                        <h4 className='text-center fw-bold text-blue pt-2'>Connect With Us</h4>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className='form-control'
                                                name='Name'
                                                placeholder='Enter Name'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Name}
                                            />
                                            {formik.touched.Name && formik.errors.Name ? (
                                                <div className="text-danger">{formik.errors.Name}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                className='form-control'
                                                name='Email'
                                                placeholder='Enter Email'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Email}
                                            />
                                            {formik.touched.Email && formik.errors.Email ? (
                                                <div className="text-danger">{formik.errors.Email}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className='form-control'
                                                name='Phone'
                                                placeholder='Enter Phone Number'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Phone}
                                            />
                                            {formik.touched.Phone && formik.errors.Phone ? (
                                                <div className="text-danger">{formik.errors.Phone}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <textarea
                                                className='form-control'
                                                name='Message'
                                                placeholder='Enter Message'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Message}
                                            />
                                            {formik.touched.Message && formik.errors.Message ? (
                                                <div className="text-danger">{formik.errors.Message}</div>
                                            ) : null}
                                        </div>
                                        <div className="text-center">
                                            <input type="submit" className='btn submitBtn' />
                                        </div>
                                    </form> */}
                                </div>
                                <div className="col-md-12 col-lg-12 mb-3 mx-md-0 mx-auto col-10">
                                    <div className='bg-skyBlue p-3 rounded border text-center'>
                                        <Image src="/images/icons/advertisement.png" width={200} height={200} alt={'advertisement-logo'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdvertiseSec;

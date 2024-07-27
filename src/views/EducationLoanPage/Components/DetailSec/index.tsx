import Image from 'next/image'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import EducationLoanPage from 'src/@core/components/popup/EducationloanForm'

const DetailSec = () => {
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        mobileNumber: Yup.string().required('Mobile Number is required'),
        course: Yup.string().required('Course selection is required'),
        city: Yup.string().required('City selection is required'),
        bank: Yup.string().required('Bank selection is required'),
        notes: Yup.string().max(500, 'Notes must be 500 characters or less').required('Notes is required'),
    });

    return (
        <>
            <section className='bg-white DetailSec'>
                <div className="row g-0">
                    <div className="col-md-6">
                        <Image src='/images/icons/contactImgForm.jfif' width={500} height={500} alt='contact-form' style={{ objectFit: 'cover' }} className='w-100 h-100' />
                    </div>
                    <div className="col-md-6 bg-skyBlue px-5 py-5">
                        <h2 className='fw-bold text-center text-blue mb-3'>ENTER YOUR DETAILS</h2>
                        {/* <Formik
                            initialValues={{
                                fullName: '',
                                email: '',
                                mobileNumber: '',
                                course: '',
                                city: '',
                                bank: '',
                                notes: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log('Form data', values);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <Field type="text" name="fullName" className='form-control' placeholder='Your Full Name' />
                                            <ErrorMessage name="fullName" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <Field type="email" name="email" className='form-control' placeholder='Your Email Id' />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <Field type="text" name="mobileNumber" className='form-control' placeholder='Your Mobile Number' />
                                            <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <Field as="select" name="course" className='form-control'>
                                                <option value="" disabled>Select a Course</option>
                                                <option value="course1">Course 1</option>
                                                <option value="course2">Course 2</option>
                                                <option value="course3">Course 3</option>
                                            </Field>
                                            <ErrorMessage name="course" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <Field as="select" name="city" className='form-control'>
                                                <option value="" disabled>Select your city</option>
                                                <option value="city1">City 1</option>
                                                <option value="city2">City 2</option>
                                                <option value="city3">City 3</option>
                                            </Field>
                                            <ErrorMessage name="city" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <Field as="select" name="bank" className='form-control'>
                                                <option value="" disabled>Select a bank</option>
                                                <option value="bank1">Bank 1</option>
                                                <option value="bank2">Bank 2</option>
                                                <option value="bank3">Bank 3</option>
                                            </Field>
                                            <ErrorMessage name="bank" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-lg-12 mb-3">
                                            <Field as="textarea" name="notes" className='form-control' placeholder='Notes' />
                                            <ErrorMessage name="notes" component="div" className="text-danger" />
                                        </div>
                                        <div className='text-center'>
                                            <button type="submit" className='btn submitBtn' disabled={isSubmitting}>Submit</button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik> */}
                        <EducationLoanPage/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DetailSec

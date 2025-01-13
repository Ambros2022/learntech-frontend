import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios1 from 'src/configs/axios'


const BannerSec = () => {

    const [, setSearchResults] = useState([]);

    const [, setLoading] = useState(false);

    const phoneRegExp = /^(91\d{10}|(?!91)\d{3,})$/;

    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
        contact_number: Yup.string().required("Phone Number is required"),
        message: Yup.string().required('Message is required'),
    });



    const handleSubmit = async (values, { resetForm }) => {
        try {
            setLoading(true);
            const response = await axios1.post('api/website/enquiry', values);
            alert('Successfully Submitted');
            console.log('Response:', response.data);
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <section className='errCon py-5'>
                <div className="container">
                    <div className="row">
                        <div className=" col-md-8 d-flex justify-content-center">
                            <div className='w-100 text-center'>
                                <h1 className='fw-bold text-blue'>404: The page you are looking for isn't here</h1>
                                <h6>You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation</h6>
                                <Image src="/images/icons/404-error.jpg" className="pt-4" width={300} height={300} alt='error 404 image' /><br />
                                <Link href='/' className='mt-3 btn errBtn mb-3'>BACK TO HOME</Link>
                            </div>
                        </div>
                        <div className="col-md-4 px-md-5 px-5">
                            <h5 className="pb-3 fw-bold text-center text-blue">Contact Us</h5>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    contact_number: '',
                                    message: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                resetForm
                            >
                                <Form>
                                    <div className="mb-3">
                                        <Field type="text" name="name" placeholder="Enter Name" className="form-control" />
                                        <ErrorMessage name="name" component="div" className="error text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="error text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="text" name="contact_number" placeholder="Enter Phone Number" className="form-control" />
                                        <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field as="textarea" name="message" placeholder="Enter message" className="form-control" />
                                        <ErrorMessage name="message" component="div" className="error text-danger" />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">Submit</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BannerSec
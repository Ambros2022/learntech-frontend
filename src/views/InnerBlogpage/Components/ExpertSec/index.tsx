import React, { FC, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { saveAs } from 'file-saver'
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    EmailShareButton,
    PinterestShareButton,
    EmailIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share'
import { RWebShare } from "react-web-share";


const ExpertSec = ({ data }) => {
    const router = useRouter();
    // const location = "https://bangalorestudy.com/blog/special-education-at-new-horizon-group-of-schools";
    const location = `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`;
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        contact_number: Yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Must be at least 10 digits')
            .max(15, 'Must be 15 digits or less')
            .required('Required'),
        current_url: Yup.string()
            .max(500, 'Must be 500 characters or less')
            .required('Required')
    });

    const handleSubmit = async (values, { resetForm }) => {

        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('contact_number', values.contact_number);
            formData.append('current_url', values.current_url);
            const response = await axios.post('api/website/enquiry', formData);


            if (response.status === 200) {
                toast.dismiss();
                toast.success('Thank you. We will get back to you.');
                resetForm();


                router.push('/thank-you');
            }

        } catch (error) {
            toast.error('try again later!');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <section className='bg-skyBlue py-3'>
                <div className="container">
                    <div className="d-flex gap-3 flex-wrap mb-3">
                        <LinkedinShareButton url={location}>
                            <button className='btn  btn-primary'><i className="bi me-2 bi-linkedin"></i>Share</button>
                        </LinkedinShareButton>
                        <TwitterShareButton
                            url={location}
                            title={data?.meta_title}
                        >
                            <button className='btn btn-dark me-2 text-white'><i className="bi me-2 bi-twitter-x"></i>Tweet</button>
                        </TwitterShareButton>
                        <FacebookShareButton
                            url={location}
                            quote={data?.meta_title}
                            hashtag={data?.meta_title}
                        >
                            <button className='btn btn-primary text-white'><i className="bi me-2 bi-facebook"></i>Share</button>
                        </FacebookShareButton>



                        <PinterestShareButton
                            url={location}
                            media={data?.meta_title}
                        >
                            <button className='btn btn-danger text-white'><i className="bi me-2 bi-pinterest"></i>Pin</button>
                        </PinterestShareButton>
                        <WhatsappShareButton
                            url={location}
                            title={data?.meta_title}

                        >
                            <button className='btn btn-success text-white'> <i className="bi me-2 bi-whatsapp"></i>Share</button>
                        </WhatsappShareButton>

                        <RWebShare
                            data={{
                                text: `${data?.meta_title}`,
                                url: `${location}`,
                                title: `${data?.meta_title}`,
                            }}

                        >
                            <button className='btn btn-dark text-white'><i className="bi me-2 bi-share-fill"></i>Share</button>
                        </RWebShare>
                        {/* <button className='btn btn-success text-white'><i className="bi bi-share-fill"></i></button> */}

                    </div>



                    <h2 className='fw-bold text-blue pt-3'>Leave a Comment</h2>
                    <div className="row py-3">
                        <div className="col-10 me-auto">
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    contact_number: '',
                                    current_url: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                resetForm
                            >
                                <Form >
                                    <div className="row">
                                        <div className="col-lg-4 col-12 mb-3 ">
                                            <Field type="text" name="name" placeholder="Enter Name" className="form-control" />
                                            <ErrorMessage name="name" component="div" className="error text-danger" />
                                        </div>
                                        <div className="col-lg-4 col-md-12 mb-3 ">
                                            <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
                                            <ErrorMessage name="email" component="div" className="error text-danger" />
                                        </div>
                                        <div className=" col-lg-4 col-md-12 mb-3 ">
                                            <PhoneInputField name="contact_number" />
                                            {/* <Field type="text" name="phoneNumber" placeholder="Enter Phone Number" className="form-control" /> */}
                                            <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                                        </div>

                                        <div className="col-lg-12  col-md-12 mb-3 ">
                                            <Field as="textarea" name="current_url" placeholder="Enter Comment" className="form-control" />
                                            <ErrorMessage name="current_url" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className='mb-3 text-center'>
                                        <input type="submit" className='btn submitBtn' value="Submit" />
                                    </div>

                                </Form>
                            </Formik>

                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default ExpertSec;

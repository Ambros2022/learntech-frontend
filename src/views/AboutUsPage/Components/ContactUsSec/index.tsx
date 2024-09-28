import React from 'react';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'src/configs/axios';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';

const ContactUsSec = () => {
    const router = useRouter();

    const phoneRegExp = /^(91\d{10}|(?!91)\d{3,})$/;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required').trim(),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
        mobileNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
        courseInMind: Yup.string().required('Course In Mind is required').trim(),
        location: Yup.string().required('Location is required').trim(),
        message: Yup.string().trim(),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.fullName);
            formData.append('email', values.email);
            formData.append('contact_number', values.mobileNumber);
            formData.append('course_in_mind', values.courseInMind);
            formData.append('current_url', window.location.href);
            formData.append('message', values.message || '');
            formData.append('location', values.location || '');
            const response = await axios.post('api/website/enquiry', formData);

            if (response.status === 200) {
                toast.dismiss();
                toast.success('Thank you. We will get back to you.');
                resetForm();
                router.push('/thank-you');
            }
        } catch (error) {
            toast.error('Please try again later!');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <section>
            <div className="row g-0">
                <div className="col-md-6">
                    <Image
                        src="/images/icons/contactImgForm.JFIF"
                        width={1000}
                        height={1000}
                        alt="contact-us-img"
                        className="w-100 h-100"
                        style={{objectFit:'cover'}}
                    />
                </div>
                <div className="col-md-6 position-relative">
                    <div className="bg-blue py-5 h-100 w-100 px-5 d-flex flex-column">
                        <div className="align-content-center h-100 w-100">
                            <h4 className="text-white fw-bold text-center mb-4">Contact Us</h4>
                            <Formik
                                initialValues={{
                                    fullName: '',
                                    email: '',
                                    mobileNumber: '',
                                    courseInMind: '',
                                    location:'',
                                    message: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    <div className="row px-md-5">
                                        <div className="col-md-12 mb-3">
                                            <Field
                                                type="text"
                                                name="fullName"
                                                className="form-control"
                                                placeholder="Full Name"
                                            />
                                            <ErrorMessage name="fullName" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <Field
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email Id"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <PhoneInputField name="mobileNumber" />
                                            <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <Field
                                                type="text"
                                                name="courseInMind"
                                                className="form-control"
                                                placeholder="Course In Mind"
                                            />
                                            <ErrorMessage name="courseInMind" component="div" className="text-danger" />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <Field
                                                type="text"
                                                name="location"
                                                className="form-control"
                                                placeholder="Location"
                                            />
                                            <ErrorMessage name="location" component="div" className="text-danger" />
                                        </div>
                                         <div className="col-md-12 mb-3">
                                            <Field
                                                as="textarea"
                                                name="message"
                                                className="form-control"
                                                placeholder="Type your message"
                                            />
                                            <ErrorMessage name="message" component="div" className="text-danger" />
                                        </div> 
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUsSec;

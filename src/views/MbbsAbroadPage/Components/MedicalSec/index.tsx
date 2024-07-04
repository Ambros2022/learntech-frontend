import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required').trim(),
    contact: Yup.string().required('Contact Number is required').trim(),
    email: Yup.string().email('Invalid email address').required('Email is required').trim(),
    location: Yup.string().required('Location is required').trim(),
    country: Yup.string().required('Preferred Country is required').trim(),
    college: Yup.string().notRequired().trim(), // College is optional
    message: Yup.string().notRequired().trim(), // Message is optional
});

const MedicalSec = ({ data = {} }: { data?: { meta_title?: string, meta_description?: string } }) => {
    const router = useRouter();

    const initialValues = {
        name: '',
        contact: '',
        email: '',
        location: '',
        country: '',
        college: '',
        message: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('contact_number', values.contact);
            formData.append('email', values.email);
            formData.append('location', values.location);
            formData.append('country', values.country);
            formData.append('college_name', values.college || '');
            formData.append('message', values.message || '');
            formData.append('current_url', window.location.href);
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
        <section className='py-5 bg-white'>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-lg-8 col-xl-8">
                        <p className='text-black'>{data.meta_title}</p>
                        <p className='text-black'>{data.meta_description}</p>
                    </div>
                    <div className="col-md-5 col-lg-4 col-10 mx-auto col-xl-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form className='bg-skyBlue mbbsAbroad rounded p-3'>
                                    <h4 className='text-blue fw-bold text-center mb-3'>Start Your Medical Journey</h4>
                                    <div className="mb-3">
                                        <Field type="text" className='form-control' name='name' placeholder='Full Name*' />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <PhoneInputField name='contact' />
                                        <ErrorMessage name="contact" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="email" className='form-control' name='email' placeholder='Email ID*' />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="text" className='form-control' name='location' placeholder='Location*' />
                                        <ErrorMessage name="location" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="text" className='form-control' name='country' placeholder='Preferred Country*' />
                                        <ErrorMessage name="country" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="text" className='form-control' name='college' placeholder='Preferred College' />
                                    </div>
                                    <div className="mb-3">
                                        <Field as="textarea" className='form-control' name='message' placeholder='Type your message' />
                                    </div>
                                    <div className="mb-3 text-center">
                                        <button type="submit" className='btn submitBtn'>Make me a Doctor!</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MedicalSec;

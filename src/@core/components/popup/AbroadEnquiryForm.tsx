import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { saveAs } from 'file-saver'
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';
interface Props {
    page?: any;
    onChanges?: any;
    placeholder?: any;
}

const EnquiryForm: FC<Props> = ({ page, placeholder = 'Stream', ...rest }) => {
    const router = useRouter();

    const phoneRegExp = /^(91\d{10}|(?!91)\d{3,})$/;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').trim(),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
        contact_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
        course: Yup.string().required('Course is required').trim(),
        location: Yup.string().required('Location is required').trim(),
    });

    const handleSubmit = async (values, { resetForm }) => {

        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('contact_number', values.contact_number);
            formData.append('location', values.location);
            formData.append('course_in_mind', values.course);
            formData.append('college_name', values.college_name);
            formData.append('description', values.description);
            formData.append('current_url', window.location.href);
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
        <Formik
            initialValues={{
                name: '',
                contact_number: '',
                email: '',
                location: '',
                course: '',
                college_name: '',
                description: '',

            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            resetForm
        >
            <Form className="bg-skyBlue px-3 px-md-5  pt-3  pt-md-5 pb-3">
                <div className='row mb-3'>
                    <div className='text-center mb-3'>
                        <h3 className='fw-bold text-blue'>Unlock Study Abroad Opportunities!
                        </h3>
                        <p className='stdud15'>From choosing the right university to securing your admission, our experts are here to support your journey to international academic success.
                        </p>
                    </div>
                    <div className="mb-3">
                        <Field type="text" name="name" placeholder="Full Name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field type="email" name="email" placeholder="Email ID" className="form-control" />
                        <ErrorMessage name="email" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <PhoneInputField name="contact_number" />
                        <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                    </div>

                    <div className="mb-3">
                        <Field type="text" name="location" placeholder="Location" className="form-control" />
                        <ErrorMessage name="location" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field type="text" name="college_name" placeholder="Preferred College" className="form-control" />
                        <ErrorMessage name="college_name" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field type="text" name="course" placeholder="Preferred Course" className="form-control" />
                        <ErrorMessage name="course" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field as="textarea" name="description" placeholder="Type your message" className="form-control" />
                        <ErrorMessage name="description" component="div" className="error text-danger" />
                    </div>
                </div>

                <div className="text-center reqBtn px-xl-4 px-lg-3 px-md-3 px-1">
                    <button type="submit" className="btn onBrdBtn">Get Onboard Now!</button>
                </div>

            </Form>
        </Formik>
    );
};

export default EnquiryForm;
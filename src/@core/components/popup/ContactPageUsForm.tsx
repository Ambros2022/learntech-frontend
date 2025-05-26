import React, { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';
interface Props {
    page?: any;
    onChanges?: any;
}

const contact_numberPageUsForm: FC<Props> = ({ }) => {
    const router = useRouter();


    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Full Name is required'),
        contact_number: Yup.string().required('contact_number Number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        location: Yup.string().required('Location is required'),
        course: Yup.string().required('Preferred course is required'),
        college: Yup.string().notRequired(), // College is optional
        message: Yup.string().notRequired(), // Message is optional
    });


    const initialValues = {
        name: '',
        contact_number: '',
        email: '',
        location: '',
        course: '',
        college: '',
        message: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('contact_number', values.contact_number);
            formData.append('location', values.location);
            formData.append('course_in_mind', values.course);
            formData.append('college_name', values.college);
            formData.append('description', values.message || '');
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form className='bg-skyBlue mbbsAbroad rounded p-3'>
                    <h2 className='text-blue fw-bold text-center mb-3'>Contact for Personalized Support!
                    </h2>
                    <div className="mb-3">
                        <Field type="text" className='form-control' name='name' placeholder='Full Name*' />
                        {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> : null}
                    </div>
                    <div className="mb-3">
                        <Field type="email" className='form-control' name='email' placeholder='Email ID*' />
                        {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
                    </div>
                    <div className="mb-3">
                        <PhoneInputField name='contact_number' />
                        {/* <Field type="text" className='form-control' name='contact_number' placeholder='contact_number Number*' /> */}
                        {errors.contact_number && touched.contact_number ? <div className="text-danger">{errors.contact_number}</div> : null}
                    </div>
                    <div className="mb-3">
                        <Field type="text" className='form-control' name='location' placeholder='Location*' />
                        {errors.location && touched.location ? <div className="text-danger">{errors.location}</div> : null}
                    </div>
                    <div className="mb-3">
                        <Field type="text" className='form-control' name='course' placeholder='Preferred Course*'>
                        </Field>
                        {errors.course && touched.course ? <div className="text-danger">{errors.course}</div> : null}
                    </div>
                    <div className="mb-3">
                        <Field type="text" className='form-control' name='college' placeholder='Preferred College'>
                        </Field>
                        {errors.college && touched.college ? <div className="text-danger">{errors.college}</div> : null}
                    </div>
                    <div className="mb-3">
                        <Field as="textarea" className='form-control' name='message' placeholder='Type your message' />
                        {errors.message && touched.message ? <div className="text-danger">{errors.message}</div> : null}
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className='btn submitBtn'>Submit</button>
                    </div>
                </Form>
            )}
        </Formik>

    );
};

export default contact_numberPageUsForm;

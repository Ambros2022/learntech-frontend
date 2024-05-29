// ExpertForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';// Import Axios
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';

const ExpertForm = () => {
    const router = useRouter();
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    // Formik setup with validation using Yup
    const formik = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            email: '',
            stream: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required').trim(),
            mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required").trim(),
            email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
            stream: Yup.string().required('Stream is required').trim(),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                toast.loading('Processing');
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('email', values.email);
                formData.append('contact_number', values.mobile);
                // formData.append('location', values.location);
                formData.append('course_in_mind', values.stream);
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
        },
    });


    return (
        <form onSubmit={formik.handleSubmit} className="container " >
            <div className="row">
                <div className="col-md-6" id="animation16">
                    <div className="mb-3 ms-md-5">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            name="name"
                            placeholder="Enter Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className='text-danger'>{formik.errors.name}</div>
                        ) : null}
                    </div>
                </div>
                <div className="col-md-6" id="animation17">
                    <div className="mb-3 me-md-5">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputMobile"
                            name="mobile"
                            placeholder="Enter Mobile"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mobile}
                        />
                        {formik.touched.mobile && formik.errors.mobile ? (
                            <div className='text-danger'>{formik.errors.mobile}</div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6" id="animation18">
                    <div className="mb-3 ms-md-5">
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            name="email"
                            placeholder="Enter Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-danger'>{formik.errors.email}</div>
                        ) : null}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3 me-md-5" id="animation19">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputStream"
                            name="stream"
                            placeholder="Enter Stream"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.stream}
                        />
                        {formik.touched.stream && formik.errors.stream ? (
                            <div className='text-danger'>{formik.errors.stream}</div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="text-center reqBtn">
                <button type="submit" className="btn">Request for a Call Back</button>
            </div>
        </form>
    );
}

export default ExpertForm;

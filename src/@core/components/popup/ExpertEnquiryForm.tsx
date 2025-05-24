import React, { FC, useCallback, useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios1 from 'src/configs/axios';

interface Props {
    page?: any;
    onChanges?: any;
    placeholder?: string;
}

const EnquiryForm: FC<Props> = ({ placeholder = 'Stream', }) => {
    const router = useRouter();
    const isMountedRef = useIsMountedRef();
    const [streams, setStreams] = useState<any[]>([]);

    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').trim(),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
        contact_number: Yup.string().required('Phone Number is required'),
        course: Yup.string().required('Stream is required').trim(),

    });

    const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
        try {
            toast.loading('Processing');
            console.log('Form values:', values);
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('contact_number', values.contact_number);
            formData.append('location', values.location);
            formData.append('course_in_mind', values.course);
            formData.append('current_url', window.location.href);
            const response = await axios.post('/api/website/enquiry', formData);

            if (response.status === 200) {
                toast.dismiss();
                toast.success('Thank you. We will get back to you.');
                resetForm();
                router.push('/thank-you');
            } else {
                console.error('Failed to submit form:', response);
                toast.error('Failed to submit form. Please try again.');
            }
        } catch (error) {
            toast.dismiss();
            toast.error('Error submitting form. Please try again later!');
            console.error('Error submitting form:', error);
        }
    };

    const getStreamData = useCallback(async (size = 10000) => {
        try {
            const response = await axios1.get(`/api/website/stream/get?size=${size}`);
            if (response.data.status === 1) {
                const streamData = response.data.data.map((stream: any) => ({
                    label: stream.name,
                    value: stream.name
                }));
                if (isMountedRef.current) {
                    setStreams(streamData);
                }
            } else {
                console.error('Failed to fetch streams');
            }
        } catch (error) {
            console.error('Error fetching streams:', error);
        }
    }, [isMountedRef]);


    useEffect(() => {
        getStreamData();

    }, [getStreamData]);

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                contact_number: '',
                course: '',

            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ }) => (
                <Form className="container expertInquirySec">
                    <div className='row mb-3'>
                        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
                            <Field type="text" name="name" placeholder="Enter Name" className="form-control text-black" />
                            <ErrorMessage name="name" component="div" className="error text-danger" />
                        </div>
                        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
                            <PhoneInputField name="contact_number" />
                            <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                        </div>
                        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
                            <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="error text-danger" />
                        </div>
                        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
                            <Field
                                as="select"
                                name="course"
                                className="form-control custom-select-bold-arrow"
                            >
                                <option value="">Select {placeholder}</option>
                                {streams.map((item) => (
                                    <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="course" component="div" className="error text-danger" />
                        </div>

                    </div>
                    <div className="text-center px-xl-4 px-lg-3 px-md-3 px-1">
                        <button type="submit" className="btn reqBtn">Request for a Call Back</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EnquiryForm;



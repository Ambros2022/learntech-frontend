import React, { FC, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'; // Ensure correct import
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';
import FileUpload from 'src/@core/components/dropzone/FileUpload';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import {DatePicker} from "@nextui-org/react";


interface Props {
    locations: any[];
    data: any[];
}



const JobEnquiryForm: FC<Props> = ({ locations, data }) => {
    const router = useRouter();
    const [fileNamesphoto, setFileNamesphoto] = useState<any>([]);
    const [selectedphoto, setSelectedphoto] = useState('');

    const handleFileChangephoto = (files: any[]) => {
        setSelectedphoto(files[0]);
        setFileNamesphoto(
            files.map((file) => ({
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

    };

    const initialValues = {
        fullName: '',
        email: '',
        phone: '',
        d_o_b: '',
        jobs_position_id: '',
        job_location_id: '',
        currentLocation: '',
        total_exp: '',
        resume: null  // Initialize resume as null
    };

    const phoneRegExp = /^(91\d{10}|(?!91)\d{3,})$/;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required').trim(),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone Number is required'),
        d_o_b: Yup.string().required('Date Of Birth is required').trim(),
        jobs_position_id: Yup.string().required('Post Applied is required').trim(),
        job_location_id: Yup.string().required('Job Location is required').trim(),
        currentLocation: Yup.string().required('Current Location is required').trim(),
        total_exp: Yup.string().required('Total Experience is required').trim(),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.fullName);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('d_o_b', values.d_o_b);
            formData.append('current_location', values.currentLocation);
            formData.append('total_exp', values.total_exp);
            formData.append('jobs_position_id', values.jobs_position_id);
            formData.append('job_location_id', values.job_location_id);
            // formData.append('resume', values.resume); // Append the resume file
            formData.append('resume', selectedphoto);

            formData.append('current_url', window.location.href);
            const response = await axios.post('api/website/addjobsenquires/get', formData);

            if (response.status === 200) {
                toast.dismiss();
                toast.success('Thank you. We will get back to you.');
                resetForm();
                router.push('/thank-you');
            }
        } catch (error) {
            toast.error('Error submitting form. Please try again later.');
            console.error('Error submitting form:', error);
        }
    };


    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className='mt-3'>
                <div className='row mb-md-3 careerContact'>
                    <div className='col-md-6'>
                        <div className='mb-3'>
                            <Field type='text' name='fullName' className='form-control' placeholder='Full Name*' />
                            <ErrorMessage name='fullName' component='div' className='text-danger' />
                        </div>
                    </div>
                    <div className='col-md-6 careerContact'>
                        <div className='mb-3'>
                            <Field type='email' name='email' className='form-control' placeholder='Email Id' />
                            <ErrorMessage name='email' component='div' className='text-danger' />
                        </div>
                    </div>
                </div>
                <div className='row mb-md-3 careerContact'>
                    <div className='col-md-6'>
                        <div className='mb-3 Jobenquiryphoneinput'>
                            <PhoneInputField name='phone' />
                            <ErrorMessage name='phone' component='div' className='text-danger' />
                        </div>
                    </div>
                    <div className='col-md-6 careerContact'>
                        <div className='mb-3'>
                            <Field type='text' name='d_o_b' className='form-control' placeholder='DOB: DD/MM/YY' />
                            <ErrorMessage name='d_o_b' component='div' className='text-danger' />
                        </div>
                    </div>
                </div>
                <div className='row mb-md-3 careerContact'>
                    <div className='col-md-6'>
                        <div style={{ position: 'relative' }}>
                            <div className='mb-3 color-joenquiry'>
                                <Field as='select' name='jobs_position_id' className='form-control' placeholder='Post Applied'>
                                    <option value=''>Position Applied</option>
                                    {data.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}

                                </Field>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%) ' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i>
                                </div>

                                <ErrorMessage name='jobs_position_id' component='div' className='text-danger' />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div style={{ position: 'relative' }}>
                            <div className=' mb-3 color-joenquiry'>
                                <Field as='select' name='job_location_id' className='form-control' placeholder='Select Job Location'>
                                    <option value=''>Job Location</option>
                                    {locations.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </Field>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%) ' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i>
                                </div>
                                <ErrorMessage name='job_location_id' component='div' className='text-danger' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mb-md-3 careerContact'>
                    <div className='col-md-6'>
                        <div className='mb-3'>
                            <Field
                                type='text'
                                name='currentLocation'
                                className='form-control'
                                placeholder='Current Location'
                            />
                            <ErrorMessage name='currentLocation' component='div' className='text-danger' />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='mb-3'>
                            <Field
                                type='text'
                                name='total_exp'
                                className='form-control'
                                placeholder='Total Experience in Years'
                            />
                            <ErrorMessage name='total_exp' component='div' className='text-danger' />
                        </div>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-4'>
                        <div className='mb-3 '>
                            <FileUpload
                                onFileChange={handleFileChangephoto}
                                maxSize={2000000}
                                fileNames={fileNamesphoto}
                                label='Upload Resume'
                            
                                acceptedFormats={['.pdf']}
                                rejectionMessage='Try another file for upload.'
                                isAddMode={true} 
                                olddata={""}
                              />

                            <ErrorMessage name='resume' component='div' className='text-danger' />
                        </div>
                    </div>
                </div>

                <div className='text-center'>
                    <button type='submit' className='btn submitBtn'>
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default JobEnquiryForm;

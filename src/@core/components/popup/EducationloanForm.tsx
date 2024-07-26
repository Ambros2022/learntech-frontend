import React, { FC, useCallback, useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { saveAs } from 'file-saver'
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';
import axios1 from 'src/configs/axios'

interface Props {
    page?: any;
    onChanges?: any;
}

const EducationLoanPage: FC<Props> = ({ page, ...rest }) => {
    const router = useRouter();
    const [cities, setCities] = useState<any>([]);  // Use any type for tabs
    const [courses, setCourses] = useState<any>([]);  // Use any type for tabs

    const getcities = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/website/cities/get', { params: roleparams });
            setCities(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);


    const getcourses = useCallback(async () => {

        try {
            const roleparams: any = {}

            roleparams['size'] = 10000;
            const response = await axios1.get('api/website/generalcourse/get', { params: roleparams });
            setCourses(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getcities();
        getcourses();
    }, [])


    const phoneRegExp = /^(91\d{10}|(?!91)\d{3,})$/;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        contact_number: Yup.string().required('Mobile Number is required'),
        course: Yup.string().required('Course selection is required'),
        city: Yup.string().required('City selection is required'),
        bank: Yup.string().required('Bank selection is required'),
        notes: Yup.string().max(500, 'Notes must be 500 characters or less').required('Notes is required'),
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
            initialValues={{
                fullName: '',
                email: '',
                contact_number: '',
                course: '',
                city: '',
                bank: '',
                notes: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                            {/* <Field type="text" name="contact_number" className='form-control' placeholder='Your Mobile Number' /> */}
                            <PhoneInputField name="contact_number" />
                            <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <div style={{ position: 'relative' }}>
                                <Field as="select" name="course" className='form-control'>
                                    <option value="" disabled>Select a Course</option>
                                    {courses.map((course: any) => (
                                        <option key={course.id} value={course.name}>
                                            {course.short_name}
                                        </option>
                                    ))}
                                </Field>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%) ' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i>
                                </div>
                                <ErrorMessage name="course" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                        <div style={{ position: 'relative' }}>
                            <Field as="select" name="city" className='form-control'>
                                <option value="" disabled>Select your City</option>
                                    {cities.map((city: any) => (
                                        <option key={city.id} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </Field>
                            
                            <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%) ' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i>
                                </div>
                            <ErrorMessage name="city" component="div" className="text-danger" />
                        </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                        <div style={{ position: 'relative' }}>
                            <Field as="select" name="bank" className='form-control'>
                                <option value="" disabled>Select a Bank</option>
                                <option value="Prodigy Finance">Prodigy Finance</option>
                                <option value="SBI">SBI</option>
                                <option value="PNB">PNB</option>
                                <option value="HDFC">HDFC</option>
                                <option value="Axis">Axis</option>
                                <option value="ICICI">ICICI</option>
                                <option value="Canara">Canara</option>
                                <option value="Bank of Baroda">Bank of Baroda</option>
                                <option value="Allahabad Bank">Allahabad Bank</option>
                                <option value="Indian Bank">Indian Bank</option>
                                <option value="IDBI">IDBI</option>
                                <option value="Karnataka Bank">Karnataka Bank</option>
                                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                                <option value="Oriental Bank of Commerce">Oriental Bank of Commerce</option>
                                <option value="Syndicate bank">Syndicate bank</option>
                                <option value="Saraswat Bank">Saraswat Bank</option>
                                <option value="UCO Bank">UCO Bank</option>
                                <option value="Union Bank of Indi">Union Bank of India</option>
                                <option value="Vijaya Bank">Vijaya Bank</option>
                                <option value="Bank of Maharashtra">Bank of Maharashtra</option>
                                <option value="Central Bank of India">Central Bank of India</option>
                                <option value="Dena Bank">Dena Bank</option>
                                <option value="Dhanlaxmi Bank">Dhanlaxmi Bank</option>
                                <option value="Bank of India">Bank of India</option>
                                <option value="RBL Bank">RBL Bank</option>
                                <option value="Dombivli Nagari Sahakari Bank Ltd.">Dombivli Nagari Sahakari Bank Ltd.</option>
                                <option value="Federal Bank">Federal Bank</option>
                                <option value="Corporation Bank">Corporation Bank</option>
                                <option value="Indian Overseas Bank">Indian Overseas Bank</option>
                                <option value="Abhyudaya Bank">Abhyudaya Bank</option>
                                <option value="South Indian Bank">South Indian Bank</option>
                                <option value="GP Parsik Sahakari Bank">GP Parsik Sahakari Bank</option>
                                <option value="Pragathi Krishna Gramin Bank">Pragathi Krishna Gramin Bank</option>
                                <option value="Karur Vysya Bank">Karur Vysya Bank</option>
                                <option value="New India Co-Operative Bank">New India Co-Operative Bank</option>
                                <option value="Andhra Bank">Andhra Bank</option>
                                <option value="Punjab and Sind Bank">Punjab and Sind Bank</option>
                                <option value="Tamilnad Mercantile Bank">Tamilnad Mercantile Bank</option>
                                <option value="Jammu and Kashmir Bank">Jammu and Kashmir Bank</option>
                                <option value="United Bank of India">United Bank of India</option>
                                <option value="InCred">InCred</option>
                                <option value="Auxilo">Auxilo</option>
                                <option value="Avanse">Avanse</option>
                                <option value="Bajaj Finance Limited">Bajaj Finance Limited</option>
                                <option value="Tata Capital Finance Limited">Tata Capital Finance Limited</option>
                                <option value="Fullerton India Credit Company Limited">Fullerton India Credit Company Limited</option>
                                <option value="MPower Financing">MPower Financing</option>
                                <option value="Propelld">Propelld</option>
                            </Field>
                            <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%) ' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i>
                                </div>
                                <ErrorMessage name="bank" component="div" className="text-danger" />
                            </div>
                          
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
        </Formik>

    );
};

export default EducationLoanPage;

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
    // const [courses, setCourses] = useState<any>([]);  // Use any type for tabs

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
    const courses = [
        {
            group: "Popular Courses",
            options: [
                { id: "18-10-BE/B.Tech", name: "BE/B.Tech - Bachelors (Technology)" },
                { id: "120-13-MBA/PGDM", name: "MBA/PGDM - Masters (Business Administration)" },
                { id: "15-13-BBA/BBM", name: "BBA/BBM - Bachelors (Business Administration)" },
                { id: "2-5-B.Com", name: "B.Com - Bachelors (Commerce)" },
                { id: "12-3-BA", name: "BA - Bachelors (Arts)" },
                { id: "117-3-MA", name: "MA - Masters (Arts)" },
                { id: "121-6-MBBS", name: "MBBS - Bachelors (Medicine and Surgery)" },
                { id: "16-6-BCA", name: "BCA - Bachelors (Computer Applications)" },
                { id: "122-10-MCA", name: "MCA - Masters (Computer Applications)" },
                { id: "125-18-ME/M.Tech", name: "ME/M.Tech - Masters (Technology)" },
                { id: "6-18-B.Sc", name: "B.Sc - Bachelors (Science)" },
                { id: "111-18-M.Sc", name: "M.Sc - Masters (Science)" },
            ],
        },
        {
            group: "Bachelor",
            options: [
                { name: "B.Arch - Bachelor (Architecture)" },
                { name: "BVSc - Bachelor (Veterinary Sciences)" },
                { name: "Bachelor of Animation - Bachelor (Animation)" },
                { name: "BSW - Bachelor (Arts)" },
                { name: "LLB - Bachelor (Law)" },
                { name: "BPH - Bachelor (Medical)" },
                { name: "B.F.Sc - Bachelor (Science)" },
                { name: "Bachelors (Animation & Graphic Design) - Bachelor (Arts)" },
                { name: "B.P.Ed - Bachelor (Education)" },
                { name: "BFA - Bachelor (Arts)" },
                { name: "BUMS - Bachelor (Medical)" },
                { name: "Bachelor of Physiotherapy (BPT) - Bachelor (Medical)" },
                { name: "B.Planning - Bachelor (Architecture)" },
                { name: "BHMS - Bachelor (Medical)" },
                { name: "BBA (Aviation) - Bachelor (Aviation)" },
                { name: "BMM - Bachelor (Mass Communications)" },
                { name: "BHM - Bachelor (Hotel Management)" },
                { name: "B.Com - Bachelors (Commerce)" },
                { name: "B.Des - Bachelor (Design)" },
                { name: "B.Ed - Bachelor (Education)" },
                { name: "B.Pharm - Bachelor (Pharmacy)" },
                { name: "B.Sc - Bachelors (Science)" },
                { name: "B.Sc (Agriculture) - Bachelor (Agriculture)" },
                { name: "B.Sc (Medicine) - Bachelor (Medical)" },
                { name: "B.Sc (Nursing) - Bachelor (Paramedical)" },
                { name: "BA - Bachelors (Arts)" },
                { name: "Bachelors in Vocational Courses - Bachelor (Vocational Courses)" },
                { name: "BAMS - Bachelor (Medical)" },
                { name: "BCA - Bachelors (Computer Applications)" },
                { name: "BE/B.Tech - Bachelors (Technology)" },
                { name: "BDS - Bachelor (Dental)" },
            ],
        },
        {
            group: "Doctorate",
            options: [
                { name: "M.Phil/Ph.D in Paramedical - Doctorate (Paramedical)" },
                { name: "M.Phil/Ph.D in Medicine - Doctorate (Medical)" },
                { name: "M.Phil/Ph.D in Pharmacy - Doctorate (Pharmacy)" },
                { name: "M.Phil/Ph.D in Science - Doctorate (Science)" },
                { name: "MD - Doctorate (Medical)" },
                { name: "Ph.D in Veterinary Science - Doctorate (Veterinary Sciences)" },
                { name: "M.Phil/Ph.D in Mass Communication - Doctorate (Mass Communications)" },
                { name: "M.Phil/Ph.D in Management - Doctorate (Management)" },
                { name: "M.Phil/Ph.D in Law - Doctorate (Law)" },
                { name: "M.Phil/Ph.D in Architecture - Doctorate (Architecture)" },
                { name: "M.Phil/Ph.D in Arts - Doctorate (Arts)" },
                { name: "M.Phil/Ph.D in Commerce - Doctorate (Commerce)" },
                { name: "M.Phil/Ph.D in Computer Applications - Doctorate (Computer Applications)" },
                { name: "M.Phil/Ph.D in Dental - Doctorate (Dental)" },
                { name: "M.Phil/Ph.D in Agriculture - Doctorate (Agriculture)" },
                { name: "M.Phil/Ph.D in Design - Doctorate (Design)" },
                { name: "M.Phil/Ph.D in Hotel Management - Doctorate (Hotel Management)" },
                { name: "M.Phil/Ph.D in Engineering - Doctorate (Engineering)" },
                { name: "M.Phil/Ph.D in Education - Doctorate (Education)" },
                { name: "D.Litt - Doctorate (Arts)" },
            ],
        },
        {
            group: "Masters",
            options: [
                { name: "M.Des - Masters (Design)" },
                { name: "M.P.Ed - Masters (Education)" },
                { name: "MHA - Masters (Management)" },
                { name: "M.Ed - Masters (Education)" },
                { name: "M.Com - Masters (Commerce)" },
                { name: "Executive MBA - Masters (Management)" },
                { name: "MVSc - Masters (Veterinary Sciences)" },
                { name: "Master of Animation - Masters (Animation)" },
                { name: "M.Ch - Masters (Medical)" },
                { name: "M.Arch - Masters (Architecture)" },
                { name: "M.F.Sc - Masters (Science)" },
                { name: "MPH - Masters (Medical)" },
                { name: "LLM - Masters (Law)" },
                { name: "MSW - Masters (Arts)" },
                { name: "MMS - Masters (Management)" },
                { name: "M.Pharm - Masters (Pharmacy)" },
                { name: "MS - Masters (Medical)" },
                { name: "M.Sc - Masters (Science)" },
                { name: "M.Sc (Agriculture) - Masters (Agriculture)" },
                { name: "M.Sc (Aviation) - Masters (Aviation)" },
                { name: "M.Sc (Medicine) - Masters (Medical)" },
                { name: "M.Sc (Nursing) - Masters (Paramedical)" },
                { name: "MA - Masters (Arts)" },
                { name: "Master of Physiotherapy (MPT) - Masters (Medical)" },
                { name: "Masters in Vocational Courses - Masters (Vocational Courses)" },
                { name: "MBA/PGDM - Masters (Business Administration)" },
                { name: "MCA - Masters (Computer Applications)" },
                { name: "MDS - Masters (Dental)" },
                { name: "ME/M.Tech - Masters (Technology)" },
                { name: "MHM - Masters (Hotel Management)" },
                { name: "MMC - Masters (Mass Communications)" },
                { name: "M.Planning - Masters (Architecture)" },

            ],
        },
    ];
    const cities2 = [
        {
            group: "Major Cities",
            options: [
                { name: "New Delhi" },
                { name: "Ahmedabad" },
                { name: "Bangalore" },
                { name: "Chennai" },
                { name: "Hyderabad" },
                { name: "Kolkata" },
                { name: "Mumbai" },
                { name: "Pune" },
                { name: "Others" },
            ]


        }

    ]

    // const getcourses = useCallback(async () => {

    //     try {
    //         const roleparams: any = {}

    //         roleparams['size'] = 10000;
    //         const response = await axios1.get('api/website/stream/get', { params: roleparams });
    //         setCourses(response.data.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, []);

    useEffect(() => {
        getcities();
        // getcourses();
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



    const handleSubmit = async (values, { resetForm }) => {
        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.fullName);
            formData.append('email', values.email);
            formData.append('contact_number', values.contact_number);
            formData.append('location', values.city);
            formData.append('course_in_mind', values.course);
            formData.append('bank_name', values.bank);
            formData.append('description', values.notes);
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
                        <div className="col-12 mb-3">
                            <Field type="text" name="fullName" className='form-control' placeholder='Your Full Name' />
                            <ErrorMessage name="fullName" component="div" className="text-danger" />
                        </div>
                        <div className="col-12 mb-3">
                            <Field type="email" name="email" className='form-control' placeholder='Your Email Id' />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="col-12 mb-3">
                            {/* <Field type="text" name="contact_number" className='form-control' placeholder='Your Mobile Number' /> */}
                            <PhoneInputField name="contact_number" />
                            <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                        </div>
                        <div className="col-12 mb-3">
                            <div style={{ position: 'relative' }}>
                                <Field as="select" name="course" className="form-control">
                                    <option value="" disabled>
                                        Select a Course
                                    </option>
                                    {courses.map((group) => (
                                        <optgroup key={group.group} label={group.group}>
                                            {group.options.map((course, index) => (
                                                <option key={index} value={course.name}>
                                                    {course.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </Field>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%) ' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i>
                                </div>
                                <ErrorMessage name="course" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div style={{ position: 'relative' }}>
                                {/* <Field as="select" name="city" className='form-control'>
                                    <option value="" disabled>Select your City</option>
                                    {cities.map((city: any) => (
                                        <option key={city.id} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </Field> */}
                                <Field as="select" name="city" className="form-control">
                                    <option value="" disabled>
                                        Select a city
                                    </option>
                                    {cities2.map((group) => (
                                        <optgroup key={group.group} label={group.group}>
                                            {group.options.map((val, index) => (
                                                <option key={index} value={val.name}>
                                                    {val.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </Field>

                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%) ' }}>
                                    <i className="bi bi-caret-down-fill caret-down"></i>
                                </div>
                                <ErrorMessage name="city" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className="col-12 mb-3">
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
                                <ErrorMessage name="bank_name" component="div" className="text-danger" />
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

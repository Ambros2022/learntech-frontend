import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { saveAs } from 'file-saver';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';

interface Props {
    page?: any;
    onChanges?: any;
    placeholder?: string;
}

const EnquiryForm: FC<Props> = ({ page, onChanges, placeholder, }) => {
    const router = useRouter();

    const downloadPDF = async (): Promise<void> => {
        try {
            const oReq = new XMLHttpRequest();
            const URLToPDF = `${process.env.NEXT_PUBLIC_API_URI}storage/brochure/learntech.pdf`;

            oReq.open("GET", URLToPDF, true);
            oReq.responseType = "blob";

            oReq.onload = function () {
                if (oReq.status === 200) {
                    const file = new Blob([oReq.response], { type: 'application/pdf' });
                    saveAs(file, "Learntechww Brochure 2025.pdf");
                } else {
                    console.error(`Failed to download file: ${oReq.status} ${oReq.statusText}`);
                }
            };

            oReq.onerror = function () {
                console.error("Request failed");
            };

            oReq.send();
        } catch (error) {
            console.error("An error occurred while downloading the PDF:", error);
        }
    };

    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').trim(),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
          contact_number: Yup.string()
            .required("Phone Number is required")
            .test(
              "is-valid-contact",
              "Enter valid 10 digits Number",
              function (value) {
                if (!value) return false;
                if (value.startsWith("+91-")) {
                  return /^\+91-\d{10}$/.test(value); // Apply strict rule for +91-
                }
                return true; // Accept other formats (other country codes)
              }
            ),
        course: Yup.string().required(`${placeholder || 'Course'} is required`).trim(),
        location: Yup.string().required('Location is required').trim(),
        message: Yup.string().required('Message is required'),
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
            formData.append('current_url', window.location.href);
            formData.append('description', values.message);
            const response = await axios.post('api/website/enquiry', formData);

            if (response.status === 200) {
                toast.dismiss();
                toast.success('Thank you. We will get back to you.');
                resetForm();
                onChanges();

                if (page && page == "Brochure") {
                    downloadPDF();
                }

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
                email: '',
                contact_number: '',
                course: '',
                location: '',
                message: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="mb-3">
                    <Field type="text" name="name" placeholder="Enter Name" className="form-control" />
                    <ErrorMessage name="name" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <PhoneInputField name="contact_number" />
                    <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <Field type="text" name="course" placeholder={placeholder ? (`Enter ${placeholder}`) : ("Enter Course")} className="form-control" />
                    <ErrorMessage name="course" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <Field type="text" name="location" placeholder="Enter Location" className="form-control" />
                    <ErrorMessage name="location" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <Field as="textarea" name="message" placeholder="Enter Message" className="form-control" />
                    <ErrorMessage name="message" component="div" className="error text-danger" />
                </div>
                <div className="d-grid">
                    <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">
                        {page && page == "Brochure" ? "Download Brochure" : "Submit"}
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default EnquiryForm;

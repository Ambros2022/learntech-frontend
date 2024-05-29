import React, { FC, useRef, useState, useEffect } from 'react';
// import axios from 'src/utils/axios';
// import { useHistory } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";
// import './styles.css';
import { useSnackbar } from 'notistack';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useField } from 'formik';
import clsx from 'clsx';
import * as Yup from 'yup';
// import { saveAs } from 'file-saver'
// 
// import { pConfig } from 'src/config';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';

interface Props {
    page?: any;
    onChanges?: any;
}

const EnquiryForm: FC<Props> = ({ page, onChanges, ...rest }) => {

    const router = useRouter();
    // const captchaRef = useRef(null)
    // const { enqueueSnackbar } = useSnackbar();
    // const history = useHistory();

    // const downloadPDF = async (): Promise<void> => {
    //     var oReq = new XMLHttpRequest();

    //     var URLToPDF = pConfig.baseUrl + "brochure/B-study-Brochure-2023.pdf";

    //     oReq.open("GET", URLToPDF, true);

    //     oReq.responseType = "blob";

    //     oReq.onload = function () {
    //         // Once the file is downloaded, open a new window with the PDF
    //         // Remember to allow the POP-UPS in your browser
    //         const file = new Blob([oReq.response], { type: 'application/pdf' });


    //         //const fileURL = URL.createObjectURL(file);
    //         saveAs(file, "Bstudy Brochure 2023.pdf");
    //         // window.open(fileURL, "_blank");
    //     };

    //     oReq.send();
    // }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
        phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
        course: Yup.string().required('Course is required'),
        location: Yup.string().required('Location is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {


        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('contact_number', values.phoneNumber);
            formData.append('location', values.location);
            formData.append('course_in_mind', values.course);
            formData.append('current_url', window.location.href);
            const response = await axios.post('api/website/enquiry', formData);


            if (response.status === 200) {
                toast.dismiss();
                toast.success('Thank you. We will get back to you.');
                resetForm();
                onChanges();
                router.push('/thank-you');
            }

        } catch (error) {
            toast.error('try again later!');
            console.error('Error submitting form:', error);
        }
        // try {
        //   toast.loading('Processing'); // Display loading toast while processing
        //   setShowModal(false); // Assuming setShowModal is a state setter for hiding modal
        //   await emailjs.send("service_lrx8r36", "template_fsa8zp6", values, "8xItMn8QYmHOyfncY");
        //   toast.dismiss();
        //   toast.success('Message sent successfully!'); // Display success toast if email is sent successfully
        //   resetForm(); // Reset the form
        //   // Close the modal here if needed
        // } catch (error) {
        //   toast.error('Failed!'); // Display error toast if sending email fails
        //   console.error('Error sending email:', error);
        //   alert("Error sending email. Please try again later."); // Fall back to alert if toast is not available
        // }
    };

    return (


        <Formik
            initialValues={{
                name: '',
                email: '',
                phoneNumber: '',
                course: '',
                location: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            resetForm
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
                    <Field type="text" name="phoneNumber" placeholder="Enter Phone Number" className="form-control" />
                    <ErrorMessage name="phoneNumber" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <Field type="text" name="course" placeholder="Enter Course" className="form-control" />
                    <ErrorMessage name="course" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <Field type="text" name="location" placeholder="Enter Location" className="form-control" />
                    <ErrorMessage name="location" component="div" className="error text-danger" />
                </div>

                <div className="d-grid">
                    <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">Submit</button>
                </div>
            </Form>
        </Formik>

        // <Formik
        //   initialValues={{

        //     fullname: '',
        //     phoneNumber: '',
        //     Email: '',
        //     CourseInMind: '',
        //     College: '',
        //     Location: '',
        //     message: ''


        //   }}
        //   validationSchema={
        //     Yup.object().shape({
        //       fullname: Yup.mixed().required('Name  is Required'),
        //       phoneNumber: Yup.string()
        //         .required("Number is Required")
        //         .matches(
        //           /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        //           "Phone number is not valid"
        //         ),
        //       Email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        //     })
        //   }

        //   onSubmit={async (values, actions) => {


        //     //  return  alert(JSON.stringify(values, null, 2));
        //     const formData = new FormData();

        //     formData.append('name', values.fullname);
        //     formData.append('contact', values.phoneNumber);
        //     formData.append('email', values.Email);
        //     formData.append('course_in_mind', values.CourseInMind);
        //     formData.append('college_name', values.College);
        //     formData.append('location', values.Location);
        //     formData.append('description', values.message);
        //     formData.append('current_url', window.location.href);
        //     let url = 'api/website/home/enquiry';
        //     // return alert(JSON.stringify(formData));

        //     try {

        //       let response = await axios.post(url, formData);
        //       // console.log('response: ', response);

        //       if (response.data.status) {


        //         actions.setSubmitting(true);
        //         actions.resetForm({
        //           values: {

        //             fullname: '',
        //             phoneNumber: '',
        //             Email: '',
        //             CourseInMind: '',
        //             College: '',
        //             Location: '',
        //             message: ''

        //           },
        //         });
        //         // enqueueSnackbar('Thankyou we will get back to you', {
        //         //   variant: 'success',
        //         // });

        //         if (page && page == 'Brochure') {
        //           downloadPDF();
        //           enqueueSnackbar('Thank you for downloading our brochure.', {
        //             variant: 'success',
        //           });

        //         }
        //         else {

        //           enqueueSnackbar('Thank you. We will get back to you.', {
        //             variant: 'success',
        //           });
        //         }
        //         history.push("/thank-you");
        //         //  onChanges();

        //       }
        //     } catch (err) {
        //       console.error(err);

        //       enqueueSnackbar("Please try again", {
        //         variant: 'error',

        //       });
        //     }


        //     captchaRef.current.reset();












        //   }}
        // >
        //   {props => (
        //     <form onSubmit={props.handleSubmit}>
        //       {/* <p>&nbsp;</p> */}

        //       <div className="form-group">
        //         {/* <label htmlFor="fullName"></label> */}
        //         <Field type="text" name="fullname"
        //           onChange={props.handleChange}
        //           onBlur={props.handleBlur}
        //           value={props.values.fullname}
        //           className="form-control" id="name" placeholder="Full Name" required />
        //         {props.errors.fullname && props.touched.fullname && <p className="error">{props.errors.fullname}</p>}
        //       </div>
        //       <div className="row">
        //         <div className="col-lg-6 form-group">
        //           {/* <label>Email</label> */}
        //           <Field type="email" className="form-control" name="Email"
        //             onChange={props.handleChange}
        //             onBlur={props.handleBlur}
        //             value={props.values.Email}
        //             id="Email" placeholder="Enter Email"
        //             required />
        //           {props.errors.Email && props.touched.Email && <p className="error">{props.errors.Email}</p>}
        //         </div>
        //         <div className="col-lg-6 form-group">
        //           {/* <label>Phone Number</label> */}
        //           <Field type="tel" className="form-control" name="phoneNumber"
        //             onChange={props.handleChange}
        //             onBlur={props.handleBlur}
        //             value={props.values.phoneNumber}
        //             id="PhoneNumber" placeholder="Phone Number"
        //             required />
        //           {props.errors.phoneNumber && props.touched.phoneNumber && <p className="error">{props.errors.phoneNumber}</p>}
        //         </div>
        //       </div>

        //       <div className="form-group">
        //         {/* <label>Course In Mind</label> */}
        //         <Field type="text" className="form-control" name="CourseInMind"
        //           onChange={props.handleChange}
        //           onBlur={props.handleBlur}
        //           value={props.values.CourseInMind}
        //           id="CourseInMind" placeholder="Enter Course" required
        //         />
        //       </div>

        //       {/* <div className="form-group">
        //         <label>College</label>
        //         <Field type="text" className="form-control" name="College"
        //           onChange={props.handleChange}
        //           onBlur={props.handleBlur}
        //           value={props.values.College}
        //           id="College" placeholder="Enter College" required
        //         />
        //       </div> */}

        //       <div className="form-group">
        //         {/* <label>Location</label> */}
        //         <Field type="text" className="form-control" name="Location"
        //           onChange={props.handleChange}
        //           onBlur={props.handleBlur}
        //           value={props.values.Location}
        //           id="Location" placeholder="Enter Location" required

        //         />
        //       </div>

        //       <div className="form-group mrb" >
        //         {/* <label>Message</label> */}

        //         <textarea className="form-control" name="message" id="inputID"
        //           onChange={props.handleChange}
        //           onBlur={props.handleBlur}
        //           value={props.values.message} placeholder="Type Your Message"
        //         ></textarea >
        //       </div>
        //       {/* <ReCAPTCHA
        //         sitekey="6LcbLSEjAAAAAEnZuOWLNsIJgCP3tptUhe2SpBIb"
        //         ref={captchaRef}
        //       /> */}

        //       <div className="text-center"><button type="submit" className={smallsize ? "small_submit_message home_submit_message" : "submit_message home_submit_message"}>{page == 'Brochure' || page == 'Download Brochure' ? 'Download Brochure' : page == "news" ? 'Predict Your Rank' : 'Get Guidance'}</button></div>



        //     </form>
        //   )}
        // </Formik>




    );
};

export default EnquiryForm;
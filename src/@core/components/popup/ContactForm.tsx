import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SideContactUsForm from './SideContactUsForm';

const ContactForm = ({ heading }) => {

    return (
        <div className='bg-skyBlue px-lg-5 px-3 rounded'>
            <h4 className='fw-bold text-blue text-center pt-3 mb-3'>{heading}</h4>
            <SideContactUsForm />
        </div>
    )
}

export default ContactForm
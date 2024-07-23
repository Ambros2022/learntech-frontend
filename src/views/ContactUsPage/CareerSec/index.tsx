import Image from 'next/image';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'src/configs/axios';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';
import ContactPageUsForm from 'src/@core/components/popup/ContactPageUsForm';



const CareerSec = () => {
    const router = useRouter();



    return (
        <section className='bg-white py-5 careerLink'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-md-7 mb-md-0 mb-3">
                        <div className='bg-blue p-5 h-100 rounded'>
                            <h2 className="fw-bold text-white">Contact Career Representative</h2>
                            <h6 className='text-white mb-5'>Please fill out the form to enable our career representatives to contact you at the earliest.</h6>
                            <div className="d-flex mb-3">
                                <div className='align-self-center'>
                                    <Image src='/images/icons/phoneAbout1.png' width={30} height={30} alt='phone1' />
                                </div>
                                <div>
                                    <h6 className='ms-3 text-white'><Link href='tel:18001208696'>1800-120-8696</Link> (Tollfree)</h6>
                                    <h6 className='ms-3 text-white'>(Monday to Saturday | (9am to 6pm))</h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className=''>
                                    <Image src='/images/icons/phoneAbout2.png' width={30} height={30} alt='phone2' />
                                </div>
                                <div className='align-self-center'>
                                    <h6 className='ms-3 text-white my-auto'><Link href='tel:08022454991'>080-22454991</Link>, <Link href='tel:26631169'>26631169</Link></h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className=''>
                                    <Image src='/images/icons/phoneAbout3.png' width={30} height={30} alt='phone3' />
                                </div>
                                <div className='align-self-center'>
                                    <h6 className='ms-3 text-white my-auto'><Link href='tel:08022454991'>080-22454991</Link></h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className=''>
                                    <Image src='/images/icons/email-icon.svg' className='icon-white' width={30} height={30} alt='email' />
                                </div>
                                <div className='align-self-center'>
                                    <h6 className='ms-3 text-white my-auto'><Link href="mailto:info@learntechww.com">info@learntechww.com</Link></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-5 col-10 mx-auto">
                        <div className="bg-skyBlue rounded">
                            <ContactPageUsForm/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerSec;

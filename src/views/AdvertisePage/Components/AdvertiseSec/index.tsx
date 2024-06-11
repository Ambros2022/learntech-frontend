import Image from 'next/image';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AdvertiseSec = () => {
    const formik = useFormik({
        initialValues: {
            Name: '',
            Email: '',
            Phone: '',
            Message: ''
        },
        validationSchema: Yup.object({
            Name: Yup.string().required('Name is required'),
            Email: Yup.string().email('Invalid email address').required('Email is required'),
            Phone: Yup.string().required('Phone number is required'),
            Message: Yup.string().required('Message is required')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            resetForm();
        },
    });

    return (
        <>
            <section className='bg-white'>
                <div className="container">
                    <h1 className='pt-3 mb-3 text-blue fw-bold'>
                        Advertise With Us
                    </h1>
                    <div className="row">
                        <div className="col-xl-9 col-lg-8 col-md-7">
                            <p className='text-black'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta reprehenderit ducimus quibusdam eaque iusto ut eius facere ea assumenda pariatur amet, nulla explicabo ipsam reiciendis dignissimos! Iusto ullam quis similique, quidem corrupti, amet a culpa obcaecati modi quae quibusdam sint!
                            </p>
                            <p className='text-black'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum veritatis dolores perferendis omnis id maiores eos accusantium earum quod, dolore numquam nulla saepe vitae aspernatur voluptas culpa quisquam quis, assumenda laudantium dicta veniam nostrum? Eligendi voluptate ipsum, facilis sed iure odit pariatur ad! Doloribus totam hic, eum non eos quaerat.
                            </p>
                            <p className='text-black'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, neque placeat adipisci sit dicta facilis optio saepe, ipsam distinctio minima dolorum architecto nobis facere laboriosam corporis totam ad repellat. Tempora quidem ut dolorem odio qui esse. Atque quia beatae ea at, impedit excepturi cum corporis veniam sit maiores adipisci? Facilis unde nam fugiat consequatur tempora culpa veniam eius, ex molestiae.
                            </p>
                            <p className='text-black'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque porro nisi magnam impedit laborum repellat, quaerat expedita corrupti dignissimos? Eveniet obcaecati labore assumenda. Quae atque eligendi, nisi asperiores minus earum corporis sit, nam non provident nesciunt voluptatum voluptas fugit distinctio enim odio blanditiis qui incidunt beatae similique nemo quasi quibusdam. Voluptate tempora in, expedita id porro magnam accusantium perspiciatis ipsum excepturi saepe odit aliquid voluptates iure, tenetur provident. Quisquam obcaecati quasi minus molestias labore consequuntur omnis soluta, inventore amet harum itaque! Ex, nam veritatis? Cumque repudiandae doloremque quisquam ab mollitia!
                            </p>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5">
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-10 mx-md-0 mx-auto">
                                    <form onSubmit={formik.handleSubmit} className='bg-skyBlue rounded border p-3 mb-3'>
                                        <h4 className='text-center fw-bold text-blue pt-2'>Connect With Us</h4>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className='form-control'
                                                name='Name'
                                                placeholder='Enter Name'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Name}
                                            />
                                            {formik.touched.Name && formik.errors.Name ? (
                                                <div className="text-danger">{formik.errors.Name}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                className='form-control'
                                                name='Email'
                                                placeholder='Enter Email'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Email}
                                            />
                                            {formik.touched.Email && formik.errors.Email ? (
                                                <div className="text-danger">{formik.errors.Email}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className='form-control'
                                                name='Phone'
                                                placeholder='Enter Phone Number'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Phone}
                                            />
                                            {formik.touched.Phone && formik.errors.Phone ? (
                                                <div className="text-danger">{formik.errors.Phone}</div>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <textarea
                                                className='form-control'
                                                name='Message'
                                                placeholder='Enter Message'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Message}
                                            />
                                            {formik.touched.Message && formik.errors.Message ? (
                                                <div className="text-danger">{formik.errors.Message}</div>
                                            ) : null}
                                        </div>
                                        <div className="text-center">
                                            <input type="submit" className='btn submitBtn' />
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-12 col-lg-12 mb-3 mx-md-0 mx-auto col-10">
                                    <div className='bg-skyBlue p-3 rounded border text-center'>
                                        <Image src="/images/icons/advertisement.png" width={200} height={200} alt={'advertisement-logo'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdvertiseSec;

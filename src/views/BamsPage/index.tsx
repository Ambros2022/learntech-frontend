'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
const backgroundImageUrl = '/images/bams/Home-Banner.webp';
const whyimg1 = '/images/bams/whyimg1.webp';
const whyimg2 = '/images/bams/whyimg2.webp';
const whyimg3 = '/images/bams/whyimg3.webp';
const whyimg4 = '/images/bams/whyimg4.webp';


const BamsPage = () => {
    useEffect(() => {
        // Dynamically load Bootstrap JS only on client
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 sticky-top py-md-5">
                <div className="container-fluid navbar-bams-top">
                    {/* Logo */}
                    <Link className="navbar-brand d-flex align-items-center p-md-5" href="/">
                        <Image src="/images/bams/logo.webp" alt="Logo" width={209} height={58} priority />
                    </Link>

                    {/* Hamburger toggle */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    {/* Nav links */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item   bams-navbar-tag"><Link className="nav-link" href="#">Home</Link></li>
                            <li className="nav-item   bams-navbar-tag"><Link className="nav-link" href="#">Why Us?</Link></li>
                            <li className="nav-item   bams-navbar-tag"><Link className="nav-link" href="#">BAMS Counselling</Link></li>
                            <li className="nav-item   bams-navbar-tag"><Link className="nav-link" href="#">NEET Rank Predictor</Link></li>
                            <li className="nav-item   bams-navbar-tag"><Link className="nav-link" href="#">Top Colleges</Link></li>
                            <li className="nav-item   bams-navbar-tag"><Link className="nav-link" href="#">Testimonials</Link></li>
                            <li className="nav-item   bams-navbar-tag"><Link className="nav-link" href="#">FAQs</Link></li>
                            <li className="nav-item   bams-navbar-tag"><Link className="nav-link" href="#">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section
                className="d-flex align-items-center pb-0 px-0"
                id="home"
            >
                <div
                    className="container-fluid bamsimage"
                    id="home"
                    style={{
                        background: `linear-gradient(341deg, rgb(0 0 0 / 0%), rgb(0 0 0 / 0%)), url(${backgroundImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div
                        className="container-fluid aos-init aos-animate p-md-2 p-4"
                        data-aos="zoom-out"
                        data-aos-delay={100}
                    >
                        <div className="row  gap-md-0 gap-4 margin-top-home-banner bams-home-padding">
                            <div className="col-xl-7 col-lg-7 col-md-7 text-center pt-4 pt-md-0">
                                <div className="bgblacksvyasa slide-in px-md-0 px-2">
                                    <h1 className="text-center h1svyasa pt-4 pt-md-5">
                                        Navigate through the NEET-UG 2025 BAMS Counselling Process
                                    </h1>
                                    <h1 className="text-center bams-blue pt-4 pt-md-5">
                                        Begin Your Journey in Ayurvedic Medicine Today!
                                    </h1>


                                    <p className="bams-phomepage pt-md-4">
                                        Get into the Best Ayurvedic Colleges in Karnataka and Other Indian States through the NEET All-India Counselling and the KEA Counselling with the Help of Expert Counsellors.
                                    </p>
                                    <div className="form-group text-center mt-md-4 pb-md-4 mt-4 pb-3">
                                        <button
                                            // variant="primary"
                                            className="btn btn-success btn-bds-add-svyasa-apply color-btn-add-apply p-3 px-4 mb-md-0 mb-3"
                                        // onClick={handleShow}
                                        >
                                            Talk to an Expert Now!

                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-5 col-lg-5 col-md-5">
                                <div className="form-boxamb p-md-4 slide-in2 ">
                                    <h3
                                        className="f700 pb-2 bams-font20"
                                        style={{ color: 'white', textAlign: 'center' }}
                                    >

                                        Fill Out the Form to Get Assistance in Securing Your BAMS Seat for
                                        A.Y. 2025-26

                                    </h3>

                                    <form
                                        id="formoid"
                                        action="https://api.bangalorestudy.com:3000/api/website/home/landingpageenquiry"
                                        method="post"
                                    >
                                        <div className="form-group mb-3">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Name"
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Your Email"
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <input
                                                type="number"
                                                id="contact"
                                                name="contact"
                                                placeholder="Contact No."
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input
                                                type="number"
                                                id="neetscore"
                                                name="neetscore"
                                                placeholder="NEET Score"
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <select
                                                id="location"
                                                name="location"
                                                required
                                                className="browser-default custom-select form-control white-bg-black-text"
                                            >
                                                <option value="">State</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                <option value="Assam">Assam</option>
                                                <option value="Bihar">Bihar</option>
                                                <option value="Chhattisgarh">Chhattisgarh</option>
                                                <option value="Goa">Goa</option>
                                                <option value="Gujarat">Gujarat</option>
                                                <option value="Haryana">Haryana</option>
                                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                                                <option value="Jharkhand">Jharkhand</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Manipur">Manipur</option>
                                                <option value="Meghalaya">Meghalaya</option>
                                                <option value="Mizoram">Mizoram</option>
                                                <option value="Nagaland">Nagaland</option>
                                                <option value="Odisha">Odisha</option>
                                                <option value="Punjab">Punjab</option>
                                                <option value="Rajasthan">Rajasthan</option>
                                                <option value="Sikkim">Sikkim</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Tripura">Tripura</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Uttarakhand">Uttarakhand</option>
                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                <option value="West Bengal">West Bengal</option>
                                                <option value="Andaman & Nicobar">Andaman & Nicobar</option>
                                                <option value="Chandigarh">Chandigarh</option>
                                                <option value="Dadra and Nagar Haveli">
                                                    Dadra and Nagar Haveli
                                                </option>
                                                <option value="Daman & Diu">Daman & Diu</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Lakshadweep">Lakshadweep</option>
                                                <option value="Puducherry">Puducherry</option>
                                            </select>
                                        </div>


                                        <div className="form-group mb-3">
                                            <textarea
                                                id="description"
                                                name="description"
                                                placeholder="Message (Optional)"
                                                className="form-control"
                                                rows={3}
                                                defaultValue={''}
                                            />
                                        </div>

                                        <div className="form-group text-center">
                                            <button
                                                type="submit"
                                                id="about"
                                                name="submit"
                                                className="btn btn-success btn-bds-add-svyasa-apply color-btn-add-apply p-3 px-5"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="bg-dark text-white py-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-3 mb-4">
                            <div className="mb-3">
                                <i className="bi bi-people-fill display-4"></i> 
                            </div>
                            <h5 className="fw-bold">Team of Experts</h5>
                            <p className="small">
                                Our team of qualified experts with decades of experience in the All-India BAMS Counselling and the BAMS state Counselling processes help students navigate their dreams with ease.
                            </p>
                        </div>

                        <div className="col-md-3 mb-4">
                            <div className="mb-3">
                                <i className="bi bi-person-check-fill display-4"></i>
                            </div>
                            <h5 className="fw-bold">Personalised Sessions</h5>
                            <p className="small">
                                Aspirants get 1-1 admission guidance, enabling them to smoothly glide through the complicated NEET BAMS Counselling process. Sessions are customised as per the student’s rank, preferences and budget.
                            </p>
                        </div>

                        <div className="col-md-3 mb-4">
                            <div className="mb-3">
                                <i className="bi bi-clock-history display-4"></i>
                            </div>
                            <h5 className="fw-bold">No-Time Wasted</h5>
                            <p className="small">
                                The insight of our experts can help in preparing students for the counselling process within a short period, especially for All India Medical / Karnataka BAMS Counselling.
                            </p>
                        </div>

                        <div className="col-md-3 mb-4">
                            <div className="mb-3">
                                <i className="bi bi-journal-check display-4"></i>
                            </div>
                            <h5 className="fw-bold">Post-Admission Support</h5>
                            <p className="small">
                                Our experts assist with document collection, college reporting, and ensuring a smooth transition to campus life after seat allotment.
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="bg-dark text-white py-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12 col-md-3 mb-4">
                            <div
                                className="mb-3 icon-bg"
                                style={{
                                    backgroundImage: 'url("/images/22d0fe8a-334e-47aa-98ae-4854ef276b96.png")',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    width: '60px',
                                    height: '60px',
                                    margin: '0 auto',
                                }}
                            ></div>
                            <h5 className="fw-bold">Team of Experts</h5>
                            <p className="small">
                                Our team of qualified experts with decades of experience in the All-India BAMS Counselling and the BAMS state Counselling processes help students navigate their dreams with ease.
                            </p>
                        </div>

                        {/* Personalised Sessions */}
                        <div className="col-12 col-md-3 mb-4">
                            <div
                                className="mb-3 icon-bg"
                                style={{
                                    backgroundImage: 'url("/images/22d0fe8a-334e-47aa-98ae-4854ef276b96.png")',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    width: '60px',
                                    height: '60px',
                                    margin: '0 auto',
                                }}
                            ></div>
                            <h5 className="fw-bold">Personalised Sessions</h5>
                            <p className="small">
                                Aspirants get 1-1 admission guidance, enabling them to smoothly glide through the complicated NEET BAMS Counselling process. Sessions are customised as per the student’s rank, preferences and budget.
                            </p>
                        </div>

                        {/* No-Time Wasted */}
                        <div className="col-12 col-md-3 mb-4">
                            <div
                                className="mb-3 icon-bg"
                                style={{
                                    backgroundImage: 'url("/images/22d0fe8a-334e-47aa-98ae-4854ef276b96.png")',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    width: '60px',
                                    height: '60px',
                                    margin: '0 auto',
                                }}
                            ></div>
                            <h5 className="fw-bold">No-Time Wasted</h5>
                            <p className="small">
                                The insight of our experts can help in preparing students for the counselling process within a short period, especially for All India Medical / Karnataka BAMS Counselling.
                            </p>
                        </div>

                        {/* Post-Admission Support */}
                        <div className="col-12 col-md-3 mb-4">
                            <div
                                className="mb-3 icon-bg"
                                style={{
                                    backgroundImage: 'url("/images/22d0fe8a-334e-47aa-98ae-4854ef276b96.png")',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    width: '60px',
                                    height: '60px',
                                    margin: '0 auto',
                                }}
                            ></div>
                            <h5 className="fw-bold">Post-Admission Support</h5>
                            <p className="small">
                                Our experts assist with document collection, college reporting, and ensuring a smooth transition to campus life after seat allotment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



        </>
    );
};

export default BamsPage;


















// import React from 'react';

// const BamsPage = () => {
//     return (
//         <div>
//             <h1>BAMS Counselling Process</h1>
//             <p>Details about the BAMS counselling process go here.</p>
//         </div>
//     );
// };

// export default BamsPage;


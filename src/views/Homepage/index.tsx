import React, { useEffect } from "react";
import AnimatedCounter from "./animatedCounter";
import AnimatedCounter2 from "./animatedCounter2";
import AnimatedCounter3 from "./animatedCounter3";
import MainCarousel from "src/@core/components/main-carousel";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Work = () => {
    useEffect(() => {
        AOS.init({
            offset: 200,
            easing: 'ease-in-sine',
            delay: 100,
            duration: 600,
        });
    }, [])
    const items = [
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>,
        <div className="card featuredClgCard mb-5">
            <img src="images/icons/featured-colleges.jpg" className="card-img-top" alt="featured-college"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">IBS Hyderabad</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Hyderabad, Telangana</p>
                <div className="d-flex justify-content-between">
                    <a href="#" className="active btn">Apply Now</a>
                    <a href="#" className="btn">View More</a>
                </div>
            </div>
        </div>

    ];

    const linkSectionItems = [
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>
    ];

    const StudyAbroadItems = [
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Victoria</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>
    ];

    return (
        <>

            {/* Banner Start */}

            <section className="bannerCon" data-aos="fade-up">
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="images/icons/Banner Image.jpg" className="d-block w-100" alt="Banner-image"></img>
                        </div>
                        <div className="carousel-item">
                            <img src="images/icons/Banner Image.jpg" className="d-block w-100" alt="Banner-image"></img>
                        </div>
                        <div className="carousel-item">
                            <img src="images/icons/Banner Image.jpg" className="d-block w-100" alt="Banner-image"></img>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="bannerFormSec">
                    <div className="container-fluid">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7 mb-5" data-aos="slide-right">
                                    <div className="searchSec">
                                        <p>Find Colleges, Courses & Exams that are best for you</p>
                                        <div className="row">
                                            <div className="col-8 col-md-8 col-lg-9">
                                                <input type="search" placeholder="Search" className="form-control" id="exampleInputSearch" aria-describedby="searchHelp" />
                                            </div>
                                            <div className="col-4 text-center col-md-4 col-lg-3 p-0">
                                                <button className="btn  searchBtn">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 mb-5" data-aos="slide-left">
                                    <div className="searchForm">
                                        <h5 className="pb-3 fw-bold text-center text-blue">Let’s build a better future for you</h5>
                                        <form>
                                            <div className="mb-3">
                                                <input type="text" placeholder="Enter Name" className="form-control" id="exampleInputName" aria-describedby="NameHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <input type="email" placeholder="Enter Email" className="form-control" id="exampleInputEmail" aria-describedby="EmailHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" placeholder="Enter Phone Number" className="form-control" id="exampleInputPhoneNumber" aria-describedby="PhoneNumberHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" placeholder="Enter Course" className="form-control" id="exampleInputCourse" aria-describedby="courseHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" placeholder="Enter Location" className="form-control" id="exampleInputLocation" aria-describedby="locationHelp" />
                                            </div>

                                            <div className="d-grid">
                                                <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Banner End */}

            {/* News link Section Start */}
            <section className="newsLinkSec py-2">
                <div className="container text-center">
                    <MainCarousel items={linkSectionItems} />
                </div>
            </section >


            {/* News link Section Start */}

            {/* Analysis Section Start */}

            <div className="Analysis-Section" data-aos="fade-up">
                <div className="container pt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4 mb-5">
                            <div className="row">
                                <div className="col-md-4 col-5 text-end">
                                    <img src="images/icons/applications-filled.svg"></img>
                                </div>
                                <div className="col-md-8 col-7">
                                    <h1 className="fw-bold"><AnimatedCounter /></h1>
                                    <h6>Application Filled</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <div className="row">
                                <div className="col-md-4 col-5 text-end">
                                    <img src="images/icons/admission-done.svg"></img>
                                </div>
                                <div className="col-md-8 col-7">
                                    <h1 className="fw-bold"><AnimatedCounter2 /></h1>
                                    <h6>Admission Done</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <div className="row">
                                <div className="col-md-4 col-5 text-end">
                                    <img src="images/icons/expert-counsellor.svg"></img>
                                </div>
                                <div className="col-md-8 col-7">
                                    <h1 className="fw-bold"><AnimatedCounter3 /></h1>
                                    <h6>Expert Counsellors</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Section End */}

            {/* Featured College Section start*/}

            <section className="FeaturedClgCon bg-white" data-aos="fade-up">
                <div className="container pt-5 position-relative">
                    <h4 className="fw-bold text-blue text-center mb-5">Featured Colleges</h4>
                    <MainCarousel items={items} />
                </div>
            </section>

            {/* Featured College Section start*/}


            {/* Explore Section Start */}

            <section className="exploreCon" data-aos="fade-out">
                <div className="container pt-5">
                    <h4 className="fw-bold text-blue text-center">Explore Colleges, Courses and Exams That Are Curated For You</h4>
                    <div className="d-flex exploreNav justify-content-center mb-5" role="tablist">
                        <a href="#" id="aColleges" className="active btn" data-bs-toggle="tab" data-bs-target="#a-Colleges" type="button" role="tab" aria-controls="a-Colleges" aria-selected="true">Colleges</a>
                        <a href="#" id="aCourses" className="btn" data-bs-toggle="tab" data-bs-target="#a-Courses" type="button" role="tab" aria-controls="a-Courses" aria-selected="true">Courses</a>
                        <a href="#" id="aExams" className="btn" data-bs-toggle="tab" data-bs-target="#a-Exams" type="button" role="tab" aria-controls="a-Exams" aria-selected="true">Exams</a>
                    </div>
                    <div className="tab-content" id="nav-tabContent">

                        <div className="tab-pane fade show active exploreCardCon" id="a-Colleges" role="tabpanel" aria-labelledby="aColleges">
                            <div className="row">
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Paramedical.svg" className="img-fluid mx-auto mt-3" alt="Paramedical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Paramedical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Architecture.svg" className="img-fluid mx-auto mt-3" alt="architecture-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Architecture</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Art.svg" className="img-fluid mx-auto mt-3" alt="Arts-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Arts</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Law.svg" className="img-fluid mx-auto mt-3" alt="law-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Law</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Medical.svg" className="img-fluid mx-auto mt-3" alt="Medical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Medical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Management.svg" className="img-fluid mx-auto mt-3" alt="Management-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Management</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Paramedical.svg" className="img-fluid mx-auto mt-3" alt="Paramedical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Paramedical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Architecture.svg" className="img-fluid mx-auto mt-3" alt="architecture-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Architecture</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Art.svg" className="img-fluid mx-auto mt-3" alt="Arts-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Arts</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Law.svg" className="img-fluid mx-auto mt-3" alt="law-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Law</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Medical.svg" className="img-fluid mx-auto mt-3" alt="Medical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Medical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Management.svg" className="img-fluid mx-auto mt-3" alt="Management-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Management</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Paramedical.svg" className="img-fluid mx-auto mt-3" alt="Paramedical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Paramedical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Architecture.svg" className="img-fluid mx-auto mt-3" alt="architecture-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Architecture</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Art.svg" className="img-fluid mx-auto mt-3" alt="Arts-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Arts</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Law.svg" className="img-fluid mx-auto mt-3" alt="law-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Law</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Medical.svg" className="img-fluid mx-auto mt-3" alt="Medical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Medical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Management.svg" className="img-fluid mx-auto mt-3" alt="Management-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Management</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="tab-pane fade exploreCardCon" id="a-Courses" role="tabpanel" aria-labelledby="aCourses">
                            <div className="row">
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Paramedical.svg" className="img-fluid mx-auto mt-3" alt="Paramedical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Paramedical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Architecture.svg" className="img-fluid mx-auto mt-3" alt="architecture-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Architecture</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Art.svg" className="img-fluid mx-auto mt-3" alt="Arts-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Arts</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Law.svg" className="img-fluid mx-auto mt-3" alt="law-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Law</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Medical.svg" className="img-fluid mx-auto mt-3" alt="Medical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Medical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Management.svg" className="img-fluid mx-auto mt-3" alt="Management-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Management</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Engineering.svg" className="img-fluid mx-auto mt-3" alt="Engineering-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Engineering</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Architecture.svg" className="img-fluid mx-auto mt-3" alt="architecture-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Architecture</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Art.svg" className="img-fluid mx-auto mt-3" alt="Arts-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Arts</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Law.svg" className="img-fluid mx-auto mt-3" alt="law-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Law</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Medical.svg" className="img-fluid mx-auto mt-3" alt="Medical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Medical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Management.svg" className="img-fluid mx-auto mt-3" alt="Management-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Management</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Paramedical.svg" className="img-fluid mx-auto mt-3" alt="Paramedical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Paramedical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Architecture.svg" className="img-fluid mx-auto mt-3" alt="architecture-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Architecture</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Art.svg" className="img-fluid mx-auto mt-3" alt="Arts-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Arts</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Law.svg" className="img-fluid mx-auto mt-3" alt="law-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Law</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Medical.svg" className="img-fluid mx-auto mt-3" alt="Medical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Medical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Management.svg" className="img-fluid mx-auto mt-3" alt="Management-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Management</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="tab-pane fade exploreCardCon" id="a-Exams" role="tabpanel" aria-labelledby="aExams">
                            <div className="row">
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Paramedical.svg" className="img-fluid mx-auto mt-3" alt="Paramedical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Paramedical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Architecture.svg" className="img-fluid mx-auto mt-3" alt="architecture-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Architecture</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Art.svg" className="img-fluid mx-auto mt-3" alt="Arts-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Arts</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Law.svg" className="img-fluid mx-auto mt-3" alt="law-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Law</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Medical.svg" className="img-fluid mx-auto mt-3" alt="Medical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Medical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Management.svg" className="img-fluid mx-auto mt-3" alt="Management-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Management</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Paramedical.svg" className="img-fluid mx-auto mt-3" alt="Paramedical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Paramedical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Architecture.svg" className="img-fluid mx-auto mt-3" alt="architecture-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Architecture</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Art.svg" className="img-fluid mx-auto mt-3" alt="Arts-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Arts</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Law.svg" className="img-fluid mx-auto mt-3" alt="law-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Law</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Medical.svg" className="img-fluid mx-auto mt-3" alt="Medical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Medical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Management.svg" className="img-fluid mx-auto mt-3" alt="Management-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Management</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Paramedical.svg" className="img-fluid mx-auto mt-3" alt="Paramedical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Paramedical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Architecture.svg" className="img-fluid mx-auto mt-3" alt="architecture-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Architecture</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Art.svg" className="img-fluid mx-auto mt-3" alt="Arts-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Arts</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Law.svg" className="img-fluid mx-auto mt-3" alt="law-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Law</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Medical.svg" className="img-fluid mx-auto mt-3" alt="Medical-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Medical</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-2 mb-5 d-flex">
                                    <div className="card text-center flex-fill">
                                        <img src="images/icons/Management.svg" className="img-fluid mx-auto mt-3" alt="Management-logo"></img>
                                        <div className="card-body">
                                            <p className="card-text m-0 text-blue">18 Courses</p>
                                            <h6 className="card-title">Management</h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section >

            {/* Explore Section Start */}

            {/* Study Abroad Section Start */}

            <section className="StudyAbroadCon bg-white" data-aos="fade-up">
                <div className="container pt-5 position-relative">
                    <h4 className="fw-bold text-blue text-center">Study Abroad</h4>
                    <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="d-flex flex-wrap justify-content-center gap-md-4 gap-1 studyAbroadNav" role="tablist">
                        <a className="mb-3 active" id="nav-USA-tab" data-bs-toggle="tab" data-bs-target="#nav-USA" type="button" role="tab" aria-controls="nav-USA" aria-selected="true">USA</a>
                        <a className="mb-3" id="nav-UK-tab" data-bs-toggle="tab" data-bs-target="#nav-UK" type="button" role="tab" aria-controls="nav-UK" aria-selected="false">UK</a>
                        <a className="mb-3" id="nav-Canada-tab" data-bs-toggle="tab" data-bs-target="#nav-Canada" type="button" role="tab" aria-controls="nav-Canada" aria-selected="false">Canada</a>
                        <a className="mb-3" id="nav-Australia-tab" data-bs-toggle="tab" data-bs-target="#nav-Australia" type="button" role="tab" aria-controls="nav-Australia" aria-selected="false">Australia</a>
                        <a className="mb-3" id="nav-Germany-tab" data-bs-toggle="tab" data-bs-target="#nav-Germany" type="button" role="tab" aria-controls="nav-Germany" aria-selected="false">Germany</a>
                        <a className="mb-3" id="nav-Russia-tab" data-bs-toggle="tab" data-bs-target="#nav-Russia" type="button" role="tab" aria-controls="nav-Russia" aria-selected="false">Russia</a>
                        <a className="mb-3" id="nav-Philippnes-tab" data-bs-toggle="tab" data-bs-target="#nav-Philippnes" type="button" role="tab" aria-controls="nav-Philippnes" aria-selected="false">Philippnes</a>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-USA" role="tabpanel" aria-labelledby="nav-USA-tab">
                            <div>
                                <MainCarousel items={StudyAbroadItems} />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-UK" role="tabpanel" aria-labelledby="nav-UK-tab">
                            <div>
                                <MainCarousel items={StudyAbroadItems} />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-Canada" role="tabpanel" aria-labelledby="nav-Canada-tab">
                            <div>
                                <MainCarousel items={StudyAbroadItems} />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-Australia" role="tabpanel" aria-labelledby="nav-Australia-tab">
                            <div>
                                <MainCarousel items={StudyAbroadItems} />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-Germany" role="tabpanel" aria-labelledby="nav-Germany-tab">
                            <div>
                                <MainCarousel items={StudyAbroadItems} />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-Russia" role="tabpanel" aria-labelledby="nav-Russia-tab">
                            <div>
                                <MainCarousel items={StudyAbroadItems} />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-Philippines" role="tabpanel" aria-labelledby="nav-Philippines-tab">
                            <div>
                                <MainCarousel items={StudyAbroadItems} />
                            </div>
                        </div>
                    </div>

                </div>
            </section >

            {/* Study Abroad Section Start */}

            {/* Latest News Section */}

            <section className="latestNewsCon" data-aos="fade-down">
                <div className="container pt-5">
                    <h3 className="fw-bold text-center">Latest News & Blogs</h3>
                    <div className="nav-pills justify-content-center pt-3 gap-2 d-flex" role="tablist">
                        <button className="active btn px-4 newsBtn" id="pills-news-tab" data-bs-toggle="pill" data-bs-target="#pills-news" type="button" role="tab" aria-controls="pills-news" aria-selected="true">News</button>
                        <button className="btn px-4 blgBtn" id="pills-blogs-tab" data-bs-toggle="pill" data-bs-target="#pills-blogs" type="button" role="tab" aria-controls="pills-blogs" aria-selected="false">Blogs</button>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="card-con pt-5 tab-pane fade show active" id="pills-news" role="tabpanel" aria-labelledby="pills-news-tab" >
                            <div className="row">
                                <div className="col-md-4 mb-5">
                                    <div className="card" data-aos="fade-up">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5">
                                    <div className="card" data-aos="fade-up">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5">
                                    <div className="card" data-aos="fade-up">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-con pt-5 tab-pane fade" id="pills-blogs" role="tabpanel" aria-labelledby="pills-blogs-tab" >
                            <div className="row">
                                <div className="col-md-4 mb-5">
                                    <div className="card" data-aos="fade-up">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5" data-aos="fade-up">
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5" data-aos="fade-up">
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News Section */}

            {/* Expret Counsellor form */}

            <section className="ExpertCon" data-aos="fade-up">
                <div className="container py-5">
                    <h3 className="fw-bold text-center">Get In Touch With Our Expert Counsellor</h3>
                    <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="form container">
                        <div className="row">
                            <div className="col-md-6" data-aos="slide-right">
                                <div className="mb-3 ms-md-5">
                                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter Name"></input>
                                </div>
                            </div>
                            <div className="col-md-6" data-aos="slide-left">
                                <div className="mb-3 me-md-5">
                                    <input type="number" className="form-control" id="exampleInputMobile" aria-describedby="mobileHelp" placeholder="Enter Mobile"></input>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6" data-aos="slide-right">
                                <div className="mb-3 ms-md-5">
                                    <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email"></input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3 me-md-5" data-aos="slide-left">
                                    <input type="text" className="form-control" id="exampleInputStream" aria-describedby="streamHelp" placeholder="Enter Stream"></input>
                                </div>
                            </div>
                        </div>
                        <div className="text-center reqBtn">
                            <button className="btn">Request for a Call Back</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expret Counsellor form */}

        </>
    );
}
export default Work;
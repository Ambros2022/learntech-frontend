import React from "react";
import AnimatedCounter from "./animatedCounter";
import AnimatedCounter2 from "./animatedCounter2";
import AnimatedCounter3 from "./animatedCounter3";
import OwlCarousel from "src/@core/components/OwlCarousel";


const Work = () => {
    const items = [
        <div>Item 1</div>,
        <div>Item 2</div>,
        <div>Item 3</div>
    ];
    return (
        <>

            {/* Header Start */}



            {/* Header End */}

            {/* Navbar Start */}



            {/* Navbar End */}

            {/* Banner Start */}

            <section className="banner">
                <div id="carouselExampleIndicators" className="container carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner d-flex align-content-end">
                        <div className="carousel-item active">
                            <div className="row">
                                <div className="searchBox-con col-md-7">
                                    <div className="searchBox">
                                        <p className="pb-3">Find Colleges, Courses & Exams that are best for you</p>
                                        <div className="row">
                                            <div className="col-8 col-md-8 col-lg-9">
                                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search"></input>
                                            </div>
                                            <div className="col-4 col-md-4 col-lg-3 p-0">
                                                <button className="btn searchBtn">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 bannerFormCon">
                                    <div>
                                        <form className="my-5">
                                            <h5 className="py-5 text-center">Let’s build a better future for you</h5>
                                            <div className="mb-3 mx-5">
                                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter Name"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="number" className="form-control" id="exampleInputPhone" aria-describedby="phoneHelp" placeholder="Enter Phone Number"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="text" className="form-control" id="exampleInputCourse" aria-describedby="courseHelp" placeholder="Enter Course"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="text" className="form-control" id="exampleInputLocation" aria-describedby="locationHelp" placeholder="Enter Location"></input>
                                            </div>
                                            <div className="d-grid">
                                                <button type="submit" className="mb-3 mx-5 btn sbtBtn btn-xl btn-block btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                <div className="searchBox-con col-md-7">
                                    <div className="searchBox">
                                        <p className="pb-3">Find Colleges, Courses & Exams that are best for you</p>
                                        <div className="row">
                                            <div className="col-8 col-md-8 col-lg-9">
                                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search"></input>
                                            </div>
                                            <div className="col-4 col-md-4 col-lg-3 p-0">
                                                <button className="btn searchBtn">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 bannerFormCon">
                                    <div>
                                        <form className="my-5">
                                            <h5 className="py-5 text-center">Let’s build a better future for you</h5>
                                            <div className="mb-3 mx-5">
                                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter Name"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="number" className="form-control" id="exampleInputPhone" aria-describedby="phoneHelp" placeholder="Enter Phone Number"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="text" className="form-control" id="exampleInputCourse" aria-describedby="courseHelp" placeholder="Enter Course"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="text" className="form-control" id="exampleInputLocation" aria-describedby="locationHelp" placeholder="Enter Location"></input>
                                            </div>
                                            <div className="d-grid">
                                                <button type="submit" className="mb-3 mx-5 btn sbtBtn btn-xl btn-block btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                <div className="searchBox-con col-md-7">
                                    <div className="searchBox">
                                        <p className="pb-3">Find Colleges, Courses & Exams that are best for you</p>
                                        <div className="row">
                                            <div className="col-8 col-md-8 col-lg-9">
                                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search"></input>
                                            </div>
                                            <div className="col-4 col-md-4 col-lg-3 p-0">
                                                <button className="btn searchBtn">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 bannerFormCon">
                                    <div>
                                        <form className="my-5">
                                            <h5 className="py-5 text-center">Let’s build a better future for you</h5>
                                            <div className="mb-3 mx-5">
                                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter Name"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="number" className="form-control" id="exampleInputPhone" aria-describedby="phoneHelp" placeholder="Enter Phone Number"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="text" className="form-control" id="exampleInputCourse" aria-describedby="courseHelp" placeholder="Enter Course"></input>
                                            </div>
                                            <div className="mb-3 mx-5">
                                                <input type="text" className="form-control" id="exampleInputLocation" aria-describedby="locationHelp" placeholder="Enter Location"></input>
                                            </div>
                                            <div className="d-grid">
                                                <button type="submit" className="mb-3 mx-5 btn sbtBtn btn-xl btn-block btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Banner End */}

            {/* News Section Start */}



            {/* News Section Start */}

            {/* Analysis Section Start */}

            <div className="Analysis-Section">
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

            <section className="FeaturedClgCon">
                <OwlCarousel items={items} />
            </section>

            {/* Featured College Section start*/}


            {/* Explore Section Start */}

            <section className="exploreCon">
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

            {/* Latest News Section */}

            <section className="latestNewsCon">
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
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5">
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
                        <div className="card-con pt-5 tab-pane fade" id="pills-blogs" role="tabpanel" aria-labelledby="pills-blogs-tab" >
                            <div className="row">
                                <div className="col-md-4 mb-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-body-secondary">24 Jan, 2024</h6>
                                            <h4 className="card-title fw-bold text-blue">Card title</h4>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <a href="#" className="btn readBtn card-link">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5">
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

            <section className="ExpertCon">
                <div className="container py-5">
                    <h3 className="fw-bold text-center">Get In Touch With Our Expert Counsellor</h3>
                    <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="form container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3 ms-md-5">
                                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter Name"></input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3 me-md-5">
                                    <input type="number" className="form-control" id="exampleInputMobile" aria-describedby="mobileHelp" placeholder="Enter Mobile"></input>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3 ms-md-5">
                                    <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email"></input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3 me-md-5">
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
import React from 'react'
import MainCarousel from 'src/@core/components/main-carousel'

function FeaturedCollegeSection() {
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
    return (
        <section className="FeaturedClgCon bg-white" id="animation5" data-aos="fade-up">
            <div className="container pt-5 position-relative">
                <h4 className="fw-bold text-blue text-center mb-5">Featured Colleges</h4>
                <MainCarousel items={items} />
            </div>
        </section>
    )
}

export default FeaturedCollegeSection
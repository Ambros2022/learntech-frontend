import React, { useState } from 'react'
import MainCarousel from 'src/@core/components/main-carousel'

function StudyAbroadSection() {
    const usaItems = [
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
    const [activeCountry, setActiveCountry] = useState('USA');
    const [StudyAbroadItems, setStudyAbroadItems] = useState(usaItems);
    // Function to handle navbar item click
    const handleNavItemClick = (countryId, items) => {
        setActiveCountry(countryId);
        setStudyAbroadItems(items);
    };
    const getLinkClass = (countryId) => {
        return `mb-3 ${countryId === activeCountry ? 'active' : ''}`;
    };


    const ukItems = [
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of london</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />London, UK</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>
    ];
    const canadaItems = [
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Brampton</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Brampton, canada</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>
    ];
    const australiaItems = [
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Melbourne</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Melbourne, Australia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>
    ];
    const germanyItems = [
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Berlin</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Berlin, Germany</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>
    ];
    const russiaItems = [
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Moscow</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Moscow, Russia</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>
    ];
    const philippinesItems = [
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>,
        <div className="card StudyAbroadCard mb-5">
            <img src="images/icons/university.jpg" className="card-img-top" alt="university"></img>
            <div className="card-body">
                <h5 className="card-title text-blue">The University of Manila</h5>
                <p className="card-text"><img style={{ width: '20px' }} className="me-2 card-text-image" src="images/icons/Location 2.svg" alt="location-icon" />Manila, Philippines</p>
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn">Apply Now</a>
                </div>
            </div>
        </div>
    ];
    return (
        <section className="StudyAbroadCon bg-white" id="animation7" data-aos="fade-up">
            <div className="container pt-5 position-relative">
                <h4 className="fw-bold text-blue text-center">Study Abroad</h4>
                <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="d-flex justify-content-center gap-md-4 gap-2 studyAbroadNav">
                    <a className={getLinkClass('USA')} id="USA" type="button" aria-selected={activeCountry === 'USA'} onClick={() => handleNavItemClick('USA', usaItems)}>USA</a>
                    <a className={getLinkClass('UK')} id="UK" type="button" aria-selected={activeCountry === 'UK'} onClick={() => handleNavItemClick('UK', ukItems)}>UK</a>
                    <a className={getLinkClass('Canada')} id="Canada" type="button" aria-selected={activeCountry === 'Canada'} onClick={() => handleNavItemClick('Canada', canadaItems)}>Canada</a>
                    <a className={getLinkClass('Australia')} id="Australia" type="button" aria-selected={activeCountry === 'Australia'} onClick={() => handleNavItemClick('Australia', australiaItems)}>Australia</a>
                    <a className={getLinkClass('Germany')} id="Germany" type="button" aria-selected={activeCountry === 'Germany'} onClick={() => handleNavItemClick('Germany', germanyItems)}>Germany</a>
                    <a className={getLinkClass('Russia')} id="Russia" type="button" aria-selected={activeCountry === 'Russia'} onClick={() => handleNavItemClick('Russia', russiaItems)}>Russia</a>
                    <a className={getLinkClass('Philippines')} id="Philippines" type="button" aria-selected={activeCountry === 'Philippines'} onClick={() => handleNavItemClick('Philippines', philippinesItems)}>Philippines</a>
                </div>
                <div id="studyCardContainer">
                    <MainCarousel items={StudyAbroadItems} />
                </div>
            </div>
        </section >
    )
}

export default StudyAbroadSection
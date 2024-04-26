import React, { useState, useEffect } from 'react';
import { Config } from "src/configs/mainconfig";

const Footer = () => {

    const [showButton, setShowButton] = useState(false);

    const ImgUrl = Config.IMG_URL;

    useEffect(() => {
        const handleScroll = () => {
            const halfwayPoint = window.innerHeight / 2;
            if (window.scrollY > halfwayPoint) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    }

    return (
        <>
            <section className="footerCon">
                <div className="container pt-5">
                    <img className="footer-logo" src={ImgUrl + "/images/icons/footer-learntech-logo.png"} alt="learntech-logo" />
                    <div className="row">
                        <div className="col-md-4 text-white">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <span className="footerIcon">
                                <div className="mb-3">
                                    <img className="d-inline-block" src={ImgUrl + "/images/icons/Phone Icon.svg"} alt="phone-icon" />
                                    <a href="tel:18001208969" target="_blank" className="ms-2 d-inline-block">1800 120 8969</a><br></br>
                                </div>
                                <div className="mb-3">
                                    <img className="d-inline icon-white" src={ImgUrl + "/images/icons/email-icon.svg"} alt="phone-icon" />
                                    <a href="mailto:info@learntech.com" target="_blank" className="ms-2 d-inline-block">info@learntech.com</a><br></br>
                                </div >
                                <div className="mb-3">
                                    <img className="mb-3" src={ImgUrl + "/images/icons/Location White.svg"} alt="phone-icon" />
                                    <a href="https://www.google.com/maps/place/Jayanagara+9th+Block,+Jayanagar,+Bengaluru,+Karnataka/@12.9191172,77.5906813,16z/data=!3m1!4b1!4m6!3m5!1s0x3bae1509aa3810eb:0xc7f2ebd555ee64f3!8m2!3d12.9204609!4d77.5920295!16s%2Fg%2F113dwrrcn?entry=ttu" target="_blank" className="ms-2 mb-3 d-inline-block">9th Block, Jayanagar<br></br> Bangalore - 560041</a>
                                </div>
                            </span>
                        </div>
                        <div className="col-md-2 col-6 text-white mb-3">
                            <h6 className="fw-bold mb-3">Info</h6>
                            <a href="#">About us</a><br></br>
                            <a href="#">Our Team</a><br></br>
                            <a href="#">Services</a><br></br>
                            <a href="#">Contact us</a><br></br>
                            <a href="#">Careers</a><br></br>
                            <a href="#">Site Map</a>
                        </div>
                        <div className="col-md-2 col-6 text-white mb-3">
                            <h6 className="fw-bold mb-3">Quick Links</h6>
                            <a href="#">Blogs</a><br></br>
                            <a href="#">NRI Quata</a><br></br>
                            <a href="#">Study Abroad</a><br></br>
                            <a href="#">Scholarships</a><br></br>
                            <a href="#">Student’s Speak</a>
                        </div>
                        <div className="col-md-2 col-6 text-white mb-3">
                            <h6 className="fw-bold mb-3">Legal</h6>
                            <a href="#">Feed</a><br></br>
                            <a href="#">Disclaimer</a><br></br>
                            <a href="#">Privacy Policy</a><br></br>
                            <a href="#">Terms & Conditions</a>
                        </div>
                        <div className="col-md-2 col-6 text-white mb-3">
                            <h6 className="fw-bold mb-3">Download Our App</h6>
                            <a href="https://apps.apple.com/in/app/learntech/id1623567055" target='_blank'><img className="mb-3 img-fluid" src={ImgUrl + "/images/icons/app-store.png"}></img></a><br></br>
                            <a href="https://play.google.com/store/apps/details?id=com.ilearntech.app" target='_blank'><img className="img-fluid" src={ImgUrl + "/images/icons/google-play.png"}></img></a>
                        </div>
                    </div>
                </div>
                <div className="row container-fluid">
                    <div className="mt-3 col-md-4 text-md-start">
                        <a href="tel:18001208969" className="phone-icon "><img src={ImgUrl + "/images/icons/Phone Blue.svg"} alt="phone-icon" /></a>
                    </div>
                    <div className="col-md-4 mb-3 text-md-center">
                        <a href="#" className="DownloadBrchrBtn" ><img src={ImgUrl + "/images/icons/Download Brochure.svg"} alt="download-brochure-icon" /></a>
                    </div>
                    <div className="mt-3 col-md-4 text-md-end">
                        <button onClick={scrollToTop} className={`arrowIcon ${showButton ? 'show' : 'hide'}`}><img className="footer-arrow" src={ImgUrl + "/images/icons/left arrow.svg"} alt="arrow-icon" /></button>
                        <a href="https://wa.me/+919036020076" target='_blank' className="whatsappIcon" ><img className="footer-arrow" src={ImgUrl + "/images/icons/whatsapp.svg"} alt="whatsapp-icon" /></a>
                    </div>
                </div>
            </section>

            <footer className='mainFooter'>
                <div className="container text-white pt-3">
                    <div className="row">
                        <div className="col-md-6 text-sm-center">
                            <p>©2024 Learntech Edu Solutions Pvt. Ltd. All Rights Reserved.</p>
                        </div>
                        <div className="col-md-6 text-md-end text-sm-center">
                            <p className="d-inline-block">Follow us on</p>
                            <a href="https://www.facebook.com/bangalorestudy" target='_blank'><img className='icon-white mx-2' src={ImgUrl + "/images/icons/Facebook.svg"} alt="facebook-icon" /></a>
                            <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><img className='icon-white me-2' src={ImgUrl + "/images/icons/linked-in.svg"} alt="linkedIn-icon" /></a>
                            <a href="https://twitter.com/BangaloreStudy2" target='_blank'><img className='icon-white me-2' src={ImgUrl + "/images/icons/twitter.svg"} alt="twitter-icon" /></a>
                            <a href="https://www.instagram.com/bangalorestudy/" target='_blank'><img className='icon-white me-2' src={ImgUrl + "/images/icons/instagram.svg"} alt="instagram-icon" /></a>
                            <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target='_blank'><img className='icon-white me-2' src={ImgUrl + "/images/icons/youtube.svg"} alt="youtube-icon" /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;
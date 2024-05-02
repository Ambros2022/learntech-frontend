import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Footer = () => {

  const [showButton, setShowButton] = useState(false);

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
          <Image className="footer-logo" src="/images/icons/footer-learntech-logo.png" width={170} height={60} alt="learntech-logo" />
          <div className="row">
            <div className="col-md-4 text-white">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <span className="footerIcon">
                <div className="mb-3">
                  <Image className="d-inline-block" src="/images/icons/Phone Icon.svg" width={25} height={24} alt="phone-icon" />
                  <a href="tel:18001208969" target="_blank" className="ms-2 d-inline-block">1800 120 8969</a><br></br>
                </div>
                <div className="mb-3">
                  <Image className="d-inline icon-white" src="/images/icons/email-icon.svg" alt="phone-icon" width={25} height={24} />
                  <a href="mailto:info@learntech.com" target="_blank" className="ms-2 d-inline-block">info@learntech.com</a><br></br>
                </div >
                <div className="mb-3">
                  <Image className="mb-3" src="/images/icons/Location White.svg" alt="phone-icon" width={25} height={24} />
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
              <a href="https://apps.apple.com/in/app/learntech/id1623567055" target='_blank'><Image className="mb-3 img-fluid" width={150} height={70} alt="app-store-img" src="/images/icons/app-store.png" /></a><br></br>
              <a href="https://play.google.com/store/apps/details?id=com.ilearntech.app" target='_blank'><Image className="img-fluid" width={150} height={70} alt="google-play-img" src="/images/icons/google-play.png" /></a>
            </div>
          </div>
        </div>
        <div className="row container-fluid">
          <div className="mt-md-3 col-md-4 text-md-start">
            <a href="tel:18001208969" className="phone-icon "><Image src="/images/icons/Phone Blue.svg" width={30} height={30} alt="phone-icon" /></a>
          </div>
          <div className="col-md-4 mb-md-3 text-md-center">
            <a href="#" className="DownloadBrchrBtn" ><Image src="/images/icons/Download Brochure.svg" width={150} height={70} alt="download-brochure-icon" /></a>
          </div>
          <div className="mt-md-3 col-md-4 text-md-end">
            <button onClick={scrollToTop} className={`arrowIcon ${showButton ? 'show' : 'hide'}`}><Image width={20} height={20} className="footer-arrow" src="/images/icons/left arrow.svg" alt="arrow-icon" /></button>
            <a href="https://wa.me/+919036020076" target='_blank' className="whatsappIcon" ><Image width={30} height={30} className="footer-arrow" src="/images/icons/whatsapp.svg" alt="whatsapp-icon" /></a>
          </div>
        </div>
      </section>

      <footer className='mainFooter'>
        <div className="container text-white pt-3">
          <div className="row">
            <div className="col-md-6 text-sm-center order-2 order-md-1">
              <p>©2024 Learntech Edu Solutions Pvt. Ltd. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-md-end order-1 order-md-2 text-center">
              <p className="d-inline-block">Follow us on</p>
              <a href="https://www.facebook.com/bangalorestudy" target='_blank'><Image width={27} height={27} className='icon-white mx-2' src="/images/icons/Facebook.svg" alt="facebook-icon" /></a>
              <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/linked-in.svg" alt="linkedIn-icon" /></a>
              <a href="https://twitter.com/BangaloreStudy2" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/twitter.svg" alt="twitter-icon" /></a>
              <a href="https://www.instagram.com/bangalorestudy/" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/instagram.svg" alt="instagram-icon" /></a>
              <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/youtube.svg" alt="youtube-icon" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;

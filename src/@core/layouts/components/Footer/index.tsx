import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
// import Link from 'src/@core/theme/overrides/link';
import Link from "next/link";
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
        <div className="container pt-3">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-4 col-8">
              <Link href='/'>
                <Image className="footer-logo" src="/images/icons/footer-learntech-logo.png" width={200} height={200} alt="learntech-logo" />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 text-white">
              <p className='d-flex justify-content-start text-center'>
                Dream. Apply. Achieve.<br></br>
                Our Expert Admission Guidance<br></br>
                is the Bridge that Connects You<br></br>
                to a Brighter Future.</p>
              <span className="footerIcon">
                <div className="mb-3">
                  <Image className="d-inline-block" src="/images/icons/Phone Icon.svg" width={25} height={24} alt="phone-icon" />
                  <a href="tel:18001208969" target="_blank" className="ms-2 d-inline-block">1800 120 8969</a><br></br>
                </div>
                <div className="mb-3">
                  <Image className="d-inline icon-white" src="/images/icons/email-icon.svg" alt="phone-icon" width={25} height={24} />
                  <a href="mailto:info@learntechww.com" target="_blank" className="ms-2 d-inline-block">info@learntechww.com</a><br></br>
                </div >
                <div className="mb-3">
                  <Image className="mb-3" src="/images/icons/Location White.svg" alt="phone-icon" width={25} height={24} />
                  <a href="https://www.google.com/maps/place/Learntech+Edu+Solutions+Pvt+Ltd+-+Study+Abroad+Counselor/@12.9187833,77.5983055,15z/data=!4m6!3m5!1s0x3bae15064e759943:0x60dcac77858f6b5e!8m2!3d12.9187833!4d77.5983055!16s%2Fg%2F11cs1gwx25?entry=ttu" target="_blank" className="ms-2 mb-3 d-inline-block">9th Block, Jayanagar<br></br> Bangalore - 560041</a>
                </div>
              </span>
            </div>
            <div className="col-md-2 col-6 text-white mb-3">
              <h5 className="fw-bold mb-3">Info</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'><Link href="/about-us"><small><i className="bi bi-chevron-double-right"></i></small> About us</Link></li>
                <li className='mb-2'><Link href="/our-team"><i className="bi bi-chevron-double-right"></i> Our Team</Link></li>
                <li className='mb-2'><Link href="/services"><i className="bi bi-chevron-double-right"></i> Services</Link></li>
                <li className='mb-2'><Link href="/contact-us"><i className="bi bi-chevron-double-right"></i> Contact us</Link></li>
                <li className='mb-2'><Link href="/career"><i className="bi bi-chevron-double-right"></i> Careers</Link></li>
                <li className='mb-2'><Link href="/sitemap"><i className="bi bi-chevron-double-right"></i> Site Map</Link></li>
              </ul>
            </div>
            <div className="col-md-2 col-6 text-white mb-3">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'><Link href="/blogs"><i className="bi bi-chevron-double-right"></i> Blogs</Link></li>
                <li className='mb-2'><Link href="/nri-quota"><i className="bi bi-chevron-double-right"></i> NRI Quata</Link></li>
                <li className='mb-2'><Link href="/study-in-usa"><i className="bi bi-chevron-double-right"></i> Study Abroad</Link></li>
                <li className='mb-2'><Link href="/scholarships"><i className="bi bi-chevron-double-right"></i> Scholarships</Link></li>
                <li className='mb-2'><Link href="/students-speak"><i className="bi bi-chevron-double-right"></i> Student’s Speak</Link></li>
                <li className='mb-2'><Link href="/education-loan"><i className="bi bi-chevron-double-right"></i> Education Loan</Link></li>
              </ul>
            </div>
            <div className="col-md-2 col-6 text-white mb-3">
              <h5 className="fw-bold mb-3">Legal</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'><Link href="/"><i className="bi bi-chevron-double-right"></i> Feed</Link></li>
                <li className='mb-2'><Link href="/disclaimer"><i className="bi bi-chevron-double-right"></i> Disclaimer</Link></li>
                <li className='mb-2'><Link href="/privacy-policy"><i className="bi bi-chevron-double-right"></i> Privacy Policy</Link></li>
                <li className='mb-2'><Link href="/terms-and-conditions"><i className="bi bi-chevron-double-right"></i> Terms & Conditions</Link></li>
                <li className='mb-2'><Link href="/advertise-with-us"><i className="bi bi-chevron-double-right"></i> Advertise With Us</Link></li>
              </ul>
            </div>
            <div className="col-md-2 col-6 text-white mb-3">
              <h5 className="fw-bold mb-3">Download Our App</h5>
              <a href="https://apps.apple.com/in/app/learntech/id1623567055" target='_blank'><Image className="mb-3 img-fluid" width={150} height={70} alt="app-store-img" src="/images/icons/app-store.png" /></a><br></br>
              <a href="https://play.google.com/store/apps/details?id=com.ilearntech.app" target='_blank'><Image className="img-fluid" width={150} height={70} alt="google-play-img" src="/images/icons/google-play.png" /></a>
            </div>
          </div>
        </div>
        <div className="row container-fluid">
          <div className="mt-md-3 col-md-4 text-md-start">
            <a href="tel:18001208969" className="phone-icon"><Image src="/images/icons/Phone-blue.svg" width={30} height={30} alt="phone-icon" /></a>
          </div>
          <div className="col-md-4 mb-md-3 text-md-center">

            {/* <a href="#" className="DownloadBrchrBtn" >
              <Image src="/images/icons/Download Brochure.svg" width={150} height={70} alt="download-brochure-icon" />

            </a> */}

            <GlobalEnquiryForm pagename="Brochure" title="Get Brochure" />
          </div>
          <div className="mt-md-3 col-md-4 text-md-end">
            <button onClick={scrollToTop} className={`arrowIcon ${showButton ? 'show' : 'hide'}`}><Image width={30} height={30} className="footer-arrow" src="/images/icons/left arrow.svg" alt="arrow-icon" /></button>
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
              <a href="https://www.facebook.com/learntechedu" target='_blank'><Image width={27} height={27} className='icon-white mx-2' src="/images/icons/Facebook.svg" alt="facebook-icon" /></a>
              <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/linked-in.svg" alt="linkedIn-icon" /></a>
              <a href="https://twitter.com/learntechww" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/twitter-x.png" alt="twitter-icon" /></a>
              <a href="https://www.instagram.com/learntechedus" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/instagram.svg" alt="instagram-icon" /></a>
              <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/youtube.svg" alt="youtube-icon" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;

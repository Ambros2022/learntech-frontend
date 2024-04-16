// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'
import React, { useState, useEffect } from 'react';



// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {

  const [showButton, setShowButton] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const halfwayPoint = window.innerHeight / 2;
      if (window.scrollY > halfwayPoint) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };


  return (

    <BlankLayoutWrapper className='layout-wrapper'>

      <Box className='app-content' sx={{ overflow: 'hidden', minHeight: '100vh', position: 'relative' }}>

        <header className="bg-gray py-2">
          <div className="container-lg">
            <div className="row">
              <div className="col-md-4 d-flex align-items-center socialIcon">
                <img className="mx-2" src='images/icons/Facebook.svg'></img>
                <img className="me-2" src='images/icons/linked-in.svg'></img>
                <img className="me-2" src='images/icons/twitter.svg'></img>
                <img className="me-2" src='images/icons/instagram.svg'></img>
                <img className="me-2" src='images/icons/youtube.svg'></img>
              </div>
              <div className="col-md-8 d-flex align-items-center justify-content-end socialText">
                <div>
                  <img className="m-0" src="images/icons/Phone blue.svg"></img>
                  <text className="mx-2 " style={{ color: '#274896' }}>1800 120 8969</text>
                  <img className="ms-2" src="images/icons/Email-icon.svg"></img>
                  <text className="mx-2" style={{ color: '#274896' }}>info@learntech.com</text>
                  <a href="#" className="ms-2 btn reviewBtn">Write a Review</a>
                </div>
              </div>
            </div>
          </div>
        </header >
        <nav className="top-nav navbar navbar-expand-lg bg-white">
          <div className="container-lg">
            <a className="navbar-brand" href="#"><img src="images/icons/learntech-logo.png"></img></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                    aria-expanded="false">
                    Universities
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li>
                      <a className="d-flex justify-content-between dropdown-item" href="#">
                        Karnataka <img className="ms-auto" src="images/icons/right arrow.svg"></img>
                      </a>
                      <ul className="dropdown-menu dropdown-submenu">
                        <li>
                          <a className="dropdown-item" href="#">Bangalore</a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">Mangalore</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="d-flex justify-content-between dropdown-item" href="#">
                        Tamil Nadu <img className="ms-auto" src="images/icons/right arrow.svg"></img>
                      </a>
                      <ul className="dropdown-menu dropdown-submenu">
                        <li>
                          <a className="dropdown-item" href="#">Bangalore</a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">Mangalore</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="d-flex justify-content-between dropdown-item" href="#">
                        Karela <img className="ms-auto" src="images/icons/right arrow.svg"></img>
                      </a>
                      <ul className="dropdown-menu dropdown-submenu">
                        <li>
                          <a className="dropdown-item" href="#">Bangalore</a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">Mangalore</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="d-flex justify-content-between dropdown-item" href="#">
                        Andhra Pradesh <img className="ms-auto" src="images/icons/right arrow.svg"></img>
                      </a>
                      <ul className="dropdown-menu dropdown-submenu">
                        <li>
                          <a className="dropdown-item" href="#">Bangalore</a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">Mangalore</a>
                        </li>
                      </ul>
                    </li>
                    <div className='text-center text-blue'>
                      <a href="#" className='btn'>View More</a>
                    </div>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Colleges
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Courses
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Exams
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Study Abroad
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Latest News
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    More
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
              <div className='ms-auto'>
                <a className='mx-2 mt-3 socialIcon' href="#"><img src="images/icons/user-icon.svg" alt="" /></a>
                <button className=" btn counsellingBtn" type="submit">Get Counselling</button>
              </div>
            </div>

          </div>
        </nav>
        {children}
        {/* Footer Section Start */}

        <section className="footerCon">
          <div className="container pt-5">
            <img className="footer-logo" src="images/icons/footer-learntech-logo.png" alt="learntech-logo" />
            <div className="row">
              <div className="col-md-4 text-white">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <span className="footerIcon">
                  <img className="d-inline-block" src="images/icons/Phone Icon.svg" alt="phone-icon" />
                  <p className="ms-2 d-inline-block">1800 120 8969</p><br></br>
                  <img className="d-inline icon-white" src="images/icons/email-icon.svg" alt="phone-icon" />
                  <p className="ms-2 d-inline-block">info@learntech.com</p><br></br>
                  <img className="mb-4" src="images/icons/Location White.svg" alt="phone-icon" />
                  <p className="ms-2 mb-3 d-inline-block">9th Block, Jayanagar<br></br> Bangalore - 560041</p>
                </span>
              </div>
              <div className="col-md-2 text-white mb-3">
                <h6 className="fw-bold mb-3">Info</h6>
                <a href="#">About us</a><br></br>
                <a href="#">Our Team</a><br></br>
                <a href="#">Services</a><br></br>
                <a href="#">Contact us</a><br></br>
                <a href="#">Careers</a><br></br>
                <a href="#">Site Map</a>
              </div>
              <div className="col-md-2 text-white mb-3">
                <h6 className="fw-bold mb-3">Quick Links</h6>
                <a href="#">Blogs</a><br></br>
                <a href="#">NRI Quata</a><br></br>
                <a href="#">Study Abroad</a><br></br>
                <a href="#">Scholarships</a><br></br>
                <a href="#">Student’s Speak</a>
              </div>
              <div className="col-md-2 text-white mb-3">
                <h6 className="fw-bold mb-3">Legal</h6>
                <a href="#">Feed</a><br></br>
                <a href="#">Disclaimer</a><br></br>
                <a href="#">Privacy Policy</a><br></br>
                <a href="#">Terms & Conditions</a>
              </div>
              <div className="col-md-2 text-white mb-3">
                <h6 className="fw-bold mb-3">Download Our App</h6>
                <a href="#"><img className="mb-3 img-fluid" src="images/icons/app-store.png"></img></a><br></br>
                <a href="#"><img className="img-fluid" src="images/icons/google-play.png"></img></a>
              </div>
            </div>
          </div>
          <div className="row container-fluid">
            <div className="mt-3 col-md-4 mb-3 text-md-start">
              <a href="#" className="phone-icon "><img src="images/icons/Phone Blue.svg" alt="phone-icon" /></a>
            </div>
            <div className="col-md-4 mb-3 text-md-center">
              <a href="#" className="DownloadBrchrBtn" ><img src="images/icons/Download Brochure.svg" alt="download-brochure-icon" /></a>
            </div>
            <div className="mt-3 col-md-4 mb-3 text-md-end">
              <a href="#" className="whatsappIcon" ><img className="footer-arrow" src="images/icons/whatsapp.svg" alt="whatsapp-icon" /></a>
              <button onClick={scrollToTop} className={`arrowIcon ${showButton ? 'show' : 'hide'}`}><img className="footer-arrow" src="images/icons/left arrow.svg" alt="arrow-icon" /></button>
            </div>
          </div>
        </section>

        {/* Footer Section Start */}

        {/* footer Start */}

        <footer className='mainFooter'>
          <div className="container text-white pt-3">
            <div className="row">
              <div className="col-md-6 text-sm-center">
                <p>©2024 Learntech Edu Solutions Pvt. Ltd. All Rights Reserved.</p>
              </div>
              <div className="col-md-6 text-md-end text-sm-center">
                <p className="d-inline-block">Follow us on</p>
                <img className='icon-white mx-2' src="images/icons/Facebook.svg" alt="facebook-icon" />
                <img className='icon-white me-2' src="images/icons/linked-in.svg" alt="linkedIn-icon" />
                <img className='icon-white me-2' src="images/icons/twitter.svg" alt="twitter-icon" />
                <img className='icon-white me-2' src="images/icons/instagram.svg" alt="instagram-icon" />
                <img className='icon-white me-2' src="images/icons/youtube.svg" alt="youtube-icon" />
              </div>
            </div>
          </div>
        </footer>

        {/* footer Start */}

      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout

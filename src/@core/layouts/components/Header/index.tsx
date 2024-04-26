import { Config } from "src/configs/mainconfig";

const Header = () => {
  const ImgUrl = Config.IMG_URL;

  return (

    <>
      <header className="bg-header py-2">
        <div className="container-lg">
          <div className="row">
            <div className="col-md-4 d-flex align-items-center socialIcon">
              <a href="https://www.facebook.com/bangalorestudy" target="_blank"><img className="mx-2" src={ImgUrl + '/images/icons/Facebook.svg'}></img></a>
              <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><img className="me-2" src={ImgUrl + '/images/icons/linked-in.svg'}></img></a>
              <a href="https://twitter.com/BangaloreStudy2" target='_blank'><img className="me-2" src={ImgUrl + '/images/icons/twitter.svg'}></img></a>
              <a href="https://www.instagram.com/bangalorestudy/" target='_blank'><img className="me-2" src={ImgUrl + '/images/icons/instagram.svg'}></img></a>
              <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target='_blank'><img className="me-2" src={ImgUrl + '/images/icons/youtube.svg'}></img></a>
            </div>
            <div className="col-md-8 d-flex align-items-center justify-content-end socialText">
              <div>
                <img className="m-0" src={ImgUrl + "/images/icons/Phone blue.svg"}></img>
                <a href="tel:18001208969" target="_blank" className="mx-2 " style={{ color: '#274896' }}>1800 120 8969</a>
                <img className="ms-2" src={ImgUrl + "/images/icons/Email-icon.svg"}></img>
                <a href="mailto:info@learntech.com" className="mx-2" style={{ color: '#274896' }}>info@learntech.com</a>
                <a href="#" className="ms-2 btn reviewBtn">Write a Review</a>
              </div>
            </div>
          </div>
        </div>
      </header >

      <nav className="top-nav navbar navbar-expand-lg bg-white">
        <div className="container-lg">
          <a className="navbar-brand" href="#"><img src={ImgUrl + "/images/icons/learntech-logo.png"}></img></a>
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
                      Karnataka <img className="ms-auto" src={ImgUrl + "/images/icons/right arrow.svg"}></img>
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
                      Tamil Nadu <img className="ms-auto" src={ImgUrl + "/images/icons/right arrow.svg"}></img>
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
                      Karela <img className="ms-auto" src={ImgUrl + "/images/icons/right arrow.svg"}></img>
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
                      Andhra Pradesh <img className="ms-auto" src={ImgUrl + "/images/icons/right arrow.svg"}></img>
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
                  <div className='text-center text-blue dropdownBtn'>
                    <a href="#" className='btn'>View More</a>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="mailto:info@learntech.com" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
              <a className='mx-2 mt-3 socialIcon' href="#"><img src={ImgUrl + "/images/icons/user-icon.svg"} alt="user-icon" /></a>
              <button className=" btn counsellingBtn" type="submit">Get Counselling</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;

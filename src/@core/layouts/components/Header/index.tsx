import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import PasswordInput from "src/@core/components/custom-passwordInput/indx";
import PhoneInput from "src/@core/components/custom-phoneInputWithFlags";

const Header = () => {

  const router = useRouter();
  const isLinkActive = (href) => {
    return router.pathname === href;
  };
  const handlePhoneChange = (event) => {
    console.log(event.target.value);
  };

  return (

    <>
      <header className="bg-header py-2">
        <div className="container-lg">
          <div className="row">
            <div className="col-md-4 d-flex align-items-center socialIcon">
              <a href="https://www.facebook.com/bangalorestudy" target="_blank"><Image className="mx-2" width={26} height={22} src='/images/icons/Facebook.svg' alt="facebook-img" /></a>
              <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><Image className="me-2" width={26} height={22} alt='linked-in-img' src='/images/icons/linked-in.svg' /></a>
              <a href="https://twitter.com/BangaloreStudy2" target='_blank'><Image className="me-2" src='/images/icons/twitter.svg' width={26} height={22} alt="twitter-img" /></a>
              <a href="https://www.instagram.com/bangalorestudy/" target='_blank'><Image className="me-2" src='/images/icons/instagram.svg' width={26} height={22} alt='instagram-img' /></a>
              <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target='_blank'><Image className="me-2" src='/images/icons/youtube.svg' width={26} height={22} alt="youtube-img" /></a>
            </div>
            <div className="col-md-8 d-flex align-items-center justify-content-end socialText">
              <div>
                <Image className="m-0" src="/images/icons/Phone blue.svg" width={26} height={22} alt="phone-icon" />
                <a href="tel:18001208969" target="_blank" className="mx-2 " style={{ color: '#274896' }}>1800 120 8969</a>
                <Image className="ms-2" src="/images/icons/Email-icon.svg" width={26} height={22} alt="email-icon" />
                <a href="mailto:info@learntech.com" className="mx-2" style={{ color: '#274896' }}>info@learntech.com</a>
                <a href="#" className="ms-2 btn reviewBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">Write a Review</a>
              </div>
            </div>
          </div>
        </div>
      </header >

      <nav className="top-nav navbar navbar-expand-lg bg-white">
        <div className="container-lg">
          <Link className="navbar-brand" href="/home"><Image src="/images/icons/learntech-logo.png" width={160} height={50} alt="learntech-logo" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${isLinkActive('/home') ? 'active' : ''}`} aria-current="page" href="/home">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/universities') ? 'activeDrpDwn' : ''}`} href="/home" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Universities
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karnataka <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Tamil Nadu <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karela <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Andhra Pradesh <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <div className='text-center text-blue dropdownBtn'>
                    <Link href="#" className='btn'>View More</Link>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/college') ? 'activeDrpDwn' : ''}`} href="/college" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Colleges
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karnataka <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Tamil Nadu <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karela <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Andhra Pradesh <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <div className='text-center text-blue dropdownBtn'>
                    <Link href="#" className='btn'>View More</Link>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/courses') ? 'activeDrpDwn' : ''}`} href="/courses" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Courses
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karnataka <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Tamil Nadu <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karela <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Andhra Pradesh <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <div className='text-center text-blue dropdownBtn'>
                    <Link href="#" className='btn'>View More</Link>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/Exams') ? 'activeDrpDwn' : ''}`} href="/home" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Exams
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karnataka <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Tamil Nadu <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karela <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Andhra Pradesh <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <div className='text-center text-blue dropdownBtn'>
                    <Link href="#" className='btn'>View More</Link>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/studyAbroad') ? 'activeDrpDwn' : ''}`} href="/home" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Study Abroad
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karnataka <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Tamil Nadu <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karela <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Andhra Pradesh <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <div className='text-center text-blue dropdownBtn'>
                    <Link href="#" className='btn'>View More</Link>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/latestNews') ? 'activeDrpDwn' : ''}`} href="/home" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Latest News
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karnataka <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Tamil Nadu <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karela <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Andhra Pradesh <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <div className='text-center text-blue dropdownBtn'>
                    <Link href="#" className='btn'>View More</Link>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/more') ? 'activeDrpDwn' : ''}`} href="/home" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  More
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karnataka <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Tamil Nadu <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Karela <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="#">
                      Andhra Pradesh <Image className="ms-auto" src="/images/icons/right arrow.svg" width={25} height={25} alt='arrow-img' />
                    </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <Link className="dropdown-item" href="#">Bangalore</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="#">Mangalore</Link>
                      </li>
                    </ul>
                  </li>
                  <div className='text-center text-blue dropdownBtn'>
                    <Link href="#" className='btn'>View More</Link>
                  </div>
                </ul>
              </li>
            </ul>
            <div className='d-flex justify-content-xl-end ms-auto'>
              <Link className='mx-2  mt-1 socialIcon' href="#"><Image src="/images/icons/user-icon.svg" width={25} height={24} alt="user-icon" /></Link>
              <button className=" btn counsellingBtn p-2" type="submit">Get Counselling</button>
            </div>
          </div>
        </div>
      </nav>
      <div className="modal fadeModal" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog position-relative modal-dialog-centered modal-lg modal-md w-sm-form">
          <div className="modal-content">
            <h4 className="z-3 position-absolute text-white">Please Sign In to write a review</h4>
            <div className="row gx-0">
              <div className="col-md-6 formImgCon d-none d-md-flex justify-content-center formImage px-0 mx-0 py-5">
                <div className="align-content-center">
                  <Image src="/images/icons/form-img.png" width={300} height={200} alt={"form-image"} />
                </div>
              </div>
              <div className="col-md-6 signForm">
                <div className="d-flex justify-content-center gap-4 pt-2 mb-1" role="tablist">
                  <a href="#" className="nav-link active" id="pills-SignUp-tab" data-bs-toggle="pill" data-bs-target="#pills-SignUp" type="button" role="tab" aria-controls="pills-SignUp" aria-selected="true">Sign Up</a>
                  <a href="#" className="nav-link" id="pills-SignIn-tab" data-bs-toggle="pill" data-bs-target="#pills-SignIn" type="button" role="tab" aria-controls="pills-SignIn" aria-selected="false">Sign In</a>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-SignUp" role="tabpanel" aria-labelledby="pills-SignUp-tab">
                    <form action="#" className="w-75 text-black m-auto">
                      <div className="text-center pt-3">
                        <small className="text-black">Create new account</small>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="SignUpName" className="form-label"><small>Name</small></label>
                        <input type="text" className="form-control" id="SignUpName" aria-describedby="SignUpName" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="SignUpEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="SignUpEmail" aria-describedby="SignUpEmail" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="expertPhoneNumber2" className="form-label">Phone Number</label>
                        <PhoneInput onChange={handlePhoneChange} ariaDescribedby="expertPhoneNumber2"
                          id="expertPhoneNumber2" />
                      </div>
                      <PasswordInput
                        id="password"
                        label="Password"
                        placeholder=""
                      />
                      <PasswordInput
                        id="confirmPassword"
                        label="Confirm Password"
                        placeholder=""
                      />
                      <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" />
                        <label className="form-check-label" htmlFor="invalidCheck">
                          By signing up, you will agree to our <span className="text-blue">Terms, Data Policy</span> and <span className="text-blue">Cookies Policy</span>.
                        </label>
                        <div className="invalid-feedback">
                          You must agree before submitting.
                        </div>
                      </div>
                      <div className="d-grid mb-3">
                        <button className="btn btn-block btnSignUp">Sign Up</button>
                      </div>
                      <div className='orTxtHr mb-3'>
                        <span className='orTxtSpan'>OR</span>
                      </div>
                      <div className="text-center mb-3">
                        <small className='text-black'>Sign up with social media</small>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-center gap-5 socialSignUp">
                          <Image src='/images/icons/facebookForm.svg' width={25} height={25} alt='facebook-img' />
                          <Image src='/images/icons/googleForm.png' width={25} height={25} alt='google-img' />
                          <Image src='/images/icons/linkedin.svg' width={25} height={25} alt='linkedin-img' />
                          <Image src='/images/icons/twitterForm.svg' width={25} height={25} alt='twitter-img' />
                        </div>
                      </div>
                      <div className="mb-3 text-center">
                        <small>Already have an account? <span className="fw-bold text-blue">Sign In</span></small>
                      </div>
                    </form>
                  </div>
                  <div className="tab-pane fade" id="pills-SignIn" role="tabpanel" aria-labelledby="pills-SignIn-tab">
                    <form action="#" className="w-75 text-black m-auto">
                      <div className="text-center pt-3">
                        <small className="text-black">Welcome back!</small>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="SignInEmail" className="form-label">Email Id</label>
                        <input type="email" className="form-control" id="SignInEmail" aria-describedby="SignInEmail" />
                      </div>
                      <PasswordInput
                        id="SignInpassword"
                        label="Password"
                        placeholder=""
                      />
                      <div className="mb-3 text-center">
                        <a href="#" className="btn frgtBtn"><small>Forgot Password?</small></a>
                      </div>
                      <div className="d-grid mb-3">
                        <button className="btn btn-block btnSignUp">Sign In</button>
                      </div>
                      <div className='orTxtHr mb-3'>
                        <span className='orTxtSpan'>OR</span>
                      </div>
                      <div className="text-center mb-3">
                        <small className='text-black'>Sign up with social media</small>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-center gap-5 socialSignUp">
                          <Image src='/images/icons/facebookForm.svg' width={25} height={25} alt='facebook-img' />
                          <Image src='/images/icons/googleForm.png' width={25} height={25} alt='google-img' />
                          <Image src='/images/icons/linkedin.svg' width={25} height={25} alt='linkedin-img' />
                          <Image src='/images/icons/twitterForm.svg' width={25} height={25} alt='twitter-img' />
                        </div>
                      </div>
                      <div className="mb-3 text-center">
                        <small>Dont't have an account? <span className="fw-bold text-blue">Sign Out</span></small>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
export default Header;

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from "react";
import SignupForm from "src/@core/components/sign-up";
import SignInForm from "src/@core/components/sign-in";
import axios1 from 'src/configs/axios'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Statedropdown from 'src/@core/layouts/components/Header/state-dropdown';
import Coursedropdown from 'src/@core/layouts/components/Header/course-dropdown';
import Examdropdown from 'src/@core/layouts/components/Header/exam-dropdown';
import Abroaddropdown from 'src/@core/layouts/components/Header/abroad-dropdown';

interface Country {
  id: number;
  name: string;
}

interface Courses {
  id: number;
  slug: string;
}

const Header = () => {

  const router = useRouter();
  const [states, setStates] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const isMountedRef = useIsMountedRef();

  const [news, setNews] = useState<any[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);

  const isLinkActive = (href) => {
    return router.pathname === href;
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  const getnews = useCallback(async () => {
    setNews([]);
    try {
      const roleparams: any = {}
      roleparams['page'] = 1;
      roleparams['size'] = 4;
      const response = await axios1.get('api/website/news/get', { params: roleparams });
      setNews(response.data.data);

    } catch (err) {
      console.error(err);
      console.error(err);
    }
  }, [isMountedRef]);

  const getCountry = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 15 };
      const response = await axios1.get('api/website/abroadpages/get', { params: roleparams });
      setCountries(response.data.data);
    } catch (err) {
      console.error(err);
      console.error(err);
    }
  }, [isMountedRef]);


  const getCourses = useCallback(async () => {
    setCourses([]);
    try {
      const roleparams = { page: 1, size: 15, orderby: "asc", columnname: "listing_order" };
      const response = await axios1.get('api/website/stream/get', { params: roleparams });
      setCourses(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCountry();
  }, [getCountry]);


  const getuniversities = useCallback(async () => {
    setStates([]);
    try {
      const roleparams: any = {}
      roleparams['page'] = 1;
      roleparams['size'] = 15;
      const response = await axios1.get('api/website/states/get', { params: roleparams });
      setStates(response.data.data);

    } catch (err) {
      console.error(err);
      console.error(err);
    }
  }, [isMountedRef]);


  const getexams = useCallback(async () => {
    setExams([]);
    try {
      const roleparams: any = {}
      roleparams['page'] = 1;
      roleparams['size'] = 10000;
      const response = await axios1.get('api/website/stream_exams/get', { params: roleparams });
      setExams(response.data.data);

    } catch (err) {
      console.error(err);
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {

    getuniversities();
    getexams();
    getnews();
    getCourses();


  }, [getuniversities, getexams, getnews, getCourses]);





  return (

    <>
      <header className="bg-header py-2">
        <div className="container-lg">
          <div className="row">
            <div className="col-md-4 d-flex align-items-center socialIcon">
              <a href="https://www.facebook.com/learntechedu" target="_blank"><Image className="mx-2" width={26} height={22} src='/images/icons/Facebook.svg' alt="facebook-img" /></a>
              <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><Image className="me-2" width={26} height={22} alt='linked-in-img' src='/images/icons/linked-in.svg' /></a>
              <a href="https://twitter.com/learntechww" target='_blank'><Image className="me-2" src='/images/icons/twitter.svg' width={26} height={22} alt="twitter-img" /></a>
              <a href="https://www.instagram.com/learntechedus" target='_blank'><Image className="me-2" src='/images/icons/instagram.svg' width={26} height={22} alt='instagram-img' /></a>
              <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target='_blank'><Image className="me-2" src='/images/icons/youtube.svg' width={26} height={22} alt="youtube-img" /></a>
            </div>
            <div className="col-md-8 d-flex align-items-center justify-content-end socialText">
              <div>
                <span className='telHover'><Image className="m-0" src="/images/icons/Phone-blue.svg" width={26} height={22} alt="phone-icon" />
                  <a href="tel:18001208969" target="_blank" className="mx-2 " style={{ color: '#274896' }}>1800 120 8969</a></span>
                <span className="mailHover"><Image className="ms-2" src="/images/icons/email-icon.svg" width={26} height={22} alt="email-icon" />
                  <a href="mailto:info@learntech.com" className="mx-2" style={{ color: '#274896' }}>info@learntech.com</a></span>
                <Link href='/write-review' className="ms-2 btn reviewBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">Write a Review</Link>
              </div>
            </div>
          </div>
        </div>
      </header >

      <nav className="top-nav navbar navbar-expand-lg bg-white">
        <div className="container-lg">
          <Link className="navbar-brand" href="/"><Image src="/images/icons/learntech-logo.png" width={160} height={50} alt="learntech-logo" /></Link>
          <button className="navbar-toggler" type="button" onClick={toggle} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isOpen ? 'show' : ''} collapse navbar-collapse`} id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 ms-xl-5 ms-md-0">
              <li className="nav-item">
                <Link className={`nav-link ${isLinkActive('/') ? 'active' : ''}`} onClick={() => setIsOpen(false)} aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/universities') ? 'activeDrpDwn' : ''}`} onClick={() => setIsOpen(false)} href="/universities" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Universities
                </Link>

                <Statedropdown states={states} type="Universities" />
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/colleges') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/colleges" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Colleges
                </Link>
                <Statedropdown states={states} type="Colleges" />
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/courses') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/courses" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Courses
                </Link>
                <Coursedropdown states={courses} type="Colleges" />
              </li>
              <li className="nav-item dropdown">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/exams') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/exams" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  Exams
                </Link>
                <Examdropdown states={exams} />
              </li>

              <li className="nav-item dropdown">
                <Link
                  className={`nav-link dropdown-toggle ${isLinkActive('/country') ? 'activeDrpDwn' : ''}`}
                  onClick={() => setIsOpen(!isOpen)}
                  href="/colleges"
                  id="navbarDropdownMenuLink"
                  role="button"
                  aria-expanded={isOpen}
                >
                  Study Abroad
                </Link>
                <Abroaddropdown states={countries} type="Colleges" />

              </li>


              <li className="nav-item dropdown" style={{ position: 'static' }}>
                <Link
                  className={`nav-link dropdown-toggle ${isLinkActive('/latestNews') ? 'activeDrpDwn' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href="/news"
                  id="navbarDropdownMenuLink"
                  role="button"
                  aria-expanded="false"
                >
                  Latest News
                </Link>
                <div className="container-fluid">
                  <ul className="newsDrpDwn newsHide dropdown-menu" style={{ textAlign: "center", left: '0', right: "0", width: '80%', margin: "0 auto" }} aria-labelledby="navbarDropdownMenuLink">
                    <div className="dropdown-row-news dropdown-row p-2">
                      <div className="row">
                        {news.slice(0, 4).map((item) => (
                          <li key={item.id} className="news-item mb-1 col-md-3">
                            <div className="card-news card">
                              <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`} className="card-img-top" alt="News Banner" />
                              <div className="card-body">
                                <h5 className="card-title text-truncate">{item.meta_title}</h5>
                                <p className="card-text" >{item.meta_description}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </div>

                    </div>
                    <div className="text-end mt-1 me-2">
                      <Link href="/latestNews" className="btn ">Read All News</Link>
                    </div>
                  </ul>
                </div>
              </li>

              <li className="nav-item dropdown d-lg-inline-block d-none">
                <Link className={`nav-link dropdown-toggle ${isLinkActive('/more') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/home" id="navbarDropdownMenuLink" role="button"
                  aria-expanded="false">
                  More
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="/about-us">
                      About US
                    </Link>

                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="/our-team">
                      Our Team
                    </Link>

                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="/services">
                      Services
                    </Link>

                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="/boards">
                      Boards
                    </Link>

                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="/schools">
                      Schools
                    </Link>

                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="/nri-quota">
                      NRI Quota
                    </Link>

                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="/scholarships">
                      Scholarships
                    </Link>

                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="/mbbs-abroad">
                      MBBS Abroad
                    </Link>

                  </li>
                  <li>
                    <Link className="d-flex justify-content-between dropdown-item" href="/meds">
                      Medical Edu Studio
                    </Link>

                  </li>


                </ul>
              </li>
            </ul>
            <div className='d-lg-flex d-none justify-content-xl-end ms-auto'>
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
                    <SignupForm />
                  </div>
                  <div className="tab-pane fade" id="pills-SignIn" role="tabpanel" aria-labelledby="pills-SignIn-tab">
                    <SignInForm />
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

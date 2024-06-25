import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from "react";
import axios1 from 'src/configs/axios'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Statedropdown from 'src/@core/layouts/components/Header/state-dropdown';
import Coursedropdown from 'src/@core/layouts/components/Header/course-dropdown';
import Examdropdown from 'src/@core/layouts/components/Header/exam-dropdown';
import Abroaddropdown from 'src/@core/layouts/components/Header/abroad-dropdown';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import dynamic from 'next/dynamic'; // Dynamic import for Next.js
import Avatar from '@mui/material/Avatar';
const EditorEnquiryForm = dynamic(() => import('src/@core/components/popup/Editor/EditorPopupEnquiry'), { ssr: false });
const SignupForm = dynamic(() => import('src/@core/components/custom-user-auth/SignUpFrom'), { ssr: false });
const SignInForm = dynamic(() => import('src/@core/components/custom-user-auth/SignInForm'), { ssr: false });

const ConditionalModal = dynamic(() => import('./ConditionalModal'), { ssr: false });
interface Country {
  id: number;
  name: string;
}

interface Courses {
  id: number;
  slug: string;
}
import { createRoot } from 'react-dom/client';
import AvatarDropdown from "src/@core/components/avatar";



const Header = () => {

  const router = useRouter();
  const [states, setStates] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const isMountedRef = useIsMountedRef();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


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
      roleparams['size'] = 10000;
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
      const roleparams = { page: 1, size: 10000, orderby: "asc", columnname: "listing_order" };
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
      roleparams['size'] = 10000;
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


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const replaceStrongWithComponent = () => {
        const strongElements = document.getElementsByTagName('strong');

        for (let i = 0; i < strongElements.length; i++) {
          if (strongElements[i].innerText === 'Apply_Now') {
            const container = document.createElement('div');
            //@ts-ignore
            strongElements[i].parentNode.replaceChild(container, strongElements[i]);
            const root = createRoot(container);
            root.render(<EditorEnquiryForm  className="applyNowButton btn btn-sm "/>);
          }
        }
      };

      replaceStrongWithComponent();

      const observer = new MutationObserver(replaceStrongWithComponent);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, []);





  return (

    <>
      <header className="bg-header py-2">
        <div className="container-lg">
          <div className="row">
            <div className="col-md-3 d-flex align-items-center socialIcon">
              <a href="https://www.facebook.com/learntechedu" target="_blank"><Image className="mx-2" width={26} height={22} src='/images/icons/Facebook.svg' alt="facebook-img" /></a>
              <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><Image className="me-2" width={26} height={22} alt='linked-in-img' src='/images/icons/linked-in.svg' /></a>
              <a href="https://twitter.com/learntechww" target='_blank'><Image className="me-2" src='/images/icons/twitter.svg' width={26} height={22} alt="twitter-img" /></a>
              <a href="https://www.instagram.com/learntechedus" target='_blank'><Image className="me-2" src='/images/icons/instagram.svg' width={26} height={22} alt='instagram-img' /></a>
              <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target='_blank'><Image className="me-2" src='/images/icons/youtube.svg' width={26} height={22} alt="youtube-img" /></a>
            </div>
            <div className="col-md-9 d-flex align-items-center justify-content-end socialText">
              <div>
                <span className='telHover'><Image className="m-0" src="/images/icons/Phone-blue.svg" width={26} height={22} alt="phone-icon" />
                  <a href="tel:18001208969" target="_blank" className="mx-2 " style={{ color: '#274896' }}>1800 120 8969</a></span>
                <span className="mailHover"><Image className="ms-2" src="/images/icons/email-icon.svg" width={26} height={22} alt="email-icon" />

                  <a href="mailto:info@learntechww.com" className="mx-2" style={{ color: '#274896' }}>info@learntechww.com</a></span>

                <button onClick={openModal} className="ms-2 btn reviewBtn">
                  Write a Review
                </button>

              </div>
            </div>
          </div>
        </div>
      </header >

      <nav className="navbar navbar-expand-lg bg-white" style={{zIndex:'100'}}>
        <div className="container-xl">
          <Link className="navbar-brand" href="/"><Image src="/images/icons/learntech-logo.png" width={160} height={50} alt="learntech-logo" /></Link>
          <button className="navbar-toggler" type="button" onClick={toggle} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isOpen ? 'show' : ''}collapse navbar-collapse collapseNavHeight`} id="navbarSupportedContent">
            <span className="top-nav ms-auto">
              <ul className="navbar-nav">
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
                    className={`nav-link dropdown-toggle ${isLinkActive('/study-in-usa') ? 'activeDrpDwn' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    href="/study-in-usa"
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
                    className={`nav-link dropdown-toggle ${isLinkActive('/news') ? 'activeDrpDwn' : ''}`}
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
                              <Link
                                href={`/news-1/${item.id}/${item.slug}`}

                              >
                                <div className="card-news card">
                                  <div className="cardImgNewsheight">
                                    <Image height={200} width={200} src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`} priority={true} className="card-img-top" alt="News Banner" />
                                  </div>
                                  <div className="card-body">
                                    <h5 className="card-title text-truncate">{item.meta_title}</h5>
                                    <p className="card-text" >{item.meta_description}</p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </div>

                      </div>
                      <div className="text-end mt-1 me-2">
                        <Link href="/news" className="btn ">Read All News</Link>
                      </div>
                    </ul>
                  </div>
                </li>

                <li className="nav-item dropdown d-lg-inline-block d-none">
                  <Link className={`nav-link dropdown-toggle ${isLinkActive('/more') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/" id="navbarDropdownMenuLink" role="button"
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
                      <Link className="d-flex justify-content-between dropdown-item" href="/blogs">
                        Blogs
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
                <li className="hideBtnTxt">
                  <AvatarDropdown/>
                </li>
                <li className="hideBtnTxt">
                  <GlobalEnquiryForm buttonText="Get Counselling" className="btn counsellingBtn" />
                </li>
                <li className="nav-item dropdown d-lg-none d-md-inline-block">
                  <Link className={`nav-link ${isLinkActive('/about-us') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/about-us">
                    About Us
                  </Link>
                </li>
                <li className="nav-item dropdown d-lg-none d-md-inline-block">
                  <Link className={`nav-link ${isLinkActive('/our-team') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/our-team">
                    Our Team
                  </Link>
                </li>
                <li className="nav-item dropdown d-lg-none d-md-inline-block">
                  <Link className={`nav-link ${isLinkActive('/services') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item dropdown d-lg-none d-md-inline-block">
                  <Link className={`nav-link ${isLinkActive('/boards') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/boards">
                    Boards
                  </Link>
                </li>
                <li className="nav-item dropdown d-lg-none d-md-inline-block">
                  <Link className={`nav-link ${isLinkActive('/schools') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/schools">
                    Schools
                  </Link>
                </li>
                <li className="nav-item dropdown d-lg-none d-md-inline-block">
                  <Link className={`nav-link ${isLinkActive('/nri-quota') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/nri-quota">
                    NRI Quota
                  </Link>
                </li>
                <li className="nav-item dropdown d-lg-none d-md-inline-block">
                  <Link className={`nav-link ${isLinkActive('/scholarships') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/scholarships">
                    Scholarships
                  </Link>
                </li>
                <li className="nav-item dropdown d-lg-none d-md-inline-block">
                  <Link className={`nav-link ${isLinkActive('/mbbs-abroad') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/mbbs-abroad">
                    MBBS Abroad
                  </Link>
                </li>
                <li className="nav-item dropdown d-lg-none d-md-inline-block">
                  <Link className={`nav-link ${isLinkActive('/meds') ? 'active' : ''}`} onClick={() => setIsOpen(false)} href="/meds">
                    Medical Edu Studio
                  </Link>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </nav>

      {showModal && <ConditionalModal showModal={showModal} closeModal={closeModal} />}
    </>
  );
}


export default Header;

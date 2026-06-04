'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Modal from 'react-bootstrap/Modal'
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from 'src/hooks/useCompatRouter'
import dynamic from 'next/dynamic';
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { toast } from 'react-hot-toast'
import axios from 'src/configs/axios'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
const PhoneInputField = dynamic(() => import('src/@core/components/popup/PhoneInput'));

// Lazy loading component for background images
const LazyBgImage = ({ src, alt: _alt }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const img = document.createElement('img');
      img.onload = () => setImageSrc(src);
      img.src = src;
    }
  }, [isVisible, src]);

  return (
    <div
      ref={ref}
      className="bg-layer"
      style={{
        backgroundImage: imageSrc ? `url(${imageSrc})` : 'none',
        backgroundColor: '#f0f0f0'
      }}
    ></div>
  );
};
const whatsappc = '/images/bams/whatsappc.gif'
const logos = [
  { src: '/images/cumba/ACCA.webp', alt: 'ACCA' },
  { src: '/images/cumba/BCI_1.webp', alt: 'BCI' },
  { src: '/images/cumba/COA.webp', alt: 'COA' },
  { src: '/images/cumba/HBPE.webp', alt: 'HBPE' },
  { src: '/images/cumba/NAAC A+.webp', alt: 'NAAC' },
  { src: '/images/cumba/PCI.webp', alt: 'PCI' },
  { src: '/images/cumba/UGC_1.webp', alt: 'UGC' },
  { src: '/images/cumba/WES.webp', alt: 'WES' },
  { src: '/images/cumba/WUR.webp', alt: 'WUR' },
  { src: '/images/cumba/NIRF.webp', alt: 'NIRF' }
]

const data = [
  {
    title: 'Strategic Decision-Making Mastery',
    desc: `Online MBA Chandigarh University equips graduates with advanced analytical skills for
           complex business decisions through data-driven case studies and simulations.​
           Students learn to evaluate risks, and formulate strategies that drive organizational
           success. Real-world projects enhance problem-solving abilities, enabling confident
           leadership in high-stakes environments.​ Enrolling in a CU online MBA admission
           prepares professionals to navigate uncertainties and seize growth opportunities
           effectively.​`,
    img: '/images/cumba/planning.webp'
  },
  {
    title: 'Leadership and Managerial Proficiency',
    desc: `Being one of the best online MBA in India the program develops essential leadership
           qualities, including team motivation, ethical decision-making, and conflict
           resolution.​ Interactive sessions and Harvard faculty modules build emotional
           intelligence and visionary thinking for senior roles.​ CU online MBA graduates
           emerge as influential managers capable of inspiring diverse teams toward shared
           goals.​`,
    img: '/images/cumba/closeup.webp'
  },
  {
    title: 'Global Business Acumen',
    desc: `Learners gain a comprehensive understanding of international markets, cross-cultural
           dynamics, and globalization impacts.​ Chandigarh University online programs provide
           exposure to global case studies and Harvard collaborations broadens perspectives for
           multinational operations.​ Graduates are equipped to handle international trade,
           supply chains, and diverse regulatory environments confidently.`,
    img: '/images/cumba/chess.webp'
  },
  {
    title: 'Career Advancement and Employability',
    desc: `The curriculum aligns with industry demands, boosting employability through
          specialized skills and placement support.​ Graduates from CU online MBA secure roles
          in top firms like Deloitte, Amazon, and Infosys with higher salary potential and
          promotions.​ Networking opportunities and certifications from Harvard enhance
          professional profiles significantly.​ Strong ROI comes from rapid career growth,
          leadership positions, and entrepreneurial readiness.​ Chandigarh University distance
          MBA alumni achieve sustained success in management, finance, marketing, and
          operations sectors.`,
    img: '/images/cumba/businnespeople.webp'
  }
]
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1
  }
}




const BamsPage = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 200,
      easing: 'ease-in-sine',
      delay: 100,
      duration: 1000
    })
  }, [])

  const router = useRouter()

  const initialValues = {
    name: '',
    email: '',
    contact: '',
    // neetrank: '',
    location: '',
    description: ''
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      toast.loading('Processing')

      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('contact_number', values.contact)
      formData.append('location', values.location)
      formData.append('current_url', window.location.href)
      formData.append('description', values.description)
      formData.append('Source', 'Google Ads')
      formData.append('SourceCampaign', 'CU Online MBA 2026-27')

      const response = await axios.post('api/website/landingpage/enquiry', formData)
      console.log(response)
      if (response.status === 200) {
        console.log(response)
        toast.dismiss()
        toast.success('Thank you. We will get back to you.')
        resetForm()
        router.push('/thank-you')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('Try again later!')
      console.error('Error submitting form:', error)
    }
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [, setExpanded] = useState(false)

  const navigate = (id, offset = 0) => {
    const elementToView = document.getElementById(id)
    if (elementToView) {
      const offsetTop = elementToView.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: offsetTop - offset,
        behavior: 'smooth'
      })
      setExpanded(false)
    } else {
      console.error('Element not found:', id)
    }
  }
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const closeNavbar = () => {
    const navbar = document.getElementById('navbarNav')
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
  }

  return (
    <section className='bams-main '>
      <Head>
        <title>CU Online MBA Admission 2026–27 | Chandigarh University</title>
        <meta
          name='description'
          content='Apply for Chandigarh University (CU) Online MBA 2026–27. Check eligibility, fees, specializations, rankings, placements & admission process. Enquire Now!
'
        />
        <meta name="robots" content="index, follow" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel='stylesheet' href='/css/cumbalandingpage.css' />
        <link rel='canonical' href='https://learntechww.com/cu-online-mba-admission ' />

        <link
          rel="preload"
          as="image"
          href="/images/cumba/herobanner3.webp"
          media="(min-width: 769px)"
        />
        <link
          rel="preload"
          as="image"
          href="/images/cumba/mobilebanner.webp"
          media="(max-width: 768px)"
        />


        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Which colleges offer the best online MBA in India?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Top universities such as Chandigarh University offer an online MBA programme that provides world-class business education and helps students stay ahead of the competition.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What is the required academic qualification to pursue MBA online at Chandigarh University?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'To be eligible, you must have a bachelor’s degree with at least 50% marks. Graduates of recognized professional programmes like CA or ICWA are also eligible to apply.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Is an entrance exam compulsory for Chandigarh University Online courses MBA?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No entrance exam is required for CU Online MBA.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What is Chandigarh University online MBA ranking and NAAC accreditation?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Chandigarh University is NAAC A+ accredited, UGC-approved, and ranked by NIRF and QS, ensuring top-tier academic credibility.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Is work experience mandatory for pursuing online MBA Chandigarh University?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Chandigarh University online MBA can be pursued by both freshers and experienced professionals.'
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div className='text-md-start'>
        <a href='tel:09035654090' className='phone-iconphone'>
          <Image
            src='/images/icons/Phone-blue.svg'
            width={40}
            height={28}
            alt='phone-iconphone'
            className='red-filter'
          />
        </a>
      </div>

      <a
        href='https://wa.me/+919035654090'
        style={{
          position: 'fixed',
          width: 63,
          height: 64,
          bottom: 8,
          right: 8,
          borderRadius: 50,
          textAlign: 'center',
          fontSize: 40,
          zIndex: 1059,
          backgroundColor: "#3adc3a"





        }}
        target='_blank '
      >
        <img src={whatsappc} alt='whtsplogo' style={{ width: '56px' }}></img>
      </a>

      <nav
        className='navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 sticky-top   '
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '50px',
          backgroundColor: '#fff',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div className='container-fluid navbar-bams-top navbarmobilebams mx-md-5 px-md-5'>
          <Link className='navbar-brand d-flex align-items-center px-md-5 no-click' href='#'>
            <Image src='/images/cumba/logo.svg' alt='Logo' width={195} height={50} priority />
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse justify-content-end bamsnavbar' id='navbarNav'>
            <ul className='navbar-nav gap-3'>
              <li className='nav-item   bams-navbar-tag'>
                <a
                  className='nav-link'

                  onClick={() => {
                    navigate('home', 80)
                    closeNavbar()
                  }}
                >
                  Home
                </a>
              </li>
              <li className='nav-item   bams-navbar-tag'>
                <a
                  className='nav-link'
                  onClick={() => {
                    navigate('About', 80)
                    closeNavbar()
                  }}
                >
                  About
                </a>
              </li>

              <li className='nav-item   bams-navbar-tag'>
                <a
                  className='nav-link'
                  onClick={() => {
                    navigate('Eligibility', 100)
                    closeNavbar()
                  }}
                >
                  Eligibility
                </a>
              </li>
              <li className='nav-item   bams-navbar-tag'>
                <a
                  className='nav-link'
                  onClick={() => {
                    navigate('Curriculum', 110)
                    closeNavbar()
                  }}
                >
                  Curriculum
                </a>
              </li>
              <li className='nav-item   bams-navbar-tag'>
                <a
                  className='nav-link'
                  onClick={() => {
                    navigate('whyus', 100)
                    closeNavbar()
                  }}
                >
                  {' '}
                  Why CU
                </a>
              </li>

              <li className='nav-item   bams-navbar-tag'>
                <a
                  className='nav-link'
                  onClick={() => {
                    navigate('FAQs', 100)
                    closeNavbar()
                  }}
                >
                  FAQs{' '}
                </a>
              </li>
              <li className='nav-item   bams-navbar-tag'>
                <a
                  className='nav-link'
                  onClick={() => {
                    document.getElementById('contactus')?.scrollIntoView({ behavior: 'smooth' })
                    closeNavbar()
                  }}
                >
                  Contact{' '}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* --homebannner--- */}

      <section className='hero' id='home'>
        <div className='container'>
          <div className='row align-items-center g-4'>
            <div className='col-lg-7'>
              <div className='hero-card'>
                <h1 className='mb-2' >
                  Empower Your Future with an Online MBA from <span>Chandigarh University</span>
                </h1>
                <p className='lead mb-5 pt-md-0 pt-3' >
                  {' '}
                  Discover industry-relevant skills, global exposure, and <br />
                  flexible learning with CU Online MBA.
                </p>

                <div
                  className='d-flex flex-wrap align-items-center gap-3 mb-3 blur-wrapper'

                >
                  <div className='d-none d-md-flex kpis gap-4 mb-3'>
                    <div className='kpi'>
                      <i className='bi bi-mortarboard-fill text-danger'></i>
                      <div className='ms-2'>
                        <div className=' text-dark'> Duration</div>
                        <strong>2 Years</strong>
                      </div>
                    </div>
                    <div className='kpi'>
                      <i className='bi bi-briefcase-fill text-danger' style={{ fontSize: '20px' }}></i>
                      <div className='ms-2'>
                        <div className=' text-dark'> Degree Level</div>
                        <strong> Postgraduate </strong>
                      </div>
                    </div>
                  </div>
                  <div className='hero-badge mt-3 mb-3'>Admissions open- Online MBA Jan 2026 batch</div>
                  <br />
                  <button className='btn request-btn p-2' onClick={handleShow}>
                    {' '}
                    Apply Now
                  </button>
                  <div className='d-flex gap-2 '>
                    <button className='btn-brochure ' onClick={handleShow}>
                      <i className='bi bi-file-earmark-arrow-down-fill me-2' style={{ fontSize: '16px' }}></i>Download
                      Brochure
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-5 col-md-5 mt-4 mt-lg-0'>
              <div className=' p-4   searchForm  shadow-sm' >
                <h3 className='fw-bold text-center text-white  mb-4 fs24'>Enter Your Details to Get Started</h3>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  {() => (
                    <Form>
                      <div className='form-group mb-3'>
                        <Field
                          type='text'
                          id='name'
                          name='name'
                          placeholder='Enter Name'
                          required
                          className='form-control'
                        />
                      </div>

                      <div className='form-group mb-3'>
                        <Field
                          type='email'
                          id='email'
                          name='email'
                          placeholder='Enter Email'
                          required
                          className='form-control'
                        />
                      </div>

                      <div className="mb-3 form-group  ">
                        <PhoneInputField name="contact" />
                        <ErrorMessage name="contact" component="div" className=" form-control bams-form-field py-3" />
                      </div>
                      <div className='form-group mb-3 select-wrapper'>
                        <Field
                          as='select'
                          id='location'
                          name='location'
                          required
                          className='browser-default custom-select form-control white-bg-black-text bams-form-field '
                        >
                          <option value=''>Select State</option>
                          <option value='Andhra Pradesh'>Andhra Pradesh</option>
                          <option value='Andaman & Nicobar'>Andaman & Nicobar</option>

                          <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                          <option value='Assam'>Assam</option>
                          <option value='Bihar'>Bihar</option>
                          <option value='Chhattisgarh'>Chhattisgarh</option>
                          <option value='Chandigarh'>Chandigarh</option>
                          <option value='Dadra and Nagar Haveli'>Dadra and Nagar Haveli</option>
                          <option value='Daman & Diu'>Daman & Diu</option>
                          <option value='Delhi'>Delhi</option>
                          <option value='Goa'>Goa</option>
                          <option value='Gujarat'>Gujarat</option>
                          <option value='Haryana'>Haryana</option>
                          <option value='Himachal Pradesh'>Himachal Pradesh</option>
                          <option value='Jammu & Kashmir'>Jammu & Kashmir</option>
                          <option value='Jharkhand'>Jharkhand</option>
                          <option value='Karnataka'>Karnataka</option>
                          <option value='Kerala'>Kerala</option>
                          <option value='Lakshadweep'>Lakshadweep</option>

                          <option value='Madhya Pradesh'>Madhya Pradesh</option>
                          <option value='Maharashtra'>Maharashtra</option>
                          <option value='Manipur'>Manipur</option>
                          <option value='Meghalaya'>Meghalaya</option>
                          <option value='Mizoram'>Mizoram</option>
                          <option value='Nagaland'>Nagaland</option>
                          <option value='Odisha'>Odisha</option>
                          <option value='Punjab'>Punjab</option>
                          <option value='Puducherry'>Puducherry</option>

                          <option value='Rajasthan'>Rajasthan</option>
                          <option value='Sikkim'>Sikkim</option>
                          <option value='Tamil Nadu'>Tamil Nadu</option>
                          <option value='Tripura'>Tripura</option>
                          <option value='Telangana'>Telangana</option>
                          <option value='Uttarakhand'>Uttarakhand</option>
                          <option value='Uttar Pradesh'>Uttar Pradesh</option>
                          <option value='West Bengal'>West Bengal</option>
                        </Field>
                      </div>
                      <div className='form-group mb-3'>
                        <Field
                          as='textarea'
                          id='description'
                          name='description'
                          placeholder='Message (Optional)'
                          className='form-control'
                          rows={2}
                        />
                      </div>
                      <div className='mb-3 form-check text-white'>
                        <Field type='checkbox' name='terms' className='form-check-input border-black' id='terms' />
                        <label className='form-check-label' htmlFor='terms' style={{ fontSize: '16px' }}>
                          By Clicking this, I agree to the{' '}
                          <Link href='/terms-and-conditions' className='textcolortenm'>
                            Terms & Conditions
                          </Link>
                        </label>
                        <ErrorMessage name='terms' component='div' className='error text-danger' />
                      </div>
                      <div className='form-group text-center '>
                        <button type='submit' id='about' name='submit' className='sub-btn btn'>
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container text-center' data-aos='fade-up' id='About'>
          <h5>
            <b style={{ color: 'rgb(13, 27, 42)' }}>About</b>
          </h5>
          <h2 className='section-title  fs-1 text-center mt-0 mb-4'>
            <span className='' style={{ color: '#e1473f' }}>
              Chandigarh University
            </span>
          </h2>

          <p className='textmbbs'>
            Chandigarh University (CU) is a leading Indian Institution that offers its students a unique experience of
            professional and academic excellence. The University has been accredited with the prestigious A+ grade by
            the National Assessment and Accreditation Council (NAAC).
            <br />
            <br />
            Chandigarh University is also the youngest and the only private university in India to earn an A+ grade in
            the first cycle of their accreditation and has also become the only state private university of Punjab to be
            accredited by NAAC. The university also offers online courses and is considered one of the top online MBA
            universities in India
          </p>
        </div>
      </section>

      <section data-aos='fade-up'>
        <h2 className='section-title mb-5 fs-3 text-center mt-5 mb-5 text-black'>
          Rankings{' '}
          <span className='fst-italic' style={{ color: '#e1473f' }}>
            &
          </span>{' '}
          Accreditations
        </h2>

        <section className='accredi-section'>
          <div className='accredi-container'>
            <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={2500} arrows swipeable draggable>
              {logos.map((item, idx) => (
                <div className='accredi-item' key={idx}>
                  <Image src={item.src} alt='logo' width={130} height={130} loading="lazy"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      </section>

      <div className='container  text-center mt-5 mb-5' data-aos='fade-up'>
        <h2 className='section-title  fs-1 mt-5 mb-4 text-black'>
          <span className='' style={{ color: '#e1473f' }}>
            Chandigarh University
          </span>{' '}
          Online MBA
        </h2>
        <p className='textmbbs'>
          The Online MBA Degree at Chandigarh University is a two-year programme with dual specialization, designed to
          develop dynamic future executives and managers. This programme is open to graduates in any field, offering
          in-depth knowledge of management and practical skills through a intense, industry-relevant curriculum.
          Learners can specialize in two areas, enhancing their expertise and opening career opportunities. The course
          includes case studies and projects, providing hands-on experience in real-world managerial scenarios.
        </p>
      </div>

      <section className='specializations-wrap' data-aos='fade-up'>
        <div className='container py-3'>
          <h2 className='spec-title text-black'>Specializations</h2>

          <div className='tag-cloud py-3'>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Digital Marketing
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Retail Management
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Operations Management
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Finance
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> IT (Information Technology)
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Marketing
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Logistics & Supply Chain
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> HRM
            </div>



            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Business Analytics
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Travel & Tourism
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Hospital Management
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Fintech
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Media Management
            </div>

            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Entrepreneurship
            </div>

            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Banking & Insurance
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Brand Management
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Events Management
            </div>

            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Aviation Management
            </div>

            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Disaster Management
            </div>
            {/* ------------ */}

            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> Data Science & Artificial Intelligence
            </div>
            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> International Relations
            </div>

            <div className='tag'>
              <i className='bi bi-check-circle-fill'></i> General Management
            </div>

          </div>
        </div>
      </section>

      <section className='eligibility container mt-5' data-aos='fade-up'>
        <div className='container text-center text-white py-1'>
          <div className='row'>
            <div className='col-lg-1 d-flex align-items-center gap-0 flex-wrap justify-content-center'>
              <div className='icon-wrap'>
                <svg width='40' height='40' viewBox='0 0 48 58' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M19.0508 37.3148H10.4151C9.66514 37.3148 9.05664 37.9233 9.05664 38.6732C9.05664 39.4232 9.66514 40.0317 10.4151 40.0317H19.0508C19.8008 40.0317 20.4093 39.4232 20.4093 38.6732C20.4093 37.9233 19.8008 37.3148 19.0508 37.3148Z'
                    fill='white'
                  ></path>
                  <path
                    d='M37.5849 23.6556H10.4151C9.66514 23.6556 9.05664 24.2641 9.05664 25.0141C9.05664 25.7676 9.66514 26.3726 10.4151 26.3726H37.5849C38.3349 26.3726 38.9434 25.7676 38.9434 25.0141C38.9434 24.2641 38.3349 23.6556 37.5849 23.6556Z'
                    fill='white'
                  ></path>
                  <path
                    d='M37.5849 9.99988H10.4151C9.66514 9.99988 9.05664 10.6084 9.05664 11.3584C9.05664 12.1084 9.66514 12.7169 10.4151 12.7169H37.5849C38.3349 12.7169 38.9434 12.1084 38.9434 11.3584C38.9434 10.6084 38.3349 9.99988 37.5849 9.99988Z'
                    fill='white'
                  ></path>
                  <path
                    d='M39.3962 0.94342H8.60377C3.85259 0.950495 0.00706415 4.79601 0 9.54719V49.3962C0.00707502 54.1474 3.85259 57.993 8.60377 58H39.3962C44.1474 57.9929 47.9929 54.1474 48 49.3962V9.54719C47.9929 4.79601 44.1474 0.950485 39.3962 0.94342ZM45.283 49.3962C45.2795 52.6474 42.6474 55.2795 39.3962 55.283H8.60377C5.35263 55.2795 2.72051 52.6474 2.71698 49.3962V9.54719C2.72052 6.29605 5.35263 3.66393 8.60377 3.6604H39.3962C42.6474 3.66394 45.2795 6.29605 45.283 9.54719V49.3962Z'
                    fill='white'
                  ></path>
                  <path
                    d='M31.6037 32.7123C28.8018 32.7123 26.2794 34.3998 25.2075 36.9859C24.1355 39.572 24.7264 42.5472 26.7074 44.5283C28.685 46.5059 31.6603 47.1002 34.2463 46.0283C36.836 44.9564 38.52 42.4339 38.52 39.6356C38.5164 35.8148 35.4209 32.7193 31.6037 32.7123Z'
                    fill='white'
                  ></path>
                  <path
                    d='M26.9553 47.0225V51.8763C26.9588 52.4034 27.2595 52.8811 27.7336 53.111C28.2006 53.3303 28.756 53.2667 29.1628 52.9483L31.6074 50.9919L34.0343 52.9483C34.2819 53.1287 34.5791 53.2313 34.8869 53.2348C35.092 53.2384 35.2972 53.1959 35.4847 53.111C35.9517 52.8775 36.2489 52.3999 36.2453 51.8763V47.0225C33.4046 48.8091 29.7927 48.8091 26.9553 47.0225Z'
                    fill='white'
                  ></path>
                </svg>
              </div>
            </div>

            <div className='col-lg-6' id='Eligibility'>
              <h4 className='fs-1 mb-4 text-start mx-4'>Eligibility</h4>

              {/* <!-- Eligibility Item --> */}
              <div className='eligibility-item d-flex align-items-center gap-0 flex-wrap justify-content-center'>
                <p className='mb-0 text-start mx-4 ele-p'>
                  Candidates with a Bachelor’s degree are eligible to apply. Graduates of recognized professional
                  programmes like CA/ ICWA etc. are also eligible to apply.
                </p>
              </div>
            </div>

            <div className='col-lg-5 d-flex align-items-center gap-0 flex-wrap justify-content-center'>
              <button className='Eligibility-btn px-3 py-2 btn' onClick={handleShow}>
                Check Eligibility <i className='bi bi-arrow-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='pt-5 bg-white' data-aos='fade-up'>
        <div className='container' id='Curriculum'>
          {/* <h2 className='section-title mb-5 text-center fs-2 text-black'>
            <span style={{ color: '#e1473f' }}>Chandigarh University</span>
            <br />
            Online MBA Semester-wise Curriculum
          </h2> */}
          <h2 className='section-title  fs-1  mb-4 text-black text-center'>
            <span className='' style={{ color: '#e1473f' }}>
              Chandigarh University
            </span>{' '}   <br />
            Online MBA Semester-wise Curriculum
          </h2>
          <div className='accordion' id='curriculumAcc'>
            {/* <!-- Semester I (Open by default) --> */}
            <div className='accordion-item mb-3'>
              <h2 className='accordion-header' id='headingOne'>
                <button
                  className='accordion-button'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseOne'
                  aria-expanded='true'
                  aria-controls='collapseOne'
                >
                  Semester I
                </button>
              </h2>
              <div
                id='collapseOne'
                className='accordion-collapse collapse show'
                aria-labelledby='headingOne'
                data-bs-parent='#curriculumAcc'
              >
                <div className='accordion-body'>
                  <ul>
                    <li>Business, Society, and Law</li>
                    <li>Financial Reporting and Analysis</li>
                    <li>Management Practices and Organizational Behavior</li>
                    <li>Decision Science</li>
                    <li>Managerial Economics</li>
                    <li>Marketing Management</li>
                    <li>Communication Skills</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- Semester II --> */}
            <div className='accordion-item mb-3'>
              <h2 className='accordion-header' id='headingTwo'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseTwo'
                  aria-expanded='false'
                  aria-controls='collapseTwo'
                >
                  Semester II
                </button>
              </h2>
              <div
                id='collapseTwo'
                className='accordion-collapse collapse'
                aria-labelledby='headingTwo'
                data-bs-parent='#curriculumAcc'
              >
                <div className='accordion-body'>
                  <ul>
                    <li>Human Resource Management</li>
                    <li>Supply Chain & Logistics Management</li>
                    <li>Consumer Psychology</li>
                    <li>Financial Management</li>
                    <li>Production & Operations Management</li>
                    <li>Professional Communication Skills - 1</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- Semester III --> */}
            <div className='accordion-item mb-3'>
              <h2 className='accordion-header' id='headingThree'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseThree'
                  aria-expanded='false'
                  aria-controls='collapseThree'
                >
                  Semester III
                </button>
              </h2>
              <div
                id='collapseThree'
                className='accordion-collapse collapse'
                aria-labelledby='headingThree'
                data-bs-parent='#curriculumAcc'
              >
                <div className='accordion-body'>
                  <ul>
                    <li>Strategy, Business, and Globalization</li>
                    <li>Data Analysis for Business Decisions</li>
                    <li>Management Lessons from Ancient India</li>
                    <li>Elective as per Specialization</li>
                    <li>Elective as per Specialization</li>
                    <li>Elective as per Specialization</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- Semester III --> */}
            <div className='accordion-item mb-3'>
              <h2 className='accordion-header' id='headingFour'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseFour'
                  aria-expanded='false'
                  aria-controls='collapseFour'
                >
                  Semester IV
                </button>
              </h2>
              <div
                id='collapseFour'
                className='accordion-collapse collapse'
                aria-labelledby='headingFour'
                data-bs-parent='#curriculumAcc'
              >
                <div className='accordion-body'>
                  <ul>
                    <li>Project Management</li>
                    <li>Values and Ethics</li>
                    <li>
                      Academic Research Writing/Industry Immersion/International Project/Social Outreach
                      Initiatives/Case Writing/Rural Immersion
                    </li>
                    <li>Dissertation and viva</li>
                    <li>Elective as per Specialization</li>
                    <li>Elective as per Specialization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='accordion-item mb-3 d-none'>
              <h2 className='accordion-header' id='headingFour'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseFour'
                  aria-expanded='false'
                  aria-controls='collapseFour'
                >
                  Semester IV
                </button>
              </h2>
              <div
                id='collapseFour'
                className='accordion-collapse collapse'
                aria-labelledby='headingFour'
                data-bs-parent='#curriculumAcc'
              >
                <div className='accordion-body'>
                  <ul>
                    <li>Project Management</li>
                    <li>Values and Ethics</li>
                    <li>
                      Academic Research Writing/Industry Immersion/International Project/Social Outreach
                      Initiatives/Case Writing/Rural Immersion
                    </li>
                    <li>Dissertation and viva</li>
                    <li>Elective as per Specialization</li>
                    <li>Elective as per Specialization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='outcomes-section mt-5'>
        <div className='container'>
          <h2 className='section-title fs-1 mb-5 text-center  text-black'>
            Program Outcomes of <br />
            <span style={{ color: '#e1473f' }}>Chandigarh University </span>
            <br className='d-md-none d-block' />
            Online MBA
          </h2>
        </div>

        <div className="mba-feature-carousel outcomes-container">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {data.map((item, i) => (
                <div className="embla__slide" key={i}>
                  <div className="outcome-card">
                    <LazyBgImage src={item.img} alt={item.title} />
                    <div className="news-overlay"></div>

                    <div className="outcome-content">
                      <h3 className="outcome-title">{item.title}</h3>
                      <p>{item.desc}</p>
                      <div className="hover-line"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOM ARROWS */}
          <button className="custom-arrow custom-left-arrow" onClick={scrollPrev}>
            ❮
          </button>

          <button className="custom-arrow custom-right-arrow" onClick={scrollNext}>
            ❯
          </button>
        </div>
      </section>
      <section className='advantage-section pt-5' data-aos='fade-up'>
        <div className='container text-center' id='whyus' style={{ maxWidth: "100%" }}>
          {/* style="max-width: 100% !important;" */}
          <h2 className='section-title  fs-1 mt-5 pb-3 text-black'>
            Why Choose <span style={{ color: '#e1473f' }}>Chandigarh University </span>Online MBA
          </h2>

          <div className='row g-3 justify-content-center mt-md-5 mt-2 gap-4'>
            {/* <!-- Card 1 --> */}
            <div className='col-5 col-md-4 col-lg-2 advcardinsideodd'>
              <div className='adv-card' data-aos='fade-up' data-aos-duration='500'>
                <div className='adv-icon'>
                  <svg width='76' height='75' viewBox='0 0 76 75' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='0.5' width='75' height='75' rx='37.5' fill='#ffeccc'></rect>
                    <path
                      d='M25.8541 34.9317C33.1411 38.4849 41.6567 38.4849 48.9437 34.9317C49.1307 34.8425 49.2503 34.6512 49.2503 34.4446V25.9289L53.6625 24.4872C54.2192 24.3024 54.6041 23.7936 54.6302 23.2086C54.6585 22.6236 54.3214 22.0822 53.7865 21.8452L38.658 15.2607C37.8534 14.9127 36.9423 14.9127 36.1377 15.2628L21.0092 21.8473C20.4743 22.0844 20.1394 22.6258 20.1677 23.2108C20.196 23.7957 20.5808 24.3045 21.1375 24.4872L25.5475 25.929V34.4446C25.5475 34.6512 25.6671 34.8425 25.8541 34.9317ZM21.2527 23.1567C21.244 23.0218 21.3201 22.8957 21.4463 22.8435L36.5681 16.2613C37.0965 16.0308 37.6966 16.0308 38.2251 16.2591L53.3492 22.8413V22.8435C53.4731 22.8979 53.5492 23.024 53.5449 23.1588C53.5383 23.2937 53.4492 23.4111 53.3209 23.4546L46.7971 25.5856C46.5144 25.6813 46.36 25.9857 46.4513 26.2706C46.5448 26.5555 46.8514 26.7121 47.1363 26.6185L48.1628 26.2837V34.1012C41.3456 37.313 33.4518 37.313 26.6346 34.1012V26.2837L36.4267 29.4824C36.7398 29.5825 37.0682 29.6325 37.3966 29.6303C37.7293 29.6303 38.0598 29.5803 38.3773 29.4803L42.9438 27.9907V30.9655C42.9438 31.2656 43.1874 31.5091 43.4875 31.5091C43.7875 31.5091 44.0311 31.2656 44.0311 30.9655V25.7466C44.0289 24.0048 42.6176 22.5956 40.878 22.5934H37.3987C37.0986 22.5934 36.855 22.837 36.855 23.1371C36.855 23.4372 37.0986 23.6807 37.3987 23.6807H40.878C42.0174 23.6807 42.9416 24.6049 42.9438 25.7465V26.8469L38.0423 28.4452V28.4473C37.6248 28.5778 37.1768 28.5778 36.7593 28.4473L21.4789 23.4568C21.3462 23.4155 21.2549 23.2958 21.2527 23.1567Z'
                      fill='#e1473f'
                    ></path>
                    <path
                      d='M59.2792 38.2679C59.2705 38.2657 59.264 38.2657 59.2553 38.2657C59.2183 38.2635 59.1813 38.2505 59.1444 38.2505C59.1226 38.2505 59.1052 38.257 59.0835 38.2592C59.0748 38.2592 59.0661 38.257 59.0574 38.2592L58.9204 38.2809V38.2787C58.8638 38.2853 58.8051 38.294 58.7464 38.307L39.0731 41.4536C39.0514 41.4188 39.0275 41.3796 39.0057 41.3492C38.61 40.7121 38.1598 39.9901 37.3987 39.9901C36.6376 39.9901 36.1875 40.7121 35.7918 41.3492C35.7722 41.3818 35.7483 41.4188 35.7243 41.4536L16.0511 38.307C15.9924 38.294 15.9336 38.2853 15.8771 38.2787L15.7401 38.257C15.7314 38.2548 15.7227 38.2592 15.714 38.257C15.6923 38.257 15.6749 38.2483 15.6531 38.2483C15.614 38.2483 15.5792 38.2592 15.5422 38.2635C15.5335 38.2657 15.5248 38.2657 15.5161 38.2657C13.5373 38.4527 12.5 42.5561 12.5 46.6227C12.5 50.7804 13.5829 54.9902 15.651 54.9947H15.6553C15.6901 54.9925 15.7249 54.9903 15.7597 54.9838L15.8097 54.9729C15.9119 54.9642 16.0119 54.9446 16.1098 54.9142L28.8072 52.3765C29.1008 52.3178 29.2922 52.0307 29.2334 51.7372C29.1747 51.4415 28.8899 51.2501 28.5941 51.3088L17.5128 53.5247C18.4522 51.3479 18.8936 48.9908 18.8066 46.6229C18.8066 43.9243 18.3478 41.2126 17.4649 39.6337L32.3278 42.0127C32.243 42.0583 32.1626 42.1192 32.093 42.1866C31.5754 42.7063 31.7603 43.5174 31.9234 44.2329C32.0321 44.5678 32.0734 44.9222 32.0451 45.2745C31.8212 45.5246 31.5537 45.7312 31.2558 45.8856C30.6186 46.2813 29.8967 46.7315 29.8967 47.4926C29.8967 48.2537 30.6186 48.7038 31.2558 49.0995C31.5537 49.2518 31.8211 49.4583 32.0451 49.7084C32.0778 49.8541 32.0778 50.0064 32.043 50.1521L28.3353 56.8256C28.1374 57.1866 28.1809 57.6345 28.4462 57.952C28.7094 58.2695 29.1421 58.3913 29.5335 58.263L31.247 57.6889L31.8581 59.5351C31.9886 59.9113 32.33 60.1744 32.7279 60.2092C32.7562 60.2114 32.7866 60.2135 32.8149 60.2135L32.8127 60.2114C33.1759 60.2135 33.5086 60.0157 33.6826 59.6982L36.5138 54.601H36.5116C36.74 54.8511 37.0618 54.9946 37.3989 54.9946C37.736 54.9946 38.0578 54.8511 38.2839 54.601L41.113 59.696H41.1151C41.2869 60.0157 41.6218 60.2135 41.985 60.2114C42.0132 60.2114 42.0437 60.2114 42.0719 60.207L42.0698 60.2092C42.4699 60.1744 42.8135 59.9069 42.9439 59.5264L43.5506 57.6889L45.2685 58.2629H45.2663C45.6599 58.3912 46.0905 58.2673 46.3536 57.9498C46.6167 57.6301 46.658 57.1843 46.458 56.8212L43.7376 51.9241L59.0376 54.9837C59.0723 54.9902 59.1071 54.9946 59.1441 54.9946H59.1463C61.2143 54.9902 62.2972 50.7803 62.2972 46.6226C62.2972 42.554 61.2602 38.4482 59.2792 38.2679ZM17.7192 46.6226C17.7192 50.7455 16.6689 53.481 15.8426 53.8573L15.6251 53.9008C14.7836 53.8399 13.5876 51.0217 13.5876 46.6227C13.5876 42.2083 14.7923 39.3835 15.6338 39.3423L15.8165 39.3706C16.645 39.699 17.7192 42.4542 17.7192 46.6226ZM32.826 59L32.2476 57.2495C32.0649 56.7319 31.5017 56.4579 30.982 56.6319L29.3946 57.1646L31.9344 52.5937L31.9323 52.5916C31.9779 52.6655 32.0323 52.7351 32.0932 52.7982C32.6129 53.3157 33.424 53.133 34.1394 52.9699L34.1416 52.9678C34.4765 52.859 34.8288 52.8177 35.1811 52.8438C35.4311 53.0678 35.6377 53.3353 35.7921 53.6354L35.7987 53.6462L32.826 59ZM37.3991 53.9072C37.2817 53.9072 37.0468 53.5788 36.8707 53.3048C36.8663 53.2983 36.862 53.2896 36.8576 53.2831C36.8033 53.1983 36.7532 53.1178 36.7163 53.0591H36.7141C36.4727 52.5503 36.0835 52.1262 35.5986 51.8414C35.4115 51.7674 35.2115 51.7305 35.0093 51.7348C34.6331 51.7522 34.2612 51.8109 33.8981 51.9088C33.5653 52.0132 33.213 52.0566 32.8629 52.0306C32.8347 51.6804 32.876 51.326 32.9825 50.9911C33.0282 50.7954 33.0674 50.5975 33.1 50.4018L33.1021 50.3866V50.3888C33.187 50.0256 33.1696 49.6451 33.05 49.2906C32.7629 48.8057 32.3389 48.4186 31.83 48.1772C31.5778 48.0185 30.9842 47.6488 30.9842 47.4922C30.9842 47.3356 31.5778 46.966 31.83 46.8072C32.3389 46.5658 32.7651 46.1766 33.05 45.6917C33.1978 45.1306 33.1739 44.5392 32.9847 43.9912C32.8782 43.6584 32.8347 43.3061 32.8608 42.9582C33.2109 42.9278 33.5631 42.9669 33.898 43.0756C34.446 43.267 35.0375 43.2909 35.5986 43.1431C35.9595 42.956 36.2596 42.669 36.4619 42.3167C36.5488 42.1884 36.6315 42.0558 36.7141 41.9231C36.8728 41.6709 37.2425 41.0772 37.3991 41.0772C37.5557 41.0772 37.9253 41.6709 38.0841 41.9231C38.1667 42.0558 38.2494 42.1884 38.3364 42.3167V42.3189C38.5386 42.6712 38.8387 42.956 39.1997 43.1431C39.7607 43.2909 40.3522 43.267 40.9002 43.0757C41.2329 42.9669 41.5852 42.9256 41.9353 42.9539C41.9635 43.304 41.9222 43.6584 41.8157 43.9911C41.6243 44.5391 41.6004 45.1306 41.7483 45.6917C42.0353 46.1766 42.4593 46.5658 42.9682 46.8072C43.2204 46.9659 43.8141 47.3356 43.8141 47.4922C43.8141 47.6488 43.2204 48.0184 42.9682 48.1772C42.4593 48.4186 42.0353 48.8078 41.7483 49.2927C41.6287 49.6472 41.6113 50.0256 41.6939 50.3888L41.6961 50.3996C41.7287 50.5953 41.77 50.7932 41.8135 50.9911C41.8265 51.0476 41.8418 51.1216 41.8592 51.1933C41.8613 51.2064 41.8635 51.2173 41.8679 51.2281V51.2303C41.9483 51.4869 41.9722 51.7587 41.9375 52.0262C41.5873 52.0545 41.2351 52.0131 40.9002 51.9088C40.3522 51.7174 39.7607 51.6935 39.1997 51.8414C38.7147 52.1262 38.3255 52.5524 38.0841 53.0591C38.0472 53.1178 37.9971 53.1983 37.9428 53.2831C37.9363 53.2896 37.9341 53.2983 37.9297 53.3048C37.7514 53.5788 37.5165 53.9072 37.3991 53.9072ZM43.8121 56.6297C43.288 56.4579 42.7227 56.7406 42.5444 57.2625L41.9703 59L38.9977 53.6462L39.0042 53.6353H39.0064C39.1608 53.3374 39.3674 53.0678 39.6175 52.8438C39.9676 52.8177 40.322 52.859 40.6569 52.9677C41.3724 53.1308 42.1835 53.3178 42.7032 52.7959H42.7054C42.7663 52.735 42.8206 52.6655 42.8663 52.5915L45.4062 57.1624L43.8121 56.6297ZM59.1733 53.9007L43.0467 50.6779L42.7553 50.1517H42.7531C42.7205 50.006 42.7205 49.856 42.7531 49.7103C42.9771 49.4602 43.2445 49.2536 43.5425 49.0992C44.1796 48.7034 44.9016 48.2533 44.9016 47.4922C44.9016 46.7311 44.1796 46.281 43.5425 45.8852C43.2446 45.7308 42.9771 45.5243 42.7531 45.2742C42.7248 44.9219 42.7661 44.5696 42.8749 44.2325C43.038 43.5171 43.225 42.706 42.7053 42.1863C42.6357 42.1189 42.5552 42.058 42.4704 42.0123L57.3334 39.6334C56.4483 41.2121 55.9916 43.9237 55.9916 46.6226C55.9721 48.3209 56.1721 50.0171 56.5853 51.6654C56.6223 51.8045 56.7136 51.9241 56.8375 51.9981C56.9637 52.0698 57.1115 52.0894 57.2529 52.0524C57.392 52.0155 57.5116 51.9241 57.5834 51.798C57.6552 51.6719 57.6747 51.5218 57.6356 51.3827C57.2507 49.8257 57.0637 48.2252 57.0789 46.6226C57.0789 42.4539 58.1531 39.6985 58.9817 39.3706L59.1643 39.3423C60.0059 39.3837 61.2106 42.2106 61.2106 46.6227C61.2106 51.0218 60.0149 53.8422 59.1733 53.9007Z'
                      fill='#e1473f'
                    ></path>
                  </svg>
                </div>
                <h5 className='adv-title'>Flexible and Affordable Learning</h5>
                <p className='adv-text'>
                  Chandigarh University Online MBA offers unmatched flexibility for working professionals, allowing
                  access to lectures anytime and an affordable semester-wise fee structure.
                </p>
              </div>
            </div>

            {/* <!-- Card 2 --> */}
            <div className='col-5 col-md-4 col-lg-2 advcardinsideeven'>
              <div className='adv-card' data-aos='fade-up' data-aos-duration='1000'>
                <div className='adv-icon'>
                  <svg width='76' height='75' viewBox='0 0 76 75' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='0.5' width='75' height='75' rx='37.5' fill='#ffeccc'></rect>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M23.5897 56.5258H16.6973V57.661C16.6973 57.9472 16.8535 58.2178 17.1035 58.4197C17.3906 58.6531 17.7949 58.7962 18.2461 58.7962H35.9999C36.451 58.7962 36.8553 58.6531 37.1425 58.4197C37.3925 58.2178 37.5487 57.9472 37.5487 57.661V56.5258H30.6583L29.9806 57.4747C29.8731 57.6355 29.6895 57.7433 29.4825 57.7433H24.7658C24.5802 57.7433 24.3966 57.6551 24.2795 57.4924L23.5897 56.5258ZM38.1775 55.3239C38.4939 55.3396 38.7478 55.6023 38.7478 55.9239V57.661C38.7478 58.3295 38.4197 58.9275 37.8924 59.355C37.4002 59.753 36.7303 59.998 36.0018 59.998L18.246 60C17.5156 60 16.8456 59.753 16.3554 59.3569C15.8281 58.9295 15.5 58.3315 15.5 57.6629V55.9258C15.5 55.6043 15.752 55.3415 16.0703 55.3259V42.4189C16.0703 42.1307 16.2051 41.8739 16.4218 41.6935C16.6074 41.5405 16.8535 41.4464 17.1171 41.4464H37.1284C37.392 41.4464 37.6401 41.5405 37.8237 41.6935C38.0405 41.8719 38.1752 42.1287 38.1752 42.4189V55.3259L38.1775 55.3239ZM17.2678 55.3239V42.6463H36.9805V55.3239H30.3516C30.1661 55.3239 29.9825 55.4121 29.8653 55.5749L29.1758 56.5415H25.0743L24.3966 55.5926C24.2892 55.4318 24.1056 55.3239 23.8986 55.3239L17.2678 55.3239ZM48.1404 28.357V17.3227C46.9861 16.811 45.6932 16.4659 44.3963 16.3052C43.1521 16.1503 41.9119 16.166 40.7967 16.366V27.4791C41.8944 27.3457 43.2205 27.3752 44.5408 27.5398C45.8045 27.6967 47.074 27.979 48.1404 28.3594V28.357ZM49.3396 28.359C50.4059 27.9786 51.6755 27.6983 52.9391 27.5395C54.2575 27.3748 55.5856 27.3454 56.6832 27.4787L56.6813 16.3656C55.568 16.1656 54.3278 16.1499 53.0817 16.3048C51.7848 16.4656 50.4919 16.8106 49.3376 17.3223V28.3566L49.3396 28.359ZM39.5997 18.1147V28.1863C39.5997 28.5177 39.8673 28.7882 40.1993 28.7882C40.254 28.7882 40.3087 28.7804 40.3575 28.7667C41.4278 28.5432 42.9063 28.549 44.3965 28.7353C45.7519 28.9039 47.0995 29.2196 48.1425 29.645V30.99C46.7168 30.5528 44.9648 30.2313 43.2168 30.0568C41.4219 29.8764 39.6231 29.8509 38.1779 30.0136V18.244C38.4669 18.1989 38.8087 18.1538 39.1427 18.1303C39.2989 18.1185 39.4552 18.1127 39.5997 18.1127L39.5997 18.1147ZM49.3361 30.9866V29.6416C50.379 29.2161 51.7266 28.9004 53.0821 28.7318C54.5723 28.5475 56.0508 28.5397 57.1211 28.7632C57.1719 28.7769 57.2246 28.7848 57.2793 28.7848C57.6094 28.7848 57.8789 28.5162 57.8789 28.1829V18.0033C58.3613 18.0229 58.8828 18.1268 59.3027 18.221V30.0102C57.8555 29.8474 56.0567 29.8729 54.2638 30.0533C52.5177 30.2278 50.7638 30.5513 49.3381 30.9866L49.3361 30.9866ZM57.879 16.8032C58.5625 16.8248 59.2578 16.9816 59.7578 17.0934C59.8438 17.113 59.9219 17.1306 60.0215 17.1522C60.3027 17.211 60.498 17.46 60.498 17.7404H60.5V30.7021C60.5 31.0334 60.2324 31.304 59.9004 31.304C59.8555 31.304 59.8106 31.2981 59.7676 31.2883C58.3321 31.0452 56.3575 31.0491 54.3792 31.2471C52.3792 31.4471 50.389 31.8451 48.9497 32.3823L48.9361 32.3882H48.9341L48.9322 32.3902L48.9146 32.3961L48.9048 32.398L48.899 32.4L48.8911 32.4019L48.8814 32.4039L48.8755 32.4059L48.8677 32.4078L48.8618 32.4098L48.8384 32.4157H48.8345L48.8228 32.4176H48.8189L48.8091 32.4196H48.8033L48.7935 32.4215H48.7896L48.7798 32.4235H48.774L48.7662 32.4255H48.7583H48.7486H48.7447H48.7349H48.7251H48.7212H48.7115H48.7037H48.6958L48.69 32.4235H48.6802L48.6763 32.4215L48.6665 32.4196H48.6607L48.6509 32.4176H48.647L48.6353 32.4157H48.6314L48.6236 32.4137L48.6079 32.4098L48.6021 32.4078L48.5943 32.4059L48.5884 32.4039L48.5787 32.4019L48.5708 32.4L48.565 32.398L48.5552 32.3961L48.5376 32.3902H48.5357L48.5337 32.3882L48.5201 32.3823C47.0806 31.8432 45.0884 31.4471 43.0906 31.2471C41.1102 31.0491 39.1376 31.0452 37.7022 31.2883C37.6592 31.2981 37.6143 31.304 37.5694 31.304C37.2393 31.304 36.9698 31.0354 36.9698 30.7021L36.9815 17.7404C36.9815 17.4581 37.1788 17.2071 37.4659 17.1502C37.8194 17.0796 38.4424 16.9757 39.0655 16.9326C39.2471 16.9208 39.4268 16.913 39.6026 16.913V15.8778C39.6026 15.6052 39.7881 15.3582 40.0654 15.2935C41.4326 14.9719 42.9912 14.919 44.5439 15.1131C45.9931 15.2935 47.4462 15.6895 48.7411 16.2797C50.036 15.6895 51.4891 15.2935 52.9383 15.1131C54.491 14.919 56.0496 14.9719 57.4167 15.2935C57.6921 15.3582 57.8796 15.6052 57.8796 15.8778L57.879 16.8032ZM43.6876 53.4929C43.9865 53.6321 44.1173 53.9889 43.9806 54.2889C43.8419 54.5888 43.4865 54.7202 43.1877 54.583L40.7814 53.4654C40.6096 53.3928 40.4748 53.2438 40.4299 53.0478C40.3967 52.9046 40.4182 52.7615 40.4787 52.6399L41.592 50.2244C41.7307 49.9244 42.0861 49.7931 42.3849 49.9303C42.6838 50.0695 42.8146 50.4264 42.6779 50.7263L42.0978 51.9851C44.9806 51.0479 47.4842 49.2716 49.3262 46.9402C51.3789 44.3404 52.6035 41.0526 52.6035 37.4764C52.6035 37.2392 52.5996 37.0373 52.5938 36.8667C52.586 36.6863 52.5742 36.4844 52.5567 36.2609C52.5313 35.9295 52.7774 35.6413 53.1055 35.6158C53.4336 35.5903 53.7227 35.8374 53.7481 36.1668C53.7637 36.3609 53.7754 36.5785 53.7852 36.8197C53.795 37.0687 53.7989 37.2883 53.7989 37.4745C53.7989 41.3311 52.4747 44.8799 50.2599 47.6857C48.3302 50.1306 45.7209 52.0109 42.721 53.0422L43.6897 53.4912L43.6876 53.4929ZM32.1508 24.2246L32.7309 22.9659C29.8481 23.9031 27.3444 25.6794 25.5025 28.0108C23.4497 30.6106 22.2252 33.8983 22.2252 37.4745C22.2252 37.8059 21.9576 38.0765 21.6256 38.0765C21.2955 38.0765 21.026 37.8078 21.026 37.4745C21.026 33.618 22.3502 30.0692 24.565 27.2634C26.4947 24.8185 29.104 22.9382 32.1039 21.9069L31.1351 21.4579C30.8363 21.3187 30.7055 20.9618 30.8422 20.6619C30.9808 20.3619 31.3363 20.2305 31.6351 20.3678L34.0413 21.4854C34.2132 21.5579 34.348 21.7069 34.3929 21.903C34.4261 22.0461 34.4046 22.1892 34.3441 22.3108L33.2308 24.7263C33.0921 25.0263 32.7366 25.1576 32.4378 25.0204C32.139 24.8812 32.0082 24.5244 32.1449 24.2244L32.1508 24.2246Z'
                      fill='#e1473f'
                    ></path>
                  </svg>
                </div>
                <h5 className='adv-title'>Harvard Business School Collaboration</h5>
                <p className='adv-text'>
                  Partnered with Harvard Business School, the CU online MBA program includes teaching by global faculty
                  for students to earn international certifications alongside their MBA degree.
                </p>
              </div>
            </div>

            {/* <!-- Card 3 --> */}
            <div className='col-5 col-md-4 col-lg-2 advcardinsideodd'>
              <div className='adv-card' data-aos='fade-up' data-aos-duration='1500'>
                <div className='adv-icon'>
                  <svg width='76' height='75' viewBox='0 0 76 75' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='0.5' width='75' height='75' rx='37.5' fill='#ffeccc'></rect>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M25.0278 41.0898C26.1069 41.0898 26.9708 41.9486 26.9708 43.0226C26.9708 44.0952 26.1074 44.9573 25.0278 44.9573C23.9458 44.9573 23.0847 44.0948 23.0847 43.0226C23.0851 41.9486 23.9458 41.0898 25.0278 41.0898ZM25.0278 40.0344C23.3781 40.0344 22.0293 41.3753 22.0293 43.0226C22.0293 44.6672 23.3781 46.0136 25.0278 46.0136C26.6746 46.0136 28.0281 44.6672 28.0281 43.0226C28.0285 41.3753 26.6751 40.0344 25.0278 40.0344Z'
                      fill='#e1473f '
                    ></path>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M22.8524 48.3861H27.1969C28.4777 48.3861 29.4939 49.3949 29.4939 50.6682V54.9689H27.8131V52.1553H26.7554V54.9689H22.8208V52.1553H21.7631V54.9689H20.5572V50.6682C20.5572 49.3949 21.5688 48.3861 22.8524 48.3861ZM22.8524 47.3307C21.0062 47.3307 19.5 48.8253 19.5 50.6682V56.0243H30.5493V50.6682C30.5493 48.8253 29.0431 47.3307 27.1974 47.3307H22.8524Z'
                      fill='#e1473f '
                    ></path>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M50.9787 41.0898C52.0578 41.0898 52.919 41.9486 52.919 43.0226C52.919 44.0952 52.0578 44.9573 50.9787 44.9573C49.8968 44.9573 49.0356 44.0948 49.0356 43.0226C49.0356 41.9486 49.8968 41.0898 50.9787 41.0898ZM50.9787 40.0344C49.329 40.0344 47.9756 41.3753 47.9756 43.0226C47.9756 44.6672 49.329 46.0136 50.9787 46.0136C52.6256 46.0136 53.9772 44.6672 53.9772 43.0226C53.9772 41.3753 52.6256 40.0344 50.9787 40.0344Z'
                      fill='#e1473f '
                    ></path>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M48.7989 48.3861H53.1485C54.4293 48.3861 55.4409 49.3949 55.4409 50.6682V54.9689H54.1285V51.9923H53.0731V54.9689H48.8842V51.9923H47.8288V54.9689H46.5065V50.6682C46.5065 49.3949 47.5181 48.3861 48.7989 48.3861ZM48.7989 47.3307C46.9527 47.3307 45.4512 48.8253 45.4512 50.6682V56.0243H56.5005V50.6682C56.5005 48.8253 54.9943 47.3307 53.1485 47.3307H48.7989Z'
                      fill='#e1473f '
                    ></path>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M38.641 28.2713C39.723 28.2713 40.5841 29.1348 40.5841 30.207C40.5841 31.2814 39.723 32.1398 38.641 32.1398C37.5619 32.1398 36.7008 31.281 36.7008 30.207C36.7008 29.1348 37.5619 28.2713 38.641 28.2713ZM38.641 27.2164C36.9942 27.2164 35.6426 28.5629 35.6426 30.2074C35.6426 31.8548 36.9937 33.1957 38.641 33.1957C40.2907 33.1957 41.6395 31.8548 41.6395 30.2074C41.639 28.5624 40.2907 27.2164 38.641 27.2164Z'
                      fill='#e1473f '
                    ></path>
                    <path
                      d='M35.4856 35.5677H41.2175C41.8849 35.5677 42.3236 35.7717 42.6268 36.1043C42.93 36.4363 43.1144 36.9375 43.1144 37.6198V41.0453H45.2979V42.3788H41.7903V39.5843H40.735V51.8739H35.9681V39.5848H34.9104V44.1914H33.5881V37.6203C33.5881 36.9379 33.7725 36.4368 34.0757 36.1047C34.3794 35.7717 34.8181 35.5677 35.4856 35.5677ZM35.4856 34.5128C34.5904 34.5128 33.814 34.8239 33.2952 35.3889C32.7787 35.9566 32.5332 36.7451 32.5332 37.6203V45.2468H34.9104V52.9339H41.7899V43.4346H46.3528V39.9853H44.1694V37.6203C44.1694 36.7451 43.922 35.9566 43.4027 35.3889C42.8862 34.8239 42.1145 34.5128 41.217 34.5128H35.4856Z'
                      fill='#e1473f '
                    ></path>
                    <path
                      d='M23.5039 18.9758V38.0406H30.4491V36.9824H24.5616V20.0312H51.4486V36.9824H45.7022V38.0406H52.5063V18.9758H23.5039Z'
                      fill='#e1473f '
                    ></path>
                  </svg>
                </div>
                <h5 className='adv-title'>Industry-Relevant Curriculum</h5>
                <p className='adv-text'>
                  The CU online MBA programme curriculum spans 22 specializations focusing on real-world projects,
                  simulations, and case studies, building decision-making and problem-solving abilities.
                </p>
              </div>
            </div>

            {/* <!-- Card 4 --> */}
            <div className='col-5 col-md-4 col-lg-2 advcardinsideeven'>
              <div className='adv-card' data-aos='fade-up' data-aos-duration='2000'>
                <div className='adv-icon'>
                  <svg width='76' height='75' viewBox='0 0 76 75' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='0.5' width='75' height='75' rx='37.5' fill='#ffeccc'></rect>
                    <path
                      d='M17.0455 43.4348L21.7225 40.7832L22.5489 42.1886L28.1407 39.019V33.8288L28.2848 33.6555C29.2965 32.4323 30.7656 31.6261 32.3715 31.4423C29.9662 29.7082 29.6872 26.2697 31.8062 24.1912C33.7109 22.3209 36.7966 22.3209 38.7014 24.1912C40.8186 26.2701 40.5449 29.7068 38.1361 31.4423C39.7438 31.6244 41.211 32.4323 42.2228 33.6555C42.401 33.8677 42.3668 33.7757 42.3668 34.0427V38.7609C43.8683 39.2594 44.8063 40.7514 44.61 42.2734H46.5219L53.6799 38.2146C55.221 37.3431 57.1995 37.8646 58.0888 39.3743C58.9836 40.8946 58.3301 42.6393 56.9762 43.6593L47.5139 50.8046L29.664 50.8063L28.1283 51.6761L28.9295 53.0372L23.7049 56L16.5 43.746L17.0455 43.4348ZM21.2636 42.4679L18.2157 44.1967L24.1656 54.3134L27.2118 52.5845L27.0426 52.2946H27.0389L21.4632 42.8052L21.2636 42.4679ZM43.2347 42.604C43.737 41.3277 42.8008 39.8304 41.294 39.8304H29.2212L23.1759 43.2581L27.5002 50.6119L29.3347 49.5725H47.086L56.2027 42.6888C56.6816 42.3247 57.0272 41.8474 57.1677 41.3382C57.6033 39.7313 55.7544 38.4621 54.298 39.2877L46.8409 43.5143H44.1746C43.5823 44.5113 42.4931 45.1478 41.2905 45.1478L34.0874 45.1495V43.9121H41.2924C42.1583 43.9121 42.9269 43.38 43.2347 42.604ZM48.9436 20.4013C51.5325 20.4013 53.6335 22.4625 53.6335 25.0046C53.6335 27.5466 51.5344 29.6078 48.9436 29.6078C46.3566 29.6078 44.2555 27.5484 44.2555 25.0046C44.2555 22.4643 46.3565 20.4013 48.9436 20.4013ZM51.3686 22.6251C50.0328 21.3135 47.8598 21.3135 46.522 22.6251C45.1826 23.9403 45.1826 26.0705 46.522 27.3859C47.8578 28.7011 50.0308 28.7011 51.3686 27.3859C52.7081 26.0689 52.7081 23.9405 51.3686 22.6251ZM41.1048 38.4606V34.271C40.6656 33.7866 40.1291 33.3889 39.5313 33.1061C38.894 32.8091 38.1775 32.6394 37.4178 32.6394H33.0863C32.3283 32.6394 31.6118 32.8073 30.9727 33.1061C30.3732 33.3889 29.8385 33.7884 29.401 34.271V38.4606H41.1048ZM37.8085 25.0698C36.397 23.6839 34.1089 23.6839 32.6955 25.0698C31.284 26.4575 31.284 28.7042 32.6955 30.0939C34.1069 31.4798 36.3969 31.4798 37.8085 30.0939C39.2217 28.7062 39.2217 26.4576 37.8085 25.0698ZM48.9434 17C53.4729 17 57.142 20.6027 57.142 25.0503C57.142 28.0131 52.9364 34.6031 50.5329 38.4904C49.8056 39.6678 48.0845 39.6678 47.3572 38.4904C44.9538 34.6049 40.7482 28.0131 40.7482 25.0503C40.7464 20.6027 44.4157 17 48.9434 17ZM53.8494 20.2314C51.14 17.571 46.7491 17.571 44.0377 20.2314C42.7811 21.4653 42.007 23.1677 42.007 25.0501C42.007 27.4879 45.5932 33.2738 48.0109 37.177C48.0667 37.2689 48.0397 37.2247 48.0109 37.177L48.4304 37.8523C48.6626 38.2306 49.2261 38.2306 49.4584 37.8523L49.8778 37.177C49.8472 37.2247 49.8202 37.2689 49.8778 37.177C52.2975 33.2738 55.8817 27.488 55.8817 25.0501C55.8799 23.1693 55.1061 21.4651 53.8494 20.2314ZM49.8778 37.177C49.9354 37.0797 49.9048 37.1292 49.8778 37.177ZM48.0128 37.177C47.9804 37.1292 47.9516 37.0797 48.0128 37.177Z'
                      fill='#e1473f '
                    ></path>
                  </svg>
                </div>
                <h5 className='adv-title'>Career Growth and Networking</h5>
                <p className='adv-text'>
                  Students of the online MBA Chandigarh University develop leadership qualities through interactive
                  sessions and global peer networking opportunities.
                </p>
              </div>
            </div>

            {/* <!-- Card 5 --> */}
            <div className='col-5 col-md-4 col-lg-2 advcardinsideodd'>
              <div className='adv-card' data-aos='fade-up' data-aos-duration='2500'>
                <div className='adv-icon'>
                  <svg width='76' height='75' viewBox='0 0 76 75' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='0.5' width='75' height='75' rx='37.5' fill='#ffeccc'></rect>
                    <path
                      d='M30.9456 43.7998C30.3153 42.8811 29.2801 41.7947 27.6965 40.3879C26.8834 39.6659 25.8362 39.2676 24.748 39.2676H24.1946C23.4054 39.2676 22.6264 39.4795 21.9448 39.8778C20.8806 40.5015 19.9479 41.2574 19.174 42.1235C19.1604 42.1388 19.1484 42.1557 19.1364 42.1727L17.734 44.3116C17.5222 44.6354 17.4504 45.0201 17.5341 45.3981C17.6178 45.7743 17.845 46.0964 18.1747 46.3014C18.8307 46.7116 19.7207 46.5116 20.1614 45.8557L21.2308 44.2608L21.5143 43.9794L21.3879 47.2014L20.8003 50.2625L18.5744 54.5946C18.3643 55.0031 18.337 55.4828 18.4958 55.9133C18.6564 56.3421 18.9929 56.6896 19.42 56.8641C19.6267 56.9489 19.8403 56.9895 20.0521 56.9895C20.6722 56.9895 21.2649 56.6421 21.5485 56.054L24.2937 50.3591L25.7713 51.854L26.9432 55.8845C27.0611 56.293 27.3481 56.6371 27.7307 56.8303C27.9511 56.9421 28.1954 56.9981 28.4396 56.9981C28.6173 56.9981 28.795 56.9675 28.9658 56.9082C29.7157 56.6404 30.1394 55.8591 29.9497 55.0896L28.8018 50.4339C28.7881 50.3814 28.7642 50.3305 28.7317 50.2864L27.0799 48.0678C26.7775 47.6627 26.6306 47.1627 26.6631 46.661L26.8236 44.1916L29.1383 45.9882C29.468 46.2441 29.89 46.3509 30.2948 46.2831C30.6911 46.2153 31.0277 45.9915 31.2446 45.6543C31.6324 45.0492 31.4974 44.2509 30.9457 43.8017L30.9456 43.7998ZM30.5425 45.2099C30.4536 45.3489 30.3153 45.4404 30.1547 45.4676C29.9804 45.4964 29.7977 45.4489 29.6525 45.3371L26.716 43.0574C26.5947 42.9625 26.4307 42.9439 26.2889 43.0049C26.1489 43.0676 26.0532 43.2032 26.0429 43.3557L25.8311 46.6065C25.785 47.3032 25.9917 47.9964 26.4102 48.5591L28.0126 50.7116L29.14 55.2879C29.2288 55.6455 29.0307 56.0082 28.6822 56.1319C28.4926 56.1997 28.2893 56.1862 28.1099 56.0963C27.9306 56.0048 27.8007 55.8489 27.7444 55.6574L26.5434 51.5269C26.5247 51.4608 26.4888 51.4015 26.4409 51.3523L24.473 49.3608C24.4662 49.3541 24.4594 49.349 24.4525 49.3439C24.4406 49.3337 24.4303 49.3236 24.4184 49.3151C24.4064 49.3066 24.3927 49.2998 24.3791 49.2914C24.3705 49.2863 24.3637 49.2812 24.3552 49.2778C24.3517 49.2761 24.3483 49.2761 24.3466 49.2744C24.3312 49.2676 24.3176 49.2625 24.3022 49.2591C24.2902 49.2558 24.28 49.2507 24.268 49.249C24.2544 49.2456 24.2407 49.2439 24.2253 49.2422C24.2134 49.2405 24.1997 49.2388 24.1878 49.2388C24.1741 49.2388 24.1604 49.2405 24.1468 49.2405C24.1348 49.2422 24.1211 49.2422 24.1092 49.2439C24.0955 49.2456 24.0801 49.2507 24.0665 49.2541C24.0545 49.2575 24.0443 49.2591 24.0323 49.2642C24.0186 49.2693 24.0067 49.2761 23.993 49.2829C23.9811 49.288 23.9708 49.293 23.9588 49.2998C23.9486 49.3066 23.9383 49.3151 23.9281 49.3219C23.9161 49.3303 23.9042 49.3388 23.8939 49.349C23.8922 49.3507 23.8888 49.3524 23.8854 49.3558C23.8786 49.3625 23.8734 49.371 23.8666 49.3778C23.8564 49.388 23.8478 49.3998 23.8393 49.4117C23.8307 49.4236 23.8222 49.4371 23.8154 49.4507C23.8102 49.4591 23.8051 49.4659 23.8017 49.4727L20.8003 55.7C20.6106 56.0915 20.146 56.2695 19.7411 56.1034C19.5259 56.0152 19.3619 55.8474 19.2816 55.6305C19.2013 55.4136 19.215 55.1796 19.3209 54.9746L21.5741 50.5901C21.5912 50.5545 21.6048 50.5172 21.6116 50.4799L22.2164 47.3308C22.2181 47.3206 22.2181 47.3104 22.2198 47.2986C22.2215 47.2884 22.2232 47.2799 22.2232 47.2698L22.3923 42.963C22.3992 42.7935 22.3001 42.6359 22.1429 42.5681C21.9858 42.5003 21.803 42.5342 21.6817 42.6545L20.6174 43.7104C20.5986 43.7291 20.5798 43.7511 20.5645 43.7732L19.4712 45.402C19.2799 45.6884 18.8989 45.7799 18.6222 45.607C18.4838 45.5206 18.3864 45.385 18.3523 45.2257C18.3164 45.0664 18.3472 44.9037 18.436 44.7664L19.8214 42.6528C20.5337 41.8613 21.3913 41.1681 22.3718 40.5935C22.9253 40.2698 23.5556 40.0986 24.198 40.0986H24.7514C25.6346 40.0986 26.4836 40.4206 27.1447 41.0071C28.7078 42.3952 29.7088 43.4461 30.2964 44.3172C30.3238 44.3579 30.3579 44.3935 30.3972 44.4206C30.6483 44.602 30.715 44.9495 30.5476 45.2105L30.5425 45.2099ZM24.748 38.5609C26.294 38.5609 27.553 37.3118 27.553 35.7779C27.553 34.244 26.294 32.9948 24.748 32.9948C23.2021 32.9948 21.9431 34.244 21.9431 35.7779C21.9431 37.3118 23.2021 38.5609 24.748 38.5609ZM24.748 33.8202C25.8362 33.8202 26.7211 34.6981 26.7211 35.7778C26.7211 36.8575 25.8362 37.7354 24.748 37.7354C23.6599 37.7354 22.775 36.8575 22.775 35.7778C22.775 34.6981 23.6599 33.8202 24.748 33.8202ZM58.5 50.6931C58.5 52.3846 57.7723 53.9727 56.4501 55.1661C55.1398 56.3475 53.3991 57 51.5508 57H32.5911C32.3605 57 32.1743 56.8153 32.1743 56.5864C32.1743 56.3576 32.3605 56.1729 32.5911 56.1729H51.5508C53.1925 56.1729 54.7333 55.5983 55.8898 54.5542C57.0361 53.5204 57.6664 52.1492 57.6664 50.6933C57.6664 47.673 54.923 45.2153 51.5493 45.2153H38.4827C34.6511 45.2153 31.5334 42.7103 31.5334 39.6307C31.5334 38.1205 32.2679 36.707 33.6038 35.651C34.9106 34.6155 36.6428 34.046 38.4825 34.046H45.6094C45.84 34.046 46.0262 34.2307 46.0262 34.4595C46.0262 34.6883 45.84 34.8731 45.6094 34.8731H38.4825C36.8306 34.8731 35.2829 35.3782 34.123 36.2968C32.9904 37.1934 32.3652 38.3764 32.3652 39.6306C32.3652 42.2544 35.1086 44.39 38.4806 44.39H51.5471C55.3788 44.39 58.4965 47.2188 58.4965 50.695L58.5 50.6931ZM48.3595 26.6965C48.2502 26.6965 48.146 26.7389 48.0691 26.8134L45.3103 29.4897C45.23 29.5677 45.1856 29.6744 45.1856 29.7846C45.1856 29.8965 45.23 30.0016 45.3103 30.0795L48.0691 32.7558C48.1477 32.8321 48.2519 32.8727 48.3595 32.8727H48.9233V34.9558C47.7053 35.3321 46.9349 36.1083 46.9349 36.9914C46.9349 38.2642 48.5167 39.2609 50.5359 39.2609C52.5551 39.2609 54.1369 38.2642 54.1369 36.9914C54.1369 36.1083 53.3665 35.3321 52.1485 34.9558V32.8727H54.8971C55.4437 32.8727 55.8879 32.4321 55.8879 31.8897V27.6745C55.8879 27.1321 55.4437 26.6915 54.8971 26.6915H52.1485V25.2135H52.7122C52.8216 25.2135 52.9258 25.1712 53.0026 25.0966L55.7615 22.4203C55.8418 22.3424 55.8862 22.2356 55.8862 22.1254C55.8862 22.0135 55.8418 21.9085 55.7615 21.8305L53.0026 19.1542C52.924 19.078 52.8198 19.0373 52.7122 19.0373H52.1485V17.4136C52.1485 17.1847 51.9623 17 51.7317 17H49.3401C49.1095 17 48.9233 17.1847 48.9233 17.4136V19.0373H46.1747C45.628 19.0373 45.1839 19.4779 45.1839 20.0203V24.2355C45.1839 24.7779 45.628 25.2186 46.1747 25.2186H48.9233V26.6965H48.3595ZM53.3051 36.9946C53.3051 37.6776 52.1674 38.4386 50.5361 38.4386C48.9047 38.4386 47.767 37.6776 47.767 36.9946C47.767 36.5505 48.2231 36.1081 48.9235 35.8335V36.6149C48.9235 37.0522 49.2822 37.4081 49.7229 37.4081H51.3492C51.7899 37.4081 52.1487 37.0522 52.1487 36.6149V35.8335C52.8491 36.1081 53.3051 36.5505 53.3051 36.9946ZM51.3167 35.2743V36.5827H49.7571V32.8759H51.3167V35.2743ZM55.0561 27.6793V31.8946C55.0561 31.981 54.9861 32.0505 54.8989 32.0505H48.5308L46.1973 29.7861L48.5308 27.5217H54.8989C54.9861 27.5217 55.0561 27.5912 55.0561 27.6776V27.6793ZM49.7572 17.8286H51.3168V19.0388H49.7572V17.8286ZM46.0178 24.2373V20.022C46.0178 19.9356 46.0878 19.8661 46.1749 19.8661H52.5431L54.8766 22.1305L52.5431 24.3949H46.1749C46.0878 24.3949 46.0178 24.3254 46.0178 24.239V24.2373ZM49.7572 25.2203H51.3168V26.6982H49.7572V25.2203Z'
                      fill='#e1473f '
                    ></path>
                  </svg>
                </div>
                <h5 className='adv-title'> Placement Support</h5>
                <p className='adv-text'>
                  Chandigarh University Online MBA offers dedicated placement support through career counselling, resume
                  building, and interview preparation sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-1 mt-5' data-aos='fade-up' id='FAQs'>
        <div className='container'>
          <div className='row g-4 align-items-center'>
            <div className='col-lg-12'>
              <h4 className='fs-1 text-center mb-3'>
                <span className='text-primary-emphasis ' style={{ fontWeight: '600' }}>
                  FAQs
                </span>
              </h4>
              <div className='accordion' id='faqAcc'>
                {/* <!-- FAQ 1 (Open by default) --> */}
                <div className='accordion-item card mb-2 shadow-sm'>
                  <h2 className='accordion-header' id='f1'>
                    <button
                      className='accordion-button'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#fa1'
                      aria-expanded='true'
                      aria-controls='fa1'
                    >
                      Which colleges offer the best online MBA in India?
                    </button>
                  </h2>
                  <div
                    id='fa1'
                    className='accordion-collapse collapse show'
                    aria-labelledby='f1'
                    data-bs-parent='#faqAcc'
                  >
                    <div className='accordion-body'>
                      Top universities such as Chandigarh University, offers online MBA programme which provides
                      world-class business education to students and helps them to stay ahead of the competition.
                    </div>
                  </div>
                </div>

                {/* <!-- FAQ 2 --> */}
                <div className='accordion-item card mb-2 shadow-sm'>
                  <h2 className='accordion-header' id='f2'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#fa2'
                      aria-expanded='false'
                      aria-controls='fa2'
                    >
                      What is the required academic qualification to pursue MBA online at Chandigarh University?
                    </button>
                  </h2>
                  <div id='fa2' className='accordion-collapse collapse' aria-labelledby='f2' data-bs-parent='#faqAcc'>
                    <div className='accordion-body'>
                      To be eligible, you must have a bachelor’s degree with at least 50% marks. Graduates of recognized
                      professional programmes like CA/ ICWA etc. are also eligible to apply.
                    </div>
                  </div>
                </div>

                {/* <!-- FAQ 3 --> */}
                <div className='accordion-item card mb-2 shadow-sm'>
                  <h2 className='accordion-header' id='f3'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#fa3'
                      aria-expanded='false'
                      aria-controls='fa3'
                    >
                      Is an entrance exam compulsory for Chandigarh University Online courses MBA?
                    </button>
                  </h2>
                  <div id='fa3' className='accordion-collapse collapse' aria-labelledby='f3' data-bs-parent='#faqAcc'>
                    <div className='accordion-body'>No entrance exam is required for CU Online MBA.</div>
                  </div>
                </div>

                {/* <!-- FAQ 4 --> */}
                <div className='accordion-item card mb-2 shadow-sm'>
                  <h2 className='accordion-header' id='f4'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#fa4'
                      aria-expanded='false'
                      aria-controls='fa4'
                    >
                      What is Chandigarh University online MBA ranking and NAAC accreditation?
                    </button>
                  </h2>
                  <div id='fa4' className='accordion-collapse collapse' aria-labelledby='f4' data-bs-parent='#faqAcc'>
                    <div className='accordion-body'>
                      Chandigarh University is NAAC A+ accredited, UGC-approved, and ranked by NIRF and QS, ensuring
                      top-tier academic credibility.
                    </div>
                  </div>
                </div>

                {/* <!-- FAQ 5 --> */}
                <div className='accordion-item card mb-2 shadow-sm'>
                  <h2 className='accordion-header' id='f5'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#fa5'
                      aria-expanded='false'
                      aria-controls='fa5'
                    >
                      Is work experience mandatory for pursuing online MBA Chandigarh University?
                    </button>
                  </h2>
                  <div id='fa5' className='accordion-collapse collapse' aria-labelledby='f5' data-bs-parent='#faqAcc'>
                    <div className='accordion-body'>
                      Chandigarh University distance MBA can be pursued by both freshers and experienced professionals.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ==========================================================Banner and footer section --> */}

      <section className='mba-cta-section py-5 mt-5 mb-0' id='contactus'>
        <div className='container text-start'>
          <div className='cta-content p-3 p-md-5 rounded'>
            <h3 className='text-white mb-3 fw-normal'>Transform Your Career Today with an</h3>
            <h2 className='text-white mb-5 fw-bold'>Online MBA from Chandigarh University</h2>
            <button type='button' className='btn btnmain fw-semibold  fs-5 ' onClick={handleShow}>
              Apply Now!
            </button>
          </div>
        </div>
      </section>

      <footer className='bg-white py-md-4 py-5'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6 d-flex justify-content-start'>
              <img src='/images/cumba/logo.svg' className='footerlogo' alt='logo' />
            </div>

            <div className='col-md-6 d-flex flex-column justify-content-start align-items-start text-start footer-right'>
              <div className='d-flex fs16 mb-3'>
                <i className='bi bi-geo-alt-fill me-2 pt-1'></i>
                <p className='small '>
                  Chandigarh University, NH-05 Chandigarh-Ludhiana Highway, Mohali, Punjab (INDIA) - 140413
                </p>
              </div>

              <div className='d-flex fs16 mb-3'>
                <i className='bi bi-envelope-fill me-2 fs16'></i>
                <a href='mailto:cuonlineuniversity@gmail.com' className='small text-decoration-none f18footer'>
                  cuonlineuniversity@gmail.com
                </a>
              </div>

              <div className='d-flex fs16 mb-3'>
                <i className='bi bi-telephone-fill me-2 fs16'></i>
                <a href='tel:+919035654090' className='small text-decoration-none f18footer '>
                  +91 9035654090
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className='heading-popup '>
            <h3 className='text-center pop-up text-black'>Enter Your Details to Get Started</h3>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <div className='form-group mb-3'>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Enter Name'
                    required
                    className='form-control'
                  />
                </div>

                <div className='form-group mb-3'>
                  <Field
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter Email'
                    required
                    className='form-control'
                  />
                </div>

                <div className="mb-3 form-group  ">
                  <PhoneInputField name="contact" />
                  <ErrorMessage name="contact" component="div" className=" form-control bams-form-field py-3" />
                </div>
                <div className='form-group mb-3 select-wrapper'>
                  <Field
                    as='select'
                    id='location'
                    name='location'
                    required
                    className='browser-default custom-select form-control white-bg-black-text bams-form-field '
                  >
                    <option value=''>Select State</option>
                    <option value='Andhra Pradesh'>Andhra Pradesh</option>
                    <option value='Andaman & Nicobar'>Andaman & Nicobar</option>

                    <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                    <option value='Assam'>Assam</option>
                    <option value='Bihar'>Bihar</option>
                    <option value='Chhattisgarh'>Chhattisgarh</option>
                    <option value='Chandigarh'>Chandigarh</option>
                    <option value='Dadra and Nagar Haveli'>Dadra and Nagar Haveli</option>
                    <option value='Daman & Diu'>Daman & Diu</option>
                    <option value='Delhi'>Delhi</option>
                    <option value='Goa'>Goa</option>
                    <option value='Gujarat'>Gujarat</option>
                    <option value='Haryana'>Haryana</option>
                    <option value='Himachal Pradesh'>Himachal Pradesh</option>
                    <option value='Jammu & Kashmir'>Jammu & Kashmir</option>
                    <option value='Jharkhand'>Jharkhand</option>
                    <option value='Karnataka'>Karnataka</option>
                    <option value='Kerala'>Kerala</option>
                    <option value='Lakshadweep'>Lakshadweep</option>

                    <option value='Madhya Pradesh'>Madhya Pradesh</option>
                    <option value='Maharashtra'>Maharashtra</option>
                    <option value='Manipur'>Manipur</option>
                    <option value='Meghalaya'>Meghalaya</option>
                    <option value='Mizoram'>Mizoram</option>
                    <option value='Nagaland'>Nagaland</option>
                    <option value='Odisha'>Odisha</option>
                    <option value='Punjab'>Punjab</option>
                    <option value='Puducherry'>Puducherry</option>

                    <option value='Rajasthan'>Rajasthan</option>
                    <option value='Sikkim'>Sikkim</option>
                    <option value='Tamil Nadu'>Tamil Nadu</option>
                    <option value='Tripura'>Tripura</option>
                    <option value='Telangana'>Telangana</option>
                    <option value='Uttarakhand'>Uttarakhand</option>
                    <option value='Uttar Pradesh'>Uttar Pradesh</option>
                    <option value='West Bengal'>West Bengal</option>
                  </Field>
                </div>
                <div className='form-group mb-3'>
                  <Field
                    as='textarea'
                    id='description'
                    name='description'
                    placeholder='Message (Optional)'
                    className='form-control'
                    rows={2}
                  />
                </div>
                <div className='mb-3 form-check text-white'>
                  <Field type='checkbox' name='terms' className='form-check-input border-black' id='terms' />
                  <label className='form-check-label' htmlFor='terms' style={{ fontSize: '16px', color: "black" }}>
                    By Clicking this, I agree to the{' '}
                    <Link href='/terms-and-conditions' className='textcolortenm'>
                      Terms & Conditions
                    </Link>
                  </label>
                  <ErrorMessage name='terms' component='div' className='error text-danger' />
                </div>
                <div className='form-group text-center '>
                  <button type='submit' id='about' name='submit' className='sub-btn btn'>
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <a href='tel:09035654090' className='phone-iconphone'>
        <Image src='/images/icons/Phone-blue.svg' width={40} height={28} alt='phone-iconphone' className='red-filter' />
      </a>
    </section>
  )
}

export default BamsPage

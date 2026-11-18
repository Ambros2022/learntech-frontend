import React from 'react'
import {
  COURSES,
  CAREERS,
  VISA_BEFORE,
  VISA_AFTER,
  TESTIMONIALS,
  COLLEGES,
} from './StudyInDubaiData'
import { FAQ_DATA } from './StudyInDubaiFaqData'
import StudyInDubaiBehaviorsClient from './StudyInDubaiBehaviorsClient'

export default function StudyInDubaiContent() {
  const getCourseIcon = (id: string) => {
    if (id.startsWith('bca') || id.startsWith('btech') || id === 'me') return 'code'
    if (id.startsWith('bba') || id.startsWith('mba')) return 'biz'
    if (id.startsWith('bcom')) return 'fee'
    if (id.startsWith('bsc') || id.startsWith('be') || id.startsWith('bits')) return 'eng'
    if (id.startsWith('ba')) return 'book'
    return 'cap'
  }

  return (
    <>
      {/* SVG Sprite */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="i-logo" viewBox="0 0 120 120">
          <rect width="120" height="120" rx="22" fill="#E53340" />
          <circle cx="69.8" cy="58" r="12" fill="#fff" />
          <rect x="27" y="21.6" width="16.3" height="61.3" fill="#fff" />
          <rect x="42.4" y="82.7" width="53.3" height="16.3" fill="#fff" />
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </symbol>
        <symbol id="i-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5L20 7" />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </symbol>
        <symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
        </symbol>
        <symbol id="i-cap" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10l9-5 9 5-9 5-9-5z" />
          <path d="M7 12.5V17c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-4.5" />
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </symbol>
        <symbol id="i-code" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
        </symbol>
        <symbol id="i-biz" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
        </symbol>
        <symbol id="i-eng" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </symbol>
        <symbol id="i-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19V5a2 2 0 0 1 2-2h13v14H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h13" />
        </symbol>
        <symbol id="i-fee" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
        </symbol>
        <symbol id="i-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </symbol>
        <symbol id="i-plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 16l20-8-8 20-3-9-9-3z" />
        </symbol>
        <symbol id="i-id" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <circle cx="12" cy="10" r="3" />
          <path d="M9 16h6" />
        </symbol>
        <symbol id="i-camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </symbol>
        <symbol id="i-lang" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 7 8M12 5c-1 4-4 7-8 8M14 20l4-9 4 9M15.5 17h5" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </symbol>
        <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </symbol>
        <symbol id="i-ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l3 3 5-6" />
        </symbol>
        <symbol id="i-quote" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 7h4v5a4 4 0 0 1-4 4M15 7h4v5a4 4 0 0 1-4 4" />
        </symbol>
      </svg>

      {/* HEADER */}
      <header className="header">
        <div className="container header__inner">
          <a className="brand" href="#top" aria-label="Learntech home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/study-in-dubai/media/LT.svg" alt="Learntech" fetchPriority="high" />
          </a>
          <nav className="nav" id="mainNav" aria-label="Main">
            <ul className="nav__links">
              <li><a href="#why">Why Dubai</a></li>
              <li><a href="#courses">Programmes</a></li>
              <li><a href="#colleges">Universities</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#process">How it works</a></li>
              <li><a href="#apply">Eligibility</a></li>
              <li><a href="#faq">FAQs</a></li>
            </ul>
          </nav>
          <a className="btn btn--sm" href="#enquire">Talk to an expert</a>
          <button
            className="nav-toggle"
            id="navToggle"
            type="button"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mainNav"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero__content reveal">
              <span className="eyebrow">Your Next Chapter Has an Address</span>
              <h1 className="hero__title">
                Start with the Right Study<br /> Abroad Consultants for<em> Dubai</em>
              </h1>
              <p className="hero__text">
                Explore opportunities to study in Dubai for Indian students with clear guidance on courses, applications
                and admissions.
              </p>
              <div className="hero__cta">
                <a className="btn btn--light" href="#courses">
                  {' '}Explore Programmes{' '}
                  <svg width="16" height="16">
                    <use href="#i-arrow" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WHY DUBAI */}
        <section className="section" id="why">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow">Why Dubai</span>
              <h2 className="title">Why study in Dubai?</h2>
              <p className="lead">
                Choosing to study in Dubai is an important step towards your academic and professional goals. With access
                to globally recognised programmes, diverse learning environments and international career exposure,
                Dubai offers Indian students an opportunity to broaden their horizons and prepare for a competitive
                global workforce.
              </p>
            </div>
            <div className="why">
              <div className="why__img reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/study-in-dubai/media/25852825 (2).webp"
                  alt="Dubai skyline"
                  loading="lazy"
                />
                <span className="why__badge">
                  <svg>
                    <use href="#i-pin" />
                  </svg>
                  Dubai, United Arab Emirates
                </span>
              </div>
              <div className="grid grid--features">
                <article className="feature reveal">
                  <div className="feature__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/study-in-dubai/Why-choose-icons/close-aicon.gif"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="feature__title">Easy Accessibility</h3>
                    <p className="feature__text">
                      Dubai is just a short flight from major Indian cities, making travel home and family visits more
                      convenient.
                    </p>
                  </div>
                </article>
                <article className="feature reveal">
                  <div className="feature__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/study-in-dubai/Why-choose-icons/Globe-aicon.gif"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="feature__title">Global exposure</h3>
                    <p className="feature__text">
                      Interact with students from diverse backgrounds while studying in one of the world&apos;s prominent
                      business and trade centres.
                    </p>
                  </div>
                </article>
                <article className="feature reveal">
                  <div className="feature__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/study-in-dubai/Why-choose-icons/academic-aicon.gif"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="feature__title">Familiar Academic Foundations</h3>
                    <p className="feature__text">
                      Explore programmes offered by established Indian institutions in Dubai, combining familiar academic
                      standards with an international outlook.
                    </p>
                  </div>
                </article>
                <article className="feature reveal">
                  <div className="feature__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/study-in-dubai/Why-choose-icons/safety-aicon.gif"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="feature__title">Supportive Student Environment</h3>
                    <p className="feature__text">
                      Experience modern infrastructure, a strong Indian community and student friendly facilities that
                      make settling into Dubai easier.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAMMES */}
        <section className="section sec-navy" id="courses">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow">Programmes</span>
              <h2 className="title">Find Your Programme in Dubai</h2>
              <p className="lead">
                Explore undergraduate and postgraduate programmes offered by leading institutions in Dubai. Compare
                available courses across universities to find a programme that aligns with your academic interests and
                career goals.
              </p>
            </div>

            <div className="filters reveal">
              <div className="pills" data-filter="college" role="group" aria-label="Filter by college">
                <button className="pill" type="button" data-value="sym" aria-pressed="false">
                  Symbiosis International University Dubai
                </button>
                <button className="pill" type="button" data-value="bits" aria-pressed="false">
                  BITS Pilani Dubai
                </button>
              </div>
              <div className="pills" data-filter="level" role="group" aria-label="Filter by level">
                <button className="pill" type="button" data-value="all" aria-pressed="true">
                  All levels
                </button>
                <button className="pill" type="button" data-value="ug" aria-pressed="false">
                  UG
                </button>
                <button className="pill" type="button" data-value="pg" aria-pressed="false">
                  PG
                </button>
              </div>
            </div>

            <div className="track" id="courseTrack" tabIndex={0} role="region" aria-label="Courses">
              {COURSES.map((c) => {
                const icon = getCourseIcon(c.id)
                return (
                  <article key={c.id} className="pc" data-college={c.c} data-level={c.lv} data-course-name={`${COLLEGES[c.c].short} – ${c.name}`}>
                    <div className="pc__top">
                      <span className="pc__ico">
                        <svg aria-hidden="true">
                          <use href={`#i-${icon}`} />
                        </svg>
                      </span>
                      <span className="pc__lv">{c.lv === 'ug' ? 'Undergraduate' : 'Postgraduate'}</span>
                    </div>
                    <h3 className="pc__title">{c.name}</h3>
                    <p className="pc__degree">{c.degree}</p>
                    <dl className="pc__facts">
                      <div className="pc__fact">
                        <dt>
                          <svg aria-hidden="true">
                            <use href="#i-clock" />
                          </svg>
                          Duration
                        </dt>
                        <dd>{c.dur}</dd>
                      </div>
                      <div className="pc__fact">
                        <dt>
                          <svg aria-hidden="true">
                            <use href="#i-fee" />
                          </svg>
                          Tuition Fee
                        </dt>
                        <dd>{c.fee}</dd>
                      </div>
                      <div className="pc__fact">
                        <dt>
                          <svg aria-hidden="true">
                            <use href="#i-ok" />
                          </svg>
                          Eligibility
                        </dt>
                        <dd>{c.eligibility}</dd>
                      </div>
                    </dl>
                    <a className="pc__cta" href="#enquire">
                      Enquire now{' '}
                      <svg aria-hidden="true">
                        <use href="#i-arrow" />
                      </svg>
                    </a>
                  </article>
                )
              })}
            </div>

            <div className="ctl">
              <span className="cnt" id="courseCount" aria-live="polite">
                {COURSES.filter((c) => c.c === 'sym').length} programmes
              </span>
              <div className="arrs">
                <button className="arr" id="prev" type="button" aria-label="Previous courses">
                  <svg>
                    <use href="#i-back" />
                  </svg>
                </button>
                <button className="arr" id="next" type="button" aria-label="Next courses">
                  <svg>
                    <use href="#i-arrow" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="section" id="colleges">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow">Our Partners</span>
              <h2 className="title">Our Partner Institutions in Dubai</h2>
              <p className="lead">
                Explore international learning opportunities at our partner universities in Dubai. With a focus on
                academic learning, international exposure and industry engagement, these institutions provide students
                with opportunities to pursue higher education in a global learning environment.
              </p>
            </div>
            <div className="grid grid--2">
              <article className="college reveal" data-college="sym">
                <div className="college__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/study-in-dubai/media/Dubai_symbosis.webp"
                    alt="Symbiosis International University Dubai campus"
                    loading="lazy"
                  />
                </div>
                <div className="college__body">
                  <span className="college__loc">
                    <svg>
                      <use href="#i-pin" />
                    </svg>
                    Dubai Knowledge Park
                  </span>
                  <h3 className="college__name">Symbiosis International University, Dubai</h3>
                  <p className="college__text">
                    The university offers undergraduate and postgraduate programmes across business, computing, commerce,
                    media and other disciplines. Its international approach to education brings together students from
                    diverse cultural backgrounds especially with the establishment of its Dubai campus in 2024.
                  </p>
                  <dl className="facts facts--points">
                    <div>
                      <dt>UAE Accreditation </dt>
                      <dd>Licensed by MOHESR and Accredited by CAA</dd>
                    </div>
                    <div>
                      <dt>Campus Infrastructure </dt>
                      <dd>Advanced Laboratories and Learning Resource Centre</dd>
                    </div>
                    <div>
                      <dt>Global Collaborations</dt>
                      <dd>Academic Partnership with Aston University, UK</dd>
                    </div>
                  </dl>
                  <a className="btn" href="#enquire">
                    Explore University
                  </a>
                </div>
              </article>
              <article className="college reveal" data-college="bits">
                <div className="college__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/study-in-dubai/media/Dubai-bits.webp"
                    alt="BITS Pilani Dubai campus"
                    loading="lazy"
                  />
                </div>
                <div className="college__body">
                  <span className="college__loc">
                    <svg>
                      <use href="#i-pin" />
                    </svg>
                    Dubai International Academic City
                  </span>
                  <h3 className="college__name">BITS Pilani, Dubai</h3>
                  <p className="college__text">
                    BITS Pilani, Dubai Campus offers undergraduate and postgraduate programmes in engineering, technology
                    and management. Established in 2000, the campus combines academic learning with practical industry
                    exposure through its distinctive Practice School programme.
                  </p>
                  <dl className="facts facts--points">
                    <div>
                      <dt>Industry Exposure</dt>
                      <dd>7.5 Months of Structured Training</dd>
                    </div>
                    <div>
                      <dt>Industry Connections </dt>
                      <dd>Experience with 400+ Companies</dd>
                    </div>
                    <div>
                      <dt>Alumni Network -</dt>
                      <dd>6,000+ Graduates Worldwide</dd>
                    </div>
                  </dl>
                  <a className="btn btn--red" href="#enquire">
                    Explore University
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CAREER OUTLOOK */}
        <section className="section section--soft" id="careers">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow">Career Outlook</span>
              <h2 className="title">Career Opportunities After You Study in Dubai </h2>
              <p className="lead">
                Dubai’s rapidly expanding economy offers opportunities for International students who want to pursue a
                career in technology, business, engineering and creative fields. Studying in Dubai provides access to
                world-class employers and allows you an opportunity to gain experience in your chosen industry. Here’s a
                look at where popular programmes can take you.
              </p>
            </div>
            <div className="grid grid--4" id="careerGrid">
              {CAREERS.map((car) => {
                const cs = car.courseIds.map((id) => COURSES.find((c) => c.id === id)).filter(Boolean)
                const cols = Array.from(new Set(cs.map((c) => c?.c).filter(Boolean)))
                return (
                  <article key={car.title} className="feature reveal">
                    <h3 className="feature__title">{car.title}</h3>
                    <p className="feature__text">{car.desc}</p>
                    <span className="k">{car.roleLabel}</span>
                    <p className="rt">{car.roles.join(', ')}</p>
                    <div className="tg">
                      {cols.map((colId) => (
                        <span key={colId} className={colId === 'bits' ? 'b' : ''}>
                          {colId ? COLLEGES[colId as 'sym' | 'bits'].short : ''}
                        </span>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* SMALL CTA BAND */}
        <section className="band">
          <div className="container">
            <div className="band__box reveal">
              <div>
                <h2>Confused about the right <em>course</em> for you?</h2>
                <p>
                  Share your academic record, career aspirations and financial plan, and our counsellors will help you
                  find the best-fit programme at the university of your choice.
                </p>
              </div>
              <div className="band__cta">
                <a className="btn btn--glass" href="#enquire">
                  Talk to a Counsellor
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ADMISSION SUPPORT STEPS */}
        <section className="section" id="process">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow">Admission Support</span>
              <h2 className="title">From Course Selection to Your Confirmed Offer</h2>
              <p className="lead">
                Planning to study in Dubai? We guide you through every stage of the admission process, from choosing the
                right university and programme to completing applications, securing your offer and preparing for your
                move.
              </p>
            </div>

            <ol className="fl">
              <li className="fl__step reveal">
                <div className="fl__node-cell">
                  <span className="fl__node">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/Admission-cons/counsellor.svg" alt="Counselling" loading="lazy" />
                  </span>
                </div>
                <span className="fl__num" aria-hidden="true">01</span>
                <div className="fl__text-cell">
                  <div>
                    <h3 className="fl__title">Talk To A Counsellor</h3>
                    <p className="fl__text">
                      Discuss your academic background, interests and future goals with our admission counsellors.
                    </p>
                  </div>
                </div>
              </li>
              <li className="fl__step reveal">
                <div className="fl__node-cell">
                  <span className="fl__node">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/Admission-cons/course.svg" alt="Choosing a college and course" loading="lazy" />
                  </span>
                </div>
                <span className="fl__num" aria-hidden="true">02</span>
                <div className="fl__text-cell">
                  <div>
                    <h3 className="fl__title">Choose Your College And Course</h3>
                    <p className="fl__text">
                      Compare universities and programmes to find the right fit for your aspirations.
                    </p>
                  </div>
                </div>
              </li>
              <li className="fl__step reveal">
                <div className="fl__node-cell">
                  <span className="fl__node">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/Admission-cons/documents.svg" alt="Preparing application documents" loading="lazy" />
                  </span>
                </div>
                <span className="fl__num" aria-hidden="true">03</span>
                <div className="fl__text-cell">
                  <div>
                    <h3 className="fl__title">Prepare Your Documents</h3>
                    <p className="fl__text">Keep your academic records, ID and admission documents ready.</p>
                  </div>
                </div>
              </li>
              <li className="fl__step reveal">
                <div className="fl__node-cell">
                  <span className="fl__node">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/Admission-cons/confidence.svg" alt="Submitting an application" loading="lazy" />
                  </span>
                </div>
                <span className="fl__num" aria-hidden="true">04</span>
                <div className="fl__text-cell">
                  <div>
                    <h3 className="fl__title">Apply With Confidence</h3>
                    <p className="fl__text">
                      We assist with application forms, document submissions and university requirements.
                    </p>
                  </div>
                </div>
              </li>
              <li className="fl__step reveal">
                <div className="fl__node-cell">
                  <span className="fl__node">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/Admission-cons/offer.svg" alt="Receiving an admission offer" loading="lazy" />
                  </span>
                </div>
                <span className="fl__num" aria-hidden="true">05</span>
                <div className="fl__text-cell">
                  <div>
                    <h3 className="fl__title">Receive Your Offer</h3>
                    <p className="fl__text">
                      Track your application and understand the next steps after receiving your offer letter.
                    </p>
                  </div>
                </div>
              </li>
              <li className="fl__step reveal">
                <div className="fl__node-cell">
                  <span className="fl__node">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/Admission-cons/Visa.svg" alt="Visa guidance" loading="lazy" />
                  </span>
                </div>
                <span className="fl__num" aria-hidden="true">06</span>
                <div className="fl__text-cell">
                  <div>
                    <h3 className="fl__title">Visa Guidance</h3>
                    <p className="fl__text">
                      Get assistance with student visa documentation and the application process.
                    </p>
                  </div>
                </div>
              </li>
              <li className="fl__step reveal">
                <div className="fl__node-cell">
                  <span className="fl__node">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/Admission-cons/Plan.svg" alt="Planning a move to Dubai" loading="lazy" />
                  </span>
                </div>
                <span className="fl__num" aria-hidden="true">07</span>
                <div className="fl__text-cell">
                  <div>
                    <h3 className="fl__title">Plan your move</h3>
                    <p className="fl__text">
                      Prepare for accommodation, airfare and your transition to student life in Dubai
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* WHY LEARNTECH */}
        <section className="section" id="learntech">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow">Why Learntech</span>
              <h2 className="title">Why Choose Learntech for Study in Dubai</h2>
              <p className="lead">
                Choosing the right university is an important decision. Learntech helps students explore suitable
                programmes, compare university options and understand the costs and admission requirements before taking
                the next step.
              </p>
            </div>

            <div className="lw">
              <div className="lw__side">
                <div className="lw__item reveal">
                  <span className="lw__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/why-icons/Icon_01.webp" alt="" />
                  </span>
                  <span>1,00,000+ Students Guided</span>
                </div>
                <div className="lw__item reveal">
                  <span className="lw__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/why-icons/Icon_02.webp" alt="" />
                  </span>
                  <span>Guiding Families Since 1994</span>
                </div>
                <div className="lw__item reveal">
                  <span className="lw__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/why-icons/Icon_03.webp" alt="" />
                  </span>
                  <span>2 Partner Campuses in Dubai</span>
                </div>
                <div className="lw__item reveal">
                  <span className="lw__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/why-icons/Icon_04.webp" alt="" />
                  </span>
                  <span>Counsellors Across India and the UAE</span>
                </div>
              </div>

              <div className="lw__center reveal">
                <h3>Clear <em>Guidance</em>, from Start to Finish</h3>
                <p>
                  Our counsellors have been guiding students and families since 1994. We consider your academic
                  background, interests and budget to help you shortlist suitable programmes at the leading universities
                  in Dubai.
                </p>
                <p>
                  We help you navigate each stage with clarity be it comparing courses and understanding fee structures or
                  exploring education loan options and visa requirements.
                </p>
                <a className="btn btn--red" href="#enquire">
                  Talk to a counsellor{' '}
                  <svg width="16" height="16">
                    <use href="#i-arrow" />
                  </svg>
                </a>
              </div>

              <div className="lw__side lw__side--r">
                <div className="lw__item reveal">
                  <span className="lw__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/why-icons/Icon_05.webp" alt="" />
                  </span>
                  <span>Course Shortlisting That Fits Your Goals</span>
                </div>
                <div className="lw__item reveal">
                  <span className="lw__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/why-icons/Icon_06.webp" alt="" />
                  </span>
                  <span>Transparent Cost Breakdown</span>
                </div>
                <div className="lw__item reveal">
                  <span className="lw__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/why-icons/Icon_07.webp" alt="" />
                  </span>
                  <span>Education Loan Assistance</span>
                </div>
                <div className="lw__item reveal">
                  <span className="lw__icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/study-in-dubai/why-icons/Icon_08.webp" alt="" />
                  </span>
                  <span>Visa Guidance at Every Step</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENTS AND CHECKLISTS */}
        <section className="section" id="apply">
          <div className="container">
            <div className="section__head reveal">
              <span className="eyebrow">Documents and Checklists</span>
              <h2 className="title">Everything You Need, From Application to Arrival</h2>
              <p className="lead">
                From your application to your first week in the UAE, here’s everything to keep ready when you study in
                Dubai.
              </p>
            </div>

            <div className="dc-sub dc-sub--c reveal">
              <h3>Application Documents</h3>
            </div>
            <div className="dc-wide reveal">
              <ul className="dc-rows dc-rows--2">
                <li>
                  <svg aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>Valid passport</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>Class 10 and Class 12 marksheets</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>Recent passport-size photographs</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>English proficiency test score or waiver, if required</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>Bachelor’s degree semester-wise marksheets</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>Statement of Purpose (SOP), if required</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>Two Letters of Recommendation (LORs), if required</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>Updated resume</span>
                </li>
                <li>
                  <svg aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>Experience or offer letter, if working</span>
                </li>
              </ul>
            </div>

            <div className="dc-sub dc-sub--2 reveal">
              <p style={{ textAlign: 'center' }}>Use this checklist to stay organised at every stage.</p>
            </div>
            <div className="dc-grid">
              <div className="dc-block reveal">
                <h4 className="dc-block__title"><span>Checklist :</span> Before You Fly</h4>
                <ul className="dc-rows" id="visaBefore">
                  {VISA_BEFORE.map((item) => (
                    <li key={item}>
                      <svg aria-hidden="true">
                        <use href="#i-check" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dc-block dc-block--red reveal">
                <h4 className="dc-block__title"><span>Checklist :</span> After You Land</h4>
                <ul className="dc-rows dc-rows--red" id="visaAfter">
                  {VISA_AFTER.map((item) => (
                    <li key={item}>
                      <svg aria-hidden="true">
                        <use href="#i-check" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section sec-navy" id="stories">
          <div className="container">
            <div className="stories">
              <div className="stories__intro reveal">
                <span className="eyebrow">Testimonials</span>
                <h2 className="title">Real Stories. Real Experiences.</h2>
                <p className="lead">
                  Hear from students who chose Dubai for their higher education and discover what their university
                  experience has been like.
                </p>
                <p className="ts-idx" aria-hidden="true">
                  <b id="tsNow">01</b> / <span id="tsAll">05</span>
                </p>
                <div className="arrs">
                  <button className="arr" id="sprev" type="button" aria-label="Previous testimonials">
                    <svg>
                      <use href="#i-back" />
                    </svg>
                  </button>
                  <button className="arr" id="snext" type="button" aria-label="Next testimonials">
                    <svg>
                      <use href="#i-arrow" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="tv-wrap">
                <article className="tv" id="tvStage" aria-live="polite">
                  <span className="tv__mark">
                    <svg aria-hidden="true">
                      <use href="#i-quote" />
                    </svg>
                  </span>
                  <blockquote>{TESTIMONIALS[0].quote}</blockquote>
                  <div className="tv__who">
                    <span className="tv__av">
                      {TESTIMONIALS[0].name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                    </span>
                    <div>
                      <b>{TESTIMONIALS[0].name}</b>
                      <small>{TESTIMONIALS[0].programme}, {TESTIMONIALS[0].college}</small>
                    </div>
                  </div>
                </article>
                <div className="tv__tabs" id="tvTabs" role="tablist" aria-label="Choose a testimonial">
                  {TESTIMONIALS.map((t, i) => (
                    <button
                      key={t.name}
                      className="tt"
                      type="button"
                      role="tab"
                      data-i={i}
                      aria-label={`Testimonial ${i + 1}: ${t.name}`}
                      aria-selected={i === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container last-cta">
            <div className="section__head reveal" style={{ textAlign: 'center' }}>
              <span className="eyebrow">FAQs</span>
              <h2 className="title">Everything You Need to Know About Studying in Dubai</h2>
              <p className="lead" style={{ marginInline: 'auto' }}>
                Hear from students who chose Dubai for their higher education and discover what their university
                experience has been like.
              </p>
            </div>
            <div className="faq reveal">
              {FAQ_DATA.map((item) => (
                <details key={item.q} className="faq__item">
                  <summary className="faq__q">{item.q}</summary>
                  <p className="faq__a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA ENQUIRE */}
        <section className="section" id="enquire">
          <div className="container">
            <div className="cta2 reveal">
              <div className="cta2__bg" aria-hidden="true">
                <svg viewBox="0 0 1200 400" preserveAspectRatio="none">
                  <path d="M-20 350 C 300 430, 520 110, 860 210 S 1180 70, 1240 40" />
                </svg>
              </div>
              <div className="cta2__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/study-in-dubai/media/Banner_Dubai (1).webp"
                  alt="Smiling student with a backpack and laptop"
                  loading="lazy"
                />
              </div>
              <div className="cta2__body">
                <span className="cta2__tag">
                  <svg aria-hidden="true">
                    <use href="#i-pin" />
                  </svg>
                  Study in Dubai
                </span>
                <h2 className="cta2__title">
                  Your Dubai journey <br />
                  <em>starts with a call.</em>
                </h2>
                <p className="cta2__text">
                  Speak to a Learntech counsellor for expert guidance on universities, courses and admissions, and take the
                  first step towards studying in Dubai.
                </p>
                <div className="cta2__actions">
                  <a className="cta2__btn" href="tel:+971504955123">
                    <svg aria-hidden="true">
                      <use href="#i-phone" />
                    </svg>
                    Call a Counsellor
                  </a>
                  <div className="cta2__social">
                    <small>Follow us</small>

                    {/* Instagram */}
                    <a
                      className="cta2__soc"
                      href="https://www.instagram.com/learntechedus/"
                      aria-label="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
                      </svg>
                    </a>

                    {/* YouTube */}
                    <a
                      className="cta2__soc"
                      href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w"
                      aria-label="YouTube"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="4" />
                        <path d="M10 9l5 3-5 3z" fill="currentColor" />
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      className="cta2__soc"
                      href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 10v7M11 17v-7M11 13a3 3 0 0 1 6 0v4" />
                        <circle cx="7" cy="6.8" r=".8" fill="currentColor" />
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      className="cta2__soc"
                      href="https://www.facebook.com/learntechedu"
                      aria-label="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 4h-2.5A3.5 3.5 0 0 0 9 7.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7.8c0-.5.4-.8.8-.8H15z" />
                      </svg>
                    </a>

                    {/* X (Twitter) */}
                    <a
                      className="cta2__soc"
                      href="https://twitter.com/learntechww"
                      aria-label="X (Twitter)"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h4l12 16h-4L4 4zM4 20l6.5-7M20 4l-6.5 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* No-JS fallback for reveal animation */}
      <noscript>
        <style>{'.reveal,.is-in{opacity:1!important;transform:none!important}'}</style>
      </noscript>

      {/* Client island */}
      <StudyInDubaiBehaviorsClient />
    </>
  )
}

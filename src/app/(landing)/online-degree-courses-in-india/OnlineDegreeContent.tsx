import React from 'react'
import OnlineDegreeBehaviorsClient from './OnlineDegreeBehaviorsClient'
import { FAQ_DATA } from './OnlineDegreeFaqData'
import {
  PARTNERS,
  AI_TRENDING_COURSES,
  PROGRAMMES,
  COLLEGE_LOGOS,
  COURSE_FINDER_FIELDS,
  COURSE_FINDER_LEVELS,
  COURSE_FINDER_RESULTS,
  PLACEMENTS_ROW1,
  PLACEMENTS_ROW2,
  HOW_IT_WORKS_STEPS,
  TESTIMONIALS,
  type Programme,
} from './OnlineDegreeData'

const NAV_LINKS = [
  { id: 'aiCourses', label: 'AI Courses' },
  { id: 'browse', label: 'Programmes' },
  { id: 'course-finder', label: 'Course Finder' },
  { id: 'partners', label: 'Partners' },
  { id: 'process', label: 'How It Works' },
  { id: 'faq', label: 'FAQs' },
]

const PHONE_PATH =
  'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'

const PROGRAMME_ICONS: Record<Programme['icon'], React.ReactNode> = {
  biz: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18M11 13h2" />
    </>
  ),
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  calc: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16l-1 4z" />
      <path d="M14 7l3 3" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6l-5 10a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-10V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  book: <path d="M4 19V5a2 2 0 0 1 2-2h13v14H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h13" />,
}

const CHECK_ICON = (
  <svg className="course-finder__option-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3 8.5 3.2 3L13 4.5" />
  </svg>
)

const CHEVRON_ICON = (
  <svg className="course-finder__chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m2 4 4 4 4-4" />
  </svg>
)

// "Online MBA" + "Master of Business Administration in Marketing" → "Online MBA in Marketing" (matches enquiry form options)
const programmeHint = (p: Programme) => {
  const idx = p.degree.indexOf(' in ')
  return idx > -1 && p.cat === 'pg' ? `${p.name}${p.degree.slice(idx)}` : p.name
}

const collegeName = (key: string) => key.replace(/_/g, ' ')

export default function OnlineDegreeContent() {
  return (
    <>
      {/* ============================================================
           NAVBAR
           ============================================================ */}
      <header className="nv" id="nv">
        <div className="nv-scrim" id="nvScrim" aria-hidden="true" />

        <div className="nv-pill">
          <a href="#top" className="nv-logo" aria-label="Learntech home">
            {/* SVG sized per breakpoint by the design CSS; next/image adds nothing for a vector logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/online-degree/media/LT.svg" alt="Learntech" width={150} height={40} fetchPriority="high" />
          </a>

          <a href="tel:+919606949066" className="nv-call" aria-label="Call us for free counselling">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={PHONE_PATH} />
            </svg>
            <i className="nv-cta__dot" />
          </a>

          <button className="nv-toggle" id="nvToggle" type="button" aria-expanded="false" aria-controls="nvPanel" aria-label="Open menu">
            <span className="nv-toggle__l" />
            <span className="nv-toggle__l" />
          </button>

          <div className="nv-panel" id="nvPanel">
            <div className="nv-panel__in">
              <nav className="nv-nav" aria-label="Main">
                <ul className="nv-links" id="nvLinks">
                  <li className="nv-ind" id="nvInd" aria-hidden="true" />
                  {NAV_LINKS.map((l, i) => (
                    <li key={l.id}>
                      <a className="nv-link" href={`#${l.id}`} data-spy={l.id} style={{ '--i': i } as React.CSSProperties}>
                        <span data-t={l.label}>{l.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <a href="tel:+919606949066" className="nv-cta" aria-label="Call +91 96069 49066">
                <span className="nv-cta__ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={PHONE_PATH} />
                  </svg>
                  <i className="nv-cta__dot" />
                </span>
                <span className="nv-cta__t">
                  <small>Toll free</small>
                  <b>Talk to an expert</b>
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Float Buttons */}
      <a
        href="https://wa.me/+919606949066"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <i className="bi bi-whatsapp" />
      </a>
      <a
        href="tel:+919606949066"
        className="phone-float"
        aria-label="Call us"
      >
        <i className="bi bi-telephone-fill" />
      </a>

      <main>
      {/* ============================================================
           HERO
           ============================================================ */}
      <section className="hero" id="hero">
        <div className="floaters" aria-hidden="true">
          <div className="glow" style={{ width: 380, height: 230, left: '-50px', top: '18%', background: 'rgba(233,60,71,.2)' }} />
          <div className="glow" style={{ width: 400, height: 340, right: '-60px', bottom: '8%', background: 'rgba(39,72,150,.22)' }} />

          {/* Profile cards */}
          <div className="pcard px" style={{ '--s': 0.55, left: '5%', top: '24%' } as React.CSSProperties}>
            <div className="who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://i.pravatar.cc/100?img=47" alt="Aarav - Working Professional" width={34} height={34} />
              <div>
                <b>Aarav</b>
                <small>Working Professional</small>
              </div>
            </div>
            <p>
              Ready to move into management with an <strong>Online MBA</strong>
            </p>
          </div>

          <div className="pcard px" style={{ '--s': -0.5, right: '5%', top: '56%' } as React.CSSProperties}>
            <div className="who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://i.pravatar.cc/100?img=12" alt="Priya - Commerce Graduate" width={34} height={34} />
              <div>
                <b>Priya</b>
                <small>Commerce Graduate</small>
              </div>
            </div>
            <p>
              Exploring a tech career with an <strong>Online BCA</strong>
            </p>
          </div>

          {/* Avatars */}
          <div className="fav px" style={{ '--s': -1.15, left: '1%', top: '15%' } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/100?img=11" alt="Student profile avatar" width={38} height={38} />
          </div>
          <div className="fav px" style={{ '--s': 0.9, right: '4%', top: '17%' } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/100?img=32" alt="Student profile avatar" width={38} height={38} />
          </div>
          <div className="fav px" style={{ '--s': 1.35, left: '9%', bottom: '13%' } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/100?img=44" alt="Student profile avatar" width={38} height={38} />
          </div>
          <div className="fav px" style={{ '--s': -1.25, right: '9%', bottom: '15%' } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/100?img=5" alt="Student profile avatar" width={38} height={38} />
          </div>

          {/* Course pop-ups */}
          <div className="mini px" style={{ '--s': 1.45, right: '6%', top: '34%' } as React.CSSProperties}>
            <small>Recommended for you</small>
            <b>Online MBA</b>
          </div>
          <div className="mini px" style={{ '--s': -1.35, left: '7%', bottom: '28%' } as React.CSSProperties}>
            <small>Shortlisted</small>
            <b>BCA in AI and Data Science</b>
          </div>
        </div>

        <div className="shell hc">
          <h1>
            Find the right <span className="cw" id="cw">Programme</span>, for the career you want.
          </h1>
          <p className="hd">
            Discover online programmes from leading universities and take the next step towards your
            career with the right career guidance for students.
          </p>
          <div className="ha">
            <a href="#cta" className="btn btn-p open-enquiry-popup" data-enquiry-trigger>
              Explore Programmes ⟶
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
           ABOUT
           ============================================================ */}
      <section className="alt" style={{ marginBottom: 80, paddingInline: 20 }} id="about">
        <div className="shell">
          <div className="sh rv">
            <div className="lab">— About</div>
            <h2 className="st">About Learntech Edu Solutions</h2>
            <p className="sd">
              Choosing an online programme should not feel like guesswork. We help you find an
              accredited course that fits your goals, your budget and your routine, and we support you, right from
              the point of career guidance after 12th until the day you graduate college.
            </p>
          </div>
          <div className="ab">
            <div className="abi rv">
              <div className="orb" style={{ '--c1': '#f26a75', '--c2': '#d9b6f0' } as React.CSSProperties}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                    <path d="M2.5 6L8 4l5.5 2L11 7.5V9s-.667-.5-3-.5S5 9 5 9V7.5zm0 0v4" />
                    <path d="M11 8.5v.889c0 1.718-1.343 3.111-3 3.111s-3-1.393-3-3.111V8.5m10.318 2.53s.485-.353 2.182-.353s2.182.352 2.182.352m-4.364 0V10L13.5 9l4-1.5l4 1.5l-1.818 1v1.03m-4.364 0v.288a2.182 2.182 0 1 0 4.364 0v-.289M4.385 15.926c-.943.527-3.416 1.602-1.91 2.947C3.211 19.53 4.03 20 5.061 20h5.878c1.03 0 1.85-.47 2.586-1.127c1.506-1.345-.967-2.42-1.91-2.947c-2.212-1.235-5.018-1.235-7.23 0M16 20h3.705c.773 0 1.387-.376 1.939-.902c1.13-1.076-.725-1.936-1.432-2.357A5.34 5.34 0 0 0 16 16.214" />
                  </g>
                </svg>
              </div>
              <h3>1,00,000+ students</h3>
              <p>Guided towards the right course and college, with advice built around each student.</p>
            </div>
            <div className="abi rv">
              <div className="orb" style={{ '--c1': '#7d8fe8', '--c2': '#cfd6f7' } as React.CSSProperties}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <path fill="currentColor" stroke="currentColor" strokeWidth="0.25" strokeLinejoin="round" d="M23.66 5.06a1 1 0 0 1 .788.045l20 10A1 1 0 0 1 44 17H4a1 1 0 0 1-.447-1.895l20-10zM8.237 15h31.527L24 7.118zM42 19a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2zm0 18a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2zm2 4a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2z" />
                  <path fill="currentColor" stroke="currentColor" strokeWidth="0.25" strokeLinejoin="round" d="M12 20v18h-2V20zm8 0v18h-2V20zm10 0v18h-2V20zm8 0v18h-2V20z" />
                </svg>
              </div>
              <h3>1,000+ partner institutions</h3>
              <p>A wide network of colleges and universities to choose from.</p>
            </div>
            <div className="abi rv">
              <div className="orb" style={{ '--c1': '#ff9a3c', '--c2': '#ffd58a' } as React.CSSProperties}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1.75A10.25 10.25 0 1 0 22.25 12" />
                  <path d="M12 5.95A6.05 6.05 0 1 0 18.05 12" />
                  <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                  <path d="M12.85 11.15 20.6 3.4" />
                  <path d="M20.2 7.2 17.2 6.8 16.8 3.8" />
                  <path d="M22.4 5 19.4 4.6 19 1.6" />
                </svg>
              </div>
              <h3>30+ years of experience</h3>
              <p>Deep knowledge of admissions, courses and career counselling for students, built over time.</p>
            </div>
            <div className="abi rv">
              <div className="orb" style={{ '--c1': '#3fc4a8', '--c2': '#bfeadf' } as React.CSSProperties}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="7.5" width="19" height="13" rx="2.5" />
                  <path d="M8.5 7.5V6A2 2 0 0 1 10.5 4h3a2 2 0 0 1 2 2v1.5" />
                  <path d="M12 10.6l.85 2.23 2.38.12-1.85 1.5.62 2.3L12 15.45l-2 1.3.62-2.3-1.85-1.5 2.38-.12z" />
                </svg>
              </div>
              <h3>Since 1994</h3>
              <p>A long-standing name in education, trusted by students and families.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           TRENDING AI COURSES
           ============================================================ */}
      <section id="aiCourses" aria-labelledby="aicTitle">
        <canvas className="aic-bg" aria-hidden="true" />

        <div className="shell">
          <div className="aic-head">
            <div className="sh">
              <div className="lab">— Future-ready skills</div>
              <h2 className="st" id="aicTitle">Trending Courses</h2>
              <p className="sd">
                Explore online AI programmes from our trusted university partners, covering artificial
                intelligence, machine learning and emerging technologies to support your career growth.
              </p>
            </div>
          </div>

          <div className="aic-grid">
            {AI_TRENDING_COURSES.map((course, idx) => (
              <article
                className={`aic-card ${course.isFeatured ? 'is-featured' : ''}`}
                style={{ '--i': idx } as React.CSSProperties}
                data-course-name={course.enquiryCourse}
                key={course.title}
              >
                <span className="aic-logo" title={course.logoAlt}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.logo} alt={course.logoAlt} loading="lazy" draggable="false" />
                </span>
                <div className="aic-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.image} alt={course.title} loading="lazy" draggable="false" />
                </div>
                <div className="aic-body">
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                  <div className="aic-meta">
                    <div>
                      <small>Duration</small>
                      <b>{course.duration}</b>
                    </div>
                    <div>
                      <small>Fees</small>
                      <b>{course.fees}</b>
                    </div>
                  </div>
                  <a href="#cta" className="aic-btn" data-enquiry-trigger>
                    <span>Enquire Now</span>
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           PROGRAMMES — all cards server-rendered; filter + slider are client behaviours
           ============================================================ */}
      <section id="browse">
        <div className="shell">
          <div className="sh">
            <div className="sh-left">
              <div className="lab">— Programmes</div>
              <h2 className="st">Programmes</h2>
              <p className="sd">
                There are a plethora of courses offered by various institutions which cater to the
                growing needs of the students, from the undergraduate to postgraduate level.
              </p>
            </div>
            <div className="chw">
              <div className="chips" id="pcF" role="tablist" aria-label="Filter programmes">
                <button type="button" className="chip on" data-f="all" role="tab" aria-selected="true">All</button>
                <button type="button" className="chip" data-f="ug" role="tab" aria-selected="false">UG Programmes</button>
                <button type="button" className="chip" data-f="pg" role="tab" aria-selected="false">PG Programmes</button>
              </div>
              <button type="button" className="chn l" aria-label="Scroll left" hidden>‹</button>
              <button type="button" className="chn r" aria-label="Scroll right" hidden>›</button>
            </div>
          </div>

          <div className="trk" id="pcT">
            <div className="rail" id="pcR">
              {PROGRAMMES.map((c) => (
                <article className="pc pgc" data-cat={c.cat} data-course-name={programmeHint(c)} key={`${c.name}-${c.degree}`}>
                  <span className="pg-edge" aria-hidden="true" />
                  <span className="pg-tag">{c.tag}</span>
                  <div className="pc-head">
                    <span className="pc-ico">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {PROGRAMME_ICONS[c.icon]}
                      </svg>
                    </span>
                    <h3>
                      {c.name}
                      <span>{c.degree}</span>
                    </h3>
                  </div>
                  <div className="pg-rows">
                    <div className="pg-row">
                      <small>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                        Duration
                      </small>
                      <b>{c.dur}</b>
                    </div>
                    <div className="pg-row">
                      <small>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="3" y="6" width="18" height="12" rx="2" />
                          <circle cx="12" cy="12" r="2.5" />
                        </svg>
                        Fees
                      </small>
                      <b>{c.fees}</b>
                    </div>
                    <div className="pg-row cl">
                      <small>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 10l9-5 9 5-9 5-9-5z" />
                          <path d="M7 12.5V17c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-4.5" />
                        </svg>
                        Colleges
                      </small>
                      <div className="pg-logos">
                        {c.colleges.map((key) => (
                          <span className="pg-lg" title={collegeName(key)} key={key}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={COLLEGE_LOGOS[key]} alt={collegeName(key)} width={40} height={40} loading="lazy" draggable="false" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <a href="#cta" className="pg-btn" draggable="false" data-enq>
                    <span className="pg-label">Enquire Now</span>
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </i>
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="ctl" id="pcC">
            <div className="arrs">
              <button type="button" className="arr" id="pcP" aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <button type="button" className="arr" id="pcN" aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           CTA BANNER
           ============================================================ */}
      <section className="cta-banner" aria-labelledby="cta-banner-title">
        <svg className="cta-banner__defs" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter id="cta-banner-grain" filterUnits="userSpaceOnUse" x="-4" y="-4" width="48" height="48" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves={2} seed={7} result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
              <feComposite in="mono" in2="SourceAlpha" operator="in" result="grain" />
              <feBlend in="grain" in2="SourceGraphic" mode="overlay" />
            </filter>
          </defs>
        </svg>

        <span className="cta-banner__glow cta-banner__glow--blue" aria-hidden="true" />
        <span className="cta-banner__glow cta-banner__glow--red" aria-hidden="true" />

        <div className="cta-banner__inner">
          <h2 className="cta-banner__title" id="cta-banner-title">
            <span className="cta-banner__nw">
              Learn{' '}
              <span className="cta-banner__obj" aria-hidden="true">
                <svg className="cta-banner__svg" viewBox="0 0 40 40">
                  <defs>
                    <linearGradient id="cta-banner-grad-red-a" gradientUnits="userSpaceOnUse" x1="6" y1="6" x2="36" y2="36">
                      <stop offset="0" stopColor="#e93c47" />
                      <stop offset=".35" stopColor="#ee5b64" />
                      <stop offset="1" stopColor="#ffd3d6" />
                    </linearGradient>
                  </defs>
                  <g filter="url(#cta-banner-grain)">
                    <g className="cta-banner__quatrefoil" fill="url(#cta-banner-grad-red-a)">
                      <rect x="11" y="11" width="18" height="18" />
                      <circle cx="11" cy="11" r="9" />
                      <circle cx="29" cy="11" r="9" />
                      <circle cx="11" cy="29" r="9" />
                      <circle cx="29" cy="29" r="9" />
                    </g>
                  </g>
                </svg>
              </span>
            </span>{' '}

            <span className="cta-banner__nw">
              Online.{' '}
              <span className="cta-banner__obj" aria-hidden="true">
                <svg className="cta-banner__svg" viewBox="0 0 40 40">
                  <defs>
                    <linearGradient id="cta-banner-grad-blue-a" gradientUnits="userSpaceOnUse" x1="7" y1="20" x2="33" y2="20">
                      <stop offset="0" stopColor="#b8c9f6" />
                      <stop offset="1" stopColor="#274896" />
                    </linearGradient>
                  </defs>
                  <g filter="url(#cta-banner-grain)">
                    <rect className="cta-banner__diamond" x="7" y="7" width="26" height="26" rx="2.5" fill="url(#cta-banner-grad-blue-a)" />
                  </g>
                </svg>
              </span>
            </span>{' '}
            Grow{' '}
            <span className="cta-banner__nw">
              Further.{' '}
              <span className="cta-banner__obj" aria-hidden="true">
                <svg className="cta-banner__svg" viewBox="0 0 40 40">
                  <defs>
                    <linearGradient id="cta-banner-grad-red-b" gradientUnits="userSpaceOnUse" x1="4" y1="4" x2="36" y2="36">
                      <stop offset="0" stopColor="#e93c47" />
                      <stop offset=".4" stopColor="#ee5b64" />
                      <stop offset="1" stopColor="#ffd3d6" />
                    </linearGradient>
                  </defs>
                  <g filter="url(#cta-banner-grain)">
                    <g className="cta-banner__halves" fill="url(#cta-banner-grad-red-b)">
                      <path className="cta-banner__half cta-banner__half--left" d="M4 4A16 16 0 0 1 20 20A16 16 0 0 1 4 36Z" />
                      <path className="cta-banner__half cta-banner__half--right" d="M36 4A16 16 0 0 0 20 20A16 16 0 0 0 36 36Z" />
                    </g>
                  </g>
                </svg>
              </span>
            </span>{' '}
            Shape Your{' '}
            <span className="cta-banner__nw">
              Future.{' '}
              <span className="cta-banner__obj" aria-hidden="true">
                <svg className="cta-banner__svg" viewBox="0 0 40 40">
                  <defs>
                    <linearGradient id="cta-banner-grad-blue-b" gradientUnits="userSpaceOnUse" x1="20" y1="4" x2="20" y2="34">
                      <stop offset="0" stopColor="#b8c9f6" />
                      <stop offset=".55" stopColor="#4a6bc4" />
                      <stop offset="1" stopColor="#274896" />
                      <animateTransform attributeName="gradientTransform" type="rotate" from="0 20 20" to="360 20 20" dur="7s" repeatCount="indefinite" />
                    </linearGradient>
                  </defs>
                  <g filter="url(#cta-banner-grain)">
                    <circle className="cta-banner__sphere" cx="20" cy="20" r="16" fill="url(#cta-banner-grad-blue-b)" />
                  </g>
                </svg>
              </span>
            </span>
          </h2>

          <p className="cta-banner__text">Explore online programmes from our trusted educational partners.</p>

          <a
            href="#cta"
            data-enquiry-trigger
            className="cta-banner__btn open-enquiry-popup"
            aria-label="Open enquiry form"
          >
            <svg className="cta-banner__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </div>
      </section>

      {/* ============================================================
           COURSE FINDER — every recommendation is in the HTML; the client toggles `hidden`
           ============================================================ */}
      <section className="course-finder" id="course-finder" data-course-finder aria-labelledby="course-finder-title">
        <div className="course-finder__backdrop" aria-hidden="true">
          <span className="course-finder__blob course-finder__blob--blue" />
          <span className="course-finder__blob course-finder__blob--red" />
        </div>

        <div className="course-finder__inner">
          <header className="course-finder__header">
            <div className="lab" style={{ textAlign: 'center' }}>04 — Course Finder</div>
            <h2 className="course-finder__title" id="course-finder-title">We’ll Name the Programme for You</h2>
            <p className="course-finder__note">
              Choose from our pre-determined options on the basis of your preference and see which course best
              suits your planned career path!
            </p>
          </header>

          <div className="course-finder__sentence">
            <span className="course-finder__text">I want to build a career in</span>{' '}
            <div className="course-finder__dropdown" data-dropdown="field">
              <button className="course-finder__trigger" type="button" id="cf-trigger-field" aria-haspopup="listbox" aria-expanded="false" aria-controls="cf-menu-field" aria-label="Field of career">
                <span className="course-finder__trigger-label">Business</span>
                {CHEVRON_ICON}
              </button>
              <ul className="course-finder__menu" id="cf-menu-field" role="listbox" tabIndex={-1} aria-labelledby="cf-trigger-field">
                {COURSE_FINDER_FIELDS.map((o) => (
                  <li className="course-finder__option" role="option" id={`cf-opt-${o.value}`} data-value={o.value} aria-selected={o.value === 'business'} key={o.value}>
                    <span className="course-finder__option-text">{o.label}</span>
                    {CHECK_ICON}
                  </li>
                ))}
              </ul>
            </div>
            ,{' '}
            <span className="course-finder__text">I’m</span>{' '}
            <div className="course-finder__dropdown" data-dropdown="level">
              <button className="course-finder__trigger" type="button" id="cf-trigger-level" aria-haspopup="listbox" aria-expanded="false" aria-controls="cf-menu-level" aria-label="Your education level">
                <span className="course-finder__trigger-label">a Graduate</span>
                {CHEVRON_ICON}
              </button>
              <ul className="course-finder__menu" id="cf-menu-level" role="listbox" tabIndex={-1} aria-labelledby="cf-trigger-level">
                {COURSE_FINDER_LEVELS.map((o) => (
                  <li className="course-finder__option" role="option" id={`cf-opt-${o.value}`} data-value={o.value} aria-selected={o.value === 'graduate'} key={o.value}>
                    <span className="course-finder__option-text">{o.label}</span>
                    {CHECK_ICON}
                  </li>
                ))}
              </ul>
            </div>
            , and I can give it about 8 hours a week.
          </div>

          <div className="course-finder__card">
            <div className="course-finder__result-bar">
              <div className="course-finder__result-text" aria-live="polite">
                <p className="course-finder__result-label">
                  <span className="course-finder__result-dot" aria-hidden="true" />
                  Recommendation
                </p>
                <div className="course-finder__results">
                  {COURSE_FINDER_RESULTS.map((r) => (
                    <h3
                      className="course-finder__result"
                      data-field={r.field}
                      data-level={r.level}
                      hidden={!(r.field === 'business' && r.level === 'graduate')}
                      key={`${r.field}-${r.level}`}
                    >
                      <span className="course-finder__result-name">{r.name}</span>
                    </h3>
                  ))}
                </div>
              </div>

              <a className="course-finder__cta" href="#get-free-counselling">
                <span className="course-finder__cta-roll">
                  <span className="course-finder__cta-label">Contact Our Counsellors</span>
                  <span className="course-finder__cta-label course-finder__cta-label--clone" aria-hidden="true">
                    Contact Our Counsellors
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           PARTNERS
           ============================================================ */}
      <section className="sec" id="partners">
        <div className="sh rv" style={{ textAlign: 'center', alignItems: 'center' }}>
          <div className="lab" style={{ textAlign: 'center' }}>— Partners</div>
          <h2 className="st" style={{ textAlign: 'center' }}>Our Partners</h2>
          <p className="sd" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            Explore our trusted academic partners and discover the institutions that align with your educational
            goals and career aspirations!
          </p>
        </div>
        <div className="shell">
          <div className="pt rv">
            {PARTNERS.map((p) => (
              <div className="ptc" key={p.name}>
                <div className="ptl" data-m={p.mark}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt={p.name} loading="lazy" />
                </div>
                <div className="ptb">
                  <h3>{p.name}</h3>
                  <div className="ptm">
                    <small>{p.badge}</small>
                  </div>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           LOGO WALL / PLACEMENTS
           ============================================================ */}
      <section className="sec alt" id="trusted">
        <div className="lw">
          <div className="lwc rv">
            <div className="cp">
              <div className="lab">— Career Pathways</div>
              <h2>Placements</h2>
              <p>
                Build career readiness through industry relevant learning and explore placement opportunities
                available through your chosen university.
              </p>
            </div>
            <div className="stg">
              <div className="sl">
                <div className="lr">
                  <div className="ltk">
                    {/* second copy makes the CSS marquee loop seamlessly */}
                    {[...PLACEMENTS_ROW1, ...PLACEMENTS_ROW1].map((c, i) => (
                      <div className="lt" key={i} aria-hidden={i >= PLACEMENTS_ROW1.length || undefined}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.img} alt={c.name} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lr rev">
                  <div className="ltk">
                    {[...PLACEMENTS_ROW2, ...PLACEMENTS_ROW2].map((c, i) => (
                      <div className="lt" key={i} aria-hidden={i >= PLACEMENTS_ROW2.length || undefined}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.img} alt={c.name} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           HOW IT WORKS
           ============================================================ */}
      <section className="hw" id="process">
        <div className="shell hw-grid">
          <div className="hw-head">
            <div className="lab">— How It Works</div>
            <h2 className="st">How Learntech Online Can Help You</h2>
            <p className="hw-sub">
              From shortlisting to joining your first class in four steps - take a look at how easy
              it is to choose your programme.
            </p>
            <ul className="hw-nav" id="hwNav">
              <li className="on">
                <b>01</b>Explore &amp; compare
              </li>
              <li>
                <b>02</b>Talk to an expert
              </li>
              <li>
                <b>03</b>Apply online
              </li>
              <li>
                <b>04</b>Start learning
              </li>
            </ul>
            <div className="hw-bar">
              <i id="hwBar" />
            </div>
          </div>

          <div id="hwStack">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <article
                className={`hw-card c${idx + 1}`}
                style={{ '--i': idx } as React.CSSProperties}
                key={step.num}
              >
                <span className="hw-ghost">{step.num}</span>
                <div className="hw-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                <div className="hw-vis">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.img}
                    alt={step.alt}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 'inherit' }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           TESTIMONIALS
           ============================================================ */}
      <section className="sec tsec" id="testimonials">
        <div className="shell">
          <div className="sh rv">
            <div className="lab">— Testimonials</div>
            <h2 className="st">Our Students’ Voices</h2>
            <p className="sd">
              Discover how learners describe their academic journeys and the role online education plays
              in their personal and professional growth.
            </p>
          </div>
        </div>
        <div className="tmq" id="tmq">
          <div className="ttk" id="ttk">
            {TESTIMONIALS.map((t) => (
              <article className="tm" key={t.name + t.meta}>
                <div className="tt">
                  <span className="qm">“</span>
                  <span className="pill o">{t.badge}</span>
                </div>
                <p>{t.text}</p>
                <div className="tp">
                  <span className="av" aria-hidden="true" />
                  <div>
                    <b>{t.name}</b>
                    <small>{t.meta}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           FAQ
           ============================================================ */}
      <section className="sec alt" id="faq">
        <div className="shell">
          <div className="faq-split">
            <div className="faq-left">
              <div className="sh">
                <div className="lab">— FAQs</div>
                <h2 className="st">Frequently asked questions</h2>
                <p className="sd">Read up on the most pertinent queries that a student usually asks.</p>
              </div>
            </div>

            <div className="fql">
              {FAQ_DATA.map((f) => (
                <div className="fq" key={f.q}>
                  <button type="button" className="fqb" aria-expanded="false">
                    {f.q}
                    <i aria-hidden="true">+</i>
                  </button>
                  <div className="fqa">
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* ============================================================
           FOOTER
           ============================================================ */}
      <footer className="ftr">
        {/* SVG sprite */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
          <symbol id="i-mail" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </symbol>
          <symbol id="i-phone" viewBox="0 0 24 24">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1z" />
          </symbol>
          <symbol id="i-facebook" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </symbol>
          <symbol id="i-linkedin" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </symbol>
          <symbol id="i-x" viewBox="0 0 24 24">
            <path d="M4 4l11.733 16H20L8.267 4z" />
            <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
          </symbol>
          <symbol id="i-instagram" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <path d="M17.5 6.5h.01" />
          </symbol>
          <symbol id="i-youtube" viewBox="0 0 24 24">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <path d="m9.75 15.02 5.75-3.27-5.75-3.27z" />
          </symbol>
        </svg>

        <div className="onl" id="onl" role="img" aria-label="Online">
          <span className="om" style={{ '--i': 0 } as React.CSSProperties}><span className="ol">O</span></span>
          <span className="om" style={{ '--i': 1 } as React.CSSProperties}><span className="ol">N</span></span>
          <span className="om" style={{ '--i': 2 } as React.CSSProperties}><span className="ol">L</span></span>
          <span className="om" style={{ '--i': 3 } as React.CSSProperties}><span className="ol">I</span></span>
          <span className="om" style={{ '--i': 4 } as React.CSSProperties}><span className="ol">N</span></span>
          <span className="om" style={{ '--i': 5 } as React.CSSProperties}><span className="ol">E</span></span>
        </div>

        <div className="shell">
          <div className="fg">
            {/* Brand */}
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ftr-logo" src="/images/online-degree/media/Learntech_White.svg" alt="Learntech" width={170} height={42} />
              <p className="ftr-about">
                Learntech Online helps students explore online programmes and make informed academic and career decisions.
              </p>

              <div className="ftr-social">
                <span className="ftr-social__label">Follow us on</span>
                <ul className="ftr-social__list">
                  <li>
                    <a href="https://www.facebook.com/learntechedu" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <svg aria-hidden="true"><use href="#i-facebook" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <svg aria-hidden="true"><use href="#i-linkedin" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/learntechww" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                      <svg aria-hidden="true"><use href="#i-x" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/learntechedus" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg aria-hidden="true"><use href="#i-instagram" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                      <svg aria-hidden="true"><use href="#i-youtube" /></svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Partners */}
            <div>
              <h5>PARTNERS</h5>
              <ul className="ftr-links">
                <li><a href="#partners">Amrita Vishwa Vidyapeetham Online</a></li>
                <li><a href="#partners">Alliance University Online</a></li>
                <li><a href="#partners">CHRIST (Deemed to be University) Online</a></li>
                <li><a href="#partners">Chandigarh University Online</a></li>
              </ul>
            </div>

            {/* Programmes */}
            <div>
              <h5>PROGRAMMES</h5>
              <ul className="ftr-links">
                <li><a href="#browse">Online BBA</a></li>
                <li><a href="#browse">Online BCA</a></li>
                <li><a href="#browse">Online MBA</a></li>
                <li><a href="#browse">Online MCA</a></li>
                <li><a href="#browse">Online M.Sc</a></li>
                <li><a href="#browse">Online MA</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5>CONTACT US</h5>
              <ul className="ftr-links">
                <li>
                  <a href="mailto:info@learntechww.com">
                    <svg aria-hidden="true"><use href="#i-mail" /></svg>
                    info@learntechww.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919606949066">
                    <svg aria-hidden="true"><use href="#i-phone" /></svg>
                    +91 96069 49066
                  </a>
                </li>
                <li>
                  <a href="tel:18001208696">
                    <svg aria-hidden="true"><use href="#i-phone" /></svg>
                    1800 120 8696 (Toll Free)
                  </a>
                </li>
                <li>
                  <a href="tel:08026631169">
                    <svg aria-hidden="true"><use href="#i-phone" /></svg>
                    080-26631169
                  </a>
                </li>
                <li>
                  <a href="tel:08022454991">
                    <svg aria-hidden="true"><use href="#i-phone" /></svg>
                    080-22454991
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="fb">
            <span>© 2026 Learntech Edu Solutions Pvt. Ltd., Bengaluru. All Rights Reserved.</span>
          </div>
        </div>
      </footer>

      <button type="button" id="backToTop" aria-label="Back to top" title="Back to top">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Without JS the reveal-on-scroll content would stay invisible */}
      <noscript>
        <style>{'.rv,.aic-card,.pc,.hw-card,.course-finder *{opacity:1!important;transform:none!important}'}</style>
      </noscript>

      <OnlineDegreeBehaviorsClient />
    </>
  )
}

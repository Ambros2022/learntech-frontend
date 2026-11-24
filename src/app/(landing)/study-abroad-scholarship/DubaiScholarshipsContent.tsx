/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { PROGRAMMES } from './DubaiScholarshipsData'
import DubaiScholarshipsBehaviorsClient from './DubaiScholarshipsBehaviorsClient'

const INITIAL_COURSES = PROGRAMMES.filter(p => p.college === 's')

const SVG_PATHS: Record<string, string> = {
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2"/>',
  pen: '<path d="M4 20l4-1 11-11-3-3L5 16l-1 4zM14 7l3 3"/>',
  biz: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5-10-5zM6 11v5c3 2 9 2 12 0v-5"/>',
  mind: '<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"/>',
  ok: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  go: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
}

function renderIcon(key: string) {
  const inner = SVG_PATHS[key] || SVG_PATHS.cap
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  )
}

export default function DubaiScholarshipsContent() {
  return (
    <>
      <DubaiScholarshipsBehaviorsClient />
      

    {/* ===================== HEADER ===================== */}
    <header id="hd">
        <div className="w nav">
            <a className="logo" href="#top" aria-label="Learntech Scholar">
                <img className="lg-w" src="/images/dubai-scholarships/Media/Logo/Learntech_White.svg" alt="Learntech - Anchoring your future"
                    width="222" height="52" />
                <img className="lg-d" src="/images/dubai-scholarships/Media/Logo/LT.svg" alt="Learntech Logo" width="222" height="52" aria-hidden="true" />
            </a>
            <button className="mb" aria-expanded="false" aria-controls="nv"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
            <nav id="nv">
                <div className="dd">
                    <button className="nb" aria-haspopup="true">Scholarships</button>
                    <div className="dd-m">
                        <a href="#by-college">&#9679; By University</a>
                        <a href="#by-course">&#9679; By Course</a>
                    </div>
                </div>
                <a href="#eligibility">Eligibility</a>
                <a href="#why">Why Dubai</a>
                <a href="#compare">Compare</a>
                <a href="#admission">Admission Support</a>
                <a href="#faq">FAQs</a>
                <a className="expert-btn" href="tel:+971 50 495 5123">
                    <div className="icon-wrapper">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                                fill="#e63946" />
                        </svg>
                        <div className="status-dot"></div>
                    </div>
                    <div className="text-content">
                        <span className="text-sub">Toll free</span>
                        <span className="text-main">Talk to an expert</span>
                    </div>
                </a>
            </nav>
        </div>
    </header>

    <main id="top">

        {/* ===================== HERO ===================== */}
        <div className="hero">
            <div className="hero-in">
                <div className="hero-copy">
                    <p className="hero-eyebrow rise">Study in UAE</p>
                    <h1 className="rise r2">
                        <span className="hero-up">Get up to</span>
                        <span className="hero-row"><span className="hero-num">50<sup>%</sup></span><span
                                className="hero-sch">scholarship</span></span>
                    </h1>
                    <p className="hero-lead rise r3">Towards your dream degree at leading universities in Dubai.</p>
                    <div className="rise r4" style={{"display":"flex","alignItems":"center","gap":"12px","flexWrap":"wrap","fontSize":"16px"}}>
                        <a className="b hero-cta" href="#by-course">Explore programmes</a><a
                            className="b hero-cta hero-enquire open-popup" href="#by-course">Enquire</a>
                    </div>
                </div>
            </div>

            <div className="w hero-tk">
                <div className="tick" role="region" aria-label="Recent scholarships">
                    <div className="tick-l">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M10 3l1.6 4.9L16.5 9.5l-4.9 1.6L10 16l-1.6-4.9L3.5 9.5l4.9-1.6L10 3z" />
                            <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14z" />
                        </svg>
                        <span>Recent<br />Scholarships</span>
                    </div>
                    <div className="tick-r" id="tk">
                        <div className="tk-track" id="tkt">
                            <div className="tk-c"><span className="tk-a" style={{"--bg-c":"#1C1C28","--fg-c":"#fff"} as React.CSSProperties}>SI</span>
                                <div><b>Aarav Sharma</b><small><i>AED 20,000</i>Symbiosis International University,
                                        Dubai</small></div>
                            </div>
                            <div className="tk-c"><span className="tk-a" style={{"--bg-c":"#D4155F","--fg-c":"#fff"} as React.CSSProperties}>BP</span>
                                <div><b>Priya Menon</b><small><i>AED 25,000</i>BITS Pilani, Dubai Campus</small></div>
                            </div>
                            <div className="tk-c"><span className="tk-a" style={{"--bg-c":"#1C1C28","--fg-c":"#fff"} as React.CSSProperties}>SI</span>
                                <div><b>Rohan Kapoor</b><small><i>AED 15,000</i>Symbiosis International University,
                                        Dubai</small></div>
                            </div>
                            <div className="tk-c"><span className="tk-a" style={{"--bg-c":"#D4155F","--fg-c":"#fff"} as React.CSSProperties}>BP</span>
                                <div><b>Sneha Nair</b><small><i>AED 30,000</i>BITS Pilani, Dubai Campus</small></div>
                            </div>
                            <div className="tk-c"><span className="tk-a" style={{"--bg-c":"#D4155F","--fg-c":"#fff"} as React.CSSProperties}>BP</span>
                                <div><b>Siddharth Prasad</b><small><i>AED 22,000</i>BITS Pilani, Dubai Campus</small>
                                </div>
                            </div>
                            <div className="tk-c"><span className="tk-a" style={{"--bg-c":"#1C1C28","--fg-c":"#fff"} as React.CSSProperties}>SI</span>
                                <div><b>Kiara Thomas</b><small><i>AED 20,000</i>Symbiosis International University,
                                        Dubai</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* ===================== BY COLLEGE ===================== */}
        <section id="by-college">
            <div className="w">
                <h2>Study in Dubai Scholarships by University</h2>
                <p className="sub">Explore scholarships offered by universities in Dubai to find financial support that
                    aligns with your academic goals and budget. Learn more about the BITS Dubai scholarship and
                    Symbiosis scholarship opportunities, including merit based awards, need based financial assistance
                    and other funding options to support your studies.
                </p>
                <div className="college-grid">

                    <div className="college-card" id="symbiosis">
                        <div className="college-card-header">
                            <span className="college-badge">Dubai Knowledge Park</span>
                            <h3>Symbiosis International University Dubai</h3>
                            <p className="college-location">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                Dubai Knowledge Park
                            </p>
                        </div>
                        <div className="college-scholarship-highlight">
                            <div className="big-num">
                                <strong>40%</strong>
                                <span>+ 30% after</span>
                            </div>
                            <p>Bachelor's: 40% in year 1, 30% on remaining years. Master's: 35% on full programme + AED
                                1,000.</p>
                        </div>
                        <div className="college-details">
                            <ul>
                                <li><strong>Eligibility:</strong> From 55% marks (UG) / 50% marks (PG)</li>
                                <li><strong>Courses:</strong> BCA, B.Tech, BBA, B.Com, B.Sc, BA and MBA</li>
                            </ul>
                            <a className="b" href="#eligibility" data-college="s">Check my scholarship</a>
                        </div>
                    </div>

                    <div className="college-card" id="bits">
                        <div className="college-card-header">
                            <span className="college-badge">Dubai International Academic City</span>
                            <h3>BITS Pilani Dubai</h3>
                            <p className="college-location">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                Dubai International Academic City
                            </p>
                        </div>
                        <div className="college-scholarship-highlight">
                            <div className="big-num">
                                <strong>50%</strong>
                                <span>UG scholarship</span>
                            </div>
                            <p>Bachelor's: up to 50% based on marks. 90%+ up to 50%, 80%+ around 35%, 70%+ around 20%,
                                60%+ around 10%.</p>
                        </div>
                        <div className="college-details">
                            <ul>
                                <li><strong>Eligibility:</strong> From 60% marks (UG &amp; PG)</li>
                                <li><strong>Courses:</strong> BE, BBA (Hons), ME and MBA</li>
                            </ul>
                            <a className="b" href="#eligibility" data-college="b">Check my scholarship</a>
                        </div>
                    </div>

                </div>
            </div>
        </section>


        {/* ===================== MARKS ESTIMATOR ===================== */}
        <section id="estimator">
            <div className="w">
                <div className="me">
                    <div>
                        <p className="me-tl">Drag to set your Class 12 marks</p>
                        <div className="me-hv"><b id="me-v">78</b>%</div>
                    </div>
                    <div className="me-mid">
                        <svg id="me-tw" viewBox="0 0 400 46" preserveAspectRatio="none" role="img"
                            aria-label="A tower that lights up floor by floor as your marks rise"></svg>
                        <input id="me-in" type="range" min="40" max="100" step="1" defaultValue="78"
                            aria-label="Class 12 marks in percent" />
                        <div className="me-scale"><span>40%</span><span>70%</span><span>100%</span></div>
                    </div>
                    <div className="me-res">
                        <div>
                            <div className="me-hq"><span id="me-pre">Up to</span><b id="me-p">40%</b></div>
                            <p className="me-hn" id="me-n" aria-live="polite">scholarship possible at our partner
                                universities (UG, indicative).</p>
                        </div>
                        <a className="b me-b open-popup" href="#predictor">Get my full estimate</a>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================== BY COURSE ===================== */}
        <section id="by-course" data-college="s">
            <div className="w">
                <h2>Study in Dubai Scholarships by Course</h2>
                <p className="sub">Explore scholarship in Dubai opportunities for undergraduate and postgraduate programmes
                    across various fields of study. Learn about the SIU scholarship, BITS Pilani Dubai fees and
                    available financial support options for courses in engineering, computer science, business
                    management and other disciplines to help you plan your academic journey.
                </p>

                <div className="cs-bar">
                    <div className="cs-field">
                        <label htmlFor="cs-college">Select University</label>
                        <div className="cs-sel"><select id="cs-college" aria-label="Select college" defaultValue="s">
                            <option value="s">Symbiosis International University Dubai</option>
                            <option value="b">BITS Pilani Dubai</option>
</select></div>
                    </div>
                    <div className="cs-tabs" id="cs-tabs" role="group" aria-label="Level of study">
                        <button type="button" className="cs-tab" data-v="" aria-pressed="true">All <em
                                data-c="all">0</em></button>
                        <button type="button" className="cs-tab" data-v="UG" aria-pressed="false">Bachelor's <em
                                data-c="UG">0</em></button>
                        <button type="button" className="cs-tab" data-v="PG" aria-pressed="false">Master's <em
                                data-c="PG">0</em></button>
                    </div>
                </div>
            </div>

            <div className="w" style={{"padding":"0"}}>
                <div className="cs-carousel">
                    <button type="button" className="cs-side-arr" data-d="-1" aria-label="Previous courses">&#8249;</button>
                    <div className="cs-viewport">
                        <div className="cs-track" id="cs-track">
                        {INITIAL_COURSES.map((x, i) => (
                            <article key={x.title} className="cs-card" style={{ '--i': Math.min(i, 8) } as React.CSSProperties}>
                                <div className="cs-top">
                                    <div className="cs-ic">{renderIcon(x.icon)}</div>
                                    <div className="cs-tt">
                                        <h4>{x.title}</h4>
                                        <small>{x.degree}</small>
                                    </div>
                                </div>
                                <div className="cs-sch">
                                    <span className="cs-lbl">Scholarship</span>
                                    <div className="cs-val">
                                        <i>Up to</i>
                                        <b>{x.scholarship.replace(/^Up tos*/, '')}</b>
                                    </div>
                                </div>
                                <div className="cs-meta">
                                    {x.duration && <div><span>{renderIcon('clock')}Duration</span><b>{x.duration}</b></div>}
                                    {x.fee && <div><span>{renderIcon('cash')}Tuition fee</span><b>{x.fee}</b></div>}
                                    <div><span>{renderIcon('ok')}Eligibility</span><b>{x.eligibility || 'From 55% marks'}</b></div>
                                </div>
                                <a className="cs-cta open-popup" href="#apply" data-k={x.college} data-t={x.title} data-l={x.level} data-u="Symbiosis International University Dubai">
                                    <span>Enquire now</span>
                                    <i>{renderIcon('go')}</i>
                                </a>
                            </article>
                        ))}</div>
                    </div>
                    <button type="button" className="cs-side-arr" data-d="1" aria-label="Next courses">&#8250;</button>
                </div>
            </div>
        </section>

        {/* ===================== ELIGIBILITY PREDICTOR ===================== */}
        <section id="eligibility">
            <div className="w pg">
                <div>
                    <h2>Check Your Scholarship in 30 Seconds</h2>
                    <p className="sub">Enter your education level, course, and marks to discover the scholarships you're
                        likely to qualify for at each partner university.</p>
                </div>
                <div className="est" id="predictor">
                    <p className="sent">
                        I'm applying for a
                        <select id="el" aria-label="Level of study">
                            <option value="UG">Bachelor's</option>
                            <option value="PG">Master's</option>
                        </select>
                        in
                        <select id="ec" aria-label="Course">
                            <option value="">Select Course</option>
                            <optgroup label="Symbiosis International University Dubai">
                                <option value="s|BBA (General Management)">BBA (General Management)</option>
                                <option value="s|BBA (Hons) in Finance">BBA (Hons) in Finance</option>
                                <option value="s|BBA (Hons) in Marketing">BBA (Hons) in Marketing</option>
                                <option value="s|BBA (Hons) in Logistics and Supply Chain Management">BBA (Hons) in Logistics and Supply Chain Management</option>
                                <option value="s|BBA (Hons) in Human Resource Management">BBA (Hons) in Human Resource Management</option>
                                <option value="s|BBA (Hons) in AI and Business Analytics">BBA (Hons) in AI and Business Analytics</option>
                                <option value="s|BBA Dual Degree with Aston University, UK">BBA Dual Degree with Aston University, UK</option>
                                <option value="s|BCA in AI and ML">BCA in AI and ML</option>
                                <option value="s|BCA in Cloud Computing">BCA in Cloud Computing</option>
                                <option value="s|BCA in Data Science and Data Analytics">BCA in Data Science and Data Analytics</option>
                                <option value="s|BA in Media and Communication (Hons)">BA in Media and Communication (Hons)</option>
                                <option value="s|B.Com (Hons) with ACCA Preparation">B.Com (Hons) with ACCA Preparation</option>
                                <option value="s|B.Sc (Hons) in Psychology">B.Sc (Hons) in Psychology</option>
                                <option value="s|B.Tech in Computer Engineering">B.Tech in Computer Engineering</option>
                            </optgroup>
                            <optgroup label="BITS Pilani Dubai">
                                <option value="b|B.E. Architectural & Urban Engineering">B.E. Architectural & Urban Engineering</option>
                                <option value="b|B.E. Chemical Engineering">B.E. Chemical Engineering</option>
                                <option value="b|B.E. Chemical Engineering (Energy & Sustainability)">B.E. Chemical Engineering (Energy & Sustainability)</option>
                                <option value="b|B.E. Civil Engineering">B.E. Civil Engineering</option>
                                <option value="b|B.E. Computer Science">B.E. Computer Science</option>
                                <option value="b|B.E. Electrical & Electronics Engineering">B.E. Electrical & Electronics Engineering</option>
                                <option value="b|B.E. Electronics & Communication Engineering">B.E. Electronics & Communication Engineering</option>
                                <option value="b|B.E. Electronics & Computer Engineering">B.E. Electronics & Computer Engineering</option>
                                <option value="b|B.E. Mechanical Engineering">B.E. Mechanical Engineering</option>
                                <option value="b|B.E. Mechanical Engineering (Aerospace)">B.E. Mechanical Engineering (Aerospace)</option>
                                <option value="b|B.E. Robotics & Industrial Automation">B.E. Robotics & Industrial Automation</option>
                                <option value="b|B.E. Biotechnology">B.E. Biotechnology</option>
                                <option value="b|B.E. Biotechnology (Applied Molecular Biology)">B.E. Biotechnology (Applied Molecular Biology)</option>
                                <option value="b|B.E. Mathematics & Computing">B.E. Mathematics & Computing</option>
                                <option value="b|BBA (Honours)">BBA (Honours)</option>
                            </optgroup>
</select>
                        and I scored
                        <input id="em" type="number" min="0" max="100" step="0.1" inputMode="decimal" placeholder="__"
                            aria-label="Marks in percent" />
                        % in
                        <span id="eml">Class 12</span>.
                    </p>
                    <div id="res" aria-live="polite">
                        <div className="ur">
                            <div>
                                <b>Symbiosis International University Dubai<span className="tg up">Top offer</span></b>
                                <p>Then 30% on the remaining years</p>
                            </div>
                            <div className="pc">40<small>%</small></div>
                            <div className="meter"><i style={{ '--p': '80%' } as React.CSSProperties}></i></div>
                        </div>
                        <div className="ur">
                            <div>
                                <b>BITS Pilani Dubai<span className="tg up">Top offer</span></b>
                                <p>Top tier, for 90%+ marks</p>
                            </div>
                            <div className="pc">50<small>%</small></div>
                            <div className="meter"><i style={{ '--p': '100%' } as React.CSSProperties}></i></div>
                        </div>
</div>
                    <a className="b open-popup" id="ewa" href="#apply">Confirm with a counsellor</a>
                </div>
            </div>
        </section>

        {/* ===================== WHY DUBAI ===================== */}
        <section id="why">
            <div className="w">
                <h2>Why Study in Dubai?</h2>
                <p className="sub">Dubai offers globally recognised education, diverse academic programmes, and
                    opportunities to connect with international industries.</p>

                <div className="wg">
                    <div className="cd">
                        <div className="cd-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg></div>
                        <h3>Close to home</h3>
                        <p>A short flight from major Indian cities, keeping family and familiar support within easy
                            reach.</p>
                    </div>
                    <div className="cd">
                        <div className="cd-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
                        <h3>Global exposure</h3>
                        <p>Study alongside students from diverse nationalities in one of the world's leading
                            international business hubs.</p>
                    </div>
                    <div className="cd">
                        <div className="cd-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
                        <h3>Indian academic legacy</h3>
                        <p>Explore Dubai campuses of established Indian institutions with familiar academic roots and an
                            international outlook.</p>
                    </div>
                    <div className="cd">
                        <div className="cd-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></div>
                        <h3>Safe &amp; student-friendly</h3>
                        <p>Benefit from a strong Indian community, modern infrastructure, and services designed to
                            support student life.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================== COMPARE ===================== */}
        <section id="compare">
            <div className="w">
                <h2>Compare Universities</h2>
                <p className="sub">Select universities to compare their scholarship tiers, eligibility cut-offs, and
                    available courses at a glance.</p>

                <div className="cmp-controls">
                    <div className="cmp-select-wrap">
                        <label htmlFor="cmp-col-1">University A</label>
                        <select id="cmp-col-1" className="cmp-select" aria-label="Select first college">
                            <option value="s">Symbiosis International University Dubai</option>
                            <option value="b">BITS Pilani Dubai</option>
                        </select>
                    </div>

                    <div className="cmp-vs" aria-hidden="true">VS</div>

                    <div className="cmp-select-wrap">
                        <label htmlFor="cmp-col-2">University B</label>
                        <select id="cmp-col-2" className="cmp-select" aria-label="Select second college" defaultValue="b">
                            <option value="s">Symbiosis International University Dubai</option>
                            <option value="b">BITS Pilani Dubai</option>
                        </select>
                    </div>
                </div>

                <div className="compare-table">
                    <div className="cmp-table-header">
                        <div className="cmp-header-label">VS</div>
                        <div className="cmp-side side-a" id="banner-1" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("/images/dubai-scholarships/compare-banner/Symbiosis.webp")' }}>
                            <span className="badge" id="name-badge-1">Knowledge Park</span>
                            <h3 id="name-title-1">Symbiosis Dubai</h3>
                            <p className="loc" id="name-loc-1">Dubai Knowledge Park</p>
                        </div>
                        <div className="cmp-side side-b" id="banner-2" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("/images/dubai-scholarships/compare-banner/BITS.webp")' }}>
                            <span className="badge" id="name-badge-2">Academic City</span>
                            <h3 id="name-title-2">BITS Pilani Dubai</h3>
                            <p className="loc" id="name-loc-2">International Academic City</p>
                        </div>
                    </div>

                    <div className="cmp-row">
                        <div className="cmp-label-mid">Bachelor's</div>
                        <div className="cmp-cell left">
                            <span className="cmp-val-big" id="ug-big-1">40%</span>
                            <span className="cmp-val-desc" id="ug-desc-1">in year 1 + 30% after</span>
                        </div>
                        <div className="cmp-cell right">
                            <span className="cmp-val-big" id="ug-big-2">Up to 50%</span>
                            <span className="cmp-val-desc" id="ug-desc-2">by marks</span>
                        </div>
                    </div>

                    <div className="cmp-row">
                        <div className="cmp-label-mid">Master's</div>
                        <div className="cmp-cell left">
                            <span className="cmp-val-big" id="pg-big-1">35%</span>
                            <span className="cmp-val-desc" id="pg-desc-1">+ AED 1,000</span>
                        </div>
                        <div className="cmp-cell right">
                            <span className="cmp-val-big" id="pg-big-2">Up to 20%</span>
                            <span className="cmp-val-desc" id="pg-desc-2">first-semester tuition</span>
                        </div>
                    </div>

                    <div className="cmp-row">
                        <div className="cmp-label-mid">Lowest marks</div>
                        <div className="cmp-cell left"><span className="cmp-val-desc" id="marks-1"><strong>55%</strong> Bachelor's · <strong>50%</strong> Master's</span></div>
                        <div className="cmp-cell right"><span className="cmp-val-desc" id="marks-2"><strong>60%</strong> for Bachelor's and Master's</span></div>
                    </div>

                    <div className="cmp-row">
                        <div className="cmp-label-mid">Courses</div>
                        <div className="cmp-cell left"><span className="cmp-val-desc" id="courses-1">BCA, B.Tech, BBA, B.Com, B.Sc, BA, MBA</span></div>
                        <div className="cmp-cell right"><span className="cmp-val-desc" id="courses-2">BE, BBA (Hons), ME, MBA</span></div>
                    </div>

                    <div className="cmp-row pick">
                        <div className="cmp-label-mid">Pick this if</div>
                        <div className="cmp-cell left"><span className="cmp-val-desc" id="pick-1">You score between 55% and 80%, or are considering BCA, BBA, B.Com, BA or BSc programmes</span></div>
                        <div className="cmp-cell right"><span className="cmp-val-desc" id="pick-2">You score 80%+ and want engineering or the biggest Bachelor's offer.</span></div>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================== ADMISSION SUPPORT ===================== */}
        <section id="admission">
            <div className="w">
                <div className="adm-top">
                    <h2>Admission Support</h2>
                    <p className="sub">We help you from choosing a course to confirming your offer.</p>
                </div>
                <div className="steps">
                    <div className="st">
                        <h3>Choose your university and course</h3>
                        <p>We match your marks and budget to the right programme.</p>
                    </div>
                    <div className="st">
                        <h3>Confirm your scholarship</h3>
                        <p>We check your eligibility and get the offer confirmed before you commit.</p>
                    </div>
                    <div className="st">
                        <h3>Apply with the right documents</h3>
                        <p>Guidance on forms, transcripts and English test requirements or waivers.</p>
                    </div>
                    <div className="st">
                        <h3>Plan fees and education loan</h3>
                        <p>A clear cost breakdown and guidance on loan options.</p>
                    </div>
                </div>
                <p className="adm-cta open-popup"><a className="b" href="#apply">Talk to a counsellor</a></p>
            </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section id="faq">
            <div className="w fq">
                <div className="fq-l">
                    <h2>Frequently Asked Questions</h2>
                    <p className="sub">Quick answers for students and parents.</p>
                    <img className="fq-img" src="/images/dubai-scholarships/Media/faq-img.png"
                        alt="Students getting scholarship guidance from a Learntech counsellor" width="600" height="450"
                        loading="lazy" />
                </div>
                <div className="fq-r">
                    <details open>
                        <summary>Who can apply for these scholarships?</summary>
                        <p>Students who meet each university's minimum marks. Symbiosis Dubai asks for 55% for
                            Bachelor's and 50% for Master's. BITS Pilani Dubai asks for 60% for both Bachelor's and
                            Master's. A counsellor confirms what you qualify for.</p>
                    </details>
                    <details>
                        <summary>What is the deadline?</summary>
                        <p>Scholarship windows are limited and vary by intake, so apply early. Share your details and a
                            counsellor will confirm the exact date for your university.</p>
                    </details>
                    <details>
                        <summary>Can I apply for a Master's programme?</summary>
                        <p>Yes, Symbiosis Dubai offers 35% scholarship plus AED 1,000 if a student attains 50% overall
                            marks in their Bachelor’s. BITS Pilani Dubai offers 20% off first-semester tuition on ME and
                            MBA with 75%+. You need 60% to apply.</p>
                    </details>
                    <details>
                        <summary>Does the scholarship apply to every course?</summary>
                        <p>Percentages are set by university and level. At Symbiosis Dubai, Bachelor's courses get 40%
                            in year 1 and 30% on the remaining years. At BITS Pilani Dubai the offer depends on your
                            course and marks, up to 50% of first-year tuition.</p>
                    </details>
                    <details>
                        <summary>Are the scholarships guaranteed?</summary>
                        <p>No. The percentages shown are indicative. The final scholarship depends on your eligibility,
                            seat availability and the university's approval. We confirm your offer before you commit.
                        </p>
                    </details>
                    <details>
                        <summary>Can I get an education loan?</summary>
                        <p>We guide you on education loan options and share a clear cost breakdown. Approval depends on
                            the lender.</p>
                    </details>
                </div>
            </div>
        </section>

        {/* ===================== CONTACT FORM ===================== */}
        <section id="apply">
            <div className="w">
                <div className="cta-form-wrap">
                    <div className="cta-form-header">
                        <h2>Ready to Claim Your Scholarship?</h2>
                        <p>Scholarship slots are limited for each intake. Share your details, and a counsellor will get
                            in touch with you shortly.</p>
                    </div>
                    <form id="contact-form" className="contact-form" noValidate>
                        <div className="form-field">
                            <label htmlFor="cf-name">Full name <span className="req">*</span></label>
                            <input id="cf-name" type="text" name="name" placeholder="Enter your full name" required
                                autoComplete="name" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="cf-email">Email address <span className="req">*</span></label>
                            <input id="cf-email" type="email" name="email" placeholder="you@example.com" required
                                autoComplete="email" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="cf-phone">Mobile number <span className="req">*</span></label>
                            <input id="cf-phone" type="tel" name="phone" placeholder="Mobile number" required
                                autoComplete="tel" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="cf-level">City</label>
                            <input id="cf-level" type="text" name="level" placeholder="Enter your city"
                                autoComplete="address-level2" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="cf-university">University</label>
                            <select id="cf-university" name="university">
                                <option>Symbiosis International University Dubai</option>
                                <option>BITS Pilani Dubai</option>
                                <option>Not sure, help me choose</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="cf-course">Interested course?</label>
                            <select id="cf-course" name="course">
                                <option value="">Select Course</option>
                                <optgroup label="Symbiosis International University Dubai">
                                    <option value="BBA (General Management)">BBA (General Management)</option>
                                    <option value="BBA (Hons) in Finance">BBA (Hons) in Finance</option>
                                    <option value="BBA (Hons) in Marketing">BBA (Hons) in Marketing</option>
                                    <option value="BBA (Hons) in Logistics and Supply Chain Management">BBA (Hons) in Logistics and Supply Chain Management</option>
                                    <option value="BBA (Hons) in Human Resource Management">BBA (Hons) in Human Resource Management</option>
                                    <option value="BBA (Hons) in AI and Business Analytics">BBA (Hons) in AI and Business Analytics</option>
                                    <option value="BBA Dual Degree with Aston University, UK">BBA Dual Degree with Aston University, UK</option>
                                    <option value="BCA in AI and ML">BCA in AI and ML</option>
                                    <option value="BCA in Cloud Computing">BCA in Cloud Computing</option>
                                    <option value="BCA in Data Science and Data Analytics">BCA in Data Science and Data Analytics</option>
                                    <option value="BA in Media and Communication (Hons)">BA in Media and Communication (Hons)</option>
                                    <option value="B.Com (Hons) with ACCA Preparation">B.Com (Hons) with ACCA Preparation</option>
                                    <option value="B.Sc (Hons) in Psychology">B.Sc (Hons) in Psychology</option>
                                    <option value="B.Tech in Computer Engineering">B.Tech in Computer Engineering</option>
                                    <option value="MBA">MBA</option>
                                </optgroup>
</select>
                        </div>
                        <div className="form-submit">
                            <button className="b" type="submit">Talk to a counsellor</button>
                        </div>
                        <p className="form-note">By submitting you agree to be contacted about admissions and scholarships.
                        </p>
                        <div className="form-success">
                            <b>You're cleared for take-off!</b>
                            <p>A counsellor will get in touch with you shortly.</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    </main>

    {/* ===================== FOOTER ===================== */}
    <footer className="site-footer">
        <div className="footer-watermark" aria-hidden="true">Scholar</div>
        <div className="w footer-inner">
            <div className="fg">
                <div className="footer-brand">
                    <a className="footer-logo" href="#top" aria-label="Learntech">
                        <img src="/images/dubai-scholarships/Media/Logo/Learntech_White.svg" alt="Learntech" width="222" height="52" />
                    </a>
                    <p className="footer-desc">Learntech Scholar makes studying in Dubai simpler, with scholarship guidance
                        and options all in one place.</p>

                    <div className="footer-social">
                        <span className="soc-label">Follow us on</span>
                        <div className="soc-icons">
                            <a href="https://www.facebook.com/learntechedu" target="_blank" rel="noopener"
                                aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target="_blank"
                                rel="noopener" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path
                                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/learntechww" target="_blank" rel="noopener"
                                aria-label="X (Twitter)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4l16 16M4 20L20 4" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/learntechedus" target="_blank" rel="noopener"
                                aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target="_blank"
                                rel="noopener" aria-label="YouTube">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path
                                        d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Partners</h4>
                    <ul>
                        <li><a href="#">Symbiosis International University Dubai</a></li>
                        <li><a href="#">BITS Pilani Dubai</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Courses</h4>
                    <ul>
                        <li><a href="#by-course">BBA (General Management)</a></li>
                        <li><a href="#by-course">BCA in AI and ML</a></li>
                        <li><a href="#by-course">B.Tech in Computer Engineering</a></li>
                        <li><a href="#by-course">BE in Engineering</a></li>
                        <li><a href="#by-course">MBA</a></li>
                        <li><a href="#by-course">ME in Software Systems</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Contact us</h4>
                    <ul className="contact-list">
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <a href="mailto:uae@learntechww.com">uae@learntechww.com</a>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <a href="tel:+971 50 495 5123">+971 50 495 5123</a>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <a href="tel:+971 50 243 6552">+971 50 243 6552</a>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <a href="tel:+919606949066">+91 96069 49066</a>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <a href="tel:18001208696">1800 120 8696 (Toll Free)</a>
                        </li>

                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Learntech Edu Solutions Pvt. Ltd, Bengaluru. All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    {/* ===================== EDGE CONTACT TABS (CALL + WHATSAPP) ===================== */}

    <div className="edge-contact" id="edge-contact" role="complementary" aria-label="Contact Learntech">
        <a className="edge-contact__tab edge-contact__tab--wa"
            href="https://wa.me/971504955123"
            target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
            <span className="edge-contact__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </span>
            <span className="edge-contact__label">Chat on WhatsApp</span>
        </a>

        <a className="edge-contact__tab edge-contact__tab--call" href="tel:+971504955123" aria-label="Call an expert">
            <span className="edge-contact__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
            </span>
            <span className="edge-contact__label">Call an expert</span>
        </a>
    </div>

    {/* ===================== POPUP FORM ===================== */}
    
    </>
  )
}

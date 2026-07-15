import Image from 'next/image'
import JsonLd from 'src/app/components/JsonLd'
import styles from './BamsPage.module.css'

import BamsNavbarClient from './BamsNavbarClient'
import BamsMarqueeClient from './BamsMarqueeClient'
import BamsHeroFormClient from './BamsHeroFormClient'
import BamsPredictorClient from './BamsPredictorClient'
import BamsEnquiryTriggerClient from './BamsEnquiryTriggerClient'
import BamsInteractiveClient from './BamsInteractiveClient'

/* ─── SEO ─── */
export const metadata = {
  title: 'NEET-UG BAMS Counselling 2025 | Expert Guidance | LearnTech',
  description:
    'Get expert guidance for NEET-UG 2025 BAMS counselling. Navigate AACCC & KEA counselling with personalised support. Top Ayurvedic colleges in Karnataka.',
  keywords:
    'BAMS Counselling 2025, NEET UG BAMS, AACCC Counselling, KEA AYUSH Counselling, BAMS Admission, Ayurvedic Medical College Karnataka',
  openGraph: {
    title: 'NEET-UG BAMS Counselling 2025 | LearnTech',
    description: 'Expert BAMS counselling guidance for NEET-UG 2025. AACCC & KEA counselling support.',
    type: 'website',
    url: 'https://learntechww.com/bams-counselling-process'
  }
}

/* ─── DATA ─── */
const DOCUMENTS = [
  'Class 10 Marks Card or Certificate',
  'Class 12 Marks Card or Equivalent Qualifying Examination Certificate',
  'NEET UG 2026 Admit Card',
  'NEET UG 2026 Scorecard',
  'NEET UG 2026 Rank Letter',
  'NEET UG 2026 Application Form Confirmation Page',
  'Provisional Seat Allotment Letter',
  <>
    Valid Government Issued Photo Identity Proof{' '}
    <em>
      (Aadhaar Card, PAN Card, Passport,
      <br />
      Voter ID, or Driving Licence)
    </em>
  </>,
  'Recent Passport Size Photographs',
  'Transfer Certificate (TC)',
  'Character Certificate',
  'Migration Certificate',
  'Medical Fitness Certificate',
  'Domicile Certificate',
  'Caste Certificate',
  'Income Certificate',
  'Economically Weaker Section (EWS) Certificate',
  'Persons with Benchmark Disabilities (PwBD) Certificate',
  'Non Creamy Layer (NCL) Certificate for OBC Candidates'
]

const COLLEGES = [
  { name: "KAHER's Shri BM Kankanawadi Ayurveda Mahavidyalaya, PG Studies & Research Centre", city: 'Belagavi', img: "/images/bams/college-logos/KAHER’s Shri BM Kankanawadi Ayurveda Mahavidyalaya Post Graduate Studies and Research Centre.webp" },
  { name: 'Yenepoya Ayurveda Medical College and Hospital', city: 'Mangalore', img: '/images/bams/college-logos/Yenepoya Ayurveda Medical College and Hospital.webp' },
  { name: 'Amrutha Ayurvedic Medical College (AAMC)', city: 'Chitradurga', img: '/images/bams/college-logos/Amrutha Ayurvedic Medical College (AAMC).webp' },
  { name: 'Sri Kalabyraveshwara Swamy Ayurvedic Medical College, Hospital & Research Centre', city: 'Bangalore', img: '/images/bams/college-logos/Sri Kalabyraveshwara Swamy Ayurvedic Medical College, Hospital and Research Centre (SKAMCH & RC).webp' },
  { name: 'Sharada Ayurveda Medical College and Hospital (SAMCH)', city: 'Mangalore', img: '/images/bams/college-logos/Sharada Ayurveda Medical College and Hospital (SAMCH).webp' },
  { name: 'Sushrutha Ayurvedic Medical College & Hospital', city: 'Bangalore', img: '/images/bams/college-logos/Sushrutha Ayurvedic Medical College & Hospital.webp' },
  { name: 'Ashwini Ayurvedic Medical College & Research Centre', city: 'Tumkur', img: '/images/bams/college-logos/Ashwini Ayurvedic Medical College & Research Centre.webp' },
  { name: 'SDM College of Ayurveda & Hospital', city: 'Udupi', img: '/images/bams/college-logos/SDM College of Ayurveda & Hospital.webp' },
  { name: 'Atreya Ayurvedic Medical College, Hospital & Research Centre', city: 'Bangalore', img: '/images/bams/college-logos/Atreya Ayurvedic Medical College Hospital & Research Centre.webp' },
  { name: 'Shri Kalidas Ayurvedic Medical College and Hospital', city: 'Badami', img: '/images/bams/college-logos/Shri Kalidas Ayurvedic Medical College and Hospital.webp' },
  { name: 'Indian Institute of Ayurvedic Medicine & Research', city: 'Bangalore', img: '/images/bams/college-logos/Indian Institute of Ayurvedic Medicine & Research.webp' },
  { name: 'JSS Ayurveda Medical College', city: 'Mysore', img: '/images/bams/college-logos/JSS Ayurveda Medical College.webp' },
  { name: 'Sri Sri College of Ayurvedic Science & Research, Bangalore', city: 'Mysore', img: '/images/bams/college-logos/sscasrh-logo.png' }
]

const FAQS = [
  { q: 'Is qualifying NEET UG 2026 mandatory for BAMS admissions?', a: 'Yes, qualifying NEET UG 2026 is mandatory for admission to the Bachelor of Ayurvedic Medicine and Surgery (BAMS) course across India. Candidates must also fulfil the eligibility criteria prescribed by the respective counselling authority and institution.' },
  { q: 'What is the difference between AACCC and KEA BAMS counselling?', a: 'The Ayush Admissions Central Counselling Committee (AACCC) conducts the All India counselling for AYUSH courses, including BAMS, covering All India Quota seats, Central Universities, National Institutes, and Deemed Universities. The Karnataka Examinations Authority (KEA) conducts the State AYUSH counselling for Government, Private, Management, and NRI quota seats offered by AYUSH colleges in Karnataka.' },
  { q: 'Can I participate in both AACCC and KEA BAMS counselling?', a: 'Yes, candidates who meet the eligibility requirements can participate in both AACCC and KEA counselling by completing separate registrations and following the respective counselling schedules. Participating in both counselling processes can increase your chances of securing a BAMS seat.' },
  { q: 'How do I choose the right BAMS college?', a: 'While filling your choices, consider factors such as your NEET UG rank, previous years\' closing ranks, college recognition, hospital facilities, internship opportunities, tuition fees, location, and your preferred quota. Listing colleges strategically in the order of your preference can improve your chances of securing a suitable seat.' },
  { q: 'What support do I receive through personalised BAMS counselling 2026?', a: 'Personalised BAMS counselling 2026 typically includes guidance on college selection, choice filling strategy, quota selection, counselling registration, document preparation, seat allotment decisions, and post allotment admission formalities. The guidance is tailored to your NEET UG rank, preferences, budget, and admission goals.' }
]

/* ─── SVG Icons ─── */
const LocationSvg = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></svg>
)

const CheckSvg = () => (
  <svg viewBox="0 0 24 24">
    <circle className={styles.checkCircle} cx="12" cy="12" r="10" pathLength={1} />
    <path className={styles.checkMark} d="M7 12.5l3 3 7-7" pathLength={1} />
  </svg>
)

const InfoSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v5M12 16h.01" />
  </svg>
)

const WarningSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--rust)' }}>
    <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronDownSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
)

const PhoneSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.32 1.6.59 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.16a2 2 0 0 1 2.11-.45c.76.27 1.55.47 2.36.59A2 2 0 0 1 22 16.92z" />
  </svg>
)

/* ─── JSON-LD ─── */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'LearnTech Edu Solutions Pvt Ltd',
  url: 'https://learntechww.com',
  telephone: '+918022454991'
}

/* ─── PAGE ─── */
export default function BamsCounsellingProcessPage() {
  const heroBg = `/images/bams/media/ChatGPT Image Jul 4, 2026, 11_07_13 AM.png`
  const contactBg = `/images/bams/contactbanner.webp`

  return (
    <>
      <JsonLd schema={faqSchema} id="faq-schema" />
      <JsonLd schema={orgSchema} id="org-schema" />

      <div className={styles.bamsRoot}>
        <BamsNavbarClient />

        <BamsEnquiryTriggerClient>
          <BamsInteractiveClient>

            {/* ─── HERO ─── */}
            <section
              className={styles.hero}
              id="home"
              style={{
                background: `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), url("${heroBg}") center center / cover no-repeat`
              }}
            >
              <div className={`${styles.wrap} ${styles.heroGrid}`}>
                <div className={styles.heroCopy}>
                  <p className={styles.heroOverline}>
                    Your Path to Ayurvedic Medicine Starts Here!
                  </p>
                  <h1>Navigate NEET UG 2026 BAMS <span>Counselling</span> with <span>Confidence</span></h1>
                  <p className={styles.lede}>
                    Receive expert guidance at every stage of the NEET UG 2026 BAMS counselling process.
                    Explore top Ayurvedic colleges in Karnataka and across India through All India and KEA counselling
                    with personalized admission support.
                  </p>
                  <div style={{ marginTop: '1.5rem' }}>
                    <a href="tel:08022454991" className={styles.heroBtn}>
                      <PhoneSvg />
                      <span>Connect with Our Experts</span>
                      <span className={styles.heroBtnArrow}>→</span>
                    </a>
                  </div>
                </div>
                <BamsHeroFormClient />
              </div>
            </section>

            {/* ─── MARQUEE ─── */}
            <BamsMarqueeClient />

            {/* ─── WHY US ─── */}
            <section className={`${styles.bamsSection} ${styles.whyUs}`} id="why-us">
              <div className={styles.wrap}>
                <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
                  <h2>Your BAMS Admission Journey Starts Here</h2>
                </div>
                <div className="row g-4">
                  {[
                    { icon: '/images/bams/icons/Icon_01.svg', title: 'Personalized Counselling', desc: 'Receive one-on-one guidance tailored to your NEET rank, preferred colleges, budget, and career goals. Our experts help you make informed decisions at every stage of the counselling process.' },
                    { icon: '/images/bams/icons/Icon_02.svg', title: 'Experienced Admission Experts', desc: 'Navigate the BAMS admission process with confidence under the guidance of seasoned counsellors who have extensive experience with All India and Karnataka (KEA) counselling.' },
                    { icon: '/images/bams/icons/Icon_04.svg', title: 'End-to-End Admission Support', desc: "Our assistance doesn't end with seat allotment. We help with document verification, reporting to the allotted college, and other admission formalities for a hassle-free transition." },
                    { icon: '/images/bams/icons/Icon_03.svg', title: 'Save Time, Avoid Mistakes', desc: 'Counselling can be complex and time-sensitive. Our experts streamline the process, helping you complete every step accurately and efficiently while avoiding common errors.' }
                  ].map((card, i) => (
                    <div key={i} className={`col-md-3 col-sm-6 ${styles.animateOnScroll} ${i > 0 ? styles[`delay${i}` as keyof typeof styles] : ''}`}>
                      <div className={styles.whyCard}>
                        <div className={styles.whyIcon}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={card.icon} alt={card.title} style={{ width: 60 }} />
                        </div>
                        <h3 className="mb-4">{card.title}</h3>
                        <p>{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── AACCC COUNSELLING ─── */}
            <section className={`${styles.bamsSection} ${styles.aacccSection}`} id="counselling">
              <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
                <h2>All About NEET UG BAMS Counselling 2026</h2>
              </div>
              <div className={`${styles.wrap} ${styles.aacccWrap}`}>
                <h2 className={`${styles.aacccTitle} ${styles.animateOnScroll}`}>All India BAMS Counselling 2026</h2>
                <p className={`${styles.aacccLead} ${styles.animateOnScroll}`}>
                  The All India BAMS counselling process is conducted by the Ayush Admissions Central Counselling
                  Committee (AACCC), Ministry of AYUSH. Candidates must qualify NEET UG 2026
                  to participate in AACCC counselling.
                </p>

                <div className={`${styles.aacccSummaryRow} ${styles.animateOnScroll}`}>
                  <div className={styles.aacccSummaryCard}>
                    <span className={styles.aacccSummaryLabel}>Conducted by</span>
                    <span className={styles.aacccSummaryValue}>AACCC, Ministry of AYUSH</span>
                  </div>
                  <div className={styles.aacccSummaryCard}>
                    <span className={styles.aacccSummaryLabel}>Eligibility</span>
                    <span className={styles.aacccSummaryValue}>NEET UG 2026 Qualified</span>
                  </div>
                </div>

                <p className={`${styles.aacccSubhead} ${styles.animateOnScroll}`}>AACCC Conducts Counselling For</p>
                <div className={`${styles.aacccScopeGrid} ${styles.animateOnScroll}`}>
                  <div className={styles.aacccScopeCard}>
                    <div className={`${styles.aacccScopeIcon} ${styles.aacccScopeIconGreen}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg>
                    </div>
                    <div className={styles.aacccScopeLabel}>All India Quota (AIQ) seats in Government and Government-aided AYUSH colleges</div>
                  </div>
                  <div className={styles.aacccScopeCard}>
                    <div className={`${styles.aacccScopeIcon} ${styles.aacccScopeIconGold}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" /><path d="M7 10.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-5.5" /></svg>
                    </div>
                    <div className={styles.aacccScopeLabel}>Central Universities</div>
                  </div>
                  <div className={styles.aacccScopeCard}>
                    <div className={`${styles.aacccScopeIcon} ${styles.aacccScopeIconRust}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="1" /><path d="M9 20v-5h6v5M4 10l8-6 8 6" /></svg>
                    </div>
                    <div className={styles.aacccScopeLabel}>National Institutes</div>
                  </div>
                  <div className={styles.aacccScopeCard}>
                    <div className={`${styles.aacccScopeIcon} ${styles.aacccScopeIconForest}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" /></svg>
                    </div>
                    <div className={styles.aacccScopeLabel}>Deemed Universities</div>
                  </div>
                </div>

                <div className={`${styles.aacccCallout} ${styles.animateOnScroll}`}>
                  <InfoSvg />
                  <span>Private colleges (except deemed universities) are generally counselled by the respective State/UT authorities — see the Karnataka (KEA) process further down this page.</span>
                </div>

                <p className={`${styles.aacccSubhead} ${styles.animateOnScroll}`}>Counselling Process</p>
                <div data-aaccc-timeline-wrap className={styles.animateOnScroll}>
                  <ul className={styles.aacccTimeline}>
                    {['Round 1', 'Round 2', 'Round 3'].map((name, i) => (
                      <li key={i} className={styles.aacccRound}>
                        <div className={styles.aacccRoundIndex}>{i + 1}</div>
                        <div className={styles.aacccRoundName}>{name}</div>
                      </li>
                    ))}
                    <li className={`${styles.aacccRound} ${styles.aacccRoundSvr}`} role="button" tabIndex={0} aria-expanded="false" data-aaccc-svr>
                      <div className={`${styles.aacccRoundIndex} ${styles.aacccRoundIndexActive}`}>
                        <ChevronDownSvg />
                      </div>
                      <div className={styles.aacccRoundName}>Stray Vacancy Round</div>
                    </li>
                  </ul>
                  <div className={styles.aacccAccordion} data-aaccc-panel>
                    <div className={styles.aacccAccordionInner}>
                      <div className={styles.aacccSvrCard}>
                        <h4>The Stray Vacancy Round is conducted to fill seats that remain vacant after Round 3. For government, government-aided colleges, central universities, and national institutes, the online Stray Vacancy Round is held in two allotment phases - SVR-I and SVR-II. Admissions to deemed universities are conducted separately through the Stray Vacancy Round for Deemed Universities (SVR-DU). Seats in deemed universities are unreserved, and the central government reservation policy does not apply to them.</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── AIQ STAGES ─── */}
            <section className={`${styles.bamsSection} ${styles.stagesSection}`}>
              <div className={styles.wrap}>
                <div className={`${styles.sectionHead} ${styles.sectionHeadCenter} ${styles.animateOnScroll} ${styles.stagesHeading}`} id="stages-heading">
                  <h2>All India NEET UG BAMS Counselling 2026 Stages</h2>
                  <p> The All India BAMS counselling process conducted by the Ayush Admissions Central Counselling Committee (AACCC) consists of multiple stages. While the counselling schedule varies for each round, the overall process generally remains the same. Before the commencement of every counselling round, AACCC publishes the seat matrix, schedule, and other important notifications on its official website.</p>
                </div>
                <div className={styles.stageList}>
                  {[
                    { num: 1, title: 'Stage 1: Registration', summary: 'Candidates who wish to participate in the All India BAMS counselling process must register online through the official AACCC portal during the registration window of the respective counselling round.', body: 'Fresh registration is generally required for each eligible counselling phase except where AACCC specifically carries forward registrations, such as certain phases of the Stray Vacancy Round, subject to the counselling guidelines issued for that admission year.' },
                    { num: 2, title: 'Stage 2: Payment of Counselling Fees', summary: 'After completing registration, candidates must pay the prescribed counselling fee online.', body: 'fee-table' },
                    { num: 3, title: 'Stage 3: Choice Filling', summary: 'Registered candidates must select their preferred BAMS colleges and arrange them in the order of preference. Candidates may add, modify, delete, or rearrange their choices until the choice filling window closes.', body: 'Choice filling is conducted separately for every counselling round. Choices submitted in one round are generally not carried forward to the subsequent rounds unless specifically notified by AACCC.' },
                    { num: 4, title: 'Stage 4: Choice Locking', summary: 'Once the preferred colleges have been selected, candidates must lock their choices before the deadline. After locking, the selected choices cannot be modified for that counselling round.', body: 'If a candidate does not manually lock the choices before the deadline, AACCC may automatically lock the last saved choices.' },
                    { num: 5, title: 'Stage 5: Seat Allotment', summary: 'Candidates who are not allotted a seat in one round may participate in subsequent counselling rounds, subject to AACCC eligibility rules.', body: 'seat-factors' },
                    { num: 6, title: 'Stage 6: Seat Allotment Result', summary: 'AACCC publishes the seat allotment results on its official website after completing the allotment process. Candidates can download their allotment letter and proceed with the next admission formalities if a seat has been allotted.', body: 'Note: AACCC may publish a provisional result before releasing the final seat allotment result whenever required.' },
                    { num: 7, title: 'Stage 7: Reporting to the Allotted College', summary: 'Candidates allotted a seat must report to the respective college within the prescribed reporting period. Candidates who fail to report within the stipulated deadline may forfeit their allotted seat.', body: 'reporting-list' }
                  ].map((stage, i) => (
                    <div key={stage.num} className={`${styles.stageItem} ${styles.animateOnScroll} ${i > 0 ? styles[`delay${Math.min(i, 4)}` as keyof typeof styles] || '' : ''}`}>
                      <div className={styles.stageNode}>{stage.num}</div>
                      <div className={styles.stageCard} data-stage>
                        <div className={styles.stageTop}>
                          <h4>{stage.title}</h4>
                        </div>
                        <p className={styles.stageSummary}>{stage.summary}</p>
                        <div className={styles.stageBody}>
                          {stage.body === 'fee-table' ? (
                            <>
                              <div className={styles.feeBox}>
                                <p>The counselling fee consists of:</p>
                                <ul className={styles.feeList}>
                                  <li><i className="fas fa-check-circle" /> Non-Refundable Registration Fee</li>
                                  <li><i className="fas fa-check-circle" /> Refundable Security Deposit</li>
                                </ul>
                              </div>
                              <div className={styles.stageBodyInner}>
                                <div className={styles.tableWrap}>
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Counselling Category</th>
                                        <th>Category</th>
                                        <th>Registration Fee</th>
                                        <th>Refundable Security Deposit</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>AIQ Government Colleges, Government Aided Colleges, Central Universities &amp; National Institutes</td>
                                        <td>UR EWS OBC NCL</td>
                                        <td>Rs. 1,000</td>
                                        <td>Rs. 20,000</td>
                                      </tr>
                                      <tr>
                                        <td>AIQ Government Colleges, Government Aided Colleges, Central Universities &amp; National Institutes</td>
                                        <td>SC ST PwBD</td>
                                        <td>Rs. 500</td>
                                        <td>Rs. 20,000</td>
                                      </tr>
                                      <tr>
                                        <td>Deemed Universities</td>
                                        <td>All Categories</td>
                                        <td>Rs. 5,000</td>
                                        <td>Rs. 50,000</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <p style={{ marginTop: 10, fontSize: 16 }}><strong>Note:</strong> Candidates opting for both Government and Deemed University counselling must pay the higher applicable fee.</p>
                              </div>
                            </>
                          ) : stage.body === 'seat-factors' ? (
                            <div className={styles.stageBodyInner}>
                              <strong>AACCC processes seat allotment based on multiple factors, including:</strong>
                              <ul><li>NEET UG 2026 Rank</li><li>Candidate Category</li><li>Reservation Policy</li><li>Availability of Seats</li><li>Order of College Preferences</li></ul>
                            </div>
                          ) : stage.body === 'reporting-list' ? (
                            <div className={styles.stageBodyInner}>
                              <strong>The admission process generally includes:</strong>
                              <ul><li>Document Verification</li><li>Submission of Original Documents</li><li>Payment of Admission Fees</li><li>Completion of College Admission Formalities</li></ul>
                            </div>
                          ) : (
                            <div className={styles.stageBodyInner}>{stage.body}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── MINI CTA ─── */}
            <section className={styles.miniCta}>
              <div className={styles.miniCtaContent}>
                <div className={styles.miniCtaIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: 'var(--gold-light)' }}
                  >
                    <path
                      d="M1.5 4.42 C0.14 4.9 1.21 9.08 2.67 10.83 C4.13 12.58 8.79 12.98 10.25 14.92 C11.71 16.86 11.03 22.99 11.42 22.5 C11.81 22.01 12.68 14.43 12.58 12.0 C12.48 9.57 12.68 9.18 10.83 7.92 C8.98 6.66 2.86 3.94 1.5 4.42 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20.75 1.5 C20.07 0.53 17.54 1.5 16.08 2.08 C14.62 2.66 12.39 3.44 12.0 5.0 C11.61 6.56 12.88 10.45 13.75 11.42 C14.62 12.39 16.18 11.41 17.25 10.83 C18.32 10.25 19.59 9.48 20.17 7.92 C20.75 6.36 21.43 2.47 20.75 1.5 Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className={styles.miniCtaText}>
                  <h2><span style={{ fontWeight: 400, fontSize: 25 }}>From NEET UG to BAMS,</span><br />We&apos;re With You Every Step.</h2>
                </div>
                <a href="tel:08022454991" className={styles.miniCtaBtn} data-enquiry-trigger>
                  <i className="bi bi-telephone-fill" />
                  Enquire Now
                </a>
              </div>
            </section>

            {/* ─── KEA COUNSELLING ─── */}
            <section className={`${styles.bamsSection} ${styles.keaSection}`} id="kea-counselling">
              <div className={`${styles.wrap} ${styles.keaWrap}`}>
                <h2 className={`${styles.keaTitle} ${styles.animateOnScroll}`}>Karnataka AYUSH Counselling 2026 Process</h2>
                <p className={`${styles.keaLead} ${styles.animateOnScroll}`}>
                  The Karnataka AYUSH counselling process is conducted by the Karnataka Examinations Authority
                  (KEA) for admission to AYUSH courses across the state. Candidates must qualify
                  NEET UG 2026 and complete the KEA counselling registration to participate.
                </p>

                <div className={`${styles.keaSummaryRow} ${styles.animateOnScroll}`}>
                  <div className={styles.keaSummaryCard}>
                    <span className={styles.keaSummaryLabel}>Conducted by</span>
                    <span className={styles.keaSummaryValue}>KEA, Government of Karnataka</span>
                  </div>
                  <div className={styles.keaSummaryCard}>
                    <span className={styles.keaSummaryLabel}>Eligibility</span>
                    <span className={styles.keaSummaryValue}>NEET UG 2026 + KEA Registration</span>
                  </div>
                </div>

                <p className={`${styles.keaSubhead} ${styles.animateOnScroll}`}>KEA Conducts Counselling For</p>
                <div className={`${styles.keaScopeGrid} ${styles.animateOnScroll}`}>
                  {[
                    { cls: styles.keaScopeIconInk, label: 'Government Quota seats in Government AYUSH colleges', path: <path d="M3 10l9-6 9 6M5 10v9M19 10v9M9 10v9M15 10v9M3 21h18" /> },
                    { cls: styles.keaScopeIconGold, label: 'Private Quota seats in Private AYUSH colleges', path: <><path d="M3 21h7V9l-3.5-2L3 9v12z" /><path d="M10 21h11V6l-4-3-4 3v15z" /></> },
                    { cls: styles.keaScopeIconRust, label: 'Management Quota seats in Private AYUSH colleges', path: <><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></> },
                    { cls: styles.keaScopeIconInk, label: 'NRI Quota seats in Private AYUSH colleges', path: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" /></> }
                  ].map((item, i) => (
                    <div key={i} className={styles.keaScopeCard}>
                      <div className={`${styles.keaScopeIcon} ${item.cls}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.path}</svg>
                      </div>
                      <div className={styles.keaScopeLabel}>{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className={`${styles.keaCallout} ${styles.animateOnScroll}`}>
                  <InfoSvg />
                  <span>Candidates must register through the official KEA counselling portal and complete the prescribed admission formalities within the notified schedule to become eligible for seat allotment.</span>
                </div>

                <p className={`${styles.keaSubhead} ${styles.animateOnScroll}`}>Counselling Process</p>
                <div data-kea-timeline-wrap className={styles.animateOnScroll}>
                  <ul className={styles.keaTimeline}>
                    {['Round 1', 'Round 2', 'Mop Up Round'].map((name, i) => (
                      <li key={i} className={styles.keaRound}>
                        <div className={styles.keaRoundIndex}>{i + 1}</div>
                        <div className={styles.keaRoundName}>{name}</div>
                      </li>
                    ))}
                    <li className={`${styles.keaRound} ${styles.keaRoundSvr}`} role="button" tabIndex={0} aria-expanded="false" data-kea-svr>
                      <div className={`${styles.keaRoundIndex} ${styles.keaRoundIndexActive}`}>
                        <ChevronDownSvg />
                      </div>
                      <div className={styles.keaRoundName}>Stray Vacancy Round</div>
                    </li>
                  </ul>
                  <div className={styles.keaAccordion} data-kea-panel>
                    <div className={styles.keaAccordionInner}>
                      <div className={styles.keaSvrCard}>
                        <h4><strong>Note: </strong>The Mop Up Round is conducted if seats remain vacant after Round 2. If vacancies still exist after the Mop Up Round, KEA may conduct one or more Stray Vacancy Rounds in accordance with the counselling schedule and seat availability.</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── KEA STAGES ─── */}
            <section className={`${styles.bamsSection} ${styles.keaSectionTwo}`}>
              <div className={styles.wrap}>
                <div className={`${styles.sectionHead} ${styles.sectionHeadCenter} ${styles.animateOnScroll}`}>
                  <h2>KEA NEET UG AYUSH Counselling 2026 Stages</h2>
                  <p>The Karnataka Examinations Authority (KEA) conducts the AYUSH counselling process through multiple stages. Candidates must complete each stage within the prescribed timeline to remain eligible for seat allotment.</p>
                </div>
                <div className={styles.stageList}>
                  {[
                    { num: 1, title: 'Stage 1: Online Registration', summary: 'The counselling process begins with online registration on the official KEA website. Registration is considered complete only after the successful submission of the application and payment of the counselling fee.', bodyTitle: 'Candidates must:', items: ['Register using the prescribed application form.', 'Enter the required personal, academic, and NEET UG details.', 'Upload the necessary documents, if applicable.', 'Pay the prescribed counselling fee within the specified deadline.'] },
                    { num: 2, title: 'Stage 2: Document Verification', summary: 'After registration, eligible candidates must complete document verification as per the schedule announced by KEA. During this stage, the authorities verify the candidate\'s eligibility, reservation claims, and supporting documents.', bodyText: 'Candidates who successfully complete the verification process receive a verification acknowledgement, enabling them to participate in the subsequent counselling stages.' },
                    { num: 3, title: 'Stage 3: Option Entry', summary: 'Verified candidates can participate in the option entry process. The order of preferences plays an important role in determining seat allotment.', bodyTitle: 'During this stage, candidates must:', items: ['Select their preferred AYUSH colleges and courses.', 'Arrange the selected options in the order of preference.', 'Modify, add, or delete choices within the option entry period.'] },
                    { num: 4, title: 'Stage 4: Mock Seat Allotment', summary: 'Before the final allotment, KEA generally publishes a mock seat allotment based on the options entered by candidates.', bodyTitle: 'The mock allotment enables candidates to:', items: ['Understand their probable allotment.', 'Analyse their admission chances.', 'Revise their option entry before the final seat allotment.'], bodyNote: 'The mock allotment is indicative in nature and does not guarantee the final allotment.' },
                    { num: 5, title: 'Stage 5: Final Seat Allotment', summary: 'Following the option entry period, KEA publishes the final seat allotment results. Candidates can download their allotment letter through the KEA portal.', bodyTitle: 'Seat allotment is based on factors such as:', items: ['NEET UG Rank', 'Candidate Category', 'Reservation Policy', 'Availability of Seats', 'Order of Preferences'] },
                    { num: 6, title: 'Stage 6: Post Allotment Process', summary: 'Candidates allotted a seat must complete the admission formalities within the prescribed deadline. Failure to complete the required formalities within the specified timeline may result in cancellation of the allotted seat.', bodyTitle: 'The process in this stage includes:', items: ['Selecting the appropriate admission option as notified by KEA.', 'Payment of the prescribed fees.', 'Reporting to the allotted college.', 'Completion of document verification and admission formalities at the institute.'], bodyNote: 'Note: KEA follows a structured seat allotment methodology based on merit, reservation policies, category wise seat availability, and candidate preferences.' }
                  ].map((stage, i) => (
                    <div key={stage.num} className={`${styles.stageItem} ${styles.animateOnScroll} ${i > 0 ? styles[`delay${Math.min(i, 4)}` as keyof typeof styles] || '' : ''}`}>
                      <div className={`${styles.stageNode} ${styles.stageNodeGold}`}>{stage.num}</div>
                      <div className={styles.stageCard} data-stage>
                        <div className={styles.stageTop}><h4>{stage.title}</h4></div>
                        <p className={styles.stageSummary}>{stage.summary}</p>
                        <div className={styles.stageBody}>
                          <div className={styles.stageBodyInner}>
                            {'bodyText' in stage && stage.bodyText ? (
                              <>{stage.bodyText}</>
                            ) : (
                              <>
                                {'bodyTitle' in stage && <p><strong>{stage.bodyTitle}</strong></p>}
                                {stage.items && <ul>{stage.items.map((item, j) => <li key={j}>{item}</li>)}</ul>}
                                {'bodyNote' in stage && stage.bodyNote && <p><strong>{stage.bodyNote}</strong></p>}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── DOCUMENTS ─── */}
            <section className={`${styles.bamsSection} ${styles.docsSection}`}>
              <div className="container">
                <h2 className={styles.docsTitle}>BAMS Counselling Documents Required for 2026</h2>
                <p className="text-center">Candidates participating in the BAMS counselling process should keep the following original documents and a few sets of self attested photocopies ready for verification and admission.</p>
                <div className={styles.docsGrid} id="docsGrid">
                  {DOCUMENTS.map((doc, i) => (
                    <div key={i} className={styles.docItem} style={{ '--i': i } as React.CSSProperties} data-doc-item>
                      <span className={styles.docCheck}><CheckSvg /></span>
                      <span className={styles.docText}>{doc}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.docsNote} role="alert">
                  <WarningSvg />
                  <p><strong>Note:</strong> The list of required documents may vary depending on the counselling authority (AACCC or State Counselling Authority), the allotted institution, and the candidate&apos;s reservation category. Candidates are advised to refer to the latest official counselling notification before reporting for admission.</p>
                </div>
              </div>
            </section>

            {/* ─── RANK PREDICTOR ─── */}
            <section className={`${styles.bamsSection} ${styles.predictorSection}`} id="predictor">
              <div className={styles.wrap}>
                <BamsPredictorClient />
              </div>
            </section>

            {/* ─── TOP COLLEGES ─── */}
            <section className={styles.ccSection} id="colleges">
              <div className={styles.ccContainer}>
                <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
                  <h2>Top BAMS Colleges in Karnataka</h2>
                  <p>Below is a list of some of the top NEET AYUSH counselling-participating colleges in Karnataka.</p>
                </div>
                <div className={styles.ccGrid}>
                  {COLLEGES.map((college, i) => (
                    <div key={i} className={styles.ccCard}>
                      <div className={styles.ccLogo}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={college.img} alt={`${college.name} logo`} width={76} height={76} />
                      </div>
                      <h3 className={styles.ccName}>{college.name}</h3>
                      <p className={styles.ccLocation}><LocationSvg />{college.city}</p>
                      <button className={styles.ccBtn} data-enquiry-trigger>Enquire Now</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className={`${styles.bamsSection} ${styles.faqSection}`} id="faqs">
              <div className="container">
                <div className="row align-items-start g-5">
                  <div className="col-lg-4">
                    <div className={styles.faqHeading}>
                      <h2>Frequently Asked Questions</h2>
                      <p>Find answers to the most common questions about BAMS Counselling 2026.</p>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className={`accordion ${styles.faqAccordion}`} id="faqAccordion">
                      {FAQS.map((faq, i) => (
                        <div key={i} className="accordion-item">
                          <h2 className="accordion-header">
                            <button className={`accordion-button ${i > 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq${i}`}>
                              {faq.q}
                            </button>
                          </h2>
                          <div id={`faq${i}`} className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`} data-bs-parent="#faqAccordion">
                            <div className="accordion-body">{faq.a}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section
              className={styles.finalCta}
              id="contact"
              style={{
                background: `linear-gradient(rgba(255,255,255,0), rgba(18,32,70,0.598), rgba(18,32,70,.68)), url("${contactBg}") center/cover`
              }}
            >
              <div className={styles.ctaContent}>
                <h2>Secure Your BAMS Seat With Expert NEET UG Counselling</h2>
                <div className={styles.finalActions}>
                  <a href="tel:08022454991" className={styles.finalActionsBtn} data-enquiry-trigger>Enquire Now</a>
                </div>
              </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className={styles.footer}>
              <div className={styles.wrap}>
                <div className={styles.footerWrapper}>
                  <div className={styles.footerLeft}>
                    <a href="#home" className={styles.footerLogo}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/footer650.webp" alt="LearnTech" />
                    </a>
                    <p className={styles.footerTagline}>
                      Dream. Apply. Achieve. Our Expert Admission Guidance is the Bridge that Connects You to a Brighter Future.
                    </p>
                  </div>
                  <div className={styles.footerRight}>
                    <h4>Connect with us</h4>
                    <div className={styles.footerPhone}>
                      <a href="tel:08022454991"><i className="bi bi-telephone-fill" style={{ fontSize: 13, color: '#FFD54A' }} /> 080-22454991</a>
                      <a href="tel:08026631169"><i className="bi bi-telephone-fill" style={{ fontSize: 13, color: '#FFD54A' }} /> 080-26631169</a>
                    </div>
                    <div className={styles.footerPhone}>
                      <a href="tel:09036020076"><i className="bi bi-telephone-fill" style={{ fontSize: 13, color: '#FFD54A' }} /> +91 9036020076</a>
                      <a href="tel:18001208696"><i className="bi bi-telephone-fill" style={{ fontSize: 13, color: '#FFD54A' }} /> 1800 120 8696 (Toll Free)</a>
                    </div>
                    <div className={styles.footerPhone}>
                      <a href="tel:+971502436552"><i className="bi bi-telephone-fill" style={{ fontSize: 13, color: '#FFD54A' }} /> +971 585672211 (Dubai)</a>
                    </div>
                    <div className={styles.footerSocial}>
                      <a href="https://www.facebook.com/learntechedu" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook" /></a>
                      <a href="https://x.com/learntechww" target="_blank" rel="noopener noreferrer">
                        <Image width={20} height={20} src="/images/icons/twitter-x.png" alt="Twitter" style={{ filter: 'brightness(0) invert(1)' }} />
                      </a>
                      <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube" /></a>
                      <a href="https://www.instagram.com/learntechedus/" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram" /></a>
                      <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>

          </BamsInteractiveClient>
        </BamsEnquiryTriggerClient>

        {/* ─── FLOATING ICONS ─── */}
        <a href="tel:08022454991" className={styles.phoneFloat}>
          <i className="bi bi-telephone-fill" style={{ fontSize: 29, color: 'white' }} />
        </a>
        <a href="https://api.whatsapp.com/send?phone=919036020076" target="_blank" rel="noopener noreferrer" className={styles.whatsappFloat}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/bams/whatsappc.gif" alt="WhatsApp" width={63} height={64} />
        </a>
      </div>
    </>
  )
}

import Image from 'next/image'
import JsonLd from 'src/app/components/JsonLd'
import styles from './BamsPage.module.css'

import BamsNavbarClient from './BamsNavbarClient'
import BamsHeroFormClient from './BamsHeroFormClient'
import BamsPredictorClient from './BamsPredictorClient'
import BamsEnquiryTriggerClient from './BamsEnquiryTriggerClient'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/bams-counselling-process'

/* ─── Image constants ─── */
const backgroundImageUrl = '/images/bams/Home-Banner.webp'
const whyimg1 = '/images/bams/whyimg1.webp'
const whyimg2 = '/images/bams/whyimg2.webp'
const whyimg3 = '/images/bams/whyimg3.webp'
const whyimg4 = '/images/bams/whyimg4.webp'
const AACCC = '/images/bams/AACCC.webp'
const KEA = '/images/bams/KEA.webp'
const Amrutha = '/images/bams/Amrutha.webp'
const Ashwini = '/images/bams/Ashwini.webp'
const Atreya = '/images/bams/Atreya.webp'
const JSS = '/images/bams/JSS.webp'
const Kankanawadi = '/images/bams/Kankanawadi.webp'
const Indian = '/images/bams/old-Indian.webp'
const SDM = '/images/bams/SDM.webp'
const Sharada = '/images/bams/Sharada.webp'
const Shri = '/images/bams/Shri.webp'
const Sri = '/images/bams/Sri.webp'
const Sushrutha = '/images/bams/Sushrutha.webp'
const Yenepoya = '/images/bams/Yenepoya.webp'
const contactbanner = '/images/bams/contactbanner.webp'
const whatsappc = '/images/bams/whatsappc.gif'

/* ─── Static data ─── */
const scheduleData = [
  {
    process: 'Registration',
    round1: 'Aug 28 - Sept 3, 2024\n(Till 5:00 PM)',
    round2: 'Sept 18 - Sept 23, 2024\n(Till 2:00 PM)',
    round3: 'Oct 9 - Oct 14, 2024\n(Till 2:00 PM)',
    stray: 'Oct 28 - Oct 31, 2024\n(Till 2:00 PM)'
  },
  {
    process: 'Payment',
    round1: 'Aug 28 -Sept 3, 2024\n(Till 8:00 PM)',
    round2: 'Sept 18 - Sept 23, 2024\n(Till 5:00 PM)',
    round3: 'Oct 9 - Oct 14, 2024\n(Till 5:00 PM)',
    stray: 'Oct 28 - Oct 31, 2024\n(Till 5:00 PM)'
  },
  {
    process: 'Choice-Filling',
    round1: 'Aug 29 - Sept 3, 2024\n(Till 11:55 PM)',
    round2: 'Sept 19 - Sept 23, 2024\n(Till 11:55 PM)',
    round3: 'Oct 10 - Oct 14, 2024\n(Till 11:55 PM)',
    stray: 'Oct 29 - Oct 31, 2024\n(Till 11:55 PM)'
  },
  {
    process: 'Choice-Locking',
    round1: 'Sept 3, 2024\n(6:00 PM to 11:55 PM)',
    round2: 'Sept 23, 2024\n(2:00 PM to 11:55 PM)',
    round3: 'Oct 14, 2024\n(2:00 PM to 11:55 PM)',
    stray: 'Oct 31, 2024\n(2:00 PM to 11:55 PM)'
  },
  {
    process: 'Seat Allotment Processing',
    round1: 'Sept 4, 2024',
    round2: 'Sept 24 - Sept 25, 2024',
    round3: 'Oct 15 - Oct 16, 2024',
    stray: 'November 1, 2024'
  },
  {
    process: 'Result',
    round1: '<strong>September 5, 2024</strong>',
    round2: '<strong>September 26, 2024</strong>',
    round3: '<strong>October 17, 2024</strong>',
    stray: '<strong>November 2, 2024</strong>'
  },
  {
    process: 'Reporting',
    round1: 'Sept 6 - Sept 11, 2024',
    round2: 'Sept 27 - Oct 3, 2024',
    round3: 'Oct 18 - Oct 22, 2024',
    stray: 'Nov 3 - Nov 7, 2024'
  },
  {
    process: "Candidates' Data Verification by Institutes",
    round1: 'Sept 12 - Sept 13, 2024',
    round2: 'Oct 4 - Oct 5, 2024',
    round3: 'Oct 23 - Oct 24, 2024',
    stray: 'Nov 8 - Nov 9, 2024'
  }
]

const whyUsItems = [
  {
    title: 'Team of Experts',
    desc: 'Our team of qualified experts with decades of experience in the All-India BAMS Counselling and the BAMS state Counselling processes help students navigate their dreams with ease.',
    icon: whyimg1
  },
  {
    title: 'Personalised Sessions',
    desc: 'Aspirants get 1-1 admission guidance, enabling them to smoothly glide through the complicated NEET BAMS Counselling process. Sessions are customised as per the student\'s rank, preferences and budget.',
    icon: whyimg2
  },
  {
    title: 'No-Time Wasted',
    desc: 'Preparations for the All India Medical Counselling/ Karnataka BAMS Counselling can be time-consuming. This is where the insight of our experts comes into play, as they can help in preparing you for the counselling process within a short period.',
    icon: whyimg3
  },
  {
    title: 'Post-Admission Support',
    desc: 'The experts will continue to assist you with activities even after seat allotment.This includes help with document collection, college reporting, and ensuring a smooth transition to campus life.',
    icon: whyimg4
  }
]

const colleges = [
  { img: Kankanawadi, name: "KAHER's Shri BM Kankanawadi Ayurveda Mahavidyalaya Post Graduate Studies and Research Centre", city: 'Belagavi', heightClass: 'bamsHeightCollege' },
  { img: Yenepoya, name: 'Yenepoya Ayurveda Medical College and Hospital', city: 'Mangalore', heightClass: 'bamsHeightCollege' },
  { img: Amrutha, name: 'Amrutha Ayurvedic Medical College (AAMC)', city: 'Chitradurga', heightClass: 'bamsHeightCollege' },
  { img: Sri, name: 'Sri Kalabyraveshwara Swamy Ayurvedic Medical College, Hospital and Research Centre (SKAMCH & RC)', city: 'Bangalore', heightClass: 'bamsHeightCollege' },
  { img: Sharada, name: 'Sharada Ayurveda Medical College and Hospital (SAMCH)', city: 'Mangalore', heightClass: 'bamsHeight' },
  { img: Sushrutha, name: 'Sushrutha Ayurvedic Medical College & Hospital', city: 'Bangalore', heightClass: 'bamsHeight' },
  { img: Ashwini, name: 'Ashwini Ayurvedic Medical College & Research Centre', city: 'Tumkur', heightClass: 'bamsHeight' },
  { img: SDM, name: 'SDM College of Ayurveda & Hospital', city: 'Udupi', heightClass: 'bamsHeight' },
  { img: Atreya, name: 'Atreya Ayurvedic Medical College Hospital & Research Centre', city: 'Bangalore', heightClass: 'bamsHeight' },
  { img: Shri, name: 'Shri Kalidas Ayurvedic Medical College and Hospital', city: 'Badami', heightClass: 'bamsHeight' },
  { img: Indian, name: 'Indian Institute of Ayurvedic Medicine & Research', city: 'Bangalore', heightClass: 'bamsHeight' },
  { img: JSS, name: 'JSS Ayurveda Medical College', city: 'Mysore', heightClass: 'bamsHeight' },
]

/* ─── Metadata (server-side) ─── */
export async function generateMetadata() {
  const title = 'BAMS Counselling Process 2025-26 | NEET-UG BAMS Admission Guidance'
  const description = 'Navigate through the NEET-UG 2025 BAMS Counselling Process. Get expert guidance for All-India AACCC and Karnataka KEA BAMS counselling. Secure your BAMS seat today.'
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Learntech Edu Solutions',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/images/bams/Home-Banner.webp`,
          width: 1200,
          height: 630,
          alt: 'BAMS Counselling Process 2025-26',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/* ─── Page (Server Component) ─── */
export default function Page() {
  /* JSON-LD Schemas */
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'BAMS Counselling Process', item: `${BASE_URL}${PAGE_PATH}` },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'BAMS Counselling Process 2025-26',
    description: 'Navigate through the NEET-UG 2025 BAMS Counselling Process with expert guidance.',
    url: `${BASE_URL}${PAGE_PATH}`,
    publisher: {
      '@type': 'Organization',
      name: 'Learntech Edu Solutions',
      url: BASE_URL,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the AACCC BAMS Counselling 2025?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The AIQ BAMS counselling is conducted by the Ayush Admissions Central Counselling Committee (AACCC) for All-India quota seats in Ayurvedic colleges, deemed universities, central universities, and private institutes. It consists of 4 rounds: Round 1, Round 2, Round 3, and Stray Vacancy Round.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the stages of BAMS counselling?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The BAMS counselling consists of 7 stages: Registration, Fee Payment, Choice-Filling, Choice-Locking, Seat Allotment Process, Result Announcement, and Reporting to College & Document Verification.'
        }
      },
      {
        '@type': 'Question',
        name: 'What documents are required for BAMS counselling?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Required documents include: 10th, 11th and 12th Marksheets, NEET-UG Application Form, NEET-UG Admit Card, NEET-UG Scorecard, NEET-UG Rank Letter, Valid Government-issued ID Proof, Passport Size Photographs, Transfer Certificate, Medical Fitness Certificate, and Provisional Allotment Letter issued by AACCC.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the KEA BAMS Counselling 2025 work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Karnataka Examinations Authority (KEA) conducts BAMS counselling in Karnataka for government quota, private quota, management quota, and NRI quota seats. It consists of 4 rounds: Round 1, Round 2, Mop-Up Round, and Stray Vacancy Round.'
        }
      }
    ]
  }

  return (
    <>
      <JsonLd id='bams-breadcrumb-schema' schema={breadcrumbSchema} />
      <JsonLd id='bams-webpage-schema' schema={webPageSchema} />
      <JsonLd id='bams-faq-schema' schema={faqSchema} />

      <BamsEnquiryTriggerClient>
          <section className={styles.bamsMain}>

            {/* ─── Floating Phone Icon ─── */}
            <div className='text-md-start'>
              <a href='tel:09036020076' className={styles.phoneIconphone}>
                <Image
                  src='/images/icons/Phone-blue.svg'
                  width={40}
                  height={28}
                  alt='Call us'
                  className={styles.redFilter}
                />
              </a>
            </div>

            {/* ─── Floating WhatsApp ─── */}
            <a
              href='https://wa.me/+919036020076'
              style={{
                position: 'fixed',
                width: 63,
                height: 64,
                bottom: 8,
                right: 8,
                borderRadius: 50,
                textAlign: 'center',
                fontSize: 44,
                zIndex: 1059
              }}
              target='_blank'
              rel='noopener noreferrer'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={whatsappc} alt='WhatsApp' style={{ width: '66px' }} />
            </a>

            {/* ─── Navbar (Client) ─── */}
            <BamsNavbarClient />

            {/* ─── Hero Section ─── */}
            <section className='d-flex align-items-center pb-0 px-0' id='home'>
              <div
                className={`container-fluid ${styles.bamsimage}`}
                style={{
                  background: `linear-gradient(341deg, rgb(0 0 0 / 0%), rgb(0 0 0 / 0%)), url(${backgroundImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className='container-fluid p-md-2 p-4'>
                  <div className={`row gap-md-0 gap-4 ${styles.bamsHomePadding} mt-md-5 mt-0`}>
                    <div className='col-xl-7 col-lg-7 col-md-7 text-center pt-4 pt-md-0'>
                      <div className={`${styles.bgblacksvyasa} ${styles.slideIn} px-md-0 px-2 mt-5 mt-md-0`}>
                        <h1 className={`text-center ${styles.h1svyasa} pt-4 pt-md-5`}>
                          Navigate through the NEET-UG 2025 BAMS Counselling Process
                        </h1>
                        <h2 className={`text-center ${styles.bamsBlue} pt-4 ${styles.blinkingText} pb-md-0 pb-2`}>
                          Begin Your Journey in Ayurvedic Medicine Today!
                        </h2>

                        <p className={`${styles.bamsPhomepage} pt-md-4`}>
                          Get into the Best Ayurvedic Colleges in Karnataka and Other Indian States through the NEET All-India
                          Counselling and the KEA Counselling with the Help of Expert Counsellors.
                        </p>
                        <div className='form-group text-center mt-md-4 pb-md-4 mt-4 pb-3'>
                          <button
                            data-enquiry-trigger
                            className={`btn btn-success btn-bds-add-svyasa-apply ${styles.colorBtnAddApply} p-3 px-4 mb-md-0 mb-3`}
                          >
                            Talk to an Expert Now!
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='col-xl-5 col-lg-5 col-md-5'>
                      <BamsHeroFormClient />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Why Us Section ─── */}
            <section>
              <div className='col-lg-12 text-center pb-3 bg-white' id='whyus'>
                <h3 className={`${styles.f3mountSvayauni} pt-md-2 pt-4 mt-md-4 mb-md-4`}>Why Us?</h3>
              </div>

              <section className={`${styles.whyUsSection} text-white`}>
                <div className='container'>
                  <div className='row text-center'>
                    {whyUsItems.map((item, i) => (
                      <div key={i} className='col-12 col-sm-6 col-lg-3 mb-4'>
                        <div className={`${styles.whyUsCard} p-4 h-100 text-center`}>
                          <div
                            className={`${styles.iconWrapper} mb-3`}
                            style={{
                              backgroundImage: `url(${item.icon})`,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              width: '60px',
                              height: '60px',
                              margin: '0 auto'
                            }}
                          />
                          <h5 className='fw-bold'>{item.title}</h5>
                          <p className='small'>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </section>

            {/* ─── All About NEET-UG BAMS Counselling 2025 ─── */}
            <section id='counceling'>
              <div className='col-lg-12 text-center pb-3 bg-white'>
                <h3 className={`${styles.f3mountSvayauni} pt-md-2 pt-4 mt-md-4 mb-md-4`}>All About NEET-UG BAMS Counselling 2025</h3>
              </div>
              <section className={styles.neetCounsellingSection}>
                <div className='container'>
                  <div className={`${styles.infoCard} d-flex flex-column flex-md-row align-items-center gap-4 p-4 p-md-4 mb-5 ${styles.shadowBox}`}>
                    <div className={`${styles.logoBox} text-center bg-white shadow-sm`}>
                      <Image src={AACCC} alt='AACCC Logo' width={120} height={120} priority />
                    </div>
                    <div className='text-box text-center text-md-start'>
                      <h2 className={`${styles.counsellingHeading} m-0 fw-bold`}>All India BAMS Counselling 2025</h2>
                    </div>
                  </div>

                  <ul className={`${styles.neetList} mb-4`}>
                    <li>The AIQ BAMS counselling is conducted by the Ayush Admissions Central Counselling Committee (AACCC).</li>
                    <li>To participate in the All-India counselling, students must first clear the NEET-UG entrance exam.</li>
                    <li>AACCC conducts counselling for the All-India quota seats in Ayurvedic colleges, as well as seats in deemed universities, central universities, and private institutes offering Ayurveda programs.</li>
                    <li>The BAMS counselling procedure will consist of 4 rounds, namely</li>
                  </ul>

                  <ol className={`${styles.neetRounds1} mb-4`}>
                    <li>Round 1</li>
                    <li>Round 2</li>
                    <li>Round 3</li>
                    <li>Stray Vacancy Round</li>
                  </ol>

                  <div className='col-lg-12 container pt-md-3 pt-2 px-0'>
                    <p className={`${styles.paragaphFont18} pb-3`}>
                      However, the Stray Vacancy Round (SVR) will be held only if there are any vacant seats (empty, forfeited, declined) in government, government-aided, deemed, central universities, and national institutes after the completion of the first 3 counselling rounds. The SVR round for All India Quota (AIQ) seats in government, government-aided, central universities, and national institutes will be conducted online in two phases: SVR-I and SVR-II. A separate stray vacancy round, known as Stray Vacancy Round-Deemed Universities (SVR-DU), will be held for admission to seats in deemed universities. This is because seats at deemed universities are unreserved, i.e., the central government&apos;s reservation policy does not apply to them.
                    </p>
                  </div>
                </div>
              </section>
            </section>

            {/* ─── All-India NEET-UG BAMS Counselling 2025 Stages ─── */}
            <section>
              <div className='col-lg-12 text-center pb-3 bg-white'>
                <h3 className={`${styles.f3mountSvayauni} pt-md-2 pt-0 mt-md-0 mb-md-0 ${styles.paddingMobilebams}`}>
                  All-India NEET-UG BAMS Counselling 2025 Stages
                </h3>
              </div>
              <section className={`${styles.neetCounsellingSection} py-md-4 py-3`}>
                <div className='container'>
                  <div>
                    <p className={`${styles.paragaphFont18} text-center`}>
                      Each of the AACCC BAMS counselling rounds has various stages. These stages will remain the same for most of the rounds. The AACCC releases the BAMS counselling seat matrix before the commencement of each round.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 1: Registration for BAMS Counselling</h3>
                    <p className={styles.paragaphFont18}>
                      This is the first stage of the All-India BAMS counselling process, wherein interested aspirants are required to register for the respective round by visiting the AACCC official website and providing the necessary details. This stage applies to all the rounds of the counselling process except the Stray Vacancy Round Phase-2 (SVR-2). I.e. Candidates who had registered for SVR-1, but have not procured a seat, can participate in SVR-2 without the need to manually register for the round, provided they have met the eligibility criteria.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 2: Fee Payment</h3>
                    <p className={styles.paragaphFont18}>
                      There are two types of fees that a student has to pay at the time of registration. They are:
                    </p>
                    <ul>
                      <li className={styles.paragaphFont18}>Non-refundable BAMS counselling registration fees</li>
                      <li className={styles.paragaphFont18}>Refundable Security Deposit</li>
                    </ul>
                  </div>

                  {/* Fee Payment Table */}
                  <div className={styles.tableWrapper}>
                    <table className={styles.customTable1}>
                      <thead>
                        <tr>
                          <th className={styles.bdrMainatin}>Selection of Counselling Type</th>
                          <th className={styles.bdrMainatin}>Candidate Category</th>
                          <th className={styles.bdrMainatin}>Registration Fee</th>
                          <th>Security Deposit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td rowSpan={2}>
                            <ul>
                              <li className={styles.listNone}>AIQ - Government College</li>
                              <li className={styles.listNone}>AIQ - Government Aided College</li>
                              <li className={styles.listNone}> Central University / National Institute </li>
                            </ul>
                          </td>
                          <td>UR / EWS / OBC-NCL</td>
                          <td>Rs. 1,000</td>
                          <td rowSpan={2}> Rs. 20,000</td>
                        </tr>
                        <tr>
                          <td>SC / ST / PwBD</td>
                          <td>Rs. 500</td>
                        </tr>
                        <tr className={styles.trDesign}>
                          <td className={styles.bdrMainatin}> Deemed University</td>
                          <td className={styles.bdrMainatin}>All Categories</td>
                          <td className={styles.bdrMainatin}>Rs. 5,000</td>
                          <td>Rs. 50,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <p className={styles.paragaphFont18}>
                      <span className={styles.note}> Note:</span> Candidates willing to apply for both the counselling categories have to pay the higher amount, i.e., the fee for Deemed University (Rs 5,000 for registration + Rs 50,000 for security amount)
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 3: Choice-Filling</h3>
                    <p className={styles.paragaphFont18}>
                      This is the third stage of the counselling process, wherein the candidates must opt for the BAMS course and the desired colleges in order of their preferences. These choices can be edited or rearranged till the choice-filling window is open. This stage will reset for each of the counselling rounds. This means that the choices filled during Round 1 will not be considered for Round 2. Similarly, the choices submitted in Rounds 1 and 2 will not be considered for Round 3, and the choices filled in Rounds 1, 2 and 3 will be considered null and void in SVR-1. However, this stage does not apply to SVR-2, as the choices filled in SVR-1 are carried forward for the particular round. Additionally, it does not apply to SVR-DU as well. Therefore, eligible candidates must approach the respective deemed universities for seat allotment in the online SVR-DU round.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 4: Choice-Locking</h3>
                    <p className={styles.paragaphFont18}>
                      The next step is choice locking, during which candidates are required to finalise their selected choices. It is important to note that once the choices are locked, they cannot be changed for the respective round. The organising body will auto-lock the choices for those candidates who do not lock their choices within the given time frame. Similar to stage 3, this stage is also not applicable for SVR-2 and SVR-DU.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 5: Seat Allotment Process:</h3>
                    <p className={styles.paragaphFont18}>
                      In this stage, the organising body, Ayush Admissions Central Counselling Committee, assigns the course and the college to the students. However, the allotment process depends on various factors, such as:
                    </p>
                    <ul>
                      <li className={styles.paragaphFont18}>Candidates&apos; NEET score</li>
                      <li className={styles.paragaphFont18}>Availability of seats in the preferred choices.</li>
                      <li className={styles.paragaphFont18}>Candidate Category </li>
                    </ul>
                    <p className={styles.paragaphFont18}>
                      Candidates who have not been allotted a seat in the current round are eligible to apply for the next round.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 6: Result Announcement</h3>
                    <p className={styles.paragaphFont18}>
                      In this stage, the AACCC publishes the final result of the respective counselling round. However, before the final results, a mock seat allotment result list is released by the conducting body to help students estimate their chances of admission to the desired college.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 7: Reporting to College &amp; Document Verification</h3>
                    <p className={styles.paragaphFont18}>
                      This is the final part of the BAMS counselling process. In this stage, candidates are required to report to the designated college in person and complete the admission formalities. This includes submission of the required documents and paying the admission fees. Once the documents are submitted, the authoritative body will verify them to confirm the candidates&apos; seat. The seats of those candidates who have not reported to the college within the stipulated time will be considered vacant for the next round.
                    </p>
                  </div>
                </div>
              </section>
            </section>

            {/* ─── AACCC BAMS 2024 Counselling Dates ─── */}
            <section className='bg-white'>
              <div className='col-lg-12 text-center pb-3 bg-white'>
                <h3 className={`${styles.f3mountSvayauni} pt-md-0 pt-0 mt-md-0 mb-md-0`}>AACCC BAMS 2024 Counselling Dates</h3>
              </div>

              <div className={`${styles.tableWrapper} mx-auto ${styles.table2heightfixed} bg-white`}>
                <table className={styles.customTable}>
                  <thead>
                    <tr>
                      <th className={styles.bdrMainatin}>Process</th>
                      <th className={styles.bdrMainatin}>Round 1</th>
                      <th className={styles.bdrMainatin}>Round 2 </th>
                      <th className={styles.bdrMainatin}>Round 3</th>
                      <th>Stray Vacancy Round 1</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleData.map((item, idx) => (
                      <tr key={idx}>
                        <td
                          className={`fw-medium ${styles.bdrMainatin} ${styles.sizebams} ${item.process === "Candidates' Data Verification by Institutes" ? styles.highlightRow : ''}`}
                        >
                          {item.process}
                        </td>
                        <td className={styles.bdrMainatin} dangerouslySetInnerHTML={{ __html: item.round1.replace(/\n/g, '<br/>') }} />
                        <td className={styles.bdrMainatin} dangerouslySetInnerHTML={{ __html: item.round2.replace(/\n/g, '<br/>') }} />
                        <td className={styles.bdrMainatin} dangerouslySetInnerHTML={{ __html: item.round3.replace(/\n/g, '<br/>') }} />
                        <td className={styles.bdrMainatin} dangerouslySetInnerHTML={{ __html: item.stray.replace(/\n/g, '<br/>') }} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* KEA Card */}
              <div className='container'>
                <div className={`${styles.infoCard} d-flex flex-column flex-md-row align-items-center gap-4 p-4 p-md-4 mb-5 ${styles.shadowBox}`}>
                  <div className={`${styles.logoBox} text-center bg-white shadow-sm`}>
                    <Image src={KEA} alt='KEA Logo' width={120} height={120} priority />
                  </div>
                  <div className='text-box text-center text-md-start'>
                    <h2 className={`${styles.counsellingHeading} m-0 fw-bold`}>Karnataka AYUSH Counselling 2025 Process</h2>
                  </div>
                </div>

                <ul className={`${styles.neetList} mb-4`}>
                  <li>The KEA NEET-UG counselling will begin once the NEET-UG results are declared.</li>
                  <li>The Karnataka Examinations Authority (KEA) conducts the BAMS counselling in Karnataka for government quota, private quota, management quota, and NRI quota seats that are available in all the government and private Ayurveda colleges across the state.</li>
                  <li>Students must complete the Karnataka BAMS counselling registration on the Karnataka BAMS counselling official website (KEA) to be eligible for the KEA NEET-UG counselling process.</li>
                  <li>The KEA BAMS counselling 2025 process will be conducted in 4 rounds, namely</li>
                </ul>

                <ol className={`${styles.neetRounds1} mb-4`}>
                  <li>Round 1</li>
                  <li>Round 2</li>
                  <li>Mop-Up Round</li>
                  <li>Stray Vacancy Round</li>
                </ol>

                <ul className={`${styles.neetList} mb-4`}>
                  <li>The KEA conducts the Mop-Up Round only if seats remain unfilled after the first 2 rounds. Additionally, Stray Vacancy Rounds may be conducted by the KEA if the seats remain unfilled even after the Mop-Up Round in order to complete the BAMS 2025 counselling process.</li>
                </ul>
              </div>
            </section>

            {/* ─── KEA NEET-UG BAMS Counselling 2025 Stages ─── */}
            <section>
              <div className='col-lg-12 text-center pb-3 bg-white'>
                <h3 className={`${styles.f3mountSvayauni} pt-md-2 pt-3 mt-md-0 mb-md-0`}>KEA NEET-UG BAMS Counselling 2025 Stages</h3>
              </div>
              <section className={`${styles.neetCounsellingSection} py-3`}>
                <div className='container'>
                  <div>
                    <p className={`${styles.paragaphFont18} text-center`}>
                      The KEA NEET-UG BAMS counselling takes place in various rounds. Each round has multiple stages, which are explained below.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 1: Online Registration &amp; Fee Payment</h3>
                    <p className={styles.paragaphFont18}>
                      The first stage of the KEA BAMS counselling is online registration. Interested and eligible candidates must register through the Karnataka Ayush counselling website (KEA) within the stipulated time. Students are not required to send any documents or printouts of the application form to KEA to prove their eligibility during the registration process. The candidature of those students who are found ineligible at any stage by the KEA/ University will be cancelled with immediate effect. The registration stage is deemed to be complete once the candidates have paid the Karnataka BAMS counselling registration fees through the payment gateway using a credit card or a debit card.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 2: Document Verification</h3>
                    <p className={styles.paragaphFont18}>
                      In this stage, students must get their documents verified by the concerned authorities within the stipulated time. Once the verification is complete, eligible students must download the verification slip. The eligible rank holders must note that the organising body will not send any message/ reminder regarding the date and time of the verification process. The candidates who fail to verify the documents within the given time frame will not be eligible to exercise their options as part of the next stage. I.e., option entry.
                    </p>
                  </div>

                  <div>
                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 3: Option Entry</h3>
                    <p className={styles.paragaphFont18}>
                      Candidates who have cleared the document verification stage will be considered eligible for option entry. In this stage, the eligible candidates must enter their most preferred college as their first preference and must continue to enter their options in the order of their preferences. There is no limit to the number of colleges that can be added as options. Candidates must be careful about the order of the choices they make in this stage, as the selected options will remain the same for the current and subsequent rounds. However, they are allowed to delete or reorder their choices in the next round. Additionally, if any new colleges/ seats are added to the Karnataka BAMS seat matrix after the completion of the current round, candidates will be allowed to choose them as part of their option entry in the upcoming round.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 4: Mock Seat Allotment:</h3>
                    <p className={styles.paragaphFont18}>
                      KEA publishes mock seat allotment results based on the candidate&apos;s current preference. This list is curated to inform candidates about the seats they might be eligible for. Moreover, the list helps aspirants understand their chances of admission to their preferred college and re-order their preferences. Candidates can view the mock results by entering their CET number on the KEA website. Aspirants must note that the final results may vary from what is shown in the mock seat allotment.
                    </p>

                    <h3 className='fw-semibold mt-4' style={{ color: '#003366' }}>Stage 5: Seat Allotment and Results:</h3>
                    <p className={styles.paragaphFont18}>
                      In this stage, the seats are allotted primarily based on the students&apos; rank/ merit, their preferences, and the reservation rules that are set by the government. The seat allotment process remains the same for all rounds of the counselling process, and each of the rounds consists of 3 phases. These are as follows:
                    </p>

                    <h3 className={`fw-semibold mt-4 ${styles.font25bams}`} style={{ color: '#003366' }}>Phase 1:</h3>
                    <p className={styles.paragaphFont18}>
                      In this phase, all the candidates are eligible. However, the order of seat allotment will depend on the category of candidates. Phase 1 of the BAMS Round 1 counselling process will commence with the allotment of a certain number of seats, known as Special Category Seats, to candidates of Karnataka in the order given below:
                    </p>
                    <ul className={`${styles.neetList} mb-4`}>
                      <li>People with Disabilities (PwD)</li>
                      <li>NCC Candidates</li>
                      <li>Sports Candidates</li>
                    </ul>
                    <p className={styles.paragaphFont18}>
                      After the successful completion of Special Category seats, all candidates, regardless of their category, will be first considered for General Merit (GM) seats. After this, candidates who have not been allotted a GM seat will be considered for a seat in their respective category based on their rank and preferences. The same allotment order will continue until all candidates&apos; allotments stay the same.
                    </p>

                    <h3 className={`fw-semibold mt-4 ${styles.font25bams}`} style={{ color: '#003366' }}>Phase 2:</h3>
                    <p className={styles.paragaphFont18}>
                      There are 5 distinct points that a candidate must know before participating in the second phase of the respective KEA BAMS counselling rounds.
                    </p>
                    <ol className={`${styles.neetRounds1} mb-4`}>
                      <li>Phase 2 is only applicable to candidates from reserved categories. </li>
                      <li>In this phase, the unfilled seats in the rural and Kannada medium quota of the reservation categories will be converted to general seats within the respective reserved category. Moreover, these converted seats, along with other remaining seats, can only be secured by candidates of the same reserved category.</li>
                      <li>The seat allotment process commences with the allotment of Special Category seats. As mentioned earlier, these seats are allotted to candidates of the Reserved category in the order given below:</li>
                      <ul className={`${styles.neetList} mb-4`}>
                        <li>People with Disabilities (PwD)</li>
                        <li>NCC Candidates</li>
                        <li>Sports Candidates</li>
                      </ul>
                      <li>After the successful allotment of Special Category seats, the rest of the reserved category candidates are considered for the remaining seats in the respective reserved category.</li>
                      <li>Phase 2 will follow the same allotment order repeatedly until there is no change in the allotment of any candidate.</li>
                    </ol>

                    <h3 className={`fw-semibold mt-4 ${styles.font25bams}`} style={{ color: '#003366' }}>Phase 3:</h3>
                    <p className={styles.paragaphFont18}>
                      Candidates must be aware of the following points before participating in this phase of the BAMS counselling rounds.
                    </p>
                    <ol className={`${styles.neetRounds1} mb-4`}>
                      <li>All the candidates are eligible to participate in the third phase of round 1 counselling. </li>
                      <li>In this phase, the seats of reserved general categories and the special category seats that remain unfilled in Phase 2 will be converted to general merit seats. However, in case there are no general category seats, the rural and Kannada medium quota seats, if remaining unfilled, will be converted to general seats of the respective reserved categories.</li>
                      <li>The converted general merit seats are offered to all the general merit candidates as well as all the other reserved category candidates. Whereas, the general seats of the respective reserved categories are allotted to candidates who are of the same reserved category</li>
                      <li>Similar to the previous two phases, the seat allotment process commences with the allotment of Special Category seats. These seats are allotted to candidates in the order given below:</li>
                      <ul className={`${styles.neetList} mb-4`}>
                        <li>People with Disabilities (PwD)</li>
                        <li>NCC Candidates</li>
                        <li>Sports Candidates</li>
                      </ul>
                      <li>Once the Special Category seats are allotted, the rest of the seats will be offered to the remaining candidates (regardless of their category) in the order of their rank and preferences.</li>
                      <li>In the 3rd phase of allotment, any unfilled reserved category seats are automatically converted to General Merit (GM) and are re-offered to all eligible candidates based on their rank and preferences. This process is repeated until no reserved seats remain and no further changes occur in the allotment.</li>
                    </ol>

                    <p className={styles.paragaphFont18}>
                      The seat allotment results are published by the end of each round. Students who have been allotted a seat in phase 1 or phase 2 must wait until the entire round is completed to take a decision for the post seat allotment procedure.
                    </p>
                  </div>
                </div>
              </section>
            </section>

            {/* ─── Documents Required ─── */}
            <div className='col-lg-12 text-center pb-3 bg-white'>
              <h3 className={`${styles.f3mountSvayauni} pt-md-2 pt-0 mt-md-0 mb-md-0`}>
                BAMS Counselling Documents Required for A.Y. 2025-26
              </h3>
            </div>

            <div className={`${styles.whyUsCard} p-4 h-100 text-center container ${styles.bamsContainer}`}>
              <div className={styles.bamsGrid}>
                <div className={styles.bamsColumn}>
                  <ul>
                    <li>10th, 11th and 12th Marksheets</li>
                    <li>Graduation Marksheets (If Any)</li>
                    <li>NEET-UG Application Form</li>
                    <li>NEET-UG Admit Card</li>
                    <li>NEET-UG Scorecard</li>
                    <li>PwD Certificate (If Applicable)</li>
                    <li>Domicile Certificate (If Applicable)</li>
                    <li>NEET-UG Rank Letter</li>
                    <li>Valid Government-issued ID Proof</li>
                  </ul>
                </div>
                <div className={styles.bamsColumn}>
                  <ul>
                    <li>Recent Passport Size Photographs</li>
                    <li>Transfer Certificate</li>
                    <li>Medical Fitness Certificate (Issued by Registered Medical Practitioner)</li>
                    <li>Migration Certificate (If Applicable)</li>
                    <li>Caste Certificate (If Applicable)</li>
                    <li>Income Certificate (If Applicable)</li>
                    <li>Provisional Allotment Letter issued by AACCC</li>
                    <li>Character Certificate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ─── Rank Predictor Description ─── */}
            <section className='container'>
              <p className={`${styles.paragaphFont18} text-center text-black`}>
                The BAMS NEET-UG rank predictor tool will help you assess your chances of participating in the Ayush Admissions Central Counselling Committee counselling process.
              </p>
            </section>

            {/* ─── NEET Rank Predictor (Client) ─── */}
            <BamsPredictorClient />

            {/* ─── Predictor Info Boxes ─── */}
            <div className={`d-flex ${styles.maxWidthbams}`}>
              <div className={styles.predictorBox1}>
                <p className={styles.paragaphFont18}>
                  The BAMS NEET-UG 2025 Rank Predictor assesses your performance in NEET-UG and predicts the rank you might secure. This helps aspirants understand which colleges they may be eligible for and are likely to gain admission into.
                </p>
              </div>
              <div className={styles.predictorBox1}>
                <p className={styles.paragaphFont18}>
                  The NEET-UG Rank Prediction gives you a head start during the option entry stage of the All-India Quota BAMS counselling 2025. It helps in strategising your choices to improve your chances of securing admission to your dream college!
                </p>
              </div>
            </div>

            {/* ─── Best BAMS Colleges in Karnataka ─── */}
            <section className={`container-fluid p-0 pb-0 ${styles.bamsConatiner}`} id='topcollege'>
              <div className='container'>
                <div className='col-lg-12 text-center pb-3 bg-white'>
                  <h3 className={`${styles.f3mountSvayauni} pt-md-2 pt-4 mt-md-4 mb-md-4 mb-4`}>Best BAMS Colleges in Karnataka</h3>
                  <p className={`${styles.paragaphFont18} text-center`}>
                    Below is a list of some of the top AYUSH counselling-participating colleges in Karnataka.
                  </p>
                </div>
                <div className='col-lg-12 text-center'>
                  <div className={`row row-cols-1 row-cols-md-4 g-4 ${styles.mds} ${styles.bdscollegeimage}`}>
                    {colleges.map((college, i) => (
                      <div key={i} className='col'>
                        <div className='card justify-content-center align-items-center'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className={`card-img-top ${styles.imgcontain}`}
                            src={college.img}
                            alt={college.name}
                            loading='lazy'
                          />
                          <div className='card-body'>
                            <h5 className={`${styles.cardTitlebams} ${styles[college.heightClass]}`}>
                              {college.name}
                            </h5>
                            <p className={`card-text ${styles.paragaphFont18}`}>
                              <i className='bi bi-geo-alt-fill fs-6' style={{ color: 'red' }} />
                              &nbsp; {college.city}
                            </p>
                            <button
                              className='btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4'
                              data-enquiry-trigger
                            >
                              Enquire Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`col-lg-12 text-center p-3 f700 ${styles.manyFaq}`} id='FAQs'>
                  &amp; Many More!
                </div>
              </div>
            </section>

            {/* ─── Contact CTA Banner ─── */}
            <section className='container-fluid d-flex align-items-center pt-3 pb-0 px-0' id='contactus'>
              <div
                className='container-fluid bgimage text-center d-flex justify-content-center align-items imgh'
                style={{ background: `linear-gradient(341deg, rgb(0 0 0 / 0%), rgb(0 0 0 / 0%)) , url(${contactbanner})` }}
              >
                <div className='ddAmb pe-md-5 me-md-5 mt-5'>
                  <h2
                    className='text-white p-3 headings-font mt-5'
                    style={{
                      background: 'rgb(0 2 62 / 48%)',
                      borderRadius: '11px'
                    }}
                  >
                    Secure Your BAMS Seat Today for A.Y. 2025-26 <br className='d-block d-md-block' />
                    With Personalised BAMS NEET Counselling
                  </h2>
                  <button
                    className={`btn btn-success mb-4 m-3 m-md-5 ${styles.fontWhite23} btnbdscolour btn ${styles.enquiebtn} rounded py-3 px-4`}
                    data-enquiry-trigger
                  >
                    Enquire Now!
                  </button>
                </div>
              </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className={`pb-3 ${styles.bgfooter}`}>
              {/* Desktop Footer */}
              <div className='container-fluid align-item-start justify-content-between d-none d-md-flex flex-wrap'>
                <div className='footer-left col-md-7 d-flex ps-5'>
                  <div className='col-md-8'>
                    <div className='ft-left mb-3 px-5' style={{ marginBottom: 20 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src='/images/footer650.webp' className={styles.imgfooter} alt='Learntech' />
                    </div>
                  </div>
                </div>
                <div className='footer-right col-md-5 offeset-md-1 d-flex'>
                  <div className='social-unit col-md-5 w-100 px-5 justify-content-end'>
                    <div>
                      <p className={styles.fontWhite23} style={{ marginBottom: 10 }}>
                        Connect with us
                      </p>
                      <a href='tel:08022454991' style={{ color: 'white', fontSize: 14, fontWeight: 400 }}>
                        <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} /> 080-22454991
                      </a>{' '}
                      ,{' '}
                      <a href='tel:08026631169' style={{ color: 'white', fontSize: 14, fontWeight: 400 }}>
                        <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} /> 080-26631169
                      </a>
                      <br />
                      <div className='bs-phone' style={{ display: 'contents' }}>
                        <a href='tel:09036020076' style={{ color: 'white', fontSize: 14, fontWeight: 400 }}>
                          <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} /> +91 9036020076 ,
                        </a>{' '}
                        <a href='tel:18001208696' style={{ color: 'white', fontWeight: 400, fontSize: 14 }}>
                          <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} /> 1800 120 8696 (Toll Free)
                        </a>
                      </div>
                      <p>
                        <a href='tel:971502436552' style={{ color: 'white', fontSize: 14, fontWeight: 400 }}>
                          <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} /> +971 502436552 (Dubai)
                        </a>
                      </p>
                    </div>
                    <div className='text-center'>
                      <p style={{ marginTop: 10, marginBottom: 14 }} className='d-block pe-5 d-flex'>
                        <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/learntechedu'>
                          <i className='bi bi-facebook' style={{ color: 'white' }} />
                          &nbsp;&nbsp;&nbsp;
                        </a>
                        <a target='_blank' rel='noopener noreferrer' href='https://x.com/learntechww'>
                          <Image
                            width={20}
                            height={20}
                            className={`icon-white me-3 ${styles.twitterWidth}`}
                            src='/images/icons/twitter-x.png'
                            alt='twitter-icon'
                          />
                        </a>
                        <a target='_blank' rel='noopener noreferrer' href='https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w'>
                          <i className='bi bi-youtube' style={{ color: 'white' }} />
                          &nbsp;&nbsp;&nbsp;
                        </a>
                        <a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/learntechedus/'>
                          <i className='bi bi-instagram' style={{ color: 'white' }} />
                          &nbsp;&nbsp;&nbsp;
                        </a>
                        <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/'>
                          <i className='bi bi-linkedin' style={{ color: 'white' }} />
                          &nbsp;&nbsp;&nbsp;
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className='container align-item-start justify-content-between d-md-none'>
                <div className='footer-left pt-4 col-md-7 text-center'>
                  <div className='ft-left mb-3' style={{ justifyContent: 'flex-start', textAlign: 'left' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src='/images/Learntech325.webp' className={styles.imgfooter} alt='Learntech' />
                  </div>
                </div>
                <div className='footer-right col-md-5 offeset-md-1 py-t d-flex pt-0 mt-0'>
                  <div className='app-unit col-md-7 col-md-5' />
                  <div className='social-unit col-md-5 mt-4 pb-5'>
                    <div>
                      <p className={styles.fontWhite23}>Connect with us</p>
                      <a href='tel:08022454991' style={{ color: 'white', fontSize: 14, fontWeight: 400 }}>
                        <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} /> 080-224549911 ,
                      </a>{' '}
                      ,{' '}
                      <a href='tel:08026631169' style={{ color: 'white', fontSize: 14, fontWeight: 400 }}>
                        <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} />
                        080-26631169
                      </a>
                      <div className='bs-phone' style={{ display: 'contents' }}>
                        <br />
                        <a href='tel:09036020076' style={{ color: 'white', fontSize: 14, fontWeight: 400 }}>
                          <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} /> +91 9036020076 ,
                        </a>{' '}
                        <a href='tel:18001208696' style={{ color: 'white', fontWeight: 400, fontSize: 14 }}>
                          <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} />
                          1800 120 8696 (Toll Free)
                        </a>
                      </div>
                      <p>
                        <a href='tel:970502436552' style={{ color: 'white', fontSize: 14, fontWeight: 400 }}>
                          <i className='bi bi-telephone-fill' style={{ fontSize: 13 }} /> +971 502436552 (Dubai)
                        </a>
                      </p>
                    </div>
                    <div className='text-center'>
                      <p style={{ marginTop: 10, marginBottom: 14 }} className='d-block pe-5 d-flex'>
                        <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/learntechedu'>
                          <i className='bi bi-facebook' style={{ color: 'white' }} />
                          &nbsp;&nbsp;&nbsp;
                        </a>
                        <a target='_blank' rel='noopener noreferrer' href='https://x.com/learntechww'>
                          <Image
                            width={20}
                            height={20}
                            className={`icon-white me-3 ${styles.twitterWidth}`}
                            src='/images/icons/twitter-x.png'
                            alt='twitter-icon'
                          />
                        </a>
                        <a target='_blank' rel='noopener noreferrer' href='https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w'>
                          <i className='bi bi-youtube' style={{ color: 'white' }} />
                          &nbsp;&nbsp;&nbsp;
                        </a>
                        <a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/learntechedus/'>
                          <i className='bi bi-instagram' style={{ color: 'white' }} />
                          &nbsp;&nbsp;&nbsp;
                        </a>
                        <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/'>
                          <i className='bi bi-linkedin' style={{ color: 'white' }} />
                          &nbsp;&nbsp;&nbsp;
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>
      </BamsEnquiryTriggerClient>
    </>
  )
}

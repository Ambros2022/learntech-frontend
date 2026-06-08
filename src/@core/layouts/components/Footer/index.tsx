import Image from 'next/image'
import Link from 'next/link'
import FooterActions from './FooterActions'

// ─── Link lists (defined once at module level, not recreated per render) ──────

const INFO_LINKS = [
  ['/about-us',   'About Us'],
  ['/our-team',   'Our Team'],
  ['/services',   'Services'],
  ['/contact-us', 'Contact Us'],
  ['/career',     'Careers'],
  ['/sitemap',    'Site Map'],
] as const

const QUICK_LINKS = [
  ['/blogs',           'Blogs'],
  ['/nri-quota',       'NRI Quota'],
  ['/study-in-usa',    'Study Abroad'],
  ['/scholarships',    'Scholarships'],
  ['/students-speak',  "Student's Speak"],
  ['/education-loan',  'Education Loan'],
] as const

const LEGAL_LINKS = [
  ['/',                      'Feed'],
  ['/disclaimer',            'Disclaimer'],
  ['/privacy-policy',        'Privacy Policy'],
  ['/terms-and-conditions',  'Terms & Conditions'],
  ['/advertise-with-us',     'Advertise With Us'],
] as const

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/learntechedu',                             src: '/images/icons/Facebook.svg',  label: 'Facebook'    },
  { href: 'https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/', src: '/images/icons/linked-in.svg', label: 'LinkedIn'    },
  { href: 'https://twitter.com/learntechww',                                   src: '/images/icons/twitter-x.png', label: 'Twitter / X' },
  { href: 'https://www.instagram.com/learntechedus',                           src: '/images/icons/instagram.svg', label: 'Instagram'   },
  { href: 'https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w',         src: '/images/icons/youtube.svg',   label: 'YouTube'     },
] as const

// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <>
      <section className='footerCon'>
        <div className='container pt-3'>

          {/* Logo */}
          <div className='d-flex mb-3'>
            <div className='col-xl-3 col-lg-4 col-md-4 col-8'>
              <Link href='/'>
                <Image
                  className='footer-logo'
                  src='/images/Learntech325.webp'
                  width={325}
                  height={100}
                  alt='Learntech Edu Solutions'
                  style={{ height: 'auto' }}
                />
              </Link>
            </div>
          </div>

          {/* Content columns */}
          <div className='d-flex justify-content-md-between flex-md-row flex-column flex-wrap gap-1 gap-md-3'>

            {/* Brand + contact */}
            <div className='text-white'>
              <p>
                Dream. Apply. Achieve.<br />
                Our Expert Admission Guidance<br />
                is the Bridge that Connects You<br />
                to a Brighter Future.
              </p>
              <span className='footerIcon'>
                <div className='mb-3'>
                  <a href='tel:18001208696' className='d-inline-block'>
                    <i className='bi bi-telephone-fill fs-5 me-2' aria-hidden='true' />
                    1800 120 8696
                  </a>
                </div>
                <div className='mb-3'>
                  <a href='mailto:info@learntechww.com' className='d-inline-block'>
                    <i className='bi bi-envelope-fill fs-5 me-2' aria-hidden='true' />
                    info@learntechww.com
                  </a>
                </div>
                <div className='mb-3 address'>
                  <a
                    href='https://www.google.com/maps/place/Learntech+Edu+Solutions+Pvt+Ltd/@12.9187833,77.5983055,15z'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='d-inline-block'
                  >
                    <i className='bi bi-geo-alt-fill fs-5 me-2' aria-hidden='true' />
                    #80 (4), &apos;D&apos; Main Rd, East End, 9th Block,<br />
                    <span className='px-0 px-md-4'>Jayanagar, Bangalore, Karnataka - 560041</span>
                  </a>
                </div>
              </span>
            </div>

            {/* Info */}
            <div className='text-white pb-3 pb-md-0'>
              <h5 className='fw-bold mb-3'>Info</h5>
              <ul className='list-unstyled'>
                {INFO_LINKS.map(([href, label]) => (
                  <li key={href} className='mb-2'>
                    <Link href={href}>
                      <i className='bi bi-chevron-double-right me-1' aria-hidden='true' />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className='text-white pb-3 pb-md-0'>
              <h5 className='fw-bold mb-3'>Quick Links</h5>
              <ul className='list-unstyled'>
                {QUICK_LINKS.map(([href, label]) => (
                  <li key={href} className='mb-2'>
                    <Link href={href}>
                      <i className='bi bi-chevron-double-right me-1' aria-hidden='true' />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className='text-white pb-3 pb-md-0'>
              <h5 className='fw-bold mb-3'>Legal</h5>
              <ul className='list-unstyled'>
                {LEGAL_LINKS.map(([href, label]) => (
                  <li key={href} className='mb-2'>
                    <Link href={href}>
                      <i className='bi bi-chevron-double-right me-1' aria-hidden='true' />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* App download */}
            <div className='text-white'>
              <h5 className='fw-bold mb-3'>Download Our App</h5>
              <div className='d-flex px-2 px-md-0 flex-row flex-md-column justify-content-around'>
                <a
                  href='https://play.google.com/store/apps/details?id=com.ilearntech.app'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image className='mb-1 mb-md-3 boxShadow' width={150} height={50} alt='App Store' src='/images/icons/app-store.webp' />
                </a>
                <a
                  href='https://play.google.com/store/apps/details?id=com.ilearntech.app'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image className='boxShadow' width={150} height={50} alt='Google Play' src='/images/icons/google-play.webp' />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive row: floating phone + brochure + scroll-to-top + WhatsApp */}
        <FooterActions />
      </section>

      {/* Bottom bar */}
      <footer className='mainFooter'>
        <div className='container text-white pt-3'>
          <div className='row'>
            <div className='col-md-6 text-sm-center order-2 order-md-1'>
              <p className='text-start'>©2026 Learntech Edu Solutions Pvt. Ltd. All Rights Reserved.</p>
            </div>
            <div className='col-md-6 text-md-end order-1 order-md-2 text-center'>
              <p className='d-inline-block'>Follow us on</p>
              {SOCIAL_LINKS.map(({ href, src, label }) => (
                <a key={href} href={href} target='_blank' rel='noopener noreferrer' aria-label={label}>
                  <Image width={27} height={27} style={{ height: 'auto' }} className='icon-white mx-1' src={src} alt={label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

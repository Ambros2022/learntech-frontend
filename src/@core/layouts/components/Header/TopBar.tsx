import Image from 'next/image'
import WriteReviewButton from './WriteReviewButton'
import styles from './topbar.module.css'

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/learntechedu', src: '/images/icons/Facebook.svg', label: 'Facebook' },
  { href: 'https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/', src: '/images/icons/linked-in.svg', label: 'LinkedIn' },
  { href: 'https://twitter.com/learntechww', src: '/images/icons/twitter-x.png', label: 'Twitter / X' },
  { href: 'https://www.instagram.com/learntechedus', src: '/images/icons/instagram.svg', label: 'Instagram' },
  { href: 'https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w', src: '/images/icons/youtube.svg', label: 'YouTube' },
] as const

export default function TopBar() {
  return (
    <header className={`${styles.topBar} py-2`}>
      <div className='container-lg'>
        <div className='row'>

          <div className={`col-md-3 d-flex align-items-center ${styles.socialIcon}`}>
            {SOCIAL_LINKS.map(({ href, src, label }) => (
              <a key={href} href={href} target='_blank' rel='noopener noreferrer' aria-label={label}>
                <Image className='mx-1' width={26} height={26} style={{ height: 'auto' }} src={src} alt={label} />
              </a>
            ))}
          </div>

          <div className={`col-md-9 d-flex align-items-center justify-content-end ${styles.socialText}`}>
            <div>
              <span className={styles.telHover}>
                <Image className='m-0' src='/images/icons/Phone-blue.svg' width={26} height={26} style={{ height: 'auto' }} alt='' aria-hidden='true' />
                <a href='tel:18001208696' className='mx-2' style={{ color: '#274896' }}>1800 120 8696</a>
              </span>
              <span className={styles.mailHover}>
                <Image className='ms-2' src='/images/icons/email-icon.svg' width={26} height={26} style={{ height: 'auto' }} alt='' aria-hidden='true' />
                <a href='mailto:info@learntechww.com' className='mx-2' style={{ color: '#274896' }}>info@learntechww.com</a>
              </span>
              <WriteReviewButton />
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

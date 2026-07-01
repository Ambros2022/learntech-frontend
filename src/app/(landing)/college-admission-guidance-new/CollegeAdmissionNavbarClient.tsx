'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './CollegeAdmissionPage.module.css'

interface Props {
  onGetStarted: () => void
}

export default function CollegeAdmissionNavbarClient({ onGetStarted }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }, [])

  return (
    <nav
      className={`navbar navbar-expand-lg ${styles.cagNavbar} ${scrolled ? styles.cagNavbarScrolled : ''}`}
    >
      <div className={`container ${styles.navbarmobile}`} style={{ maxWidth: '95%' }} >
        <Link
          className='navbar-brand'
          href='/college-admission-guidance'
          onClick={(e) => { e.preventDefault(); scrollTo('bams-hero') }}
        >
          <img
            src='/images/collegeadmissions/logo.png'
            alt='LearnTech'
            className={styles.navlinkimage}
            style={{ marginRight: '0.5rem' }}
          />
        </Link>

        <button
          className={`navbar-toggler ${styles.cagNavbarToggler}`}
          type='button'
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-label='Toggle navigation'
        >
          <span className={styles.cagNavbarTogglerLine} />
          <span className={styles.cagNavbarTogglerLine} />
          <span className={styles.cagNavbarTogglerLine} />
        </button>

        <div
          className={`collapse navbar-collapse${mobileOpen ? ' show' : ''}`}
          id='bamsNavMenu'
        >
          <ul className='navbar-nav mx-auto gap-1'>
            {[
              { label: 'Home', id: 'bams-hero' },
              { label: 'Who We Are?', id: 'bams-who' },
              { label: 'What We Do?', id: 'bams-what' },
              { label: 'Our Services', id: 'bams-services' },
              { label: 'Institutions', id: 'bams-colleges' },
              { label: 'Success Stories', id: 'bams-testi' },
            ].map(item => (
              <li className='nav-item' key={item.id}>
                <a
                  className={`nav-link ${styles.cagNavLink}`}
                  role='button'
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button className={`${styles.btnNavCta} ms-2 text-white`} onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

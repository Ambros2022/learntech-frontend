'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import styles from './SymbiosisPage.module.css'

interface Props {
  onApplyClick: () => void
}

export default function SymNavbarClient({ onApplyClick }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigate = useCallback((id: string, offset = 0) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({ top: top - offset, behavior: 'smooth' })
    }
  }, [])

  const closeNavbar = useCallback(() => {
    const navbar = document.getElementById('symNavMenu')
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
  }, [])

  return (
    <nav className={`navbar navbar-expand-lg ${styles.symNavbar} ${scrolled ? styles.symNavbarScrolled : ''}`}>
      <div className='container'>
        <a
          href='#sym-hero'
          className='navbar-brand'
          onClick={(e) => { e.preventDefault(); navigate('sym-hero', 0) }}
        >
          <Image
            src='/images/symbiosis/logo.svg'
            alt='Symbiosis International University Dubai'
            width={180}
            height={64}
            priority
            style={{ width: 'auto', height: 64, objectFit: 'contain' }}
          />
        </a>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#symNavMenu'
          aria-controls='symNavMenu'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className={`collapse navbar-collapse justify-content-end gap-3 ${styles.symNavCollapse}`} id='symNavMenu'>
          <ul className='navbar-nav align-items-lg-center gap-lg-2 mb-2 mb-lg-0 mt-3 mt-lg-0'>
            <li className='nav-item'>
              <a className={`nav-link ${styles.symNavLink}`} role='button'
                onClick={() => { navigate('sym-hero', 80); closeNavbar() }}>Home</a>
            </li>
            <li className='nav-item'>
              <a className={`nav-link ${styles.symNavLink}`} role='button'
                onClick={() => { navigate('sym-about', 80); closeNavbar() }}>About</a>
            </li>
            <li className='nav-item'>
              <a className={`nav-link ${styles.symNavLink}`} role='button'
                onClick={() => { navigate('sym-courses', 80); closeNavbar() }}>Courses</a>
            </li>
            <li className='nav-item'>
              <a className={`nav-link ${styles.symNavLink}`} role='button'
                onClick={() => { navigate('sym-admission', 80); closeNavbar() }}>Admission Process</a>
            </li>
            <li className='nav-item'>
              <a className={`nav-link ${styles.symNavLink}`} role='button'
                onClick={() => { navigate('sym-why', 80); closeNavbar() }}>Why Choose?</a>
            </li>
            <li className='nav-item'>
              <a className={`nav-link ${styles.symNavLink}`} role='button'
                onClick={() => { navigate('sym-faq', 80); closeNavbar() }}>FAQs</a>
            </li>
            <li className='nav-item'>
              <a className={`nav-link ${styles.symNavLink}`} role='button'
                onClick={() => { navigate('sym-cta', 80); closeNavbar() }}>Get In Touch</a>
            </li>
            <li className='nav-item ms-lg-2'>
              <button
                className={styles.symBtnRed}
                onClick={() => { onApplyClick(); closeNavbar() }}
                style={{ borderRadius: 8, padding: '.6rem 1.4rem', fontSize: '.85rem' }}
              >
                Apply Now <i className='bi bi-arrow-right' />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

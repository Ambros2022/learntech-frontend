'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './BamsPage.module.css'

export default function BamsNavbarClient() {
  const navigate = useCallback((id: string, offset = 0) => {
    const elementToView = document.getElementById(id)
    if (elementToView) {
      const offsetTop = elementToView.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: offsetTop - offset,
        behavior: 'smooth'
      })
    }
  }, [])

  const closeNavbar = useCallback(() => {
    const navbar = document.getElementById('navbarNav')
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show')
    }
  }, [])

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 sticky-top py-md-5 ${styles.navbarBamsTop}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: '#fff',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <div className={`container-fluid ${styles.navbarBamsTop} ${styles.navbarmobilebams}`}>
        <Link className='navbar-brand d-flex align-items-center p-md-5' href='/'>
          <Image src='/images/bams/logo.webp' alt='Logo' width={209} height={58} priority />
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

        <div className={`collapse navbar-collapse justify-content-end ${styles.bamsnavbar}`} id='navbarNav'>
          <ul className='navbar-nav gap-3'>
            <li className={`nav-item ${styles.bamsNavbarTag}`}>
              <a
                className='nav-link'
                role='button'
                onClick={() => {
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
                  closeNavbar()
                }}
              >
                Home
              </a>
            </li>
            <li className={`nav-item ${styles.bamsNavbarTag}`}>
              <a
                className='nav-link'
                role='button'
                onClick={() => {
                  navigate('whyus', 80)
                  closeNavbar()
                }}
              >
                Why Us?
              </a>
            </li>
            <li className={`nav-item ${styles.bamsNavbarTag}`}>
              <a
                className='nav-link'
                role='button'
                onClick={() => {
                  navigate('counceling', 80)
                  closeNavbar()
                }}
              >
                BAMS Counselling
              </a>
            </li>
            <li className={`nav-item ${styles.bamsNavbarTag}`}>
              <a
                className='nav-link'
                role='button'
                onClick={() => {
                  navigate('predictor', 100)
                  closeNavbar()
                }}
              >
                NEET Rank Predictor
              </a>
            </li>
            <li className={`nav-item ${styles.bamsNavbarTag}`}>
              <a
                className='nav-link'
                role='button'
                onClick={() => {
                  navigate('topcollege', 100)
                  closeNavbar()
                }}
              >
                Top Colleges
              </a>
            </li>
            <li className={`nav-item ${styles.bamsNavbarTag}`}>
              <a
                className='nav-link'
                role='button'
                onClick={() => {
                  document.getElementById('contactus')?.scrollIntoView({ behavior: 'smooth' })
                  closeNavbar()
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

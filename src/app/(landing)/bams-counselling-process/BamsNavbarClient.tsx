'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './BamsPage.module.css'

export default function BamsNavbarClient() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const targetY = rect.top + scrollTop - 80 // Offset of 80px for the fixed header
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      })
    }
    setNavOpen(false)
  }, [])

  return (
    <header
      id="siteNav"
      className={`${styles.siteNav} ${scrolled ? styles.siteNavScrolled : ''}`}
    >
      <div className={styles.navInner}>
        <a href="#home" className={styles.brand} onClick={(e) => { e.preventDefault(); scrollTo('home') }}>
          <Image src="/images/bams/logo.webp" alt="LearnTech" width={240} height={60} priority />
        </a>

        <nav
          className={`${styles.navLinks} ${navOpen ? styles.navLinksOpen : ''}`}
          id="navLinks"
        >
          <a onClick={() => scrollTo('why-us')}>Why Us?</a>
          <a onClick={() => scrollTo('counselling')}>BAMS Counselling</a>
          <a onClick={() => scrollTo('predictor')}>NEET Rank Predictor</a>
          <a onClick={() => scrollTo('colleges')}>Top Colleges</a>
          <a onClick={() => scrollTo('faqs')}>FAQs</a>
          <a onClick={() => scrollTo('contact')}>Contact Us</a>
        </nav>

        <a href="tel:18001208696" className={styles.navCta}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .25l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" /></svg>
        </a>

        <button
          className={styles.navToggle}
          onClick={() => setNavOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

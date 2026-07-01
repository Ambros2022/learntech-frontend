'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

/** Initialises scroll-reveal animations + campus carousel. No AOS dependency. */
export default function SymScrollEffectsClient() {
  const campusTrackRef = useRef<HTMLDivElement | null>(null)
  const [campusIndex, setCampusIndex] = useState(0)
  const TOTAL_SLIDES = 7

  // Scroll reveal
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll<HTMLElement>('.sym-reveal,.sym-reveal-left,.sym-reveal-right').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.classList.add('visible')
        }
      })

      // Step lit animation for admission process cards
      document.querySelectorAll<HTMLElement>('.sym-process-card').forEach(card => {
        if (card.getBoundingClientRect().top < window.innerHeight - 100) {
          card.classList.add('in-view')
          card.querySelectorAll<HTMLElement>('.sym-step').forEach((step, i) => {
            setTimeout(() => step.classList.add('lit'), 300 + i * 180)
          })
        }
      })
    }

    window.addEventListener('scroll', reveal, { passive: true })
    reveal() // initial check
    return () => window.removeEventListener('scroll', reveal)
  }, [])

  // Campus carousel
  const getVisibleSlides = useCallback(() => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth <= 600) return 1
    if (window.innerWidth <= 992) return 2
    return 3
  }, [])

  const updateCarousel = useCallback(() => {
    const track = document.getElementById('campus-track') as HTMLDivElement | null
    if (!track || !track.children[0]) return
    const slideWidth = (track.children[0] as HTMLElement).offsetWidth + 25
    track.style.transform = `translateX(-${campusIndex * slideWidth}px)`
  }, [campusIndex])

  useEffect(() => {
    updateCarousel()
    window.addEventListener('resize', updateCarousel)
    return () => window.removeEventListener('resize', updateCarousel)
  }, [updateCarousel])

  const campusNext = useCallback(() => {
    const visible = getVisibleSlides()
    setCampusIndex(prev => prev < TOTAL_SLIDES - visible ? prev + 1 : 0)
  }, [getVisibleSlides])

  const campusPrev = useCallback(() => {
    const visible = getVisibleSlides()
    setCampusIndex(prev => prev > 0 ? prev - 1 : TOTAL_SLIDES - visible)
  }, [getVisibleSlides])

  // FAQ accordion
  useEffect(() => {
    const handleFaqClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const faqQ = target.closest('.sym-faq-q') as HTMLElement | null
      if (!faqQ) return
      const item = faqQ.closest('.sym-faq-item') as HTMLElement | null
      if (!item) return
      const isOpen = item.classList.contains('open')
      // close all
      document.querySelectorAll('.sym-faq-item').forEach(f => {
        f.classList.remove('open')
        const a = f.querySelector<HTMLElement>('.sym-faq-a')
        if (a) a.style.maxHeight = '0'
      })
      if (!isOpen) {
        item.classList.add('open')
        const a = item.querySelector<HTMLElement>('.sym-faq-a')
        if (a) a.style.maxHeight = '500px'
      }
    }
    document.addEventListener('click', handleFaqClick)
    return () => document.removeEventListener('click', handleFaqClick)
  }, [])

  // Partners marquee pause on hover (CSS handles animation, just pause state)
  // Carousel controls rendered via portal-like approach using server-rendered slots
  return (
    <>
      {/* Campus carousel controls */}
      <div id='campus-controls-mount' style={{ display: 'none' }} />
      {/* Inject controls into DOM after mount */}
      <CampusControls onPrev={campusPrev} onNext={campusNext} />
    </>
  )
}

function CampusControls({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const prevBtn = document.getElementById('campus-prev-btn')
    const nextBtn = document.getElementById('campus-next-btn')
    if (prevBtn) prevBtn.onclick = onPrev
    if (nextBtn) nextBtn.onclick = onNext
  }, [onPrev, onNext])
  return null
}

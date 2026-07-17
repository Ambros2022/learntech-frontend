'use client'

import { useEffect, useCallback } from 'react'
import styles from './BamsPage.module.css'

/**
 * Handles all lightweight interactive behaviors via event delegation and observers:
 * - Scroll animations (IntersectionObserver for .animateOnScroll elements)
 * - Stage card toggles (click to expand/collapse)
 * - AACCC/KEA SVR accordion toggles
 * - Document items in-view animation
 */
export default function BamsInteractiveClient({ children }: { children: React.ReactNode }) {

  const setupObservers = useCallback(() => {
    // ─── Scroll Animations ───
    const animateEls = document.querySelectorAll(`.${styles.animateOnScroll}`)
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible ?? 'visible')
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })
    animateEls.forEach(el => scrollObserver.observe(el))

    // ─── Document Items Animation ───
    const docItems = document.querySelectorAll('[data-doc-item]')
    const docObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.docItemInView ?? 'docItemInView')
          docObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.4, rootMargin: '0px 0px -40px 0px' })
    docItems.forEach(item => docObserver.observe(item))

    return () => {
      scrollObserver.disconnect()
      docObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const cleanup = setupObservers()
    return cleanup
  }, [setupObservers])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    // ─── Stage Card Toggle ───
    const stageCard = target.closest('[data-stage]') as HTMLElement | null
    if (stageCard) {
      stageCard.classList.toggle('open')
      return
    }

    // ─── AACCC SVR Accordion Toggle ───
    const aacccSvr = target.closest('[data-aaccc-svr]') as HTMLElement | null
    if (aacccSvr) {
      const wrap = aacccSvr.closest('[data-aaccc-timeline-wrap]')
      const panel = wrap?.querySelector('[data-aaccc-panel]') as HTMLElement | null
      if (panel) {
        const isOpen = panel.classList.toggle(styles.aacccAccordionOpen ?? 'aacccAccordionOpen')
        aacccSvr.setAttribute('aria-expanded', String(isOpen))
        if (isOpen) {
          aacccSvr.classList.add(styles.aacccRoundSvrExpanded ?? 'aacccRoundSvrExpanded')
        } else {
          aacccSvr.classList.remove(styles.aacccRoundSvrExpanded ?? 'aacccRoundSvrExpanded')
        }
      }
      return
    }

    // ─── KEA SVR Accordion Toggle ───
    const keaSvr = target.closest('[data-kea-svr]') as HTMLElement | null
    if (keaSvr) {
      const wrap = keaSvr.closest('[data-kea-timeline-wrap]')
      const panel = wrap?.querySelector('[data-kea-panel]') as HTMLElement | null
      if (panel) {
        const isOpen = panel.classList.toggle(styles.keaAccordionOpen ?? 'keaAccordionOpen')
        keaSvr.setAttribute('aria-expanded', String(isOpen))
        if (isOpen) {
          keaSvr.classList.add(styles.keaRoundSvrExpanded ?? 'keaRoundSvrExpanded')
        } else {
          keaSvr.classList.remove(styles.keaRoundSvrExpanded ?? 'keaRoundSvrExpanded')
        }
      }
      return
    }
  }, [])

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  )
}

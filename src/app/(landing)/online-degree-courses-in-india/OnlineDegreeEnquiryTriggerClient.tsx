'use client'

import React, { useState, useCallback } from 'react'
import poppins from 'src/fonts'
import poppinsHeavy from './OnlineDegreeFonts'
import OnlineDegreeEnquiryModalClient from './OnlineDegreeEnquiryModalClient'
import styles from './OnlineDegree.module.css'

interface Props {
  children: React.ReactNode
}

const TRIGGER_SELECTOR =
  '[data-enquiry-trigger], [data-enq], .open-enquiry-popup, a[href="#cta"], a[href="#get-free-counselling"]'

// Best guess at the course the visitor was looking at when they clicked
function courseHintFor(trigger: Element) {
  const card = trigger.closest('[data-course-name]')
  if (card) return card.getAttribute('data-course-name') || ''
  const finder = trigger.closest('[data-course-finder]')
  if (finder) {
    const name = finder.querySelector<HTMLElement>('.course-finder__result:not([hidden]) .course-finder__result-name')
    return name?.dataset.text || name?.textContent?.trim() || ''
  }
  return ''
}

/**
 * Page root (stands in for the design's <body>) + single delegated click listener
 * that opens the enquiry popup from any CTA in the server-rendered content.
 */
export default function OnlineDegreeEnquiryTriggerClient({ children }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [initialCourse, setInitialCourse] = useState('')

  const closeModal = useCallback(() => setShowModal(false), [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const trigger = (e.target as HTMLElement).closest(TRIGGER_SELECTOR)
    if (!trigger) return
    e.preventDefault()
    setInitialCourse(courseHintFor(trigger))
    setShowModal(true)
  }, [])

  return (
    <div className={`${styles.onlineDegreeRoot} ${poppins.variable} ${poppinsHeavy.variable}`} onClick={handleClick}>
      {children}
      <OnlineDegreeEnquiryModalClient open={showModal} initialCourse={initialCourse} onClose={closeModal} />
    </div>
  )
}

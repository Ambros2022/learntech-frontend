'use client'

import React, { useState, useCallback } from 'react'
import poppins from 'src/fonts'
import StudyInDubaiEnquiryModalClient from './StudyInDubaiEnquiryModalClient'
import styles from './StudyInDubai.module.css'

interface Props {
  children: React.ReactNode
}

const TRIGGER_SELECTOR =
  'a[href="#enquire"], .pc__cta, [data-enquiry-trigger], [data-enq], .open-enquiry-popup'

function courseHintFor(trigger: Element): string {
  const pc = trigger.closest('.pc')
  if (pc) {
    const colCode = pc.getAttribute('data-college')
    const colName = colCode === 'bits' ? 'BITS Pilani Dubai' : 'Symbiosis Dubai'
    const title = pc.querySelector('.pc__title')?.textContent?.trim() || ''
    return title ? `${colName} – ${title}` : ''
  }
  const college = trigger.closest('.college')
  if (college) {
    const colCode = college.getAttribute('data-college')
    return colCode === 'bits' ? 'BITS Pilani Dubai' : 'Symbiosis Dubai'
  }
  return ''
}

/**
 * Page root (stands in for the design's <body>) + single delegated click listener
 * that opens the enquiry popup from any CTA in the server-rendered content.
 */
export default function StudyInDubaiEnquiryTriggerClient({ children }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [initialCourse, setInitialCourse] = useState('')

  const closeModal = useCallback(() => {
    setShowModal(false)
    setInitialCourse('')
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const trigger = (e.target as HTMLElement).closest(TRIGGER_SELECTOR)
    if (!trigger) return
    e.preventDefault()
    setInitialCourse(courseHintFor(trigger))
    setShowModal(true)
  }, [])

  return (
    <div className={`${styles.studyInDubaiRoot} ${poppins.variable}`} onClick={handleClick}>
      {children}
      <StudyInDubaiEnquiryModalClient open={showModal} initialCourse={initialCourse} onClose={closeModal} />
    </div>
  )
}

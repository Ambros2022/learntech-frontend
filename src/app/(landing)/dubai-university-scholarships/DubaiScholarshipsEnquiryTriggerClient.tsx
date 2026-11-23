'use client'

import React, { useState, useCallback } from 'react'
import poppins from 'src/fonts'
import { bodoniModa } from './DubaiScholarshipsFonts'
import DubaiScholarshipsEnquiryModalClient from './DubaiScholarshipsEnquiryModalClient'
import styles from './DubaiScholarships.module.css'
import { SIU_NAME, BITS_NAME } from './DubaiScholarshipsData'

interface Props {
  children: React.ReactNode
}

const TRIGGER_SELECTOR =
  '.open-popup, [data-open-popup], .college-card .b, #ewa, .cs-cta, a[href="#predictor"]'

function getCollegeHint(trigger: Element): string {
  const collegeAttr = trigger.getAttribute('data-college') || trigger.getAttribute('data-k')
  if (collegeAttr === 's') return SIU_NAME
  if (collegeAttr === 'b') return BITS_NAME

  const univAttr = trigger.getAttribute('data-u')
  if (univAttr) return univAttr

  const collegeCard = trigger.closest('.college-card')
  if (collegeCard) {
    if (collegeCard.id === 'bits' || collegeCard.textContent?.includes('BITS')) return BITS_NAME
    if (collegeCard.id === 'symbiosis' || collegeCard.textContent?.includes('Symbiosis')) return SIU_NAME
  }

  return ''
}

function getCourseHint(trigger: Element): string {
  return trigger.getAttribute('data-t') || ''
}

export default function DubaiScholarshipsEnquiryTriggerClient({ children }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [initialCollege, setInitialCollege] = useState('')
  const [initialCourse, setInitialCourse] = useState('')

  const closeModal = useCallback(() => {
    setShowModal(false)
    setInitialCollege('')
    setInitialCourse('')
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const trigger = (e.target as HTMLElement).closest(TRIGGER_SELECTOR)
    if (!trigger) return

    // If it's a link to #apply (the on-page form), and user is on desktop or wants scroll, let it scroll or open modal
    const href = trigger.getAttribute('href')
    if (href === '#apply' && !trigger.classList.contains('cs-cta')) {
      // Let anchor scroll to #apply form
      return
    }

    e.preventDefault()
    setInitialCollege(getCollegeHint(trigger))
    setInitialCourse(getCourseHint(trigger))
    setShowModal(true)
  }, [])

  return (
    <div
      className={`${styles.dubaiScholarshipsRoot} ${poppins.variable} ${bodoniModa.variable}`}
      onClick={handleClick}
    >
      {children}
      <DubaiScholarshipsEnquiryModalClient
        open={showModal}
        initialCollege={initialCollege}
        initialCourse={initialCourse}
        onClose={closeModal}
      />
    </div>
  )
}

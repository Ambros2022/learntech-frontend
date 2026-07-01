'use client'

import { useState, useCallback } from 'react'
import SymNavbarClient from './SymNavbarClient'
import SymEnquiryModalClient from './SymEnquiryModalClient'

/**
 * Top-level client wrapper. Manages modal state and injects Navbar.
 * All server-rendered content is passed as children — zero hydration cost.
 * Any element with data-enquiry-trigger will open the modal via event delegation.
 */
export default function SymEnquiryTriggerClient({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false)

  const openModal = useCallback(() => setShowModal(true), [])
  const closeModal = useCallback(() => setShowModal(false), [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const trigger = target.closest('[data-enquiry-trigger]')
    if (trigger) {
      e.preventDefault()
      setShowModal(true)
    }
  }, [])

  return (
    <div onClick={handleClick}>
      <SymNavbarClient onApplyClick={openModal} />
      {children}
      <SymEnquiryModalClient open={showModal} onClose={closeModal} />
    </div>
  )
}

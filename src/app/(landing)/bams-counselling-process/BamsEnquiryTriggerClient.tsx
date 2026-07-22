'use client'

import { useState, useCallback } from 'react'
import BamsEnquiryModalClient from './BamsEnquiryModalClient'

/**
 * Wrapper that provides enquiry modal functionality via event delegation.
 * Any descendant button with data-enquiry-trigger will open the modal.
 * Server-rendered children are passed through as static HTML.
 */
export default function BamsEnquiryTriggerClient({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false)

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
      {children}
      <BamsEnquiryModalClient open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

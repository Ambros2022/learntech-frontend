'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { createRoot } from 'react-dom/client'

const EditorEnquiryForm = dynamic(
  () => import('src/@core/components/popup/Editor/EditorPopupEnquiry'),
  { ssr: false },
)

// Scans the DOM for <strong>Apply_Now</strong> placeholders injected by the
// CMS rich-text editor and replaces them with the real enquiry button.
// Uses MutationObserver so late-rendered college/course inner-page content
// is also caught after hydration.
export default function ApplyNowInjector() {
  useEffect(() => {
    const replace = () => {
      const elements = document.getElementsByTagName('strong')
      // Iterate backwards — HTMLCollection is live, forward iteration skips elements.
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i]
        if (el.innerText.trim() === 'Apply_Now') {
          const container = document.createElement('div')
          el.parentNode?.replaceChild(container, el)
          createRoot(container).render(
            <EditorEnquiryForm className='applyNowButton btn btn-sm' />,
          )
        }
      }
    }

    replace()
    const observer = new MutationObserver(replace)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return null
}

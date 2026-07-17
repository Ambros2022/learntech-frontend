'use client'

import { useState, useEffect } from 'react'

interface ReadMoreContentProps {
  html: string
  collapsedHeight?: number
  charLimit?: number
  readMoreText?: string
  readLessText?: string
  buttonClassName?: string
}

export default function ReadMoreContent({
  html,
  collapsedHeight = 500,
  charLimit,
  readMoreText = 'Read More',
  readLessText = 'Read Less',
  buttonClassName = 'btn viewMoreClgBtn',
}: ReadMoreContentProps) {
  const [expanded, setExpanded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!html) return null

  // If charLimit is defined, we do character-based truncation
  // We use isMounted to render the full text on server for SEO indexing (matching original behavior)
  const shouldTruncateChar = charLimit && html.length > charLimit && !expanded && isMounted
  const displayHtml = shouldTruncateChar ? html.slice(0, charLimit) + '...' : html

  return (
    <>
      <div
        style={
          !charLimit && !expanded
            ? {
                maxHeight: `${collapsedHeight}px`,
                overflow: 'hidden',
              }
            : undefined
        }
        dangerouslySetInnerHTML={{ __html: displayHtml }}
      />

      {(!charLimit || html.length > charLimit) && (
        <div className="text-center mt-3">
          <button
            type="button"
            className={buttonClassName}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? readLessText : readMoreText}
          </button>
        </div>
      )}
    </>
  )
}
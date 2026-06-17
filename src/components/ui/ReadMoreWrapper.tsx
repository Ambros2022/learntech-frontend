'use client'

import { useState } from 'react'

interface ReadMoreContentProps {
  html: string
  collapsedHeight?: number
  readMoreText?: string
  readLessText?: string
  buttonClassName?: string
}

export default function ReadMoreContent({
  html,
  collapsedHeight = 500,
  readMoreText = 'Read More',
  readLessText = 'Read Less',
  buttonClassName = 'btn viewMoreClgBtn',
}: ReadMoreContentProps) {
  const [expanded, setExpanded] = useState(false)

  if (!html) return null

  return (
    <>
      <div
        style={
          !expanded
            ? {
                maxHeight: `${collapsedHeight}px`,
                overflow: 'hidden',
              }
            : undefined
        }
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="text-center mt-3">
        <button
          type="button"
          className={buttonClassName}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? readLessText : readMoreText}
        </button>
      </div>
    </>
  )
}
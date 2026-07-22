'use client'

import { useState, useEffect, useRef } from 'react'

export interface ReadMoreContentProps {
  html: string
  collapsedHeight?: number
  charLimit?: number
  isLong?: boolean
  readMoreText?: string
  readLessText?: string
  buttonClassName?: string
  showGradient?: boolean
  gradientBg?: string
  align?: 'center' | 'start' | 'end'
  className?: string
  style?: React.CSSProperties
}

/**
 * A highly customizable and proper ReadMore / LoadMore component.
 * Uses dual-layer container strategy: inner div is measured for true content height,
 * while outer div smoothly applies max-height clipping and gradient overlay.
 */
export default function ReadMoreContent({
  html,
  collapsedHeight = 500,
  charLimit,
  isLong: explicitIsLong,
  readMoreText = 'Read More',
  readLessText = 'Read Less',
  buttonClassName = 'btn viewMoreClgBtn',
  showGradient = true,
  gradientBg = '#ffffff',
  align = 'center',
  className = 'bs-editor-text',
  style,
}: ReadMoreContentProps) {
  const [expanded, setExpanded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [hasHeightOverflow, setHasHeightOverflow] = useState(true)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Reset expanded state whenever html content changes
  useEffect(() => {
    setExpanded(false)
  }, [html])

  // Measure INNER content height dynamically to detect overflow without outer maxHeight interference
  useEffect(() => {
    if (charLimit || explicitIsLong !== undefined) return

    const checkOverflow = () => {
      if (innerRef.current) {
        // innerRef is unconstrained, so offsetHeight / scrollHeight returns the exact full height of inner content
        const actualHeight = innerRef.current.offsetHeight || innerRef.current.scrollHeight
        const isOverflowing = actualHeight > collapsedHeight + 5
        setHasHeightOverflow(isOverflowing)
      }
    }

    checkOverflow()

    window.addEventListener('resize', checkOverflow)

    let observer: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined' && innerRef.current) {
      observer = new ResizeObserver(checkOverflow)
      observer.observe(innerRef.current)
    }

    return () => {
      window.removeEventListener('resize', checkOverflow)
      if (observer) observer.disconnect()
    }
  }, [html, collapsedHeight, charLimit, explicitIsLong])

  if (!html) return null

  // Calculate whether content actually requires a read more / load more button
  let contentIsLong = true
  if (explicitIsLong !== undefined) {
    contentIsLong = explicitIsLong
  } else if (charLimit) {
    contentIsLong = html.length > charLimit
  } else {
    contentIsLong = hasHeightOverflow
  }

  // Character-based truncation (applied only after client mount to preserve SSR SEO)
  const shouldTruncateChar = charLimit && contentIsLong && !expanded && isMounted
  const displayHtml = shouldTruncateChar ? html.slice(0, charLimit) + '...' : html

  const isCollapsed = !expanded && contentIsLong

  const alignmentClass =
    align === 'start' ? 'text-start' : align === 'end' ? 'text-end' : 'text-center'

  return (
    <div className="w-100">
      {/* Outer wrapper controls max-height clipping & transition */}
      <div
        style={{
          position: 'relative',
          transition: 'max-height 0.35s ease-in-out',
          overflow: isCollapsed ? 'hidden' : 'visible',
          maxHeight: !charLimit && isCollapsed ? `${collapsedHeight}px` : 'none',
        }}
      >
        {/* Inner container renders HTML and is measured for true height */}
        <div
          ref={innerRef}
          className={className}
          style={style}
          dangerouslySetInnerHTML={{ __html: displayHtml }}
        />

        {/* Gradient Fade Overlay when Collapsed */}
        {!charLimit && isCollapsed && showGradient && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              background: `linear-gradient(to top, ${gradientBg} 0%, rgba(255, 255, 255, 0) 100%)`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        )}
      </div>

      {/* Toggle Button */}
      {contentIsLong && (
        <div className={`${alignmentClass} mt-3`}>
          <button
            type="button"
            className={buttonClassName}
            onClick={(e) => {
              e.preventDefault()
              setExpanded(prev => !prev)
            }}
          >
            {expanded ? readLessText : readMoreText}
          </button>
        </div>
      )}
    </div>
  )
}
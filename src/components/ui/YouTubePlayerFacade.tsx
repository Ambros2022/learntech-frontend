'use client'

import { useState } from 'react'
import Image from 'next/image'

interface YouTubePlayerFacadeProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubePlayerFacade({
  videoId,
  title,
  className = 'h-100 rounded w-100',
}: YouTubePlayerFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={className}
      />
    )
  }

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`

  return (
    <div
      className={`${className} position-relative overflow-hidden cursor-pointer d-flex align-items-center justify-content-center bg-black`}
      onClick={() => setIsLoaded(true)}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsLoaded(true)
        }
      }}
      style={{ cursor: 'pointer', minHeight: '200px' }}
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 75vw"
        style={{ objectFit: 'cover' }}
        loading="lazy"
      />
      <div
        className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: '68px',
          height: '48px',
          backgroundColor: 'rgba(33, 33, 33, 0.8)',
          transition: 'all 0.2s ease-in-out',
          zIndex: 2,
        }}
      >
        <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
          <path
            className="ytp-large-play-button-bg"
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
            fill="#f00"
          />
          <path d="M 45,24 27,14 27,34" fill="#fff" />
        </svg>
      </div>
    </div>
  )
}

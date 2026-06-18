import Image from 'next/image'
import React from 'react'

interface InnerHeaderProps {
  title: string
  description?: React.ReactNode
  backgroundImage?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  bgGradient?: string
  titleClassName?: string
  minHeight?: number
  children?: React.ReactNode
}

export default function InnerHeader({
  title,
  description,
  backgroundImage = '/images/icons/BannerBG.webp',
  align = 'center',
  className = '',
  bgGradient,
  titleClassName = '',
  minHeight = 300,
  children,
}: InnerHeaderProps) {
  const alignClass =
    align === 'center' ? 'text-center' : align === 'right' ? 'text-end' : 'text-start'

  return (
    <section
      className={`position-relative d-flex align-items-center ${className}`}
      style={{ minHeight }}
    >
      {/* Background image — clipped by own wrapper so dropdown children aren't cut */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Optional gradient overlay — only rendered when explicitly passed */}
      {bgGradient && (
        <div
          className="position-absolute w-100 h-100"
          style={{ background: bgGradient, top: 0, left: 0, zIndex: 1 }}
        />
      )}

      {/* Content */}
      <div className="position-relative w-100" style={{ zIndex: 2 }}>
        <div className={`container py-5 ${alignClass}`}>
          <h1 className={`text-white fw-bold mb-3 ${titleClassName}`}>{title}</h1>
          {description && (
            <h5 className="text-white mb-0 fw-medium">{description}</h5>
          )}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </section>
  )
}

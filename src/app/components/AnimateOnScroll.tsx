'use client'

import { useRef, useEffect, type ReactNode } from 'react'

type AnimationVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade'

interface AnimateOnScrollProps {
  children: ReactNode
  variant?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
  as?: React.ElementType
}

const INITIAL_STYLES: Record<AnimationVariant, Record<string, string>> = {
  'fade-up':    { opacity: '0', transform: 'translateY(40px)' },
  'fade-down':  { opacity: '0', transform: 'translateY(-40px)' },
  'fade-left':  { opacity: '0', transform: 'translateX(-40px)' },
  'fade-right': { opacity: '0', transform: 'translateX(40px)' },
  'zoom-in':    { opacity: '0', transform: 'scale(0.92)' },
  'fade':       { opacity: '0' },
}

const VISIBLE_STYLES: Record<string, string> = {
  opacity: '1',
  transform: 'translateY(0) translateX(0) scale(1)',
}

export default function AnimateOnScroll({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.05,
  once = true,
  as: Tag = 'div' as React.ElementType,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const initial = INITIAL_STYLES[variant]
    const rect = el.getBoundingClientRect()
    const isVisibleAtStart = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisibleAtStart && once) {
      Object.assign(el.style, VISIBLE_STYLES)
      return
    }

    Object.assign(el.style, initial)
    el.style.transition = `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`
    el.style.willChange = 'opacity, transform'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          Object.assign(el.style, VISIBLE_STYLES)
          if (once) observer.unobserve(el)
        } else if (!once) {
          Object.assign(el.style, initial)
        }
      },
      { threshold, rootMargin: '0px 0px 100px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [variant, delay, duration, threshold, once])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

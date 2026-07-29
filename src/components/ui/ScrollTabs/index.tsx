'use client'
import { useRef, useEffect } from 'react'
import styles from './ScrollTabs.module.css'

export interface TabItem {
  id: string
  label: string
}

interface Props {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (id: string) => void
  className?: string
  alwaysShowArrows?: boolean
}

export default function ScrollTabs({ tabs, activeTab, onTabChange, className, alwaysShowArrows }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeTab])

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <div className={`d-flex align-items-center gap-1 pt-3 ${className ?? ''}`}>
      <button
        className={`btn btn-sm flex-shrink-0 p-1 ${alwaysShowArrows ? '' : 'd-md-none'}`}
        onClick={() => scroll('left')}
        aria-label="Scroll tabs left"
        style={{ lineHeight: 1 }}
      >
        <i className="bi bi-chevron-left" />
      </button>

      <div
        ref={scrollRef}
        className="d-flex gap-3 flex-grow-1"
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          paddingBottom: 2,
        } as React.CSSProperties}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={activeTab === tab.id ? activeRef : null}
            className={`btn flex-shrink-0 ${styles.tabBtn} ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <button
        className={`btn btn-sm flex-shrink-0 p-1 ${alwaysShowArrows ? '' : 'd-md-none'}`}
        onClick={() => scroll('right')}
        aria-label="Scroll tabs right"
        style={{ lineHeight: 1 }}
      >
        <i className="bi bi-chevron-right" />
      </button>
    </div>
  )
}

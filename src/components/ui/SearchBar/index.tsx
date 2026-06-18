'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

export interface SearchItem {
  id: string | number
  label: string
  href: string
}

interface Props {
  placeholder?: string
  onSearch: (query: string, signal?: AbortSignal) => Promise<SearchItem[]>
  className?: string
}

export default function SearchBar({ placeholder = 'Search...', onSearch, className }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const handleChange = async (value: string) => {
    setQuery(value)
    abortRef.current?.abort()
    if (value.length < 2) {
      setResults([])
      setOpen(false)
      return
    }
    abortRef.current = new AbortController()
    const { signal } = abortRef.current
    setLoading(true)
    try {
      const items = await onSearch(value, signal)
      if (!signal.aborted) {
        setResults(items)
        setOpen(items.length > 0)
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        setResults([])
        setOpen(false)
      }
    } finally {
      if (!signal.aborted) setLoading(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className={`position-relative ${className ?? ''}`}>
      <div
        className="d-flex align-items-center bg-white"
        style={{
          borderRadius: 4,
          border: focused ? '1px solid #86b7fe' : '1px solid #ced4da',
          boxShadow: focused ? '0 0 0 4px rgba(255,255,255,0.35)' : 'none',
          height: 52,
          padding: '0 12px',
          gap: 10,
          transition: 'box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out',
        }}
      >
        <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {loading ? (
            <span
              className="spinner-border spinner-border-sm text-secondary"
              role="status"
              aria-label="Loading"
            />
          ) : (
            <i className="bi bi-search text-secondary" />
          )}
        </span>

        <input
          type="text"
          className="flex-grow-1"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          aria-label={placeholder}
          aria-expanded={open}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          style={{
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            background: 'transparent',
            height: '100%',
            fontSize: '1rem',
            color: '#212529',
          }}
        />

        <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {query ? (
            <button
              onClick={handleClear}
              type="button"
              aria-label="Clear search"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <i className="bi bi-x-lg text-secondary" />
            </button>
          ) : (
            <i className="bi bi-chevron-down text-secondary" style={{ fontSize: '0.75rem' }} />
          )}
        </span>
      </div>

      {open && results.length > 0 && (
        <ul
          className="list-unstyled position-absolute w-100 bg-white shadow-sm border rounded"
          style={{ top: 'calc(100% + 4px)', zIndex: 9999, maxHeight: 280, overflowY: 'auto', margin: 0, padding: 0 }}
          role="listbox"
          aria-label="Search results"
        >
          {results.map((item, idx) => (
            <li
              key={item.id}
              role="option"
              aria-selected="false"
              style={{ borderBottom: idx < results.length - 1 ? '1px solid #f0f0f0' : 'none' }}
            >
              <Link
                href={item.href}
                className="d-block px-3 py-2 text-dark text-decoration-none text-start"
                style={{ fontSize: '0.875rem', lineHeight: 1.5, transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f5f7ff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

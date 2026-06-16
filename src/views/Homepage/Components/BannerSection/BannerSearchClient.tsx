'use client'

import React, { FC, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './Banner.module.css'

interface SearchItem {
  id: number
  name: string
  slug: string
  streamID?: number
  streamSlug?: string
  type: string
}

const TYPE_LABELS: Record<string, string> = {
  collegedata: 'College',
  schooldata: 'School',
  examdata: 'Exam',
  coursesdata: 'Course',
}

const getUrl = (item: SearchItem): string => {
  switch (item.type) {
    case 'coursesdata':
      return `/course/${item.streamID}/${item.streamSlug}/${item.slug}`
    case 'schooldata':
      return `/school/${item.id}/${item.slug}`
    case 'examdata':
      return `/exam/${item.id}/${item.slug}`
    default:
      return `/college/${item.id}/${item.slug}`
  }
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const BannerSearchClient: FC = () => {
  const [value, setValue] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const search = async (keyword: string) => {
    if (keyword.length < 2) {
      setResults([])
      return
    }

    abortRef.current?.abort()
    abortRef.current = new AbortController()

    try {
      setLoading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}api/website/home/searchbar?searchfrom=name&searchtext=${encodeURIComponent(keyword)}`,
        { signal: abortRef.current.signal },
      )
      if (!res.ok) return
      const json = await res.json()
      const items: SearchItem[] = (json?.data ?? []).flatMap((section: any) =>
        section.data.map((entry: any) => ({
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          streamID: entry?.streams?.id,
          streamSlug: entry?.streams?.slug,
          type: section.type,
        })),
      )
      setResults(items)
    } catch (err: any) {
      if (err.name !== 'AbortError') console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setValue('')
    setResults([])
  }

  const showDropdown = focused && value.length >= 2
  const showResults = showDropdown && results.length > 0
  const showNoResults = showDropdown && !loading && results.length === 0

  return (
    <div className="row">
      <div className="col-12 position-relative">

        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search colleges, universities, exams & courses"
            value={value}
            autoComplete="new-password"
            autoCorrect="off"
            spellCheck={false}
            onChange={e => {
              setValue(e.target.value)
              search(e.target.value)
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            aria-label="Search colleges, courses and exams"
          />

          {loading && <span className={styles.loader} role="status" aria-label="Loading" />}

          {!loading && value && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={clear}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {showResults && (
          <ul role="listbox" className={styles.searchDropdown}>
            {results.map(item => (
              <li key={`${item.type}-${item.id}`} role="option" className={styles.searchDropdownItem}>
                <Link href={getUrl(item)} onMouseDown={e => e.preventDefault()}>
                  <span className={styles.itemName}>{item.name}</span>
                  {TYPE_LABELS[item.type] && (
                    <span className={styles.itemType}>{TYPE_LABELS[item.type]}</span>
                  )}
                  <span className={styles.itemArrow}>
                    <ChevronRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {showNoResults && (
          <div className={styles.searchNoResults}>
            No results found for &ldquo;{value}&rdquo;
          </div>
        )}

      </div>
    </div>
  )
}

export default BannerSearchClient

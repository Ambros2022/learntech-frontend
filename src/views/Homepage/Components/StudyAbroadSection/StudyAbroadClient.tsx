'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'
import CollegeCarouselClient from 'src/components/colleges/CollegeCarouselClient'
import type { CollegeItem } from 'src/components/colleges/CollegeCard'
import styles from './StudyAbroadSection.module.css'

interface Country {
  id: number
  name: string
}

interface Props {
  countries: Country[]
  initialColleges: CollegeItem[]
  initialCountryId: number | null
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

export default function StudyAbroadClient({ countries, initialColleges, initialCountryId }: Props) {
  const [activeCountry, setActiveCountry] = useState<number | null>(initialCountryId)
  const [colleges, setColleges] = useState<CollegeItem[]>(initialColleges)
  const [loading, setLoading] = useState(false)

  // Cancel the in-flight request when a newer tab is clicked (race-safety)
  const abortRef = useRef<AbortController | null>(null)

  const selectCountry = useCallback(
    async (countryId: number) => {
      if (countryId === activeCountry) return
      setActiveCountry(countryId)
      setLoading(true)

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch(
          `${API_BASE}/api/website/colleges/get?country_id=${countryId}&page=1&size=10`,
          { signal: controller.signal },
        )
        const json = await res.json()
        setColleges(json?.data ?? [])
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          console.error('[StudyAbroad] failed to load colleges', err)
          setColleges([])
        }
      } finally {
        setLoading(false)
      }
    },
    [activeCountry],
  )

  useEffect(() => () => abortRef.current?.abort(), [])

  return (
    <>
      <div className={`${styles.navContainer} position-relative py-4 px-md-5 rounded`} style={{ zIndex: 2 }}>
        <EmblaCarousel
          variant="tabs"
          showDots={false}
          showArrows
          slidesToShowDesktop={7}
          slidesToShowTablet={4}
          slidesToShowMobile={2}
          autoplay={false}
          loop={false}
          leftArrowIcon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          }
          rightArrowIcon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          }
          arrowClassName={styles.countryArrow}
        >
          {countries.map(country => (
            <a
              key={country.id}
              role="button"
              aria-pressed={activeCountry === country.id}
              onClick={() => selectCountry(country.id)}
              style={{ cursor: 'pointer' }}
              className={`${activeCountry === country.id ? styles.activeCountry : ''} ${styles.navLink} text-truncate text-center`}
            >
              {country.name}
            </a>
          ))}
        </EmblaCarousel>
      </div>

      <div className="pt-3 position-relative" id="studyCardContainer">
        {loading ? (
          <p className="text-center py-4 mb-0">Loading…</p>
        ) : colleges.length > 0 ? (
          <>
            <CollegeCarouselClient colleges={colleges} />
            <div className="d-flex justify-content-center py-4">
              <Link href="/study-in-usa" className="btn viewMoreClgBtn">Load More</Link>
            </div>
          </>
        ) : (
          <p className="text-center py-4 mb-0">No colleges available for this country.</p>
        )}
      </div>
    </>
  )
}

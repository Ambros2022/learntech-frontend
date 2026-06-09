'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import CardComponent from './CardComponent'

type Tab = 'Colleges' | 'Courses' | 'Exams'

interface ExploreItem {
  id: number
  name: string
  slug: string
  logo: string
  uniqueCollegeCount?: number
}

const ENDPOINTS: Record<Tab, string> = {
  Colleges: 'api/website/explorecollege/get?orderby=asc&columnname=listing_order',
  Courses: 'api/website/explorecourses/get?orderby=asc&columnname=listing_order',
  Exams: 'api/website/exploreexam/get?orderby=asc&columnname=listing_order',
}

const PAGE_SIZE = 18

export default function ExploreSection() {
  const [activeTab, setActiveTab] = useState<Tab>('Colleges')
  const [data, setData] = useState<ExploreItem[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [size, setSize] = useState(PAGE_SIZE)
  const abortRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async (tab: Tab, pageSize: number) => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}${ENDPOINTS[tab]}&page=1&size=${pageSize}`,
        { signal: abortRef.current.signal } as RequestInit,
      )
      if (!res.ok) return
      const json = await res.json()
      setData(json?.data ?? [])
      setTotalItems(json?.totalItems ?? 0)
    } catch (err: any) {
      if (err.name !== 'AbortError') console.error(err)
    }
  }, [])

  useEffect(() => {
    fetchData(activeTab, size)
  }, [activeTab, size, fetchData])

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab)
    setSize(PAGE_SIZE)
  }, [])

  return (
    <section className="exploreCon">
      <div className="container py-4 py-md-5">
        <h2 className="fw-bold text-blue text-center mb-4 h2sizeadded">
          Discover Colleges, Courses and Exams that Matches with Your Aspirations
        </h2>

        <div className="d-flex exploreNav justify-content-center mb-4" role="tablist">
          {(['Colleges', 'Courses', 'Exams'] as Tab[]).map(tab => (
            <a
              key={tab}
              className={`btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabChange(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              style={{ cursor: 'pointer' }}
            >
              {tab}
            </a>
          ))}
        </div>

        <div className="row">
          {data.map(item => (
            <CardComponent
              key={item.id}
              title={item.name}
              imageSrc={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.logo}`}
              count={item.uniqueCollegeCount ?? undefined}
              activeTab={activeTab}
              itemId={item.id}
              slug={item.slug}
            />
          ))}
        </div>

        {totalItems > data.length && (
          <div className="text-center mt-4">
            <button
              className="btn viewMoreCollegeBtn"
              onClick={() => setSize(s => s + 6)}
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

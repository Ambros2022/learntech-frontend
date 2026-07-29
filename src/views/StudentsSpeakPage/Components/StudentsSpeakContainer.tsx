'use client'

import React, { useState, useEffect, useRef } from 'react'
import BannerSec from './BannerSec'
import VideoSec from './VideoSec'

const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

type Props = {
  pagedata: any
  initialCards: any[]
  initialTotalPages: number
}

export default function StudentsSpeakContainer({ pagedata, initialCards, initialTotalPages }: Props) {
  const [cards, setCards] = useState<any[]>(initialCards)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  
  const isFirstRender = useRef(true)

  const fetchTestimonials = async (page: number, searchText: string, signal?: AbortSignal) => {
    try {
      const sp = new URLSearchParams({
        page: String(page),
        size: '6',
        searchfrom: 'name',
        searchtext: searchText,
      })
      const response = await fetch(`${API_URL}/api/website/allvideotestimonials/get?${sp}`, { signal })
      if (!response.ok) return
      const json = await response.json()
      setCards(json.data ?? [])
      setTotalPages(json.totalPages ?? 1)
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Failed to fetch video testimonials:', error)
      }
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    fetchTestimonials(currentPage, searchQuery)
  }, [currentPage, searchQuery])

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <BannerSec handleSearchQuery={handleSearchQuery} />
      <VideoSec
        cards={cards}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />
    </>
  )
}

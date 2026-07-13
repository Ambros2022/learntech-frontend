'use client'

import SearchBar, { type SearchItem } from './index'

const API_URL = process.env.NEXT_PUBLIC_API_URI || ''

async function fetchScholarshipResults(query: string, signal?: AbortSignal): Promise<SearchItem[]> {
  const response = await fetch(
    `${API_URL}/api/website/scholarships/get?searchfrom=name&searchtext=${encodeURIComponent(query)}`,
    { signal }
  )
  if (!response.ok) return []
  const json = await response.json()

  return (json?.data ?? []).map((item: { id: number; name: string; slug: string }) => ({
    id: item.id,
    label: item.name,
    href: `/scholarship/${item.id}/${item.slug}`,
  }))
}

export default function ScholarshipSearchBar() {
  return (
    <SearchBar
      placeholder="Search for Scholarship"
      onSearch={(query, signal) => fetchScholarshipResults(query, signal)}
    />
  )
}

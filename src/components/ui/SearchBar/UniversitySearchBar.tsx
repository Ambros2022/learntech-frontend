'use client'
import SearchBar, { type SearchItem } from './index'

const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

async function fetchUniversityResults(query: string, signal?: AbortSignal): Promise<SearchItem[]> {
  const params = new URLSearchParams({ searchfrom: 'name', searchtext: query, type: 'university' })
  const res = await fetch(`${API_URL}/api/website/colleges/get?${params}`, { signal })
  if (!res.ok) return []
  const json = await res.json()
  return (json.data ?? []).map((item: any) => ({
    id: item.id,
    label: item.name,
    href: `/university/${item.id}/${item.slug}`,
  }))
}

export default function UniversitySearchBar() {
  return <SearchBar placeholder="Find Your University" onSearch={fetchUniversityResults} />
}

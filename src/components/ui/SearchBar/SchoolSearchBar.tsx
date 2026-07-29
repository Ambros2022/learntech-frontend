'use client'
import SearchBar, { type SearchItem } from './index'

const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

async function fetchSchoolResults(query: string, signal?: AbortSignal): Promise<SearchItem[]> {
  const params = new URLSearchParams({ searchfrom: 'name', searchtext: query })
  const res = await fetch(`${API_URL}/api/website/schools/get?${params}`, { signal })
  if (!res.ok) return []
  const json = await res.json()
  return (json.data ?? []).map((item: any) => ({
    id: item.id,
    label: item.name,
    href: `/school/${item.id}/${item.slug}`,
  }))
}

export default function SchoolSearchBar() {
  return <SearchBar placeholder="Explore Top Schools in India" onSearch={fetchSchoolResults} />
}

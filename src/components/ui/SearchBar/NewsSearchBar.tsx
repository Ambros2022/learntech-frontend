'use client'
import SearchBar, { type SearchItem } from './index'

const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

async function fetchNewsResults(query: string, signal?: AbortSignal): Promise<SearchItem[]> {
  const params = new URLSearchParams({ searchfrom: 'name', searchtext: query })
  const res = await fetch(`${API_URL}/api/website/news/get?${params}`, { signal })
  if (!res.ok) return []
  const json = await res.json()
  return (json.data ?? []).map((item: any) => ({
    id: item.id,
    label: item.name,
    href: `/news/${item.id}/${item.slug}`,
  }))
}

export default function NewsSearchBar() {
  return <SearchBar placeholder="Search for News" onSearch={fetchNewsResults} />
}

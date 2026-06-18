'use client'

import SearchBar, { type SearchItem } from 'src/components/ui/SearchBar'

const API_URL = process.env.NEXT_PUBLIC_API_URI || ''

interface Props {
  countryId: number
  countrySlug: string
}

async function fetchAbroadResults(query: string, countryId: number, countrySlug: string, signal?: AbortSignal): Promise<SearchItem[]> {
  const params = new URLSearchParams({ searchfrom: 'name', searchtext: query, country_id: String(countryId) })
  const res = await fetch(`${API_URL}/api/website/colleges/get?${params}`, { signal })
  if (!res.ok) return []
  const json = await res.json()
  return (json.data ?? []).map((item: any) => ({
    id: item.id,
    label: item.name,
    href: `/${countrySlug}/${item.id}/${item.slug}`,
  }))
}

export default function AbroadSearchBar({ countryId, countrySlug }: Props) {
  return (
    <SearchBar
      placeholder="Find Your Dream University"
      onSearch={(query, signal) => fetchAbroadResults(query, countryId, countrySlug, signal)}
    />
  )
}

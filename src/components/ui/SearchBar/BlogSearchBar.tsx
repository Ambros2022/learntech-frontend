'use client'
import SearchBar, { type SearchItem } from './index'

const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

async function fetchBlogResults(query: string, signal?: AbortSignal): Promise<SearchItem[]> {
  const res = await fetch(
    `${API_URL}/api/website/blog/get?searchfrom=name&searchtext=${encodeURIComponent(query)}`,
    { signal },
  )
  if (!res.ok) return []
  const json = await res.json()
  return (json.data ?? []).map((item: any) => ({
    id: item.id,
    label: item.name,
    href: `/blog/${item.id}/${item.slug}`,
  }))
}

export default function BlogSearchBar() {
  return <SearchBar placeholder="Search for Blogs" onSearch={fetchBlogResults} />
}

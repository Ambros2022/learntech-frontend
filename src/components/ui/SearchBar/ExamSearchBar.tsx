'use client'
import SearchBar, { type SearchItem } from './index'

const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

async function fetchExamResults(query: string, signal?: AbortSignal): Promise<SearchItem[]> {
  const params = new URLSearchParams({ searchfrom: 'exam_title', searchtext: query })
  const res = await fetch(`${API_URL}/api/website/exams/get?${params}`, { signal })
  if (!res.ok) return []
  const json = await res.json()
  return (json.data ?? []).map((item: any) => ({
    id: item.id,
    label: item.exam_title,
    href: `/exam/${item.id}/${item.slug}`,
  }))
}

export default function ExamSearchBar() {
  return <SearchBar placeholder="Search for Entrance Exam" onSearch={fetchExamResults} />
}

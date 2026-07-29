'use client'

import SearchBar, { type SearchItem } from 'src/components/ui/SearchBar'

const API_URL = process.env.NEXT_PUBLIC_API_URI || ''

async function fetchCourseResults(query: string, signal?: AbortSignal): Promise<SearchItem[]> {
  const params = new URLSearchParams({
    searchfrom: 'name,general_courses.short_name,general_courses.name',
    searchtext: query,
  })
  const res = await fetch(`${API_URL}/api/website/courses/get?${params}`, { signal })
  if (!res.ok) return []
  const json = await res.json()
  const results: SearchItem[] = []
  const q = query.toLowerCase()
  for (const course of (json.data ?? [])) {
    if (course.name.toLowerCase().includes(q)) {
      results.push({ id: course.id, label: course.name, href: `/course/${course.id}/${course.slug}` })
    }
    for (const gc of (course.general_courses ?? [])) {
      if (gc.name.toLowerCase().includes(q) || gc.short_name.toLowerCase().includes(q)) {
        results.push({ id: `gc-${gc.id}`, label: gc.short_name, href: `/course/${course.id}/${course.slug}/${gc.slug}` })
      }
    }
  }
  return results
}

export default function CourseSearchBar() {
  return (
    <SearchBar
      placeholder="Search for course, degree or specialization"
      onSearch={(query, signal) => fetchCourseResults(query, signal)}
    />
  )
}

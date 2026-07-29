'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { TabItem } from 'src/components/ui/ScrollTabs'

const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')
const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || ''

interface NewsItem {
  id: number
  name: string
  slug: string
  banner_image: string
  meta_description: string
  category_id: string
}

interface BrowseNewsClientProps {
  categories: TabItem[]
  initialNews: NewsItem[]
  initialTotalPages: number
  children: React.ReactNode
}


export default function BrowseNewsClient({ categories, initialNews, initialTotalPages, children }: BrowseNewsClientProps) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? 'all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews)
  const [loading, setLoading] = useState(false)
  const newsPerPage = 8
  const sectionRef = useRef<HTMLElement>(null)
  const hasMounted = useRef(false)

  const fetchNews = useCallback(async (categoryId: string, page: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        size: String(newsPerPage),
        columnname: 'created_at',
        orderby: 'desc',
      })
      if (categoryId !== 'all') {
        params.set('category_id', categoryId)
      }
      const res = await fetch(`${API_URL}/api/website/news/get?${params}`)
      if (!res.ok) return
      const json = await res.json()
      if (json.status === 1) {
        setNewsItems(json.data ?? [])
        setTotalPages(json.totalPages ?? 1)
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Skip the very first render (page 1 + first tab) since SSR data is already loaded.
  // After that, always fetch so going back to page 1 re-loads correctly.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    fetchNews(activeTab, currentPage)
  }, [activeTab, currentPage, fetchNews])

  const handleTabChange = (id: string) => {
    setActiveTab(id)
    setCurrentPage(1)
  }

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
    scrollToSection()
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
    scrollToSection()
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
    scrollToSection()
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const range = 1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pages.push(i)
      } else if (
        i === currentPage - range - 1 ||
        i === currentPage + range + 1
      ) {
        pages.push('...')
      }
    }

    return pages.filter((value, idx, self) => {
      if (value === '...') {
        return self[idx - 1] !== '...'
      }
      return true
    })
  }

  const activeIndex = categories.findIndex(cat => cat.id === activeTab)
  const activeCategoryLabel = categories[activeIndex]?.label ?? ''

  const handlePrevTab = () => {
    const prevIndex = (activeIndex - 1 + categories.length) % categories.length
    handleTabChange(categories[prevIndex].id)
  }

  const handleNextTab = () => {
    const nextIndex = (activeIndex + 1) % categories.length
    handleTabChange(categories[nextIndex].id)
  }

  return (
    <section ref={sectionRef} className='py-5 pb-3 pb-md-5 bg-white browseNews'>
      <div className='container'>
        <h2 className='fw-bold text-blue text-center mb-3'>Browse News By Category</h2>

        {/* Desktop View: Grid of tabs */}
        <div className='d-none d-md-flex justify-content-center newsTabsClr gap-3 mx-0 flex-wrap flex-row'>
          {categories.map(category => (
            <button
              key={category.id}
              className={`btn bg-skyBlue hover-card ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => handleTabChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Mobile View: 1 active tab centered, with left and right navigation arrows */}
        <div className='d-flex d-md-none align-items-center justify-content-between w-100 px-2 newsTabsClr'>
          <span
            onClick={handlePrevTab}
            style={{ color: '#4b5563', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
            aria-label="Previous Category"
          >
            <ChevronLeft size={30} />
          </span>

          <button
            className="btn flex-grow-1 mx-3 py-3"
            style={{
              border: '1px solid rgba(212, 218, 234, 1)',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 500,
              color: '#254692',
              backgroundColor: '#f6f8fb',
              cursor: 'default'
            }}
          >
            {activeCategoryLabel}
          </button>

          <span
            onClick={handleNextTab}
            style={{ color: '#4b5563', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
            aria-label="Next Category"
          >
            <ChevronRight size={30} />
          </span>
        </div>

        <div className='row mb-3 mt-5'>
          <div className='col-lg-8 col-xl-8 col-md-7'>
            <div className='tab-content' id='pills-tabContent' style={{ border: 'none', borderBottom: 'none' }}>
              <div
                className=' fade show active'
                id={`pills-${activeTab}`}
                role='tabpanel'
                aria-labelledby={`pills-${activeTab}-tab`}
                style={{ border: 'none', borderBottom: 'none' }}
              >
                <div className='row d-flex flex-row'>
                  {loading ? (
                    <div className='text-center'>Loading....</div>
                  ) : newsItems.length > 0 ? (
                    newsItems.map(item => (
                      <div key={item.id} className='col-12 col-md-6 col-lg-6 px-4 mx-lg-0 mb-5 d-flex'>
                        <div className='card h-100 w-100 d-flex flex-column bg-skyBlue'>
                          <div className='newsPageImg'>
                            <img
                              src={`${IMG_URL}/${item.banner_image}`}
                              width={400}
                              height={400}
                              className='img-fluid'
                              alt='newsImage'
                            />
                          </div>
                          <Link className='text-black hover-blue flex-grow-1' href={`/news/${item.id}/${item.slug}`}>
                            <div className='card-body d-flex flex-column'>
                              <h5 className='fw-bold card-title'>{item.name}</h5>
                            </div>
                          </Link>
                          <div className='p-3 mt-auto'>
                            <Link href={`/news/${item.id}/${item.slug}`}>
                              <button className='btn viewMoreCollegeBtn'>View Detail</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='text-center pb-5'>No news available</div>
                  )}
                </div>
              </div>
            </div>
            {/* Pagination */}
            <div className='d-flex justify-content-center' style={{ border: 'none', borderTop: 'none', boxShadow: 'none' }}>
              <nav aria-label='Page navigation example' style={{ border: 'none', borderTop: 'none', boxShadow: 'none' }}>
                <ul className='pagination d-flex gap-3 flex-wrap justify-content-center' style={{ border: 'none', borderTop: 'none', boxShadow: 'none' }}>
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={handlePreviousPage} aria-label='Previous'>
                      <span aria-hidden='true'>{'<'}</span>
                    </button>
                  </li>
                  {getPageNumbers().map((page, index) => (
                    <li
                      key={index}
                      className={`page-item ${currentPage === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                    >
                      {page === '...' ? (
                        <span className='page-link'>...</span>
                      ) : (
                        <button className='page-link' onClick={() => handlePageClick(Number(page))}>
                          {page}
                        </button>
                      )}
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={handleNextPage} aria-label='Next'>
                      <span aria-hidden='true'>{'>'}</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className='col-lg-4 col-xl-4 col-md-5'>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

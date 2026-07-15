'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'
import type { NewsOrBlogItem } from './index'
import styles from './LatestNewsSection.module.css'

const API_BASE = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  try {
    return format(new Date(dateStr), 'dd-MMM-yyyy')
  } catch {
    return ''
  }
}

// Matches live HTML structure exactly — full card wrapped in Link (no nested <a>)
function NewsCard({ item, type }: { item: NewsOrBlogItem; type: 'news' | 'blog' }) {
  const href = `/${type}/${item.id}/${item.slug}`
  return (
    <div className={styles.slide}>
      <Link href={href} className={styles.cardLink}>
        <div className={styles.cardSlide}>
          <div className={styles.cardInner}>
            <div className={`card h-100 ${styles.card}`}>
              <div className={`card-body ${styles.cardBody}`}>
                <h5 className={`card-title ${styles.cardTitle}`}>{item.name}</h5>
                {item.created_at && (
                  <h6 className={`card-subtitle ${styles.cardDate}`}>
                    {formatDate(item.created_at)}
                  </h6>
                )}
                <div className={`row mb-3 ${styles.cardDescRow}`}>
                  <div className="col-xl-8">
                    <p className={`card-text ${styles.cardText}`}>{item.meta_description}</p>
                  </div>
                </div>
                <span className={styles.readMoreBtn}>Read More</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

interface Props {
  initialNews: NewsOrBlogItem[]
}

export default function LatestNewsClient({ initialNews }: Props) {
  const [activeTab, setActiveTab] = useState<'news' | 'blog'>('news')
  const [blogs, setBlogs] = useState<NewsOrBlogItem[]>([])
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const loadBlogs = useCallback(async () => {
    if (blogs.length > 0) return
    setLoading(true)
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const res = await fetch(
        `${API_BASE}/api/website/newsandblogs/get?page=1&size=8&type=blog&orderby=desc&columnname=created_at`,
        { signal: controller.signal },
      )
      const json = await res.json()
      setBlogs(json?.blogs?.data ?? [])
    } catch (err: any) {
      if (err?.name !== 'AbortError') console.error('[LatestNews] blog fetch failed', err)
    } finally {
      setLoading(false)
    }
  }, [blogs.length])

  useEffect(() => () => abortRef.current?.abort(), [])

  const handleTab = (tab: 'news' | 'blog') => {
    setActiveTab(tab)
    if (tab === 'blog') loadBlogs()
  }

  const items = activeTab === 'news' ? initialNews : blogs

  return (
    <>
      <div className="d-flex justify-content-center gap-2 pt-3" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'news'}
          className={`btn ${styles.tabBtn} ${activeTab === 'news' ? styles.activeTab : ''}`}
          onClick={() => handleTab('news')}
        >
          News
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'blog'}
          className={`btn ${styles.tabBtn} ${activeTab === 'blog' ? styles.activeTab : ''}`}
          onClick={() => handleTab('blog')}
        >
          Blogs
        </button>
      </div>

      <div className="pt-4">
        {loading ? (
          <p className={styles.emptyState}>Loading…</p>
        ) : items.length > 0 ? (
          <EmblaCarousel
            showDots={false}
            showArrows
            slidesToShowDesktop={3}
            slidesToShowTablet={2}
            slidesToShowMobile={1}
            autoplay={false}
            loop={false}
            slidePadding={0}
          >
            {items.map(item => (
              <NewsCard key={item.id} item={item} type={activeTab} />
            ))}
          </EmblaCarousel>
        ) : (
          <p className={styles.emptyState}>
            No {activeTab === 'news' ? 'news' : 'blogs'} available.
          </p>
        )}
      </div>
    </>
  )
}

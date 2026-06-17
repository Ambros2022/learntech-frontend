'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import NewsList from '../newsList'
import ContactForm from 'src/@core/components/popup/ContactForm'
import { LazyGlobalPopupShare as GlobalPopupShare } from 'src/app/components/ClientWrappers'

const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')
const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')
const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')

type Props = {
  initialCards: any[]
  initialTotalPages: number
  colleges: any[]
}

const BlogCards = ({ initialCards, initialTotalPages, colleges }: Props) => {
  const [cardsData, setCardsData] = useState(initialCards)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchBlogs = async (page: number) => {
    try {
      const res = await fetch(`${API_URL}/api/website/blog/get?orderby=desc&page=${page}&size=8`)
      if (!res.ok) return
      const json = await res.json()
      setCardsData(json.data ?? [])
      setTotalPages(json.totalPages ?? 1)
    } catch {}
  }

  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1)
    setCurrentPage(newPage)
    fetchBlogs(newPage)
  }

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages)
    setCurrentPage(newPage)
    fetchBlogs(newPage)
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
    fetchBlogs(page)
  }

  return (
    <section className='bg-white py-5 blogCardspage'>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-xl-8 col-md-7">
            <div className="row">
              {cardsData.map((card) => (
                <div className="col-md-6 col-lg-6 mb-5 d-flex" key={card.id}>
                  <div className="card bg-skyBlue hover-card newsImgSize position-relative w-100">
                    <Image
                      src={`${IMG_URL}/${card.banner_image}`}
                      alt={card.name || 'blog'}
                      width={400}
                      height={400}
                      className="card-img-top"
                      loading="lazy"
                    />
                    <span className='share-icon'>
                      <GlobalPopupShare
                        pathname={`${WEB_URL}/blog/${card.id}/${card.slug}`}
                        title={card.meta_title}
                        logourl={`${IMG_URL}/${card.banner_image}`}
                      />
                    </span>
                    <div className="card-body d-flex flex-column">
                      <h2 className="card-title fw-bold text-truncate">{card.name}</h2>
                      <p className="card-text flex-grow-1">{card.meta_title}</p>
                      <div className="text-start">
                        <Link href={`/blog/${card.id}/${card.slug}`} className="btn viewMoreBtn mt-auto">
                          View More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div className='col-12 d-flex justify-content-center'>
                <nav aria-label="Page navigation">
                  <ul className="pagination d-flex gap-3">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
                        <span aria-hidden="true">{'<'}</span>
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageClick(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={handleNextPage} aria-label="Next">
                        <span aria-hidden="true">{'>'}</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-xl-4 col-md-5">
            <ContactForm heading={'Talk to Our Experts'} />
            {colleges?.length > 0 && <NewsList newsItems={colleges} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogCards

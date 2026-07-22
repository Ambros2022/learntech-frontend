'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')
const PAGE_SIZE = 4
const TABS = ['all', 'state', 'national', 'international'] as const
type Tab = typeof TABS[number]

interface Recognition {
  brdrecognitions: { recognition_approval_name: string }
}

interface BoardItem {
  id: number
  slug: string
  name: string
  logo: string
  established?: string
  address?: string
  gender?: string
  avg_rating?: number
  board_type?: string
  boardrecognitions?: Recognition[]
}

interface Props {
  boards: BoardItem[]
}

export default function BoardsSec({ boards }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)

  const filtered = activeTab === 'all'
    ? boards
    : boards.filter(b => b.board_type === activeTab)

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab)
    setDisplayCount(PAGE_SIZE)
  }

  return (
    <section className="py-md-5 py-3 bg-white browseNews">
      <div className="container">
        <div className="row justify-content-center newsTabsClr gap-0 gap-md-3">
          {TABS.map(tab => (
            <div key={tab} className="col-6 col-md-auto p-0 d-flex justify-content-center">
              <button
                className={`btn bg-skyBlue hover-card tab-button${activeTab === tab ? ' active' : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Boards
              </button>
            </div>
          ))}
        </div>

        <div className="row mb-3 mt-5">
          <div className="col-12">
            <div className="row">
              {filtered.slice(0, displayCount).map(item => (
                <div key={item.id} className="d-flex mx-auto col-md-6 mx-md-0 mb-3">
                  <div className="card hover-card newsImgSize w-100 bg-skyBlue">
                    <div className="card-body">
                      <div className="row d-flex">
                        <div className="col-lg-4 col-xl-3 align-self-center mb-lg-0 mb-3 d-flex">
                          <div className="innerClgImg text-center align-content-center">
                            <Image
                              src={`${IMG_BASE}/${item.logo}`}
                              alt={item.name}
                              width={100}
                              height={100}
                              loading='lazy'
                              className="img-fluid p-2 bg-white rounded"
                              unoptimized
                            />
                          </div>
                        </div>
                        <div className="col-lg-8 col-xl-6 align-content-center">
                          <h5 className="fw-bold card-title text-blue">{item.name}</h5>
                        </div>
                        {item.avg_rating != null && (
                          <div className="col-xl-3 align-content-center">
                            <div className="d-flex justify-content-xl-end gap-2 fs-5 me-2 pt-1">
                              {[1, 2, 3, 4, 5].map(n => (
                                <i
                                  key={n}
                                  className={`bi bi-star-fill ${(item.avg_rating ?? 0) >= n ? 'text-warning' : 'text-white'}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-12 mt-3">
                          {item.established && (
                            <p className="text-black mb-2">
                              <span className="fw-bold">Est Year: </span>{item.established}
                            </p>
                          )}
                          {item.address && (
                            <p className="text-black mb-2">
                              <span className="fw-bold">Location: </span>{item.address}
                            </p>
                          )}
                          {item.boardrecognitions?.length ? (
                            <p className="text-black">
                              <span className="fw-bold">Approvals and Recognition: </span>
                              {item.boardrecognitions.map((r, i) =>
                                (i === 0 ? ' ' : ', ') + r.brdrecognitions.recognition_approval_name
                              )}
                            </p>
                          ) : null}
                          {item.gender && (
                            <p className="text-black">
                              <span className="fw-bold">Genders Accepted: </span>{item.gender}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-md-content-end">
                        <Link href={`/board/${item.id}/${item.slug}`} className="btn viewMoreCollegeBtn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {displayCount < filtered.length && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn viewMoreCollegeBtn mt-3"
                  onClick={() => setDisplayCount(c => c + PAGE_SIZE)}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

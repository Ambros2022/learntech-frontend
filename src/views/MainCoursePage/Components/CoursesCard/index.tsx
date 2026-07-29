'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URI || ''
const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || ''

function CoursesCard({ course }: { course: any }) {
  return (
    <div id={course.id} className="col">
      <div className="card h-100 d-flex flex-column p-2 hover-card bg-crsCard">
        <div className="row g-0 pt-2">
          <div className="col-3 p-0 mb-3 text-center text-md-start">
            <Image
              width={50}
              height={50}
              src={`${IMG_URL}/${course.logo}`}
              className="rounded"
              alt={course.name}
            />
          </div>
          <div className="col-9">
            <div className="card-body p-0 ps-2 pt-2">
              <h5 className="fw-bold text-blue card-title text-start">{course.name}</h5>
            </div>
          </div>
        </div>
        <div className="card-body d-flex flex-column p-0">
          <div className="flex-grow-1 d-flex flex-wrap gap-2 justify-content-center align-items-start my-3">
            {(course.general_courses ?? []).map((val: any) => (
              <Link key={val.id} href={`/course/${course.id}/${course.slug}/${val.slug}`} className='btn streamBtn'>
                {val.short_name}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <Link href={`/course/${course.id}/${course.slug}`} className='d-flex justify-content-center text-center btn viewAllBtn w-100'>
              <span className='align-self-center'>View All {course.name} Courses</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function PromoAddBanner({ url, title, description }: { url: string; title: string; description: string }) {
  return (
    <section className='bg-skyBlue addBanner rounded'>
      <div className="container row p-5">
        <div className="card col-md-12 col-lg-9 col-xl-10 mx-auto p-0">
          <div className="row g-0">
            <div className="col-md-4 addImgClg position-relative">
              <Image
                src={`${IMG_URL}/${url}`}
                width={200}
                height={200}
                className="img-fluid rounded-start"
                alt={title}
              />
              <h2 className='position-absolute text-white' style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', zIndex: 3000, top: '50%', left: '50%', color: 'white' }}>Ad</h2>
            </div>
            <div className="col-md-8">
              <div className="card-body" style={{ zIndex: 200 }}>
                <h5 className="card-text">{description}</h5>
                <h3 className="card-title fw-bold">{title}</h3>
                <Link href='/colleges' className='btn openAddBtn mt-3'>Open <i className="bi bi-chevron-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface Props {
  initialCourses: any[]
  totalItems: number
  promoban: any | null
}

export default function CoursesContainer({ initialCourses, totalItems, promoban }: Props) {
  const [streamcourses, setStreamcourses] = useState(initialCourses)
  const [datasize, setDatasize] = useState(initialCourses.length || 12)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    const newSize = datasize + 8
    setDatasize(newSize)
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/website/stream/general/get?page=1&size=${newSize}`)
      if (res.ok) {
        const json = await res.json()
        setStreamcourses(json?.data ?? [])
      }
    } catch (e) {
      console.error('Failed to load more courses:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white pt-2 pb-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-5">
          {streamcourses.map((course, index) => (
            <CoursesCard key={course.id ?? index} course={course} />
          ))}
        </div>
        {totalItems > streamcourses.length && (
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-3">
              <button className='btn viewMoreBtnCourse' onClick={loadMore} disabled={loading}>
                {loading ? 'Loading...' : 'View More'}
              </button>
            </div>
          </div>
        )}
        {promoban && (
          <PromoAddBanner url={promoban.image} description={promoban.description} title={promoban.title} />
        )}
      </div>
    </section>
  )
}

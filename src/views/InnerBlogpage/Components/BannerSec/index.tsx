import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const BannerSec = ({ data, createdAt }) => {
  return (
    <>
      <section className="newsBannerSec blogBannerSec position-relative">
        {/* Optimized LCP image with next/image */}
        <Image
          src="/images/icons/BannerBG.webp"
          alt="Blog Banner"
          fill
          priority
          fetchPriority="high"
          style={{ objectFit: 'cover', zIndex: -1 }}
        />

        <div className="container d-flex h-100 w-100 justify-content-center flex-column align-content-center text-center position-relative">
          <h1 className="fw-bold text-white mb-3">{data?.name}</h1>
          <h6 className="text-white pt-3 pt-md-0">
            Team Learntech <br className="d-block d-md-none" />
            <span className="px-2 d-none d-md-inline">|</span> {createdAt}
          </h6>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-3 linkFontSize">
          <Link href="/" className="text-black">
            Home <i className="bi bi-chevron-right"></i>
          </Link>
          <Link href="/blogs" className="text-black">
            Blogs <i className="bi bi-chevron-right"></i>
          </Link>{' '}
          <span className="text-blue">{data?.name}</span>
        </div>
      </section>
    </>
  )
}

export default BannerSec

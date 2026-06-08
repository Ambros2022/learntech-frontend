'use client'

import dynamic from 'next/dynamic'
import React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const SectionSkeleton = ({ height = '300px' }: { height?: string }) => (
  <div
    style={{
      minHeight: height,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      borderRadius: 4,
      margin: '4px 0',
    }}
  />
)

const CardGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className='container py-4'>
    <div className='row g-3'>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className='col-6 col-md-3'>
          <div style={{ height: 240, background: '#f0f0f0', borderRadius: 8 }} />
        </div>
      ))}
    </div>
  </div>
)

const FormSkeleton = () => (
  <div style={{ minHeight: 500, background: '#f0f0f0', borderRadius: 4 }} />
)

// ─────────────────────────────────────────────────────────────────────────────
// HOMEPAGE SECTIONS
// All heavy/interactive sections are lazy-loaded with ssr: false to keep
// the critical-path HTML lean and prevent hydration mismatches.
// ─────────────────────────────────────────────────────────────────────────────

export const LazyBannerSection = dynamic(
  () => import('src/views/Homepage/Components/BannerSection'),
  { ssr: false, loading: () => <SectionSkeleton height='520px' /> },
)

export const LazyFeaturedCollegeSection = dynamic(
  () => import('src/views/Homepage/Components/FeaturedCollegeSection'),
  { ssr: false, loading: () => <CardGridSkeleton count={4} /> },
)

export const LazyExploreSection = dynamic(
  () => import('src/views/Homepage/Components/ExploreSection'),
  { ssr: false, loading: () => <SectionSkeleton height='280px' /> },
)

export const LazyStudyAbroadSection = dynamic(
  () => import('src/views/Homepage/Components/StudyAbroadSection'),
  { ssr: false, loading: () => <SectionSkeleton height='280px' /> },
)

export const LazyLatestNewsSection = dynamic(
  () => import('src/views/Homepage/Components/LatestNewsSection'),
  { ssr: false, loading: () => <CardGridSkeleton count={3} /> },
)

export const LazyExpertSection = dynamic(
  () => import('src/views/Homepage/Components/ExpertSection'),
  { ssr: false, loading: () => <SectionSkeleton height='300px' /> },
)

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL POPUPS / FORMS
// ─────────────────────────────────────────────────────────────────────────────

export const LazyGlobalEnquiryForm = dynamic(
  () => import('src/@core/components/popup/GlobalPopupEnquiry'),
  { ssr: false, loading: () => <button className='btn counsellingBtn'>Loading...</button> },
)

export const LazyGlobalEnquiryFormBrochure = dynamic(
  () => import('src/@core/components/popup/GlobalPopupEnquiry'),
  {
    ssr: false,
    loading: () => (
      <a className='DownloadBrchrBtn' style={{ cursor: 'pointer' }}>
        <img
          src='/images/icons/DownloadBrochure.webp'
          width={150}
          height={70}
          alt='download-brochure-icon'
          loading='lazy'
        />
      </a>
    ),
  },
)

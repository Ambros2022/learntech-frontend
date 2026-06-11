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



// ─────────────────────────────────────────────────────────────────────────────
// HOMEPAGE SECTIONS
// All heavy/interactive sections are lazy-loaded with ssr: false to keep
// the critical-path HTML lean and prevent hydration mismatches.
// ─────────────────────────────────────────────────────────────────────────────

export const LazyAnimatedCounter = dynamic(
  () => import('src/views/Homepage/Components/AnimatedCounters/AnimatedCounter'),
  { ssr: false, loading: () => <span>0</span> },
)

export const LazyBannerCarousel = dynamic(
  () => import('src/views/Homepage/Components/BannerSection/BannerCarouselClient'),
  { ssr: false, loading: () => null },
)

export const LazyCollegeCarousel = dynamic(
  () => import('src/components/colleges/CollegeCarouselClient'),
  { ssr: false, loading: () => <CardGridSkeleton count={4} /> },
)

export const LazyExploreSection = dynamic(
  () => import('src/views/Homepage/Components/ExploreSection'),
  { ssr: false, loading: () => <SectionSkeleton height='280px' /> },
)

export const LazyLatestNewsClient = dynamic(
  () => import('src/views/Homepage/Components/LatestNewsSection/LatestNewsClient'),
  { ssr: false, loading: () => <CardGridSkeleton count={3} /> },
)

export const LazyExpertEnquiryForm = dynamic(
  () => import('src/@core/components/popup/ExpertEnquiryForm'),
  { ssr: false, loading: () => <SectionSkeleton height='80px' /> },
)

// ─────────────────────────────────────────────────────────────────────────────
// SHARED FORM COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const PhoneInputSkeleton = () => (
  <div style={{ height: 42, background: '#f0f0f0', borderRadius: 4 }} />
)

export const LazyPhoneInputField = dynamic(
  () => import('src/@core/components/popup/PhoneInput'),
  { ssr: false, loading: () => <PhoneInputSkeleton /> },
)

const FormSkeleton = () => (
  <div style={{ minHeight: 320, background: '#f0f0f0', borderRadius: 4 }} />
)

export const LazySignupForm = dynamic(
  () => import('src/@core/components/custom-user-auth/SignUpFrom'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazySignInForm = dynamic(
  () => import('src/@core/components/custom-user-auth/SignInForm'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyConditionalModal = dynamic(
  () => import('src/@core/layouts/components/Header/ConditionalModal'),
  { ssr: false },
)

const AvatarSkeleton = () => (
  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e0e0e0', margin: '0 8px' }} />
)

export const LazyAvatarDropdown = dynamic(
  () => import('src/@core/components/avatar'),
  { loading: () => <AvatarSkeleton /> },
)

export const LazyWriteReviewPage = dynamic(
  () => import('src/views/WriteReviewPage'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL POPUPS / FORMS
// ─────────────────────────────────────────────────────────────────────────────

export const GlobalEnquiryForm = dynamic(
  () => import('src/@core/components/popup/GlobalPopupEnquiry'),
  { loading: () => <button className='applyNowButton'>Apply Now</button> },
)

export const LazyGlobalEnquiryForm = dynamic(
  () => import('src/@core/components/popup/GlobalPopupEnquiry'),
  { loading: () => <button className='btn counsellingBtn'>Get Counselling</button> },
)

export const LazyGlobalEnquiryFormBrochure = dynamic(
  () => import('src/@core/components/popup/GlobalPopupEnquiry'),
  {
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

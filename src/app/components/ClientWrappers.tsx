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

export const LazyEnquiryForm = dynamic(
  () => import('src/@core/components/popup/form'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyFaqSec = dynamic(
  () => import('src/@core/components/blog-faq/index'),
  { ssr: false, loading: () => <SectionSkeleton height='200px' /> },
)

const SearchBarSkeleton = () => (
  <div
    style={{
      height: 56,
      background: 'rgba(255,255,255,0.92)',
      borderRadius: 4,
    }}
  />
)

export const LazyBlogSearchBar = dynamic(
  () => import('src/components/ui/SearchBar/BlogSearchBar'),
  { ssr: false, loading: () => <SearchBarSkeleton /> },
)

export const LazyBoardSearchBar = dynamic(
  () => import('src/components/ui/SearchBar/BoardSearchBar'),
  { ssr: false, loading: () => <SearchBarSkeleton /> },
)

export const LazyGlobalPopupShare = dynamic(
  () => import('src/@core/components/popup/GlobalPopupShare'),
  { ssr: false, loading: () => null },
)

export const LazyBoardFaqSec = dynamic(
  () => import('src/@core/components/cutom-faq/index'),
  { ssr: false, loading: () => <SectionSkeleton height='200px' /> },
)

export const LazySchoolsCarousel = dynamic(
  () => import('src/components/schools/SchoolsCarouselClient'),
  { ssr: false, loading: () => <CardGridSkeleton count={4} /> },
)

export const LazyReviewSec = dynamic(
  () => import('src/views/InnerBoardPage/Components/ReviewSec'),
  { ssr: false, loading: () => <SectionSkeleton height='400px' /> },
)

export const LazyContactUsForm = dynamic(
  () => import('src/@core/components/popup/ContactUsForm'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyContactForm404 = dynamic(
  () => import('src/views/Error404Page/Components/BannerSec/ContactForm404'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyEditorEnquiryForm = dynamic(
  () => import('src/@core/components/popup/Editor/Editorform'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyAbroadEnquiryForm = dynamic(
  () => import('src/@core/components/popup/AbroadEnquiryForm'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyContactPageUsForm = dynamic(
  () => import('src/@core/components/popup/ContactPageUsForm'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyEducationLoanForm = dynamic(
  () => import('src/@core/components/popup/EducationloanForm'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyEnquiryFormMed = dynamic(
  () => import('src/@core/components/popup/EnquiryFormMed'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyJobEnquiryForm = dynamic(
  () => import('src/@core/components/popup/JobEnquiryForm'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyTalkExpertEnquiry = dynamic(
  () => import('src/@core/components/popup/TalkExpertEnqiiry'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyTalkExpertEnquirySchool = dynamic(
  () => import('src/@core/components/popup/TalkExpertEnqiirySchool'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyExpertEnquiryFormSchool = dynamic(
  () => import('src/@core/components/popup/ExpertEnquiryFormSchool'),
  { ssr: false, loading: () => <SectionSkeleton height="80px" /> },
)

export const LazyNewsLetterEnquiry = dynamic(
  () => import('src/@core/components/popup/NewsLetterEnquiry'),
  { ssr: false, loading: () => <SectionSkeleton height="80px" /> },
)

export const LazyContactForm = dynamic(
  () => import('src/@core/components/popup/ContactForm'),
  { ssr: false, loading: () => (
    <div className="bg-skyBlue px-lg-5 px-3 rounded">
      <div style={{ height: 36, background: '#d0d8e8', borderRadius: 4, margin: '16px 0 12px' }} />
      <FormSkeleton />
    </div>
  )},
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

// ─────────────────────────────────────────────────────────────────────────────
// EMBLA CAROUSELS
// ─────────────────────────────────────────────────────────────────────────────

export const LazyEmblaCarousel = dynamic(
  () => import('src/components/ui/Embla/EmblaCarousel'),
  { ssr: false, loading: () => <SectionSkeleton height='240px' /> },
)

export const LazyEmblaTabCarousel = dynamic(
  () => import('src/components/ui/Embla/EmblaTabCarousel'),
  { ssr: false, loading: () => <SectionSkeleton height='240px' /> },
)

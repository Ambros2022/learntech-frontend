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

export const LazyCollegeSearchBar = dynamic(
  () => import('src/components/ui/SearchBar/CollegeSearchBar'),
  { ssr: false, loading: () => <SearchBarSkeleton /> },
)

export const LazyUniversitySearchBar = dynamic(
  () => import('src/components/ui/SearchBar/UniversitySearchBar'),
  { ssr: false, loading: () => <SearchBarSkeleton /> },
)

export const LazyUniversityCarousel = dynamic(
  () => import('src/components/universities/UniversityCarouselClient'),
  { ssr: false, loading: () => <CardGridSkeleton count={4} /> },
)

export const LazyAbroadCarousel = dynamic(
  () => import('src/components/colleges/AbroadCarouselClient'),
  { ssr: false, loading: () => <CardGridSkeleton count={4} /> },
)

export const LazyAbroadSearchBar = dynamic(
  () => import('src/components/ui/SearchBar/AbroadSearchBar'),
  { ssr: false },
)

export const LazyBlogCarousel = dynamic(
  () => import('src/components/blogs/BlogCarouselClient'),
  { ssr: false, loading: () => <CardGridSkeleton count={4} /> },
)

export const LazySchoolSearchBar = dynamic(
  () => import('src/components/ui/SearchBar/SchoolSearchBar'),
  { ssr: false, loading: () => <SearchBarSkeleton /> },
)

export const LazyCourseSearchBar = dynamic(
  () => import('src/components/ui/SearchBar/CourseSearchBar'),
  { ssr: false, loading: () => <SearchBarSkeleton /> },
)

export const LazyNewsSearchBar = dynamic(
  () => import('src/components/ui/SearchBar/NewsSearchBar'),
  { ssr: false, loading: () => <SearchBarSkeleton /> },
)

export const LazyScholarshipSearchBar = dynamic(
  () => import('src/components/ui/SearchBar/ScholarshipSearchBar'),
  { ssr: false, loading: () => <SearchBarSkeleton /> },
)

export const LazyExamSearchBar = dynamic(
  () => import('src/components/ui/SearchBar/ExamSearchBar'),
  { ssr: false, loading: () => <SearchBarSkeleton /> },
)

export const LazyTrendingNewsCarousel = dynamic<any>(
  () => import('../../views/MainNewsPage/Components/TopTrendingNewsSec/TrendingNewsCarouselClient'),
  { ssr: false, loading: () => <CardGridSkeleton count={4} /> },
)

export const LazyOtherCoursesCarousel = dynamic(
  () => import('src/views/InnerCoursePage/Components/OtherCourses/OtherCoursesCarouselClient'),
  { ssr: false, loading: () => <CardGridSkeleton count={5} /> },
)

export const LazyTestimonialCarousel = dynamic(
  () => import('src/views/InnerCoursePage/Components/TestimonialSec/TestimonialCarouselClient'),
  { ssr: false, loading: () => <SectionSkeleton height='280px' /> },
)

export const LazyExpertTraineeClient = dynamic(
  () => import('src/views/AbroadPage/Components/ExpertTrainneSec/ExpertTraineeClient'),
  { ssr: false, loading: () => <SectionSkeleton height='300px' /> },
)

export const LazyPopularCoursesCarousel = dynamic(
  () => import('src/views/SubInnerCoursePage/Components/PopularCourses/PopularCoursesCarouselClient'),
  { ssr: false, loading: () => <CardGridSkeleton count={6} /> },
)

export const LazySubCourseTestimonialCarousel = dynamic(
  () => import('src/views/SubInnerCoursePage/Components/TestimonialSec/SubCourseTestimonialCarouselClient'),
  { ssr: false, loading: () => <SectionSkeleton height='280px' /> },
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

export const LazySideContactUsForm = dynamic(
  () => import('src/@core/components/popup/SideContactUsForm'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyTalkToExpertsSection = dynamic(
  () => import('src/app/components/TalkToExpertsSection'),
  { loading: () => <FormSkeleton /> },
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

export const LazyWriteReviewForm = dynamic(
  () => import('src/views/WriteReviewPage/Components/DetailsFillSec'),
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

// ─────────────────────────────────────────────────────────────────────────────
// MBBS ABROAD PAGE SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const LazyMedicalSec = dynamic(
  () => import('src/views/MbbsAbroadPage/Components/MedicalSec'),
  { ssr: false, loading: () => <FormSkeleton /> },
)

export const LazyTopCountrySec = dynamic(
  () => import('src/views/MbbsAbroadPage/Components/TopCountrySec'),
  { ssr: false, loading: () => <SectionSkeleton height='400px' /> },
)

// ─────────────────────────────────────────────────────────────────────────────
// NRI QUOTA PAGE SPECIFIC SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const LazyNriQuotaBannerEnquiry = dynamic(
  () => import('src/@core/components/popup/GlobalPopupEnquiry'),
  { ssr: false, loading: () => <button className="btn btn-success">Apply Now</button> },
)

export const LazyExpertEnquiryPopup = dynamic(
  () => import('src/@core/components/popup/GlobalPopupEnquiry'),
  { ssr: false, loading: () => <button className="btn reqBtn">Request a Call Back</button> },
)

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT US PAGE SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const LazyBranchesMapClient = dynamic(
  () => import('src/views/ContactUsPage/BranchesSec/BranchesMapClient'),
  { ssr: false, loading: () => <SectionSkeleton height='420px' /> },
)

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION LOAN PAGE SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const LazyLoanCalculator = dynamic(
  () => import('src/views/EducationLoanPage/Components/LoanCalculator'),
  { ssr: false, loading: () => <SectionSkeleton height='400px' /> },
)

// ─────────────────────────────────────────────────────────────────────────────
// INNER EXAM PAGE SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const LazyExamAlertButton = dynamic(
  () => import('src/views/InnerExamPage/Components/BannerSec/ExamAlertButton'),
  { ssr: false, loading: () => <button className="btn alertExamBtn">Get Alert</button> },
)

export const LazyNewsLinkCarouselClient = dynamic(
  () => import('src/views/InnerExamPage/Components/NewsLinkSection/NewsLinkCarouselClient'),
  { ssr: false, loading: () => <div style={{ height: 88 }} /> },
)

export const LazyUpcomingExams = dynamic(
  () => import('src/views/MainExamPage/Components/UpcomingExamsSec'),
  { ssr: false, loading: () => <p>Loading…</p> },
)

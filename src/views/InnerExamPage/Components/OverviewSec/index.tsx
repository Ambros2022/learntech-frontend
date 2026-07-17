import Image from 'next/image'
import Link from 'next/link'
import OverviewTabsClient, { type ExamTabItem } from './OverviewTabsClient'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

// ── helpers ────────────────────────────────────────────────────────────────

function isValidContent(content: unknown): content is string {
  if (!content || typeof content !== 'string') return false
  const t = content.trim()
  return t !== '' && t !== 'null' && t !== '<p>null</p>' && t !== '<p><br></p>'
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  const day = date.getDate()
  const suffix = (n: number) => {
    if (n >= 11 && n <= 13) return 'th'
    switch (n % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }
  const opts: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' }
  const [month, year] = date.toLocaleDateString('en-US', opts).split(' ')
  return `${day}${suffix(day)} ${month} ${year}`
}

// ── component ──────────────────────────────────────────────────────────────

interface UpcomingExam {
  id: number
  slug: string
  title: string
  upcoming_date: string // ISO string
}

interface Props {
  data: any
  promoBanners: any[]
  upcomingExams: UpcomingExam[]
}

// Server Component — no 'use client'.
// Heavy interactive parts (tab carousel, forms) are isolated in OverviewTabsClient.
export default function OverviewSec({ data, promoBanners, upcomingExams }: Props) {
  // Build serialisable tab items — no JSX, no Date objects
  const rawTabs = [
    { id: 'info',           label: 'OVERVIEW',                   content: data?.overview               ?? null },
    { id: 'exams',          label: 'EXAM DATES',                 content: data?.exam_dates             ?? null },
    { id: 'eligibility',    label: 'ELIGIBILITY & REGISTRATION', content: data?.eligibility_criteria   ?? null },
    { id: 'admitcard',      label: 'ADMIT CARD',                 content: data?.admit_card             ?? null },
    { id: 'examcenters',    label: 'EXAM CENTRES',               content: data?.exam_centers           ?? null },
    { id: 'syllabus',       label: 'EXAM PATTERN & SYLLABUS',    content: data?.syllabus               ?? null },
    { id: 'results',        label: 'RESULT',                     content: data?.results                ?? null },
    { id: 'cutoff',         label: 'CUTOFF',                     content: data?.cutoff                 ?? null },
    { id: 'counseling',     label: 'COUNSELLING',                content: data?.counseling             ?? null },
    { id: 'prepretiontips', label: 'PREPARATION TIPS',           content: data?.prepretion_tips        ?? null },
    { id: 'acceptcolleges', label: 'ACCEPTING COLLEGES',         content: data?.accept_colleges        ?? null },
  ].filter((tab) => isValidContent(tab.content))

  const hasFaq = Array.isArray(data?.examfaqs) && data.examfaqs.length > 0
  const items = hasFaq
    ? [
        ...rawTabs,
        {
          id: 'faq',
          label: 'FAQ',
          content: null,
          isFaq: true,
          faqData: data.examfaqs as { questions: string; answers: string }[],
        },
      ]
    : rawTabs

  // Pre-format dates server-side so OverviewTabsClient receives plain strings
  const formattedExams = upcomingExams.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    date: formatDate(e.upcoming_date),
  }))

  return (
    <section className='clgInfoSec bg-white'>
      <div className="container pt-4">
        {/* Client boundary — only tab switching + form are interactive */}
        <OverviewTabsClient items={items} upcomingExams={formattedExams} />

        {/* Promo banners — fully server-rendered HTML */}
        {promoBanners.map((ele, index) => (
          <section key={index} className='bg-skyBlue addBanner rounded'>
            <div className="container py-5">
              <div className="card col-md-12 col-lg-9 col-xl-10 mx-auto p-0">
                <div className="row g-0">
                  <div className="col-md-4 addImgClg position-relative">
                    <Image
                      src={`${IMG_BASE}/${ele.banner_url}`}
                      width={200}
                      height={200}
                      className="img-fluid rounded-start"
                      alt="Promotional banner"
                      loading="lazy"
                    />
                    <h2
                      className='position-absolute text-white'
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderRadius: '10px',
                        padding: '10px',
                        zIndex: 3000,
                        top: '50%',
                        left: '50%',
                        color: 'white',
                      }}
                    >
                      Ad
                    </h2>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body" style={{ zIndex: 200 }}>
                      <h5 className="card-text">PES University</h5>
                      <h3 className="card-title fw-bold">B.Tech 2025 - Admissions Open</h3>
                      <Link href='/colleges' className='btn openAddBtn'>
                        Open <i className="bi bi-chevron-right" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

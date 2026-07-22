'use client'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LazyGlobalEnquiryForm,
  LazyConditionalModal as ConditionalModal,
  LazyAvatarDropdown as AvatarDropdown,
} from 'src/app/components/ClientWrappers'
import styles from './nav.module.css'

const Statedropdown = dynamic(() => import('./state-dropdown'), { ssr: false })
const Coursedropdown = dynamic(() => import('./course-dropdown'), { ssr: false })
const Examdropdown = dynamic(() => import('./exam-dropdown'), { ssr: false })
const Abroaddropdown = dynamic(() => import('./abroad-dropdown'), { ssr: false })

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavState { id: number; name: string; city?: any[] }
interface NavCourse { id: number; slug: string; name?: string }
interface ExamStream { id: number; slug: string; exam_title: string }
interface NavExam { id: number; name: string; examstr: { id: number; examstreams: ExamStream }[] }
interface NavCountry { id: number; name?: string; slug: string; country?: { name: string }; backgroundimage?: string }
interface NavNews { id: number; slug: string; banner_image: string; meta_description: string }

export interface HeaderProps {
  states?: NavState[]
  courses?: NavCourse[]
  exams?: NavExam[]
  countries?: NavCountry[]
  news?: NavNews[]
}

type DropdownKey = 'universities' | 'colleges' | 'courses' | 'exams' | 'abroad' | 'news'

// ─── Static data (module-level — not re-created on each render) ───────────────
const MORE_LINKS: [string, string][] = [
  ['/about-us', 'About Us'],
  ['/our-team', 'Our Team'],
  ['/services', 'Services'],
  ['/blogs', 'Blogs'],
  ['/boards', 'Boards'],
  ['/schools', 'Schools'],
  ['/nri-quota', 'NRI Quota'],
  ['/scholarships', 'Scholarships'],
  ['/mbbs-abroad', 'MBBS Abroad'],
  ['/meds', 'Medical Edu Studio'],
  ['/education-loan', 'Education Loan'],
]

// ─────────────────────────────────────────────────────────────────────────────

export default function NavClient({ states = [], courses = [], exams = [], countries = [], news = [] }: HeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null)
  const [showModal, setShowModal] = useState(false)

  const openDrop = (key: DropdownKey) => setActiveDropdown(key)
  const closeDrop = () => setActiveDropdown(null)
  const toggleDrop = (key: DropdownKey) => setActiveDropdown(prev => prev === key ? null : key)
  const closeAll = () => { setActiveDropdown(null); setMobileOpen(false) }

  const isActive = (href: string) => pathname === href
  const isOpen = (key: DropdownKey) => activeDropdown === key

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-white' style={{ zIndex: 100 }}>

        <Link className={`navbar-brand ${styles.hlogo}`} href='/'>
          <div className='ps-md-5 ps-0' style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Image
              src='/images/Learntech160.webp'
              alt='learntech-logo'
              priority
              fetchPriority='high'
              width={160}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setMobileOpen(prev => !prev)}
          aria-controls='navbarSupportedContent'
          aria-expanded={mobileOpen}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div
          className={`collapse navbar-collapse ${styles.collapseNav}${mobileOpen ? ' show' : ''}`}
          id='navbarSupportedContent'
        >
          {/* Mobile guest panel */}
          <div className='d-lg-none text-center py-3'>
            <div style={{ width: 60, height: 60, backgroundColor: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
              <i className='bi bi-person' style={{ fontSize: 30 }} aria-hidden='true' />
            </div>
            <p>Welcome Guest!</p>
            <div className='d-flex justify-content-center gap-2'>
              <button className='submitBtn btn-xl btn-block applyNowButton btn' onClick={() => setShowModal(true)} style={{ fontSize: 14 }}>WRITE A REVIEW</button>
              <button className='submitBtn btn-xl btn-block applyNowButton btn' onClick={() => setShowModal(true)} style={{ fontSize: 14 }}>LOGIN / REGISTER</button>
            </div>
          </div>

          <span className={`${styles.topNav} ps-5`}>
            <ul className='navbar-nav ps-0 ps-md-5'>

              <li className='nav-item'>
                <Link className={`nav-link${isActive('/') ? ' active' : ''}`} href='/' onClick={closeAll} aria-current='page'>Home</Link>
              </li>

              {/* Universities */}
              <li className={`nav-item dropdown ${styles.maintain}`} onMouseEnter={() => openDrop('universities')} onMouseLeave={closeDrop} onClick={() => toggleDrop('universities')}>
                <Link className={`nav-link dropdown-toggle ${styles.noArrow}${isActive('/universities') ? ' active' : ''}`} href='/universities' role='button' aria-expanded={isOpen('universities')} onClick={() => setMobileOpen(false)}>Universities</Link>
                <span className={`${styles.dropdownIcon} d-md-none${isOpen('universities') ? ` ${styles.rotate}` : ''}`} onClick={e => { e.stopPropagation(); toggleDrop('universities') }}>&gt;</span>
                <div className={`dropdown-menu ${styles.customDropdown}${isOpen('universities') ? ' show' : ''}`}>
                  {isOpen('universities') && <Statedropdown states={states} type='Colleges' onClose={closeAll} />}
                </div>
              </li>

              {/* Colleges */}
              <li className={`nav-item dropdown ${styles.maintain}`} onMouseEnter={() => openDrop('colleges')} onMouseLeave={closeDrop} onClick={() => toggleDrop('colleges')}>
                <Link className={`nav-link dropdown-toggle ${styles.noArrow}${isActive('/colleges') ? ' active' : ''}`} href='/colleges' role='button' aria-expanded={isOpen('colleges')} onClick={() => setMobileOpen(false)}>Colleges</Link>
                <span className={`${styles.dropdownIcon} d-md-none${isOpen('colleges') ? ` ${styles.rotate}` : ''}`} onClick={e => { e.stopPropagation(); toggleDrop('colleges') }}>&gt;</span>
                <div className={`dropdown-menu ${styles.customDropdown}${isOpen('colleges') ? ' show' : ''}`}>
                  {isOpen('colleges') && <Statedropdown states={states} type='Colleges' onClose={closeAll} />}
                </div>
              </li>

              {/* Courses */}
              <li className={`nav-item dropdown ${styles.maintain}`} onMouseEnter={() => openDrop('courses')} onMouseLeave={closeDrop} onClick={() => toggleDrop('courses')}>
                <Link className={`nav-link dropdown-toggle ${styles.noArrow}${isActive('/courses') ? ' active' : ''}`} href='/courses' role='button' aria-expanded={isOpen('courses')} onClick={() => setMobileOpen(false)}>Courses</Link>
                <span className={`${styles.dropdownIcon} d-md-none${isOpen('courses') ? ` ${styles.rotate}` : ''}`} onClick={e => { e.stopPropagation(); toggleDrop('courses') }}>&gt;</span>
                <div className={`dropdown-menu ${styles.customDropdown}${isOpen('courses') ? ' show' : ''}`}>
                  {isOpen('courses') && <Coursedropdown states={courses} type='Colleges' onClose={closeAll} />}
                </div>
              </li>

              {/* Exams */}
              <li className={`nav-item dropdown ${styles.maintain}`} onMouseEnter={() => openDrop('exams')} onMouseLeave={closeDrop} onClick={() => toggleDrop('exams')}>
                <Link className={`nav-link dropdown-toggle ${styles.noArrow}${isActive('/exams') ? ' active' : ''}`} href='/exams' role='button' aria-expanded={isOpen('exams')} onClick={() => setMobileOpen(false)}>Exams</Link>
                <span className={`${styles.dropdownIcon} d-md-none${isOpen('exams') ? ` ${styles.rotate}` : ''}`} onClick={e => { e.stopPropagation(); toggleDrop('exams') }}>&gt;</span>
                <div className={`dropdown-menu ${styles.customDropdown}${isOpen('exams') ? ' show' : ''}`}>
                  {isOpen('exams') && <Examdropdown states={exams} type='Colleges' onClose={closeAll} />}
                </div>
              </li>

              {/* Study Abroad */}
              <li className={`nav-item dropdown ${styles.maintain}`} onMouseEnter={() => openDrop('abroad')} onMouseLeave={closeDrop} onClick={() => toggleDrop('abroad')}>
                <a className={`nav-link dropdown-toggle ${styles.noArrow}`} role='button' aria-expanded={isOpen('abroad')} onClick={() => setMobileOpen(false)}>Study Abroad</a>
                <span className={`${styles.dropdownIcon} d-md-none${isOpen('abroad') ? ` ${styles.rotate}` : ''}`} onClick={e => { e.stopPropagation(); toggleDrop('abroad') }}>&gt;</span>
                <div className={`dropdown-menu ${styles.customDropdown}${isOpen('abroad') ? ' show' : ''}`}>
                  {isOpen('abroad') && <Abroaddropdown states={countries} type='Colleges' onClose={closeAll} />}
                </div>
              </li>

              {/* Latest News */}
              <li className={`nav-item dropdown ${styles.latestStatic} ${styles.maintain}`} onMouseEnter={() => openDrop('news')} onMouseLeave={closeDrop} onClick={() => toggleDrop('news')}>
                <Link className={`nav-link dropdown-toggle ${styles.noArrow}${isActive('/news') ? ` ${styles.activeDrpDwn}` : ''}`} href='/news' role='button' aria-expanded={isOpen('news')} onClick={() => setMobileOpen(false)}>Latest News</Link>
                <span className={`${styles.dropdownIcon} d-md-none${isOpen('news') ? ` ${styles.rotate}` : ''}`} onClick={e => { e.stopPropagation(); toggleDrop('news') }}>&gt;</span>
                {isOpen('news') && (
                  <div className='container-fluid'>
                    <ul className={`newsDrpDwn ${styles.newsHide} dropdown-menu`} style={{ textAlign: 'center', left: 0, right: 0, width: '80%', margin: '0 auto' }}>
                      <div className='dropdown-row-news dropdown-row p-2'>
                        <div className='row'>
                          {news.slice(0, 4).map(item => (
                            <li key={item.id} className='news-item mb-1 col-md-3'>
                              <Link href={`/news/${item.id}/${item.slug}`} onClick={closeAll}>
                                <div className='card-news hover-card bg-skyBlue card'>
                                  <div className={styles.cardImgNewsHeight}>
                                    <img
                                      height={200} width={200}
                                      src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`}
                                      className='card-img-top'
                                      alt={item.meta_description?.slice(0, 60) || 'news'}
                                      loading='lazy'
                                      decoding='async'
                                    />
                                  </div>
                                  <div className='card-body'>
                                    <p className='card-text'>{item.meta_description}</p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </div>
                      </div>
                    </ul>
                  </div>
                )}
              </li>

              {/* More (desktop) */}
              <li className='nav-item dropdown d-lg-inline-block d-none'>
                <Link className='nav-link dropdown-toggle' href='/' role='button' aria-expanded={false} onClick={() => setMobileOpen(false)}>More</Link>
                <ul className='dropdown-menu another-item'>
                  {MORE_LINKS.map(([href, label]) => (
                    <li key={href} className='nav-items-select'>
                      <Link className='d-flex justify-content-between dropdown-item' href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className={styles.navAvt}>
                <AvatarDropdown openModal={() => setShowModal(true)} />
              </li>

              <li className={`hideBtnTxt ${styles.navCons}`}>
                <LazyGlobalEnquiryForm buttonText='Get Counselling' className='btn counsellingBtn' />
              </li>

              {/* Mobile-only extra links */}
              {MORE_LINKS.map(([href, label]) => (
                <li key={`m-${href}`} className='nav-item dropdown d-lg-none d-md-inline-block'>
                  <Link className={`nav-link${isActive(href) ? ' active' : ''}`} href={href} onClick={closeAll}>{label}</Link>
                </li>
              ))}

            </ul>
          </span>
        </div>
      </nav>

      {showModal && <ConditionalModal showModal={showModal} closeModal={() => setShowModal(false)} />}
    </>
  )
}

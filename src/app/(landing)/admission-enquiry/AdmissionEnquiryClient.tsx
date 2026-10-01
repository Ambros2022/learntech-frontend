'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import { submitEnquiry } from 'src/@core/components/popup/formUtils'
import styles from './AdmissionEnquiry.module.css'

interface CountryData {
  iso: string
  name: string
  dial: string
}

const RAW_COUNTRIES: [string, string, string][] = [
  ['AF', 'Afghanistan', '93'], ['DZ', 'Algeria', '213'], ['AR', 'Argentina', '54'], ['AM', 'Armenia', '374'],
  ['AU', 'Australia', '61'], ['AT', 'Austria', '43'], ['AZ', 'Azerbaijan', '994'], ['BH', 'Bahrain', '973'],
  ['BD', 'Bangladesh', '880'], ['BE', 'Belgium', '32'], ['BT', 'Bhutan', '975'], ['BW', 'Botswana', '267'],
  ['BR', 'Brazil', '55'], ['BG', 'Bulgaria', '359'], ['KH', 'Cambodia', '855'], ['CA', 'Canada', '1'],
  ['CL', 'Chile', '56'], ['CN', 'China', '86'], ['CO', 'Colombia', '57'], ['HR', 'Croatia', '385'],
  ['CY', 'Cyprus', '357'], ['CZ', 'Czech Republic', '420'], ['DK', 'Denmark', '45'], ['EG', 'Egypt', '20'],
  ['EE', 'Estonia', '372'], ['ET', 'Ethiopia', '251'], ['FJ', 'Fiji', '679'], ['FI', 'Finland', '358'],
  ['FR', 'France', '33'], ['GE', 'Georgia', '995'], ['DE', 'Germany', '49'], ['GH', 'Ghana', '233'],
  ['GR', 'Greece', '30'], ['HK', 'Hong Kong', '852'], ['HU', 'Hungary', '36'], ['IS', 'Iceland', '354'],
  ['IN', 'India', '91'], ['ID', 'Indonesia', '62'], ['IR', 'Iran', '98'], ['IQ', 'Iraq', '964'],
  ['IE', 'Ireland', '353'], ['IL', 'Israel', '972'], ['IT', 'Italy', '39'], ['JP', 'Japan', '81'],
  ['JO', 'Jordan', '962'], ['KZ', 'Kazakhstan', '7'], ['KE', 'Kenya', '254'], ['KW', 'Kuwait', '965'],
  ['KG', 'Kyrgyzstan', '996'], ['LA', 'Laos', '856'], ['LV', 'Latvia', '371'], ['LB', 'Lebanon', '961'],
  ['LT', 'Lithuania', '370'], ['LU', 'Luxembourg', '352'], ['MY', 'Malaysia', '60'], ['MV', 'Maldives', '960'],
  ['MT', 'Malta', '356'], ['MU', 'Mauritius', '230'], ['MX', 'Mexico', '52'], ['MN', 'Mongolia', '976'],
  ['MA', 'Morocco', '212'], ['MZ', 'Mozambique', '258'], ['MM', 'Myanmar', '95'], ['NA', 'Namibia', '264'],
  ['NP', 'Nepal', '977'], ['NL', 'Netherlands', '31'], ['NZ', 'New Zealand', '64'], ['NG', 'Nigeria', '234'],
  ['NO', 'Norway', '47'], ['OM', 'Oman', '968'], ['PK', 'Pakistan', '92'], ['PE', 'Peru', '51'],
  ['PH', 'Philippines', '63'], ['PL', 'Poland', '48'], ['PT', 'Portugal', '351'], ['QA', 'Qatar', '974'],
  ['RO', 'Romania', '40'], ['RU', 'Russia', '7'], ['RW', 'Rwanda', '250'], ['SA', 'Saudi Arabia', '966'],
  ['RS', 'Serbia', '381'], ['SG', 'Singapore', '65'], ['SK', 'Slovakia', '421'], ['SI', 'Slovenia', '386'],
  ['ZA', 'South Africa', '27'], ['KR', 'South Korea', '82'], ['ES', 'Spain', '34'], ['LK', 'Sri Lanka', '94'],
  ['SE', 'Sweden', '46'], ['CH', 'Switzerland', '41'], ['TW', 'Taiwan', '886'], ['TZ', 'Tanzania', '255'],
  ['TH', 'Thailand', '66'], ['TN', 'Tunisia', '216'], ['TR', 'Turkey', '90'], ['UG', 'Uganda', '256'],
  ['UA', 'Ukraine', '380'], ['AE', 'United Arab Emirates', '971'], ['GB', 'United Kingdom', '44'],
  ['US', 'United States', '1'], ['UZ', 'Uzbekistan', '998'], ['VN', 'Vietnam', '84'], ['YE', 'Yemen', '967'],
  ['ZM', 'Zambia', '260'], ['ZW', 'Zimbabwe', '263']
]

const ALL_COUNTRIES: CountryData[] = RAW_COUNTRIES.map(([iso, name, dial]) => ({ iso, name, dial }))
const INDIA_DATA = ALL_COUNTRIES.find(c => c.iso === 'IN') || { iso: 'IN', name: 'India', dial: '91' }
const SORTED_COUNTRIES: CountryData[] = [
  INDIA_DATA,
  ...ALL_COUNTRIES.filter(c => c.iso !== 'IN').sort((a, b) => a.name.localeCompare(b.name))
]

const STATES = [
  { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
  { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
  { value: 'Andaman and Nicoba', label: 'Andaman and Nicobar' },
  { value: 'assam', label: 'Assam' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'Chandigarh', label: 'Chandigarh' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Dadra and Nagar Haveli', label: 'Dadra and Nagar Haveli' },
  { value: 'Daman and Diu', label: 'Daman and Diu' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'goa', label: 'Goa' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
  { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
  { value: 'jharkhand', label: 'Jharkhand' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'Lakshadweep', label: 'Lakshadweep' },
  { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'manipur', label: 'Manipur' },
  { value: 'meghalaya', label: 'Meghalaya' },
  { value: 'mizoram', label: 'Mizoram' },
  { value: 'nagaland', label: 'Nagaland' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'Puducherry', label: 'Puducherry' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'sikkim', label: 'Sikkim' },
  { value: 'tamil-nadu', label: 'Tamil Nadu' },
  { value: 'tripura', label: 'Tripura' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
  { value: 'west-bengal', label: 'West Bengal' },
]

export default function AdmissionEnquiryClient() {
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement>(null)
  const phoneFieldRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Spotlight mouse effect
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    panelRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    panelRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  // Country dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(INDIA_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCountryIndex, setActiveCountryIndex] = useState(0)

  // Form inputs state
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [state, setState] = useState('')
  const [college, setCollege] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Stats counters state
  const [counts, setCounts] = useState({
    guided: '1,00,000+',
    colleges: '1,000+',
    experience: '30+ years',
    since: 'Since 1994'
  })

  // Count-up animation
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const timer = setTimeout(() => {
      const startTime = performance.now()
      const duration = 1900

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 4)

        const guidedVal = Math.round(0 + 100000 * ease)
        const collegesVal = Math.round(0 + 1000 * ease)
        const expVal = Math.round(0 + 30 * ease)
        const sinceVal = Math.round(1900 + (1994 - 1900) * ease)

        setCounts({
          guided: `${guidedVal.toLocaleString('en-IN')}+`,
          colleges: `${collegesVal.toLocaleString('en-IN')}+`,
          experience: `${expVal}+ years`,
          since: `Since ${sinceVal}`
        })

        if (progress < 1) {
          requestAnimationFrame(tick)
        }
      }

      requestAnimationFrame(tick)
    }, 750)

    return () => clearTimeout(timer)
  }, [])

  // Filtered countries
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase().replace(/^\+/, '')
    if (!q) return SORTED_COUNTRIES
    return SORTED_COUNTRIES.filter(
      c => c.name.toLowerCase().includes(q) || c.dial.startsWith(q) || c.iso.toLowerCase() === q
    )
  }, [searchQuery])

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (phoneFieldRef.current && !phoneFieldRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDropdownOpen])

  // Focus search when dropdown opens
  useEffect(() => {
    if (isDropdownOpen) {
      setSearchQuery('')
      setActiveCountryIndex(0)
      requestAnimationFrame(() => {
        searchInputRef.current?.focus()
      })
    }
  }, [isDropdownOpen])

  const selectCountry = useCallback((c: CountryData) => {
    setSelectedCountry(c)
    setIsDropdownOpen(false)
    setErrors(prev => ({ ...prev, phone: '' }))
  }, [])

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveCountryIndex(prev => Math.min(prev + 1, filteredCountries.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveCountryIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCountries[activeCountryIndex]) {
        selectCountry(filteredCountries[activeCountryIndex])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsDropdownOpen(false)
    }
  }

  // Scroll active country item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[activeCountryIndex] as HTMLElement
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [activeCountryIndex])

  // Handle phone input formatting (digits and hyphens only)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/[^\d\s\-]/g, '')
    setPhone(sanitized)
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  // Validate form
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required'
    }

    const cleanPhone = phone.replace(/\D/g, '')
    if (!cleanPhone) {
      newErrors.phone = 'Mobile / WhatsApp number is required'
    } else if (selectedCountry.iso === 'IN' && cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number'
    } else if (cleanPhone.length < 6 || cleanPhone.length > 15) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!course.trim()) {
      newErrors.course = 'Please enter the course you are looking for'
    }

    if (!state.trim()) {
      newErrors.state = 'Please select your state'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fill in all required fields.')
      return
    }

    try {
      setIsSubmitting(true)
      toast.loading('Processing...', { id: 'enquiry-toast' })

      const fullContactNumber = `+${selectedCountry.dial}-${phone.trim()}`
      const ok = await submitEnquiry({
        name: fullName.trim(),
        email: email.trim(),
        contact_number: fullContactNumber,
        location: state.trim(),
        course_in_mind: course.trim(),
        college_name: college.trim(),
        description: message.trim(),
      })

      toast.dismiss('enquiry-toast')
      if (ok) {
        toast.success('Thank you. We will get back to you.')
        setFullName('')
        setPhone('')
        setEmail('')
        setCourse('')
        setState('')
        setCollege('')
        setMessage('')
        setErrors({})
        router.push('/thank-you')
      } else {
        toast.error('Try again later!')
      }
    } catch {
      toast.dismiss('enquiry-toast')
      toast.error('Try again later!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.cardContainer}>
        {/* LEFT PANEL */}
        <div
          ref={panelRef}
          className={styles.leftPanel}
          id="leftPanel"
          onPointerMove={handlePointerMove}
        >
          <div className={styles.spotlight} />

          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Admissions ongoing
          </div>

          <h1 className={styles.headline}>
            <span className={styles.hlGrad}>Colleges Across</span>
            {' '}India &amp; Abroad.{' '}
            <span className={styles.hlGrad}>One Right Choice</span>
            {' '}for You.
          </h1>

          <p className={styles.subtext}>
            Choosing the right college can be overwhelming. Learntech Edu Solutions helps students and parents explore
            suitable courses and colleges across Karnataka, India and abroad, compare options and get personalized admission
            guidance at no cost.
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statItem} style={{ '--i': 0 } as React.CSSProperties}>
              <i className={`fa-solid fa-user-graduate ${styles.statIcon}`} aria-hidden="true" />
              <h3>{counts.guided}</h3>
              <p>Students guided</p>
            </div>
            <div className={styles.statItem} style={{ '--i': 1 } as React.CSSProperties}>
              <i className={`fa-solid fa-building-columns ${styles.statIcon}`} aria-hidden="true" />
              <h3>{counts.colleges}</h3>
              <p>Partner colleges &amp; universities</p>
            </div>
            <div className={styles.statItem} style={{ '--i': 2 } as React.CSSProperties}>
              <i className={`fa-solid fa-medal ${styles.statIcon}`} aria-hidden="true" />
              <h3>{counts.experience}</h3>
              <p>Experience</p>
            </div>
            <div className={styles.statItem} style={{ '--i': 3 } as React.CSSProperties}>
              <i className={`fa-solid fa-calendar-check ${styles.statIcon}`} aria-hidden="true" />
              <h3>{counts.since}</h3>
              <p>In Education</p>
            </div>
          </div>

          <div className={styles.howWeHelp}>
            <h4>How We Help</h4>
            <ul className={styles.helpList}>
              <li className={styles.helpListItem} style={{ '--i': 0 } as React.CSSProperties}>
                <span className={styles.node}><i className="fa-regular fa-user" aria-hidden="true" /></span>
                <div className={styles.helpText}>
                  <strong>Personalized Career Counselling</strong>
                  <span>Understand your options based on your goals, academic background and interests, with guidance from experienced counsellors.</span>
                </div>
              </li>
              <li className={styles.helpListItem} style={{ '--i': 1 } as React.CSSProperties}>
                <span className={styles.node}><i className="fa-regular fa-pen-to-square" aria-hidden="true" /></span>
                <div className={styles.helpText}>
                  <strong>Entrance Exam Mentoring</strong>
                  <span>Get guidance and mentoring to help you understand and prepare for relevant entrance examinations.</span>
                </div>
              </li>
              <li className={styles.helpListItem} style={{ '--i': 2 } as React.CSSProperties}>
                <span className={styles.node}><i className="fa-regular fa-file-lines" aria-hidden="true" /></span>
                <div className={styles.helpText}>
                  <strong>Admission &amp; Seat Reservation Support</strong>
                  <span>Get assistance with the admission process, seat reservation facilities and other important admission formalities.</span>
                </div>
              </li>
              <li className={styles.helpListItem} style={{ '--i': 3 } as React.CSSProperties}>
                <span className={styles.node}><i className="fa-regular fa-money-bill-1" aria-hidden="true" /></span>
                <div className={styles.helpText}>
                  <strong>Educational Loans &amp; Scholarships</strong>
                  <span>Explore available options for educational loans and scholarships to help plan your education finances.</span>
                </div>
              </li>
              <li className={styles.helpListItem} style={{ '--i': 4 } as React.CSSProperties}>
                <span className={styles.node}><i className="fa-regular fa-building" aria-hidden="true" /></span>
                <div className={styles.helpText}>
                  <strong>Direct Access to Institutions</strong>
                  <span>Facilitate direct meetings with colleges and universities, so you can clarify important questions before making your decision.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.footerNote}>
            Your details go only to our counselling team — never sold or shared. One counsellor, one call, no spam.
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          <div className={styles.formHeader}>
            <h2>Find the Right Course &amp; College</h2>
            <p className={styles.eyebrow}>
              Tell us what you&apos;re looking for and our admission counsellor will help you explore suitable options.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="fullname" className={styles.label}>
                Full Name <span className={styles.req}>*</span>
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                placeholder="Enter your full name"
                autoComplete="name"
                value={fullName}
                onChange={e => {
                  setFullName(e.target.value)
                  if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }))
                }}
                required
              />
              {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
            </div>

            {/* Mobile / WhatsApp */}
            <div className={styles.formGroup}>
              <label htmlFor="mobile" className={styles.label}>
                Mobile / WhatsApp <span className={styles.req}>*</span>
              </label>
              <div
                ref={phoneFieldRef}
                className={`${styles.phoneField} ${isDropdownOpen ? styles.phoneFieldOpen : ''} ${
                  errors.phone ? styles.inputError : ''
                }`}
              >
                <button
                  type="button"
                  className={styles.ccBtn}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  aria-controls="ccList"
                  aria-label={`Country code: ${selectedCountry.name} +${selectedCountry.dial}`}
                >
                  <img
                    className={styles.flag}
                    src={`https://flagcdn.com/w40/${selectedCountry.iso.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w80/${selectedCountry.iso.toLowerCase()}.png 2x`}
                    width={22}
                    height={16}
                    alt=""
                  />
                  <span className={styles.dial}>+{selectedCountry.dial}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className={styles.phoneInput}
                  placeholder="Mobile number"
                  autoComplete="tel-national"
                  inputMode="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />

                {/* Country dropdown menu */}
                <div className={styles.ccMenu}>
                  <div className={styles.ccSearch}>
                    <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search country or code"
                      autoComplete="off"
                      aria-label="Search country"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                  </div>
                  <ul ref={listRef} id="ccList" className={styles.ccList} role="listbox" aria-label="Countries">
                    {filteredCountries.length === 0 ? (
                      <li className={styles.ccEmpty}>No country found</li>
                    ) : (
                      filteredCountries.map((c, i) => {
                        const isPinned = c.iso === 'IN' && !searchQuery
                        const isSelected = c.iso === selectedCountry.iso
                        const isActive = i === activeCountryIndex
                        return (
                          <li
                            key={c.iso}
                            role="option"
                            aria-selected={isSelected}
                            className={`${styles.ccListItem} ${isPinned ? styles.ccListPinned : ''} ${
                              isSelected ? styles.ccListItemSelected : ''
                            } ${isActive ? styles.ccListItemActive : ''}`}
                            onClick={() => selectCountry(c)}
                            onMouseEnter={() => setActiveCountryIndex(i)}
                          >
                            <img
                              className={styles.flag}
                              src={`https://flagcdn.com/w40/${c.iso.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w80/${c.iso.toLowerCase()}.png 2x`}
                              width={22}
                              height={16}
                              alt=""
                              loading="lazy"
                            />
                            <span className={styles.name}>{c.name}</span>
                            <span className={styles.code}>+{c.dial}</span>
                          </li>
                        )
                      })
                    )}
                  </ul>
                </div>
              </div>
              {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
            </div>

            {/* Email Address */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address <span className={styles.req}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Enter your email address"
                autoComplete="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                }}
                required
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>

            {/* What course are you looking for? */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="degree" className={styles.label}>
                What course are you looking for? <span className={styles.req}>*</span>
              </label>
              <input
                type="text"
                id="degree"
                name="course"
                className={`${styles.input} ${errors.course ? styles.inputError : ''}`}
                placeholder="e.g. B.Tech, MBA, B.Sc Nursing"
                value={course}
                onChange={e => {
                  setCourse(e.target.value)
                  if (errors.course) setErrors(prev => ({ ...prev, course: '' }))
                }}
                required
              />
              {errors.course && <span className={styles.errorMessage}>{errors.course}</span>}
            </div>

            {/* State selection */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="state" className={styles.label}>
                Your State <span className={styles.req}>*</span>
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="state"
                  name="state"
                  className={`${styles.select} ${!state ? styles.selectPlaceholder : ''} ${
                    errors.state ? styles.inputError : ''
                  }`}
                  style={{ color: state ? '#17264c' : '#98a2b3', backgroundColor: '#ffffff' }}
                  value={state}
                  onChange={e => {
                    setState(e.target.value)
                    if (errors.state) setErrors(prev => ({ ...prev, state: '' }))
                  }}
                  required
                >
                  <option value="" disabled hidden style={{ color: '#98a2b3', backgroundColor: '#ffffff' }}>
                    Select your state
                  </option>
                  {STATES.map(s => (
                    <option key={s.value} value={s.value} style={{ color: '#17264c', backgroundColor: '#ffffff' }}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {errors.state && <span className={styles.errorMessage}>{errors.state}</span>}
            </div>

            {/* Preferred College (Optional) */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="college" className={styles.label}>
                Preferred College (Optional)
              </label>
              <input
                type="text"
                id="college"
                name="college"
                className={styles.input}
                placeholder="e.g. Christ University"
                value={college}
                onChange={e => setCollege(e.target.value)}
              />
            </div>

            {/* Message (Optional) */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="message" className={styles.label}>
                Your Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                placeholder="Tell us what you need help with — course, college, fees, eligibility, admission or counselling."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Submit'}
            </button>
          </form>

          <div className={styles.formFooterNote}>
            By clicking submit, I agree to the terms &amp; conditions and privacy policy and give my consent to receive updates through SMS/Email.
          </div>
        </div>
      </div>
    </div>
  )
}

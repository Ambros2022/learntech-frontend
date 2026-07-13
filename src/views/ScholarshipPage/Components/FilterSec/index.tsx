'use client'

import React, { useCallback, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { LazyEmblaTabCarousel, LazyGlobalEnquiryForm, LazyScholarshipSearchBar } from 'src/app/components/ClientWrappers'

interface FilterSecProps {
  abroadData: any[]
  levelOptions: any[]
  typeOptions: any[]
  countryData: any[]
  tabCountries: any[]
  initialScholarships: any[]
  initialTotalItems: number
}

const FilterSec = ({
  abroadData = [],
  levelOptions = [],
  typeOptions = [],
  countryData = [],
  tabCountries = [],
  initialScholarships = [],
  initialTotalItems = 0,
}: FilterSecProps) => {
  const [scholarshipsData, setScholarshipsData] = useState<any[]>(initialScholarships)
  const [activeTab, setActiveTab] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 9
  const [totalScholarships, setTotalScholarships] = useState(initialTotalItems)
  const [totalPages, setTotalPages] = useState(Math.ceil(initialTotalItems / perPage))
  const [searchText, setSearchText] = useState('')
  const [formData, setFormData] = useState({
    levelOfStudy: '',
    type: '',
    gender: '',
    nationality: '',
    deadline: '',
  })
  const abortScholarshipRef = useRef<AbortController | null>(null)

  const handleClearAll = () => {
    setFormData({
      levelOfStudy: '',
      type: '',
      gender: '',
      nationality: '',
      deadline: '',
    })
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchText('')
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
    setCurrentPage(1) // Reset page on filter change
  }

  const getScholarship = useCallback(
    async (countryId: string, levelId: string, typeId: string, nationalityId: string) => {
      try {
        abortScholarshipRef.current?.abort()
        abortScholarshipRef.current = new AbortController()

        const queryParams = new URLSearchParams()
        queryParams.append('searchfrom', 'name')
        queryParams.append('searchtext', searchText)
        queryParams.append('page', String(currentPage))
        queryParams.append('size', String(perPage))

        if (levelId !== '') queryParams.append('level_id', levelId)
        if (typeId !== '') queryParams.append('type_id', typeId)
        if (nationalityId !== '') queryParams.append('country_id', nationalityId)
        if (formData.gender) queryParams.append('gender', formData.gender)
        if (countryId !== 'all') {
          queryParams.append('country_id', countryId)
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI || ''}/api/website/scholarships/get?${queryParams.toString()}`,
          { signal: abortScholarshipRef.current.signal }
        )
        if (!res.ok) return
        const response = await res.json()

        setScholarshipsData(response.data ?? [])
        setTotalScholarships(response.totalItems ?? (response.data ?? []).length)
        setTotalPages(Math.ceil((response.totalItems ?? (response.data ?? []).length) / perPage))
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching scholarships:', error)
        }
      }
    },
    [formData.gender, searchText, currentPage, perPage]
  )

  useEffect(() => {
    getScholarship(activeTab, formData.levelOfStudy, formData.type, formData.nationality)
  }, [activeTab, formData.levelOfStudy, formData.type, formData.nationality, getScholarship, searchText, currentPage])

  const renderScholarshipDetails = (scholarship: any) => (
    <ul className="text-black">
      <li>
        International Student Eligible : <span className="fw-bold">{scholarship.is_eligible === 1 ? 'Yes' : 'No'}</span>
      </li>
      <li>
        Amount : <span className="fw-bold">{scholarship.amount}</span>
      </li>
      <li>
        Type : <span className="fw-bold">{scholarship.scholartypes ? scholarship.scholartypes.name : 'Not specified'}</span>
      </li>
      <li>
        Level Of Study : <span className="fw-bold">{scholarship.scholarlevels ? scholarship.scholarlevels.name : 'Not specified'}</span>
      </li>
      <li>
        Number Of Scholarships : <span className="fw-bold">{scholarship.total_scholarships}</span>
      </li>
    </ul>
  )



  const handleTabClick = (tab: any) => {
    setActiveTab(tab.id)
    setCurrentPage(1) // Reset page on tab change
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const ScholarshipCards = () => {
    // If the array is already paginated by the API, we use it directly.
    // Otherwise, we do client-side pagination as fallback.
    const paginatedScholarships =
      scholarshipsData.length <= perPage
        ? scholarshipsData
        : scholarshipsData.slice((currentPage - 1) * perPage, currentPage * perPage)

    return (
      <div className="row d-flex flex-fill">
        {paginatedScholarships.map((scholarship, index) => (
          <div className="col-md-10 col-lg-6 col-xl-6 mb-3" key={scholarship.id || index}>
            <div className="card bg-skyBlue p-3">
              <h4 className="text-blue fw-bold">{scholarship.name}</h4>
              <h6 className="text-black fw-bold">{scholarship.university}</h6>
              {renderScholarshipDetails(scholarship)}
              <Link href={`/scholarship/${scholarship.id}/${scholarship.slug}`} className="mb-3 text-blue fw-bold text-start">
                Read More {'>>'}
              </Link>
              <div className="d-flex gap-3 flex-fill scholarshipBtn flex-md-row flex-column">
                <LazyGlobalEnquiryForm buttonText="Apply Now" className="btn applyNowButton" />
                <Link href={`/scholarship/${scholarship.id}/${scholarship.slug}`}>
                  <button className="btn viewDetailBtn">Get Alert</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const tabs = [{ id: 'all', name: 'All' }, ...tabCountries]

  return (
    <section className="bg-white py-5">
      <div className="container">
        <div className="card mb-3 filterCardSec filterscholarship border-1 rounded p-3">
          <h2 className="text-blue fw-bold mb-3">Filter By</h2>

          <div className="d-flex gap-3 flex-wrap">
            <div className="align-self-center flex-grow-1">
              <label htmlFor="levelOfStudy" className="text-black fw-bold mb-2">
                Level of study
              </label>
              <div className="position-relative w-100">
                <select
                  className="form-control text-black w-100 pe-5"
                  id="levelOfStudy"
                  value={formData.levelOfStudy}
                  onChange={handleSelectChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    background: 'transparent',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Select</option>
                  {levelOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <i
                  className="bi bi-caret-down-fill position-absolute"
                  style={{
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                ></i>
              </div>
            </div>

            <div className="align-self-center flex-grow-1">
              <label htmlFor="type" className="text-black fw-bold mb-2">
                Type
              </label>
              <div className="position-relative w-100">
                <select
                  className="form-control text-black w-100 pe-5"
                  id="type"
                  value={formData.type}
                  onChange={handleSelectChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    background: 'transparent',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Select</option>
                  {typeOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <i
                  className="bi bi-caret-down-fill position-absolute"
                  style={{
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                ></i>
              </div>
            </div>

            <div className="align-self-center flex-grow-1">
              <label htmlFor="gender" className="text-black fw-bold mb-2">
                Gender
              </label>
              <div className="position-relative w-100">
                <select
                  className="form-control text-black w-100 pe-5"
                  id="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    background: 'transparent',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">select</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">others</option>
                </select>
                <i
                  className="bi bi-caret-down-fill position-absolute"
                  style={{
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                ></i>
              </div>
            </div>

            <div className="align-self-center flex-grow-1">
              <label htmlFor="nationality" className="text-black fw-bold mb-2">
                Nationality
              </label>
              <div className="position-relative w-100">
                <select
                  className="form-control text-black w-100 pe-5"
                  id="nationality"
                  value={formData.nationality}
                  onChange={handleSelectChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    background: 'transparent',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">Select</option>
                  {countryData.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <i
                  className="bi bi-caret-down-fill position-absolute"
                  style={{
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                ></i>
              </div>
            </div>

            <div className="align-self-center flex-grow-1">
              <label htmlFor="deadline" className="text-black fw-bold mb-2">
                Deadline
              </label>
              <div className="position-relative w-100">
                <select
                  className="form-control text-black w-100 pe-5"
                  id="deadline"
                  value={formData.deadline}
                  onChange={handleSelectChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    background: 'transparent',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="">select</option>
                  <option value="Jan - Mar">Jan - Mar</option>
                  <option value="Apr - Jun">Apr - Jun</option>
                  <option value="Jul - Sep">Jul - Sep</option>
                  <option value="Oct - Dec">Oct - Dec</option>
                </select>
                <i
                  className="bi bi-caret-down-fill position-absolute"
                  style={{
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                ></i>
              </div>
            </div>

            <div className="align-self-center pt-4">
              <button className="btn viewMoreCollegeBtn align-self-center" onClick={handleClearAll}>
                Clear All
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="fw-bold text-blue mt-4 pt-5">Select Countries</h2>
          <div className="position-relative countryCarouselFilter mb-5 pt-3 innerschCarousel" style={{ zIndex: '2' }}>
            <LazyEmblaTabCarousel
              showDots={false}
              showArrows={tabs.length > 1}
              slidesToShowDesktop={6}
              slidesToShowTablet={4}
              slidesToShowMobile={2}
              autoplay={false}
              loop={false}
            >
              {tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  className={`btn d-flex mx-auto justify-content-center filterCountry ${activeTab === tab.id ? 'active' : ''}`}
                  id={tab.id}
                  onClick={() => handleTabClick(tab)}
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={activeTab === tab.id}
                  style={{ zIndex: '10' }}
                >
                  {tab.name}
                </button>
              ))}
            </LazyEmblaTabCarousel>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-md-7 order-2 order-md-1">
            <h5 className="fw-bold text-black mb-3">{totalScholarships} Scholarships Found</h5>
          </div>
          <div className="col-md-5 col-lg-4 order-1 order-md-2 mb-md-0 mb-5">
            <LazyScholarshipSearchBar />
          </div>
        </div>

        <div className="row pt-4">
          <div className="col-md-7 col-lg-8 pt-lg-3 pt-2">
            <div className="tab-content" id="pills-tabContent">
              <ScholarshipCards />
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="row col-md-12 blogCardspage">
                <div className="d-flex justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination d-flex gap-3">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
                          <span aria-hidden="true">{'<'}</span>
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => handlePageClick(index + 1)}>
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handleNextPage} aria-label="Next">
                          <span aria-hidden="true">{'>'}</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-5 col-lg-4 pt-lg-3 pt-2">
            <div className="border p-3 text-center rounded examAlertSec bg-skyBlue mb-5">
              <h2 className="text-blue fw-bold">Are you interested in scholarship?</h2>
              <img
                src="/images/icons/Scholarships.png"
                alt="exam-alert-img"
                className="img-fluid"
                width={300}
                height={300}
              />
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <LazyGlobalEnquiryForm buttonText="Talk To Experts" className="btn applyNowButton" />
                <LazyGlobalEnquiryForm buttonText="Get More Info" className="btn viewDetailBtn" />
              </div>
            </div>
            <h2 className="text-blue fw-bold text-center mb-3">Most Popular Links</h2>
            <div className="border p-3 rounded bg-skyBlue">
              {abroadData.map((link, index) => (
                <div className="d-grid" key={link.id || index}>
                  <Link href={`/${link.slug}`} className="text-blue border mb-3 btn abroadBtn text-center">
                    <h5 className="mb-0">{link.name}</h5>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FilterSec

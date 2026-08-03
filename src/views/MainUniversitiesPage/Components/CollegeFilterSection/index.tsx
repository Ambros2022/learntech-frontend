'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'src/hooks/useCompatRouter'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry'
import { useAuth } from 'src/hooks/useAuth'

const API_BASE = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')
const apiGet = async (path: string) => {
  const res = await fetch(`${API_BASE}/${path.replace(/^\/+/, '')}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function debounce<T extends (...args: any[]) => void>(fn: T, wait: number) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

interface University {
  id: number
  name: string
  state: number
  address: string
  banner_image: string
  established: string
  avg_rating: number
  college_type: string
  course_type: string
  slug: string
}

const UniversityCard = ({ id, slug, name, type, rating, location, established, imageUrl }: any) => {
  return (
    <div className='col-md-10 col-lg-12 mx-auto mb-3 filtercollge-card'>
      <div className="mx-2 filterCardBorder hover-card bg-skyBlue">
        <div className="p-2">
          <div className="row d-flex">
            <div className="align-content-start col-md-12 col-lg-4 col-xl-3 clgCardImg">
              <Image width={500} height={500} src={`${process.env.NEXT_PUBLIC_IMG_URL}/${imageUrl}`} className="img-fluid rounded card-Image-top me-auto" alt="University Logo" style={{ objectFit: 'cover' }} loading='lazy' />
            </div>
            <div className="col-md-12 col-lg-8 col-xl-9">
              <div className="row">
                <div className="p-2 col-md-12 col-lg-12 col-xl-6">
                  <div className="card-title">
                    <h5 className='fw-bold text-black mb-3'>{name}</h5>
                  </div>
                  <div className="card-text text-black">
                    <p className="mb-3 text-truncate"><i className='bi bi-geo-alt-fill text-danger me-1 fs-5'></i>{`${location}`}</p>
                    <div className="mb-3">
                      <div className='d-flex justify-content-md-start justify-content-start flex-md-row flex-row'>
                        <span className='align-self-center me-auto'>
                          <Image src='/images/icons/calendor-filled.png' width={20} height={20} className='me-1' loading='lazy' alt='calendar Icon' />
                          Est. Year {established}
                        </span>
                        <span className='me-auto align-self-center'>
                          <button className='ms-2 mt-md-0 mt-0 mt-md-3 btn typeBtn'>{type}</button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 col-md-12 col-xl-3 mb-lg-3 mb-3 mb-md-0 col-lg-12 text-end">
                  {rating && rating.length !== 0 ? (
                    <div className="d-flex mb-md-3 mb-lg-0 gap-2 justify-content-start justify-content-md-start">
                      <i className={`bi bi-star-fill ${rating >= 1 ? "text-warning" : "text-gray"}`}></i>
                      <i className={`bi bi-star-fill ${rating >= 2 ? "text-warning" : "text-gray"}`}></i>
                      <i className={`bi bi-star-fill ${rating >= 3 ? "text-warning" : "text-gray"}`}></i>
                      <i className={`bi bi-star-fill ${rating >= 4 ? "text-warning" : "text-gray"}`}></i>
                      <i className={`bi bi-star-fill ${rating >= 5 ? "text-warning" : "text-gray"}`}></i>
                    </div>
                  ) : ''}
                </div>
                <div className="mt-lg-0 col-md-10 col-xl-3 col-lg-12 text-xl-end text-end flex-md-row flex-column d-flex flex-lg-row flex-xl-column justify-content-xl-around gap-xl-0 gap-3">
                  <GlobalEnquiryForm className="activeBtn btn d-flex justify-content-center" collegeName={name} />
                  <Link href={`/university/${id}/${slug}`} className="viewMoreBtn btn d-flex justify-content-center">
                    <span className='align-content-center'>View More</span>
                  </Link>
                </div>
              </div>
              <div className='d-flex gap-2 btns'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UniversityFilterSection() {
  const router = useRouter()
  const [universities, setUniversities] = useState<University[]>([])
  const [total, setTotal] = useState<string>("0")
  const isMountedRef = useIsMountedRef()
  const [visibleCards, setVisibleCards] = useState(7)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, string[]>>({})
  const [states, setStates] = useState<Option[]>([])
  const [citys, setCitys] = useState<any[]>([])
  const [streams, setStreams] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [promoban, setPromoban] = useState<any[]>([])

  const [accordionOpen, setAccordionOpen] = useState<{ [groupId: string]: boolean }>({
    state: true, city: true, streams: true, courses: true, ownership: true, courseType: true,
  })

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setAccordionOpen({ state: !mobile, city: !mobile, streams: !mobile, courses: !mobile, ownership: !mobile, courseType: !mobile })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [checkboxState, setCheckboxState] = useState<{ [groupId: string]: { [value: string]: boolean } }>({})
  const { stateId, setStateId, cityId, setCityId, streamId, setStreamId } = useAuth()

  type Option = { is_top: string; label: string; value: string; cities?: Option[] }
  type OptionGroup = { id: string; label: string; options: Option[]; isTop?: any }

  const getPromobanner = useCallback(async () => {
    try {
      const json = await apiGet('api/website/banner/get?promo_banner=All_university_page')
      if (isMountedRef.current) setPromoban(json.data)
    } catch (error) {
      console.error('Failed to fetch promo banner:', error)
    }
  }, [isMountedRef])

  const getstreamdata = useCallback(async () => {
    try {
      const json = await apiGet('api/website/stream/get?size=100')
      if (json.status === 1) {
        setStreams(json.data.map((s: any) => ({ label: s.name, value: s.id.toString() })))
      }
    } catch (error) {
      console.error('Error fetching streams:', error)
    }
  }, [isMountedRef])

  const getcoursesdata = useCallback(async () => {
    try {
      const json = await apiGet('api/website/generalcourse/get')
      if (json.status === 1) {
        setCourses(json.data.map((c: any) => ({ label: c.short_name, value: c.id.toString() })))
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }, [isMountedRef])

  const fetchStatesData = useCallback(async () => {
    try {
      const json = await apiGet('api/website/states/get?page=1&size=50&country_id=204')
      if (json.status === 1) {
        const arrcity: any[] = []
        const statesData = json.data.map((state: any) => ({
          label: state.name,
          value: state.id.toString(),
          cities: state.city.map((city: any) => {
            const cityObj = { label: city.name, value: city.id.toString() }
            arrcity.push(cityObj)
            return cityObj
          }),
          is_top: state.is_top.toString(),
        }))
        setCitys(arrcity)
        setStates(statesData)
      }
    } catch (error) {
      console.error('Error fetching states:', error)
    }
  }, [isMountedRef])

  const getuniversitydata = useCallback(async (stateIds?: string[], courseIds?: string[], streamIds?: string[], ownership?: string[], courseType?: string[], cityIds?: string[]) => {
    try {
      const hasFilters = (stateIds?.length || 0) > 0 || (cityIds?.length || 0) > 0 || (courseIds?.length || 0) > 0 || (streamIds?.length || 0) > 0 || (ownership?.length || 0) > 0 || (courseType?.length || 0) > 0
      const sp = new URLSearchParams({
        page: '1', size: hasFilters ? '100' : '20', country_id: '204', type: 'university',
        orderby: 'asc', columnname: 'listing_order',
      })
      if (stateIds?.length) sp.set('state_id', `[${stateIds.join(',')}]`)
      if (cityIds?.length) sp.set('city_id', `[${cityIds.join(',')}]`)
      if (courseIds?.length) sp.set('general_course_id', `[${courseIds.join(',')}]`)
      if (streamIds?.length) sp.set('stream_id', `[${streamIds.join(',')}]`)
      if (ownership?.length) ownership.forEach(v => sp.append('college_type[]', v))
      if (courseType?.length) sp.set('course_type', JSON.stringify(courseType))
      const json = await apiGet(`api/website/colleges/get?${sp.toString()}`)
      setUniversities(json.data)
      setTotal(json.totalItems)
    } catch (err) {
      console.error(err)
    }
  }, [isMountedRef])

  useEffect(() => {
    fetchStatesData()
    getuniversitydata()
    getstreamdata()
    getcoursesdata()
    getPromobanner()
  }, [])

  const options: OptionGroup[] = [
    { id: 'state', label: 'States', options: states },
    { id: 'city', label: 'Cities', options: citys },
    {
      id: 'ownership', label: 'Ownership', options: [
        { label: 'Public', value: 'Public' }, { label: 'Deemed', value: 'Deemed' },
        { label: 'Private', value: 'Private' }, { label: 'Government', value: 'Government' },
        { label: 'Autonomous', value: 'Autonomous' },
      ]
    },
    { id: 'streams', label: 'Streams', options: streams },
    {
      id: 'courseType', label: 'Course Type', options: [
        { label: 'UG', value: 'UG' }, { label: 'PG', value: 'PG' },
        { label: 'Diploma', value: 'Diploma' }, { label: 'Doctorate', value: 'Doctorate' },
      ],
    },
    { id: 'courses', label: 'Courses', options: courses },
  ]

  const handleViewMore = () => {
    const filtered = universities.filter(u => Object.keys(selectedCheckboxes).every(groupId => {
      const sel = selectedCheckboxes[groupId]
      if (!sel?.length) return true
      if (Array.isArray(u[groupId])) return sel.some(v => u[groupId].includes(v))
      return sel.includes(u[groupId])
    }))
    if (visibleCards < filtered.length) setVisibleCards(prev => prev + 7)
  }

  const debouncedHandleCheckboxChange = debounce((groupId: string, value: any, isChecked: boolean) => {
    const el = document.getElementById('universityFiltersSection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })

    setSelectedCheckboxes(prevSelected => {
      const updated = { ...prevSelected }
      if (isChecked) {
        updated[groupId] = [...(updated[groupId] || []), value]
      } else {
        updated[groupId] = (updated[groupId] || []).filter(item => item !== value)
      }
      const { state: sIds = [], courses: cIds = [], streams: stIds = [],
        ownership: own = [], courseType: ct = [], city: cityIds = [] } = updated
      getuniversitydata(sIds, cIds, stIds, own, ct, cityIds)
      if (groupId === "state" && sIds.length > 0) {
        setCitys(states.filter(s => sIds.includes(s.value)).flatMap(s => s.cities ?? []))
      }
      if (groupId === "state" && sIds.length === 0 && states.length > 0) {
        setCitys(states.flatMap((s: any) => s.cities ?? []))
      }
      return updated
    })
  }, 300)

  const handleCheckboxChange = (groupId: string, value: any, isChecked: boolean) => {
    debouncedHandleCheckboxChange(groupId, value, isChecked)
    setCheckboxState(prev => ({ ...prev, [groupId]: { ...prev[groupId], [value]: isChecked } }))
  }

  useEffect(() => {
    if (stateId) {
      const text = stateId.toString()
      debouncedHandleCheckboxChange("state", text, true)
      setCheckboxState(prev => ({ ...prev, state: { ...prev.state, [text]: true } }))
      setStateId(null)
    }
    if (streamId) {
      const text = streamId.toString()
      debouncedHandleCheckboxChange("streams", text, true)
      setCheckboxState(prev => ({ ...prev, streams: { ...prev.streams, [text]: true } }))
      setStreamId(null)
    }
    if (cityId) {
      const text = cityId.toString()
      debouncedHandleCheckboxChange("city", text, true)
      setCheckboxState(prev => ({ ...prev, city: { ...prev.city, [text]: true } }))
      setCityId(null)
    }
  }, [router, router.isReady])

  const removeSelectedCheckbox = (groupId: string, value: string) => {
    debouncedHandleCheckboxChange(groupId, value, false)
    setCheckboxState(prev => ({ ...prev, [groupId]: { ...prev[groupId], [value]: false } }))
    setSelectedCheckboxes(prev => {
      const updated = { ...prev }
      updated[groupId] = (updated[groupId] || []).filter(item => item !== value)
      getuniversitydata(updated['state'] || [], updated['courses'] || [], updated['streams'] || [])
      return updated
    })
  }

  function UniversityList({ selectedCheckboxes }: { selectedCheckboxes: Record<string, string[]> }) {
    const filtered = universities.filter(u => {
      if (!selectedCheckboxes.stateId?.length) return true
      return selectedCheckboxes.stateId.includes(u.state.toString().toLowerCase().replace(' ', '_'))
    })
    if (!filtered.length) return <div className="text-center my-5"><p>No universities found for the selected filters.</p></div>
    if (filtered.length > 0 && filtered.slice(0, visibleCards).length === 0) return <div className="text-center my-5"><p>No more universities to display.</p></div>
    return (
      <div className='row'>
        {filtered.slice(0, visibleCards).map(u => (
          <UniversityCard key={u.id} id={u.id} name={u.name} slug={u.slug} type={u.college_type}
            rating={u.avg_rating} location={u.address} established={u.established} imageUrl={u.banner_image} />
        ))}
      </div>
    )
  }

  const toggleAccordion = (groupId: string) => {
    setAccordionOpen(prev => ({ ...prev, [groupId]: !prev[groupId] }))
  }

  const StateButtons: React.FC<{ options: Option[]; selectedCheckboxes: Record<string, string[]> }> =
    ({ options, selectedCheckboxes }) => {
      const handleClick = (state: string) => {
        debouncedHandleCheckboxChange("state", state, true)
        window.scrollTo({ top: 650, behavior: 'smooth' })
        setCheckboxState(prev => ({ ...prev, state: { ...prev.state, [state]: true } }))
      }
      return (
        <div className="row bg-skyBlue gx-0 p-3 my-3 mx-2 rounded">
          <div className="col-12">
            <h6 className="text-black">Filters By Location</h6>
            <div className="d-flex flex-wrap">
              {options.map((option, i) => option.is_top === "1" && (
                <button key={i} className={`btn text-center m-1 p-2 filterItemBtn ${selectedCheckboxes.state?.includes(option.value) ? 'active' : ''}`}
                  onClick={() => handleClick(option.value)}>{option.label}</button>
              ))}
            </div>
          </div>
        </div>
      )
    }

  const MultiSelectOptions: React.FC<{ options: OptionGroup[] }> = ({ options }) => {
    const [searchTexts, setSearchTexts] = useState<Record<string, string>>({})
    const handleSearchChange = (groupId: string, text: string) => setSearchTexts(prev => ({ ...prev, [groupId]: text }))
    const filteredOptions = (og: OptionGroup) => og.options.filter(o => o.label.toLowerCase().includes((searchTexts[og.id] || '').toLowerCase()))
    return (
      <div>
        {options.map((og, i) => (
          <div key={i} style={{ cursor: 'pointer' }} className="row rounded bg-white gx-0 p-3 my-3 mx-2">
            <div className="col-10" onClick={() => toggleAccordion(og.id)}><h5 className='text-blue'>{og.label}</h5></div>
            <div className="col-2 text-center" onClick={() => toggleAccordion(og.id)}><h5 className='text-blue'>{accordionOpen[og.id] ? '▲' : '▼'}</h5></div>
            <div className={`showingCards collapse ${accordionOpen[og.id] ? 'show' : ''}`}>
              <div className='my-3 options-container'>
                <hr />
                <input type="search" placeholder="Search" className="icon-rtl form-control"
                  value={searchTexts[og.id] || ''} onChange={e => handleSearchChange(og.id, e.target.value)}
                  id={`${og.id}Search`} />
                {filteredOptions(og).map((option, j) => (
                  <div key={j} className="form-check text-black searchCheckBox my-2">
                    <input className="form-check-input" type="checkbox" value={option.value}
                      id={`${og.id}-${j}`} onChange={e => handleCheckboxChange(og.id, option.value, e.target.checked)}
                      checked={checkboxState[og.id]?.[option.value]} />
                    <label className="form-check-label" htmlFor={`${og.id}-${j}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const SelectedFilters: React.FC<{ selectedCheckboxes: Record<string, string[]> }> = ({ selectedCheckboxes }) => {
    const getLabelForValue = (groupId: string, value: string) => {
      const group = options.find(og => og.id === groupId)
      return group?.options.find(o => o.value === value)?.label ?? value
    }
    const hasSelected = Object.keys(selectedCheckboxes).some(g => selectedCheckboxes[g].length > 0)
    return !hasSelected ? null : (
      <div id="universityFiltersSection" className="row bg-skyBlue gx-0 px-3 py-2 mb-3 mx-2">
        <div className="col-12"><h6 className='text-black'>Selected Filters</h6></div>
        <div className='my-2'>
          {Object.entries(selectedCheckboxes).map(([groupId, values]) =>
            values.map(value => (
              <div key={value} className="btn d-inline-flex align-items-center filterItemBtn2 rounded m-1 p-2">
                <span className="me-2">{getLabelForValue(groupId, value)}</span>
                <button className="btn" onClick={() => removeSelectedCheckbox(groupId, value)}>
                  <Image src="/images/icons/close-icon-white.png" width={18} height={18} alt='close' loading='lazy' />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  const filteredUniversities = universities.filter(u => Object.keys(selectedCheckboxes).every(groupId => {
    const sel = selectedCheckboxes[groupId]
    if (!sel?.length) return true
    if (Array.isArray(u[groupId])) return sel.some(v => u[groupId].includes(v))
    return sel.includes(u[groupId])
  }))

  const PromoAddBanner = ({ url, title, description, link }: any) => (
    <section className='bg-skyBlue addBanner rounded'>
      <div className="container p-5">
        <div className="card">
          <div className="row g-0">
            <div className="col-md-4 addImgClg position-relative">
              <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${url}`} width={200} height={200} className="img-fluid rounded-start" alt="uni-img" loading='lazy' />
              <h2 className='position-absolute text-white' style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', zIndex: 3000, top: '50%', left: '50%', color: "white" }}>Ad</h2>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title fw-bold">{title}</h3>
                <h5 className="card-text">{description}</h5>
                <Link href={link} className='mt-3 btn openAddBtn'>Open <i className="bi bi-chevron-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  return (
    <div className='bg-white py-3'>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-xl-3 col-md-4 mb-3 mb-lg-0 bg-skyDarkBlue rounded">
            <h5 className='text-blue fw-bold text-md-start text-center px-3 pt-3'>Found {total} Universities</h5>
            <MultiSelectOptions options={options} />
          </div>
          <div className="col-lg-9 col-xl-9 col-md-8">
            <SelectedFilters selectedCheckboxes={selectedCheckboxes} />
            <UniversityList selectedCheckboxes={selectedCheckboxes} />
            {filteredUniversities.length > visibleCards && (
              <div className="text-center my-3">
                <button className="btn viewMoreCollegeBtn" onClick={handleViewMore}>Load More</button>
              </div>
            )}
            {promoban.length > 0 && <PromoAddBanner url={promoban[0].image} description={promoban[0].description} title={promoban[0].title} link={promoban[0]?.link} />}
            <StateButtons options={options.find(o => o.id === 'state')?.options || []} selectedCheckboxes={selectedCheckboxes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniversityFilterSection

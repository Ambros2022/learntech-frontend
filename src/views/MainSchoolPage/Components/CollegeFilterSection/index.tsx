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

interface School {
  id: number
  name: string
  state: number
  address: string
  banner_image: string
  established: string
  avg_rating: number
  school_type: string
  slug: string
}

const SchoolCard = ({ id, slug, name, type, rating, location, established, imageUrl }: any) => {
  return (
    <div className='col-md-10 col-lg-12 mx-auto mb-3 filtercollge-card'>
      <div className="mx-2 filterCardBorder hover-card bg-skyBlue">
        <div className="p-2">
          <div className="row d-flex">
            <div className="align-content-start col-md-12 col-lg-4 col-xl-3 clgCardImg">
              <Image width={500} height={500} src={`${process.env.NEXT_PUBLIC_IMG_URL}/${imageUrl}`} className="img-fluid rounded card-Image-top me-auto" alt="School Logo" style={{ objectFit: 'cover' }} loading='lazy' />
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
                  <GlobalEnquiryForm className="activeBtn btn d-flex justify-content-center" placeholder="Class" />
                  <Link href={`/school/${id}/${slug}`} className="viewMoreBtn btn d-flex justify-content-center">
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

function CollegeFilterSection() {
  const router = useRouter()
  const [schools, setSchools] = useState<School[]>([])
  const [total, setTotal] = useState<string>("0")
  const isMountedRef = useIsMountedRef()
  const [visibleCards, setVisibleCards] = useState(7)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, string[]>>({})
  const [states, setStates] = useState<Option[]>([])
  const [citys, setCitys] = useState<any[]>([])
  const [boards, setBoards] = useState<any[]>([])
  const [promoban, setPromoban] = useState<any[]>([])

  const [accordionOpen, setAccordionOpen] = useState<{ [groupId: string]: boolean }>({
    state: true, city: true, streams: true, ownership: true,
  })

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setAccordionOpen({ state: !mobile, city: !mobile, streams: !mobile, ownership: !mobile })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [checkboxState, setCheckboxState] = useState<{ [groupId: string]: { [value: string]: boolean } }>({})
  const { stateId, setStateId, cityId, setCityId } = useAuth()

  type Option = { is_top: string; label: string; value: string; cities?: Option[] }
  type OptionGroup = { id: string; label: string; options: Option[] }

  const getPromobanner = useCallback(async () => {
    try {
      const json = await apiGet('api/website/banner/get?promo_banner=All_school_page')
      if (isMountedRef.current) setPromoban(json.data)
    } catch (error) {
      console.error('Failed to fetch promo banner:', error)
    }
  }, [isMountedRef])

  const getBoardsData = useCallback(async () => {
    try {
      const json = await apiGet('api/website/schoolboard/get?size=10000')
      if (json.status === 1) {
        setBoards(json.data.map((b: any) => ({ label: b.short_name, value: b.id.toString() })))
      }
    } catch (error) {
      console.error('Error fetching boards:', error)
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

  const getschooldata = useCallback(async (stateIds?: string[], boardIds?: string[], ownership?: string[], cityIds?: string[]) => {
    try {
      const sp = new URLSearchParams({
        page: '1', size: '10000', country_id: '204',
        orderby: 'asc', columnname: 'listing_order',
      })
      if (stateIds?.length) sp.set('state_id', `[${stateIds.join(',')}]`)
      if (cityIds?.length) sp.set('city_id', `[${cityIds.join(',')}]`)
      if (boardIds?.length) sp.set('school_board_id', `[${boardIds.join(',')}]`)
      if (ownership?.length) ownership.forEach(v => sp.append('school_type[]', v))
      const json = await apiGet(`api/website/schools/get?${sp.toString()}`)
      setSchools(json.data)
      setTotal(json.totalItems)
    } catch (err) {
      console.error(err)
    }
  }, [isMountedRef])

  useEffect(() => {
    fetchStatesData()
    getschooldata()
    getBoardsData()
    getPromobanner()
  }, [])

  const options: OptionGroup[] = [
    { id: 'streams', label: 'Boards', options: boards },
    { id: 'state', label: 'States', options: states },
    { id: 'city', label: 'Cities', options: citys },
    {
      id: 'ownership', label: 'School Types', options: [
        { label: 'Public', value: 'Public' }, { label: 'Deemed', value: 'Deemed' },
        { label: 'Private', value: 'Private' }, { label: 'Government', value: 'Government' },
      ],
    },
  ]

  const handleViewMore = () => {
    const filtered = schools.filter(s => Object.keys(selectedCheckboxes).every(groupId => {
      const sel = selectedCheckboxes[groupId]
      if (!sel?.length) return true
      if (Array.isArray(s[groupId])) return sel.some(v => s[groupId].includes(v))
      return sel.includes(s[groupId])
    }))
    if (visibleCards < filtered.length) setVisibleCards(prev => prev + 7)
  }

  const debouncedHandleCheckboxChange = debounce((groupId: string, value: any, isChecked: boolean) => {
    const el = document.getElementById('schoolFiltersSection')
    if (el) el.scrollIntoView({ behavior: 'smooth' })

    setSelectedCheckboxes(prevSelected => {
      const updated = { ...prevSelected }
      if (isChecked) {
        updated[groupId] = [...(updated[groupId] || []), value]
      } else {
        updated[groupId] = (updated[groupId] || []).filter(item => item !== value)
      }
      const { state: sIds = [], streams: bIds = [], ownership: own = [], city: cityIds = [] } = updated
      getschooldata(sIds, bIds, own, cityIds)
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
      getschooldata(updated['state'] || [], updated['streams'] || [], updated['ownership'] || [])
      return updated
    })
  }

  function SchoolList({ selectedCheckboxes }: { selectedCheckboxes: Record<string, string[]> }) {
    const filtered = schools.filter(s => {
      if (!selectedCheckboxes.stateId?.length) return true
      return selectedCheckboxes.stateId.includes(s.state.toString().toLowerCase().replace(' ', '_'))
    })
    if (!filtered.length) return <div className="text-center my-5"><p>No schools found for the selected filters.</p></div>
    if (filtered.length > 0 && filtered.slice(0, visibleCards).length === 0) return <div className="text-center my-5"><p>No more schools to display.</p></div>
    return (
      <div className='row'>
        {filtered.slice(0, visibleCards).map(s => (
          <SchoolCard key={s.id} id={s.id} name={s.name} slug={s.slug} type={s.school_type}
            rating={s.avg_rating} location={s.address} established={s.established} imageUrl={s.banner_image} />
        ))}
      </div>
    )
  }

  const toggleAccordion = (groupId: string) => {
    setAccordionOpen(prev => ({ ...prev, [groupId]: !prev[groupId] }))
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
      <div id="schoolFiltersSection" className="row bg-skyBlue gx-0 px-3 py-2 mb-3 mx-2">
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

  const filteredSchools = schools.filter(s => Object.keys(selectedCheckboxes).every(groupId => {
    const sel = selectedCheckboxes[groupId]
    if (!sel?.length) return true
    if (Array.isArray(s[groupId])) return sel.some(v => s[groupId].includes(v))
    return sel.includes(s[groupId])
  }))

  const PromoAddBanner = ({ url, title, description, link }: any) => (
    <section className='bg-skyBlue addBanner rounded'>
      <div className="container p-5">
        <div className="card">
          <div className="row g-0">
            <div className="col-md-4 addImgClg position-relative">
              <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${url}`} width={200} height={200} className="img-fluid rounded-start" alt="school-img" loading='lazy' />
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
            <h5 className='text-blue fw-bold text-md-start text-center px-3 pt-3'>Found {total} Schools</h5>
            <MultiSelectOptions options={options} />
          </div>
          <div className="col-lg-9 col-xl-9 col-md-8">
            <SelectedFilters selectedCheckboxes={selectedCheckboxes} />
            <SchoolList selectedCheckboxes={selectedCheckboxes} />
            {filteredSchools.length > visibleCards && (
              <div className="text-center my-3">
                <button className="btn viewMoreCollegeBtn" onClick={handleViewMore}>Load More</button>
              </div>
            )}
            {promoban.length > 0 && <PromoAddBanner url={promoban[0].image} description={promoban[0].description} title={promoban[0].title} link={promoban[0]?.link} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegeFilterSection

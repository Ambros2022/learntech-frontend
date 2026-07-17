'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'

const API = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const collegeSchema = z.object({
  review_type: z.string().min(1, 'This field is required'),
  passing_year: z.string().min(1, 'This field is required'),
  college_id: z.object({ id: z.number(), name: z.string() }).refine((v) => v !== null && v !== undefined, { message: 'This field is required' }),
  course_type: z.string().min(1, 'This field is required'),
  course_id: z.object({ id: z.number() }).optional().nullable(),
  name: z.string().optional(),
  userrating: z.number().optional(),
  content: z.string().optional(),
  school_id: z.any().optional(),
  school_board_id: z.any().optional(),
  grade: z.string().optional(),
})

const schoolSchema = z.object({
  review_type: z.string().min(1, 'This field is required'),
  passing_year: z.string().min(1, 'This field is required'),
  school_id: z.object({ id: z.number(), name: z.string() }).refine((v) => v !== null && v !== undefined, { message: 'This field is required' }),
  grade: z.string().min(1, 'This field is required'),
  school_board_id: z.object({ id: z.number(), name: z.string() }).refine((v) => v !== null && v !== undefined, { message: 'This field is required' }),
  college_id: z.any().optional(),
  course_type: z.string().optional(),
  course_id: z.any().optional(),
  name: z.string().optional(),
  userrating: z.number().optional(),
  content: z.string().optional(),
})

const step2Schema = z.object({
  review_type: z.string(),
  passing_year: z.string(),
  name: z.string().min(1, 'Your Name is required'),
  userrating: z.number().min(1, 'Rating is required').max(5, 'Maximum rating is 5'),
  content: z.string().min(1, 'Your Review is required'),
  college_id: z.any().optional(),
  course_type: z.string().optional(),
  course_id: z.any().optional(),
  school_id: z.any().optional(),
  school_board_id: z.any().optional(),
  grade: z.string().optional(),
})

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="d-flex gap-1" style={{ fontSize: '1.5rem' }} aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0 2px',
            color: (hovered || value) >= star ? '#ffd700' : '#ccc',
            fontSize: '1.5rem',
            lineHeight: 1,
          }}
        >
          ★
        </button>
      ))}
    </div>
  )
}

// ─── Autocomplete ─────────────────────────────────────────────────────────────

interface AutocompleteOption { id: number; name: string;[key: string]: any }

function NativeAutocomplete({
  options,
  value,
  onChange,
  label,
  error,
  helperText,
  getLabel,
}: {
  options: AutocompleteOption[]
  value: AutocompleteOption | null | ''
  onChange: (v: AutocompleteOption | null) => void
  label: string
  error?: boolean
  helperText?: string
  getLabel?: (o: AutocompleteOption) => string
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const getLbl = getLabel ?? ((o: AutocompleteOption) => o.name || '')
  const filtered = query.length >= 1
    ? options.filter((o) => getLbl(o).toLowerCase().includes(query.toLowerCase())).slice(0, 30)
    : options.slice(0, 30)

  const handleSelect = useCallback((o: AutocompleteOption) => {
    onChange(o)
    setQuery(getLbl(o))
    setOpen(false)
  }, [onChange, getLbl])

  const displayVal = value && typeof value === 'object' ? getLbl(value) : query

  return (
    <div className="position-relative" style={{ width: '100%' }}>
      <label className="form-label small text-black mb-1">{label}</label>
      <input
        type="text"
        className={`form-control${error ? ' is-invalid' : ''}`}
        value={displayVal}
        placeholder={`Search ${label}...`}
        onChange={(e) => {
          setQuery(e.target.value)
          if (!open) setOpen(true)
          if (!e.target.value) onChange(null)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        autoComplete="off"
      />
      {error && helperText && <div className="invalid-feedback">{helperText}</div>}
      {open && filtered.length > 0 && (
        <ul
          className="list-unstyled bg-white border rounded shadow-sm position-absolute w-100 mb-0"
          style={{ zIndex: 1000, maxHeight: 200, overflowY: 'auto', top: '100%' }}
        >
          {filtered.map((o) => (
            <li
              key={o.id}
              className="px-3 py-2 hover-blue"
              style={{ cursor: 'pointer', fontSize: '0.9rem' }}
              onMouseDown={() => handleSelect(o)}
            >
              {getLbl(o)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface CollegeOption { id: number; name: string }
interface SchoolOption { id: number; name: string }
interface BoardOption { id: number; name: string }
interface CourseOption { id: number; generalcourse?: { name: string } }

function DetailsFillSec() {
  const router = useRouter()
  const [colleges, setColleges] = useState<CollegeOption[]>([])
  const [schools, setSchools] = useState<SchoolOption[]>([])
  const [boards, setBoards] = useState<BoardOption[]>([])
  const [course, setCourse] = useState<CourseOption[]>([])
  const [collegeid, setCollegeid] = useState<number | null>(null)
  const [coursetype, setCoursetype] = useState<string | null>(null)
  const [showStep2, setShowStep2] = useState(false)
  const [datatype, setDatatype] = useState('college')
  const [activeSchema, setActiveSchema] = useState<z.ZodSchema>(collegeSchema as z.ZodSchema)

  // ── Fetch dropdown data ────────────────────────────────────────────────────

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    Promise.all([
      fetch(`${API}/api/website/colleges/get?page=1&size=10000&type=${datatype}`, { signal }).then((r) => r.ok ? r.json() : null),
      fetch(`${API}/api/website/schools/get?page=1&size=10000`, { signal }).then((r) => r.ok ? r.json() : null),
      fetch(`${API}/api/website/schoolboard/get?page=1&size=10000`, { signal }).then((r) => r.ok ? r.json() : null),
    ]).then(([c, s, b]) => {
      setColleges(c?.data ?? [])
      setSchools(s?.data ?? [])
      setBoards(b?.data ?? [])
    }).catch(() => {/* AbortError expected on cleanup */ })
    return () => controller.abort()
  }, [datatype])

  useEffect(() => {
    if (!collegeid || !coursetype) return
    const controller = new AbortController()
    fetch(`${API}/api/website/allcourses/get?page=1&size=10000&college_id=${collegeid}&course_type=${coursetype}`, {
      signal: controller.signal,
    })
      .then((r) => r.ok ? r.json() : null)
      .then((json) => setCourse(json?.data ?? []))
      .catch(() => {/* AbortError */ })
    return () => controller.abort()
  }, [collegeid, coursetype])

  // ── Form ──────────────────────────────────────────────────────────────────

  const defaultValues = {
    review_type: 'college',
    college_id: null as any,
    school_id: null as any,
    school_board_id: null as any,
    grade: '',
    course_type: '',
    course_id: null as any,
    passing_year: '',
    name: '',
    userrating: 0,
    content: '',
  }

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(activeSchema as any),
  })

  // Hydrate name from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('UserData')
      if (stored) {
        const parsed = JSON.parse(stored)
        reset({ ...defaultValues, name: parsed?.name ?? '' })
      }
    } catch {
      // ignore
    }
  }, [reset])

  const reviewType = watch('review_type')

  // Update schema based on step + reviewType
  useEffect(() => {
    if (showStep2) {
      setActiveSchema(step2Schema as z.ZodSchema)
    } else if (reviewType === 'college' || reviewType === 'university') {
      setActiveSchema(collegeSchema as z.ZodSchema)
    } else {
      setActiveSchema(schoolSchema as z.ZodSchema)
    }
  }, [showStep2, reviewType])

  const onSubmit = async (data: any) => {
    if (!showStep2) {
      setShowStep2(true)
      return
    }

    const formData = new FormData()
    formData.append('review_type', data.review_type)

    if (data.review_type === 'college' || data.review_type === 'university') {
      formData.append('college_id', String(data.college_id?.id ?? ''))
      formData.append('course_type', data.course_type ?? '')
      if (data.course_id?.id) formData.append('course_id', String(data.course_id.id))
    } else if (data.review_type === 'school') {
      formData.append('school_id', String(data.school_id?.id ?? ''))
      formData.append('school_board_id', String(data.school_board_id?.id ?? ''))
      formData.append('grade', data.grade ?? '')
    }

    try {
      const stored = localStorage.getItem('UserData')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed?.id) formData.append('user_id', String(JSON.parse(parsed.id)))
      }
    } catch {
      // ignore
    }

    formData.append('passing_year', data.passing_year)
    formData.append('name', data.name)
    formData.append('userrating', String(data.userrating))
    formData.append('content', data.content)

    try {
      const res = await fetch(`${API}/api/website/addreview/post`, { method: 'POST', body: formData })
      const json = await res.json()
      if (json?.status === 1) {
        toast.success(json.message)
        router.push('/')
        reset()
      } else {
        toast.error(json?.message ?? 'Submission failed')
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Please try again')
    }
  }

  // Years 2000–2024
  const years = Array.from({ length: 25 }, (_, i) => 2000 + i)

  return (
    <div className='container detailsFillSec'>
      <h5 className='text-center text-black pt-5 mb-4'>Please fill in the below details to write a review</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ── Step 1 ─────────────────────────────────────── */}
        <div className="row g-4">
          {/* Review Type */}
          <div className="col-12 col-sm-6">
            <Controller
              name="review_type"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div>
                  <label className="form-label small text-black mb-1" htmlFor="review_type">Select Review Type</label>
                  <select
                    id="review_type"
                    className={`form-select${errors.review_type ? ' is-invalid' : ''}`}
                    value={value}
                    onChange={(e) => {
                      setDatatype(e.target.value)
                      onChange(e.target.value)
                    }}
                  >
                    <option value="college">College</option>
                    <option value="university">University</option>
                    <option value="school">School</option>
                  </select>
                  {errors.review_type && (
                    <div className="invalid-feedback">{String(errors.review_type.message)}</div>
                  )}
                </div>
              )}
            />
          </div>

          {/* College/University fields */}
          {(reviewType === 'university' || reviewType === 'college') && (
            <>
              <div className="col-12 col-sm-6">
                <Controller
                  name="college_id"
                  control={control}
                  render={({ field }) => (
                    <NativeAutocomplete
                      options={colleges}
                      value={field.value}
                      label={reviewType === 'university' ? 'University' : 'College'}
                      error={Boolean(errors.college_id)}
                      helperText="Please Select College"
                      onChange={(v) => {
                        setCollegeid(v?.id ?? null)
                        setValue('course_id', null)
                        field.onChange(v)
                      }}
                    />
                  )}
                />
              </div>

              <div className="col-12 col-sm-6">
                <Controller
                  name="course_type"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div>
                      <label className="form-label small text-black mb-1" htmlFor="course_type">Select Degree</label>
                      <select
                        id="course_type"
                        className={`form-select${errors.course_type ? ' is-invalid' : ''}`}
                        value={value || ''}
                        onChange={(e) => {
                          const val = e.target.value
                          setCoursetype(val || null)
                          setValue('course_id', null)
                          onChange(val)
                        }}
                      >
                        <option value="">-- Select Degree --</option>
                        <option value="UG">UG</option>
                        <option value="PG">PG</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Doctorate">Doctorate</option>
                      </select>
                      {errors.course_type && (
                        <div className="invalid-feedback">{String(errors.course_type.message)}</div>
                      )}
                    </div>
                  )}
                />
              </div>

              {course && course.length > 0 && (
                <div className="col-12 col-sm-6">
                  <Controller
                    name="course_id"
                    control={control}
                    render={({ field }) => (
                      <NativeAutocomplete
                        options={course as any}
                        value={field.value}
                        label="Select Course"
                        error={Boolean(errors.course_id)}
                        helperText="Please Select Course"
                        getLabel={(o: any) => o?.generalcourse?.name || ''}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              )}
            </>
          )}

          {/* School fields */}
          {reviewType === 'school' && (
            <>
              <div className="col-12 col-sm-6">
                <Controller
                  name="school_id"
                  control={control}
                  render={({ field }) => (
                    <NativeAutocomplete
                      options={schools}
                      value={field.value}
                      label="Select School"
                      error={Boolean(errors.school_id)}
                      helperText="Please Select School"
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="col-12 col-sm-6">
                <Controller
                  name="school_board_id"
                  control={control}
                  render={({ field }) => (
                    <NativeAutocomplete
                      options={boards}
                      value={field.value}
                      label="Select School Board"
                      error={Boolean(errors.school_board_id)}
                      helperText="Please Select Board"
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="col-12 col-sm-6">
                <Controller
                  name="grade"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div>
                      <label className="form-label small text-black mb-1" htmlFor="grade">Select Grade</label>
                      <select
                        id="grade"
                        className={`form-select${errors.grade ? ' is-invalid' : ''}`}
                        value={value}
                        onChange={onChange}
                      >
                        <option value="">-- Select Grade --</option>
                        {['Nursery', 'LKG', 'UKG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
                          'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                      </select>
                      {errors.grade && (
                        <div className="invalid-feedback">{String(errors.grade.message)}</div>
                      )}
                    </div>
                  )}
                />
              </div>
            </>
          )}

          {/* Passing Year */}
          <div className="col-12 col-sm-6">
            <Controller
              name="passing_year"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div>
                  <label className="form-label small text-black mb-1" htmlFor="passing_year">Passing Year</label>
                  <select
                    id="passing_year"
                    className={`form-select${errors.passing_year ? ' is-invalid' : ''}`}
                    value={value}
                    onChange={onChange}
                  >
                    <option value="">-- Select Year --</option>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  {errors.passing_year && (
                    <div className="invalid-feedback">{String(errors.passing_year.message)}</div>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* ── Step 2 ─────────────────────────────────────── */}
        {showStep2 && (
          <div className="row g-4 pt-4">
            <div className="col-12 col-sm-6">
              <Controller
                name="name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div>
                    <label className="form-label small text-black mb-1" htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      className={`form-control${errors.name ? ' is-invalid' : ''}`}
                      value={value}
                      onChange={onChange}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{String(errors.name.message)}</div>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="col-12 col-sm-6">
              <Controller
                name="userrating"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div>
                    <label className="form-label small text-black mb-1">Your Rating</label>
                    <div>
                      <StarRating value={value} onChange={onChange} />
                    </div>
                    {errors.userrating && (
                      <span style={{ color: 'red', fontSize: '12px' }}>{String(errors.userrating.message)}</span>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="col-12">
              <Controller
                name="content"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div>
                    <label className="form-label small text-black mb-1" htmlFor="content">Your Review</label>
                    <textarea
                      id="content"
                      className={`form-control${errors.content ? ' is-invalid' : ''}`}
                      rows={4}
                      value={value}
                      onChange={onChange}
                      placeholder="Write your review here..."
                    />
                    {errors.content && (
                      <div className="invalid-feedback">{String(errors.content.message)}</div>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="col-12 text-center pt-2">
              <button type="submit" className="btn btn-primary px-5" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        )}

        {!showStep2 && (
          <div className="row pt-4">
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary px-3">
                Next
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default DetailsFillSec

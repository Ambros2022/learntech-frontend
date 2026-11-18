'use client'

import { useEffect } from 'react'
import {
  PROGRAMMES,
  UNIVERSITIES,
  SIU_NAME,
  BITS_NAME,
  MIN_MARKS,
  RULES,
  TOP_TIERS,
  COMPARE_DATA,
  Programme,
} from './DubaiScholarshipsData'

const API_URI = (process.env.NEXT_PUBLIC_API_URI || 'https://newapi.learntechww.com/').replace(/\/+$/, '')

const SVG_ICONS: Record<string, string> = {
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2"/>',
  pen: '<path d="M4 20l4-1 11-11-3-3L5 16l-1 4zM14 7l3 3"/>',
  biz: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5-10-5zM6 11v5c3 2 9 2 12 0v-5"/>',
  mind: '<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"/>',
  ok: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  go: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
}

function ico(k: string): string {
  const inner = SVG_ICONS[k] || SVG_ICONS.cap
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`
}

function renderCourseCard(x: Programme, i: number, colName: string): string {
  const m = /^(Up to\s)?(\d+%)\s*(.*)$/.exec(x.scholarship) || []
  const pre = m[1] || ''
  const big = m[2] || x.scholarship
  const post = m[3] || ''
  const elig = x.eligibility || `From ${MIN_MARKS[x.college][x.level]}% marks`
  let meta = ''

  if (x.duration) meta += `<div><span>${ico('clock')}Duration</span><b>${x.duration}</b></div>`
  if (x.fee) meta += `<div><span>${ico('cash')}Tuition fee</span><b>${x.fee}</b></div>`
  meta += `<div><span>${ico('ok')}Eligibility</span><b>${elig}</b></div>`

  return (
    `<article class="cs-card" style="--i:${Math.min(i, 8)}">` +
    `<div class="cs-top"><div class="cs-ic">${ico(x.icon)}</div><div class="cs-tt"><h4>${x.title}</h4><small>${x.degree}</small></div></div>` +
    `<div class="cs-sch"><span class="cs-lbl">Scholarship</span><div class="cs-val">` +
    (pre ? `<i>${pre.trim()}</i>` : '') +
    `<b>${big}</b>` +
    (post ? `<u>${post}</u>` : '') +
    `</div></div>` +
    `<div class="cs-meta">${meta}</div>` +
    `<a class="cs-cta open-popup" href="#apply" data-k="${x.college}" data-t="${x.title}" data-l="${x.level}" data-u="${colName}"><span>Enquire now</span><i>${ico('go')}</i></a>` +
    `</article>`
  )
}

export default function DubaiScholarshipsBehaviorsClient() {
  useEffect(() => {
    // 1. Header scroll state
    const hd = document.getElementById('hd')
    const onScroll = () => {
      if (hd) {
        hd.classList.toggle('solid', window.scrollY > 12)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // 2. Mobile navigation toggle & auto-close
    const mb = document.querySelector('.mb') as HTMLButtonElement | null
    const nv = document.getElementById('nv')
    const navContainer = nv?.parentElement

    const toggleNav = () => {
      if (!navContainer) return
      const isOpen = navContainer.classList.toggle('open')
      mb?.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
      document.body.style.overflow = isOpen ? 'hidden' : ''
    }

    const closeNav = () => {
      if (!navContainer || !navContainer.classList.contains('open')) return
      navContainer.classList.remove('open')
      mb?.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    }

    mb?.addEventListener('click', toggleNav)

    // Close when clicking nav links
    const navLinks = nv?.querySelectorAll('a')
    navLinks?.forEach((a) => {
      a.addEventListener('click', closeNav)
    })

    // 3. Marks Estimator Strip
    const inp = document.getElementById('me-in') as HTMLInputElement | null
    if (inp) {
      const MIN = 40
      const MAX = 100
      const FLOORS = 12
      const NS = 'http://www.w3.org/2000/svg'
      const svg = document.getElementById('me-tw')
      const v = document.getElementById('me-v')
      const p = document.getElementById('me-p')
      const pre = document.getElementById('me-pre')
      const n = document.getElementById('me-n')

      if (svg) {
        svg.innerHTML = ''
        const gap = 5
        const w = (400 - gap * (FLOORS - 1)) / FLOORS
        const rects: SVGRectElement[] = []

        for (let i = 0; i < FLOORS; i++) {
          const h = 16 + (30 * i) / (FLOORS - 1)
          const r = document.createElementNS(NS, 'rect')
          r.setAttribute('x', (i * (w + gap)).toFixed(2))
          r.setAttribute('y', (46 - h).toFixed(2))
          r.setAttribute('width', w.toFixed(2))
          r.setAttribute('height', h.toFixed(2))
          r.setAttribute('rx', '4')
          svg.appendChild(r)
          rects.push(r)
        }

        const getOffer = (m: number) => {
          if (m < 50) return 0
          if (m < 60) return 0.2
          if (m < 70) return 0.3
          if (m < 80) return 0.4
          return 0.5
        }

        const updateEstimator = () => {
          const m = +inp.value
          const pct = (m - MIN) / (MAX - MIN)
          const lit = Math.max(1, Math.round(pct * FLOORS))
          const o = getOffer(m)

          rects.forEach((x, k) => {
            x.setAttribute('class', k < lit ? 'on' : '')
          })
          if (v) v.textContent = String(m)
          if (p) p.textContent = o ? `${Math.round(o * 100)}%` : '–'
          if (pre) pre.style.display = o ? '' : 'none'
          if (n) {
            n.textContent = o
              ? 'scholarship possible at our partner universities (UG, indicative).'
              : 'Below the usual cut-off. A counsellor can still check other offers.'
          }
          inp.style.setProperty('--p', `${pct * 100}%`)
        }

        inp.addEventListener('input', updateEstimator)
        updateEstimator()
      }
    }

    // 4. By-Course Carousel
    const sec = document.getElementById('by-course')
    if (sec) {
      const sel = document.getElementById('cs-college') as HTMLSelectElement | null
      const track = document.getElementById('cs-track')
      const tabs = document.getElementById('cs-tabs')
      const prev = sec.querySelector('.cs-side-arr[data-d="-1"]') as HTMLButtonElement | null
      const next = sec.querySelector('.cs-side-arr[data-d="1"]') as HTMLButtonElement | null
      const state = { c: 's', l: '' }

      const rows = (c: string, l: string) =>
        PROGRAMMES.filter((x) => x.college === c && (!l || x.level === l))

      const updateArrows = () => {
        if (!track || !prev || !next) return
        prev.disabled = track.scrollLeft <= 2
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2
      }

      const renderCarousel = () => {
        if (!track || !tabs || !sel) return
        const colObj = UNIVERSITIES.find((c) => c.code === state.c) || UNIVERSITIES[0]
        const list = rows(state.c, state.l)

        sec.setAttribute('data-college', state.c)
        sel.value = state.c

        tabs.querySelectorAll('.cs-tab').forEach((b) => {
          b.setAttribute('aria-pressed', (b as HTMLElement).dataset.v === state.l ? 'true' : 'false')
        })

        tabs.querySelectorAll('em').forEach((e) => {
          const filterLevel = (e as HTMLElement).dataset.c === 'all' ? '' : (e as HTMLElement).dataset.c || ''
          e.textContent = String(rows(state.c, filterLevel).length)
        })

        track.innerHTML = list.length
          ? list.map((x, i) => renderCourseCard(x, i, colObj.name)).join('')
          : '<div class="cs-empty">No courses listed here yet. Ask a counsellor for the latest options.</div>'

        track.scrollLeft = 0
        requestAnimationFrame(updateArrows)
      }

      if (sel) {
        sel.innerHTML = UNIVERSITIES.map((c) => `<option value="${c.code}">${c.name}</option>`).join('')
        sel.value = state.c
        sel.addEventListener('change', () => {
          state.c = sel.value
          state.l = ''
          renderCarousel()
        })
      }

      tabs?.addEventListener('click', (e) => {
        const b = (e.target as HTMLElement).closest('.cs-tab') as HTMLElement | null
        if (!b) return
        state.l = b.dataset.v || ''
        renderCarousel()
      })

      if (prev && track) {
        prev.addEventListener('click', () => {
          const c = track.querySelector('.cs-card') as HTMLElement | null
          if (!c) return
          track.scrollBy({ left: -(c.offsetWidth + 20), behavior: 'smooth' })
        })
      }

      if (next && track) {
        next.addEventListener('click', () => {
          const c = track.querySelector('.cs-card') as HTMLElement | null
          if (!c) return
          track.scrollBy({ left: c.offsetWidth + 20, behavior: 'smooth' })
        })
      }

      track?.addEventListener('scroll', updateArrows)
      window.addEventListener('resize', updateArrows)
      renderCarousel()

      // Autoplay
      const DELAY = 2000
      let timer: ReturnType<typeof setInterval> | null = null
      let paused = false
      let inView = false
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const step = () => {
        if (!track) return
        const c = track.querySelector('.cs-card') as HTMLElement | null
        if (!c) return
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
          track.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          track.scrollBy({ left: c.offsetWidth + 20, behavior: 'smooth' })
        }
      }

      const stopAutoplay = () => {
        if (timer) {
          clearInterval(timer)
          timer = null
        }
      }

      const startAutoplay = () => {
        stopAutoplay()
        if (reduceMotion || paused || !inView || document.hidden) return
        timer = setInterval(step, DELAY)
      }

      const wrap = sec.querySelector('.cs-carousel')
      wrap?.addEventListener('mouseenter', () => {
        paused = true
        stopAutoplay()
      })
      wrap?.addEventListener('mouseleave', () => {
        paused = false
        startAutoplay()
      })
      track?.addEventListener(
        'touchstart',
        () => {
          paused = true
          stopAutoplay()
        },
        { passive: true }
      )
      track?.addEventListener(
        'touchend',
        () => {
          setTimeout(() => {
            paused = false
            startAutoplay()
          }, 2500)
        },
        { passive: true }
      )

      const ioCarousel = new IntersectionObserver(
        (entries) => {
          inView = entries[0].isIntersecting
          startAutoplay()
        },
        { threshold: 0.25 }
      )
      ioCarousel.observe(sec)
      document.addEventListener('visibilitychange', startAutoplay)

      // Course click pre-fills contact form
      track?.addEventListener('click', (e) => {
        const a = (e.target as HTMLElement).closest('.cs-cta') as HTMLElement | null
        if (!a) return

        const univEl = document.getElementById('cf-university') as HTMLSelectElement | null
        const courseEl = document.getElementById('cf-course') as HTMLSelectElement | null

        if (univEl) {
          const target = a.dataset.k === 's' ? 'Symbiosis' : 'BITS'
          for (let i = 0; i < univEl.options.length; i++) {
            if (univEl.options[i].text.indexOf(target) > -1) {
              univEl.selectedIndex = i
              break
            }
          }
          univEl.dispatchEvent(new Event('change'))
        }

        if (courseEl) {
          for (let j = 0; j < courseEl.options.length; j++) {
            if (courseEl.options[j].text.indexOf(a.dataset.t || '') === 0) {
              courseEl.selectedIndex = j
              break
            }
          }
        }
      })
    }

    // 5. Eligibility Predictor
    const EL = document.getElementById('em') as HTMLInputElement | null
    const LV = document.getElementById('el') as HTMLSelectElement | null
    const EC = document.getElementById('ec') as HTMLSelectElement | null
    const RES = document.getElementById('res')
    const EML = document.getElementById('eml')

    if (EL && LV && EC && RES) {
      const fillCourses = (level: 'UG' | 'PG') => {
        let h = '<option value="">Select Course</option>'
        UNIVERSITIES.forEach((c) => {
          h += `<optgroup label="${c.name}">`
          PROGRAMMES.forEach((x) => {
            if (x.college === c.code && x.level === level) {
              h += `<option value="${c.code}|${x.title}">${x.title}</option>`
            }
          })
          h += '</optgroup>'
        })
        EC.innerHTML = h
      }

      const renderPredictor = () => {
        const lv = LV.value as 'UG' | 'PG'
        const cs = EC.value
        const mk = parseFloat(EL.value)
        const has = !isNaN(mk)
        let out = ''

        ;[SIU_NAME, BITS_NAME].forEach((n) => {
          if (cs && (cs.charAt(0) === 's') !== (n === SIU_NAME)) return

          const r = RULES[n][lv]
          let t: [number, string, number] | null = null
          let pc: string | number = ''
          let tag = ''
          let txt = ''

          if (has) {
            for (let i = 0; i < r.tiers.length; i++) {
              if (mk >= r.tiers[i][0]) {
                t = r.tiers[i]
                break
              }
            }
          }

          if (!has) {
            tag = '<span class="tg up">Top offer</span>'
            txt = TOP_TIERS[n][lv][1]
            pc = TOP_TIERS[n][lv][0]
          } else if (t) {
            tag = '<span class="tg ok">Likely eligible</span>'
            txt =
              t[1] +
              (r.fee ? `. About AED ${Math.round(r.fee * t[2]).toLocaleString()} saved in year 1` : '')
            pc = Math.round(t[2] * 100)
          } else {
            tag = '<span class="tg rv">Needs review</span>'
            txt = 'Below the usual cut-off. Other offers may still be possible.'
            pc = '–'
          }

          const pn = parseFloat(String(pc))
          const mw = isNaN(pn) ? 0 : Math.min(100, Math.round((pn / 50) * 100))

          out +=
            `<div class="ur"><div><b>${n}${tag}</b><p>${txt}</p></div>` +
            `<div class="pc">${pc}${pc !== '–' ? '<small>%</small>' : ''}</div>` +
            `<div class="meter"><i style="--p:${mw}%"></i></div></div>`
        })

        RES.innerHTML = out
      }

      LV.addEventListener('change', () => {
        fillCourses(LV.value as 'UG' | 'PG')
        if (EML) {
          EML.textContent = LV.value === 'UG' ? 'Class 12' : "your bachelor's degree"
        }
        renderPredictor()
      })
      EC.addEventListener('change', renderPredictor)
      EL.addEventListener('input', renderPredictor)

      fillCourses('UG')
      renderPredictor()
    }

    // 6. Compare Colleges
    const el1 = document.getElementById('cmp-col-1') as HTMLSelectElement | null
    const el2 = document.getElementById('cmp-col-2') as HTMLSelectElement | null

    if (el1 && el2) {
      const setText = (id: string, content: string) => {
        const e = document.getElementById(id)
        if (e) e.innerHTML = content
      }

      const setBanner = (id: string, image: string) => {
        const b = document.getElementById(id)
        if (!b) return
        b.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("${encodeURI(
          image
        )}")`
      }

      const updateCollege = (d: typeof COMPARE_DATA['s'], i: number) => {
        setText(`name-badge-${i}`, d.badge)
        setText(`name-title-${i}`, d.name)
        setText(`name-loc-${i}`, d.loc)
        setText(`ug-big-${i}`, d.ug[0])
        setText(`ug-desc-${i}`, d.ug[1])
        setText(`pg-big-${i}`, d.pg[0])
        setText(`pg-desc-${i}`, d.pg[1])
        setText(`marks-${i}`, d.marks)
        setText(`courses-${i}`, d.courses)
        setText(`pick-${i}`, d.pick)
        setBanner(`banner-${i}`, d.banner)
      }

      const updateCompare = () => {
        const code1 = el1.value as 's' | 'b'
        const code2 = el2.value as 's' | 'b'
        if (COMPARE_DATA[code1]) updateCollege(COMPARE_DATA[code1], 1)
        if (COMPARE_DATA[code2]) updateCollege(COMPARE_DATA[code2], 2)
      }

      el1.addEventListener('change', updateCompare)
      el2.addEventListener('change', updateCompare)
      updateCompare()
    }

    // 7. FAQ Single-Open Accordion
    const faqDetails = document.querySelectorAll('.fq-r details')
    faqDetails.forEach((d) => {
      d.addEventListener('toggle', () => {
        const detail = d as HTMLDetailsElement
        if (!detail.open) return
        faqDetails.forEach((other) => {
          if (other !== detail) (other as HTMLDetailsElement).removeAttribute('open')
        })
      })
    })

    // 8. Contact Form (#apply)
    const contactForm = document.getElementById('contact-form') as HTMLFormElement | null
    if (contactForm) {
      const courseSel = document.getElementById('cf-course') as HTMLSelectElement | null
      const universitySel = document.getElementById('cf-university') as HTMLSelectElement | null

      const fillCourseForm = () => {
        if (!universitySel || !courseSel) return
        const selected = universitySel.value
        let h = '<option value="">Select Course</option>'

        let colleges = UNIVERSITIES.filter(
          (c) => selected.indexOf(c.name) > -1 || c.name.indexOf(selected) > -1
        )
        if (!colleges.length) colleges = UNIVERSITIES

        colleges.forEach((c) => {
          h += `<optgroup label="${c.name}">`
          PROGRAMMES.forEach((x) => {
            if (x.college === c.code) {
              h += `<option value="${x.title}">${x.title}</option>`
            }
          })
          h += '</optgroup>'
        })
        courseSel.innerHTML = h
      }

      fillCourseForm()
      universitySel?.addEventListener('change', fillCourseForm)

      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const nameInput = document.getElementById('cf-name') as HTMLInputElement | null
        const emailInput = document.getElementById('cf-email') as HTMLInputElement | null
        const phoneInput = document.getElementById('cf-phone') as HTMLInputElement | null
        const levelInput = document.getElementById('cf-level') as HTMLInputElement | null

        const name = nameInput?.value.trim() || ''
        const email = emailInput?.value.trim() || ''
        const phone = phoneInput?.value.trim() || ''
        const city = levelInput?.value.trim() || ''
        const university = universitySel?.value || ''
        const course = courseSel?.value || ''

        if (!name || !email || !phone) {
          alert('Please fill in all required fields.')
          return
        }

        try {
          const fd = new FormData()
          fd.append('name', name)
          fd.append('email', email)
          fd.append('contact_number', phone.startsWith('+') ? phone : `+91-${phone}`)
          fd.append('location', city)
          fd.append('course_in_mind', course)
          fd.append(
            'description',
            `Scholarship enquiry for ${course || 'General'} at ${university || 'UAE'} from ${city || 'UAE/India'}`
          )
          fd.append('current_url', window.location.href)
          fd.append('Source', 'Google Ads')
          fd.append('SourceCampaign', 'dubai-university-scholarships')

          const res = await fetch(`${API_URI}/api/website/landingpage/enquiry`, {
            method: 'POST',
            body: fd,
          })

          if (res.ok) {
            contactForm.classList.add('done')
          } else {
            alert('Could not send your details. Please call +971 50 495 5123 and we will help you.')
          }
        } catch {
          contactForm.classList.add('done')
        }
      })
    }

    // 9. Scroll Reveal Observer
    if ('IntersectionObserver' in window) {
      const ioScroll = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              ioScroll.unobserve(e.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      document.querySelectorAll('.college-card, .cd, .st, .cs-card').forEach((el) => {
        el.classList.add('sr')
        ioScroll.observe(el)
      })
    }

    // 10. Edge Contact Floating Button
    const edgeBtn = document.getElementById('edge-contact')
    if (edgeBtn) {
      edgeBtn.classList.add('is-ready')
      const toggleEdge = () => {
        edgeBtn.classList.toggle('is-on', window.scrollY > 180)
      }
      toggleEdge()
      window.addEventListener('scroll', toggleEdge, { passive: true })
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.body.style.overflow = ''
    }
  }, [])

  return null
}

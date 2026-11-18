'use client'

import { useEffect } from 'react'
import { TESTIMONIALS } from './StudyInDubaiData'

export default function StudyInDubaiBehaviorsClient() {
  useEffect(() => {
    // 1. Mobile navigation
    const navToggle = document.getElementById('navToggle')
    const mainNav = document.getElementById('mainNav')

    const setNavOpen = (open: boolean) => {
      if (!mainNav || !navToggle) return
      mainNav.classList.toggle('open', open)
      navToggle.setAttribute('aria-expanded', String(open))
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    }

    const handleToggleClick = () => {
      if (!mainNav) return
      setNavOpen(!mainNav.classList.contains('open'))
    }

    const handleNavClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a')) {
        setNavOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false)
    }

    const mql = window.matchMedia('(min-width: 768px)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) setNavOpen(false)
    }

    navToggle?.addEventListener('click', handleToggleClick)
    mainNav?.addEventListener('click', handleNavClick)
    window.addEventListener('keydown', handleKeyDown)
    mql.addEventListener('change', handleMediaChange)

    // 2. Carousel helper: arrows, drag, touch
    const setupCarousel = (track: HTMLElement, prev: HTMLButtonElement, next: HTMLButtonElement) => {
      const step = () => {
        const first = track.firstElementChild as HTMLElement | null
        return (first ? first.offsetWidth : 300) + 20
      }
      const upd = () => {
        prev.disabled = track.scrollLeft <= 2
        next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2
      }
      const onPrev = () => track.scrollBy({ left: -step(), behavior: 'smooth' })
      const onNext = () => track.scrollBy({ left: step(), behavior: 'smooth' })

      prev.addEventListener('click', onPrev)
      next.addEventListener('click', onNext)
      track.addEventListener('scroll', upd, { passive: true })
      window.addEventListener('resize', upd)

      let down = false
      let moved = false
      let sx = 0
      let sl = 0

      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        down = true
        moved = false
        sx = e.clientX
        sl = track.scrollLeft
      }
      const onPointerMove = (e: PointerEvent) => {
        if (!down) return
        const d = e.clientX - sx
        if (Math.abs(d) > 5) {
          moved = true
          track.classList.add('drag')
        }
        if (moved) track.scrollLeft = sl - d
      }
      const onPointerUp = () => {
        if (!down) return
        down = false
        track.classList.remove('drag')
      }
      const onClick = (e: MouseEvent) => {
        if (moved) {
          e.preventDefault()
          e.stopPropagation()
          moved = false
        }
      }

      track.addEventListener('pointerdown', onPointerDown)
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
      track.addEventListener('click', onClick, true)

      upd()

      return {
        reset: () => {
          track.scrollLeft = 0
          upd()
        },
        cleanup: () => {
          prev.removeEventListener('click', onPrev)
          next.removeEventListener('click', onNext)
          track.removeEventListener('scroll', upd)
          window.removeEventListener('resize', upd)
          track.removeEventListener('pointerdown', onPointerDown)
          window.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('pointerup', onPointerUp)
          track.removeEventListener('click', onClick, true)
        },
      }
    }

    // 3. Autoplay helper
    const noop = () => {
      // no-op for reduced motion
    }

    const setupAutoplay = (root: HTMLElement, tick: () => void, ms: number, zones: HTMLElement[]) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return { restart: noop, cleanup: noop }
      }
      let t: ReturnType<typeof setInterval> | null = null
      let hold = false
      let vis = false

      const stop = () => {
        if (t) {
          clearInterval(t)
          t = null
        }
      }
      const start = () => {
        stop()
        if (!hold && vis && !document.hidden) {
          t = setInterval(tick, ms)
        }
      }
      const pause = () => {
        hold = true
        stop()
      }
      const resume = () => {
        hold = false
        start()
      }

      const cleanups: (() => void)[] = []
      zones.forEach((z) => {
        z.addEventListener('mouseenter', pause)
        z.addEventListener('mouseleave', resume)
        const onTouchStart = () => pause()
        const onTouchEnd = () => setTimeout(resume, 3000)
        z.addEventListener('touchstart', onTouchStart, { passive: true })
        z.addEventListener('touchend', onTouchEnd, { passive: true })
        cleanups.push(() => {
          z.removeEventListener('mouseenter', pause)
          z.removeEventListener('mouseleave', resume)
          z.removeEventListener('touchstart', onTouchStart)
          z.removeEventListener('touchend', onTouchEnd)
        })
      })

      const observer = new IntersectionObserver(
        (entries) => {
          vis = entries[0]?.isIntersecting ?? false
          start()
        },
        { threshold: 0.15 }
      )
      observer.observe(root)

      const onVisChange = () => start()
      document.addEventListener('visibilitychange', onVisChange)

      return {
        restart: start,
        cleanup: () => {
          stop()
          observer.disconnect()
          document.removeEventListener('visibilitychange', onVisChange)
          cleanups.forEach((c) => c())
        },
      }
    }

    // 4. Programmes track filtering & carousel
    const courseTrack = document.getElementById('courseTrack') as HTMLElement | null
    const prevBtn = document.getElementById('prev') as HTMLButtonElement | null
    const nextBtn = document.getElementById('next') as HTMLButtonElement | null
    const courseCount = document.getElementById('courseCount')
    const coursesSection = document.getElementById('courses')

    let carouselControl: { reset: () => void; cleanup: () => void } | null = null
    let autoplayControl: { restart: () => void; cleanup: () => void } | null = null

    if (courseTrack && prevBtn && nextBtn) {
      carouselControl = setupCarousel(courseTrack, prevBtn, nextBtn)

      // Filter state
      const state = { college: 'all', level: 'all' }

      const applyFilters = () => {
        const cards = courseTrack.querySelectorAll<HTMLElement>('.pc')
        let count = 0
        cards.forEach((card) => {
          const cCol = card.getAttribute('data-college')
          const cLv = card.getAttribute('data-level')
          const colMatch = state.college === 'all' || cCol === state.college
          const lvMatch = state.level === 'all' || cLv === state.level
          if (colMatch && lvMatch) {
            card.style.display = ''
            count++
          } else {
            card.style.display = 'none'
          }
        })

        if (courseCount) {
          courseCount.textContent = `${count} programme${count === 1 ? '' : 's'}`
        }

        // Handle empty message
        let emptyEl = courseTrack.querySelector('.empty') as HTMLElement | null
        if (count === 0) {
          if (!emptyEl) {
            emptyEl = document.createElement('div')
            emptyEl.className = 'empty'
            emptyEl.textContent = 'No courses match these filters. Try another college or level.'
            courseTrack.appendChild(emptyEl)
          }
          emptyEl.style.display = ''
        } else if (emptyEl) {
          emptyEl.style.display = 'none'
        }

        carouselControl?.reset()
      }

      // Initial filter apply (defaults to Symbiosis Dubai)
      applyFilters()

      // Bind filter buttons
      const filterGroups = document.querySelectorAll<HTMLElement>('[data-filter]')
      const handleFilterClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const pill = target.closest<HTMLElement>('.pill')
        if (!pill) return
        const group = pill.closest<HTMLElement>('[data-filter]')
        if (!group) return
        const filterType = group.dataset.filter as 'college' | 'level'
        state[filterType] = pill.dataset.value || 'all'

        group.querySelectorAll('.pill').forEach((p) => {
          p.setAttribute('aria-pressed', String(p === pill))
        })
        applyFilters()
      }

      filterGroups.forEach((g) => g.addEventListener('click', handleFilterClick))

      if (coursesSection) {
        const ctl = coursesSection.querySelector<HTMLElement>('.ctl')
        const zones = ctl ? [courseTrack, ctl] : [courseTrack]
        autoplayControl = setupAutoplay(
          coursesSection,
          () => {
            const mx = courseTrack.scrollWidth - courseTrack.clientWidth
            if (mx <= 2) return
            if (courseTrack.scrollLeft >= mx - 2) {
              courseTrack.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
              nextBtn.click()
            }
          },
          3500,
          zones
        )
      }
    }

    // 5. Testimonials tabs & carousel
    const tvStage = document.getElementById('tvStage')
    const tvTabs = document.getElementById('tvTabs')
    const sprev = document.getElementById('sprev')
    const snext = document.getElementById('snext')
    const tsNow = document.getElementById('tsNow')
    const tsAll = document.getElementById('tsAll')
    const storiesSection = document.getElementById('stories')

    let storiesAutoplay: { restart: () => void; cleanup: () => void } | null = null

    if (tvStage && tvTabs && TESTIMONIALS.length > 0) {
      let cur = 0
      const pad = (n: number) => String(n).padStart(2, '0')
      if (tsAll) tsAll.textContent = pad(TESTIMONIALS.length)

      const fill = () => {
        const t = TESTIMONIALS[cur]
        if (!t) return
        const ini = t.name
          .split(/\s+/)
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
        const av = t.photo ? `<img src="${t.photo}" alt="" loading="lazy">` : ini

        tvStage.innerHTML = `
          <span class="tv__mark"><svg aria-hidden="true"><use href="#i-quote"/></svg></span>
          <blockquote>${t.quote}</blockquote>
          <div class="tv__who">
            <span class="tv__av">${av}</span>
            <div>
              <b>${t.name}</b>
              <small>${t.programme}, ${t.college}</small>
            </div>
          </div>
        `

        tvTabs.querySelectorAll('.tt').forEach((b, i) => {
          b.setAttribute('aria-selected', String(i === cur))
        })
        if (tsNow) tsNow.textContent = pad(cur + 1)
        tvStage.classList.remove('out')
      }

      const go = (i: number) => {
        cur = (i + TESTIMONIALS.length) % TESTIMONIALS.length
        tvStage.classList.add('out')
        setTimeout(fill, 220)
        storiesAutoplay?.restart()
      }

      sprev?.addEventListener('click', () => go(cur - 1))
      snext?.addEventListener('click', () => go(cur + 1))

      const handleTabClick = (e: MouseEvent) => {
        const b = (e.target as HTMLElement).closest<HTMLElement>('.tt')
        if (b && b.dataset.i) {
          go(+b.dataset.i)
        }
      }
      tvTabs.addEventListener('click', handleTabClick)

      // Initial fill
      fill()

      if (storiesSection) {
        const tvWrap = storiesSection.querySelector<HTMLElement>('.tv-wrap')
        const arrs = storiesSection.querySelector<HTMLElement>('.arrs')
        const zones = [tvWrap, arrs].filter(Boolean) as HTMLElement[]
        storiesAutoplay = setupAutoplay(storiesSection, () => go(cur + 1), 6000, zones)
      }
    }

    // 6. Scroll reveal
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduceMotion && 'IntersectionObserver' in window) {
      document.documentElement.classList.add('js')
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('is-in')
              revealObserver.unobserve(en.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
      )
      document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
    }

    // Cleanup
    return () => {
      navToggle?.removeEventListener('click', handleToggleClick)
      mainNav?.removeEventListener('click', handleNavClick)
      window.removeEventListener('keydown', handleKeyDown)
      mql.removeEventListener('change', handleMediaChange)
      carouselControl?.cleanup()
      autoplayControl?.cleanup()
      storiesAutoplay?.cleanup()
    }
  }, [])

  return null
}

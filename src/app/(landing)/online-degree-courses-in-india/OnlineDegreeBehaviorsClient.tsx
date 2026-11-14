'use client'

import { useEffect } from 'react'

/**
 * Attaches the design's interactions (ported from the handoff script.js) to the
 * server-rendered markup. Renders nothing — all content stays in the SSR HTML.
 */
export default function OnlineDegreeBehaviorsClient() {
  useEffect(() => {
    const ac = new AbortController()
    const signal = ac.signal
    const timers: number[] = []
    const intervals: number[] = []
    const observers: (IntersectionObserver | ResizeObserver)[] = []
    const rafs = new Set<number>()
    let disposed = false

    const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s)
    const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
      Array.from(r.querySelectorAll<T>(s))
    const raf = (fn: FrameRequestCallback) => {
      const id = requestAnimationFrame((t) => {
        rafs.delete(id)
        if (!disposed) fn(t)
      })
      rafs.add(id)
      return id
    }
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms))
    }
    const every = (fn: () => void, ms: number) => {
      intervals.push(window.setInterval(fn, ms))
    }
    const io = (cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) => {
      const o = new IntersectionObserver(cb, opts)
      observers.push(o)
      return o
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ---------- IN-PAGE LINKS: scroll without writing #hash to the URL ----------
       Links keep real href="#id" (crawlable, works without JS); offset under the
       fixed navbar comes from `scroll-margin-top` on section[id] in the CSS module. */
    ;(() => {
      const scrollToId = (id: string) => {
        const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'
        if (id === 'top') {
          window.scrollTo({ top: 0, behavior })
          return true
        }
        const el = document.getElementById(id)
        if (!el) return false
        el.scrollIntoView({ behavior, block: 'start' })
        return true
      }

      document.addEventListener(
        'click',
        (e) => {
          if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
          const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]')
          if (!a) return
          const id = decodeURIComponent(a.getAttribute('href')!.slice(1))
          // enquiry CTAs (#cta, #get-free-counselling) have no target section — the popup handler owns them
          if (id && scrollToId(id)) e.preventDefault()
        },
        { signal }
      )

      // Arrived with /online-degree-courses-in-india#section — honour it, then clean the URL
      const initial = decodeURIComponent(window.location.hash.slice(1))
      if (initial) {
        // jump once hydration has settled, then drop the hash (parent effects still read it during mount)
        const go = () =>
          later(() => {
            scrollToId(initial)
            window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
          }, 100)
        if (document.readyState === 'complete') go()
        else window.addEventListener('load', go, { once: true, signal })
      }
    })()

    /* ---------- NAVBAR (scroll hide/show, mobile menu, scroll-spy, indicator) ---------- */
    ;(() => {
      const nv = $('#nv')
      const links = $('#nvLinks')
      const ind = $('#nvInd')
      const btn = $('#nvToggle')
      const scrim = $('#nvScrim')
      if (!nv || !links || !btn || !ind) return
      const items = $$<HTMLAnchorElement>('.nv-link', links)
      const desktop = window.matchMedia('(min-width:1021px)')
      let lastY = window.scrollY
      let ticking = false
      let active: HTMLElement | null = null
      let lockUntil = 0
      let idle = 0

      const isOpen = () => nv.classList.contains('is-open')
      const setOpen = (open: boolean) => {
        nv.classList.toggle('is-open', open)
        btn.setAttribute('aria-expanded', String(open))
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
        document.documentElement.classList.toggle('nv-lock', open)
        if (open) nv.classList.remove('is-hidden')
      }
      btn.addEventListener('click', () => setOpen(!isOpen()), { signal })
      scrim?.addEventListener('click', () => setOpen(false), { signal })
      document.addEventListener(
        'keydown',
        (e) => {
          if (e.key === 'Escape' && isOpen()) {
            setOpen(false)
            btn.focus()
          }
        },
        { signal }
      )
      $$('.nv-panel a', nv).forEach((a) => a.addEventListener('click', () => setOpen(false), { signal }))
      desktop.addEventListener(
        'change',
        () => {
          setOpen(false)
          nv.classList.remove('is-hidden')
          rest()
        },
        { signal }
      )

      const place = (el: HTMLElement) => {
        ind.style.setProperty('--ix', `${el.offsetLeft}px`)
        ind.style.setProperty('--iw', `${el.offsetWidth}px`)
        links.classList.add('has-ind')
      }
      const rest = () => {
        if (active) place(active)
        else links.classList.remove('has-ind')
      }

      items.forEach((l) => {
        l.addEventListener('mouseenter', () => desktop.matches && place(l), { signal })
        l.addEventListener('focus', () => desktop.matches && place(l), { signal })
      })
      links.addEventListener('mouseleave', rest, { signal })
      links.addEventListener('focusout', rest, { signal })
      window.addEventListener('resize', rest, { signal })
      document.fonts?.ready.then(() => !disposed && rest())

      const onScroll = () => {
        const y = window.scrollY
        nv.classList.toggle('is-scrolled', y > 12)
        if (!isOpen()) {
          if (y > lastY + 4 && y > 120) nv.classList.add('is-hidden')
          else if (y < lastY - 4 || y <= 120) nv.classList.remove('is-hidden')
        }
        clearTimeout(idle)
        idle = window.setTimeout(() => nv.classList.remove('is-hidden'), 250)
        timers.push(idle)
        lastY = y
        ticking = false
      }
      window.addEventListener(
        'scroll',
        () => {
          if (!ticking) {
            ticking = true
            raf(onScroll)
          }
        },
        { passive: true, signal }
      )
      onScroll()

      const spyIds = new Set(items.map((a) => a.dataset.spy))
      const mark = (id: string | null) => {
        const next = items.find((a) => a.dataset.spy === id) || null
        if (next === active) return
        items.forEach((a) => a.classList.toggle('is-active', a === next))
        active = next
        if (!(desktop.matches && links.matches(':hover'))) rest()
      }
      items.forEach((a) =>
        a.addEventListener(
          'click',
          () => {
            lockUntil = Date.now() + 1000
            mark(a.dataset.spy || null)
          },
          { signal }
        )
      )
      const spyIO = io(
        (es) =>
          es.forEach((e) => {
            if (!e.isIntersecting || Date.now() < lockUntil) return
            mark(spyIds.has(e.target.id) ? e.target.id : null)
          }),
        { rootMargin: '-45% 0px -50% 0px' }
      )
      $$('section[id]').forEach((s) => spyIO.observe(s))
    })()

    /* ---------- REVEAL ON SCROLL ---------- */
    const revIO = io(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis', 'in')
            revIO.unobserve(e.target)
          }
        }),
      { threshold: 0.15 }
    )
    $$('.rv, #steps').forEach((el) => revIO.observe(el))

    /* ---------- HERO: changing word + parallax ---------- */
    ;(() => {
      const words = ['Programme', 'Degree', 'Specialisation', 'Certification']
      let idx = 0
      const cw = $('#cw')
      if (cw) {
        every(() => {
          cw.style.opacity = '0'
          cw.style.transform = 'translateY(8px)'
          later(() => {
            idx = (idx + 1) % words.length
            cw.textContent = words[idx]
            cw.style.opacity = '1'
            cw.style.transform = 'none'
          }, 250)
        }, 3200)
      }

      const hero = $('#hero')
      if (!hero || reduce) return
      let mx = 0
      let my = 0
      let cx = 0
      let cy = 0
      hero.addEventListener(
        'mousemove',
        (e) => {
          const r = hero.getBoundingClientRect()
          mx = ((e.clientX - r.left) / r.width - 0.5) * 2
          my = ((e.clientY - r.top) / r.height - 0.5) * 2
        },
        { signal }
      )
      hero.addEventListener('mouseleave', () => (mx = my = 0), { signal })
      const p = () => {
        cx += (mx * 25 - cx) * 0.06
        cy += (my * 16 - cy) * 0.06
        hero.style.setProperty('--mx', `${cx}px`)
        hero.style.setProperty('--my', `${cy}px`)
        raf(p)
      }
      p()
    })()

    /* ---------- AI COURSES (card reveal + motherboard canvas) ---------- */
    ;(() => {
      const sec = $('#aiCourses')
      if (!sec) return
      const cards = $$('.aic-card', sec)
      const grid = $('.aic-grid', sec)
      if (grid) {
        const cardIO = io(
          (en) => {
            if (en[0].isIntersecting) {
              cards.forEach((c) => c.classList.add('in'))
              cardIO.disconnect()
            }
          },
          { threshold: 0.15 }
        )
        cardIO.observe(grid)
      }
      cards.forEach((c) =>
        c.addEventListener(
          'pointermove',
          (e) => {
            const r = c.getBoundingClientRect()
            c.style.setProperty('--mx', `${e.clientX - r.left}px`)
            c.style.setProperty('--my', `${e.clientY - r.top}px`)
          },
          { signal }
        )
      )

      const cv = $<HTMLCanvasElement>('.aic-bg', sec)
      const ctx = cv?.getContext('2d')
      if (!cv || !ctx) return

      type Pt = { x: number; y: number }
      type Trace = { pts: Pt[]; cum: number[]; length: number; glow: number; hot: boolean }
      type Pulse = { tr: Trace; dist: number; speed: number; tail: number; rev: boolean }
      const GRID = 50
      const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
      let W = 0
      let H = 0
      let traces: Trace[] = []
      let chips: { x: number; y: number; s: number }[] = []
      let pulses: Pulse[] = []
      let loopId = 0
      let vis = true
      let last = 0
      const mouse = { x: -999, y: -999 }
      const rand = (a: number, b: number) => a + Math.random() * (b - a)

      const pointAt = (tr: Trace, dist: number): Pt => {
        dist = Math.max(0, Math.min(tr.length, dist))
        let i = 1
        while (i < tr.cum.length - 1 && tr.cum[i] < dist) i++
        const a = tr.pts[i - 1]
        const b = tr.pts[i]
        const t = (dist - tr.cum[i - 1]) / (tr.cum[i] - tr.cum[i - 1] || 1)
        return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
      }
      const spawn = (tr?: Trace) => {
        tr = tr || traces[(Math.random() * traces.length) | 0]
        if (tr) pulses.push({ tr, dist: 0, speed: rand(120, 210), tail: rand(60, 110), rev: Math.random() < 0.5 })
      }

      const draw = (dt: number) => {
        ctx.clearRect(0, 0, W, H)
        ctx.lineCap = ctx.lineJoin = 'round'

        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(127,162,255,.24)'
        ctx.beginPath()
        chips.forEach((c) => {
          ctx.rect(c.x, c.y, c.s, c.s)
          ctx.rect(c.x + 8, c.y + 8, c.s - 16, c.s - 16)
          for (let k = 8; k < c.s - 4; k += 8) {
            ctx.moveTo(c.x + k, c.y)
            ctx.lineTo(c.x + k, c.y - 6)
            ctx.moveTo(c.x + k, c.y + c.s)
            ctx.lineTo(c.x + k, c.y + c.s + 6)
            ctx.moveTo(c.x, c.y + k)
            ctx.lineTo(c.x - 6, c.y + k)
            ctx.moveTo(c.x + c.s, c.y + k)
            ctx.lineTo(c.x + c.s + 6, c.y + k)
          }
        })
        ctx.stroke()

        traces.forEach((tr) => {
          let near = 0
          if (mouse.x > -900) {
            tr.pts.forEach((p) => {
              const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
              if (d < 170) near = Math.max(near, 1 - d / 170)
            })
          }
          tr.glow = Math.max(tr.glow * 0.94, near)
          ctx.strokeStyle = `rgba(${tr.hot ? '255,106,85' : '127,162,255'},${(0.13 + tr.glow * 0.55).toFixed(3)})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          tr.pts.forEach((p, j) => (j ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
          ctx.stroke()
          ctx.lineWidth = 1.2
          ;[tr.pts[0], tr.pts[tr.pts.length - 1]].forEach((p) => {
            ctx.beginPath()
            ctx.arc(p.x, p.y, 3.5, 0, 6.2832)
            ctx.stroke()
          })
        })

        if (mouse.x > -900 && pulses.length < 24 && Math.random() < 0.06) {
          const lit = traces.filter((t) => t.glow > 0.4)
          if (lit.length) spawn(lit[(Math.random() * lit.length) | 0])
        }

        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i]
          const tr = p.tr
          p.dist += p.speed * dt
          if (p.dist > tr.length + p.tail) {
            tr.glow = 1
            pulses.splice(i, 1)
            spawn()
            continue
          }
          const col = tr.hot ? '255,106,85' : '140,175,255'
          const head = Math.min(p.dist, tr.length)
          const pos = (d: number) => pointAt(tr, p.rev ? tr.length - d : d)
          for (let k = 0; k < 10; k++) {
            const d0 = Math.max(0, head - (p.tail * (k + 1)) / 10)
            const d1 = Math.max(0, head - (p.tail * k) / 10)
            if (d1 <= 0) break
            const a = pos(d0)
            const b = pos(d1)
            ctx.strokeStyle = `rgba(${col},${((1 - k / 10) * 0.9).toFixed(3)})`
            ctx.lineWidth = 1.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
          if (p.dist <= tr.length) {
            const h = pos(p.dist)
            const g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 7)
            g.addColorStop(0, `rgba(${col},.8)`)
            g.addColorStop(1, `rgba(${col},0)`)
            ctx.fillStyle = g
            ctx.fillRect(h.x - 7, h.y - 7, 14, 14)
          }
        }
      }

      const build = () => {
        const r = sec.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        W = r.width
        H = r.height
        cv.width = W * dpr
        cv.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        const cols = Math.floor(W / GRID)
        const rows = Math.floor(H / GRID)
        traces = []
        chips = []
        pulses = []

        for (let i = 0; i < Math.max(2, Math.round(W / 520)); i++) {
          chips.push({
            x: (1 + Math.floor(Math.random() * Math.max(1, cols - 5))) * GRID,
            y: (1 + Math.floor(Math.random() * Math.max(1, rows - 5))) * GRID,
            s: Math.floor(rand(2, 3.5)) * GRID,
          })
        }

        const count = Math.round((W * H) / 9500)
        for (let n = 0; n < count; n++) {
          let cx = Math.floor(Math.random() * cols)
          let cy = Math.floor(Math.random() * rows)
          let d = Math.floor(Math.random() * 8)
          const pts: Pt[] = [{ x: cx * GRID, y: cy * GRID }]
          const segs = Math.floor(rand(3, 7))
          for (let s = 0; s < segs; s++) {
            const len = Math.floor(rand(2, 6))
            const nx = cx + DIRS[d][0] * len
            const ny = cy + DIRS[d][1] * len
            if (nx < 0 || ny < 0 || nx > cols || ny > rows) break
            cx = nx
            cy = ny
            pts.push({ x: cx * GRID, y: cy * GRID })
            d = (d + (Math.random() < 0.5 ? 1 : 7)) % 8
          }
          if (pts.length < 3) continue
          const cum = [0]
          let L = 0
          for (let i = 1; i < pts.length; i++) {
            L += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
            cum.push(L)
          }
          traces.push({ pts, cum, length: L, glow: 0, hot: Math.random() < 0.2 })
        }
        for (let i = 0; i < Math.min(16, Math.round(traces.length / 4)); i++) spawn()
        draw(0)
      }

      const loop = (now: number) => {
        if (!vis) {
          loopId = 0
          return
        }
        draw(Math.min((now - last) / 1000, 0.05))
        last = now
        loopId = raf(loop)
      }
      const start = () => {
        if (vis && !loopId && !reduce) {
          last = performance.now()
          loopId = raf(loop)
        }
      }

      sec.addEventListener(
        'pointermove',
        (e) => {
          const r = sec.getBoundingClientRect()
          mouse.x = e.clientX - r.left
          mouse.y = e.clientY - r.top
        },
        { signal }
      )
      sec.addEventListener('pointerleave', () => (mouse.x = mouse.y = -999), { signal })

      const ro = new ResizeObserver(build)
      ro.observe(sec)
      observers.push(ro)
      build()

      if (!reduce) {
        io(
          (en) => {
            vis = en[0].isIntersecting && !document.hidden
            start()
          },
          { threshold: 0 }
        ).observe(sec)
        document.addEventListener(
          'visibilitychange',
          () => {
            vis = !document.hidden
            start()
          },
          { signal }
        )
      }
    })()

    /* ---------- PROGRAMMES SLIDER (filter, drag, arrows, autoplay) ---------- */
    ;(() => {
      const sec = $('#browse')
      const vp = $('#pcT')
      const rail = $('#pcR')
      const ctl = $('#pcC')
      if (!sec || !vp || !rail) return

      let cur = 0
      let target = 0
      let loopId = 0
      let down = false
      let moved = false
      let suppress = false
      let sx = 0
      let st = 0
      let lx = 0
      let lt = 0
      let vel = 0
      let pid = 0
      let hov = false
      let foc = false
      let inView = true
      let stamp = 0

      const cards = () => Array.from(rail.children as HTMLCollectionOf<HTMLElement>).filter((c) => c.style.display !== 'none')
      const max = () => Math.max(0, rail.scrollWidth - rail.clientWidth)
      const clamp = (v: number) => Math.min(max(), Math.max(0, v))
      const snaps = () => {
        const m = max()
        const out: number[] = []
        cards().forEach((c) => {
          const x = Math.round(Math.min(c.offsetLeft, m))
          if (!out.includes(x)) out.push(x)
        })
        return out.length ? out : [0]
      }
      const nearest = (x: number) => {
        let bi = 0
        let bd = Infinity
        snaps().forEach((v, i) => {
          const d = Math.abs(v - x)
          if (d < bd) {
            bd = d
            bi = i
          }
        })
        return bi
      }
      const rubber = (v: number) => {
        const m = max()
        if (v < 0) return v * 0.35
        if (v > m) return m + (v - m) * 0.35
        return v
      }
      const tick = () => {
        const diff = target - cur
        cur += reduce ? diff : diff * 0.1
        if (Math.abs(target - cur) < 0.15) cur = target
        rail.style.transform = `translate3d(${(-cur).toFixed(2)}px,0,0)`
        loopId = cur !== target || down ? raf(tick) : 0
      }
      const kick = () => {
        if (!loopId) loopId = raf(tick)
      }
      const go = (dir: number) => {
        const s = snaps()
        let i = nearest(target) + dir
        if (i >= s.length) i = 0
        if (i < 0) i = s.length - 1
        target = s[i]
        kick()
      }

      vp.addEventListener(
        'pointerdown',
        (e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return
          down = true
          moved = false
          sx = lx = e.clientX
          st = target
          lt = performance.now()
          vel = 0
          pid = e.pointerId
        },
        { signal }
      )
      vp.addEventListener(
        'pointermove',
        (e) => {
          if (!down) return
          const dx = e.clientX - sx
          if (!moved && Math.abs(dx) > 5) {
            moved = true
            vp.classList.add('drag')
            try {
              vp.setPointerCapture(pid)
            } catch {}
          }
          if (!moved) return
          const now = performance.now()
          vel = 0.8 * vel + 0.2 * ((e.clientX - lx) / Math.max(1, now - lt))
          lx = e.clientX
          lt = now
          target = rubber(st - dx)
          kick()
        },
        { signal }
      )
      const end = () => {
        if (!down) return
        down = false
        if (moved) {
          suppress = true
          later(() => (suppress = false), 0)
          target = snaps()[nearest(clamp(target - vel * 260))]
          vp.classList.remove('drag')
        }
        stamp = Date.now()
        kick()
      }
      vp.addEventListener('pointerup', end, { signal })
      vp.addEventListener('pointercancel', end, { signal })
      vp.addEventListener(
        'click',
        (e) => {
          if (suppress) {
            e.preventDefault()
            e.stopPropagation()
          }
        },
        { capture: true, signal }
      )
      vp.addEventListener('dragstart', (e) => e.preventDefault(), { signal })

      $('#pcP')?.addEventListener('click', () => ((stamp = Date.now()), go(-1)), { signal })
      $('#pcN')?.addEventListener('click', () => ((stamp = Date.now()), go(1)), { signal })

      vp.addEventListener('mouseenter', () => (hov = true), { signal })
      vp.addEventListener('mouseleave', () => (hov = false), { signal })
      vp.addEventListener('focusin', () => (foc = true), { signal })
      vp.addEventListener('focusout', () => (foc = false), { signal })
      io((en) => (inView = en[0].isIntersecting), { threshold: 0.2 }).observe(sec)
      every(() => {
        if (reduce || hov || foc || down || !inView || document.hidden || max() === 0) return
        if (Date.now() - stamp < 2500) return
        go(1)
      }, 3800)

      const refresh = () => {
        ctl?.classList.toggle('off', max() === 0)
        target = snaps()[nearest(clamp(target))]
        kick()
      }
      const filter = (f: string) => {
        Array.from(rail.children as HTMLCollectionOf<HTMLElement>).forEach((c) => {
          c.style.display = f === 'all' || c.dataset.cat === f ? '' : 'none'
        })
        cur = target = 0
        rail.style.transform = 'translate3d(0,0,0)'
        refresh()
      }
      const unreveal = () =>
        cards().forEach((c) => {
          c.style.setProperty('--d', '0ms')
          c.classList.remove('in')
        })
      const reveal = () => {
        void rail.offsetWidth
        cards().forEach((c, i) => {
          c.style.setProperty('--d', `${Math.min(i, 6) * 70}ms`)
          c.classList.add('in')
        })
      }

      const chips = $$('#pcF .chip')
      chips.forEach((chip) =>
        chip.addEventListener(
          'click',
          () => {
            if (chip.classList.contains('on')) return
            chips.forEach((c) => {
              c.classList.remove('on')
              c.setAttribute('aria-selected', 'false')
            })
            chip.classList.add('on')
            chip.setAttribute('aria-selected', 'true')
            stamp = Date.now()
            unreveal()
            later(() => {
              filter(chip.dataset.f || 'all')
              reveal()
            }, 300)
          },
          { signal }
        )
      )

      window.addEventListener('resize', refresh, { signal })
      window.addEventListener('load', refresh, { signal })
      refresh()

      if (reduce) {
        reveal()
      } else {
        const rio = io(
          (en) => {
            if (en[0].isIntersecting) {
              reveal()
              rio.disconnect()
            }
          },
          { threshold: 0.15 }
        )
        rio.observe(sec)
      }
    })()

    /* ---------- COURSE FINDER (dropdowns + recommendation) ---------- */
    ;(() => {
      const root = $('[data-course-finder]')
      if (!root) return

      const splitWords = (el: HTMLElement, text: string) => {
        el.textContent = ''
        const words = text.split(' ')
        words.forEach((word, i) => {
          const mask = document.createElement('span')
          mask.className = 'course-finder__word'
          const inner = document.createElement('span')
          inner.className = 'course-finder__word-inner'
          inner.style.setProperty('--i', String(i))
          inner.textContent = word
          mask.appendChild(inner)
          el.appendChild(mask)
          if (i < words.length - 1) el.appendChild(document.createTextNode(' '))
        })
      }

      $$('.course-finder__result-name', root).forEach((el) => {
        el.dataset.text = el.dataset.text || el.textContent?.trim() || ''
      })
      const results = $$('.course-finder__result', root)
      const state: Record<string, string> = { field: 'business', level: 'graduate' }

      const showResult = (animate: boolean) => {
        results.forEach((item) => {
          const match = item.dataset.field === state.field && item.dataset.level === state.level
          item.hidden = !match
          item.classList.remove('is-active')
          if (match && animate) {
            const name = $('.course-finder__result-name', item)
            if (name) {
              splitWords(name, name.dataset.text || '')
              void item.offsetWidth
              item.classList.add('is-active')
            }
          }
        })
      }
      showResult(false)

      type Dropdown = { isOpen: () => boolean; close: (returnFocus: boolean) => void }
      const dropdowns: Dropdown[] = []

      $$('[data-dropdown]', root).forEach((el) => {
        const key = el.dataset.dropdown as string
        const trigger = $('.course-finder__trigger', el)
        const menu = $('.course-finder__menu', el)
        const label = $('.course-finder__trigger-label', el)
        if (!trigger || !menu || !label) return
        const options = $$('[role="option"]', menu)
        let selected = options.findIndex((o) => o.getAttribute('aria-selected') === 'true')
        let active = selected

        const setActive = (i: number) => {
          active = (i + options.length) % options.length
          options.forEach((o, n) => o.classList.toggle('is-active', n === active))
          menu.setAttribute('aria-activedescendant', options[active].id)
        }
        const self: Dropdown = {
          isOpen: () => el.classList.contains('is-open'),
          close: (returnFocus) => {
            if (!self.isOpen()) return
            el.classList.remove('is-open')
            trigger.setAttribute('aria-expanded', 'false')
            options.forEach((o) => o.classList.remove('is-active'))
            if (returnFocus) trigger.focus({ preventScroll: true })
          },
        }
        const open = () => {
          dropdowns.forEach((d) => d !== self && d.close(false))
          el.classList.remove('is-end')
          el.classList.add('is-open')
          if (trigger.getBoundingClientRect().left + menu.offsetWidth > window.innerWidth - 12) el.classList.add('is-end')
          trigger.setAttribute('aria-expanded', 'true')
          setActive(selected)
          menu.focus({ preventScroll: true })
        }
        const choose = (i: number) => {
          const changed = i !== selected
          selected = i
          options.forEach((o, n) => o.setAttribute('aria-selected', n === i ? 'true' : 'false'))
          if (changed) {
            label.textContent = $('.course-finder__option-text', options[i])?.textContent || ''
            state[key] = options[i].dataset.value || ''
            showResult(true)
          }
          self.close(true)
        }

        trigger.addEventListener('click', () => (self.isOpen() ? self.close(true) : open()), { signal })
        trigger.addEventListener(
          'keydown',
          (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault()
              open()
            }
          },
          { signal }
        )
        menu.addEventListener(
          'keydown',
          (e) => {
            switch (e.key) {
              case 'ArrowDown':
                e.preventDefault()
                setActive(active + 1)
                break
              case 'ArrowUp':
                e.preventDefault()
                setActive(active - 1)
                break
              case 'Home':
                e.preventDefault()
                setActive(0)
                break
              case 'End':
                e.preventDefault()
                setActive(options.length - 1)
                break
              case 'Enter':
              case ' ':
                e.preventDefault()
                choose(active)
                break
              case 'Escape':
                e.preventDefault()
                self.close(true)
                break
              case 'Tab':
                self.close(false)
                break
            }
          },
          { signal }
        )
        options.forEach((o, i) => {
          o.addEventListener('pointermove', () => active !== i && setActive(i), { signal })
          o.addEventListener('click', () => choose(i), { signal })
        })
        dropdowns.push(self)
      })

      document.addEventListener(
        'pointerdown',
        (e) => {
          if ((e.target as Element).closest?.('[data-dropdown]')) return
          dropdowns.forEach((d) => d.isOpen() && d.close(false))
        },
        { signal }
      )

      if (reduce) {
        root.classList.add('is-visible')
      } else {
        root.classList.add('is-armed')
        const cfIO = io(
          (entries) =>
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                root.classList.add('is-visible')
                cfIO.disconnect()
              }
            }),
          { threshold: 0.25 }
        )
        cfIO.observe(root)
      }
    })()

    /* ---------- FAQ ACCORDION ---------- */
    $$('.fq').forEach((q) => {
      const p = $('.fqa', q)
      const btn = $('.fqb', q)
      if (!btn || !p) return
      btn.addEventListener(
        'click',
        () => {
          $$('.fq.open').forEach((o) => {
            if (o === q) return
            o.classList.remove('open')
            $('.fqb', o)?.setAttribute('aria-expanded', 'false')
            const pa = $('.fqa', o)
            if (pa) pa.style.maxHeight = ''
          })
          const isOpen = q.classList.toggle('open')
          btn.setAttribute('aria-expanded', String(isOpen))
          p.style.maxHeight = isOpen ? `${p.scrollHeight}px` : ''
        },
        { signal }
      )
    })

    /* ---------- PROGRAMME FILTER CHIPS (arrows + drag) ---------- */
    $$('.chips').forEach((c) => {
      let down = false
      let moved = false
      let sx = 0
      let sl = 0
      const w = c.parentElement
      const l = w?.classList.contains('chw') ? $('.chn.l', w) : null
      const r = w?.classList.contains('chw') ? $('.chn.r', w) : null
      l?.addEventListener('click', () => c.scrollBy({ left: -c.clientWidth * 0.6, behavior: 'smooth' }), { signal })
      r?.addEventListener('click', () => c.scrollBy({ left: c.clientWidth * 0.6, behavior: 'smooth' }), { signal })

      const upd = () => {
        if (!l || !r) return
        l.hidden = c.scrollLeft <= 4
        r.hidden = c.scrollLeft + c.clientWidth >= c.scrollWidth - 4
      }
      c.addEventListener('scroll', upd, { passive: true, signal })
      window.addEventListener('resize', upd, { signal })
      window.addEventListener('load', upd, { signal })
      const ro = new ResizeObserver(upd)
      ro.observe(c)
      observers.push(ro)
      document.fonts?.ready.then(() => !disposed && upd())
      upd()

      c.addEventListener(
        'pointerdown',
        (e) => {
          if (e.pointerType !== 'mouse') return
          down = true
          moved = false
          sx = e.clientX
          sl = c.scrollLeft
        },
        { signal }
      )
      window.addEventListener(
        'pointermove',
        (e) => {
          if (!down) return
          const dx = e.clientX - sx
          if (Math.abs(dx) > 4) {
            moved = true
            c.classList.add('drag')
          }
          if (moved) c.scrollLeft = sl - dx
        },
        { signal }
      )
      window.addEventListener(
        'pointerup',
        () => {
          if (!down) return
          down = false
          later(() => c.classList.remove('drag'), 0)
        },
        { signal }
      )
      c.addEventListener(
        'click',
        (e) => {
          if (moved) {
            e.stopPropagation()
            e.preventDefault()
            moved = false
            return
          }
          const chip = (e.target as Element).closest<HTMLElement>('.chip')
          if (chip && c.scrollWidth > c.clientWidth) {
            c.scrollTo({ left: chip.offsetLeft - (c.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
          }
        },
        { capture: true, signal }
      )
    })

    /* ---------- TESTIMONIALS MARQUEE (drag + inertia) ---------- */
    ;(() => {
      const m = $('#tmq')
      const tr = $('#ttk')
      if (!m || !tr) return
      const orig = $$('.tm:not([data-c])', tr)
      if (!orig.length) return
      const SPEED = reduce ? 0 : 45
      let set = 0
      let x = 0
      let inertia = 0
      let hover = false
      let down = false
      let moved = false
      let sx = 0
      let startX = 0
      let lx = 0
      let lt = 0
      let vel = 0
      let pid = 0
      let last = performance.now()

      const wrap = () => {
        if (set) x = ((x % set) + set) % set
      }
      const build = () => {
        $$('[data-c]', tr).forEach((e) => e.remove())
        const g = parseFloat(getComputedStyle(tr).columnGap) || 0
        set = orig.reduce((a, e) => a + e.offsetWidth + g, 0)
        let tot = set
        let i = 0
        while (tot < m.offsetWidth + set) {
          const c = orig[i % orig.length].cloneNode(true) as HTMLElement
          c.setAttribute('data-c', '')
          c.setAttribute('aria-hidden', 'true')
          tr.appendChild(c)
          tot += c.offsetWidth + g
          i++
        }
        wrap()
      }
      const tick = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now
        if (!down) {
          if (!hover) x += SPEED * dt
          x += inertia * dt
          inertia *= Math.pow(0.92, dt * 60)
          if (Math.abs(inertia) < 1) inertia = 0
          wrap()
        }
        tr.style.transform = `translate3d(${(-x).toFixed(2)}px,0,0)`
        raf(tick)
      }

      m.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && (hover = true), { signal })
      m.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && (hover = false), { signal })
      m.addEventListener(
        'pointerdown',
        (e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return
          down = true
          moved = false
          inertia = 0
          vel = 0
          sx = lx = e.clientX
          startX = x
          lt = performance.now()
          pid = e.pointerId
        },
        { signal }
      )
      m.addEventListener(
        'pointermove',
        (e) => {
          if (!down) return
          const dx = e.clientX - sx
          if (!moved && Math.abs(dx) > 5) {
            moved = true
            m.classList.add('drag')
            try {
              m.setPointerCapture(pid)
            } catch {}
          }
          if (!moved) return
          const now = performance.now()
          vel = 0.8 * vel + 0.2 * ((e.clientX - lx) / Math.max(1, now - lt)) * 1000
          lx = e.clientX
          lt = now
          x = startX - dx
          wrap()
        },
        { signal }
      )
      const end = () => {
        if (!down) return
        down = false
        if (moved) {
          inertia = -vel
          m.classList.remove('drag')
        }
      }
      m.addEventListener('pointerup', end, { signal })
      m.addEventListener('pointercancel', end, { signal })
      m.addEventListener('dragstart', (e) => e.preventDefault(), { signal })

      let rt = 0
      window.addEventListener(
        'resize',
        () => {
          clearTimeout(rt)
          rt = window.setTimeout(build, 150)
          timers.push(rt)
        },
        { signal }
      )
      document.fonts?.ready.then(() => !disposed && build())
      build()
      raf(tick)
    })()

    /* ---------- HOW IT WORKS STACK ---------- */
    ;(() => {
      const stack = $('#hwStack')
      if (!stack) return
      const cards = $$('.hw-card', stack)
      const nav = $$('#hwNav li')
      const bar = $('#hwBar')
      let ticking = false
      const clamp = (v: number) => Math.max(0, Math.min(1, v))
      const update = () => {
        ticking = false
        const n = cards.length
        const p = [0]
        let active = 0
        let total = 0
        for (let j = 1; j < n; j++) {
          const top = parseFloat(getComputedStyle(cards[j]).top) || 0
          p[j] = clamp(1 - (cards[j].getBoundingClientRect().top - top) / cards[j - 1].offsetHeight)
          total += p[j]
          if (p[j] > 0.5) active = j
        }
        for (let i = 0; i < n; i++) {
          let d = 0
          for (let k = i + 1; k < n; k++) d += p[k]
          if (!reduce) {
            cards[i].style.transform = `scale(${(1 - d * 0.045).toFixed(4)})`
            cards[i].style.setProperty('--dim', Math.min(d * 0.14, 0.45).toFixed(3))
          }
          if (cards[i].getBoundingClientRect().top < window.innerHeight * 0.75) cards[i].classList.add('live')
        }
        nav.forEach((li, x) => li.classList.toggle('on', x === active))
        if (bar) bar.style.transform = `scaleX(${(total / (n - 1)).toFixed(3)})`
      }
      const req = () => {
        if (!ticking) {
          ticking = true
          raf(update)
        }
      }
      window.addEventListener('scroll', req, { passive: true, signal })
      window.addEventListener('resize', req, { signal })
      update()
    })()

    /* ---------- BACK TO TOP ---------- */
    ;(() => {
      const btt = $('#backToTop')
      if (!btt) return
      const onScroll = () => btt.classList.toggle('show', window.scrollY > 300)
      window.addEventListener('scroll', onScroll, { passive: true, signal })
      btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }), { signal })
      onScroll()
    })()

    /* ---------- FOOTER "ONLINE" WORD ---------- */
    ;(() => {
      const on = $('#onl')
      const ftr = $('.ftr')
      if (!on || !ftr) return
      if (reduce) {
        on.classList.add('in')
        return
      }
      const show = () => {
        on.classList.remove('rs')
        raf(() => raf(() => on.classList.add('in')))
      }
      const hide = () => {
        on.classList.add('rs')
        on.classList.remove('in')
      }
      io((es) => es.forEach((e) => (e.isIntersecting ? show() : hide())), { threshold: 0.25 }).observe(ftr)
    })()

    /* ---------- REDUCED MOTION: pause SVG SMIL ---------- */
    if (reduce) $$<SVGSVGElement>('.cta-banner__svg').forEach((svg) => svg.pauseAnimations?.())

    return () => {
      disposed = true
      ac.abort()
      timers.forEach(clearTimeout)
      intervals.forEach(clearInterval)
      observers.forEach((o) => o.disconnect())
      rafs.forEach(cancelAnimationFrame)
      document.documentElement.classList.remove('nv-lock')
    }
  }, [])

  return null
}

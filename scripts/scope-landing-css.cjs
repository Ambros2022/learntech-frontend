#!/usr/bin/env node
/**
 * Convert a design handoff stylesheet into a scoped CSS Module for a landing page.
 * See HTML-LANDING-PAGE-CONVERSION.md §5.
 *
 * Usage:
 *   node scripts/scope-landing-css.cjs <style.css> <Out.module.css> --root=<rootClass> --slug=<slug> [options]
 *
 * Options:
 *   --root=fooRoot          class on the page wrapper div (stands in for <html>/<body>)        [required]
 *   --slug=my-page          assets live in public/images/<slug>/ ; relative url()s are rewritten [required]
 *   --html=index.html       design HTML; if it has no <main>, rules targeting `main` are dropped
 *   --important=RE:props    add !important to `props` in rules whose selector matches RE (repeatable)
 *                           default: --important='\bselect\b:color,background,background-color,border-color'
 *   --no-font-size-important  keep font-size declarations as-is (default adds !important)
 *
 * What it does (and why):
 *   - `:root`/`html`/`body`         → `.root` (the wrapper div)
 *   - `html.x` / `body.x` (state)   → `:global(html.x)` (classes JS toggles on the document)
 *   - everything else               → `:where(.root) :global(<selector>)`
 *       :where() adds zero specificity, so the design cascades against Bootstrap exactly as in the
 *       handoff (e.g. Bootstrap's `h1 { margin-bottom }` still beats the design's `* { margin: 0 }`).
 *   - pseudo-elements stay outside :global()
 *   - recurses into @media / @supports / @container / @layer blocks
 *   - font-size → !important         (globals.css forces `p { font-size: 16px !important }`)
 *   - "Poppins"                     → var(--font-poppins), "Poppins" (next/font may hash the family name)
 *   - prepends the `p` font-size reset and appends the host-isolation block (see doc §5.3)
 */
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const pos = args.filter((a) => !a.startsWith('--'))
const opt = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`))
  return hit ? hit.slice(name.length + 3) : undefined
}
const [input, output] = pos
const ROOT_CLASS = opt('root')
const SLUG = opt('slug')
if (!input || !output || !ROOT_CLASS || !SLUG) {
  console.error('usage: node scripts/scope-landing-css.cjs <in.css> <out.module.css> --root=<class> --slug=<slug> [--html=index.html]')
  process.exit(1)
}
const ROOT = `.${ROOT_CLASS.replace(/^\./, '')}`
const WHERE = `:where(${ROOT})`
const htmlFile = opt('html')
const dropMain = htmlFile ? !/<main[\s>]/i.test(fs.readFileSync(htmlFile, 'utf8')) : false
const fontSizeImportant = !args.includes('--no-font-size-important')
const importantRules = args
  .filter((a) => a.startsWith('--important='))
  .map((a) => a.slice('--important='.length))
if (!importantRules.length) importantRules.push('\\bselect\\b:color,background,background-color,border-color')
const IMPORTANT = importantRules.map((r) => {
  const i = r.lastIndexOf(':')
  return { re: new RegExp(r.slice(0, i)), props: r.slice(i + 1).split(',') }
})

const warnings = []
let css = fs.readFileSync(input, 'utf8').replace(/\r\n/g, '\n')
css = css.replace(/\/\*[\s\S]*?\*\//g, '') // comments inside :global() break the parser

// ---------- tokenizer ----------
function readBlock(s, open) {
  let d = 0
  for (let i = open; i < s.length; i++) {
    if (s[i] === '{') d++
    else if (s[i] === '}' && --d === 0) return { inner: s.slice(open + 1, i), end: i + 1 }
  }
  return { inner: s.slice(open + 1), end: s.length }
}
function split(s) {
  const out = []
  let i = 0
  while (i < s.length) {
    const c = s[i]
    if (/\s/.test(c) || c === '}' || c === ';') { i++; continue }
    if (c === '@') {
      let j = i
      while (j < s.length && s[j] !== '{' && s[j] !== ';') j++
      const pre = s.slice(i, j).trim()
      if (s[j] === ';') { out.push({ t: 'stmt', text: pre + ';' }); i = j + 1; continue }
      const { inner, end } = readBlock(s, j)
      out.push({ t: 'at', pre, inner })
      i = end
      continue
    }
    let j = i
    while (j < s.length && s[j] !== '{' && s[j] !== '}') j++
    if (s[j] === '{') {
      const { inner, end } = readBlock(s, j)
      out.push({ t: 'rule', sel: s.slice(i, j).trim(), inner })
      i = end
    } else i = j
  }
  return out
}

// ---------- selectors ----------
// split on commas not inside parentheses
function splitList(sel) {
  const parts = []
  let depth = 0, cur = ''
  for (const ch of sel) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ',' && depth === 0) { parts.push(cur); cur = '' } else cur += ch
  }
  parts.push(cur)
  return parts.map((p) => p.trim()).filter(Boolean)
}
const PSEUDO_ELEMENT = /(::?(?:before|after|placeholder|selection|marker|backdrop|file-selector-button|-webkit-[\w-]+|-moz-[\w-]+)(?:\([^)]*\))?)$/

function scopePart(p) {
  p = p.replace(/\s+/g, ' ').trim()
  if (/^(:root|html|body)$/.test(p)) return ROOT
  if (/(^|[\s>+~])main\b/.test(p)) {
    if (dropMain) return null
    warnings.push(`selector depends on <main>: "${p}" (pass --html so unused ones are dropped)`)
  }
  // leading document-level compound: html.x, body.x, html[data-x], body:has(...)
  const lead = p.match(/^(html|body)([.[:#][^\s>+~]*)?(?:\s*[>+~]?\s*)(.*)$/)
  if (lead && /^(html|body)($|[.[:#\s>+~])/.test(p)) {
    const [, el, qual, rest] = lead
    const docPart = qual ? `:global(${el}${qual})` : ''
    if (!rest) return docPart || ROOT
    const inner = scopePart(rest)
    if (inner === null) return null
    return docPart ? `${docPart} ${inner}` : inner
  }
  if (p.startsWith('::')) return `${WHERE} :global(*)${p}`
  let tail = ''
  const m = p.match(PSEUDO_ELEMENT)
  if (m) {
    const before = p.slice(0, -m[0].length).trim()
    if (!before) return `${WHERE} :global(*)${m[1]}`
    if (!/[>+~]$/.test(before)) { tail = m[1]; p = before }
  }
  return `${WHERE} :global(${p})${tail}`
}
function scopeSelector(sel) {
  const parts = splitList(sel).map(scopePart).filter((x) => x !== null)
  return parts.length ? parts.join(',\n') : null
}

// ---------- declarations ----------
function rewriteUrls(body) {
  return body.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (all, q, u) => {
    if (/^(data:|https?:|\/\/|\/|#)/.test(u)) return all
    return `url("/images/${SLUG}/${u.replace(/^\.\//, '')}")`
  })
}
function addImportant(body, props) {
  const re = new RegExp(`(^|[;{\\s])(${props.map((x) => x.replace(/-/g, '\\-')).join('|')})(\\s*:\\s*)([^;{}]+?)(\\s*)(;|$)`, 'g')
  return body.replace(re, (all, pre, prop, colon, val, ws, end) =>
    /!important/.test(val) ? all : `${pre}${prop}${colon}${val} !important${end}`
  )
}
function rewriteDecls(sel, body) {
  body = rewriteUrls(body)
  body = body.replace(/(["'])Poppins\1/g, 'var(--font-poppins), $1Poppins$1')
  if (fontSizeImportant) body = addImportant(body, ['font-size'])
  for (const { re, props } of IMPORTANT) if (re.test(sel)) body = addImportant(body, props)
  return body.trim()
}

// ---------- render ----------
const RECURSE = /^@(media|supports|container|layer|document)\b/i
function render(items) {
  return items
    .map((it) => {
      if (it.t === 'stmt') return it.text
      if (it.t === 'at') {
        if (RECURSE.test(it.pre)) {
          const inner = render(split(it.inner))
          return inner.trim() ? `${it.pre} {\n${inner}\n}` : ''
        }
        // @keyframes, @font-face, @property … — leave selectors alone, still fix urls
        return `${it.pre} {\n${rewriteUrls(it.inner).trim()}\n}`
      }
      const sel = scopeSelector(it.sel)
      if (!sel) return ''
      return `${sel} {\n  ${rewriteDecls(sel, it.inner)}\n}`
    })
    .filter(Boolean)
    .join('\n\n')
}

const HEADER = `/* Generated by scripts/scope-landing-css.cjs from the design handoff — see HTML-LANDING-PAGE-CONVERSION.md */

/* globals.css forces \`p { font-size: 16px !important }\`; restore inheritance so the design's
   own font sizes (made !important by the generator) apply */
${WHERE} :global(p) {
  font-size: inherit !important;
}

`
const FOOTER = `

/* ── Host-app isolation (HTML-LANDING-PAGE-CONVERSION.md §5.3) ───────────────── */

/* clip (not hidden): a wrapper with overflow hidden becomes a scroll container and breaks position: sticky */
${ROOT} {
  overflow-x: clip;
}

/* globals.css hides every <header> below 768px */
${ROOT} :global(header) {
  display: block !important;
}

/* scroll-padding-top on <html> does nothing on a wrapper div — offset anchor targets under the fixed navbar */
${WHERE} :global(section[id]) {
  scroll-margin-top: var(--landing-nav-offset, 84px);
}
`

fs.writeFileSync(output, HEADER + render(split(css)) + FOOTER, 'utf8')
console.log(`✔ ${path.relative(process.cwd(), output)} written (root ${ROOT}, assets /images/${SLUG}/)`)
if (dropMain) console.log('  dropped rules targeting <main> (the design HTML has none)')
for (const w of [...new Set(warnings)]) console.warn('  ⚠ ' + w)

import NativeShareButton from './NativeShareButton'

// bootstrap-icons 1.10.x lacks bi-twitter-x — inline the X logo
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
  </svg>
)

type Props = {
  url: string
  title?: string
  /** 'row' = icon + label buttons (default). 'icons' = icon-only (modal/compact). */
  variant?: 'row' | 'icons'
  className?: string
}

export function buildShareLinks(url: string, title?: string) {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title || '')
  return [
    { key: 'linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: 'bi-linkedin', label: 'Share', cls: 'btn-primary' },
    { key: 'twitter', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icon: 'bi-twitter-x', label: 'Tweet', cls: 'btn-dark text-white' },
    { key: 'facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: 'bi-facebook', label: 'Share', cls: 'btn-primary text-white' },
    { key: 'pinterest', href: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}`, icon: 'bi-pinterest', label: 'Pin', cls: 'btn-danger text-white' },
    { key: 'whatsapp', href: `https://wa.me/?text=${t}%20${u}`, icon: 'bi-whatsapp', label: 'Share', cls: 'btn-success text-white' },
  ]
}

export default function ShareButtons({ url, title, variant = 'row', className }: Props) {
  const links = buildShareLinks(url, title)
  const iconOnly = variant === 'icons'

  return (
    <div className={className ?? 'd-flex justify-content-md-start justify-content-center gap-3 flex-wrap mb-3'}>
      {links.map(link => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${link.cls}`}
          aria-label={`${link.label} on ${link.key}`}
        >
          {link.key === 'twitter' ? (
            <XIcon className={iconOnly ? '' : 'me-2'} />
          ) : (
            <i className={`bi ${iconOnly ? '' : 'me-2'} ${link.icon}`}></i>
          )}
          {!iconOnly && link.label}
        </a>
      ))}
      <NativeShareButton
        url={url}
        title={title}
        className="btn btn-dark text-white"
        {...(iconOnly ? { children: <i className="bi bi-share-fill"></i> } : {})}
      />
    </div>
  )
}

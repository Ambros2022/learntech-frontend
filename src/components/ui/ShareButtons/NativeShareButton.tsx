'use client'

import { toast } from 'sonner'

type Props = {
  url: string
  title?: string
  className?: string
  children?: React.ReactNode
}

export default function NativeShareButton({
  url,
  title,
  className = 'btn btn-dark text-white',
  children,
}: Props) {
  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text: title, url })
      } catch {
        // user cancelled — no-op
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Unable to share')
    }
  }

  return (
    <button type="button" onClick={handleShare} className={className} aria-label="Share">
      {children ?? (
        <>
          <i className="bi me-2 bi-share-fill"></i>Share
        </>
      )}
    </button>
  )
}

import Image from 'next/image'

interface Props {
  alt: string
  src?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export default function BannerImage({
  alt,
  src = '/images/icons/BannerBG.webp',
  width = 1400,
  height = 300,
  priority = true,
  className = 'w-100',
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ objectFit: 'cover' }}
    />
  )
}

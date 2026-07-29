interface Props {
  html?: string
}

export default function SeoHtmlContent({
  html = '',
}: Props) {
  if (!html) return null

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
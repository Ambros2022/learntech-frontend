'use client'

interface PdfViewButtonProps {
  pdfFile: string
  pdfName: string
}

export default function PdfViewButton({ pdfFile, pdfName }: PdfViewButtonProps) {
  const handleViewClick = () => {
    const url = `${process.env.NEXT_PUBLIC_IMG_URL}/${pdfFile}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      className="btn applyNowButton align-content-center"
      onClick={handleViewClick}
    >
      {pdfName || 'View PDF'}
    </button>
  )
}

'use client'

export default function ScrollToOpenings() {
  const handleClick = () => {
    document.getElementById('currentOpeningSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <button onClick={handleClick} className="btn currentOpeningBtn">
      Current Openings
    </button>
  )
}

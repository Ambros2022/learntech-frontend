'use client'
import { useState } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import BannerImage from 'src/components/ui/BannerImage'
import { Breadcrumb } from 'src/app/components/Breadcrumb'

interface Props {
  handleSearchQuery: (query: string) => void
}

const BannerSec = ({ handleSearchQuery }: Props) => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (value: string) => {
    setSearchText(value)
    setLoading(true)
    if (value.length < 2) {
      handleSearchQuery('')
      setLoading(false)
      return
    }
    try {
      handleSearchQuery(value)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSearchText('')
    handleSearchQuery('')
    setLoading(false)
  }

  return (
    <>
      <section className='newsBannerSec'>
        <div className='position-relative'>
          <BannerImage
            alt='Students Speak Banner'
            src='/images/icons/BannerBG.webp'
            width={1400}
            height={300}
            className='position-relative w-100'
          />
          <div className='position-absolute w-100 h-100' style={{ top: '1px' }}>
            <div className="container h-100">
              <div className="card d-flex justify-content-center w-100 h-100 bg-transparent border-0">
                <div className="align-content-center h-100">
                  <h1 className='fw-bold text-white text-center'>
                    Success Stories of Learntech Edu Solutions Pvt. Ltd.
                  </h1>

                  <div className="row">
                    <div className="col-12 w-100 text-center mb-3">
                      {/* Native input — no MUI dependency */}
                      <div
                        className="d-inline-flex align-items-center bg-white rounded"
                        style={{ width: 300, height: 44, padding: '0 12px', gap: 8 }}
                      >
                        {loading ? (
                          <Loader2 size={18} className="text-secondary" style={{ flexShrink: 0, animation: 'spin 1s linear infinite' }} aria-hidden="true" />
                        ) : (
                          <Search size={18} className="text-secondary" style={{ flexShrink: 0 }} aria-hidden="true" />
                        )}
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchText}
                          onChange={(e) => handleSearch(e.target.value)}
                          aria-label="Search students speak"
                          style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            color: '#000',
                            fontSize: '1rem',
                          }}
                        />
                        {searchText && !loading && (
                          <button
                            type="button"
                            onClick={handleClear}
                            aria-label="Clear search"
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
                          >
                            <X size={18} className="text-secondary" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Students' Speak" }]} />
    </>
  )
}

export default BannerSec

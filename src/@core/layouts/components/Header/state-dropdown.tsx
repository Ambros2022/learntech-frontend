'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from 'src/hooks/useAuth'

interface City  { id: number; name: string }
interface State { id: number; name: string; city?: City[] }

interface Props {
  states:  State[]
  type:    'Colleges' | 'Universities'
  onClose: () => void
}

const PAGE = 10

const StateDropdown = memo(function StateDropdown({ states, type, onClose }: Props) {
  const { setStateId, setCityId } = useAuth()
  const [visible,     setVisible]     = useState(PAGE)
  const [expanded,    setExpanded]    = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const [isMobile,    setIsMobile]    = useState(false)

  // matchMedia fires only on breakpoint crossing — cheaper than resize listener.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const showMore = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setVisible(prev => Math.min(prev + 5, states.length))
    setExpanded(true)
  }, [states.length])

  const showLess = useCallback(() => { setVisible(PAGE); setExpanded(false) }, [])

  const toggleSubmenu = useCallback((e: React.MouseEvent, id: number) => {
    e.preventDefault(); e.stopPropagation()
    setOpenSubmenu(prev => (prev === id ? null : id))
  }, [])

  const basePath = type === 'Colleges' ? '/colleges' : '/universities'

  if (!states.length) return null

  return (
    <ul className='dropdown-menu menu-icon state-dropdwon-width'>
      <div className='text-center'>
        <p style={{ fontWeight: 'bold', color: '#274896' }}>{type} by location</p>
      </div>

      {states.slice(0, visible).map(item => (
        <li key={item.id} className='position-relative'>
          <div className='d-flex justify-content-between align-items-center'>
            <Link
              href={basePath}
              className='dropdown-item'
              onClick={() => { setStateId(item.id); onClose() }}
            >
              {item.name}
            </Link>

            {(item.city?.length ?? 0) > 0 && (
              <Image
                className={`ms-auto${isMobile && openSubmenu === item.id ? ' rotate-90' : ''}`}
                src='/images/icons/right arrow.svg'
                width={20}
                height={25}
                alt=''
                aria-hidden='true'
                onClick={isMobile ? e => toggleSubmenu(e, item.id) : undefined}
                style={{ cursor: isMobile ? 'pointer' : 'default' }}
              />
            )}
          </div>

          {(item.city?.length ?? 0) > 0 && (!isMobile || openSubmenu === item.id) && (
            <ul className='dropdown-menu dropdown-submenu menu-icon'>
              {item.city!.map(city => (
                <li key={city.id}>
                  <Link
                    href={basePath}
                    className='dropdown-item'
                    onClick={() => { setCityId(city.id); onClose() }}
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}

      <div className='text-center text-blue dropdownBtn'>
        {visible < states.length && <button className='btn' onClick={showMore}>View More</button>}
        {expanded                && <button className='btn' onClick={showLess}>Show Less</button>}
      </div>
    </ul>
  )
})

StateDropdown.displayName = 'StateDropdown'
export default StateDropdown

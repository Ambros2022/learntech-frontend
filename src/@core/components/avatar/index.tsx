'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'src/hooks/useCompatRouter'
import styles from './AvatarDropdown.module.css'

interface AvatarDropdownProps {
  openModal: () => void
}

export default function AvatarDropdown({ openModal }: AvatarDropdownProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem('UserData')
      setUserData(stored ? JSON.parse(stored) : null)
    }
    loadUser()
    window.addEventListener('storage', loadUser)
    return () => window.removeEventListener('storage', loadUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('UserData')
    setUserData(null)
    router.push('/')
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={() => userData && setIsHovered(true)}
      onMouseLeave={() => userData && setIsHovered(false)}
      onClick={() => !userData && openModal()}
    >
      {userData ? (
        <div className={styles.avatarCircle}>{userData.name.charAt(0).toUpperCase()}</div>
      ) : (
        <i className='bi bi-person-fill text-blue mx-2 fs-2' aria-hidden='true' />
      )}

      {userData && isHovered && (
        <div className={styles.dropdown}>
          <h5 className='mb-2 text-blue'>Welcome, {userData.name}!</h5>
          <button
            type='button'
            className='btn btn-outline-secondary btn-sm w-100'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

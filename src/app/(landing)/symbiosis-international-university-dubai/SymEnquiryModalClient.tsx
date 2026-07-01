'use client'

import { useRef, useEffect, useCallback } from 'react'
import SymEnquiryFormClient from './SymEnquiryFormClient'
import styles from './SymbiosisPage.module.css'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SymEnquiryModalClient({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [open])

  const handleClose = useCallback(() => {
    dialogRef.current?.close()
    onClose()
  }, [onClose])

  const handleDialogClick = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) handleClose()
  }, [handleClose])

  return (
    <dialog
      ref={dialogRef}
      className={styles.symDialog}
      onClick={handleDialogClick}
    >
      <div className={styles.symDialogBody}>
        <button
          className={styles.symDialogClose}
          onClick={handleClose}
          aria-label='Close modal'
        >
          &times;
        </button>
        <div className={styles.symModalHeading}>
          <h3 className='text-center'>Take The First Step Towards Your Future</h3>
        </div>
        <SymEnquiryFormClient isModal />
      </div>
    </dialog>
  )
}

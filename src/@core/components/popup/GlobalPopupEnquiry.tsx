'use client'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import EnquiryForm from 'src/@core/components/popup/form'
import Image from 'next/image'
import styles from './GlobalPopupEnquiry.module.css'

interface Props {
  className?: string
  title?: string
  pagename?: string
  buttonText?: React.ReactNode
  placeholder?: string
  collegeName?: string
}

export default function GlobalPopupEnquiry({
  className,
  title,
  pagename,
  buttonText,
  placeholder = '',
  collegeName,
}: Props) {
  const [modalShow, setModalShow] = useState(false)
  const modalTitle = title || "Let's build a better future for you"

  const trigger =
    pagename === 'Brochure' ? (
      <a onClick={() => setModalShow(true)} className={styles.downloadBrchrBtn} style={{ cursor: 'pointer' }}>
        <Image
          src="/images/icons/DownloadBrochure.webp"
          alt="Download Brochure Icon"
          width={150}
          height={70}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </a>
    ) : (
      <a onClick={() => setModalShow(true)} className={`${className || 'active btn'} ${styles.counsellingBtn}`} style={{ cursor: 'pointer' }}>
        {buttonText || 'Apply Now'}
      </a>
    )

  return (
    <>
      {trigger}
      <Modal
        className="modal fade px-3"
        id="exampleModal"
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
      >
        <div className="modal-content">
          <div className={styles.searchForm}>
            <h5 className="pb-3 fw-bold text-center text-blue">{modalTitle}</h5>
            <EnquiryForm
              onChanges={() => setModalShow(false)}
              page={pagename || 'no'}
              placeholder={placeholder}
              collegeName={collegeName}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

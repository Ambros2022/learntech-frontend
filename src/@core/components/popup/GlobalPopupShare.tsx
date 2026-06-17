'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import ShareButtons from 'src/components/ui/ShareButtons'

interface Props {
  title?: string
  pathname?: string
  logourl?: string
  className?: string
}

const GlobalPopupShare = ({ title, pathname }: Props) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [show])

  return (
    <>
      <a onClick={() => setShow(true)} style={{ cursor: 'pointer' }} aria-label="Share">
        <Image
          src="/images/icons/icon-share.png"
          alt="share"
          width={35}
          height={35}
          className="position-absolute img-fluid rounded p-1"
          style={{ bottom: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.5)' }}
        />
      </a>

      {show && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShow(false)}
            style={{ zIndex: 1040 }}
          />
          <div
            className="modal d-block"
            tabIndex={-1}
            role="dialog"
            style={{ zIndex: 1050 }}
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShow(false)}
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body pt-0">
                  <h4 className="mb-3">Share Our Blogs To</h4>
                  <ShareButtons
                    url={pathname ?? ''}
                    title={title}
                    variant="icons"
                    className="d-flex justify-content-around pt-2 gap-2 flex-wrap"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default GlobalPopupShare

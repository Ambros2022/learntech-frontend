'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LazyContactForm404 } from 'src/app/components/ClientWrappers'

const BannerSec = () => {
  return (
    <section className="errCon py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8 d-flex justify-content-center">
            <div className="w-100 text-center">
              <h1 className="fw-bold text-blue">404: The page you are looking for isn&apos;t here</h1>
              <h6>
                You either tried some shady route or you came here by mistake. Whichever it is, try using the
                navigation
              </h6>
              <div className="pt-4">
                <Image
                  src="/images/icons/404-error.jpg"
                  width={300}
                  height={300}
                  alt="404 error"
                  loading="lazy"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              <Link href="/" className="mt-3 btn errBtn mb-3">
                BACK TO HOME
              </Link>
            </div>
          </div>
          <div className="col-md-4 px-md-5 px-5">
            <LazyContactForm404 />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerSec

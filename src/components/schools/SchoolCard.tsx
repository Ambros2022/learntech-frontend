'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'
import styles from './SchoolCard.module.css'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export interface SchoolItem {
  id: number
  slug: string
  name: string
  address: string
  banner_image: string
}

export default function SchoolCard({ school }: { school: SchoolItem }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={`${IMG_BASE}/${school.banner_image}`}
          alt={`${school.name} campus`}
          fill
          className={styles.image}
          sizes="(max-width: 576px) 100vw, (max-width: 991px) 50vw, 25vw"
          unoptimized
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{school.name}</h3>
        <p className={styles.location}>
          <i className={`bi bi-geo-alt-fill ${styles.pin}`} />
          <span className={styles.locationText}>{school.address}</span>
        </p>

        <div className={styles.actions}>
          <GlobalEnquiryForm className={styles.applyBtn} collegeName={school.name} />
          <Link href={`/school/${school.id}/${school.slug}`} className={styles.viewBtn}>
            View More
          </Link>
        </div>
      </div>
    </article>
  )
}

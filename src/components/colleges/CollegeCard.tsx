'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'
import styles from './CollegeCard.module.css'

export interface CollegeItem {
  id: number
  slug: string
  name: string
  address: string
  banner_image: string
}

const IMG_BASE = process.env.NEXT_PUBLIC_IMG_URL || ''

export default function CollegeCard({ college, linkPrefix = 'college' }: { college: CollegeItem; linkPrefix?: string }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={`${IMG_BASE}/${college.banner_image}`}
          alt={`${college.name} campus`}
          fill
          className={styles.image}
          sizes="(max-width: 576px) 100vw, (max-width: 991px) 50vw, 25vw"
          unoptimized
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{college.name}</h3>
        <p className={styles.location}>
          <i className={`bi bi-geo-alt-fill ${styles.pin}`} />
          <span className={styles.locationText}>{college.address}</span>
        </p>

        <div className={styles.actions}>
          <GlobalEnquiryForm className={styles.applyBtn} collegeName={college.name} />
          <Link href={`/${linkPrefix}/${college.id}/${college.slug}`} className={styles.viewBtn}>
            View More
          </Link>
        </div>
      </div>
    </article>
  )
}

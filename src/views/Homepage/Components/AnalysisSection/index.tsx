import Image from 'next/image'
import { LazyAnimatedCounter } from 'src/app/components/ClientWrappers'
import styles from './AnalysisSection.module.css'

const stats = [
  {
    icon: '/images/icons/applications-filled.svg',
    alt: 'Admission success icon',
    target: 500000,
    label: 'Admission Success',
  },
  {
    icon: '/images/icons/admission-done.svg',
    alt: 'Partner colleges icon',
    target: 1000,
    label: 'Partner Colleges/Universities',
  },
  {
    icon: '/images/icons/expert-counsellor.svg',
    alt: 'Expert counsellor icon',
    target: 100000,
    label: 'Faster Admission Process',
  },
]

export default function AnalysisSection() {
  return (
    <div className={styles.analysisSection}>
      <div className="container pt-5">
        <div className="row d-flex justify-content-center">
          {stats.map(({ icon, alt, target, label }) => (
            <div key={label} className="col-md-4 mb-5">
              <div className="row">
                <div className="col-md-3 col-4 text-end d-flex justify-content-end">
                  <div style={{ width: 70, height: 70, position: 'relative' }}>
                    <Image
                      src={icon}
                      alt={alt}
                      fill
                      sizes="70px"
                      style={{ objectFit: 'contain' }}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-md-9 col-8 text-start mt-2 mt-md-0">
                  <h4 className="fw-bold">
                    <LazyAnimatedCounter target={target} />
                  </h4>
                  <h6>{label}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

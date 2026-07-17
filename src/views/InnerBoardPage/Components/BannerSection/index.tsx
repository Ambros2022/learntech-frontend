import Image from 'next/image'
import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'
import styles from './BannerSection.module.css'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="d-flex gap-2 justify-content-md-end justify-content-start">
    {[1, 2, 3, 4, 5].map((v) => (
      <i key={v} className={`bi bi-star-fill ${rating >= v ? 'text-warning' : 'text-white'}`} />
    ))}
    <h6 className="mb-0 text-white align-self-center">{rating}/5 Review</h6>
  </div>
)

export default function BannerSection({ data }: { data: any }) {
  const hasRating = data?.avg_rating && data.avg_rating !== 0

  return (
    <section className={styles.banner}>
      <div className="container">
        <div className={`card ${styles.card}`}>
          <div className="row g-0">
            <div className="col-12 col-md-2 col-lg-2 col-xl-1 d-flex justify-content-between align-items-start">
              <div className={`mt-md-3 ${styles.logo}`}>
                <Image
                  src={`${IMG_URL}/${data.logo}`}
                  alt={data.name || 'board logo'}
                  width={110}
                  height={110}
                  priority
                />
              </div>
              {hasRating && (
                <div className="d-flex d-md-none align-items-center">
                  <StarRating rating={data.avg_rating} />
                </div>
              )}
            </div>

            <div className="col-12 col-md-10 col-lg-7 col-xl-8 ps-xl-5">
              <div className="pt-3 pt-md-0">
                <h1 className={styles.title}>{data.name}</h1>

                <h6 className={styles.metaRow}>
                  <i className="bi bi-geo-alt-fill text-danger" />
                  <span className={styles.metaText}>{data.address}</span>
                </h6>

                {data.boardrecognitions?.length > 0 && (
                  <h6 className={styles.metaRow}>
                    <i className="text-warning bi bi-trophy-fill" />
                    <span className={styles.metaText}>
                      <span className="fw-bold">Approvals and Recognition</span>:&nbsp;
                      {data.boardrecognitions[0].brdrecognitions.recognition_approval_name}
                    </span>
                  </h6>
                )}

                <div className={styles.statRow}>
                  <h6>
                    Est Year:&nbsp;<span>{data.established}</span>
                  </h6>
                  <h6>
                    Gender Accepted:&nbsp;<span>{data.gender}</span>
                  </h6>
                </div>
              </div>
            </div>

            {hasRating && (
              <div className="d-none d-md-flex col-md-12 col-lg-3 col-xl-3 pt-lg-3 ms-md-auto mb-md-3 align-items-center justify-content-end">
                <StarRating rating={data.avg_rating} />
              </div>
            )}
          </div>

          <div className={styles.btnRow}>
            <button className={styles.resultBtn}>
              <i className="me-2 bi bi-alarm-fill" />
              Result Date: {formatDate(data.result_date)}
            </button>
            <GlobalEnquiryForm className={`align-content-center btn ${styles.enquireBtn}`} buttonText="Enquire Now" />
          </div>
        </div>
      </div>
    </section>
  )
}

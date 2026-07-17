'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  title: string
  imageSrc: string
  count?: number
  activeTab: string
  itemId: number
  slug: string
}

function getUrl(activeTab: string, itemId: number, slug: string): string {
  if (activeTab === 'Courses') return `/course/${itemId}/${slug}`
  if (activeTab === 'Exams') return `/exams/`
  return `/colleges/`
}

const CardComponent: React.FC<Props> = ({ title, imageSrc, count, activeTab, itemId, slug }) => {
  const { setStreamId } = useAuth()

  const handleClick = () => {
    if (activeTab !== 'Courses') setStreamId(String(itemId))
  }

  return (
    <div className="col-md-4 col-lg-2 mb-3">
      <div className="card text-center exploreCardHover">
        <Link href={getUrl(activeTab, itemId, slug)} onClick={handleClick}>
          <div className="row">
            <div className="col-md-12 col-4 col-sm-3">
              <div style={{ position: 'relative', width: 70, height: 30, margin: '12px auto 0' }}>
                <Image
                  src={imageSrc}
                  alt={`${title} logo`}
                  fill
                  sizes="70px"
                  style={{ objectFit: 'contain' }}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-md-12 col-6 col-sm-7 text-md-center text-start">
              <div className="card-body">
                {count !== undefined && (
                  <p className="card-text m-0 text-black">{count} {activeTab}</p>
                )}
                <h6 className="card-title text-truncate text-blue">{title}</h6>
              </div>
            </div>
            <div className="col-2 cardArrow">
              <span>
                <Image
                  src="/images/icons/right arrow.svg"
                  alt="right arrow"
                  width={27}
                  height={27}
                  loading="lazy"
                />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default CardComponent

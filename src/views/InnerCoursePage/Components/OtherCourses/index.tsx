import { LazyOtherCoursesCarousel } from 'src/app/components/ClientWrappers'
import styles from './OtherCourses.module.css'

const clipRect = {
  position: 'absolute' as const,
  width: 1,
  height: 1,
  overflow: 'hidden' as const,
  clip: 'rect(0,0,0,0)' as const,
  whiteSpace: 'nowrap' as const,
}

export default function OtherCourses({ streams }: { streams: any[] }) {
  if (!streams?.length) return null

  return (
    <section className='bg-white pb-5'>
      <section className='container bg-skyBlue rounded'>
        <h3 className='fw-bold text-blue pt-5 ps-0 ps-md-5 text-center text-md-start'>Other Courses</h3>
        <ul aria-hidden="true" style={clipRect}>
          {streams.map(s => (
            <li key={s.id}><a href={`/course/${s.id}/${s.slug}`} tabIndex={-1}>{s.name}</a></li>
          ))}
        </ul>
        <div className={`carouselCardsCon px-5 pt-4 pb-5 position-relative ${styles.wrap}`} style={{ zIndex: 2 }}>
          <LazyOtherCoursesCarousel streams={streams} />
        </div>
      </section>
    </section>
  )
}

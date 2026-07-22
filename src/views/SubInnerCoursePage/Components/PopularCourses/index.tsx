import { getAllGeneralCourses } from 'src/lib/api/common'
import { LazyPopularCoursesCarousel } from 'src/app/components/ClientWrappers'
import styles from 'src/views/InnerCoursePage/Components/OtherCourses/OtherCourses.module.css'

const clipRect = {
  position: 'absolute' as const,
  width: 1,
  height: 1,
  overflow: 'hidden' as const,
  clip: 'rect(0,0,0,0)' as const,
  whiteSpace: 'nowrap' as const,
}

export default async function PopularCourses() {
  const courses = await getAllGeneralCourses()
  if (!courses.length) return null

  return (
    <section className='bg-white pb-5'>
      <section className='container bg-skyBlue rounded'>
        <h2 className='fw-bold text-blue pt-5 text-center'>Popular Degree Courses</h2>
        <ul aria-hidden="true" style={clipRect}>
          {courses.map((c: any) => (
            <li key={c.id}>
              <a href={`/course/${c.streams?.id}/${c.streams?.slug}/${c.slug}`}>{c.short_name}</a>
            </li>
          ))}
        </ul>
        <div className={`carouselCardsCon px-5 pt-4 pb-5 position-relative ${styles.wrap}`}  style={{ zIndex: 2 }}>
          <LazyPopularCoursesCarousel courses={courses} />
        </div>
      </section>
    </section>
  )
}

import Header from 'src/@core/layouts/components/Header'
import Footer from 'src/@core/layouts/components/Footer'

import {
  getStates,
  getNavCourses,
  getNavExams,
  getNavCountries,
  getNavNews,
} from 'src/lib/api/common'

// Server layout — fetches all nav data in parallel, zero client JS for navigation.
export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const [states, courses, exams, countries, news] = await Promise.all([
    getStates(),
    getNavCourses(),
    getNavExams(),
    getNavCountries(),
    getNavNews(),
  ])

  return (
    <>
   
      <Header
        states={states}
        courses={courses}
        exams={exams}
        countries={countries}
        news={news}
      />
      <main>{children}</main>
      <Footer />
    </>
  )
}

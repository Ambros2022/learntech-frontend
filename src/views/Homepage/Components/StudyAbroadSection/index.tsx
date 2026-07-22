import StudyAbroadClient from './StudyAbroadClient'
import type { CollegeItem } from 'src/components/colleges/CollegeCard'

interface Country {
  id: number
  name: string
}

interface Props {
  countries: Country[]
  initialColleges: CollegeItem[]
  initialCountryId: number | null
}

export default function StudyAbroadSection({ countries, initialColleges, initialCountryId }: Props) {
  return (
    <section className="StudyAbroadCon bg-white">
      <div className="container pt-4 pt-md-5">
        <h2 className="fw-bold text-blue text-center">Study Abroad</h2>
        <p className="text-black mt-3">
          Studying abroad offers transformative advantages that can redefine your academic and professional trajectory. Immersing yourself in a new cultural and academic environment sharpens critical thinking and problem-solving skills by challenging you to adapt and thrive in unfamiliar settings. This experience cultivates a global mindset, essential for understanding diverse perspectives and approaches, which is increasingly valued in a globalized job market.
        </p>
        <p className="text-black">
          Beyond cultural enrichment, studying at prestigious international universities grants access to cutting-edge research, state-of-the-art facilities, and innovative teaching methodologies that provide a distinct edge in your field. These institutions are often at the forefront of technological advancements and global discourse, offering tools and insights to empower you as a future leader. Explore your options and find the universities that will enable you to shape the future with a truly global perspective.
        </p>

        <StudyAbroadClient
          countries={countries}
          initialColleges={initialColleges}
          initialCountryId={initialCountryId}
        />
      </div>
    </section>
  )
}

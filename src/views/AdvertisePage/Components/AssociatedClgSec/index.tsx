import { LazyCollegeCarousel } from 'src/app/components/ClientWrappers'
import type { CollegeItem } from 'src/components/colleges/CollegeCarouselClient'

type AssociatedClgProps = {
  colleges: CollegeItem[]
}

const AssociatedClg = ({ colleges }: AssociatedClgProps) => {
  if (!colleges?.length) return null

  return (
    <section className=" bg-skyBlue">
      <div className="container pt-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-5">
          Our Associated Colleges and Universities
        </h2>
        <LazyCollegeCarousel colleges={colleges} />
      </div>
    </section>
  )
}

export default AssociatedClg

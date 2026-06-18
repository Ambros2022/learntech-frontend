import 'public/css/collegeadmissionguidancelandingpage.css'
import CollegeAdmissionGuidancePage from 'src/views/CollegeAdmissionGuidancePage'

export const metadata = {
  title: 'Learntech Edu | College Admission Guidance & Counselling',
  description: 'Get expert college admission guidance with Learntech Edu Solutions. 1000+ institutions, seat support, and personalised counselling to simplify your journey.',
  alternates: {
    canonical: 'https://learntechww.com/college-admission-guidance',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <CollegeAdmissionGuidancePage />
}

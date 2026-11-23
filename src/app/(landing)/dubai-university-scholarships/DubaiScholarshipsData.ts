export interface Programme {
  title: string
  level: 'UG' | 'PG'
  scholarship: string
  college: 's' | 'b'
  degree: string
  icon: string
  duration: string
  fee: string
  eligibility: string
}

export interface UniversityOption {
  code: 's' | 'b'
  name: string
}

export const UNIVERSITIES: UniversityOption[] = [
  { code: 's', name: 'Symbiosis International University Dubai' },
  { code: 'b', name: 'BITS Pilani Dubai' },
]

export const SIU_NAME = 'Symbiosis International University Dubai'
export const BITS_NAME = 'BITS Pilani Dubai'

export const MIN_MARKS: Record<'s' | 'b', Record<'UG' | 'PG', number>> = {
  s: { UG: 55, PG: 50 },
  b: { UG: 60, PG: 60 },
}

const FEE_BITS_PG = 'AED 16,800 / semester'
const FEE_SY_UG = 'AED 42,000 / year'
const ELIG_SY_UG = 'From 50% in Class 12'

export const PROGRAMMES: Programme[] = [
  { title: 'BBA (General Management)', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Business Administration', icon: 'biz', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BBA (Hons) in Finance', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Business Administration (Honors)', icon: 'calc', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BBA (Hons) in Marketing', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Business Administration (Honors)', icon: 'pen', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BBA (Hons) in Logistics and Supply Chain Management', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Business Administration (Honors)', icon: 'cog', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BBA (Hons) in Human Resource Management', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Business Administration (Honors)', icon: 'mind', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BBA (Hons) in AI and Business Analytics', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Business Administration (Honors)', icon: 'code', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BBA Dual Degree with Aston University, UK', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Business Administration', icon: 'cap', duration: '4 years (2 in Dubai, 2 at Aston)', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BCA in AI and ML', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Computer Applications', icon: 'code', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BCA in Cloud Computing', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Computer Applications', icon: 'code', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BCA in Data Science and Data Analytics', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Computer Applications', icon: 'code', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'BA in Media and Communication (Hons)', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Arts (Honors)', icon: 'pen', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'B.Com (Hons) with ACCA Preparation', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Commerce (Honors)', icon: 'calc', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'B.Sc (Hons) in Psychology', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Science (Honors)', icon: 'mind', duration: '4 years', fee: FEE_SY_UG, eligibility: ELIG_SY_UG },
  { title: 'B.Tech in Computer Engineering', level: 'UG', scholarship: 'Up to 40%', college: 's', degree: 'Bachelor of Technology', icon: 'cog', duration: '', fee: 'AED 53,550 / year', eligibility: '' },
  { title: 'MBA', level: 'PG', scholarship: 'Up to 35%', college: 's', degree: 'Master of Business Administration', icon: 'biz', duration: '2 years', fee: 'AED 45,000 / year', eligibility: '' },

  { title: 'B.E. Architectural & Urban Engineering', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'cog', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Chemical Engineering', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'cog', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Chemical Engineering (Energy & Sustainability)', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering with specialisation in Energy, Environment and Sustainability', icon: 'cog', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Civil Engineering', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'cog', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Computer Science', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'code', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Electrical & Electronics Engineering', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'cog', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Electronics & Communication Engineering', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'cog', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Electronics & Computer Engineering', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'code', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Mechanical Engineering', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'cog', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Mechanical Engineering (Aerospace)', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering with specialisation in Aerospace', icon: 'cog', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Robotics & Industrial Automation', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'cog', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Biotechnology', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'mind', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Biotechnology (Applied Molecular Biology)', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering with specialisation in Applied Molecular Biology', icon: 'mind', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'B.E. Mathematics & Computing', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Engineering', icon: 'calc', duration: '4 years', fee: 'AED 27,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'BBA (Honours)', level: 'UG', scholarship: 'Up to 50%', college: 'b', degree: 'Bachelor of Business Administration (Honours)', icon: 'biz', duration: '4 years', fee: 'AED 18,750 / semester', eligibility: 'From 60% in Class 12' },
  { title: 'M.E. Civil (Infrastructure Engineering & Management)', level: 'PG', scholarship: 'Up to 20%', college: 'b', degree: 'Master of Engineering with specialisation in Infrastructure Engineering and Management', icon: 'cog', duration: '2 years', fee: FEE_BITS_PG, eligibility: "From 60% in Bachelor's" },
  { title: 'M.E. Electrical (Power Electronics & Drives)', level: 'PG', scholarship: 'Up to 20%', college: 'b', degree: 'Master of Engineering with specialisation in Power Electronics and Drives', icon: 'cog', duration: '2 years', fee: FEE_BITS_PG, eligibility: "From 60% in Bachelor's" },
  { title: 'M.E. Software Systems', level: 'PG', scholarship: 'Up to 20%', college: 'b', degree: 'Master of Engineering', icon: 'code', duration: '2 years', fee: FEE_BITS_PG, eligibility: "From 60% in Bachelor's" },
  { title: 'MBA', level: 'PG', scholarship: 'Up to 20%', college: 'b', degree: 'Master of Business Administration', icon: 'biz', duration: '2 years', fee: FEE_BITS_PG, eligibility: "From 60% in Bachelor's" },
  { title: 'MBA (Business Analytics)', level: 'PG', scholarship: 'Up to 20%', college: 'b', degree: 'Master of Business Administration in Business Analytics', icon: 'calc', duration: '2 years', fee: FEE_BITS_PG, eligibility: "From 60% in Bachelor's" },
]

export interface RuleTier {
  minMarks: number
  text: string
  fraction: number
}

export interface UniversityRule {
  fee?: number
  tiers: [number, string, number][]
}

export const RULES: Record<string, Record<'UG' | 'PG', UniversityRule>> = {
  [SIU_NAME]: {
    UG: { fee: 42000, tiers: [[55, '40% in year 1 + 30% on remaining years', 0.4]] },
    PG: { fee: 45000, tiers: [[50, '35% on full programme + AED 1,000', 0.35]] },
  },
  [BITS_NAME]: {
    UG: { tiers: [[90, 'Up to 50% scholarship', 0.5], [80, 'Around 35% scholarship', 0.35], [70, 'Around 20% scholarship', 0.2], [60, 'Around 10% scholarship', 0.1]] },
    PG: { fee: 16800, tiers: [[75, '20% off first-semester tuition', 0.2]] },
  },
}

export const TOP_TIERS: Record<string, Record<'UG' | 'PG', [string, string]>> = {
  [SIU_NAME]: {
    UG: ['40', 'Then 30% on the remaining years'],
    PG: ['35', 'On the full programme'],
  },
  [BITS_NAME]: {
    UG: ['50', 'Top tier, for 90%+ marks'],
    PG: ['20', 'Top tier, for 75%+ marks'],
  },
}

export interface CollegeComparison {
  name: string
  loc: string
  badge: string
  banner: string
  ug: [string, string]
  pg: [string, string]
  marks: string
  courses: string
  pick: string
}

export const COMPARE_DATA: Record<'s' | 'b', CollegeComparison> = {
  s: {
    name: 'Symbiosis Dubai',
    loc: 'Dubai Knowledge Park',
    badge: 'Knowledge Park',
    banner: '/images/dubai-scholarships/compare-banner/Symbiosis.webp',
    ug: ['40%', 'in year 1 + 30% after'],
    pg: ['35%', '+ AED 1,000'],
    marks: "<strong>55%</strong> Bachelor's · <strong>50%</strong> Master's",
    courses: 'BCA, B.Tech, BBA, B.Com, B.Sc, BA, MBA',
    pick: 'You score between 55% and 80%, or are considering BCA, BBA, B.Com, BA or BSc programmes',
  },
  b: {
    name: 'BITS Pilani Dubai',
    loc: 'International Academic City',
    badge: 'Academic City',
    banner: '/images/dubai-scholarships/compare-banner/BITS.webp',
    ug: ['Up to 50%', 'by marks'],
    pg: ['Up to 20%', 'first-semester tuition'],
    marks: "<strong>60%</strong> for Bachelor's and Master's",
    courses: 'BE, BBA (Hons), ME, MBA',
    pick: 'You score 80%+ and want engineering or the biggest Bachelor\'s offer.',
  },
}

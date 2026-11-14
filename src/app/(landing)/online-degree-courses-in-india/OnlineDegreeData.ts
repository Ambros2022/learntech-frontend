export interface Partner {
  name: string
  mark: string
  badge: string
  desc: string
  logo: string
}

export interface AiCourse {
  title: string
  desc: string
  duration: string
  fees: string
  logo: string
  logoAlt: string
  image: string
  /** value pre-selected in the enquiry form */
  enquiryCourse: string
  isFeatured?: boolean
}

export interface Programme {
  cat: 'ug' | 'pg'
  tag: string
  icon: 'biz' | 'code' | 'calc' | 'pen' | 'flask' | 'book'
  name: string
  degree: string
  dur: string
  fees: string
  colleges: string[]
}

export interface HowItWorksStep {
  num: string
  title: string
  desc: string
  img: string
  alt: string
}

export interface Testimonial {
  name: string
  badge: string
  text: string
  meta: string
}

export const PARTNERS: Partner[] = [
  {
    name: 'Alliance Online',
    mark: 'N',
    badge: 'NAAC A+',
    desc: '32,000+ alumni across 50+ countries',
    logo: '/images/online-degree/partners/Alliance.webp',
  },
  {
    name: 'Amrita Online',
    mark: 'M',
    badge: 'NAAC A++',
    desc: 'The online degrees carry WES equivalence in the USA and Canada',
    logo: '/images/online-degree/partners/Amirta.webp',
  },
  {
    name: 'CU Online',
    mark: 'S',
    badge: 'NAAC A+',
    desc: 'Harvard ManageMentor courses are available for certain programmes',
    logo: '/images/online-degree/partners/CU.webp',
  },
  {
    name: 'CHRIST Online',
    mark: 'H',
    badge: 'NAAC A+',
    desc: 'Institution with Potential for Excellence',
    logo: '/images/online-degree/partners/Christ.webp',
  },
]

export const AI_TRENDING_COURSES: AiCourse[] = [
  {
    title: 'Online MCA (Artificial Intelligence)',
    enquiryCourse: 'Online MCA in Artificial Intelligence',
    desc: 'Develop expertise in artificial intelligence, intelligent systems and AI driven applications through advanced computing concepts and practical learning.',
    duration: '2 Years',
    fees: 'Rs. 1,95,000',
    logo: '/images/online-degree/media/Amrita.svg',
    logoAlt: 'Amrita Online',
    image: '/images/online-degree/media/393265.jpg',
  },
  {
    title: 'Online M.Sc (Master of Science) in Artificial Intelligence and Machine Learning',
    enquiryCourse: 'Online M.Sc in Artificial Intelligence and Machine Learning',
    desc: 'Build a strong foundation in AI and machine learning, with a focus on developing intelligent models, analysing data and solving complex problems.',
    duration: '2 Years',
    fees: 'Rs. 2,75,000',
    logo: '/images/online-degree/media/Christ.svg',
    logoAlt: 'Christ Online',
    image: '/images/online-degree/media/241171.jpg',
    isFeatured: true,
  },
  {
    title: 'Online MCA (Cybersecurity & Artificial Intelligence)',
    enquiryCourse: 'Online MCA in Cybersecurity and AI',
    desc: 'Explore the intersection of cybersecurity and artificial intelligence, focusing on digital security, threat detection and intelligent systems.',
    duration: '2 Years',
    fees: 'Rs. 1,95,000',
    logo: '/images/online-degree/media/Amrita.svg',
    logoAlt: 'Amrita Online',
    image: '/images/online-degree/media/1642.jpg',
  },
]

export const COLLEGE_LOGOS: Record<string, string> = {
  Alliance_University_Online: '/images/online-degree/media/Alliance.svg',
  Amrita_Vishwa_Vidyapeetham_Online: '/images/online-degree/media/Amrita.svg',
  CHRIST_Online: '/images/online-degree/media/Christ.svg',
  Chandigarh_University_Online: '/images/online-degree/media/icons/Chandigarh_02.svg',
}

export const PROGRAMMES: Programme[] = [
  // UG
  {
    cat: 'ug',
    tag: 'UG',
    icon: 'biz',
    name: 'Online BBA',
    degree: 'Bachelor of Business Administration',
    dur: '3 Years',
    fees: '₹1,00,000 - ₹1,41,000',
    colleges: ['Alliance_University_Online', 'Amrita_Vishwa_Vidyapeetham_Online', 'CHRIST_Online', 'Chandigarh_University_Online'],
  },
  {
    cat: 'ug',
    tag: 'UG',
    icon: 'code',
    name: 'Online BCA',
    degree: 'Bachelor of Computer Application',
    dur: '3 Years',
    fees: '₹55,485 - ₹1,41,000',
    colleges: ['Amrita_Vishwa_Vidyapeetham_Online', 'CHRIST_Online', 'Chandigarh_University_Online'],
  },
  {
    cat: 'ug',
    tag: 'UG',
    icon: 'calc',
    name: 'Online B.Com',
    degree: 'Bachelor of Commerce',
    dur: '3 Years',
    fees: '₹50,635 - ₹1,20,000',
    colleges: ['Amrita_Vishwa_Vidyapeetham_Online', 'CHRIST_Online', 'Alliance_University_Online'],
  },
  {
    cat: 'ug',
    tag: 'UG',
    icon: 'pen',
    name: 'Online BA',
    degree: 'Journalism & Mass Communication',
    dur: '3 Years',
    fees: '₹1,02,250 - ₹1,35,000',
    colleges: ['Chandigarh_University_Online'],
  },
  // PG
  {
    cat: 'pg',
    tag: 'MBA',
    icon: 'biz',
    name: 'Online MBA',
    degree: 'Master of Business Administration in Human Resources (HR)',
    dur: '2 Years',
    fees: '₹2,20,000',
    colleges: ['Amrita_Vishwa_Vidyapeetham_Online'],
  },
  {
    cat: 'pg',
    tag: 'MBA',
    icon: 'biz',
    name: 'Online MBA',
    degree: 'Master of Business Administration in Marketing',
    dur: '2 Years',
    fees: '₹2,20,000',
    colleges: ['Amrita_Vishwa_Vidyapeetham_Online'],
  },
  {
    cat: 'pg',
    tag: 'MBA',
    icon: 'biz',
    name: 'Online MBA',
    degree: 'Master of Business Administration in Finance',
    dur: '2 Years',
    fees: '₹2,20,000',
    colleges: ['Amrita_Vishwa_Vidyapeetham_Online'],
  },
  {
    cat: 'pg',
    tag: 'MBA',
    icon: 'biz',
    name: 'Online MBA',
    degree: 'Master of Business Administration in Operations',
    dur: '2 Years',
    fees: '₹2,24,000',
    colleges: ['Amrita_Vishwa_Vidyapeetham_Online'],
  },
  {
    cat: 'pg',
    tag: 'MBA',
    icon: 'biz',
    name: 'Online MBA',
    degree: 'Master of Business Administration in General Management',
    dur: '2 Years',
    fees: '₹1,76,000',
    colleges: ['Amrita_Vishwa_Vidyapeetham_Online'],
  },
  {
    cat: 'pg',
    tag: 'MBA',
    icon: 'biz',
    name: 'Online MBA',
    degree: 'Master of Business Administration',
    dur: '2 Years',
    fees: '₹1,60,000 - ₹1,80,400',
    colleges: ['Alliance_University_Online', 'Chandigarh_University_Online'],
  },
  {
    cat: 'pg',
    tag: 'MCA',
    icon: 'code',
    name: 'Online MCA',
    degree: 'Master of Computer Application in Artificial Intelligence',
    dur: '2 Years',
    fees: '₹1,95,000',
    colleges: ['Amrita_Vishwa_Vidyapeetham_Online'],
  },
  {
    cat: 'pg',
    tag: 'MCA',
    icon: 'code',
    name: 'Online MCA',
    degree: 'Master of Computer Application in Cybersecurity and AI',
    dur: '2 Years',
    fees: '₹1,95,000',
    colleges: ['Amrita_Vishwa_Vidyapeetham_Online'],
  },
  {
    cat: 'pg',
    tag: 'MCA',
    icon: 'code',
    name: 'Online MCA',
    degree: 'Master of Computer Application',
    dur: '2 Years',
    fees: '₹1,16,250 - ₹2,30,000',
    colleges: ['CHRIST_Online', 'Chandigarh_University_Online'],
  },
  {
    cat: 'pg',
    tag: 'M.Com',
    icon: 'calc',
    name: 'Online M.Com',
    degree: 'Master of Commerce',
    dur: '2 Years',
    fees: '₹50,000 - ₹90,000',
    colleges: ['CHRIST_Online', 'Amrita_Vishwa_Vidyapeetham_Online'],
  },
  {
    cat: 'pg',
    tag: 'M.Sc',
    icon: 'flask',
    name: 'Online M.Sc',
    degree: 'Master of Science in Data Science',
    dur: '2 Years',
    fees: '₹1,10,000 - ₹2,50,000',
    colleges: ['CHRIST_Online', 'Chandigarh_University_Online'],
  },
  {
    cat: 'pg',
    tag: 'M.Sc',
    icon: 'flask',
    name: 'Online M.Sc',
    degree: 'Master of Science in Artificial Intelligence and Machine Learning',
    dur: '2 Years',
    fees: '₹2,75,000',
    colleges: ['CHRIST_Online'],
  },
  {
    cat: 'pg',
    tag: 'M.Sc',
    icon: 'flask',
    name: 'Online M.Sc',
    degree: 'Master of Science in Mathematics',
    dur: '2 Years',
    fees: '₹75,000',
    colleges: ['Chandigarh_University_Online'],
  },
  {
    cat: 'pg',
    tag: 'MA',
    icon: 'book',
    name: 'Online MA',
    degree: 'Master of Arts in Applied Economics',
    dur: '2 Years',
    fees: '₹45,000',
    colleges: ['CHRIST_Online'],
  },
  {
    cat: 'pg',
    tag: 'MA',
    icon: 'book',
    name: 'Online MA',
    degree: 'Master of Arts in Economics',
    dur: '2 Years',
    fees: '₹75,000',
    colleges: ['Chandigarh_University_Online'],
  },
  {
    cat: 'pg',
    tag: 'MA',
    icon: 'book',
    name: 'Online MA',
    degree: 'Master of Arts in English with Communication',
    dur: '2 Years',
    fees: '₹35,625',
    colleges: ['CHRIST_Online'],
  },
  {
    cat: 'pg',
    tag: 'MA',
    icon: 'book',
    name: 'Online MA',
    degree: 'Master of Arts in English',
    dur: '2 Years',
    fees: '₹75,000',
    colleges: ['Chandigarh_University_Online'],
  },
  {
    cat: 'pg',
    tag: 'MA',
    icon: 'book',
    name: 'Online MA',
    degree: 'Master of Arts in Journalism',
    dur: '2 Years',
    fees: '₹75,000',
    colleges: ['Chandigarh_University_Online'],
  },
]

export const COURSE_FINDER_FIELDS = [
  { value: 'business', label: 'Business' },
  { value: 'technology', label: 'Technology' },
  { value: 'data', label: 'Data and AI' },
  { value: 'finance', label: 'Finance' },
  { value: 'media', label: 'Media' },
]

export const COURSE_FINDER_LEVELS = [
  { value: '12th', label: 'a 12th pass student' },
  { value: 'graduate', label: 'a Graduate' },
]

export const COURSE_FINDER_RESULTS = [
  { field: 'business', level: '12th', name: 'Online BBA' },
  { field: 'business', level: 'graduate', name: 'Online MBA' },
  { field: 'technology', level: '12th', name: 'Online BCA' },
  { field: 'technology', level: 'graduate', name: 'Online MCA' },
  { field: 'data', level: '12th', name: 'Online BCA' },
  { field: 'data', level: 'graduate', name: 'Online M.Sc in Data Science' },
  { field: 'finance', level: '12th', name: 'Online B.Com' },
  { field: 'finance', level: 'graduate', name: 'Online M.Com' },
  { field: 'media', level: '12th', name: 'Online BA in Journalism and Mass Communication' },
  { field: 'media', level: 'graduate', name: 'Online MA in Journalism' },
]

export const PLACEMENTS_ROW1 = [
  { name: 'Amazon', img: '/images/online-degree/placements/Amazon.svg' },
  { name: 'Cognizant', img: '/images/online-degree/placements/Cognizant.svg' },
  { name: 'DELL', img: '/images/online-degree/placements/DELL.svg' },
  { name: 'Godrej', img: '/images/online-degree/placements/godrej.svg' },
  { name: 'Flipkart', img: '/images/online-degree/placements/Flipkart.svg' },
  { name: 'ITC', img: '/images/online-degree/placements/ITC.svg' },
  { name: 'Sapient', img: '/images/online-degree/placements/Sapient.svg' },
]

export const PLACEMENTS_ROW2 = [
  { name: 'Emerson', img: '/images/online-degree/placements/emerson.svg' },
  { name: 'HCL', img: '/images/online-degree/placements/HCL.svg' },
  { name: 'Google', img: '/images/online-degree/placements/Google.svg' },
  { name: 'Hitachi', img: '/images/online-degree/placements/HITACHI.svg' },
  { name: 'HP', img: '/images/online-degree/placements/HP.svg' },
  { name: 'Vmware', img: '/images/online-degree/placements/Vmware.svg' },
  { name: 'Zomato', img: '/images/online-degree/placements/Zomato.svg' },
]

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    num: '01',
    title: 'Explore & compare',
    desc: 'Compare programmes side by side on fees, duration and approvals. Shortlist the ones that fit your goals and budget.',
    img: '/images/online-degree/placements/65.webp',
    alt: 'Students comparing their study options',
  },
  {
    num: '02',
    title: 'Talk to an expert',
    desc: 'A real admissions counsellor explains fees, approvals and placements via a one-to-one call. The advice is honest and there is no pressure.',
    img: '/images/online-degree/placements/64.webp',
    alt: 'Learner speaking with an admissions counsellor',
  },
  {
    num: '03',
    title: 'Apply online',
    desc: 'Upload your documents once and track your application at any time. We handle the paperwork with the university.',
    img: '/images/online-degree/placements/63.webp',
    alt: 'Student completing an online application',
  },
  {
    num: '04',
    title: 'Start learning',
    desc: 'Attend orientation and begin your classes. Explore learning formats and placement support based on your chosen university and programme.',
    img: '/images/online-degree/placements/62.webp',
    alt: 'Learners attending a class together',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Aarav',
    badge: 'Online MBA',
    text: 'Studying for an MBA around a full-time job felt impossible — until the live weekend format actually fit my calendar.',
    meta: 'Class of 2025',
  },
  {
    name: 'Priya',
    badge: 'Online BCA',
    text: 'The BCA in AI & Data Science gave me real projects to show in interviews, not just a certificate.',
    meta: 'Class of 2027',
  },
  {
    name: 'Meera',
    badge: 'Online MCA',
    text: "Six months in, I'd already shipped two projects at my new job — the mentors made switching into tech far less scary.",
    meta: 'Class of 2024',
  },
  {
    name: 'Rohan',
    badge: 'Online MBA',
    text: 'Recorded lectures plus doubt-clearing sessions meant I never fell behind, even during quarter-end at work.',
    meta: 'Class of 2024',
  },
  {
    name: 'Sneha',
    badge: 'Online BBA',
    text: 'I compared a dozen universities. The counsellor here explained fees, approvals and placements without any pressure.',
    meta: 'Class of 2026',
  },
  {
    name: 'Karthik',
    badge: 'Online MCA',
    text: 'My MCA capstone became the portfolio piece that landed my first backend role.',
    meta: 'Class of 2025',
  },
  {
    name: 'Divya',
    badge: 'M.Sc AI & ML',
    text: 'Live weekend sessions with recorded backups let me study alongside work without burning out.',
    meta: 'Class of 2026',
  },
  {
    name: 'Arjun',
    badge: 'Online BBA',
    text: 'My parents wanted proof the degree was valid. The team walked us through approvals and fees step by step.',
    meta: 'Class of 2027',
  },
]


export interface CollegeInfo {
  short: string
  fullName: string
  location: string
}

export const COLLEGES: Record<'sym' | 'bits', CollegeInfo> = {
  sym: {
    short: 'Symbiosis Dubai',
    fullName: 'Symbiosis International University, Dubai',
    location: 'Dubai Knowledge Park',
  },
  bits: {
    short: 'BITS Pilani Dubai',
    fullName: 'BITS Pilani, Dubai',
    location: 'Dubai International Academic City',
  },
}

export interface CourseItem {
  id: string
  c: 'sym' | 'bits'
  lv: 'ug' | 'pg'
  name: string
  degree: string
  dur: string
  fee: string
  eligibility: string
}

export const COURSES: CourseItem[] = [
  { id: 'bba-s', c: 'sym', lv: 'ug', name: 'BBA (General Management)', degree: 'Bachelor of Business Administration', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bba-finance', c: 'sym', lv: 'ug', name: 'BBA (Honors) in Finance', degree: 'Bachelor of Business Administration (Honors)', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bba-marketing', c: 'sym', lv: 'ug', name: 'BBA (Honors) in Marketing', degree: 'Bachelor of Business Administration (Honors)', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bba-logistics', c: 'sym', lv: 'ug', name: 'BBA (Honors) in Logistics and Supply Chain Management', degree: 'Bachelor of Business Administration (Honors)', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bba-hr', c: 'sym', lv: 'ug', name: 'BBA (Honors) in Human Resource Management', degree: 'Bachelor of Business Administration (Honors)', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bba-ai', c: 'sym', lv: 'ug', name: 'BBA (Honors) in Artificial Intelligence and Business Analytics', degree: 'Bachelor of Business Administration (Honors)', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bba-dual', c: 'sym', lv: 'ug', name: 'BBA Dual Degree with Aston University, UK', degree: 'BBA from Symbiosis, Dubai & B.Sc in Business and Management from Aston University, UK', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bca-ai', c: 'sym', lv: 'ug', name: 'BCA (Artificial Intelligence and Machine Learning)', degree: 'Bachelor of Computer Applications', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bca-data', c: 'sym', lv: 'ug', name: 'BCA (Data Science and Data Analytics)', degree: 'Bachelor of Computer Applications', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bca-cloud', c: 'sym', lv: 'ug', name: 'BCA (Cloud Computing)', degree: 'Bachelor of Computer Applications', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'ba-media', c: 'sym', lv: 'ug', name: 'BA in Media and Communication (Honors)', degree: 'Bachelor of Arts in Media and Communication (Honors)', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bcom', c: 'sym', lv: 'ug', name: 'B.Com (Honors) with ACCA Preparation', degree: 'Bachelor of Commerce (Honors) with ACCA Preparation', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'bsc-psych', c: 'sym', lv: 'ug', name: 'B.Sc Psychology (Honors)', degree: 'Bachelor of Science in Psychology (Honors)', dur: '4 years', fee: 'AED 42,000/year', eligibility: 'Minimum 50%' },
  { id: 'btech', c: 'sym', lv: 'ug', name: 'B.Tech (Computer Engineering)', degree: 'Bachelor of Technology in Computer Engineering', dur: '4 years', fee: 'AED 53,550/year', eligibility: 'Minimum 50% overall' },
  { id: 'mba-s', c: 'sym', lv: 'pg', name: 'MBA', degree: 'Master of Business Administration', dur: '2 years', fee: 'AED 45,000/year', eligibility: "Bachelor's degree with minimum 50%" },
  { id: 'bits-architectural', c: 'bits', lv: 'ug', name: 'B.E. Architectural and Urban Engineering', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-biotechnology', c: 'bits', lv: 'ug', name: 'B.E. Biotechnology', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-biotech-molecular', c: 'bits', lv: 'ug', name: 'B.E. Biotechnology (Applied Molecular Biology)', degree: 'Bachelor of Engineering with Specialization in Applied Molecular Biology', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-chemical', c: 'bits', lv: 'ug', name: 'B.E. Chemical Engineering', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-energy', c: 'bits', lv: 'ug', name: 'B.E. Chemical (Energy, Environment and Sustainability)', degree: 'Bachelor of Engineering with Specialization in Energy, Environment and Sustainability', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-civil', c: 'bits', lv: 'ug', name: 'B.E. Civil Engineering', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'be', c: 'bits', lv: 'ug', name: 'B.E. Computer Science', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-electronics-communication', c: 'bits', lv: 'ug', name: 'B.E. Electronics and Communication Engineering', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-electronics-computer', c: 'bits', lv: 'ug', name: 'B.E. Electronics and Computer Engineering', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-electrical', c: 'bits', lv: 'ug', name: 'B.E. Electrical and Electronics Engineering', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-mathematics', c: 'bits', lv: 'ug', name: 'B.E. Mathematics and Computing', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-mechanical', c: 'bits', lv: 'ug', name: 'B.E. Mechanical Engineering', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-aerospace', c: 'bits', lv: 'ug', name: 'B.E. Mechanical (Aerospace)', degree: 'Bachelor of Engineering with Specialization in Aerospace', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-robotics', c: 'bits', lv: 'ug', name: 'B.E. Robotics and Industrial Automation', degree: 'Bachelor of Engineering', dur: '4 years', fee: 'AED 55,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bba-b', c: 'bits', lv: 'ug', name: 'BBA (Honors)', degree: 'Bachelor of Business Administration (Honors)', dur: '4 years', fee: 'AED 37,500/year', eligibility: 'Minimum 60% in Grade 12' },
  { id: 'bits-me-civil', c: 'bits', lv: 'pg', name: 'M.E. Civil (Infrastructure Engineering and Management)', degree: 'Master of Engineering with Specialization in Infrastructure Engineering and Management', dur: '2 years', fee: 'AED 33,600/year', eligibility: 'Minimum 60% in B.E./B.Tech in Civil Engineering or equivalent' },
  { id: 'bits-me-electrical', c: 'bits', lv: 'pg', name: 'M.E. Electrical (Power Electronics and Drives)', degree: 'Master of Engineering with Specialization in Power Electronics and Drives', dur: '2 years', fee: 'AED 33,600/year', eligibility: 'Minimum 60% in B.E./B.Tech/M.Sc. or equivalent in a relevant discipline' },
  { id: 'me', c: 'bits', lv: 'pg', name: 'M.E. Software Systems', degree: 'Master of Engineering', dur: '2 years', fee: 'AED 33,600/year', eligibility: 'Minimum 60% in B.E./B.Tech/M.Sc./MCA or equivalent' },
  { id: 'mba-b', c: 'bits', lv: 'pg', name: 'MBA', degree: 'Master of Business Administration', dur: '2 years', fee: 'AED 33,600/year', eligibility: "Minimum 60% in a Bachelor's degree" },
  { id: 'bits-mba-analytics', c: 'bits', lv: 'pg', name: 'MBA (Business Analytics)', degree: 'Master of Business Administration in Business Analytics', dur: '2 years', fee: 'AED 33,600/year', eligibility: "Minimum 60% in a Bachelor's degree" },
]

export interface CareerCategory {
  title: string
  icon: string
  desc: string
  courseIds: string[]
  roles: string[]
  roleLabel: string
}

export const CAREERS: CareerCategory[] = [
  {
    title: 'Technology and AI',
    icon: 'code',
    desc: 'Build software, analyse data, and work with AI tools in Dubai’s booming tech sector.',
    courseIds: ['bca-ai', 'btech', 'be', 'me'],
    roles: ['Machine Learning (ML) Engineer', 'AI Developer / AI Engineer', 'Data Scientist', 'Data Analyst', 'AI / Business Intelligence (BI) Consultant'],
    roleLabel: 'Top Job Roles',
  },
  {
    title: 'Business and Finance',
    icon: 'biz',
    desc: 'Support trade, banking, retail, and corporate teams in one of the region’s leading business hubs.',
    courseIds: ['bba-s', 'bba-b', 'bcom', 'mba-s', 'mba-b'],
    roles: ['Management Consultant', 'Product Manager (PM)', 'Marketing Manager', 'Business Analyst', 'Operations Manager'],
    roleLabel: 'Top Job Roles',
  },
  {
    title: 'Engineering and Construction',
    icon: 'eng',
    desc: 'Contribute to the infrastructure, design, and projects shaping Dubai’s skyline.',
    courseIds: ['be'],
    roles: ['Project Engineer', 'Design Engineer', 'Site Engineer', 'Quality Engineer'],
    roleLabel: 'Top Job Roles',
  },
  {
    title: 'Arts and Communication',
    icon: 'book',
    desc: 'Build careers in research, media, communication, and education.',
    courseIds: ['bsc-psych', 'ba-media'],
    roles: ['Research Assistant', 'Content and Media Executive', 'Communications Executive', 'Teaching Assistant'],
    roleLabel: 'Typical roles',
  },
]

export const VISA_BEFORE: string[] = [
  'Unconditional offer letter from your university',
  "Valid passport with at least six months' validity",
  'Completed student visa application form',
  'Initial tuition deposit, as set by your university',
  'Receipts for visa fee, medical fee, and any refundable deposit',
  'Entry permit or visa approval, arranged through your university',
  'Flight booking and accommodation for your first few weeks',
]

export const VISA_AFTER: string[] = [
  'Medical fitness test at an approved centre',
  'Emirates ID registration, including biometrics',
  'Complete your UAE residence permit formalities',
  'Health insurance, as required in your emirate',
  'University registration and orientation',
  'Keep digital and physical copies of your passport, entry permit, Emirates ID and insurance documents',
]

export interface TestimonialItem {
  name: string
  programme: string
  college: string
  c: 'sym' | 'bits'
  quote: string
  photo?: string
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Aanya Sharma',
    programme: 'BCA in AI and ML',
    college: 'Symbiosis International University Dubai',
    c: 'sym',
    quote: "Moving to Dubai for my studies was a big step, but the welcoming campus environment and constant support from my professors made the transition much easier. I've grown more confident with every semester.",
  },
  {
    name: 'Rohan Nair',
    programme: 'BE in Computer Science',
    college: 'BITS Pilani Dubai',
    c: 'bits',
    quote: 'What I appreciate most about studying here is the balance between classroom learning and practical exposure. Working on projects and learning from experienced faculty have made my academic journey truly rewarding.',
  },
  {
    name: 'Ishita Menon',
    programme: 'BBA',
    college: 'Symbiosis International University Dubai',
    c: 'sym',
    quote: 'Studying in Dubai has given me the opportunity to interact with people from different backgrounds and understand business from a wider perspective. The classroom discussions have helped me become more confident.',
  },
  {
    name: 'Aditya Kulkarni',
    programme: 'BE in Electronics and Communication Engineering',
    college: 'BITS Pilani Dubai',
    c: 'bits',
    quote: "One of the best parts of my university experience has been the people I've met and the opportunities to explore beyond academics. The faculty have always encouraged us to ask questions and think independently.",
  },
  {
    name: 'Meera Krishnan',
    programme: 'MBA',
    college: 'Symbiosis International University Dubai',
    c: 'sym',
    quote: 'My experience at Symbiosis International University Dubai has helped me develop both personally and professionally. The interactive learning environment, faculty guidance and exposure to different perspectives have made a real difference.',
  },
]

export const INDIAN_STATES: string[] = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Outside India',
]

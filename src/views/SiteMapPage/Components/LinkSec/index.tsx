import Link from 'next/link'

interface SitemapData {
  college: { id: number; slug: string; name: string }[]
  university: { id: number; slug: string; name: string }[]
  school: { id: number; slug: string; name: string }[]
  scholarships: { id: number; slug: string; name: string }[]
  schoolboards: { id: number; slug: string; name: string }[]
  generalcourse: { id: number; slug: string; name: string }[]
  stream: {
    slug: any; id: number; name: string 
}[]
  exam: { id: number; slug: string; exam_title: string }[]
  blog: { id: number; slug: string; name: string }[]
  newsandevents: { id: number; slug: string; name: string }[]
}

interface Props {
  data: SitemapData | null
}

const STATIC_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: '/exams', label: 'Exams' },
  { href: '/career', label: 'Careers' },
  { href: '/services', label: 'Services' },
  { href: '/nri-quota', label: 'NRI Quota' },
  { href: '/news', label: 'News' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/education-loan', label: 'Educational Loan' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/students-speak', label: "Student's Speak" },
  { href: '/study-in-usa', label: 'Study Abroad' },
  { href: '/boards', label: 'Boards' },
  { href: '/our-team', label: 'Our team' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Term & Condition' },
  { href: '/disclaimer', label: 'Disclaimer' },
]

function SitemapGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className='py-2'>
      <h2 className='fw-bold text-blue mb-3'>{title}</h2>
      <div className='row text-black'>{children}</div>
    </div>
  )
}

export default function LinkSec({ data }: Props) {
  return (
    <section className='bg-white siteMapSec py-2'>
      <div className='container'>
        <div className='py-2'>
          <h2 className='fw-bold text-blue mb-3'>Information</h2>
          <div className='row text-black'>
            {[0, 1, 2, 3].map((colIdx) => (
              <div key={colIdx} className='col-md-3'>
                <ul>
                  {STATIC_LINKS.slice(colIdx * 5, colIdx * 5 + 5).map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className='text-black'>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {data && (
          <>
            <SitemapGroup title='Colleges'>
              {data.college.map((college) => (
                <div key={college.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/college/${college.id}/${college.slug}`} className='text-black'>
                        {college.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>

            <SitemapGroup title='Universities'>
              {data.university.map((university) => (
                <div key={university.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/university/${university.id}/${university.slug}`} className='text-black'>
                        {university.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>

            <SitemapGroup title='Schools'>
              {data.school.map((school) => (
                <div key={school.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/school/${school.id}/${school.slug}`} className='text-black'>
                        {school.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>

            <SitemapGroup title='Scholarships'>
              {data.scholarships.map((scholarship) => (
                <div key={scholarship.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/scholarship/${scholarship.id}/${scholarship.slug}`} className='text-black'>
                        {scholarship.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>

            <SitemapGroup title='School Boards'>
              {data.schoolboards.map((board) => (
                <div key={board.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/board/${board.id}/${board.slug}`} className='text-black'>
                        {board.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>

            <SitemapGroup title='General Course'>
              {data.generalcourse.map((course) => (
                <div key={course.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/course/${course.id}/${course.slug}`} className='text-black'>
                        {course.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>

            <SitemapGroup title='Streams'>
              {data.stream.map((stream) => (
                <div key={stream.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/course/${stream.id}/${stream.slug}`} className='text-black'>
                        {stream.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>

            <SitemapGroup title='Exams'>
              {data.exam.map((exam) => (
                <div key={exam.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/exam/${exam.id}/${exam.slug}`} className='text-black'>
                        {exam.exam_title}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>

            <SitemapGroup title='Blogs'>
              {data.blog.map((blog) => (
                <div key={blog.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/blog/${blog.id}/${blog.slug}`} className='text-black'>
                        {blog.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>

            <SitemapGroup title='News & Events'>
              {data.newsandevents.map((news) => (
                <div key={news.id} className='col-md-3'>
                  <ul>
                    <li>
                      <Link href={`/news/${news.id}/${news.slug}`} className='text-black'>
                        {news.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </SitemapGroup>
          </>
        )}
      </div>
    </section>
  )
}

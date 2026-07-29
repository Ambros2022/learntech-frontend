import Image from 'next/image'
import Link from 'next/link'

const portals = [
  {
    href: 'https://bangalorestudy.com/',
    logo: '/images/icons/Logo_Bangalore_Study.png',
    alt: 'Bangalore Study',
  },
  {
    href: 'https://www.keralastudy.com/',
    logo: '/images/icons/Logo_Kerala_Study.png',
    alt: 'Kerala Study',
  },
  {
    href: 'https://topmbastudy.com/',
    logo: '/images/icons/Logo_MBA_Study.png',
    alt: 'Top MBA Study',
  },
  {
    href: 'https://coimbatorestudy.com/',
    logo: '/images/icons/Logo_Coimbatore_Study.png',
    alt: 'Coimbatore Study',
  },
]

const OurPortalSec = () => {
  return (
    <section className="bg-white py-5 pt-md-2">
      <div className="container">
        <h2 className="fw-bold text-blue text-center">Our Portals</h2>
        <div className="d-flex gap-5 mt-4 flex-wrap justify-content-center">
          {portals.map((portal) => (
            <div className="bg-skyBlue rounded hover-card" key={portal.href}>
              <Link href={portal.href} target="_blank" rel="noopener noreferrer" aria-label={portal.alt}>
                <Image
                  src={portal.logo}
                  width={200}
                  height={200}
                  alt={`${portal.alt} logo`}
                  className="img-fluid"
                  loading="lazy"
                  sizes="(max-width: 768px) 150px, 200px"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPortalSec

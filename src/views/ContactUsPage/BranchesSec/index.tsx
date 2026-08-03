import { LazyBranchesMapClient } from 'src/app/components/ClientWrappers'

const branchData = [
  {
    name: 'Bangalore (Headquarters)',
    address: `#80 (4), 'D' Main Rd, East End, 9th Block, Jayanagar, Bangalore, Karnataka - 560041`,
    phone: '+91 9036020016, +91 9036020005',
    addressUrl: 'https://maps.app.goo.gl/m4Fu8fGQQEs6q1Cf6',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.827772809437!2d77.59573057356702!3d12.918788516036988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15064e759943%3A0x60dcac77858f6b5e!2sLearntech%20Edu%20Solutions%20Pvt%20Ltd%20-%20Study%20Abroad%20Counselor!5e0!3m2!1sen!2sin!4v1718369620720!5m2!1sen!2sin',
  },
  {
    name: 'Kerala',
    address:
      'Office No. 2423, 4th Floor, HiLITE Business Park Phase 2 - Tower 2, Kozhikode, Kerala 673014',
    phone: '+91 9895149750, +91 9036020005',
    addressUrl: 'https://maps.app.goo.gl/L4e3ceDtH1Dyx62W7',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0645638101416!2d75.830901!3d11.2474788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b2adf0f23a7%3A0xeaa072a82e5d541e!2sHiLITE%20Business%20Park%20Phase%202%20-%20Tower%202!5e0!3m2!1sen!2sin!4v1718369620720!5m2!1sen!2sin',
  },
  {
    name: 'Dubai',
    address:
      '3rd Floor, Office no 15, Room no 3, Al Itihaad road, Al Mamzar centre, Hor Al Anz, Dubai, UAE',
    phone: '+971 502436552, +971 504955123',
    addressUrl: 'https://maps.app.goo.gl/gLUszwjiymKMNshy6',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3626.500668691771!2d55.3535228!3d25.280322!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d0fd57734fd%3A0xfea3c00a8bbf8117!2sMamzar%20Centre!5e1!3m2!1sen!2sin!4v1759301871746!5m2!1sen!2sin',
  },
  {
    name: 'Bahrain',
    address:
      'Building No: 155, Road: 2103, Block: 321, Manama, Alqudaybiyah Kingdom of Bahrain',
    phone: '+973 35480190, +973 38780368',
    addressUrl: 'https://maps.app.goo.gl/LMueZrcnxYG2xYMi9',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580.1815282428278!2d50.58968752449173!3d26.22760670691746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af4e672213e1%3A0x7945040ea1e6a385!2s321%20Rd%20No%202103%2C%20Manama%2C%20Bahrain!5e0!3m2!1sen!2sin!4v1735199459263!5m2!1sen!2sin',
  },
]

const BranchesSec = () => {
  return (
    <section className='bg-white branchLink pb-5'>
      <div className="container">
        <h2 className='text-center fw-bold text-blue mb-3'>FIND US @</h2>
        <h2 className='text-center fw-bold text-blue mb-3'>Our Branches</h2>

        {/* SEO: Static branch addresses & links — always server-rendered and crawlable */}
        <ul className="visually-hidden" aria-hidden="true">
          {branchData.map((branch, i) => (
            <li key={i}>
              <a href={branch.addressUrl} target="_blank" rel="noreferrer" tabIndex={-1}>
                {branch.name} — {branch.address}
              </a>
            </li>
          ))}
        </ul>

        {/* Interactive: branch card selector + Google Maps iframe */}
        <LazyBranchesMapClient branches={branchData} />
      </div>
    </section>
  )
}

export default BranchesSec

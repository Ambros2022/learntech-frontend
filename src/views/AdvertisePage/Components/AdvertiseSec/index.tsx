import Image from 'next/image'
import { LazyContactUsForm as ContactUsForm } from 'src/app/components/ClientWrappers'
import ServiceTabs from './ServiceTabs'

type Banner = { image?: string }
type AdvertiseSecProps = { banners: Banner[] }

const digitalIcons = [
  { src: '/images/avertise/Social_Media_Marketing_3.png', label: 'Social Media Marketing', alt: 'Social Media Marketing-logo' },
  { src: '/images/avertise/Content_Marketing_3.png', label: 'Content Marketing', alt: 'Content Marketing-logo' },
  { src: '/images/avertise/Pay-Per-Click_3.png', label: 'Pay-Per-Click', alt: 'Pay-Per-Click-logo' },
  { src: '/images/avertise/Direct_Marketing_3.png', label: 'Direct Marketing', alt: 'Direct Marketing-logo' },
]

const fieldIcons = [
  { src: '/images/avertise/Expos_and_Educational_Fairs_3.png', label: 'Expos and Educational Fairs', alt: 'Expos and Educational Fairs' },
  { src: '/images/avertise/Print-Media_Advertising_3.png', label: 'Print-Media Advertising', alt: 'Print-Media Advertising' },
  { src: '/images/avertise/Transit_Advertising_3.png', label: 'Transit Advertising', alt: 'Transit Advertising' },
  { src: '/images/avertise/Influencer_Marketing_3.png', label: 'Influencer Marketing', alt: 'Influencer Marketing-logo' },
  { src: '/images/avertise/Collaborations_With_Local_Institutes_3.png', label: 'Collaborations with Local Institutes', alt: 'Collaborations with Local Institutes' },
  { src: '/images/avertise/Targeted Survey_Analysis_3.png', label: 'Targeted Survey Analysis', alt: 'Targeted Survey Analysis' },
]

const IconGrid = ({ icons }: { icons: typeof digitalIcons }) => (
  <div className="row text-center adv17">
    {icons.map(icon => (
      <div className="col-6" key={icon.label}>
        <Image src={icon.src} width={80} height={80} alt={icon.alt} loading="lazy" />
        <h5 className="text-black fw-bold pt-3 pb-2">{icon.label}</h5>
      </div>
    ))}
  </div>
)

const PartnerCta = () => (
  <div className="text-black text-center">
    <p className="text-black text-center pt-3" style={{ fontSize: '18px' }}>
      Efficient education services marketing is necessary for any institute to thrive. By advertising with us, not only will your institute gain global recognition, but also succeed in nurturing a group of potential individuals, thereby moulding the pioneers of tomorrow.
    </p>
    <h4 className="fw-bold pt-3 text-blue">So Why the Wait!!!</h4>
    <h5 className="fw-bold pt-3 pb-3">Partner With Us!</h5>
  </div>
)

const studentsContent = (
  <>
    <p className="text-black">
      Digital marketing for educational institutions can be done through a plethora of activities. Some of them are:
    </p>
    <IconGrid icons={digitalIcons} />
    <h3 className="text-black fw-bold pt-3">Social Media Marketing:</h3>
    <p className="text-black">
      The marketing educational services rendered through our social media handles are designed to showcase the distinct features of your institute. We make use of various platforms such as Instagram, Facebook, Twitter, Youtube and so on to bring forth the unique aspects of higher education marketing. For example, we aid in creating customised Instagram reels that provide a glimpse of your institute’s attributes such as its recent achievements, facilities, etc. Additionally, well-curated YouTube videos are designed to offer a comprehensive view of your institute’s campus life and more to the right audience at the right time.
    </p>
    <h3 className="text-black fw-bold pt-3">Content Marketing:</h3>
    <p className="text-black">
      We offer excellent content across a range of advertising formats and solutions to enhance your SEO results, reach your targeted audience, and thereby, yield higher visibility. Some of our primary content marketing strategies include creating university/ college/ school-specific content that provides a comprehensive overview of each institution, along with blogs and articles to showcase their distinct features. While the directory of institutions on our website offers a literary perspective of each institute, we also work on customised infographics, images, posts and so on to provide a visual representation of the available information, making it easier to understand. Additionally, we focus on user-generated content such as reviews and testimonials, as well as interactive content like quizzes, polls, and surveys to keep the audience engaged throughout their reading experience.
    </p>
    <h3 className="text-black fw-bold pt-3">Pay-Per-Click (PPC):</h3>
    <p className="text-black">
      We specialise in running advertising campaigns on Google ads as a key factor of our marketing strategy. Some of the advantages of utilising this particular educational marketing solution include detailed analysis of the ad’s performance with respect to conversions, flexibility in adjusting campaigns, procuring immediate results while being cost-effective, gaining insights into the client’s pattern, and much more. Thus, aiding in generating substantial leads and enhancing brand awareness.
    </p>
    <h3 className="text-black fw-bold pt-3">Direct Marketing:</h3>
    <p className="text-black">
      Direct marketing is a unique form of digital marketing strategy that aids in communicating essential information to specific individuals. By joining with us, we will assist in conveying your institution’s features through various direct marketing tactics, such as WhatsApp marketing and direct mail advertising. These methods are known to offer efficient marketing services for schools and facilitate college and university partnerships. The primary advantages of these strategies include building genuine customer relationships, increasing brand effectiveness, enabling personalised engagement and more.
    </p>
  </>
)

const collegesContent = (
  <>
    <p className="text-black">
      Some of the ‘On-Field’ educational advertising strategies that are inculcated by Learntech to improve your institute’s brand recognition are:
    </p>
    <IconGrid icons={fieldIcons} />
    <h3 className="text-black fw-bold pt-3">Expos and Educational Fairs:</h3>
    <p className="text-black">
      Learntech strongly believes in establishing mutual understanding with its clients, and the best way to achieve that is by participating in our expos, educational fairs, exhibitions, and seminars. These initiatives act as a forum to connect a community of educators and enable institutional and university partnerships.
    </p>
    <h3 className="text-black fw-bold pt-3">Print-Media Advertising:</h3>
    <p className="text-black">
      Ever since its inception, newspapers and magazines have played a crucial role in brand management. By acknowledging the primary use of these promotional tools, Learntech aspires to offer effective educational marketing solutions to institutions.
    </p>
    <h3 className="text-black fw-bold pt-3">Transit Advertising:</h3>
    <p className="text-black">
      What’s the one thing that we all have in common? Vehicles. Learntech focuses on marketing educational services for institutions by advertising on various forms of public transportation. This form of traditional education marketing strategy provides geographical flexibility and a high demographic reach as it draws the attention of a general audience.
    </p>
    <h3 className="text-black fw-bold pt-3">Influencer Marketing:</h3>
    <p className="text-black">
      Our global reach has enabled us to collaborate with several well-known influencers who can aid in university and college promotions. The Influencers that we partner with include social media personalities, bloggers, industry experts, and more. By collaborating with these acclaimed individuals, Learntech aims to bring about transparency between you and your intended audience while establishing a sense of authenticity within the community of educators.
    </p>
    <h3 className="text-black fw-bold pt-3">Collaborations with Local Institutes:</h3>
    <p className="text-black">
      At Learntech, we want your institute to attain global recognition. That is exactly why we offer our services towards achieving academic partnerships with colleges and universities as it plays a major role in enhancing higher education marketing and extending the reach of an institute.
    </p>
    <h3 className="text-black fw-bold pt-3">Targeted Survey Analysis:</h3>
    <p className="text-black">
      In today’s era, every institution requires feedback to help understand the strengths and weaknesses of its activities. Conducting a niche survey analysis will help institutes in being able to meet the academic and co-curricular needs of their clients. With this goal in mind, we prioritise on gathering feedback and reviews from every student to enable high-yielding campaign optimisation models that can track important performance measures such as engagement rates, website traffic and sales conversions.
    </p>
  </>
)

const AdvertiseSec = ({ banners }: AdvertiseSecProps) => {
  return (
    <section className="bg-white">
      <div className="container">
        <h1 className="pt-3 mb-3 text-blue fw-bold">Advertise With Us</h1>
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-7">
            <p className="text-black">
              ‘Learntech’, a platform designed to elevate your brand/ institute one step at a time.
            </p>
            <h2 className="text-black fw-bold pt-2">How?</h2>
            <p className="text-black">
              By considering the evolution of the world into a digital landscape while holding onto the traditional aspects of marketing, we advertise to students through two primary means of education marketing strategies. I.e.
            </p>
            <ServiceTabs studentsContent={studentsContent} collegesContent={collegesContent} />
          </div>

          <div className="col-12 d-block d-md-none">
            <PartnerCta />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-5">
            <div className="row">
              <div className="col-md-12 col-lg-12 bg-skyBlue p-3 rounded mb-3 py-md-3 py-3">
                <h2 className="text-center fw-bold text-blue pt-2 mb-3 py-md-3">Connect With Us</h2>
                <ContactUsForm />
              </div>
              {banners?.length > 0 && (
                <div className="col-md-12 col-lg-12 mb-3 mx-md-0 pt-3 pt-md-5">
                  <div className="bg-skyBlue rounded border text-center">
                    {banners.map((banner, index) =>
                      banner.image ? (
                        <Image
                          key={`${banner.image}-${index}`}
                          src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                          alt={`Learntech advertise banner ${index + 1}`}
                          width={420}
                          height={400}
                          loading="lazy"
                          sizes="(max-width: 991px) 100vw, 33vw"
                          className="img-fluid"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      ) : null,
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-12 d-none d-md-block">
            <PartnerCta />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdvertiseSec

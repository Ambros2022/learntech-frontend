import Link from 'next/link'
import Image from 'next/image'
import { getPageData } from 'src/lib/api/common'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const PAGE_PATH = '/thank-you'
const DEFAULT_TITLE = 'Thank You | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
    'Thank you for reaching out! Our counsellors will get in touch with you shortly. Learntech Edu Solutions provides admission guidance for top colleges in India & Abroad.'

export async function generateMetadata() {
    const data = await getPageData('thank-you')
    const title = data?.meta_title || DEFAULT_TITLE
    const description = data?.meta_description || DEFAULT_DESCRIPTION
    const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

    return {
        title,
        description,
        keywords: data?.meta_keyword || '',
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'Learntech Edu Solutions',
            locale: 'en_IN',
            type: 'website',
            images: [
                {
                    url: `${BASE_URL}/images/icons/learntech-logo.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Learntech Edu Solutions',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        robots: {
            index: false,
            follow: true,
        },
    }
}

export default async function ThankYouPage() {
    // React.cache() deduplicates — no double fetch with generateMetadata
    const data = await getPageData('thank-you')

    return (
        <>
            {/* Thank You Content Section */}
            <section className="bg-skyBlue thnkCon">
                <div className="container py-5">
                    <div className="d-flex justify-content-center">
                        <div className="text-center align-content-center">
                            <Image
                                src="/images/icons/thankyou-ing.png"
                                alt="Thank You - Learntech Edu Solutions"
                                width={70}
                                height={70}
                                priority
                            />
                            <h1 className="text-blue fw-bold">Thank you!</h1>
                            <h6 className="fw-bold text-black mb-3">
                                Our counsellors will get in touch with you shortly. You could also call us on{' '}
                                <a href="tel:18001208696" className="text-blue text-decoration-none">
                                    18001208696
                                </a>{' '}
                                (toll-free) for further queries.
                            </h6>
                            <h6 className="text-black mb-3">Stay updated with the Learntech Edu Solutions Pvt. Ltd.</h6>
                            <div className="d-flex gap-3 justify-content-center flex-md-row flex-column mx-5 mx-md-0 flex-wrap socialThnks">
                                <Link
                                    className="text-blue btn viewDetailBtn"
                                    href="https://www.facebook.com/learntechedu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow Learntech on Facebook"
                                >
                                    <Image
                                        width={27}
                                        height={27}
                                        className="mx-2 p-1 rounded"
                                        src="/images/icons/facebookForm.svg"
                                        alt="Facebook icon"
                                    />
                                    Facebook
                                </Link>
                                <Link
                                    className="text-blue btn viewDetailBtn"
                                    href="https://www.instagram.com/learntechedus"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow Learntech on Instagram"
                                >
                                    <Image
                                        width={27}
                                        height={27}
                                        className="mx-2 p-1 rounded"
                                        src="/images/icons/InstagramForm.jpg"
                                        alt="Instagram icon"
                                    />
                                    Instagram
                                </Link>
                                <Link
                                    className="text-blue btn viewDetailBtn"
                                    href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow Learntech on LinkedIn"
                                >
                                    <Image
                                        width={27}
                                        height={27}
                                        className="mx-2 p-1 rounded"
                                        src="/images/icons/linkedin.svg"
                                        alt="LinkedIn icon"
                                    />
                                    Linkedin
                                </Link>
                                <Link
                                    className="text-blue btn viewDetailBtn"
                                    href="https://twitter.com/learntechww"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow Learntech on Twitter"
                                >
                                    <Image
                                        width={27}
                                        height={27}
                                        className="mx-2 p-1 rounded"
                                        src="/images/icons/twitterForm.svg"
                                        alt="Twitter icon"
                                    />
                                    Twitter
                                </Link>
                            </div>
                            <Link href="/" className="mt-4 btn errBtn mb-3">
                                BACK TO HOME
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

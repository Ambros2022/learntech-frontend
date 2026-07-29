import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import ContactForm from 'src/@core/components/popup/ContactForm';
import ReadMoreContent from 'src/components/ui/ReadMoreWrapper';

const OverviewSec = ({
    data = {},
    banners = [],
    courses = []
}: {
    data?: { meta_title?: string, top_description?: string },
    banners?: any[],
    courses?: any[]
}) => {
    return (
        <>
            <section className='bg-white pt-2 pb-5' style={{ fontFamily: 'Poppins !important' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-7 col-10 mx-auto minehightnriquto">
                            <ReadMoreContent html={data.top_description || ''} collapsedHeight={1760} />
                        </div>
                        <div className="col-xl-4 col-lg-4 pt-4  pt-md-0 col-md-5 nri-h2">
                            <ContactForm heading={'Expert Guidance for Securing NRI Quota Seats'} />
                            <h2 className='pt-5 fw-bold text-blue text-center mb-3 '>Top Trending Courses</h2>
                            <div className='p-3 border mt-3 rounded bg-skyBlue minehightnriquto'>
                                <div className='overflow-y-auto' style={{ maxHeight: 'calc(7 * 100px)' }}>
                                    {courses.map(course => (
                                        <Link href={`/course/${course.id}/${course.slug}`} key={course.id}>
                                            <div className="card p-3 mb-3 hover-card2">
                                                <div className="row">
                                                    <div className="col-md-3 col-xl-2 mb-md-0 mb-3 text-md-start text-center">
                                                        {course.logo && (
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${course.logo}`}
                                                                alt={`${course.name}-logo`}
                                                                width={50}
                                                                height={50}
                                                                style={{ objectFit: 'contain' }}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="col-md-9 col-xl-10 d-flex justify-content-md-start justify-content-center">
                                                        <h5 className='ms-4 text-blue align-self-center fw-bold text-md-start text-center'>{course.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className='row g-2 p-3 bg-skyBlue mt-5 rounded'>
                                <div className="col-md-12">
                                    {banners.map((banner, index) => (
                                        <Link href={banner?.link || '#'} key={index}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                                                height={500}
                                                width={500}
                                                className='img-fluid'
                                                alt={`Banner ${index}`}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OverviewSec;


import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import ContactForm from 'src/@core/components/popup/ContactForm'
import axios1 from 'src/configs/axios'

// Define the OverviewSec component
const OverviewSec = ({ data = {} }: { data?: { meta_title?: string, meta_description?: string } }) => {
    const [courses, setCourses] = useState<any[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [banners, setBanners] = useState<any[]>([]);

    const getbanner = useCallback(async () => {
        try {
            const roleparams: any = { page: 1, size: 10000 };
            const response = await axios1.get('api/website/banner/get?promo_banner=Nri_page', { params: roleparams });
            setBanners(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setImagesLoaded(true);
        }
    }, []);

    useEffect(() => {
        getbanner();
    }, [getbanner]);

    // Fetch courses from the API
    const getStreams = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 100;
            const response = await axios1.get('api/website/stream/get?orderBy=asc&columnname=listing_order', { params: roleparams });
            // const response = await axios1.get('api/website/streams/get?orderBy=asc&columnname=listing_order', { params: roleparams });
            setCourses(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    // Call getStreams when the component mounts
    useEffect(() => {
        getStreams();
    }, [getStreams]);

    return (
        <>
            <section className='bg-white pt-2 pb-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-7 col-10 mx-auto">
                            <p className='text-black'>{data.meta_title}</p>
                            <p className='text-black'>{data.meta_description}</p>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-5">
                            <ContactForm heading={'Get More Details'} />
                            <h4 className='pt-3 fw-bold text-blue text-center mb-3'>Top Trending Courses</h4>
                            <div className='p-3 border mt-3 rounded bg-skyBlue'>
                                <div className='overflow-y-auto' style={{ maxHeight: 'calc(7 * 100px)' }}>
                                    {courses.map(course => (
                                        <Link href={`/course/${course.id}/${course.slug}`}>
                                            <div className="card p-3 mb-3 hover-card2" key={course.id}>
                                                <div className="row">
                                                    <div className="col-md-3 col-xl-2 mb-md-0 mb-3 text-md-start text-center">
                                                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${course.logo}`} alt={`${course.name}-logo`} width={50} height={50} />
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
                            <div className='row g-2 p-3 bg-skyBlue mt-3 rounded'>
                                <div className="col-md-12">
                                    {banners.map((banner, index) => (
                                        <a href={banner.link}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                                                priority={true}
                                                height={500} width={500} className='img-fluid'
                                                alt={`Banner ${index}`}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OverviewSec;

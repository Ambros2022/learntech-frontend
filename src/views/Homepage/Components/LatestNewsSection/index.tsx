import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import axios1 from 'src/configs/axios';
import NewsCarousel from '../NewsCarousel';
import Link from 'next/link';

function LatestNewsSection() {
    const [activeTab, setActiveTab] = useState<'news' | 'blogs'>('news');
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [blogItems, setBlogItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [banners, setBanners] = useState<any[]>([]);

    const getBanner = useCallback(async () => {
        try {
            const roleParams: any = { page: 1, size: 10000 };
            const response = await axios1.get('api/website/banner/get?promo_banner=Home_news_page', { params: roleParams });
            setBanners(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setImagesLoaded(true);
        }
    }, []);

    useEffect(() => {
        getBanner();
    }, [getBanner]);

    const fetchData = useCallback(async (tab: 'news' | 'blogs') => {
        setLoading(true);
        try {
            const roleParams = { page: 1, size: 8, type: tab, orderby: 'desc', columnname: 'created_at' };
            const response = await axios1.get('api/website/newsandblogs/get', { params: roleParams });

            if (response.data && response.data.status === 1) {
                const data = response.data[tab].data;
                if (tab === 'news') {
                    setNewsItems(data);
                } else {
                    setBlogItems(data);
                }
            } else {
                console.error('Invalid API response structure:', response);
                if (tab === 'news') {
                    setNewsItems([]);
                } else {
                    setBlogItems([]);
                }
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            if (tab === 'news') {
                setNewsItems([]);
            } else {
                setBlogItems([]);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab, fetchData]);

    const handleTabClick = (tab: 'news' | 'blogs', event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setActiveTab(tab);
        fetchData(tab);
    };

    const combinedItems = activeTab === 'news' ? newsItems : blogItems;

    return (
        <section className="latestNewsCon" style={{ backgroundImage: banners[0] ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.NEXT_PUBLIC_IMG_URL}/${banners[0].image})` : 'none', backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <div className="container pt-5">
                <h2 className="fw-bold text-white text-center">Latest News & Blogs</h2>
                <div className="nav-pills justify-content-center pt-3 gap-2 d-flex" role="tablist">
                    <button
                        className={`btn px-4 newsBtn ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick('news', e)}
                    >
                        News
                    </button>
                    <button
                        className={`btn px-4 blgBtn ${activeTab === 'blogs' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick('blogs', e)}
                    >
                        Blogs
                    </button>
                </div>
                <div className="card-con pt-5">
                    <NewsCarousel items={combinedItems.map((item) => (
                        <div className="col-12 mb-1" style={{ margin: '0px 5px' }} key={item.id}>
                            <Link href={`/${activeTab}/${item.id}/${item.slug}`}>
                                {/* <div className="newsBlosCards">
                                    <div className="mb-5 mx-lg-3 mx-0">
                                        <div className="card h-100 hover-card" style={{ background: 'url(/images/icons/Card.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                            <div className="card-body newsheight">
                                                <h5 className="card-title fw-bold text-blue text-truncate">{item.name}</h5>
                                                <h6 className="card-subtitle py-2 mb-2 text-body-secondary">
                                                    {item.created_at ? format(new Date(item.created_at), 'dd-MMM-yyyy') : 'No Date Available'}
                                                </h6>
                                                <div className="row mb-3">
                                                    <div className="col-xl-8">
                                                        <p className="card-text">{item.meta_description}</p>
                                                    </div>
                                                </div>
                                                <Link href={`/${activeTab}/${item.id}/${item.slug}`} className="btn viewDetailBtn">
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="newsBlosCards">
                                    <div className="mb-5 mx-lg-3 mx-0">
                                        <div className="card h-100 hover-card responsive-card">
                                            <div className="card-body newsheight">
                                                <h5 className="card-title fw-bold text-blue text-truncate">{item.name}</h5>
                                                <h6 className="card-subtitle py-2 mb-2 text-body-secondary">
                                                    {item.created_at ? format(new Date(item.created_at), 'dd-MMM-yyyy') : 'No Date Available'}
                                                </h6>
                                                <div className="row mb-3">
                                                    <div className="col-xl-8">
                                                        <p className="card-text">{item.meta_description}</p>
                                                    </div>
                                                </div>
                                                <Link href={`/${activeTab}/${item.id}/${item.slug}`} className="btn viewDetailBtn">
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))} />
                </div>
            </div>
        </section>
    );
}

export default LatestNewsSection;

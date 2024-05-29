import { format } from 'date-fns';
import React, { useState, useEffect, useCallback } from 'react';
import axios1 from 'src/configs/axios';

function LatestNewsSection() {
    const [activeTab, setActiveTab] = useState<'news' | 'blogs'>('news');
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [blogItems, setBlogItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async (tab: 'news' | 'blogs') => {
        setLoading(true);
        try {
            const roleparams = { page: 1, size: 10000, type: tab };
            const response = await axios1.get('api/website/newsandblogs/get', { params: roleparams });

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
        event.preventDefault(); // Prevent default anchor behavior
        setActiveTab(tab);
        fetchData(tab);
    };

    return (
        <section className="latestNewsCon">
            <div className="container pt-5">
                <h3 className="fw-bold text-center">Latest News & Blogs</h3>
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
                    <div className="row">
                        {loading ? (
                            <div className="col-12">
                                <p className="text-center">Loading...</p>
                            </div>
                        ) : (
                            (activeTab === 'news' ? newsItems : blogItems).length > 0 ? (
                                (activeTab === 'news' ? newsItems : blogItems).map((item) => (
                                    <div className="col-md-4 mb-1" key={item.id}>
                                        <div className="newsBlosCards">
                                            <div className="mb-5">
                                                <div className="card h-100">
                                                    <div className="card-body newsheight ">
                                                        <h6 className="card-subtitle  mb-2 text-body-secondary">
                                                            {item.created_at ? format(new Date(item.created_at), 'yyyy-MM-dd') : 'No Date Available'}
                                                        </h6>
                                                        <h5 className="card-title  fw-bold text-blue text-truncate">{item.meta_title}</h5>
                                                        <p className="card-text ">{item.meta_description}</p>
                                                        <a href={item.link} className="btn readBtn card-link">Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <p className="text-center">No items to display</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LatestNewsSection;

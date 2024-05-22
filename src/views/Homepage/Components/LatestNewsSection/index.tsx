import { format } from 'date-fns';
import React, { useState, useEffect, useCallback } from 'react';
import axios1 from 'src/configs/axios';

function LatestNewsSection() {
    const [activeTab, setActiveTab] = useState<'news' | 'blogs'>('news');
    const [items, setItems] = useState<{
        created_at: any;
        link: string | undefined; id: number; meta_title: string; meta_description: string 
}[]>([]);
    const [loading, setLoading] = useState(true);

    const getNewsBlogs = useCallback(async (tab: 'news' | 'blogs') => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const roleparams = { page: 1, size: 10000, type: tab }; // Add type parameter to distinguish between news and blogs
            const response = await axios1.get('api/website/newsandblogs/get', { params: roleparams });

            // Log the entire response for debugging
            console.log('API Response:', response);

            // Ensure the response has the expected data structure
            if (response.data && response.data.status === 1) {
                const data = response.data[tab].data;
                console.log(`${tab}:`, data);

                // Set the state based on the active tab
                setItems(data);
            } else {
                console.error('Invalid API response structure:', response);
                setItems([]);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setItems([]);
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    }, []);

    useEffect(() => {
        getNewsBlogs(activeTab);
    }, [activeTab, getNewsBlogs]);

    const handleTabClick = (tab: 'news' | 'blogs') => {
        setActiveTab(tab);
        getNewsBlogs(tab); // Fetch data when tab is clicked
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // Log the items to display for debugging
    console.log('Active Tab:', activeTab);
    console.log('Items to display:', items);

    return (
        <section className="latestNewsCon" id="animation8" data-aos="fade-down">
            <div className="container pt-5">
                <h3 className="fw-bold text-center">Latest News & Blogs</h3>
                <div className="nav-pills justify-content-center pt-3 gap-2 d-flex" role="tablist">
                    <button
                        className={`btn px-4 newsBtn ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={() => handleTabClick('news')}
                    >
                        News
                    </button>
                    <button
                        className={`btn px-4 blgBtn ${activeTab === 'blogs' ? 'active' : ''}`}
                        onClick={() => handleTabClick('blogs')}
                    >
                        Blogs
                    </button>
                </div>
                <div className="card-con pt-5">
                    <div className="row">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div className="col-md-4 mb-1" key={item.id}>
                                    <div className="newsBlosCards">
                                        <div className="mb-5">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                <h6 className="card-subtitle mb-2 text-body-secondary">
                                                        {item.created_at ? format(new Date(item.created_at), 'yyyy-MM-dd') : 'No Date Available'}
                                                    </h6>
                                                    <h5 className="card-title fw-bold text-blue">{item.meta_title}</h5>
                                                    <p className="card-text">{item.meta_description}</p>
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
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LatestNewsSection;

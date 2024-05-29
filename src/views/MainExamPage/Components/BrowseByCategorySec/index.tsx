import React, { useState } from 'react';
import CategoryCarousel from './CategoryCarousel'; // Adjust the import path as necessary

const BrowsebyCategorySec = () => {
    const items = [
        { id: 1, title: 'Medical' },
        { id: 2, title: 'Engineering' },
        { id: 3, title: 'Dental' },
        { id: 4, title: 'Management' },
        { id: 5, title: 'Law' },
        { id: 6, title: 'Architecture' },
        { id: 7, title: 'Design' },
        { id: 8, title: 'Medical' },
        { id: 9, title: 'Engineering' },
        { id: 10, title: 'Dental' },
        { id: 20, title: 'Engindvdvddfeering' },
    ];

    const [activeTab, setActiveTab] = useState(items[0].id);

    function handleTabClick(id) {
        setActiveTab(id);
    }

    return (
        <>
            <section>
                <div className="container px-5 pt-2 pb-5">
                    <h2 className='fw-bold text-blue mb-5 text-center'>Browse By Category</h2>
                    <CategoryCarousel items={items} handleTabClick={handleTabClick} activeTab={activeTab} />
                    <div className="tab-content" id="pills-tabContent">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`tab-pane fade ${activeTab === item.id ? 'show active' : ''}`}
                                id={`pills-${item.id}`}
                                role="tabpanel"
                                aria-labelledby={`pills-${item.id}-tab`}
                            >
                                <div className='topCourseConCarousel'>
                                    <div className="text-center d-flex mx-2 border-0">
                                        <div className="col-12 text-center px-0">
                                            <p className="card-title text-blue">{item.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default BrowsebyCategorySec;

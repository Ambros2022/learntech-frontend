import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'src/configs/axios';

const BoardsSec = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [displayCount, setDisplayCount] = useState(4);
    const [boardItems, setBoardItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = activeTab === 'all'
                    ? await axios.get('/api/website/schoolboard/get')
                    : await axios.get(`/api/website/schoolboard/get?board_type=${activeTab}`);
                
                // console.log('API response:', response.data); // Log the response
    
                const data = Array.isArray(response.data.data) ? response.data.data : [];
                setBoardItems(data);
                // console.log('Board items:', data); // Log the board items
            } catch (error) {
                console.error('Error fetching board data:', error);
                setBoardItems([]); // Ensure boardItems is an array even if the fetch fails
            }
        };
    
        fetchBoardData();
    }, [activeTab]);
    
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setDisplayCount(4); // Reset display count when switching tabs
    };

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 4);
    };

    return (
        <>
            <section className='py-5 bg-white browseNews'>
                <div className="container">
                    <div className="d-flex justify-content-center newsTabsClr gap-3 mx-5 flex-wrap flex-row">
                        {['all', 'state', 'national', 'international'].map(tabName => (
                            <button key={tabName} className={`btn ${activeTab === tabName ? 'active' : ''}`} onClick={() => handleTabClick(tabName)}>
                                {tabName.charAt(0).toUpperCase() + tabName.slice(1) + ' Boards'}
                            </button>
                        ))}
                    </div>
                    <div className='row mb-3 mt-5'>
                        <div className="col-12">
                            <div className="tab-content" id="pills-tabContent">
                                <div className={`tab-pane fade show active`} id={`pills-${activeTab}`} role="tabpanel" aria-labelledby={`pills-${activeTab}-tab`}>
                                    <div className="row">
                                        {boardItems.map((item, index) => (
                                            index < displayCount && (
                                                <div key={item.id} className="col-8 mx-auto col-md-6 mx-md-0 mb-3">
                                                    <div className="card newsImgSize bg-skyBlue">
                                                        <div className="d-flex justify-content-end gap-2 fs-5 me-2 pt-1">
                                                            <i className='bi bi-star-fill text-warning'></i>
                                                            <i className='bi bi-star-fill text-warning'></i>
                                                            <i className='bi bi-star-fill text-warning'></i>
                                                            <i className='bi bi-star-fill text-warning'></i>
                                                            <i className='bi bi-star-fill text-gray'></i>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="row d-flex">
                                                                <div className="col-lg-4 col-xl-3 align-self-center mb-lg-0 mb-3">
                                                                    <div className="logoBoardImg">
                                                                        <Image src='/images/icons/filter-card.jpg' width={500} height={500} alt='clg-card' className='mx-auto img-fluid' />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-8 col-xl-9 align-self-center">
                                                                    <h5 className="fw-bold card-title">{item.name}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-8 col-xl-9 ms-auto">
                                                                    <p className='text-black mb-2'><span className='fw-bold'>Est Year :</span> {item.established}</p>
                                                                    <p className='text-black mb-2'><span className='fw-bold'>Location :</span> {item.location}</p>
                                                                    <p className='text-black'><span className='fw-bold'>Approvals and Recognition :</span> {item.established}</p>
                                                                    <p className='text-black'><span className='fw-bold'>Genders Accepted :</span> {item.gender}</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mb-3">
                                                                <button className='btn viewMoreCollegeBtn'>View Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    {displayCount < boardItems.length && (
                                        <div className="d-flex justify-content-center">
                                            <button className="btn viewMoreCollegeBtn mt-3" onClick={handleLoadMore}>Load More</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BoardsSec;

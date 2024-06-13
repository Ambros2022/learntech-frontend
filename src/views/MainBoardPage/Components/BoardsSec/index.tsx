import React, { useState } from 'react';
import Image from 'next/image';

const BoardsSec = () => {
    const [activeTab, setActiveTab] = useState('All Boards');
    const [displayCount, setDisplayCount] = useState(4);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setDisplayCount(4); // Reset display count when switching tabs
    };

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 4);
    };

    const boardItems = {
        'All Boards': [
            { id: 1, title: 'JEE Mains Result Release Date Session 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 2, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 3, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 4, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 5, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 6, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 7, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 8, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 9, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 10, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        ],
        'State Boards': [
            { id: 1, title: 'JEE Mains Result Release Date Session 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 2, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 3, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 4, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 5, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 6, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 7, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 8, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 9, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 10, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        ],
        'National Boards': [
            { id: 1, title: 'JEE Mains Result Release Date Session 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 2, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 3, title: 'New Policy Announcaddaement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 4, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 5, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 6, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 7, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 8, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 9, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 10, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        ],
        'International Boards': [
            { id: 1, title: 'JEE Mains Result Release Date Session 2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 2, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 3, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 4, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 5, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 6, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 7, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 8, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 9, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
            { id: 10, title: 'New Policy Announcement', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        ],
    };

    const currentBoard = boardItems[activeTab];
    const displayedBoardItems = currentBoard.slice(0, displayCount);

    return (
        <>
            <section className='py-5 bg-white browseNews'>
                <div className="container">
                    <div className="d-flex justify-content-center newsTabsClr gap-3 mx-5 flex-wrap flex-row">
                        {Object.keys(boardItems).map(tabName => (
                            <button key={tabName} className={`btn ${activeTab === tabName ? 'active' : ''}`} onClick={() => handleTabClick(tabName)}>{tabName}</button>
                        ))}
                    </div>
                    <div className='row mb-3 mt-5'>
                        <div className="col-12">
                            <div className="tab-content" id="pills-tabContent">
                                <div className={`tab-pane fade show active`} id={`pills-${activeTab}`} role="tabpanel" aria-labelledby={`pills-${activeTab}-tab`}>
                                    <div className="row">
                                        {displayedBoardItems.map(item => (
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
                                                                    <Image src='/images/icons/filter-card.jpg' width={300} height={300} alt='clg-card' className='mx-auto' />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-8 col-xl-9 align-self-center">
                                                                <h5 className="fw-bold card-title">International General Certifcate of Secondary Education (IGCSE) Board
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-8 col-xl-9 ms-auto">
                                                                <p className='text-black mb-2'><span className='fw-bold'>Est Year :</span> 1959</p>
                                                                <p className='text-black mb-2'><span className='fw-bold'>Location :</span>Palace Road, Bangalore </p>
                                                                <p className='text-black'><span className='fw-bold'>Approvals and Recognition :</span> All India Council for Technical Education (AICTE)</p>
                                                                <p className='text-black'><span className='fw-bold'>Genders Accepted :</span> Co-Ed</p>
                                                            </div>
                                                            {/* <p className="card-text">{item.description}</p> */}
                                                        </div>
                                                        <div className="d-flex justify-content-center mb-3">
                                                            <button className='btn viewMoreCollegeBtn'>View Details</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {displayCount < currentBoard.length && (
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

import React, { useCallback, useEffect, useState } from 'react';
import NewsList from '../newsList';
import axios from 'src/configs/axios';
import { useRouter } from 'next/router';

const InfoSec = ({ data }) => {
    const [newsData, setNewsData] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [loading, setLoading] = useState(true); // State to manage loading status
    console.log(data);

    const getNews = useCallback(async () => {
        setNewsData([]);
        try {
            const roleparams = { page: 1, size: 10000 };
            const response = await axios.get('/api/website/news/get', { params: roleparams });

            const formattedNews = response.data.data.map((item) => ({
                imageSrc: `${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`,
                name: item.name || 'No description available',
                id: item.id,
            }));
            setNewsData(formattedNews);
        } catch (err) {
            console.error('Failed to fetch news:', err);
        }
    }, []);

    useEffect(() => {
        getNews();
    }, [getNews]);

    const handleOpenModal = () => {
        setLoading(true); // Show loader when modal is opened
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleIframeLoad = () => {
        setLoading(false); // Hide loader once PDF is loaded
    };

    return (
        <section className='bg-white'>
            <div className="container innerNewsSec">
                <div className="row pt-3 pb-0">
                    <div className="col-md-9 mb-3">
                        <h1 className='text-blue fw-bold'>{data.meta_title}</h1>
                    </div>
                    {data.pdf_file && (
                        <div className="col-md-3">
                            <button className="btn applyNowButton align-content-center" onClick={handleOpenModal}>
                                {data?.pdf_name ? data?.pdf_name  : "View PDF"}
                            </button>
                        </div>
                    )}
                </div>
                <div className='pt-0'>
                    <div className="row">
                        <div className="col-md-8 text-black">
                            <p>
                                <div dangerouslySetInnerHTML={{ __html: data.overview }} />
                            </p>
                        </div>
                        <div className="col-md-4">
                            <NewsList newsItems={newsData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for PDF preview */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-blue">{data.pdf_name}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                {loading && (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}
                                <iframe
                                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.pdf_file}`}
                                    title={data.pdf_name}
                                    style={{ width: '100%', height: '500px', display: loading ? 'none' : 'block' }}
                                    frameBorder="0"
                                    onLoad={handleIframeLoad}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default InfoSec;

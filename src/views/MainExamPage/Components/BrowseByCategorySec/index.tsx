import React, { useCallback, useEffect, useState } from 'react';
import CategoryCarousel from './CategoryCarousel'; // Adjust the import path as necessary
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NewsList from '../newsList';
import ExamCard from '../ExamCardList';
import axios from 'src/configs/axios';
import SideContactUsForm from 'src/@core/components/popup/SideContactUsForm';

const BrowsebyCategorySec = () => {
    const [items, setItems] = useState<{ id: string; title: string }[]>([]);
    const [examsData, setExamsData] = useState({});
    const [newsData, setNewsData] = useState([]);

    const [activeTab, setActiveTab] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const examsPerPage = 12;

    const getCategoriesData = useCallback(async () => {
        try {
          
            const response = await axios.get('api/website/stream/get');
         
            if (response.data.status === 1) {
                const categories = response.data.data.map(category => ({
                    id: category.id,
                    title: category.name
                }));
                // Add "All" category
                setItems([{ id: 'all', title: 'All' }, ...categories]);
                setActiveTab('all'); // Set "All" tab as active initially
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    const getExamsData = useCallback(async (id) => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 1;
            const url = id === 'all' ? 'api/website/exams/get' : `api/website/exams/get?stream_id=${id}`;
            const response = await axios.get(url, { params: roleparams });
            if (response.data.status === 1) {
                setExamsData(prevState => ({
                    ...prevState,
                    [id]: response.data.data
                }));
            } else {
                console.error('Failed to fetch exams');
            }
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }, []);

    const getnews = useCallback(async () => {
        try {
            const roleparams = { page: 1, size: 10000 };
            const response = await axios.get('/api/website/news/get', { params: roleparams });


            setNewsData(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);


    useEffect(() => {
        getCategoriesData();
        getnews();
    }, [getCategoriesData, getnews]);

    useEffect(() => {
        if (activeTab) {
            getExamsData(activeTab);
        }
    }, [activeTab, getExamsData]);

    const handleTabClick = (id) => {
        setActiveTab(id);
        setCurrentPage(1);
    };

    const currentExams = examsData[activeTab]?.slice((currentPage - 1) * examsPerPage, currentPage * examsPerPage) || [];
    const totalExams = examsData[activeTab]?.length || 0;
    const totalPages = Math.ceil(totalExams / examsPerPage);

    const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    return (
        <section className='bg-white'>
            <div className="container categorySecCarousel position-relative px-md-5 px-0 pt-2 pb-5">
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
                            <div className='topCourseConCarousel pt-5'>
                                <div className="row ">
                                    <div className="col-lg-7 col-xl-8">
                                        <div className="row">
                                        {currentExams.length > 0 ? (
                                                currentExams.map((exam, index) => (
                                                    <ExamCard key={index} id={exam.id} cover_image={exam.cover_image} title={exam.exam_title} date={exam.created_at} />
                                                ))
                                            ) : (
                                                <div className="text-center mb-5">No data</div>
                                            )}
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination d-flex gap-3">
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
                                                            <span aria-hidden="true">{'<'}</span>
                                                        </button>
                                                    </li>
                                                    {Array.from({ length: totalPages }, (_, index) => (
                                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={handleNextPage} aria-label="Next">
                                                            <span aria-hidden="true">{'>'}</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-xl-4">
                                        <div className='bg-skyBlue px-lg-5 px-md-3 px-3 rounded'>
                                            <h5 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h5>
                                            <SideContactUsForm />
                                        </div>
                                        <NewsList newsItems={newsData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrowsebyCategorySec;

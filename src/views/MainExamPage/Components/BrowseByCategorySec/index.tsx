'use client'
import React, { useCallback, useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'src/hooks/useCompatRouter';

const CategoryCarousel = dynamic(() => import('./CategoryCarousel'), { ssr: false });
const NewsList = dynamic(() => import('../newsList'), { ssr: false });
const NewsListAbroad = dynamic(() => import('../newsListAbroad'), { ssr: false });
const ExamCard = dynamic(() => import('../ExamCardList'), { ssr: false });
const SideContactUsForm = dynamic(() => import('src/@core/components/popup/SideContactUsForm'), { ssr: false });

interface Props {
    countryData: any[];
    streams: any[];
    newsData: any[];
    newsDataAbroad: any[];
    initialExams: any[];
    initialExamsTotalPages: number;
    initialAbroadExams: any[];
    initialAbroadExamsTotalPages: number;
    initialAbroadExamsTotalItems: number;
}

const BrowsebyCategorySec = ({
    countryData = [],
    streams = [],
    newsData: initialNews = [],
    newsDataAbroad: initialNewsAbroad = [],
    initialExams = [],
    initialExamsTotalPages = 1,
    initialAbroadExams = [],
    initialAbroadExamsTotalPages = 1,
    initialAbroadExamsTotalItems = 0,
}: Props) => {
    const { streamId, setStreamId } = useAuth();
    const router = useRouter();

    const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '');

    // Initialize items (categories list)
    const initialCategories = streams.map(category => ({
        id: category.id,
        title: category.name
    }));
    const [items] = useState<{ id: string; title: string }[]>([
        { id: 'all', title: 'All Exams' },
        ...initialCategories
    ]);

    // Initialize examsData
    const [examsData, setExamsData] = useState<any>({
        all: initialExams
    });

    // Initialize scholarshipsData (visible page 1 of abroad exams)
    const [scholarshipsData, setScholarshipsData] = useState<any>(initialAbroadExams);

    // Initialize scholarshipData (used to check if we have any abroad exams)
    const [scholarshipData, setScholarshipData] = useState<any>(
        initialAbroadExamsTotalItems > 0 ? initialAbroadExams : []
    );

    const [newsData] = useState(initialNews);
    const [newsDataAbroad] = useState(initialNewsAbroad);

    const [activeTab, setActiveTab] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const firstRender = useRef(true);

    const [searchText] = useState('');
    const [formData, setFormData] = useState({
        level_of_study: '',
        types_of_exam: '',
        stream_id: '',
        country_id: '',
        deadline: ''
    });

    // Exam pagination state
    const [currentExamPage, setCurrentExamPage] = useState(1);
    const [totalExamPages, setTotalExamPages] = useState(initialExamsTotalPages);
    const examsPerPage = 9;

    // Scholarship pagination state
    const [currentScholarshipPage, setCurrentScholarshipPage] = useState(1);
    const [totalScholarshipPages, setTotalScholarshipPages] = useState(initialAbroadExamsTotalPages);
    const scholarshipsPerPage = 9;

    const handleClearAll = () => {
        setFormData({
            level_of_study: '',
            types_of_exam: '',
            stream_id: '',
            country_id: '',
            deadline: ''
        });
    };

    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const getScholarship = useCallback(async (country_id, level_of_study, types_of_exam, stream_id) => {
        setIsLoading(true);
        try {
            const query: Record<string, string> = {
                searchfrom: 'name',
                searchtext: searchText,
                page: String(currentScholarshipPage),
                size: String(scholarshipsPerPage),
                isIndia: 'false'
            };
            if (country_id) query.country_id = String(country_id);
            if (level_of_study) query.level_of_study = String(level_of_study);
            if (types_of_exam) query.types_of_exam = String(types_of_exam);
            if (stream_id) query.stream_id = String(stream_id);

            const sp = new URLSearchParams(query);
            const response = await fetch(`${API_URL}/api/website/exams/get?${sp}`);
            if (response.ok) {
                const resData = await response.json();
                setScholarshipsData(resData.data ?? []);
                setTotalScholarshipPages(Math.ceil((resData.totalItems ?? 0) / scholarshipsPerPage));
            }
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        } finally {
            setIsLoading(false);
        }
    }, [searchText, currentScholarshipPage, scholarshipsPerPage, API_URL]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        getScholarship(formData.country_id, formData.level_of_study, formData.types_of_exam, formData.stream_id);
    }, [formData, getScholarship, currentScholarshipPage]);

    const getExamsData = useCallback(async (id, page = 1) => {
        try {
            const query: Record<string, string> = {
                page: String(page),
                size: String(examsPerPage),
                isIndia: 'true'
            };
            if (id !== 'all') {
                query.stream_id = String(id);
            }
            const sp = new URLSearchParams(query);
            const response = await fetch(`${API_URL}/api/website/exams/get?${sp}`);
            if (response.ok) {
                const resData = await response.json();
                setExamsData(prevState => ({
                    ...prevState,
                    [id]: resData.data ?? []
                }));
                setTotalExamPages(resData.totalPages ?? 1);
            }
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }, [examsPerPage, API_URL]);

    useEffect(() => {
        if (streamId) {
            setActiveTab(streamId);
            setStreamId(null);
        }
    }, [streamId, setStreamId]);

    useEffect(() => {
        if (activeTab === 'all' && currentExamPage === 1 && examsData['all']) {
            return; // Already initialized from server props!
        }
        getExamsData(activeTab, currentExamPage);
    }, [activeTab, currentExamPage, getExamsData]);

    const handleTabClick = (id) => {
        setActiveTab(id);
        setCurrentExamPage(1);
    };

    const handleExamPreviousPage = () => {
        setCurrentExamPage(prevPage => {
            const newPage = Math.max(prevPage - 1, 1);
            getExamsData(activeTab, newPage);
            return newPage;
        });
    };

    const handleExamNextPage = () => {
        setCurrentExamPage(prevPage => {
            const newPage = Math.min(prevPage + 1, totalExamPages);
            getExamsData(activeTab, newPage);
            return newPage;
        });
    };

    const handleExamPageClick = (page) => {
        setCurrentExamPage(page);
        getExamsData(activeTab, page);
    };

    // Scholarship pagination handlers
    const handleScholarshipPreviousPage = () => {
        setCurrentScholarshipPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleScholarshipNextPage = () => {
        setCurrentScholarshipPage(prevPage => Math.min(prevPage + 1, totalScholarshipPages));
    };

    const handleScholarshipPageClick = (page) => {
        setCurrentScholarshipPage(page);
    };

    const ScholarshipCards = ({ data }) => {
        if (!data || data.length === 0) {
            return (
                <div className="col-12 text-center">
                    <p className="fw-bold text-muted">No exams found. Try adjusting the filter settings.</p>
                </div>
            );
        }

        return (
            <div className="row d-flex flex-fill px-md-0 px-3">
                {data.map((scholarship) => (
                    <div className="col-md-4 mb-3" key={scholarship.id}>
                        <Link href={`/exam/${scholarship.id}/${scholarship.slug}`}>
                            <div className="card hover-card examsCardRow">
                                <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${scholarship.cover_image}`} width={300} height={300} className="card-img-top" alt={scholarship.exam_title} />
                                <div className="card-body text-center">
                                    <h5 className="fw-bold text-center card-title text-truncate">{scholarship.exam_title}</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        );
    };

    const currentExams = examsData[activeTab] || [];

    return (
        <section className='bg-white'>
            <div className="container categorySecCarousel position-relative px-md-5 px-0 pt-2 pb-5">
                <div className='w-100 text-center'>
                    <h2 className='fw-bold text-black mb-5 text-center p-3 heading-with-styled-lines'>
                        List of Entrance Exams in India
                    </h2>
                </div>
                <div className="row">
                    <div className="col-lg-7 col-xl-8 exam-car px-3 px-md-5 ">
                        <CategoryCarousel items={items} handleTabClick={handleTabClick} activeTab={activeTab} />
                    </div>
                </div>
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
                                <div className="row">
                                    <div className="col-lg-7 col-xl-8">
                                        <div className="row px-md-0 px-3">
                                            {currentExams.length > 0 ? (
                                                currentExams.map((exam, index) => (
                                                    <ExamCard key={index} id={exam.id} cover_image={exam.cover_image} title={exam.exam_title} slug={exam.slug} />
                                                ))
                                            ) : (
                                                <div className="text-center mb-5">No data</div>
                                            )}
                                        </div>
                                        {currentExams.length > 0 && (
                                            <div className='d-flex justify-content-center'>
                                                <nav aria-label="Exams Page navigation">
                                                    <ul className="pagination d-flex gap-3">
                                                        <li className={`page-item ${currentExamPage === 1 ? 'disabled' : ''}`}>
                                                            <button className="page-link" onClick={handleExamPreviousPage} aria-label="Previous">
                                                                <span aria-hidden="true">{'<'}</span>
                                                            </button>
                                                        </li>
                                                        {Array.from({ length: totalExamPages }, (_, index) => (
                                                            <li key={index} className={`page-item ${currentExamPage === index + 1 ? 'active' : ''}`}>
                                                                <button className="page-link" onClick={() => handleExamPageClick(index + 1)}>{index + 1}</button>
                                                            </li>
                                                        ))}
                                                        <li className={`page-item ${currentExamPage === totalExamPages ? 'disabled' : ''}`}>
                                                            <button className="page-link" onClick={handleExamNextPage} aria-label="Next">
                                                                <span aria-hidden="true">{'>'}</span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        )}
                                        <div className="mb-3 rounded p-3 mt-5">
                                            {scholarshipData && scholarshipData.length > 0 ? (
                                                <>
                                                    <div className='w-100 text-center'>
                                                        <h2 className='fw-bold text-black mb-5 p-3 heading-with-styled-lines text-center mt-3'>Entrance Exams for Study Abroad
                                                        </h2>
                                                    </div>
                                                    <h4 className='text-blue fw-bold mb-3'>Filter By</h4>
                                                    <div className="d-flex gap-3 flex-wrap">
                                                        <div className="align-self-center flex-grow-1">
                                                            <label htmlFor="country_id" className='text-black fw-bold mb-2'>Select Country</label>
                                                            <div className="position-relative w-100">
                                                                <select className="form-control text-black w-100 pe-5"
                                                                    id="country_id"
                                                                    value={formData.country_id}
                                                                    onChange={handleSelectChange}
                                                                    style={{
                                                                        appearance: 'none',
                                                                        WebkitAppearance: 'none',
                                                                        MozAppearance: 'none',
                                                                        background: 'transparent',
                                                                        paddingRight: '2.5rem',
                                                                    }}>
                                                                    <option value="">Select</option>
                                                                    {countryData.map(option => (
                                                                        <option key={option.id} value={option.id}>{option.name}</option>
                                                                    ))}
                                                                </select>
                                                                <i className="bi bi-caret-down-fill position-absolute"
                                                                    style={{
                                                                        right: '1rem',
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        pointerEvents: 'none',
                                                                    }}></i>
                                                            </div>
                                                        </div>
                                                        <div className="align-self-center flex-grow-1">
                                                            <label htmlFor="level_of_study" className='text-black fw-bold mb-2'>Level of study</label>
                                                            <div className="position-relative w-100">
                                                                <select className="form-control text-black w-100 pe-5"
                                                                    id="level_of_study"
                                                                    value={formData.level_of_study}
                                                                    onChange={handleSelectChange}
                                                                    style={{
                                                                        appearance: 'none',
                                                                        WebkitAppearance: 'none',
                                                                        MozAppearance: 'none',
                                                                        background: 'transparent',
                                                                        paddingRight: '2.5rem',
                                                                    }}>
                                                                    <option value="">select</option>
                                                                    <option value="UG">UG</option>
                                                                    <option value="PG">PG</option>
                                                                    <option value="professional">Professional</option>
                                                                </select>
                                                                <i className="bi bi-caret-down-fill position-absolute"
                                                                    style={{
                                                                        right: '1rem',
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        pointerEvents: 'none',
                                                                    }}></i>
                                                            </div>
                                                        </div>
                                                        <div className="align-self-center flex-grow-1">
                                                            <label htmlFor="types_of_exam" className='text-black fw-bold mb-2'>Type of exam</label>
                                                            <div className="position-relative w-100">
                                                                <select className="form-control text-black w-100 pe-5"
                                                                    id="types_of_exam"
                                                                    value={formData.types_of_exam}
                                                                    onChange={handleSelectChange}
                                                                    style={{
                                                                        appearance: 'none',
                                                                        WebkitAppearance: 'none',
                                                                        MozAppearance: 'none',
                                                                        background: 'transparent',
                                                                        paddingRight: '2.5rem',
                                                                    }}>
                                                                    <option value="">select</option>
                                                                    <option value="Language_Proficiency">Language Proficiency</option>
                                                                    <option value="Aptitiude_Test">Aptitiude Test</option>
                                                                    <option value="Streams">Streams</option>
                                                                </select>
                                                                <i className="bi bi-caret-down-fill position-absolute"
                                                                    style={{
                                                                        right: '1rem',
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        pointerEvents: 'none',
                                                                    }}></i>
                                                            </div>
                                                        </div>
                                                        {
                                                            formData.types_of_exam && formData.types_of_exam === 'Streams' ? (
                                                                <div className="align-self-center">
                                                                    <label htmlFor="stream_id" className='text-black fw-bold mb-2'>Select Stream</label>
                                                                    <div className="position-relative w-100">
                                                                        <select className="form-control text-black w-100 pe-5"
                                                                            id="stream_id"
                                                                            value={formData.stream_id}
                                                                            onChange={handleSelectChange}
                                                                            style={{
                                                                                appearance: 'none',
                                                                                WebkitAppearance: 'none',
                                                                                MozAppearance: 'none',
                                                                                background: 'transparent',
                                                                                paddingRight: '2.5rem',
                                                                            }}>
                                                                            <option value="">Select</option>
                                                                            {streams.map(option => (
                                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                                            ))}
                                                                        </select>
                                                                        <i className="bi bi-caret-down-fill position-absolute"
                                                                            style={{
                                                                                right: '1rem',
                                                                                top: '50%',
                                                                                transform: 'translateY(-50%)',
                                                                                pointerEvents: 'none',
                                                                            }}></i>
                                                                    </div>
                                                                </div>) : ''
                                                        }
                                                        <div className="align-self-center pt-4">
                                                            <button className='btn viewMoreCollegeBtn align-self-center' onClick={handleClearAll}>Clear All</button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : ''}
                                        </div>
                                        {scholarshipData && scholarshipData.length > 0 ? (
                                            <>
                                                {isLoading ? (
                                                    <div className="text-center">
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <ScholarshipCards data={scholarshipsData} />
                                                        {scholarshipsData.length > 0 && (
                                                            <div className="row col-md-12 blogCardspage">
                                                                <div className='d-flex justify-content-center'>
                                                                    <nav aria-label="Scholarships Page navigation">
                                                                        <ul className="pagination d-flex gap-3">
                                                                            <li className={`page-item ${currentScholarshipPage === 1 ? 'disabled' : ''}`}>
                                                                                <button className="page-link" onClick={handleScholarshipPreviousPage} aria-label="Previous">
                                                                                    <span aria-hidden="true">{'<'}</span>
                                                                                </button>
                                                                            </li>
                                                                            {Array.from({ length: totalScholarshipPages }, (_, index) => (
                                                                                <li key={index} className={`page-item ${currentScholarshipPage === index + 1 ? 'active' : ''}`}>
                                                                                    <button className="page-link" onClick={() => handleScholarshipPageClick(index + 1)}>{index + 1}</button>
                                                                                </li>
                                                                            ))}
                                                                            <li className={`page-item ${currentScholarshipPage === totalScholarshipPages ? 'disabled' : ''}`}>
                                                                                <button className="page-link" onClick={handleScholarshipNextPage} aria-label="Next">
                                                                                    <span aria-hidden="true">{'>'}</span>
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </nav>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        ) : ''}
                                    </div>
                                    <div className="col-lg-5 col-xl-4">
                                        <div className='bg-skyBlue px-lg-5 px-md-3 px-3 mb-5 rounded'>
                                            <h2 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h2>
                                            <div className='examsForm'>
                                                <SideContactUsForm />
                                            </div>
                                        </div>
                                        {newsData && newsData.length > 0 ? (<NewsList newsItems={newsData} />) : ""}
                                        {newsDataAbroad && newsDataAbroad.length > 0 ? (<NewsListAbroad newsItems={newsDataAbroad} />) : ""}
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

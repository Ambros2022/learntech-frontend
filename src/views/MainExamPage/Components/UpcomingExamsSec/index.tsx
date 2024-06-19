import React, { useEffect, useState, useCallback } from 'react';
import axios1 from 'src/configs/axios';

import MainCarousel2 from 'src/@core/components/carousel2';

interface Item {
    id: number;
    title: string;
    date: string;
}

function PopularCourses() {
    const [items, setItems] = useState<Item[]>([]);
    const [isMountedRef, setIsMountedRef] = useState(true);

    const getExamData = useCallback(async () => {
        try {
            const response = await axios1.get('/api/website/exams/get');
            if (response.data.status === 1) {
                const examData: Item[] = response.data.data.map((exam: any) => ({
                    id: exam.id,
                    title: exam.exam_title,
                    date: formatDate(exam.created_at) // Format the date here
                }));
                if (isMountedRef) {
                    setItems(examData);
                }
            } else {
                console.error('Failed to fetch exam data');
            }
        } catch (error) {
            console.error('Error fetching exam data:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getExamData();

        return () => {
            setIsMountedRef(false); // Cleanup on unmount
        };
    }, [getExamData]);

    // Function to format the date
    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    }

    // Function to create card components
    function createCards() {
        return items.map(card => (
            <CardComponent
                key={card.id}
                id={card.id}
                title={card.title}
                date={card.date}
            />
        ));
    }

    // CardComponent function
    function CardComponent({ id, title, date }: { id: number; title: string; date: string }) {
        return (
            <div className='topCourseConCarousel'>
                 <a href={`/exam/${id}/${title}`} className='stretch-link'>
                <div className="card text-center d-flex mx-2 border-0">
                   
                        <div className="row flex-fill">
                            <div className="col-12 text-start px-0">
                                <div className="ms-2 card-body">
                                    <h4 className="card-title fw-bold text-blue text-truncate">{title}</h4>
                                    <small className="card-title flex-fill text-black">{date}</small>
                                </div>
                            </div>
                        </div>
                   
                </div>
                </a>
            </div>
        );
    }

    return (
        <section className=''>
            <div className="topCarouselCardsCon bg-examsCarouselCr examsCardCarousel px-5 pt-3 pb-3 position-relative">
                <MainCarousel2 items={createCards()} />
            </div>
        </section>
    );
}

export default PopularCourses;

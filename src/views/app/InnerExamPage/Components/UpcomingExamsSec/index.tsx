import React, { useCallback, useEffect, useState } from 'react'
import Carousel3 from 'src/@core/components/carousel3';
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';


interface NewsItem {
    id: number;
    slug: string;

}

function PopularCourses() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const isMountedRef = useIsMountedRef();



    // const items = [
    //     { id: 1, title: '1st Latest MDS News Title', },
    //     { id: 2, title: '1st Latest MDS News Title', },
    //     { id: 3, title: '1st Latest MDS News Title', },
    //     { id: 4, title: '1st Latest MDS News Title', },
    //     { id: 5, title: '1st Latest MDS News Title', },
    //     { id: 6, title: '1st Latest MDS News Title', },
    //     { id: 7, title: '1st Latest MDS News Title', },
    //     { id: 8, title: '1st Latest MDS News Title', },
    //     { id: 9, title: '1st Latest MDS News Title', },
    //     { id: 10, title: '1st Latest MDS News Title', },
    //     { id: 20, title: '1st Latest MDS News Title', },
    // ]


    const getNews = useCallback(async () => {
        try {
            const response = await axios.get('api/website/news/get?category_id =4', {
                params: {
                    page: 1,
                    size: 10000,
                }
            });
            if (isMountedRef.current) {
                setNews(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);


    useEffect(() => {
        getNews();
    }, [getNews]);


    // Function to create card components
    const createCards = () => {
        return news.map((item) => (
            <CardComponent
                key={item.id}
                title={item.slug}

            />
        ));
    };
    // CardComponent function
    function CardComponent({ title }) {
        return (
            <div className='topCourseConCarousel'>
                <div className="card text-center d-flex mx-2 border-0 mx-md-4">
                    <div className="row">
                        <div className="col-12 text-start px-0 ">
                            <div className=" card-body  ">
                                <div className='text-truncate'>
                                <div className="align-content-center">
                                    <h6 className="card-title fw-bold text-blue">{title}</h6>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className=''>
            <div className="topCarouselCardsCon bg-examsCarouselCr examCardCarousel px-5 pt-3 pb-3 position-relative">
                <Carousel3 items={createCards()} />
            </div>
        </section>
    )
}

export default PopularCourses;

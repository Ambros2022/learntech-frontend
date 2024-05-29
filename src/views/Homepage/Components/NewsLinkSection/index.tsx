import React, { useCallback, useEffect, useState } from 'react';
import MainCarousel from 'src/@core/components/main-carousel';
import axios1 from 'src/configs/axios';

function NewsLinkSection() {
    const [linkSectionItems, setLinkSectionItems] = useState([]);

    const fetchNews = useCallback(async () => {
        try {
            const roleparams = {
                page: 1,
                size: 10, // Adjust the size as needed
            };
            const response = await axios1.get('api/website/news/get', { params: roleparams });
            const newsData = response.data.data;

            // Map the fetched news data to JSX elements
            const newsItems = newsData.map((item, index) => (

                <a href={`https://your-base-url.com${item.url}`} target="_blank" rel="noopener noreferrer">
                    <h6 key={index} className="py-2 text-truncate newsLinkClr text-white text-center" style={{ maxWidth: '200px' }}>
                        {item.meta_title}
                    </h6>
                </a>

            ));
            setLinkSectionItems(newsItems);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    return (
        <section className="newsLinkSec py-2">
            <div className="container text-center">
                <MainCarousel items={linkSectionItems} />
            </div>
        </section>
    );
}

export default NewsLinkSection;

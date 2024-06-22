import Image from 'next/image'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import axios from 'src/configs/axios';
import Carousel3 from 'src/@core/components/carousel3'
import Link from 'next/link';


interface NewsItem {
    title: string
    description: string
    imageUrl: string
    id: any
}

const TopTrendingNews = () => {
   const [newsItems, setNewsItems] = useState<NewsItem[]>([])
   

    const getNewsdata = useCallback(async () => {
        try {
            const response = await axios.get('api/website/news/get')
          
                const newsData = response.data.data.map(news => ({
                    id: news.id,
                    title: news.name,
                    description: news.meta_description,
                    imageUrl: `${process.env.NEXT_PUBLIC_IMG_URL}/${news.banner_image}`

                    
                }))
                setNewsItems(newsData)
            
        } catch (error) {
            console.error('Failed to fetch news data:', error)
        }
    }, [])

    useEffect(() => {
       
        getNewsdata()
       
    }, [getNewsdata])

    const newsCards = newsItems.map(news => (
        <div key={news.id} className="col-8 col-md-10 mx-auto mb-1">
            <div className="card h-100 d-flex flex-fill">
                <Image
                    src={news.imageUrl}
                    width={400}
                    height={300}
                    layout="responsive"
                    quality={75}
                    className="card-img-top"
                    alt={news.title}
                />
                <div className="card-body">
                    <Link className='text-blue' href={`/news-1/${news.id}/${encodeURIComponent(news.title)}`}>
                        <h6 className="card-title fw-bold text-truncate">{news.title}</h6>
                    </Link>
                    <p className="card-text">{news.description}</p>
                </div>
            </div>
        </div>
    ));
    
    return (
        <>
            <section className='topnewsSec bg-white py-5'>
                <div className="container">
                    <h2 className='text-blue fw-bold text-center mb-5'>Top Trending News</h2>
                    <div className='newsCardCarousel position-relative'>
                        <Carousel3 items={newsCards} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopTrendingNews

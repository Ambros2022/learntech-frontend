import React, { useCallback, useEffect, useState } from 'react'
import NewsList from '../newsList';
import BlogList from '../blogsList';
import ContactForm from 'src/@core/components/popup/ContactForm';
import axios from 'src/configs/axios';

const OverviewSec = ({data}) => {

    const [newsData, setNewsData] = useState([]);
    const [blogsData, setBlogsData] = useState([]);


    const getNews = useCallback(async () => {
        setNewsData([])
        try {
            const roleparams = { page: 1, size: 10000 }
            const response = await axios.get('/api/website/news/get', { params: roleparams })

            const formattedNews = response.data.data.map((item) => ({
                imageSrc: `${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`,
                name: item.name || 'No description available',
                id: item.id,
            }))
            setNewsData(formattedNews)
            
        } catch (err) {
            console.error('Failed to fetch news:', err)
        }
    }, [])

    const getBlogs = useCallback(async () => {
        setBlogsData([])
        try {
            const roleparams = { page: 1, size: 10000 }
            const response = await axios.get('/api/website/blog/get', { params: roleparams })

            const formattedNews = response.data.data.map((item) => ({
                imageSrc: `${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`,
                name: item.name || 'No description available',
                id: item.id,
            }))
            setBlogsData(formattedNews)
            
        } catch (err) {
            console.error('Failed to fetch news:', err)
        }
    }, [])

    useEffect(() => {
        getNews();
        getBlogs();
    }, [getNews, getBlogs]);



   

    return (
        <section className='innerBlogSec bg-white py-5'>
            <div className="container">
                <h1 className='fw-bold text-blue mb-3'>{data.name}</h1>
                <h6>Team Learntech | July 18, 2023, 13:55 IST</h6>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <p className='text-black'>{data.meta_title}</p>
                        <p className='text-black'>{data.meta_description}</p>
                       
                    </div>
                    <div className="col-md-6">
                        <div className='mb-3'>
                            <ContactForm heading={'Get More Details'} />
                        </div>
                        <BlogList blogItems={blogsData} heading={'Latest Blogs'} />
                        <NewsList newsItems={newsData} heading={'Latest News'} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OverviewSec
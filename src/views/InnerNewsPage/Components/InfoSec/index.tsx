import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import NewsList from '../newsList';
import axios from 'src/configs/axios'; 

const InfoSec = ({ data }) => {

    const [newsData, setNewsData] = useState([])

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

    useEffect(() => {
        getNews()
    }, [getNews])

    return (
        <section className='bg-white'>
            <div className="container innerNewsSec">
                <div className="row py-5">
                    <div className="col-md-9 mb-3">
                        <h1 className='text-blue fw-bold'>{data.meta_title}</h1>
                    </div>
                    {/* <div className="col-md-3">
                        <Link href='/news' className='btn applyNowButton align-content-center'>Uploaded PDF DOC Preview</Link>
                    </div> */}
                    <div className="col-md-3">
                        <a href={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.pdf_file}`} className="btn applyNowButton align-content-center" target="_blank" rel="noopener noreferrer">Uploaded PDF DOC Preview</a>
                    </div>

                </div>
                <div className="d-flex gap-3 flex-wrap mb-3">

                    <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target="_blank"> <button className='btn btn-primary'><i className="bi bi-linkedin"></i> Share</button></a>
                    {/* <button className='btn btn-primary'><i className="bi bi-linkedin"></i> Share</button> */}

                    <a href="https://www.facebook.com/learntechedu" target="_blank"><button className='btn btn-info text-white'><i className="bi bi-facebook"></i> Share</button></a>
                    {/* <button className='btn btn-info text-white'><i className="bi bi-facebook"></i> Share</button> */}
                    <a href="https://twitter.com/learntechww" target='_blank'> <button className='btn btn-dark text-white'><i className="bi bi-twitter-x"></i> Tweet</button></a>
                    {/* <button className='btn btn-dark text-white'><i className="bi bi-twitter-x"></i> Tweet</button> */}
                    <button className='btn btn-success text-white'><i className="bi bi-share-fill"></i> Share</button>
                    <button className='btn btn-danger text-white'><i className="bi bi-pinterest"></i> Pin</button>

                    <a href="mailto:info@learntechww.com" target='_blank'> <button className='btn btn-secondary text-white'><i className="bi bi-envelope"></i> Email</button></a>
                    {/* <button className='btn btn-secondary text-white'>
                        <a href="mailto:info@learntechww.com" className="text-white text-decoration-none">
                            <i className="bi bi-envelope"></i> Email
                        </a>
                    </button> */}
                </div>
                <div className='pt-3'>
                    <div className="row">
                        <div className="col-md-7 text-black">
                            <p>
                                <div dangerouslySetInnerHTML={{ __html: data.overview }} />
                            </p>
                        </div>
                        <div className="col-md-5">
                            <NewsList newsItems={newsData} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoSec

import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import NewsList from '../newsList';
import axios from 'src/configs/axios';
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    EmailShareButton,
    PinterestShareButton,
    EmailIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share'
import { RWebShare } from "react-web-share";
import { useRouter } from 'next/router';

const InfoSec = ({ data }) => {

    const [newsData, setNewsData] = useState([])
    const router = useRouter();
    // const location = "https://bangalorestudy.com/blog/special-education-at-new-horizon-group-of-schools";
    const location = `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`;
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
                    {/* <div className="col-md-3">
                        <a href={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.pdf_file}`} className="btn applyNowButton align-content-center" target="_blank" rel="noopener noreferrer">Uploaded PDF DOC Preview</a>
                    </div> */}
                    {data.pdf_file && (
                        <div className="col-md-3">
                            <a href={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.pdf_file}`} className="btn applyNowButton align-content-center" target="_blank" rel="noopener noreferrer">
                                Uploaded PDF DOC Preview
                            </a>
                        </div>
                    )}

                </div>
                <div className="d-flex gap-3 flex-wrap mb-3">
                    <LinkedinShareButton url={location}>
                        <button className='btn btn-primary'><i className="bi bi-linkedin"></i></button>
                    </LinkedinShareButton>
                    <TwitterShareButton
                        url={location}
                        title={data?.meta_title}
                    >
                        <button className='btn btn-dark text-white'><i className="bi bi-twitter-x"></i></button>
                    </TwitterShareButton>
                    <FacebookShareButton
                        url={location}
                        quote={data?.meta_title}
                        hashtag={data?.meta_title}
                    >
                        <button className='btn btn-primary text-white'><i className="bi bi-facebook"></i> </button>
                    </FacebookShareButton>



                    <PinterestShareButton
                        url={location}
                        media={data?.meta_title}
                    >
                        <button className='btn btn-danger text-white'><i className="bi bi-pinterest"></i></button>
                    </PinterestShareButton>
                    <WhatsappShareButton
                        url={location}
                        title={data?.meta_title}

                    >
                        <button className='btn btn-success text-white'> <i className="bi bi-whatsapp"></i></button>
                    </WhatsappShareButton>

                    <RWebShare
                        data={{
                            text: `${data?.meta_title}`,
                            url: `${location}`,
                            title: `${data?.meta_title}`,
                        }}

                    >
                        <button className='btn btn-dark text-white'><i className="bi bi-share-fill"></i></button>
                    </RWebShare>
                    {/* <button className='btn btn-success text-white'><i className="bi bi-share-fill"></i></button> */}

                </div>
                <div className='pt-3'>
                    <div className="row">
                        <div className="col-md-8 text-black overflow-x-scroll">
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
        </section>
    )
}

export default InfoSec

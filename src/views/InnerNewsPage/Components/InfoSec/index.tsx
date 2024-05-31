import Link from 'next/link'
import React from 'react'
import NewsList from '../newsList';

const InfoSec = () => {
    const newsData = [
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        {
            imageSrc: '/images/icons/filter-card.jpg',
            text: 'This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
        },
        // Add more news items as needed
    ];

    return (
        <section className='bg-white'>
            <div className="container innerNewsSec">
                <div className="row py-5">
                    <div className="col-md-9 mb-3">
                        <h1 className='text-blue fw-bold'>Karnataka 2nd PUC Results Announced</h1>
                    </div>
                    <div className="col-md-3">
                        <Link href='/news' className='btn applyNowButton align-content-center'>Uploaded PDF DOC Preview</Link>
                    </div>
                </div>
                <div className="d-flex gap-3 flex-wrap mb-3">
                    <button className='btn btn-primary'><i className="bi bi-linkedin"></i> Share</button>
                    <button className='btn btn-info text-white'><i className="bi bi-facebook"></i> Share</button>
                    <button className='btn btn-dark text-white'><i className="bi bi-twitter-x"></i> Tweet</button>
                    <button className='btn btn-success text-white'><i className="bi bi-share-fill"></i> Share</button>
                    <button className='btn btn-danger text-white'><i className="bi bi-pinterest"></i> Pin</button>
                    <button className='btn btn-secondary text-white'><i className="bi bi-envelope"></i> Email</button>
                </div>
                <div className='pt-3'>
                    <div className="row">
                        <div className="col-md-7 text-black">
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero reprehenderit impedit nihil voluptatum non quos eligendi natus quia sunt similique vel harum numquam praesentium ducimus provident laborum labore, quis cum itaque eaque. Impedit, laborum veritatis. Fuga porro ipsa obcaecati unde
                            </p>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero reprehenderit impedit nihil voluptatum non quos eligendi natus quia sunt similique vel harum numquam praesentium ducimus provident laborum labore, quis cum itaque eaque. Impedit, laborum veritatis. Fuga porro ipsa obcaecati unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod commodi est explicabo eius reiciendis veniam vitae consequuntur assumenda aliquam nesciunt dignissimos a, aliquid at magni, molestias perspiciatis odio libero? Culpa quam harum atque sit in ipsum reprehenderit, doloremque, omnis minima dolorum ea enim deserunt. Perferendis est quae reiciendis repudiandae quis commodi aliquid obcaecati cupiditate nihil? Harum adipisci distinctio deserunt dolore.
                            </p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, illo. Animi nihil quaerat soluta repellendus quidem accusamus voluptates fugit tempora incidunt labore culpa dolorum vel pariatur eaque alias nesciunt laudantium, laborum blanditiis quas veniam expedita voluptatibus error perferendis vero. Ipsum quibusdam rerum aliquam est quas laudantium omnis, tenetur quos tempore</p>
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
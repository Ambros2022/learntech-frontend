import dynamic from 'next/dynamic';
import React from 'react'
const NewsLetterEnquiry = dynamic(() => import('src/@core/components/popup/NewsLetterEnquiry'), { ssr: false });


const NewsLetterSec = () => {
    return (
        <>
            <section className='py-5'>
                <div className="container bg-skyBlue rounded">
                    <h2 className='fw-bold text-blue text-md-start text-center mb-3'>Subscribe to our Newsletter
                    </h2>
                    <p className="text-black  text-md-start text-center mb-5">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, dolorem voluptate officiis harum temporibus quasi vitae quos tempore sequi illo. Facilis facere quae, molestias, eius sapiente exercitationem natus doloremque provident aliquam quos quo obcaecati odit iusto dignissimos optio mollitia, ipsa consequuntur velit. Dolorem explicabo sed quos libero neque error obcaecati sit voluptates enim aspernatur vero, eaque laudantium velit, maiores deleniti amet vitae vel necessitatibus omnis dolorum incidunt quia. Nam iusto ut tempora optio quisquam eaque provident perferendis cupiditate ipsum molestias. Est a laudantium vero quidem eum quas nihil eius repellat reprehenderit sunt. Fuga necessitatibus vero consequatur sapiente laudantium voluptates animi.
                    </p>
                    <NewsLetterEnquiry />
                </div>
            </section>
        </>
    )
}

export default NewsLetterSec
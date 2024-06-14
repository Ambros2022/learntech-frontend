import React from 'react';
import MainCarousel from 'src/@core/components/main-carousel';

const LatestUpdateSec = () => {
    const updates = [
        {
            title: 'NIFT City Intimation Slip 2024 Out; Check Direct Link Here',
            date: 'Jan 23, 2024',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil totam, est, neque eum ullam nesciunt quaerat iste rem, optio voluptas delectus quo! Aperiam, minus dolorum sequi, tempore corporis maxime magnam architecto dicta ducimus molestiae provident ad assumenda! Voluptatibus, amet dolores pariatur repellendus labore atque officiis nihil culpa deserunt, quasi necessitatibus.'
        },
        {
            title: 'Board Exam 2024 Dates Announced; Check Schedule Here',
            date: 'Jan 25, 2024',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil totam, est, neque eum ullam nesciunt quaerat iste rem, optio voluptas delectus quo! Aperiam, minus dolorum sequi, tempore corporis maxime magnam architecto dicta ducimus molestiae provident ad assumenda! Voluptatibus, amet dolores pariatur repellendus labore atque officiis nihil culpa deserunt, quasi necessitatibus.'
        },
        {
            title: 'New Education Policy 2024: Key Highlights',
            date: 'Jan 27, 2024',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil totam, est, neque eum ullam nesciunt quaerat iste rem, optio voluptas delectus quo! Aperiam, minus dolorum sequi, tempore corporis maxime magnam architecto dicta ducimus molestiae provident ad assumenda! Voluptatibus, amet dolores pariatur repellendus labore atque officiis nihil culpa deserunt, quasi necessitatibus.'
        },
        {
            title: 'New Education Policy 2024: Key Highlights',
            date: 'Jan 27, 2024',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil totam, est, neque eum ullam nesciunt quaerat iste rem, optio voluptas delectus quo! Aperiam, minus dolorum sequi, tempore corporis maxime magnam architecto dicta ducimus molestiae provident ad assumenda! Voluptatibus, amet dolores pariatur repellendus labore atque officiis nihil culpa deserunt, quasi necessitatibus.'
        },
        // Add more updates as needed
    ];

    return (
        <section className='bg-white py-3'>
            <div className="container">
                <h2 className='fw-bold text-blue text-center'>
                    Latest Updates on Boards
                </h2>
                <div className='py-3 position-relative boardCarosuel'>
                    <MainCarousel items={updates.map((update, index) => (
                        <div className="card mx-md-3 mx-lg-3 mx-xl-3 mx-5" key={index}>
                            <div className="card-body cardBlogText">
                                <h6 className='fw-bold text-blue'>{update.title}</h6>
                                <p className='text-black mb-1'>{update.date}</p>
                                <p className='text-black'>
                                    {update.description}
                                </p>
                                <button className='btn viewMoreCollegeBtn'>Read More</button>
                            </div>
                        </div>
                    ))} />
                </div>
            </div>
        </section>
    );
}

export default LatestUpdateSec;

import React from 'react'

const TopExamSec = ({ data = {} }: { data?: { meta_title?: string, meta_description?: string } }) => {
    return (
        <>
            <section className='py-5 bg-white'>
                <div className="container text-center">
                    <h2 className='text-blue fw-bold'>List of Top Exams in India</h2>
                    <p className='text-black'>{data.meta_title}</p>
                    <p className='text-black'>{data.meta_description}</p>
                </div>
            </section>
        </>
    );
};


export default TopExamSec
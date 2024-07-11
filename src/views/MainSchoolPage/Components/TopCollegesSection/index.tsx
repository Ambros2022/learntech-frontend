import Link from 'next/link'
import React from 'react'

function TopCollegesSection({data}) {
 
    return (
        <>
            <section className='bg-white'>
                <section className="container InnerCollegeNavigationLink pt-2">
                    <p className='mb-3'><Link href="/">Home</Link> {'>'} <span className='text-blue'>Schools</span></p>
                </section>
                <div className='container innerClg pt-5 pb-3'>
                    <h2 className='text-center fw-bold text-blue mb-3'>List of Top Schools in India</h2>
                    <p className='text-black'>{data?.meta_title || 'Default Title'}</p>
                    <p className='text-black'>{data?.meta_description || 'Default Title'}</p>
                </div>
            </section>
        </>
    )
}

export default TopCollegesSection
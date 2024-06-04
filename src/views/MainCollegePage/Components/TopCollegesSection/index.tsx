import Link from 'next/link'
import React from 'react'

function TopCollegesSection() {
    return (
        <>
            <section className='bg-white'>
                <section className="container InnerCollegeNavigationLink pt-2">
                    <p className='mb-3'><Link href="/">Home</Link> {'>'} Colleges</p>
                </section>
                <div className='container innerClg pt-5 pb-3'>
                    <h2 className='text-center fw-bold text-blue mb-3'>List of Top Colleges in India</h2>
                    <p className='text-black'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </section>
        </>
    )
}

export default TopCollegesSection
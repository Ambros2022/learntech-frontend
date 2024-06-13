import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='teamworksec'>
                <Image src='/images/icons/Banner BG.png' alt='teamwork-logo' width={1400} height={300} />
            </section >
            <section className='linkFontSize py-2'>
                <div className="container">
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><Link href="/our-team" className='text-blue'>Our Team</Link>
                </div>
            </section>
        </>
    )
}

export default BannerSec
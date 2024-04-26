import React from 'react'
import MainCarousel from 'src/@core/components/main-carousel';

function NewsLinkSection() {
    const linkSectionItems = [
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>,
        <h6 className="py-2">JEE Main Result Link</h6>
    ];
    return (
        <section className="newsLinkSec py-2">
            <div className="container text-center">
                <MainCarousel items={linkSectionItems} />
            </div>
        </section >
    )
}

export default NewsLinkSection

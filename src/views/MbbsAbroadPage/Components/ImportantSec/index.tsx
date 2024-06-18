import Link from 'next/link';
import React from 'react';

const ImportantSec = () => {
    // Define an array of tags with their corresponding URLs
    const tags = [
        { label: 'Study In USA', url: '/mbbs-abroad' },
        { label: 'Study In UK', url: '/mbbs-abroad' },
        { label: 'Study In Canada', url: '/mbbs-abroad' },
        { label: 'Study In Australia', url: '/mbbs-abroad' },
        { label: 'Study In Germany', url: '/mbbs-abroad' },
        { label: 'Study In Russia', url: '/mbbs-abroad' },
        // Add more tags as needed
    ];

    return (
        <section className='bg-white py-5'>
            <div className="container">
                <h2 className='fw-bold text-blue mb-3'>Important Tags</h2>
                <div className="d-flex gap-3 flex-wrap">
                    {tags.map((tag, index) => (
                        <Link key={index} href={tag.url} className='btn p-3 rounded text-black bg-skyBlue'>
                            {tag.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImportantSec;

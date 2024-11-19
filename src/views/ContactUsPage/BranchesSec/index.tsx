import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Branch {
    name: string;
    address: string;
    phone: string;
    mapUrl: string;
    addressUrl?: string;
}

const BranchesSec = () => {
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

    const branchData = [
        {
            name: 'Bangalore (Headquarters)',
            address: `#80 (4), 'D' Main Rd, East End, 9th Block, Jayanagar, Bangalore, Karnataka - 560041`,
            phone: '+91 9036020016, +91 9036020005',
            addressUrl: 'https://maps.app.goo.gl/m4Fu8fGQQEs6q1Cf6',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.827772809437!2d77.59573057356702!3d12.918788516036988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15064e759943%3A0x60dcac77858f6b5e!2sLearntech%20Edu%20Solutions%20Pvt%20Ltd%20-%20Study%20Abroad%20Counselor!5e0!3m2!1sen!2sin!4v1718369620720!5m2!1sen!2sin'
        },
        {
            name: 'Dubai',
            address: '6, First, Al Mamzar Centre Al Qiyadah Metro Station, Dubai',
            phone: '+971 502436552, +971 504955123',
            addressUrl: 'https://maps.app.goo.gl/jYyDjdE2LC8Z8cKm8',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28859.24506777377!2d55.330436832611674!3d25.290572261302543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d483c5491eb%3A0x9786494b91ce567d!2sAL%20MURAN!5e0!3m2!1sen!2sin!4v1721999344203!5m2!1sen!2sin'
        },
        {
            name: 'Bahrain',
            address: 'Shop 240, Road No: 5607, Block No: 756, Aali, Manama, Bahrain',
            phone: '+973 35480190, +973 38780368',
            addressUrl: 'https://maps.app.goo.gl/LMueZrcnxYG2xYMi9',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.4548974759305!2d50.49566057290878!3d26.14931064191346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49b1e9b2715933%3A0x1684da4adde65812!2sRd%20No%205607%2C%20Buri%2C%20Bahrain!5e0!3m2!1sen!2sin!4v1721999493971!5m2!1sen!2sin'
        }
    ];

    return (
        <section className='bg-white branchLink pb-5'>
            <div className="container">
                <h2 className='text-center fw-bold text-blue mb-3'>FIND US @</h2>
                <h2 className='text-center fw-bold text-blue mb-3'>Our Branches</h2>
                <div className="row pt-3">
                    <div className="col-md-6">
                        {branchData.map((branch, index) => (
                            <div
                                key={index}
                                className="card mb-3 p-3 bg-skyBlue"
                                onClick={() => setSelectedBranch(branch)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="row">
                                    <div className="col-md-12 mx-auto col-xl-2 col-lg-2 text-center ">
                                        <Image src='/images/icons/Locationicon.svg' width={70} height={70} alt="location-icon" className='p-3 rounded clr-red mx-auto' />
                                    </div>
                                    <div className="col-md-12 text-md-center text-lg-start mt-md-2 col-xl-10 col-lg-10">
                                        <h3 className='text-blue fw-bold ms-lg-2 pt-1'>{branch.name}</h3>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-lg-10 ms-auto">
                                        <h6 className="d-flex align-items-center ms-lg-2">
                                            <i className="bi bi-geo-alt-fill text-blue me-1"></i>

                                            <Link target="_blank" href={branch.addressUrl || "#"} className="ms-1"> {/* Optional margin for spacing */}
                                                <span className="fw-bold">Address: </span> {branch.address}
                                            </Link>
                                        </h6>

                                        <h6 className='ms-lg-2'>
                                            <i className='bi bi-telephone-fill text-blue me-1'></i>
                                            <Link href={`tel:${branch.phone.replace(/ /g, '')}`}>
                                                {branch.phone}
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-6">
                        <div className='p-2 h-100 bg-blue rounded'>
                            <iframe
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                                src={selectedBranch ? selectedBranch.mapUrl : branchData[0].mapUrl}
                                className='rounded'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BranchesSec;

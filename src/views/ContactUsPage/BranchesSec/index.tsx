import Image from 'next/image'
import React from 'react'

const BranchesSec = () => {
    return (
        <section className='bg-white pb-5'>
            <div className="container">
                <h2 className='text-center fw-bold text-blue mb-3'>Our Branches</h2>
                <div className="row pt-3">
                    <div className="col-md-6 col-10 mx-auto h-100">
                        <div className="card mb-3 p-3 bg-skyBlue">
                            <div className="row">
                                <div className="col-md-12 mx-auto col-xl-2 col-lg-2 text-center ">
                                    <Image src='/images/icons/locationicon.svg' width={70} height={70} alt="location-icon" className='p-3 rounded bg-img-blue mx-auto' />
                                </div>
                                <div className="col-md-12 text-md-center text-lg-start mt-md-2 col-xl-10 col-lg-10">
                                    <h5 className='text-blue fw-bold ms-lg-2'>Bangalore (Headquarters)</h5>
                                    <h5 className='text-black fw-bold ms-lg-2'>Bangalore Office</h5>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <div className="col-lg-10 ms-auto">
                                    <h6 className='ms-lg-2'><i className='bi bi-geo-alt-fill text-blue me-1'></i><span className='fw-bold'>Address :</span> #80 (4), E End D Main Rd, Phase 3 Tilak Nagar, Jayanagara 9th Block, Bengaluru, Karnataka 560041</h6>
                                    <h6 className='ms-lg-2'><i className='bi bi-telephone-fill text-blue me-1'></i>+91-9036020005/16</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3 p-3 bg-skyBlue">
                            <div className="row">
                                <div className="col-md-12 mx-auto col-xl-2 col-lg-2 text-center ">
                                    <Image src='/images/icons/locationicon.svg' width={70} height={70} alt="location-icon" className='p-3 rounded bg-img-blue mx-auto' />
                                </div>
                                <div className="col-md-12 text-md-center text-lg-start mt-md-2 col-xl-10 col-lg-10">
                                    <h5 className='text-blue fw-bold ms-lg-2'>Dubai</h5>
                                    <h5 className='text-black fw-bold ms-lg-2'>UAE Office</h5>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <div className="col-lg-10 ms-auto">
                                    <h6 className='ms-lg-2'><i className='bi bi-geo-alt-fill text-blue me-1'></i><span className='fw-bold'>Address :</span> 6, First Floor, Al Mamzar Centre Al Qiyadah Metro Station, Dubai</h6>
                                    <h6 className='ms-lg-2'><i className='bi bi-telephone-fill text-blue me-1'></i>+971 502436552, +971 504955123</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-md-0 mb-3 p-3 bg-skyBlue">
                            <div className="row">
                                <div className="col-md-12 mx-auto col-xl-2 col-lg-2 text-center ">
                                    <Image src='/images/icons/locationicon.svg' width={70} height={70} alt="location-icon" className='p-3 rounded bg-img-blue mx-auto' />
                                </div>
                                <div className="col-md-12 text-md-center text-lg-start mt-md-2 col-xl-10 col-lg-10">
                                    <h5 className='text-blue fw-bold ms-lg-2'>Bahrain</h5>
                                    <h5 className='text-black fw-bold ms-lg-2'>Bahrain Office</h5>
                                </div>
                            </div>
                            <div className="row pt-3">
                                <div className="col-lg-10 ms-auto">
                                    <h6 className='ms-lg-2'><i className='bi bi-geo-alt-fill text-blue me-1'></i><span className='fw-bold'>Address :</span> Shop 240-Y, Road No: 5607, Block No: 756, Aali, Manama, Bahrain</h6>
                                    <h6 className='ms-lg-2'><i className='bi bi-telephone-fill text-blue me-1'></i>+973 35480190, +973 38780368</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-10 mx-auto">
                        <div className='p-2 h-100 bg-blue rounded'>
                            <iframe
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.827772809437!2d77.59573057356702!3d12.918788516036988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15064e759943%3A0x60dcac77858f6b5e!2sLearntech%20Edu%20Solutions%20Pvt%20Ltd%20-%20Study%20Abroad%20Counselor!5e0!3m2!1sen!2sin!4v1718369620720!5m2!1sen!2sin"
                                className='rounded'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BranchesSec
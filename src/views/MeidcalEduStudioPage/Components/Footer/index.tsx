import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <>
            <section className='bg-skyBlue pt-5'>
                <div className="container">
                    <h2 className='fw-bold text-blue'>We are keen to hear about your future over refreshments, because every great idea has to begin somewhere!</h2>
                    <div className="d-flex justify-content-center">
                        <Image src="/images/icons/coffee.png" width={200} height={200} alt='coffee.png' className='align-self-end img-fluid' />
                    </div>
                </div>
            </section>
            <section className='bg-blue pt-5 footerMed'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-md-0 mb-5 col-10 mx-auto">
                            <h5 className='text-white fw-bold'>Find Us @ Bangalore</h5>
                            <hr className='text-white' />
                            <div className='d-flex mb-3'>
                                <i className='bi bi-geo-alt-fill text-warning me-2 fs-4'></i>
                                <h6 className='text-white align-self-center'>#80(4), ‘D’ Main, East End, 9th Block Jayanagar, Bangalore-560 041</h6>
                            </div>
                            <div className='d-flex'>
                                <i className='bi bi-telephone-fill text-warning me-3 fs-4'></i>
                                <div className="d-flex flex-column gap-3">
                                    <Link className='d-flex' href='tel:+91 90058 00200'>
                                        <Image src='/images/icons/whatsapp.png' width={20} height={20} alt='medical-logo' className="me-1 navbar-brand"></Image><h6 className='m-0 text-white align-self-center'>+91 90058 00200</h6>
                                    </Link>
                                    <Link className='d-flex' href='tel:+91 90057 00300'>
                                        <Image src='/images/icons/whatsapp.png' width={20} height={20} alt='medical-logo' className="me-1 navbar-brand"></Image><h6 className='m-0 text-white align-self-center'>+91 90057 00300</h6>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-md-0 mb-5 col-10 mx-auto">
                            <h5 className='text-white fw-bold'>Find Us @ Dubai</h5>
                            <hr className='text-white' />
                            <div className='d-flex mb-3'>
                                <i className='bi bi-geo-alt-fill text-warning me-2 fs-4'></i>
                                <h6 className='text-white align-self-center'>Office: 220, Al Hilal Bank Building, Near Al Tawar Center, Qusais, Dubai.</h6>
                            </div>
                            <div className='d-flex'>
                                <i className='bi bi-telephone-fill text-warning me-3 fs-4'></i>
                                <div className="d-flex flex-column gap-3">
                                    <Link className='d-flex' href='tel:+971 50 2436552'>
                                        <Image src='/images/icons/whatsapp.png' width={20} height={20} alt='medical-logo' className="me-1 navbar-brand"></Image><h6 className='m-0 text-white align-self-center'>+971 50 2436552</h6>
                                    </Link>
                                    <Link className='d-flex' href='tel:+971 50 4955123'>
                                        <Image src='/images/icons/whatsapp.png' width={20} height={20} alt='medical-logo' className="me-1 navbar-brand"></Image><h6 className='m-0 text-white align-self-center'>+971 50 4955123</h6>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-md-0 mb-5 col-10 mx-auto">
                            <h5 className='text-white fw-bold'>Find Us @ Bahrain
                            </h5>
                            <hr className='text-white' />
                            <div className='d-flex mb-3'>
                                <i className='bi bi-geo-alt-fill text-warning me-2 fs-4'></i>
                                <h6 className='text-white align-self-center'>Shop 240-Y, Road No: 5607, Block No: 576, Aali, Manama, Bahrain</h6>
                            </div>
                            <div className='d-flex'>
                                <i className='bi bi-telephone-fill text-warning me-3 fs-4'></i>
                                <div className="d-flex flex-column gap-3">
                                    <Link className='d-flex' href='tel:+973 35 480190'>
                                        <Image src='/images/icons/whatsapp.png' width={20} height={20} alt='medical-logo' className="me-1 navbar-brand"></Image><h6 className='m-0 text-white align-self-center'>+973 35 480190</h6>
                                    </Link>
                                    <Link className='d-flex' href='tel:+973 38 780368'>
                                        <Image src='/images/icons/whatsapp.png' width={20} height={20} alt='medical-logo' className="me-1 navbar-brand"></Image><h6 className='m-0 text-white align-self-center'>+973 38 780368</h6>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-blue py-5'>
                <hr className='text-white' />
                <h4 className='text-center text-white mb-3 mt-5'>Copyright @ 2024</h4>
                <h6 className='text-center text-white'>Learntech Edu Solutions Pvt Ltd.</h6>
            </section>
        </>
    )
}

export default Footer
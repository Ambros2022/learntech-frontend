import Link from 'next/link';
import React, { useState } from 'react';

function TopUniversitiesSection() {
    const [showMore, setShowMore] = useState(false);

    const handleToggleReadMore = () => {
        setShowMore(!showMore);
    };
    return (
        <>
            <section className='bg-white'>
                <section className="container InnerCollegeNavigationLink linkFontSize pt-2">
                    <p className='mb-3'><Link href="/">Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Universities</span></p>
                </section>
                <div className='container innerClg pt-5 pb-3'>
                    <h2 className='text-center fw-bold text-blue mb-3'>Best Universities in India
                    </h2>
                    <p className='text-black'>Selecting the right university is more than just a step towards your future; it's a transformative experience that shapes your entire life. The best Universities in India offer more than academic excellence; they provide a vibrant ecosystem where passion meets purpose, and potential transforms into reality. These institutions are not just places of learning; they are incubators of innovation, creativity, and leadership.
                    </p>
                    <h5 className='fw-bold text-black mb-4'>Why Universities are a Pillar of Your Academic and Personal Growth:
                    </h5>
                    <h6 className='fw-bold text-black'>
                        <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Catalysts for Innovation: </h6>
                    <p className='text-black'>The top Universities in India are at the forefront of groundbreaking research and technological advancements. They offer students unique opportunities to work on cutting-edge projects, collaborate with renowned faculty, and contribute to innovations that can change the world. These top NIRF ranked Universities in India are well-recognized for their commitment to driving forward-thinking initiatives and research that meet global standards.</p>
                    {showMore && (
                        <>
                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Tailored Educational Experiences: </h6>
                            <p className='text-black'>From the best government Universities in India to the best private Universities in India, a variety of institutions provide a wide range of courses designed to meet the latest industry standards. Whether it’s pioneering medical research, designing the next big tech breakthrough, or mastering the art of business management, these Universities ensure students receive the specialized education needed to excel. The best autonomous Universities in pan India focus on offering programs that are not only academically rigorous but also flexible to meet individual student needs.</p>
                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Global Exposure and Cultural Enrichment: </h6>
                            <p className='text-black'>Top ranked Universities in India attract students from diverse backgrounds, creating a rich tapestry of cultures and perspectives. This diversity fosters a global outlook, enhances critical thinking, and builds strong interpersonal skills, preparing students for success on the world stage. This aspect is particularly emphasized in UGC approved ranking Universities in India, which maintain high standards for inclusivity and global engagement.
                            </p>
                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Networking and Career Opportunities: </h6>
                            <p className='text-black'>The best educational institutes in India have a strong reputation for maintaining robust connections with leading industries and organizations. They provide pathways through internships, workshops, and placements, allowing students to gain real-world experience, build professional networks, and secure successful careers. This networking is critical for those studying in both top NIRF ranked Universities and best private Universities in India, where industry connections significantly enhance employability.
                            </p>
                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Holistic Personal Development: </h6>
                            <p className='text-black'>From top Universities in India to best government Universities in India, the emphasis is on nurturing personal growth. Leadership programs, extracurricular activities, and a variety of clubs allow students to explore their interests, discover new talents, and build confidence. These institutions ensure students graduate as well-rounded individuals ready to become the leaders of tomorrow.
                            </p>
                            <h5 className='fw-bold text-black mb-4'>A Wide Array of Top Universities in India to Shape Your Future:
                            </h5>
                            <p className='text-black'>India's educational landscape offers an extensive variety of specialized Universities that cater to diverse academic and professional aspirations. Whether you aim to pursue a career in healthcare, engineering, or the arts, there's a university that aligns with your interests and career goals. From top-ranked medical Universities providing cutting-edge facilities and research opportunities to prestigious engineering institutions that foster innovation and critical thinking, students have access to institutions that can significantly enhance their knowledge and skills. The best Universities in India are categorized based on the courses they offer, ensuring that students can find a perfect fit for their academic journey. Below is a list of top Universities in India, offering specialized streams of education:
                            </p>
                            <table className='table text-black table-bordered table-responsive'>
                                <tbody className=''>
                                    <tr>
                                        <td>
                                            Medical Universities
                                        </td>
                                        <td>
                                            Dental Universities
                                        </td>
                                        <td>
                                            Ayurveda, Unani, Siddha & Homeopathy (AYUSH) Universities
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Naturopathy & Yogic Science Universities

                                        </td>
                                        <td>
                                            Veterinary Universities                                </td>
                                        <td>
                                            Nursing Universities                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Allied Health Sciences Universities                                </td>
                                        <td>
                                            Physiotherapy Universities                                </td>
                                        <td>
                                            Pharmacy Universities                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Designing Universities

                                        </td>
                                        <td>
                                            Architecture Universities                                </td>
                                        <td>
                                            Law Universities                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Science Universities                                </td>
                                        <td>
                                            Management Universities                                </td>
                                        <td>
                                            Computer Universities                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Commerce Universities                                </td>
                                        <td>
                                            Arts & Humanities Universities                                </td>
                                        <td>
                                            Media & Communication Universities                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Aviation Universities                                </td>
                                        <td>
                                            Education Universities                                </td>
                                        <td>
                                            Agriculture Universities                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Audiology Universities                                </td>
                                        <td>
                                            Vocational Study Universities                                </td>
                                        <td>
                                            Earth Science Universities                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Life Sciences Universities                                </td>
                                        <td>
                                            Social Work Universities

                                        </td>
                                        <td>
                                            Occupational Therapy Universities                                </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className='text-black'>
                                By choosing a university that aligns with your passion and career goals, you can embark on a fulfilling educational journey that not only enhances your knowledge but also shapes your future. The best Universities in India provide the right environment to nurture your talents and prepare you for the challenges of tomorrow.
                            </p>
                        </>
                    )}
                    <div className='text-center'>
                        <button onClick={handleToggleReadMore} className='btn mb-5 viewMoreCollegeBtn'>
                            {showMore ? 'Read Less' : 'Read More'}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TopUniversitiesSection;

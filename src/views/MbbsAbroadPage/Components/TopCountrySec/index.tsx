import React, { useState } from 'react'

const TopCountrySec = () => {
    const countries = [
        {
            name: 'Armenia',
            flag: '/images/icons/armenia-flag.webp',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3130742.2674261797!2d40.29293311033469!3d39.977936755341815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40155684e773bac7%3A0xd0b4757aeb822d23!2sArmenia!5e0!3m2!1sen!2sin!4v1720076782466!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Armenia is popularly known for prioritizing education, resulting in primary education in the country
                                being completely free. Moreover, the top colleges of Armenia provide courses that are affordable for all
                                students.
                            </p>
                            <p className='text-black'>
                                Students have an amazing opportunity to delve into the culture of Armenia through their 4000 historical
                                monuments. The numerous internship opportunities available in the country helps them gain useful
                                experiences.
                            </p>
                            <h4 className='text-blue mt-3 fw-bold'>Armenian Medical Institute:</h4>
                            <p className='text-black'>
                                Established in 1990, Armenian Medical Institute is one of the largest universities in Armenia. It ranks
                                2nd in the entire country and provides a range of facilities. In fact, the University has the 3rd
                                largest library in the entire country. Students who join this university get to learn different skills
                                from around 250 medical professionals and specialists.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee / Year </th>
                                        <th className='text-blue bg-skyBlue'>Food Charges / Year </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>6500 USD or INR 4,55,000*</td>
                                        <td>500 USD or INR 35,000*</td>
                                        <td>430 USD or INR 30,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>4000 USD or INR 2,80,000*</td>
                                        <td>500 USD or INR 35,000*</td>
                                        <td>430 USD or INR 30,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Georgia',
            flag: '/images/icons/ge.png',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022073.856508449!2d40.71697847532751!3d42.29465875614516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x4f907964122d4ac2!2sGeorgia!5e0!3m2!1sen!2sin!4v1720080269175!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Georgia is known for its mixed European and Asian culture. The country has a beautiful atmosphere and a low crime rate. The top colleges of Georgia charge lower fees when compared to the Indian colleges. The cost of living is also surprisingly low for Indian students.
                            </p>
                            <h4 className='text-blue mt-3 fw-bold'>Tbilisi State Medical University :</h4>
                            <p className='text-black'>
                                Tbilisi State Medical University was established in 1918. More than 10,000 students study undergraduate and postgraduate programs provided by the institution. It is ranked at the 8th position among the higher educational institutions in Georgia. Since its establishment, the university has produced around 40,000 doctors.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee / Year </th>
                                        <th className='text-blue bg-skyBlue'>Food Charges / Year </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>5500 USD or INR 3,85,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>5500 USD or INR 3,85,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <h4 className='text-blue mt-3 fw-bold'>Caucasus International University :</h4>
                    <p className='text-black'>
                        Caucasus International University, established in 1995 attracts many foreign students to the country. Around 4000-5000 students study at the university. Even though it was founded just a few decades ago, it has managed to become one of the top medical institutions in the country.
                    </p>
                    <table
                        className='table table-bordered text-center table-responsive overflow-scroll'
                        style={{ border: '1px solid #274896' }}
                    >
                        <thead>
                            <tr>
                                <th className='text-blue bg-skyBlue'>Year of Study</th>
                                <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                <th className='text-blue bg-skyBlue'>Hostel Fee / Year </th>
                                <th className='text-blue bg-skyBlue'>Food Charges / Year </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='fw-bold'>I Year</td>
                                <td>5500 USD or INR 3,85,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                            </tr>
                            <tr>
                                <td className='fw-bold'>II - VI Year</td>
                                <td>5500 USD or INR 3,85,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4 className='text-blue mt-3 fw-bold'>Georgian American University :</h4>
                    <p className='text-black'>
                        The Georgian American University, founded in 2005, highly emphasizes on providing quality education. The university ranks among the top 30 universities in the country. It follows the international standards of education. It also has student exchange programs with different leading institutions around the world.
                    </p>
                    <table
                        className='table table-bordered text-center table-responsive overflow-scroll'
                        style={{ border: '1px solid #274896' }}
                    >
                        <thead>
                            <tr>
                                <th className='text-blue bg-skyBlue'>Year of Study</th>
                                <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                <th className='text-blue bg-skyBlue'>Hostel Fee / Year </th>
                                <th className='text-blue bg-skyBlue'>Food Charges / Year </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='fw-bold'>I Year</td>
                                <td>4700 USD or INR 3,29,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                            </tr>
                            <tr>
                                <td className='fw-bold'>II - VI Year</td>
                                <td>4700 USD or INR 3,29,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                            </tr>
                        </tbody>
                    </table>
                    <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                </div>
            )
        },
        {
            name: 'Philippines',
            flag: '/images/icons/phi.jpg',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16012970.944654217!2d111.93024858735006!3d11.52193447318389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x324053215f87de63%3A0x784790ef7a29da57!2sPhilippines!5e0!3m2!1sen!2sin!4v1720080315743!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                The Philippines is another popular destination for higher education among Indian students. The total educational cost for studying in the Philippines is less when compared to India. Moreover, the American teaching format and the American accent used in the colleges and institutes of the country makes it the best place to pursue higher studies for Indians.
                            </p>
                            <h4 className='text-blue mt-3 fw-bold'>Davao Medical School Foundation :</h4>
                            <p className='text-black'>
                                Davao Medical School Foundation was established in 1976. The university provides education on primary health care, integral health sciences, and community health care. The University is ranked in the 6th position among the top institutions in the Philippines. It is also affiliated with 7 hospitals to provide maximum practical experience to the students.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee and Food Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>10000 USD or INR 7,00,000*</td>
                                        <td>2050 USD or INR 1,44,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>5100 USD or INR 3,57,000*</td>
                                        <td>2050 USD or INR 1,44,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Russia',
            flag: '/images/icons/ru.avif',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37494223.23909491!2d103.00000000000001!3d55.000000000000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x453c569a896724fb%3A0x1409fdf86611f613!2sRussia!5e0!3m2!1sen!2sin!4v1720080377060!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Russia is a country that continues to create a global impact in modern times. The colleges and universities in Russia are equipped with the latest technologies and facilities. The professors are highly qualified and use advanced teaching methods which enables the students to learn easily and also helps to develop practical experiences. The students who study in Russia develop a sense of self-dependency, responsibility, and determination.
                            </p>
                            <h4 className='text-blue mt-3 fw-bold'>Tver State Medical University :</h4>
                            <p className='text-black'>
                                Tver State Medical University is a centre that forms partnerships and collaborates with many other international organizations to bring the best educational experience for students. The history of Tver State Medical University dates back to the year 1902, during which it was established. Since then, it has made a lot of achievements in the fields of education and research.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee / Year</th>
                                        <th className='text-blue bg-skyBlue'>Food Charges / Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>2900 USD or INR 2,03,000*</td>
                                        <td>250 USD or INR 17,500*</td>
                                        <td>440 USD or INR 30,800*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>2900 USD or INR 2,03,000*</td>
                                        <td>250 USD or INR 17,500*</td>
                                        <td>440 USD or INR 30,800*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Ukraine',
            flag: '/images/icons/ua.png',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10964033.359121611!2d20.61269018854429!3d47.863495797325086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d1d9c154700e8f%3A0x1068488f64010!2sUkraine!5e0!3m2!1sen!2sin!4v1720080723327!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Ukraine has constantly gained popularity among international students for its world-class education facilities in higher education. The cost of living for Indian students is less in Ukraine. The educational environment in the country is also very good as they provide 1 teacher for every 14 students. As a result, each and every student gets equal attention and proper guidance from the professors.
                            </p>
                            <h4 className='text-blue mt-3 fw-bold'>Bogomolets Kyiv National Medical University :</h4>
                            <p className='text-black'>
                                Bogomolets Kyiv National Medical University was established in 1841. More than 10,000 students receive training at this institution in the medical science field. It is known to be the best medical university in Ukraine.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee / Year</th>
                                        <th className='text-blue bg-skyBlue'>Food Charges / Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>8400 USD or INR 2,03,000*</td>
                                        <td>1000 USD or INR 70,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>4500 USD or INR 2,03,000*</td>
                                        <td>1000 USD or INR 70,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Moldova',
            flag: '/images/icons/md.png',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788825.1048421776!2d25.749923611495202!3d46.952611753987355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3628b769a1%3A0x258119acdf53accb!2sMoldova!5e0!3m2!1sen!2sin!4v1720080884844!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Moldova provides the perfect environment for students to study and complete their education in a stress-free manner. Studying and doing an internship in Moldova will provide the students with a unique and unforgettable experience that will be useful in their careers.
                            </p>
                            <h4 className='text-blue mt-3 fw-bold'>Nicolae Testemitanu State University of Medicine and Pharmacy :</h4>
                            <p className='text-black'>
                                Nicolae Testemitanu State University of Medicine and Pharmacy was established in 1945 and imparts education to more than 6000 students. The university ranks among the top 6000 universities globally. It has a Medical Scientific Library that plays a crucial role in the training and research process of the students. It also has International alliances with many top educational institutions in the world.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee + Food / Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>4420 EUR or INR 3,75,700*</td>
                                        <td>1500 EUR or INR 1,27,500*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>4300 EUR or INR 3,65,500*</td>
                                        <td>1500 EUR or INR 1,27,500*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>
                                *Fee in INR subject to change according to EUR rate                                </h6>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Uzbekistan',
            flag: '/images/icons/uz.png',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6141678.20746513!2d59.31996558009517!3d41.26824663897643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b20a5d676b1%3A0xca0a6dad7e841e20!2sUzbekistan!5e0!3m2!1sen!2sin!4v1720081051260!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Uzbekistan is a country located in Central Asia. It has developed into a country with a mix of Soviet-style architecture and ancient Islamic architecture. It is slowly turning into a popular choice for students who want to undertake higher studies in foreign countries. Every year, students from India, Bangladesh, Bhutan, Nepal, Pakistan, and many other countries move to Uzbekistan to pursue their higher studies.
                            </p>
                            <h4 className='text-blue mt-3 fw-bold'>Tashkent Medical Academy :</h4>
                            <p className='text-black'>
                                Tashkent Medical Academy was established in 1919. It ensures to train the students as professionals so that they can contribute to the overall development of the healthcare system. The academy has seven specialized scientific councils along with the main research unit called the Central Research Laboratory (CRL).
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee + Hostel Fee + Food / Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>8700 USD or INR 6,09,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - V Year</td>
                                        <td>5700 USD or INR 3,99,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                        </div>
                    </div>
                </div>
            )
        }
    ]

    const [activeTab, setActiveTab] = useState(countries[0].name)

    const handleTabClick = name => {
        setActiveTab(name)
    }

    return (
        <section className='topCountryLinks bg-white pb-5'>
            <div className='container bg-skyBlue rounded mb-3 py-3 px-4'>
                <h2 className='text-blue fw-bold mb-3'>Top 10 Countries to Study MBBS Abroad</h2>
                <ul className='nav nav-pills d-flex gap-2 flex-wrap' id='pills-tab' role='tablist'>
                    {countries.map((country, index) => (
                        <li className='nav-item rounded' key={index}>
                            <button
                                className={`nav-link ${country.name === activeTab ? 'active' : ''}`}
                                id={`pills-${country.name}-tab`}
                                data-bs-toggle='pill'
                                data-bs-target={`#pills-${country.name}`}
                                type='button'
                                role='tab'
                                aria-controls={`pills-${country.name}`}
                                aria-selected={country.name === activeTab ? 'true' : 'false'}
                                onClick={() => handleTabClick(country.name)}
                            >
                                <img src={country.flag} width={30} height={30} alt={`${country.name}-flag`} className='me-2 rounded' />
                                {country.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className='tab-content' id='pills-tabContent'>
                    {countries.map((country, index) => (
                        <div
                            className={`tab-pane fade ${country.name === activeTab ? 'show active' : ''}`}
                            id={`pills-${country.name}`}
                            role='tabpanel'
                            aria-labelledby={`pills-${country.name}-tab`}
                            key={index}
                        >
                            {country.data}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TopCountrySec

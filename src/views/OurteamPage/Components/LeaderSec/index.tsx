import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';


interface User {
    image: any;
    name: string;
    designation: string;
    linked_in_link: any;
}

const LeaderSec = () => {


    const [users, setUsers] = useState<User[]>([]);
    const isMountedRef = useIsMountedRef();


    const getBoardsData = useCallback(async () => {
        try {
            const response = await axios.get('api/website/ourteams/get');
            if (isMountedRef.current) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getBoardsData();
    }, [getBoardsData]);



    // const users = [
    //     {
    //         name: 'Pooja Gupta',
    //         jobTitle: 'Business Development Manager',
    //         imageUrl: '/images/icons/userImage.jpg',
    //         linkedinUrl: 'https://www.linkedin.com/pooja-gupta',
    //     },
    //     {
    //         name: 'Shiju Daniel',
    //         jobTitle: 'Marketing Manager',
    //         imageUrl: '/images/icons/userImage.jpg',
    //         linkedinUrl: 'https://www.linkedin.com/shiju-daniel',
    //     },
    //     {
    //         name: 'Ashish Gaidhane',
    //         jobTitle: 'Digital Administrator',
    //         imageUrl: '/images/icons/userImage.jpg',
    //         linkedinUrl: 'https://www.linkedin.com/ashish-gaidhane',
    //     },
    //     // Add more users as needed
    // ];

    return (
        <section className='bg-white py-5'>
            <div className="container">
                <h2 className='text-blue fw-bold'>Meet Our Leaders</h2>
                <p className="text-black">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil, dolor numquam nemo reiciendis quisquam, illo quibusdam suscipit deserunt quia eveniet? Velit quod voluptatem molestias odit quisquam deserunt, tempore animi quia, error assumenda debitis voluptate reiciendis aut suscipit tempora dolore, pariatur ad quo iusto corporis fugit facere obcaecati exercitationem unde. Quaerat voluptate vel beatae nulla architecto, quo alias facere, animi cumque ipsa veritatis aspernatur molestiae, saepe modi nisi ad ut doloremque. Delectus similique fugiat vitae possimus maxime omnis ducimus nostrum earum, rem alias facere, ratione minima recusandae quos voluptatem nesciunt. Architecto labore optio autem vitae exercitationem eius, voluptate aspernatur quas.
                </p>
                <h2 className='text-blue fw-bold pt-4 mb-3'>Founder, Chairman and Managing Director</h2>
                <div className="card p-3 mb-3 bg-skyBlue">
                    <div className="row">
                        <div className="col-md-4 col-lg-3 col-xl-3">
                            <div className='userSecImg mx-auto'>
                                <Image src='/images/icons/mansoorAli.jpeg' width={400} height={400} className='img-fluid rounded' alt='user-img' />
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9 col-xl-9 text-md-start text-center">
                            <h4 className='text-blue fw-bold pt-md-0 pt-2'>MANSOOR ALI</h4>
                            <p className="text-black">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi dolores aut libero aperiam ullam vero optio cum maxime fugit magni rerum consectetur, excepturi qui iste velit repudiandae nam! Ratione qui ea perspiciatis quia quaerat mollitia exercitationem porro sit eveniet accusantium obcaecati maxime, accusamus quo voluptate corrupti similique eum. Quam quo aut, mollitia, ipsum fuga ex quidem eum nisi praesentium natus magnam neque quae maiores dolores, veniam recusandae dolorum autem sunt cupiditate ratione minus voluptatibus iure fugit delectus. Numquam fuga illum odit magnam, quaerat nesciunt vero? Laborum quidem minus, ipsum recusandae dolores alias vitae. Aut veniam impedit nostrum accusantium reprehenderit incidunt.
                            </p>
                            <div className='text-end'>
                                {/* <i className='text-blue bi bi-linkedin fsize-1 zoom-effect'></i> */}
                                <a href="https://www.linkedin.com/in/mansoor-ali-73368029/" target="_blank" rel="noopener noreferrer">
                                    <i className='text-blue bi bi-linkedin fsize-1 zoom-effect'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='fw-bold text-blue pt-3 mb-3'>Management Team
                </h2>
                <div className="row">
                    {users.map((user, index) => (
                        <div key={index} className="col-md-4 col-10 mx-auto mb-3">
                            <div className="card p-3 bg-skyBlue">
                                <div className='userSec2Img mx-auto'>
                                    <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${user.image}`} width={400} height={400} className='img-fluid rounded' alt='user-img' />
                                </div>
                                <div className="card-body">
                                    <h4 className='fw-bold text-black'>{user.name}</h4>
                                    <h6 className='text-black'>{user.designation}</h6>
                                    <div className='text-end'>
                                        <a href={user.linked_in_link} target="_blank" rel="noopener noreferrer">
                                            <i className='text-blue bi bi-linkedin fsize-1 zoom-effect'></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LeaderSec;

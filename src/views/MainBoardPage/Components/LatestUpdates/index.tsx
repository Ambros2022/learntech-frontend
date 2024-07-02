import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import MainCarousel from 'src/@core/components/main-carousel';
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

interface Update {
    name: string;
    id: any;
    date?: string;
    meta_description?: string;
    created_at: string; // Assuming created_at is a string date
}

const LatestUpdateSec = () => {
    const [updates, setUpdates] = useState<Update[]>([]);
    const isMountedRef = useIsMountedRef();

    const getBoardsData = useCallback(async () => {
        try {
            const response = await axios.get('api/website/news/get');
            if (isMountedRef.current) {
                setUpdates(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending schoolboard:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getBoardsData();
    }, []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    

    return (
        <section className='bg-white py-3'>
            <div className="container">
                <h2 className='fw-bold text-blue text-center'>
                    Latest Updates on Boards
                </h2>
                <div className='py-3 position-relative boardCarosuel'>
                    <MainCarousel items={updates.map((update, index) => (
                        // <div className="card mx-md-3 mx-lg-3 mx-xl-3 mx-5" key={index}>
                        //     <div className="card-body cardBlogText">
                        //         <h6 className='fw-bold text-blue'>{update.name}</h6>
                        //         <p className='text-black mb-1'>{formatDate(update.created_at)}</p>
                        //         <p className='text-black'>
                        //             {update.name}
                        //         </p>
                        //         <Link href = {`/board/${update.id}/${update.name}`} className='btn viewMoreCollegeBtn'>Read More</Link>
                        //     </div>
                        // </div>
                        <div className="col-12 mb-1" style={{ margin: '0px 5px' }}  key={index}>
                        <div className="newsBlosCards">
                            <div className="mb-5 mx-lg-3 mx-0">
                                <div className="card h-100">
                                    <div className="card-body newsheight  cardBlogText">
                                        <Link href={`/news-1/${update.id}/${update.name}`}> 
                                        <h6 className='fw-bold text-blue'>{update.name}</h6>
                                        </Link>
                                    {/* <h6 className='fw-bold text-blue'>{update.name}</h6> */}
                                <p className='text-black mb-1'>{formatDate(update.created_at)}</p>
                                <p className='text-black'>
                                    {update.meta_description}
                                </p>
                                <Link href = {`/board/${update.id}/${update.name}`} className='btn viewMoreCollegeBtn'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))} />
                </div>
            </div>
        </section>
    );
};

export default LatestUpdateSec;

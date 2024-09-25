import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { format } from 'date-fns';


const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });

const ExperTraineeSec = () => {

    const [traineer, setTraineer] = useState<any>();
    const isMountedRef = useIsMountedRef();

    const getTraineer = useCallback(async () => {
        try {
            const response = await axios.get('api/website/counsellorteams/get');
            if (isMountedRef.current && response.data.status === 1) {
                setTraineer(response.data.data[0]);
            }
        } catch (error) {
            console.error('Failed to fetch organization page data:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getTraineer();
    }, [getTraineer]);

    if (!traineer) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    const TrainerCard = ({ traineer }: { traineer: { name: string; location: string; experience: string; description: string, image: string } }) => {
        return (
            <div className="card py-3 hover-card" style={{ border: '1px solid #274896' }}>
                <div className="row d-flex px-3">
                    <div className="col-4 mb-lg-0 mb-md-3 mb-0 text-center align-content-center">
                        <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${traineer.image}`} width={200} height={200} alt={`${traineer.name}-img`} className='img-fluid' style={{ borderRadius: '50%' }} />
                    </div>
                    <div className="col-8 align-content-center counsellorText">
                        <h5 className='text-blue'>{traineer.name}</h5>
                        <h6 className='fw-light'>{traineer.location}</h6>
                    </div>
                </div>
                <hr className='text-blue' />
                <div className='px-3'>
                    <h6 className='fw-light'>Trainer Since</h6>
                    <h6 className='fw-light'>{format(new Date(traineer.experience), 'dd-MMM-yyyy')}</h6>
                    <button className='btn mb-4 text-blue trainingBtn'>
                        <small>{traineer.description}</small>
                    </button><br />
                    <GlobalEnquiryForm buttonText={'View Profile'} className="applyNowButton btn" />
                </div>
            </div>
        );
    };

    return (
        <>
            {
                traineer && traineer.length !== 0 ? (
                    <section className='bg-light py-md-5 py-3'>
                        <div className="container">
                            <h2 className='text-center fw-bold text-blue'>
                                We have Expert Trainers to Meet Your CyberArk Training Needs
                            </h2>
                            <p className="text-black">
                                The instructor-led training is conducted by certified trainers with extensive expertise in the field. Participants will benefit from the instructor's vast knowledge, gaining valuable insights and practical skills essential for success in Access practices.
                            </p>
                            <div className='py-3'>
                                <div className="row d-flex flex-wrap">
                                    <div className="col-md-4">
                                        <TrainerCard traineer={traineer} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>) : ''
            }
        </>
    );
};

export default ExperTraineeSec;

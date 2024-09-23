import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import GlobalEnquiryForm for better performance
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });

const ExperTraineeSec = () => {
    const trainers = [
        {
            name: 'Kiran',
            location: 'Bengaluru, India',
            since: 'August 1, 2017',
            trainingType: 'CybeArk Training',
        },
        // Add more trainers here if needed
    ];

    // Define the TrainerCard inside the same component to keep it in a single file
    const TrainerCard = ({ trainer }: { trainer: { name: string; location: string; since: string; trainingType: string } }) => {
        return (
            <div className="card py-3 hover-card" style={{border:'1px solid #274896'}}>
                <div className="row d-flex">
                    <div className="col-4 text-center align-content-center">
                        <i className='bi bi-person fs-1 text-blue'></i>
                    </div>
                    <div className="col-8 align-content-center">
                        <h5 className='text-blue'>{trainer.name}</h5>
                        <h6 className='fw-light'>{trainer.location}</h6>
                    </div>
                </div>
                <hr className='text-blue'/>
                <div className='px-3'>
                    <h6 className='fw-light'>Trainer Since</h6>
                    <h6 className='fw-light'>{trainer.since}</h6>
                    <button className='btn mb-4 text-blue trainingBtn'>
                        <small>{trainer.trainingType}</small>
                    </button>
                    <GlobalEnquiryForm buttonText={'View Profile'} className="applyNowButton btn" />
                </div>
            </div>
        );
    };

    return (
        <>
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
                            {trainers.map((trainer, index) => (
                                <div className="col-md-3" key={index}>
                                    <TrainerCard trainer={trainer} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ExperTraineeSec;

import React from 'react';

const SchoolBannerSec = ({ data }) => {
    return (
        <>
            <section
                className='py-3 d-flex justify-content-center flex-column'
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner_image})`,
                    backgroundRepeat: 'no-repeat',
                    height: "400px",
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                }}
            >
                <h4 className='align-self-center text-center fw-bold p-3 text-white rounded'>Interested In this School ? Admission Now !</h4>
                <h2 className='align-self-center text-center mx-md-0 mx-5 text-white fw-bold p-3 bg-blue rounded'>{data.name}</h2>
            </section>
        </>
    );
}

export default SchoolBannerSec;

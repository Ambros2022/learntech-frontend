import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from 'next/image';

const OrganizationSection = () => {
    const [organizationPage, setOrganizationPage] = useState<any>();
    const isMountedRef = useIsMountedRef();

    const getOrganizationPageData = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['size'] = 1000;
            roleparams['categories'] = 'Exams';
            const response = await axios.get('api/website/organizationpage/get', { params: roleparams });
            if (isMountedRef.current && response.data.status === 1) {
                setOrganizationPage(response.data.data[0]);
            }
        } catch (error) {
            console.error('Failed to fetch organization page data:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getOrganizationPageData();
    }, [getOrganizationPageData]);

    if (!organizationPage) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            {organizationPage && organizationPage !== '' ? (
                <section className='bg-white py-3'>
                    <div className="container">
                        <h2 className='text-center fw-bold text-blue mb-3'>{organizationPage.title}</h2>
                        <p className='text-black' dangerouslySetInnerHTML={{ __html: organizationPage.content }}></p>
                        <div className="d-flex py-md-5 py-3 flex-wrap justify-content-center gap-3">
                            {
                                organizationPage.organizatiopagesteps.map((data) => (
                                    <div key={data.id} className='card rounded-0 p-3 organizationalCard'>
                                        <div className='text-center'>
                                            <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.icon}`} width={200} height={200} alt={`${data.name}-img`} className='img-fluid mb-3' />
                                            <i className='bi text-blue bi-chevron-right right-arrow-orgazinational'></i>
                                            <h5 className='text-blue'>{data.title}</h5>
                                            <p>{data.description}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            ) : ''}
        </>
    );
}

export default OrganizationSection;

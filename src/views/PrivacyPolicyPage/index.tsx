import React, { useCallback, useEffect, useState } from 'react';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import BannerSec from './Components/BannerSec'
import TermsText from './Components/TermsText'

const PrivacyPolicypage = () => {
    const router = useRouter()
    const isMountedRef = useIsMountedRef();
    const [pagedata, setPagedata] = useState<any>();

    const getPagedata = useCallback(async () => {
        try {
            const response = await axios.get('api/website/pagefindone/get/privacy-policy');
            if (isMountedRef.current) {

                setPagedata(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);



    useEffect(() => {
        getPagedata();

    }, []);
    return (
        <>
            <BannerSec />
            <TermsText data={pagedata}/>
        </>
    )
}

export default PrivacyPolicypage
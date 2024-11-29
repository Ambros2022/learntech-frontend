import React, { useCallback, useEffect, useState, ReactNode } from 'react';
import axios from 'src/configs/axios';

import { useRouter } from 'next/router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'

// ** Demo Imports
import Error404Page from 'src/views/Error404Page'

const Error404 = () => {
  const router = useRouter()
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>();

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get(`api/website/pagefindone/get${router.asPath}`);
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
    <Error404Page />
  )
}

Error404.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

export default Error404

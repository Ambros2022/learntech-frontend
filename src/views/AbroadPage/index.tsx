import React, { useCallback, useEffect, useState } from 'react';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import BannerSec from './Components/BannerSec'
import StudySec from './Components/StudySec'
import TopUniversity from './Components/TopUniversity'
import FaqSec from './Components/FaqSec'

function AbroadPage({ data }) {
  console.log(data);
  return (
    <>
      <BannerSec data={data} />
      <StudySec data={data} />
      <TopUniversity data={data} />
      {data && data?.abroadpagefaqs.length > 0 && <FaqSec data={data} />}
    </>
  )
}

export default AbroadPage

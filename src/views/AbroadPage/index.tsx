import React, { useCallback, useEffect, useState } from 'react';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import BannerSec from './Components/BannerSec'
import StudySec from './Components/StudySec'
import TopUniversity from './Components/TopUniversity'
import FaqSec from './Components/FaqSec'
import OrganizationSection from './Components/OrganizationalSec';
import ExperTraineeSec from './Components/ExpertTrainneSec';

function AbroadPage({ data }) {

  const formattedData = data && data?.abroadpagefaqs && data?.abroadpagefaqs.map((item) => ({
    "@type": "Question",
    "name": item.questions,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answers,
    },
  }));

  return (
    <>
      <Head>
      {formattedData?.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": formattedData,
            })}
          </script>
        )}
      </Head>
      <BannerSec data={data} />
      <StudySec data={data} />
      <OrganizationSection data={data} />
      <ExperTraineeSec data={data} />
      <TopUniversity data={data} />
      {data && data?.abroadpagefaqs.length > 0 && <FaqSec data={data} />}
    </>
  )
}

export default AbroadPage

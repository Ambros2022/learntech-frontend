import React, { useCallback, useEffect, useState } from 'react'
import BannerSec from './Components/BannerSec'
import MedicalSec from './Components/MedicalSec'
import TopCountrySec from './Components/TopCountrySec'
import FaqSec from '../EducationLoanPage/Components/FaqSec'
import ImportantSec from './Components/ImportantSec'
import ExpertSec from './Components/ExpertSec'
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useRouter } from 'next/router'

const MbbsAbroadPage = () => {
    const data = {
        abroadpagefaqs: [
            {
                questions: "What is the MBBS eligibility criteria?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            },
            {
                questions: "What is the MBBS course duration and fee?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            },
            {
                questions: "Name some of the best private colleges in Bangalore?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            },
            {
                questions: "How to get MBBS admission in Bangalore?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            },
            {
                questions: "Which are the top MBBS colleges in Bangalore?",
                answers: "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.</p>"
            }
        ]
    };
    const router = useRouter()
    const isMountedRef = useIsMountedRef();
    const [pagedata, setPagedata] = useState<any>();


    const getPagedata = useCallback(async () => {
        try {
            const response = await axios.get('api/website/pagefindone/get/mbbs-abroad');
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
            <title>{pagedata && pagedata?.meta_title ? pagedata?.meta_title : "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
            <meta name="description" content={pagedata && pagedata?.meta_description ? pagedata?.meta_description : "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad. Call us today!"} />
            <meta name="keywords" content={pagedata && pagedata?.meta_keyword ? pagedata?.meta_keyword : "Learntechweb"} />
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
            <BannerSec />
            <MedicalSec data={pagedata} />
            <TopCountrySec />
            <FaqSec data={data}/>
            <ImportantSec />
            <ExpertSec />
        </>
    )
}

export default MbbsAbroadPage
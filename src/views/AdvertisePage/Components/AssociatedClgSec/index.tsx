import React, { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios'
import dynamic from 'next/dynamic';
const MainCarousel = dynamic(() => import('src/@core/components/main-carousel'), { ssr: false });
const CollegeCard2 = dynamic(() => import('src/@core/components/college-card2'), { ssr: false });


const AssociatedClg = () => {
    const [colleges, setColleges] = useState<any[]>([]);

    const getcolleges = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10;
            roleparams['is_associated'] = 1;
            const response = await axios1.get('api/website/colleges/get', { params: roleparams });

            setColleges(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    console.log("colleges", colleges)

    useEffect(() => {

        getcolleges();

    }, [getcolleges]);
    return (
        <>
            <section className='FeaturedClgCon AssociatedClg bg-skyBlue'>
                <div className="container py-5 position-relative">
                    <h2 className='text-blue fw-bold text-center pb-5'>Our Associated Colleges and Universities</h2>
                    <MainCarousel items={colleges.map(college => (
                        <CollegeCard2 key={college.id} college={college} />
                    ))} />
                </div>
            </section>
        </>
    )
}

export default AssociatedClg

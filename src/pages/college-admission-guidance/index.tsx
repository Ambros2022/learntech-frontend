import React from 'react';
import { ReactNode } from 'react'
import CollegeAdmissionGuidancePage from 'src/views/CollegeAdmissionGuidancePage';
import dynamic from 'next/dynamic'
const BlankLayout = dynamic(() => import('src/@core/layouts/BlankLayout'))

const CollegeAdmissionGuidance = () => {
    return <CollegeAdmissionGuidancePage />;
};
CollegeAdmissionGuidance.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
CollegeAdmissionGuidance.guestGuard = true
export default CollegeAdmissionGuidance;

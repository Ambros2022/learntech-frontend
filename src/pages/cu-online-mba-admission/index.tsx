import React from 'react';
import { ReactNode } from 'react'
import CumbaPage from 'src/views/CumbaPage';// Adjust the import if needed
import dynamic from 'next/dynamic'
const BlankLayout = dynamic(() => import('src/@core/layouts/BlankLayout'))

const BamsCounsellingProcess = () => {
    return <CumbaPage />;
};
BamsCounsellingProcess.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
BamsCounsellingProcess.guestGuard = true
export default BamsCounsellingProcess;
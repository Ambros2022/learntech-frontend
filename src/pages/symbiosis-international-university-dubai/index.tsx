import React from 'react';
import { ReactNode } from 'react'
import SymbiosisDubaiPage from 'src/views/SymbiosisDubaiPage';
import dynamic from 'next/dynamic'
const BlankLayout = dynamic(() => import('src/@core/layouts/BlankLayout'))

const SymbiosisInternationalUniversityDubai = () => {
    return <SymbiosisDubaiPage />;
};
SymbiosisInternationalUniversityDubai.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
SymbiosisInternationalUniversityDubai.guestGuard = true
export default SymbiosisInternationalUniversityDubai;

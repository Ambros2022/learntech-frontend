import { Breadcrumb } from 'src/app/components/Breadcrumb'
import { GlobalEnquiryForm } from 'src/app/components/ClientWrappers'

const BannerSec = () => {
    return (
        <>
            <section className='scholarshipSec bg-blue'>
                <div className=' h-100 w-100 d-flex justify-content-center'>
                    <div className=' h-100 w-100 d-flex justify-content-center' style={{ top: '0px' }}>
                        <div className="align-content-center text-center">

                            <h1 className='fw-bold text-white mb-3 minhrighth1'>MBBS Abroad For Indian Students </h1>
                            <GlobalEnquiryForm className="btn btn-success" />

                        </div>
                    </div>
                </div>
            </section>

            <Breadcrumb items={[{ label: 'MBBS Abroad' }]} />
        </>

    )
}

export default BannerSec
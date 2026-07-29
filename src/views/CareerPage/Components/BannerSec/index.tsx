import { Breadcrumb } from 'src/app/components/Breadcrumb'
import ScrollToOpenings from './ScrollToOpenings'

export default function BannerSec() {
    return (
        <>
            <section
                className="careerSec"
                style={{ backgroundImage: 'url(/images/icons/Career_02.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'top center' }}
            >
                <div className="container d-flex justify-content-center align-content-center text-center h-100 flex-column">
                    <h1 className="fw-bold text-white">WE ARE HIRING</h1>
                    <h5 className="text-white mb-3">Come join one of the Best Educational Service Provider Firms as rated by ISO 9001:2008 Certified.</h5>
                    <div>
                        <ScrollToOpenings />
                    </div>
                </div>
            </section>
            <Breadcrumb items={[ { label: 'Career' }]} />
        </>
    )
}

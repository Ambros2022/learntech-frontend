import Image from "next/image";

const SchoolBanner = () => {
    return (
        <>
            <section className="schlBanner mb-5 pb-5 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12 position-relative w-100 h-100 mb-2">
                            <div className="schlBannerImg position-absolute"></div>
                            <Image src='/images/icons/filter-card.jpg' width={300} height={300} alt='College Card' />
                            <div className="schlBannerTxt text-center">
                                <h5 className="text-white mb-3 p-3  bg-gray">Interested in this School? Get Admission now!</h5>
                                <h2 className="text-white fw-bold mb-3 p-3 bg-gray">New Horizon Public School (NHPS)</h2>
                                <button className="btn rqBtnSchl">Request Call Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default SchoolBanner;
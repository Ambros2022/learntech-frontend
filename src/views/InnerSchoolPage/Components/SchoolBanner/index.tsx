import Image from "next/image";
import GlobalPopupEnquiry from "src/@core/components/popup/GlobalPopupEnquiry";
import EnquiryForm from "src/@core/components/popup/form";

const SchoolBanner = ({ data }) => {
    return (
        <>
            <section className="schlBanner pb-5 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12 position-relative w-100 h-100 mb-2">
                            <div className="schlBannerImg position-absolute"></div>
                            <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner_image}`} width={1500} height={1500} alt='College Card' className="img-fluid rounded" />
                            <div className="schlBannerTxt text-center">
                                <h5 className="text-white mb-3 p-3  bg-blur rounded">Interested in this School? Get Admission now!</h5>
                                <h2 className="text-white fw-bold mb-3 p-3 bg-blur rounded">{data.name}</h2>
                                <GlobalPopupEnquiry buttonText={'Request Call Back'} className={"btn rqBtnSchl"} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default SchoolBanner;
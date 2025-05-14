import React, { FC } from 'react';
import Image from 'next/image';
import Modal from 'react-bootstrap/Modal';
import EnquiryForm from 'src/@core/components/popup/form';


interface Props {
    className?: any;
    title?: any;
    pagename?: any;
    buttonText?: any;
    placeholder?: any;
}



const GlobalPopupEnquiry: FC<Props> = ({ className, title, pagename, buttonText, placeholder='', ...rest }) => {
    const [modalShow, setModalShow] = React.useState(false);
    function onChanges() {

        setModalShow(false);
    }

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal className="modal fade px-3" id="exampleModal"  {...props} >
                <div className="modal-content">
                    <div className="searchForm">
                        <h5 className="pb-3 fw-bold text-center text-blue">{props.title}</h5>
                        <EnquiryForm onChanges={onChanges} page={props.pagename} placeholder={placeholder} />
                    </div>
                </div>
            </Modal>
 
        );
    }

    return (
        <>

            {pagename && pagename == 'CourseList' ?
                <a onClick={() => setModalShow(true)} className={className ? className : 'active btn'} style={{ cursor: 'pointer' }}>
                    {buttonText ? buttonText : 'Apply Now'}
                </a>
                :
                <>
                    {
                        pagename == 'Brochure' ?
                    
                            <a onClick={() => setModalShow(true)} className="DownloadBrchrBtn" style={{ cursor: 'pointer' }}>
                                <img src="/images/icons/DownloadBrochure.webp" className='mb-md-0 my-3 mb-md-0 my-md-0' width={150} height={70} alt="download-brochure-icon" />

                            </a>
                            :
                            <a onClick={() => setModalShow(true)} className={className ? className : 'active btn'} style={{ cursor: 'pointer' }}>
                                {buttonText ? buttonText : 'Apply Now'}
                            </a>

                    }
                </>


            }




            <MyVerticallyCenteredModal
                title={title ? title : 'Let’s build a better future for you'}
                pagename={pagename ? pagename : 'no'}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default GlobalPopupEnquiry;
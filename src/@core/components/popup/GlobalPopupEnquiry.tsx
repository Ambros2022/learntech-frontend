'use client'
import React, { FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import EnquiryForm from 'src/@core/components/popup/form';
import Image from 'next/image';

interface Props {
    className?: any;
    title?: any;
    pagename?: any;
    buttonText?: any;
    placeholder?: any;
    collegeName?: any;
}

const GlobalPopupEnquiry: FC<Props> = ({ className, title, pagename, buttonText, placeholder = '', collegeName }) => {
    const [modalShow, setModalShow] = React.useState(false);

    const modalTitle = title || "Let's build a better future for you";

    return (
        <>
            {pagename === 'CourseList' ? (
                <a onClick={() => setModalShow(true)} className={className || 'active btn'} style={{ cursor: 'pointer' }}>
                    {buttonText || 'Apply Now'}
                </a>
            ) : pagename === 'Brochure' ? (
                <a onClick={() => setModalShow(true)} className="DownloadBrchrBtn" style={{ cursor: 'pointer' }}>
                    <Image
                        src="/images/icons/DownloadBrochure.webp"
                        alt="Download Brochure Icon"
                        width={150}
                        height={70}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </a>
            ) : (
                <a onClick={() => setModalShow(true)} className={className || 'active btn'} style={{ cursor: 'pointer' }}>
                    {buttonText || 'Apply Now'}
                </a>
            )}

            <Modal
                className="modal fade px-3"
                id="exampleModal"
                show={modalShow}
                onHide={() => setModalShow(false)}
                centered
            >
                <div className="modal-content">
                    <div className="searchForm">
                        <h5 className="pb-3 fw-bold text-center text-blue">{modalTitle}</h5>
                        <EnquiryForm
                            onChanges={() => setModalShow(false)}
                            page={pagename || 'no'}
                            placeholder={placeholder}
                            collegeName={collegeName}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default GlobalPopupEnquiry;

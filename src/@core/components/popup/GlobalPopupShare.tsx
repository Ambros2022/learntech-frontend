'use client'
import React, { FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import ShareButtons from 'src/components/ui/ShareButtons';
interface Props {
    className?: any;
    title?: any;
    pathname?: any;
    logourl?: any;
}


function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}

            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="share-this"
        >
            <Modal.Header closeButton className="close"></Modal.Header>
            <Modal.Body >
                <div className="backgroundwhite mt-30">
                    <h4>Share Our Blogs To</h4>
                    <ShareButtons
                        url={props.pathname}
                        title={props?.title}
                        variant="icons"
                        className="d-flex justify-content-around pt-3 gap-2 flex-wrap"
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}

const GlobalPopupShare: FC<Props> = ({  title, pathname, logourl }) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>

            <a onClick={() => setModalShow(true)} style={{ cursor: "pointer" }}>
                <span className='share-icon'>
                    <img src='/images/icons/icon-share.png' width={35} height={35} style={{
                        bottom: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.5)'
                    }} className='position-absolute img-fluid rounded p-1' alt='share-icon' />
                </span>
            </a>
            <MyVerticallyCenteredModal
                title={title ? title : 'Apply Now'}
                show={modalShow}
                pathname={pathname}
                logourl={logourl}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default GlobalPopupShare;
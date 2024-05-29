import React, { FC } from 'react';
// import './stylesglobalpopup.css';
import Modal from 'react-bootstrap/Modal';
import EnquiryForm from 'src/@core/components/popup/form';
// import CallNow from 'src/assets/img/call-now.svg';
// import GetAppIcon from '@material-ui/icons/GetApp';

interface Props {
    className?: any;
    title?: any;
    pagename?: any;
    buttonText?: any;

}



const GlobalPopupEnquiry: FC<Props> = ({ className, title, pagename,buttonText, ...rest }) => {
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
                        <EnquiryForm onChanges={onChanges} page={props.pagename} />
                    </div>
                </div>
            </Modal>
            // <Modal
            //     {...props}
            //     // size="lg"
            //     aria-labelledby="contained-modal-title-vcenter"
            //     centered
            //     id="enquiryformpopup"
            // >
            //     <Modal.Header closeButton className='close'>
            //         {/* <Modal.Title id="contained-modal-title-vcenter">

            //         </Modal.Title> */}
            //     </Modal.Header>
            //     <Modal.Body>
            //         <h4> {props.title == "Download Brochure" ? "ff" : ""}{props.title == "Submit" ? "Please fill in your details to receive your detailed rank prediction." : props.title}</h4>

            //         <div id="header-form" className="">
            //             <EnquiryForm onChanges={onChanges} page={props.pagename} />
            //         </div>
            //     </Modal.Body>
            //     {/* <Modal.Footer>
            //         <Button onClick={props.onHide}>Close</Button>
            //     </Modal.Footer> */}
            // </Modal>
        );
    }

    return (
        <>

            {/* {pagename && pagename == 'CourseList' ?
                <a onClick={() => setModalShow(true)} className="talk-to-expert btn">
                    <img src={CallNow} className="fcall" />
                    Talk to our Experts
                </a>
                :
                <>
                    {
                        pagename == 'Brochure' ?
                            <a onClick={() => setModalShow(true)} className={className ? className : 'active_bt'}>
                                <img src={require("src/assets/img/left_bt.svg")} alt="Download Brochure" />
                            </a>
                            :




                            <a onClick={() => setModalShow(true)} className={className ? className : 'active_bt'} style={{ cursor: 'pointer' }}>
                                {title ? title : 'Apply Now'}
                            </a>

                    }
               
            } */}

            <a onClick={() => setModalShow(true)} className={className ? className : 'active btn'} style={{ cursor: 'pointer' }}>
                {buttonText ? buttonText : 'Apply Now'}
            </a>



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
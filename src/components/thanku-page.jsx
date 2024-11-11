import React, { useState } from 'react';
import logo from "../assets/images/logo/logo-main.png"
import { FaRegSmile } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
const Thanku_Page = ({ show, setShow }) => {
    return (

        <>
            <Modal show={show} onHide={() => setShow(false)} centered className='login' >
                <Modal.Body>
                    <div className="row text-center bg-thanku">
                        <div className="col-12 my-4 ">
                            {/* <img src={logo} alt="" className="img-fluid" /> */}
                            <FaRegSmile size={100} className='text-heroc' />
                        </div>
                    </div>
                    <div className="row justify-content-center mt-2 ">
                        <div className="col-8 ">
                            <h5 className='fw-600 text-bluec text-center '>Thank you for reaching out!</h5>
                            <p className='fs-12 text-grayc text-center '>We'll get in touch with you soon.</p>

                        </div>
                    </div>

                </Modal.Body>
            </Modal>


        </>
    )
}

export default Thanku_Page;
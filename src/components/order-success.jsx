import React, { useState } from 'react';
import check from "../assets/images/others/check-circle-fill.png"
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
const Order_Success = ({ show, setShow }) => {
    return (

        <>
            <Modal show={show} onHide={() => setShow(false)} centered className='location login' size='sm' >
                <div >
                    <Modal.Body>
                        <div className="row text-center ">
                            <div className="col-12 mb-2 ">
                                <img src={check} alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="row justify-content-center ">
                            <div className="col-11 text-center">
                                <h6 className='fw-600 text-bluec  '>Order placed successfully</h6>
                                <p className='fs-10 text-grayc '>You successfully place an order, your order is confirmed . Wish you enjoy the food.</p>
                                <Link to="/order-and-history" className="text-pink  fw-600 text-decoration-none">KEEP BROWSING</Link>

                            </div>
                        </div>


                    </Modal.Body>
                </div>

            </Modal>



        </>
    )
}

export default Order_Success;
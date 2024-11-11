import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo/logo-main.png"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Otp_Validation from './otp';
import Thanku_Page from './thanku-page';
import { errorToast,  Calls } from '../utils/call';
import { api } from '../urls';
import { toast } from 'react-toastify';

const Add_Restaurant = ({ show, setShow }) => {
    const [thankuPopup, setThankuPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const emailHandler = (e) => {
        let value = e.target.value?.trim()
        if (value?.length < 50) {
            setEmail(value)
        }
    }
    const phoneNoHandler = (e) => {
        let value = e.target.value?.trim()
        if (value.length < 11) {
            setPhoneNo(value)
        }
    }
    const submitForm = async (e) => {
        e.preventDefault()
        if (!email) {
            toast.error("Email is required..!")
        }
        if (!phoneNo) {
            toast.error("Phone Number is required..!")
        }
        let res = await Calls.requestPost(api.sendMailToSuperAdmin, { email, phoneNo })
        if (res.data) {
            setThankuPopup(true)
            setEmail("")
            setPhoneNo("")
            setShow(false)
        } else {
            errorToast(res)
        }


    }


    return (
        <>


            <Modal show={show} onHide={() => setShow(false)} centered className='login' >

                <Modal.Body>

                    <div className="row justify-content-center">
                        <div className="col-6 ">
                            <img src={logo} alt="" className="img-fluid" />

                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8 ">
                            <h5 className='fw-600 text-bluec text-center py-4'>Get started with Bhukkads!</h5>
                            {/* <p className='fs-12 text-grayc text-center'>Enter your phone number</p> */}
                            <form onSubmit={submitForm}>
                                <div className="form-group">
                                    <input type="text" className='form-control ps-3' name='email' value={email} onChange={emailHandler} placeholder='Your Email ID' />

                                </div>
                                <div className="form-group mt-3 phone-group">
                                    <input type="text" className='form-control ps-3' name='phoneNo' value={phoneNo} onChange={phoneNoHandler} placeholder='Your Phone Number' />
                                </div>
                                <div className="row mt-4 justify-content-center">
                                    <div className="col-6">
                                        <button type='submit' className="btn btn-custom w-100" >Submit</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>


                </Modal.Body>


            </Modal>
            <Thanku_Page show={thankuPopup} setShow={setThankuPopup} />
        </>
    );
}

export default Add_Restaurant;
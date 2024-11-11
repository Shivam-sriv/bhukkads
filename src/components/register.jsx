import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import gif from "../assets/images/others/onboarding.gif"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Otp_Validation from './otp';
import { errorToast, Calls, successToast } from '../utils/call';
import { api } from '../urls';
const Register = ({ show, setShow }) => {
    const [otpPopUp, setOtpPopUp] = useState(false)
    const [phoneNo, setPhoneNo] = useState("")
    const [name, setName] = useState("")

    const handleClose = () => setShow(false);


    const openOtpPopUp = async () => {
        const res = await Calls.requestPost(api.register, { phoneNo, name, })
        if (res?.data) {
            console.log("ee", res.data);
            setOtpPopUp(true)
            setShow(false)
        } else {
            console.log("res", res);
            errorToast(res)
        }
    }

    const phoneHandler = (e) => {
        if (e.target.value?.length < 11)
            setPhoneNo(e.target.value?.trim())
    }
    const nameHandler = (e) => {
        let value = e.target.value
        if (value?.length < 100) {
            setName(value)
        }
    }
    const varifyOtp = async (otp) => {
        console.log("otp", otp);
        const res = await Calls.requestPost(api.verifyRegister, { otp, phoneNo })
        if (res.data) {
            successToast(res)
            localStorage.setItem("token", res.data?.token)
            localStorage.setItem("user", JSON.stringify(res.data?.data))
        } else {
            errorToast(res)
        }
    }


    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} centered className='login' >
                <div className={""}>
                    <Modal.Body>

                        <div className="row justify-content-center">
                            <div className="col-6 ">
                                <img src={gif} alt="" className="img-fluid" />

                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-8 ">
                                <h5 className='fw-600 text-bluec text-center'>Get started with Bhukkads!</h5>

                                {/* <p className='fs-12 text-grayc text-center'>Enter your phone number</p> */}
                                <form>
                                    <div className="form-group">
                                        <input type="text" className='form-control ps-3' placeholder='Your Name' value={name} onChange={nameHandler} />
                                    </div>
                                    <div className="form-group mt-3 phone-group">
                                        <input type="text" className='form-control ps-3' placeholder='Phone Number' value={phoneNo}
                                            onChange={phoneHandler} />


                                    </div>

                                </form>
                            </div>

                        </div>

                        <div className="row mt-4 justify-content-center">
                            <div className="col-6">
                                <div className="btn btn-custom w-100" onClick={openOtpPopUp}>Next</div>

                                <Link to="/confirm-order" className="btn text-bluec skip-btn w-100 mt-4" onClick={handleClose}>Skip</Link>
                            </div>


                        </div>
                    </Modal.Body>
                </div>

            </Modal>
            <Otp_Validation show={otpPopUp} setShow={setOtpPopUp} phoneNo={phoneNo} />
        </>
    );
}

export default Register;
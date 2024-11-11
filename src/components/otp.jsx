import React, { useState, useContext, useEffect } from 'react';
import logo from "../assets/images/logo/logo-main.png"
import { Link } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { Modal } from 'react-bootstrap';
import { UserContext } from '../provider-data/UserData';
import {successToast,Calls } from '../utils/call';
import { api } from '../urls';
import { CartContext } from '../provider-data/CartCount';
const Otp_Validation = ({ show, setShow, phoneNo, isLogging = false }) => {
    const { varifyOtp, loginUser,  } = useContext(UserContext)
    const {fetchCartData} = useContext(CartContext)
    const [otp, setOtp] = useState('');

    const handleClose = () => setShow(false);
 
    const submitOtp =async (e) => {
        e.preventDefault()
        if (isLogging) {
            let data =await loginUser(otp, phoneNo);
            console.log("data",data);
            if (data) {
                setShow(false)
                callCartApi()
            }
        } else {
            let data =await varifyOtp(otp, phoneNo);
            if (data) {
                setShow(false)
                callCartApi()
            }
        }

    }

    const callCartApi = () => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if(cart){
            Calls.requestGet(api.deleteUserCart).then((res) => {
                if (res.data) {
                    Calls.requestPost(api.addInCart, cart).then((res) => {
                    if (res.data) {
                    //   successToast(res)
                    fetchCartData()
                    }
                  })
                }
              })
        }
      
      }
    return (

        <>
            <Modal show={show} onHide={() => setShow(false)} centered >

                <div className="row justify-content-center">
                    <div className="col-6 my-4">
                        <img src={logo} alt="" className="img-fluid" />

                    </div>
                </div>
                <form className="my-4" onSubmit={submitOtp}>
                    <div className="row justify-content-center mt-2 ">
                        <div className="col-8 ">
                            <h5 className='fw-600 text-bluec text-center'>Verify phone number!</h5>
                            <p className='fs-12 text-grayc text-center'>We have just sent a code to +91{phoneNo}.</p>
                            <div className="form-group otp-input">
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />

                            </div>
                            <div className="form-group mt-3 phone-group">


                            </div>


                        </div>
                    </div>

                    <div className="row mt-4 justify-content-center">
                        <div className="col-6">
                            <button type='submit' className="btn btn-custom w-100" >Next</button >

                            {/* <Link to="" className="btn text-bluec skip-btn w-100 mt-4">Send again</Link> */}
                        </div>
                        <div className="col-12 text-center my-3">
                            <p className="fs-12 mb-0">By signing up you agree to</p>
                            <Link to='/term-and-conditions' className="fs-12 text-pink"> our terms of service and privacy policy.</Link>
                        </div>
                    </div>
                </form>

            </Modal>


        </>
    )
}

export default Otp_Validation;
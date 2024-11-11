import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import gif from "../assets/images/others/onboarding.gif"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Otp_Validation from './otp';
import Register from './register';
import { UserContext } from '../provider-data/UserData';
import { errorToast, Calls, successToast } from '../utils/call';
import { api } from '../urls';
import { toast } from 'react-toastify';

const Login = ({ show, setShow }) => {
    const {loginUser}  = useContext(UserContext)
    const [otpPopUp, setOtpPopUp] = useState(false);
    const [Login, setLogin] = useState("d-block");
    const [registerPopUp, setRegisterPopUp] = useState(false);
    const [phoneNo,setPhoneNo] = useState("")
    // const Otppage = () => {
    //     setLogin("d-none")
    // }
    const handleClose = () => {
        setShow(false);
    }

    const openRegister = () => {
        setRegisterPopUp(true)
        setShow(false)
    }
    const phoneHandler = (e) => {
        let value = e.target.value.trim()
        if(!isNaN(value) && value.length<11){
            setPhoneNo(value)
        }
    }
    
    const sendOtpForLogin =async (e)=>{
        e.preventDefault()
        if(!phoneNo){
            toast.error("Phone number is required..!")
             return
         }
        const res =await  Calls.requestPost(api.login,{phoneNo})
        if(res.data){
           successToast(res)
           setShow(false)
           setOtpPopUp(true)
        }else{
           errorToast(res)
        }
    }

    return (
        <>


            <Modal show={show} onHide={() => setShow(false)} centered className='login' >
                <div className={` ${Login}`}>
                    <Modal.Body>

                        <div className="row justify-content-center">
                            <div className="col-6 ">
                                <img src={gif} alt="" className="img-fluid" />

                            </div>
                        </div>
                                <form onSubmit={sendOtpForLogin}>
                        <div className="row justify-content-center">
                            <div className="col-md-8 ">
                                <h5 className='fw-600 text-bluec text-center'>Get started with Bhukkads!</h5>

                                {/* <p className='fs-12 text-grayc text-center'>Enter your phone number</p> */}
                                    {/* <div className="form-group">
                                        <input type="text" className='form-control ps-3' placeholder='Your Name' />
                                    </div> */}
                                    <div className="form-group mt-3 phone-group">
                                        <input type="text" className='form-control ps-3' placeholder='Phone Number' value={phoneNo} onChange={phoneHandler} />




                                    </div>

                                
                               
                            </div>

                        </div>

                        <div className="row mt-4 justify-content-center">
                            <div className="col-6">
                                <button className="btn btn-custom w-100" type="submit" >Next</button>

                                <Link to="/" className="btn text-bluec skip-btn w-100 mt-4" onClick={handleClose}>Skip</Link>
                            </div>
                            <div className="col-md-8 mt-3">
                                <p  className='text-center'>New to Bhukkads? <Link to="" className='text-pink regis'  onClick={openRegister}>Create account</Link></p>
                            </div>
                        </div>
                        </form>
                    </Modal.Body>
                </div>
               
            </Modal>
            <Register setShow={setRegisterPopUp} show={registerPopUp} />
            <Otp_Validation show={otpPopUp} setShow={setOtpPopUp} phoneNo={phoneNo} isLogging={true}/>
        </>
    );
}

export default Login;
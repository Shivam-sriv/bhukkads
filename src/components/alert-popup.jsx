import React, { useState, useContext } from 'react';
import logo from "../assets/images/logo/logo-main.png"
import { Link } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { errorToast, Calls } from '../utils/call';
import { api } from '../urls';
const AlertPopup = ({ show, setShow,singleCartData,callCartApi,setCartList}) => {
   

    const replaceCart =async ()=>{
        const token = localStorage.getItem("token")
        if(token){
            const res =await Calls.requestGet(api.deleteUserCart)
            if(res.data){
                callCartApi(singleCartData)
                setShow(false)
            }else{
                errorToast(res)
            }
        }else{
            localStorage.removeItem("cart")
            localStorage.setItem("cart",JSON.stringify(singleCartData))
            setCartList({...singleCartData})
            setShow(false)
        }
      
    }
  
    return (

        <>
            <Modal show={show} onHide={() => setShow(false)} centered >

                <div className="row justify-content-center">
                    <div className="col-6 my-4">
                        <img src={logo} alt="" className="img-fluid" />

                    </div>
                </div>        <div className="row justify-content-center mt-2 ">
                        <div className="col-10 ">
                            <h5 className='fw-600 text-bluec text-center'>Are you sure?</h5>
                            <p className='fs-14 text-grayc text-center'>Replace your cart because this dish from diffrent Restaurant</p>

                        </div>
                    </div>

                    <div className="row mt-4 justify-content-center">
                        <div className="col-12">
                            <div className="d-flex mb-4 justify-content-around">
                            <button  className="btn btn-custom w-25" onClick={()=>setShow(false)} >Cancel</button >

                            <button to="" className="btn text-bluec skip-btn  w-25" onClick={replaceCart}>Replace</button>
                            </div>
                        </div>
                   
                    </div>
            

            </Modal>


        </>
    )
}

export default AlertPopup;
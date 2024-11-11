import React, { useState, createContext } from 'react';
import { errorToast, Calls, successToast } from '../utils/call';
import { api } from '../urls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import MyContext from './MyContext';
const UserContext = createContext()
const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [globalInfo, setGlobalInfo] = useState({});

    const varifyOtp = async (otp, phoneNo) => {
        const res = await Calls.requestPost(api.verifyRegister, { otp, phoneNo })
        if (res.data) {
            successToast(res)
            localStorage.setItem("token", res.data?.token)
            localStorage.setItem("user", JSON.stringify(res.data?.data))
            setGlobalInfo(res.data?.data)
            return true
        } else {
            errorToast(res)
            return false
        }
    }
    const logoutUser = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setGlobalInfo({})
        navigate("/")
      }

      const loginUser =async(otp,phoneNo)=>{
        console.log("ssssssssssss");
        if(!phoneNo){
           toast.error("Phone number is required..!")
            return
        }
       const res =await  Calls.requestPost(api.verifyLogin,{otp,phoneNo})
       if(res.data){
          successToast(res)
          localStorage.setItem("token", res.data?.token)
          localStorage.setItem("user", JSON.stringify(res.data?.data))
          setGlobalInfo(res.data?.data)
          return res.data?.data
       }else{
          errorToast(res)
          return false
       }
      }
    return (
        <UserContext.Provider value={{ globalInfo, setGlobalInfo, varifyOtp,logoutUser,loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
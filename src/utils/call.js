import axios from "axios"
import { baseUrl } from "../urls"
import {  toast } from 'react-toastify';

export class Calls {

  static loader = ()=>{}; 

  static async requestPost(api,body){
    const token= localStorage.getItem("token");
    const headers = {
        headers:
          { Authorization: `Bearer ${token}` }
      };
    
      try {
        Calls.loader(true)
        const res = await axios.post(baseUrl + api, body, headers);
        Calls.loader(false)
        return { error: null, data: res.data };
      } catch (error) {
        Calls.loader(false)
        return { error, data: null };
      }
  }

  static async requestGet(api) {
    const token= localStorage.getItem("token");
    const headers = { headers:
          { Authorization: `Bearer ${token}` }
      };
      try {
        Calls.loader(true)
        const res = await axios.get(baseUrl + api, headers);
        Calls.loader(false)
        return { error: null, data: res.data };
      } catch (error) {
        Calls.loader(false)
        return { error, data: null };
      }
  }

}


export const  errorToast = (error)=>{
    toast.error(error?.error.response?.data?.message)
}
export const successToast = (res) =>{
    toast.success(res.data?.message)
}


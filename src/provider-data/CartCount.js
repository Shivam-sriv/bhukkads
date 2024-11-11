import React,{createContext,useState} from "react";
import {Calls } from "../utils/call";
import { api } from "../urls";

const CartContext = createContext()

 const CartProvider = ({children})=>{
  const [cartList,setCartList] = useState({})
     
  const fetchCartData = () => {
  const token = localStorage.getItem("token")
  if(token){
   Calls.requestGet(api.getCartDetails).then((res) => {
      if (res.data) {
        res.data?.data?.dishes.forEach((el) => {
          el["id"] = el.dish;
        });
        setCartList(res.data.data);
      } else {
        setCartList({});
      }
    });
  }else{
    setCartList(JSON.parse(localStorage.getItem("cart")));
  }
   
  };
  
  return(
    <CartContext.Provider value={{cartList,fetchCartData,setCartList}}>
      {children}
    </CartContext.Provider>
  )
}

export {CartContext,CartProvider}
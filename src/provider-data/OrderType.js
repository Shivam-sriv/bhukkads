import React,{useState,createContext} from "react";

const OrderTypeContext = createContext()

 const TypeProvider = ({children})=>{
    const [typeOfOrder,setTypeOfOrder] = useState("PRE_ORDER")

    const handleTypeOfOrder = (type)=>{
      console.log("type",type);
      
      setTypeOfOrder(type)
    }
    return (
      <OrderTypeContext.Provider value={{typeOfOrder,setTypeOfOrder,handleTypeOfOrder}}>
        {children}
      </OrderTypeContext.Provider>
    )
}
export {OrderTypeContext,TypeProvider}
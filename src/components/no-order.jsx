import React from "react";
import noorder from "../assets/images/others/noorder.webp";
const No_Order=()=>
{

    return(
        <>
        <div className="py-4">
        <div className="text-center text-danger"><img src={noorder} height={200} width={200} alt="no order img"/></div>     
        <h5 className="fw-600 mt-4 text-pink">NO ORDER FOUND</h5>
        </div>
        </>
    )
}
export default No_Order
import React from "react";
import { Watch } from 'react-loader-spinner'


const Loader = ({data}) =>{
  return (
    <>
    <style>
      {`
      
.cover-spin svg
{
  position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform: -webkit-translate(-50%, -50%);
    transform: -moz-translate(-50%, -50%);
    transform: -ms-translate(-50%, -50%);
}
      
      `}
    </style>
  <Watch
      visible={data}
      height="50"
      width="50"
      radius="48"
      color="#6409BC"
    
      ariaLabel="watch-loading"
      wrapperStyle={{}}
      wrapperClass="cover-spin"
      />
      
      </> 
      
      )
  
}

export default Loader
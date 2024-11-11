import {io} from 'socket.io-client'
 const socket = io("https://bhukkadmainbackend.bhukkads.in/",{autoConnect:false})

export const connectFromSocket = (fetchOrders)=>{
  let token = localStorage.getItem("token")
  socket.connect()
  socket.on("connect",()=>{
    socket.emit("register",token)
    socket.on("ORDER_CHANGES",(data)=>{
       console.log("dattttt",data);
       fetchOrders()
      //  if(orderList?.length > 0){
      //   const isAvailable =  orderList.findIndex((item)=> item._id===data._id )
      //   if(isAvailable!==-1){
      //    orderList.splice(isAvailable,1,data)
      //   }
      //   console.log("orderrr",orderList);
        
      //  setOrderList([...orderList])
      //  }
 
    })
    })
}

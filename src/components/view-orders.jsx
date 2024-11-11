import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import pi1 from "../assets/images/items/1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { DisplayRazorpayForDinIn } from "../payament";
import { FaBell } from "react-icons/fa";
import { errorToast, Calls, successToast } from "../utils/call";
import { api } from "../urls";
const View_Orders = ({ show, setShow, dishList }) => {
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const callWaiter = async () => {
    const res = await Calls.requestPost(api.callTheWaiter, { orderID: dishList?._id });
    if (res.data) {
      successToast(res);
    } else {
      errorToast(res);
    }
  };



  return (
    <>
      {show && (
        <Modal
          show={show}
          onHide={()=>setShow(false)}
          centered
          className="animate__animated animate__fadeInUp view-orders"
          scrollable
        >
          <Modal.Header  className="bg-pink justify-content-center" closeButton>
            <Modal.Title className="fs-5 text-white ">View Orders</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-lightc">
            <div className="container">
              {dishList.items.length > 0
                ? dishList.items.map((item) => {
                    return (
                      <div className="card-vieworder mt-3 mb-3">
                        <div className="row b-dishes py-3 px-2">
                          {/* <div className="col-3">
                                        <img
                                            src={pi1}
                                            alt=""
                                            className="img-fluid dish-img"
                                        />
                                    </div> */}
                          <div className="col-12 align-self-center ">
                            <h6 class="text-pink fw-500 ps-4">{item.dishName}</h6>
                            <div className="d-flex  justify-content-around">
                              <div className=" text-black  align-self-center fw-600">
                                <span>Price :</span> ₹ {item.price}
                              </div>
                              {dishList.offer ? (
                                <>
                                  {" "}
                                  <div className="price text-black  align-self-center fw-600">
                                    <span>Offer :</span> ₹ {dishList.offer}
                                  </div>
                                  <div className=" text-black  align-self-center fw-600">
                                    <span>Discounted Price :</span> ₹{" "}
                                    {dishList.discountedAmount}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}

                              <div className="quant ms-3">
                                Quantity : {item.quantity}
                              </div>
                              <div className=" text-black  align-self-center fw-600">
                                <span>Total :</span> ₹ {item.totalPrice}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : "no data"}
              {dishList?.orderType === "DINING" && (
                <div className="row text-end">
                  <div className="col-12">
                  <Link
                  to={`/restaurant?id=${dishList?.restaurant?._id}&tableno=${dishList?.tableNo}`}
                  className="add-btn mt-3 py-1"
                >
                  Add more +
                </Link>
                  </div>
                </div>
                
              )}
              <div className="card-vieworder mt-3">
                <div className="row b-dishes py-3 px-2">
                  <div className="col-12">
                    <div className="row  justify-content-center px-2 b-dishes py-3 mx-4">
                      <div className="col-6">
                        <p className="text-bluec mb-0 fs-14">Total </p>
                      </div>
                      <div className="col-4">
                        <p className="text-black mb-0 fs-14 price ">
                          ₹ {dishList.cartTotal}
                        </p>
                      </div>
                    </div>
                    <div className="row  justify-content-center px-2 b-dishes py-3 mx-4">
                      <div className="col-6">
                        <p className="text-bluec mb-0 fs-14">
                          Tax and Charges{" "}
                        </p>
                      </div>
                      <div className="col-4">
                        <p className="text-black mb-0 fs-14 price ">
                          ₹ {dishList.taxAndCharges}
                        </p>
                      </div>
                    </div>
                    <div className="row  justify-content-center px-2 b-dishes py-3 mx-4">
                      <div className="col-6">
                        <p className="text-bluec mb-0 fs-14">
                          <b>Final Total</b>{" "}
                        </p>
                      </div>
                      <div className="col-4 ">
                        <p className="text-black mb-0 fs-14 price ">
                          ₹ {dishList?.finalAmount?.toFixed(2)} 
                        </p>
                      </div>
                    </div>
                    {dishList?.orderType === "DINING" && (
                      <>
                      <div className="d-flex justify-content-center">
                       
                        <button
                          disabled={
                            dishList?.orderStatus === "completed" ? false : true
                          }
                          title="Pay after order completed"
                          className={`paymode payamentMode py-1 bg-pink text-white my-3 ${dishList?.orderStatus === "completed" ? "" :"disable-btn"}`}
                          onClick={() =>
                            DisplayRazorpayForDinIn(
                              navigate,
                              dishList?.restaurant?._id,
                              dishList?._id
                            )
                          }
                        >
                          Pay Now
                        </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
             
            </div>
          </Modal.Body>
          <Modal.Footer className="d-block">
          {/* <div
                className="row justify-content-start pt-1"
                onClick={callWaiter}
              >
                <div className="col-lg-6 col-8">
                  
                </div> 
              </div>*/}
             <div className="d-flex justify-content-center">
              <div className="btn btn-custom w-50" onClick={callWaiter}>
                    <span className="me-3">
                      <FaBell size={20} />
                    </span>
                    Call a waiter
                  </div>
              
            {/* <Button className="btn btn-custom w-25 ms-4" onClick={handleClose}>
              Ok
            </Button> */}
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default View_Orders;

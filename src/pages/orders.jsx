import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import noorder from "../assets/images/others/noorder.webp"
import pi2 from "../assets/images/items/2.jpg";
import pi3 from "../assets/images/items/3.jpg";
import plus from "../assets/images/restaurant/add-circle.png";
import minus from "../assets/images/restaurant/minus-circle.png";
import { FaBell } from "react-icons/fa";
import View_Orders from "../components/view-orders";
import {
errorToast,
Calls,
successToast,
} from "../utils/call";
import { api } from "../urls";
import { getDateAndTime } from "../utils/dates";
import { ORDERTYPES } from "../utils/orderTypes";
import RestaurantRating from "../components/rating";
import { connectFromSocket } from "../socket";
import No_Order from "../components/no-order";
import { CartContext } from "../provider-data/CartCount";
const Orders = () => {
const { fetchCartData } = useContext(CartContext)
const [viewodersShow, setViewordersShow] = useState(false);
const [orderList, setOrderList] = useState([]);
const [dishList, setDishList] = useState([]);
const [historyList, setHistoryList] = useState([]);
const [isRating, setIsRating] = useState(false);
const [ratingData, setRatingData] = useState(null);
useEffect(() => {
let token = localStorage.getItem("token")
if (token) {
fetchOrders();
fetchCartData()
fetchHistory();
connectFromSocket(fetchOrders);
}
}, []);
const fetchOrders = async () => {
const res = await Calls.requestGet(api.getOrdersByUser);
if (res) {
setOrderList(res?.data?.data);
} else {
setOrderList([]);
}
};
const fetchHistory = async () => {
const res = await Calls.requestGet(api.getOrdersHistoryByUser);
if (res) {
setHistoryList(res?.data?.data);
} else {
setHistoryList([]);
}
};
const showDishList = (list) => {
setDishList(list);
setViewordersShow(true);
};
const openRatingPopup = (data) => {
setIsRating(true);
setRatingData(data);
};
const cancelOrder = async (orderId) => {
const res = await Calls.requestPost(api.cancelTheOrder, { orderId });
if (res?.data) {
successToast(res);
} else {
errorToast(res);
}
};
return (
<>
<nav aria-label="breadcrumb " className="mt-2 mb-5 ps-2">
  <ol className="breadcrumb">
    <li className="breadcrumb-item fs-12">
      <Link to="/" className="text-grayc text-decoration-none">
      Home
      </Link>
    </li>
    <li
      className="breadcrumb-item active text-black fs-12"
      aria-current="page"
      >
      Order and History
    </li>
  </ol>
</nav>
<section className="my-5 orders-history">
  <div className="container-fluid">
    <div className="row justify-content-center px-md-4">
      <div className="col-md-12 col-lg-6">
        <div className="card-order">
          <Tabs
            defaultActiveKey="orders"
            id="fill-tab-example"
            className="mb-3"
            fill
            >
            <Tab eventKey="orders" title="Orders">
              {orderList?.length > 0 ? (
              orderList?.map((item) => {
              return (
              <div className="section1">
                <div className="time-mode d-md-flex d-block  justify-content-around b-dishes mx-4 py-3">
                  <p className="text-bluec fw-600  mb-0">
                    {ORDERTYPES[item?.orderType]}
                  </p>
                  <p className="order-st   mb-0 bg-success text-sm-center">
                    ORDER {item.orderStatus.toUpperCase()}
                  </p>
                  <p className="text-successc fs-14 align-middle pt-1 mb-0">
                    {item.orderType === "PRE_ORDER"
                    ? item?.slot.startTime +
                    " to " +
                    item?.slot?.endTime
                    : item.orderType === "DINING" && 
                  <p className="text-bluec fw-600  mb-0">
                    {item.tableNo && "Table No : " + item.tableNo}
                  </p>
                  }
                  </p>
                  <p className="text-grayc fs-14 pt-1  mb-0">
                    {getDateAndTime(item.createdAt).formattedDate}
                  </p>
                </div>
                <div className="row justify-content-center">
                  <div className="col-11 ">
                    <div className="row b-dishes py-3">
                      <div className="col-md-3 px-0">
                        <img
                          src={item.restaurant?.heroImage}
                          alt=""
                          className="img-fluid dish-img"
                          />
                      </div>
                      <div className="col-md-9 align-self-center mt-3 mt-md-0">
                        <div className="d-flex justify-content-between">
                          <div className="text-grayc fs-12">
                            Order Id:  {item?.orderNumber}
                          </div>
                          <h6 class="text-bluec fw-500 mb-0">
                            {item.restaurant.name}
                          </h6>
                        </div>
                        <div className="text-grayc fs-12">
                          {item.restaurant.address}
                        </div>
                        <div className="d-flex my-2">
                          <div className="price text-black me-2 align-self-center fs-6">
                            ₹ {item.finalAmount?.toFixed(2)}
                          </div>
                          {item.paymentStatus === "pending" ?
                          <div className="text-warning fs-6 align-self-center ">
                            {item.paymentStatus[0].toUpperCase() +
                            item.paymentStatus.slice(1)}
                          </div>
                          : 
                          <div className="text-success fs-6 align-self-center ">
                            {item.paymentStatus[0].toUpperCase() +
                            item.paymentStatus.slice(1)}
                          </div>
                          }
                          <div className="text-grayc fs-6 align-self-center ms-2">
                            {item.items.length} items
                          </div>
                          <br />
                        </div>
                        <div className="row mt-3">
                          <div className="col-lg-4 col-6">
                            <button
                              onClick={() => cancelOrder(item?._id)}
                            className="btn text-bluec skip-btn w-100 "
                            >
                            Cancel
                            </button>
                          </div>
                          <div className="col-lg-4 col-6 align-self-center">
                            <Link
                              className="btn btn-custom w-100 py-1"
                              onClick={() =>
                            showDishList(item)}
                            >
                            View order
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
              })
              ) : (
              <div className="row justify-content-center">
                <div className="col-6 text-center">
                  <No_Order />
                </div>
              </div>
              )}
            </Tab>
            <Tab eventKey="history" title=" History">
              {historyList?.length > 0 ? (
              historyList?.map((item) => {
              return (
              <div className="section1">
                <div className="time-mode d-md-flex d-block justify-content-around b-dishes mx-4 py-3">
                  <p className="text-bluec fw-600  mb-0">
                    {" "}
                    {ORDERTYPES[item.orderType]}
                  </p>
                  {item?.orderStatus === "cancelled" && (
                  <p className="order-st   mb-0 bg-pink text-sm-center">
                    Cancelled
                  </p>
                  )}
                  {item?.orderStatus === "completed" && (
                  <p className="order-st   mb-0 bg-success text-sm-center">
                    Completed
                  </p>
                  )}
                  {/* 
                  <p className="text-grayc fs-14 pt-1  mb-0">
                    {item.orderType === "PRE_ORDER"
                    ? getDateAndTime(item.startTime)
                    .formattedTime +
                    " to " +
                    getDateAndTime(item.endTime).formattedTime
                    : ""}
                  </p>
                  */}
                  <p className="text-grayc fs-14 pt-1  mb-0">
                    {getDateAndTime(item.createdAt).formattedDate}
                  </p>
                </div>
                <div className="row justify-content-center">
                  <div className="col-11 ">
                    <div className="row b-dishes py-3">
                      <div className="col-md-3 px-0">
                        <img
                          src={item.restaurant?.heroImage}
                          alt=""
                          className="img-fluid dish-img"
                          />
                      </div>
                      <div className="col-md-9 align-self-center mt-3 mt-md-0">
                        <div className="d-flex justify-content-between">
                          <div className="text-grayc fs-12">
                            Order Id:  {item?.orderNumber}
                          </div>
                          <h6 class="text-bluec fw-500 mb-0">
                            {" "}
                            {item.restaurant.name}
                          </h6>
                        </div>
                        <div className="text-grayc fs-12">
                          {item.restaurant.address}
                        </div>
                        <div className="d-flex my-2">
                          <div className="price text-black me-3 align-self-center fs-6">
                            ₹ {item.finalAmount?.toFixed(2)}
                          </div>
                          <div className="text-grayc fs-6 align-self-center">
                            {item.items.length} items
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-lg-4 col-6">
                            <div
                              onClick={() =>
                              openRatingPopup({
                              restaurantID: item.restaurant._id,
                              userID: item.user,
                              })
                              }
                              className="btn text-bluec skip-btn w-100 py-1"
                              >
                              Rate
                            </div>
                          </div>
                          {/* 
                          <div className="col-lg-4 col-6 align-self-center">
                            <Link
                              to="/confirm-order"
                              className="btn btn-custom w-100"
                              >
                            Re-Order
                            </Link>
                          </div>
                          */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
              })
              ) : (
              <div className="row justify-content-center">
                <div className="col-6 text-center">
                  <No_Order />
                </div>
              </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
  <View_Orders
    show={viewodersShow}
    setShow={setViewordersShow}
    dishList={dishList}
    />
  <RestaurantRating
    show={isRating}
    setShow={setIsRating}
    data={ratingData}
    />
</section>
</>
);
};
export default Orders;
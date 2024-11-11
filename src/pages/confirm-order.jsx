import React, { useContext, useEffect, useState } from "react";
import minimap from "../assets/images/others/Mini-Map.png";
import { FaMapMarkerAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import plus from "../assets/images/restaurant/add-circle.png";
import upi from "../assets/images/others/Upi.png";
import cash from "../assets/images/others/cash.png";
import minus from "../assets/images/restaurant/minus-circle.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Order_Success from "../components/order-success";
import { errorToast, Calls, successToast } from "../utils/call";
import { api } from "../urls";
import Select from "react-select";
import { toast } from "react-toastify";
import { handleLocationClick } from "../utils/location";
import Login from "../components/login";
// import { OrderTypeContext } from "../provider-data/OrderType";
import Slot from "../components/slot";
import { DisplayRazorpay } from "../payament";

const Confirm_Order = () => {
  // const {typeOfOrder,setTypeOfOrder} = useContext(OrderTypeContext)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [successShow, setSuccessShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const [cartList, setCartList] = useState({});
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [latLong, setLatLong] = useState({});
  const [selectList, setSelectList] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState("");
  const [slotShow, setSlotShow] = useState(false);
  const [restaurantID, setRestaurantID] = useState("");
  const [orderType, setOrderType] = useState("");
  const [isPayamentModeOnline, setIsPayamentModeOnline] = useState(true);
  const [tableNo, setTableNo] = useState();
  const [existingOrder, setExistingOrder] = useState(false);
  const [existingOrderList, setExistingOrderList] = useState([]);
  const [isDishDisable, setIsDishDisable] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    const type = localStorage.getItem("orderType");
    let table = Number(searchParams.get("tableno"));
    // let table = 2;
    if (table > 0) {
      checkOrderProcess();
      setOrderType("DINING");
      setTableNo(table);
    } else {
      setTableNo(0);
      setOrderType(type);
    }

    if (!id || cartList.length <= 0) {
      navigate("/");
      return;
    }
    setRestaurantID(id);
    fetchCartData();
    handleLocationClick((lat, long) => fetchRestaurantDetail(lat, long, id));
    fetchOffers(id);
  }, []);

  const fetchOffers = async (restaurantID) => {
    const res = await Calls.requestPost(api.getOfferByRestaurantId, {
      restaurantID,
    });
    if (res.data) {
      let arr = [];
      // setOfferList(res.data?.data)
      res.data?.data?.map((item) => {
        arr.push({
          value: item._id,
          label: item?.offerName + " | " + item?.description,
          isDisabled: !item?.isApplicable,
        });
      });
      setSelectList(arr);
    } else {
      setSelectList([]);
    }
  };
  const fetchExstingOrder = async () => {
    const res = await Calls.requestGet(api.getDininRunningOrder);
    if (res.data) {
      setExistingOrderList(res.data.data);
      console.log("=sss===", res.data.data[0].items);
    } else {
      setExistingOrderList([]);
    }
  };

  const checkOrderProcess = async () => {
    const res = await Calls.requestGet(api.isProcessingOrder);
    if (res.data) {
      setExistingOrder(res.data.data.isProcessingOrder);
      if (res.data.data.isProcessingOrder) fetchExstingOrder();
    }
  };

  const fetchRestaurantDetail = async (lat, long, restaurantID) => {
    setLatLong({ lat, long });
    const res = await Calls.requestPost(api.getRestaurantDetails, {
      restaurantID,
      latitude: lat,
      longitude: long,
    });
    if (!res.data) {
      setRestaurantDetail({});
    } else {
      setRestaurantDetail(res.data?.data);
    }
  };
  const fetchCartData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getCartData();
    } else {
      setCartList(JSON.parse(localStorage.getItem("cart")));
    }
  };

  const getCartData = () => {
    Calls.requestGet(api.getCartDetails).then((res) => {
      console.log(orderType, isDishDisable);
      const typeOrder = localStorage.getItem("orderType");
      if (res.data) {
        res.data?.data?.dishes.forEach((el) => {
          el["id"] = el.dish;
          if (!el.active && typeOrder === "TAKE_AWAY") {
            setIsDishDisable(true);
          }
        });
        setCartList(res.data.data);
        if (res.data?.data.length <= 0) navigate("/");
      } else {
        navigate("/");
        setCartList({});
      }
    });
  };
  const addQuantity = (item) => {
    const token = localStorage.getItem("token");
    if (!token && cartList) {
      cartList.dishes.forEach((el) => {
        if (el.id === item?.id && el.quantity < 11) {
          el.quantity++;
        }
      });
      setCartList({ ...cartList });
      localStorage.setItem("cart", JSON.stringify(cartList));
    } else if (cartList) {
      item.quantity = 1;
      callCartApi({ restaurantID: cartList?.restaurantID, dishes: [item] });
    }
  };
  const callCartApi = (cart) => {
    Calls.requestPost(api.addInCart, cart).then((res) => {
      if (res.data) {
        fetchCartData();
        successToast(res);
      } else {
        // setSingleCartData(cart)
        // setAlertPopupShow(true)
      }
    });
  };

  const substractQuantity = (item) => {
    const token = localStorage.getItem("token");
    if (!token && cartList) {
      cartList.dishes.forEach((el) => {
        if (el.id === item?.id && el.quantity > 1) {
          el.quantity--;
        }
      });
      setCartList({ ...cartList });
      localStorage.setItem("cart", JSON.stringify(cartList));
    } else if (cartList) {
      {
        item.quantity = -1;
        callCartApi({ restaurantID: cartList?.restaurantID, dishes: [item] });
      }
    }
  };

  const deleteCrt = async (item) => {
    let token = localStorage.getItem("token");
    if (token) {
      let res = await Calls.requestPost(api.deleteDishFromCart, {
        dishID: item?.id,
      });
      if (res.data) {
        toast.success(`${item?.dishName} deleted from cart successfully`);
        fetchCartData();
      } else {
        errorToast(res);
      }
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const index = cart?.dishes.findIndex((user) => user.id === item?.id);
      if (index !== -1) {
        cart?.dishes.splice(index, 1);
        setCartList({ ...cart });
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success(`cart deleted successfully`);
      } else {
        console.log("User not found");
      }
    }
  };

  const direction = () => {
    const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latLong.lat},${latLong.long}&destination=${restaurantDetail.location?.coordinates[1]},${restaurantDetail.location?.coordinates[0]}`;
    window.open(googleMapsDirectionsUrl, "_blank");
  };

  const applyOfferHandler = async (e) => {
    const token = localStorage.getItem("token");
    if (token) {
      let res = await Calls.requestPost(api.availOffer, { offerID: e?.value });
      if (res.data) {
        setSelectedOffer(e.value);
        getCartData();
      } else {
        setSelectedOffer("");
        errorToast(res);
      }
    } else {
      setLoginShow(true);
    }
  };

  const handleSlot = async () => {
    const token = localStorage.getItem("token");
    if (orderType === "TAKE_AWAY") {
      const res = await Calls.requestGet(api.itsValidCart);
      if (!res.data?.data) {
        toast.error("Some dish is not awailable..");
        return;
      }
    }

    if (orderType === "PRE_ORDER" && !tableNo) {
      setSlotShow(true);
    } else if (orderType === "TAKE_AWAY" && !tableNo) {
      if (token) {
        if (isPayamentModeOnline) {
          DisplayRazorpay(navigate);
        } else {
          finalOrder();
        }
      } else {
        setLoginShow(true);
      }
    } else if (tableNo > 0) {
      if (token) {
        if (!existingOrder) {
          finalOrder();
        } else {
          let res = await Calls.requestGet(api.mergingOrder);
          if (res.data) {
            setSuccessShow(true);
          }
        }
      } else {
        setLoginShow(true);
      }
    }
  };

  const finalOrder = async () => {
    console.log("final order", tableNo);

    let res = await Calls.requestPost(api.createOrder, {
      orderType,
      tableNo: tableNo > 0 ? tableNo : "",
      paymentMethod: "cash",
    });
    if (res.data) {
      setSuccessShow(true);
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
            Confirm-Order
          </li>
        </ol>
      </nav>
      <section className="my-5 ">
        <div className="container-fluid">
          <div className="row justify-content-center flex-wrap-reverse">
            <div className="col-md-6 col-lg-5 mt-4 mt-lg-0">
              <div className="confirm-order">
                {/* 
          <div className="time-mode d-flex justify-content-around b-dishes mx-4">
            <p className="text-bluec fw-600">Dine in</p>
            <p className="text-successc fs-14 align-middle pt-1">2:00 to 4:00 PM</p>
            <p className="text-grayc fs-14 pt-1">Tuesday, 03 March 2023</p>
          </div>
          */}
                <div className=" text-center text-pink fw-600">
                  {cartList?.restaurantName}
                </div>
                <hr />
                <div className="row justify-content-around mx-4 b-dishes py-3">
                  <div className="col-3 cPointer" onClick={direction}>
                    <img src={minimap} alt="" className="img-fluid" />
                  </div>
                  <div className="col-8">
                    <p className="text-bluec fs-13">
                      {restaurantDetail?.address} , contact -
                      {restaurantDetail?.contact}
                    </p>
                    <a href="#" className="text-grayc text-decoration-none">
                      <FaMapMarkerAlt />{" "}
                      <span className="align-middle">
                        {restaurantDetail?.distanceKM} km
                      </span>
                    </a>
                  </div>
                </div>
                <div className="row   px-2 b-dishes py-3 mx-4">
                  <div className="col-lg-6  col-8">
                    <p className="text-bluec mb-0 fs-14">Subtotal </p>
                  </div>
                  <div className="col-lg-4 col-4">
                    <p className="text-black mb-0 fs-14 price ">
                      ₹ {cartList?.cartTotalPrice}
                    </p>
                  </div>
                </div>
                <div className="row   px-2 b-dishes py-3 mx-4">
                  <div className="col-lg-6  col-8">
                    <p className="text-bluec mb-0 fs-14">Taxes & Charges</p>
                  </div>
                  <div className="col-lg-4 col-4">
                    <p className="text-black mb-0 fs-14 price">
                      ₹ {cartList?.taxAndCharges?.toFixed(2)}
                    </p>
                  </div>
                </div>
                {!existingOrder && (
                  <div className="row   px-lg-2 b-dishes py-3 mx-4">
                    <div className="col-lg-4 col-4 align-self-center">
                      <p className="text-bluec mb-0 fs-14">Voucher</p>
                    </div>
                    <div className="col-8 col-lg-6">
                      <Select
                        onChange={applyOfferHandler}
                        value={selectedOffer}
                        placeholder="Select Offer"
                        className="form-control-select voucher "
                        options={selectList}
                      />
                    </div>
                  </div>
                )}
                {cartList?.discountedAmount > 0 && (
                  <div className="row px-2 b-dishes py-3 mx-4">
                    <div className="col-6">
                      <p className="text-bluec mb-0 fs-14">Discount</p>
                    </div>
                    <div className="col-4">
                      <p className="text-black mb-0 fs-14 price">
                        ₹ {cartList?.discountedAmount?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
                <div className="row   px-2 b-dishes py-3 mx-4">
                  <div className="col-lg-6  col-8">
                    <p className="text-bluec mb-0 fw-bold">Total</p>
                  </div>
                  <div className="col-lg-4 col-4">
                    <p className="text-pink mb-0 fw-bold price">
                      ₹ {cartList?.finalAmount?.toFixed(2)}
                    </p>
                  </div>
                </div>
                {tableNo <= 0 && (
                  <div className="row  py-3 mx-lg-4 justify-content-center">
                    {(orderType === "PRE_ORDER" ||
                      orderType === "TAKE_AWAY") && (
                      <div className="col-lg-5   col-6 ">
                        <div
                          className={`paymode ${
                            isPayamentModeOnline && "payamentMode"
                          }  d-flex justify-content-between`}
                          onClick={() => setIsPayamentModeOnline(true)}
                        >
                          <div className="align-self-center">
                            <img src={upi} alt="" className="img-fluid" />
                          </div>
                          <div className=" ms-1">
                            <p className="fs-14 text-pink mb-0 fw-600">
                              ₹ {cartList?.finalAmount?.toFixed(2)}
                            </p>
                            <p className="mb-0 fw-600">UPI</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {orderType === "DINING" && tableNo > 0 && (
                      <div className="col-lg-4 col-6">
                        <div
                          className={`paymode ${
                            !isPayamentModeOnline && "payamentMode"
                          }  d-flex justify-content-between`}
                          onClick={() => setIsPayamentModeOnline(false)}
                        >
                          <div className="align-self-center">
                            <img src={cash} alt="" className="img-fluid" />
                          </div>
                          <div>
                            <p className="fs-14 text-pink mb-0">
                              ₹ {cartList?.finalAmount?.toFixed(2)}
                            </p>
                            <p className="mb-0 fw-600">Cash</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {isDishDisable === false && (
                  <div className="row mt-4 justify-content-center">
                    <div className="col-6">
                      <div className="btn btn-custom w-90" onClick={handleSlot}>
                        {existingOrder ? "Add" : "Checkout"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="cart-confirm cart">
                <div className="row justify-content-center">
                  <div className="col-11 ">
                    {cartList.dishes?.map((item) => {
                      return (
                        <div className="row b-dishes py-3">
                          <div className="col-3 px-0">
                            <img
                              src={item?.dishImages[0]}
                              alt=""
                              className="img-fluid dish-img"
                            />
                          </div>
                          <div className="col-9">
                            <h6 class="text-bluec fw-500">{item.dishName}</h6>
                            <div className="d-flex justify-content-between mt-3">
                              <div className="d-flex">
                                <div className="inc-btn">
                                  <img
                                    src={minus}
                                    alt=""
                                    className="img-fluid"
                                    onClick={() => substractQuantity(item)}
                                  />
                                  <span className="px-3">{item?.quantity}</span>
                                  <img
                                    src={plus}
                                    alt=""
                                    className="img-fluid"
                                    onClick={() => addQuantity(item)}
                                  />
                                </div>
                                <div className="price text-dark ms-3 align-self-center">
                                  ₹ {item?.totalPrice}{" "}
                                </div>
                              </div>
                              <div
                                className="price text-pink cPointer ms-3 align-self-center"
                                onClick={() => deleteCrt(item)}
                              >
                                <FaTrashAlt className="fs-5" />
                              </div>
                            </div>
                            {!item?.active && (
                              <div className="text-pink fw-600 fs-14 align-self-center ms-1 mt-1">
                                Out of stock
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {existingOrderList?.length > 0 && (
                <div className="card-vieworder mt-3 previous-or">
                  <div className="row  py-1 px-2 justify-content-center">
                    <div className="col-12">
                      <h5 className="text-pink fw-bold text-center pt-3">
                        Running Order
                      </h5>
                      <hr />
                    </div>
                    {existingOrderList?.length > 0 &&
                      existingOrderList[0]?.items?.map((item) => {
                        return (
                          <div className="col-11 align-self-center b-dishes pb-3">
                            <h6 class="text-pink fw-500"> {item?.dishName}</h6>
                            <div className="d-flex  justify-content-between">
                              <div className=" text-black  align-self-center fw-600">
                                <b>Price :</b> ₹ {item?.price}
                              </div>
                              <div className="quant ms-3">
                                Quantity : {item?.quantity}
                              </div>
                              <div className=" text-black  align-self-center fw-600">
                                <b>Total :</b> ₹ {item?.totalPrice}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Order_Success show={successShow} setShow={setSuccessShow} />
      <Login show={loginShow} setShow={setLoginShow} />
      <Slot
        show={slotShow}
        setShow={setSlotShow}
        restaurantID={searchParams.get("id")}
        isPayamentModeOnline={isPayamentModeOnline}
      />
    </>
  );
};
export default Confirm_Order;

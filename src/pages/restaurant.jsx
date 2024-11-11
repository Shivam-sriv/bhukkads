import React, { useContext, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {
  json,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  FaHeart,
  FaSearch,
  FaRegStar,
  FaStar,
  FaTrashAlt,
} from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import plus from "../assets/images/restaurant/add-circle.png";
import minus from "../assets/images/restaurant/minus-circle.png";
import menugif from "../assets/images/restaurant/menu.gif";
import noitem from "../assets/images/others/item.png";
import norestro from "../assets/images/others/restro.png";
import {
  errorToast,
  Calls,
  successToast,
} from "../utils/call";
import { api } from "../urls";
import { handleLocationClick } from "../utils/location";
import Slot from "../components/slot";
import AlertPopup from "../components/alert-popup";
import { toast } from "react-toastify";
import { RiDeleteBin2Line } from "react-icons/ri";
import emptycart from "../assets/images/others/empty-cart.png";
import { Toast } from "react-bootstrap";
import Login from "../components/login";
import Review from "../components/review";
import DataNotFound from "../components/data-not-found";
import { CartContext } from "../provider-data/CartCount";
const Restaurant = () => {
  const navigate = useNavigate();
  const { cartList, fetchCartData, setCartList } = useContext(CartContext)
  const [searchParams] = useSearchParams();
  const [dishList, setDishList] = useState([]);
  const [tempDishList, setTempDishList] = useState([]);
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [categoryAndDishList, setCategoryAndDishList] = useState([]);
  const [latLong, setLatLong] = useState({});
  const [slotShow, setSlotShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [alertPopupShow, setAlertPopupShow] = useState(false);
  const [singleCartData, setSingleCartData] = useState({});
  const [offerList, setOfferList] = useState([]);
  const [loginShow, setLoginShow] = useState(false);
  const [reviewShow, setReviewShow] = useState(false);
  const [ratingList, setRatingList] = useState(null);
  const [filteredMenuList, setFilteredMenuList] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const id = searchParams.get("id");
    fetchDishData(id);
    handleLocationClick((lat, long) => fetchRestaurantDetail(lat, long, id));
    fetchCategoryAndDishes(id);
    fetchCartData();
    fetchOffers(id);
    fetchRatings(id);
  }, []);



  const fetchRatings = async (restaurantID) => {
    const res = await Calls.requestPost(api.getRatingsAndComments, { restaurantID });
    if (res?.data) {
      setRatingList({ ...res.data.data, ...res.data.counting });
    } else {
      setRatingList([]);
    }
  };

  const fetchOffers = async (restaurantID) => {
    const res = await Calls.requestPost(api.getOfferByRestaurantId, { restaurantID });
    if (!res.data) {
      setOfferList([]);
    } else {
      setOfferList(res.data?.data);
    }
  };

  const fetchCategoryAndDishes = async (restaurantID) => {
    const res = await Calls.requestPost(api.getRestaurantsCategoryAndItsDishes, {
      restaurantID,
    });
    if (!res.data) {
      setCategoryAndDishList([]);
    } else {
      setCategoryAndDishList(res.data?.data);
      menuByCategory(res.data?.data[0]?._id, res.data?.data[0]?.category)

    }
  };
  const fetchDishData = async (restaurantID) => {
    const res = await Calls.requestPost(api.getMenuByRestaurant, { restaurantID });
    if (!res.data) {
      setDishList([]);
    } else {
      setDishList(res.data?.data);
      setTempDishList(res.data?.data);
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
      // direction(res.data?.data?.location?.coordinates)
      setRestaurantDetail(res.data?.data);
    }
  };

  const direction = () => {
    const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latLong.lat},${latLong.long}&destination=${restaurantDetail.location?.coordinates[1]},${restaurantDetail.location?.coordinates[0]}`;
    window.open(googleMapsDirectionsUrl, "_blank");
  };

  const searchHandler = (e) => {
    let value = e.target.value;

    setSearchValue(value);
    if (value?.trim().length > 1) {
      console.log("value", value);

      const regex = new RegExp(value, "i");
      const filteredArray = tempDishList.filter((item) =>
        regex.test(item.dishName)
      );
      console.log("serach vallue", filteredArray);
      setDishList(filteredArray);
    } else {
      console.log("tempDishList", tempDishList);
      setDishList([...tempDishList]);
    }
  };
  const addToCart = async (item) => {
    let token = localStorage.getItem("token");
    if (token) {
      saveCartOnServer(item);
      return;
    }
    console.log("aa");
    const restaurantID = searchParams.get("id");
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
      cart = {
        restaurantID,
        dishes: [],
      };
    }
    item["id"] = item._id;
    let flag = false;
    console.log("cart", cart);
    console.log("restaurantID", restaurantID);
    if (cart !== null && restaurantID === cart?.restaurantID) {
      console.log("cart1", cart);
      cart.dishes.forEach((el) => {
        if (el.id === item.id) {
          if (el.quantity < 11) {
            el.quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            setCartList({ ...cart });
            toast.success(`${item.dishName} add quantity succeesfully.`);
            flag = true;
          }
        }
      });
      if (!flag) {
        item["quantity"] = 1;
        cart.dishes = [...cart.dishes, item];
        setCartList({ ...cart });
        toast.success(`Added to cart succeesfully.`);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } else if (cart !== null && restaurantID !== cart?.restaurantID) {
      console.log("cart2", cart);
      item["quantity"] = 1;
      cart["restaurantID"] = restaurantID;
      cart["dishes"] = [item];
      setSingleCartData(cart);
      setAlertPopupShow(true);
    } else {
      item["quantity"] = 1;
      cart["restaurantID"] = restaurantID;
      cart["dishes"] = [item];
      toast.success(`${item.dishName} Add to cart succeesfully.`);
      setCartList({ ...cart });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const saveCartOnServer = async (item) => {
    const restaurantID = searchParams.get("id");
    item["id"] = item._id;
    item["quantity"] = 1;
    let bodyItem = {
      restaurantID,
      dishes: [item],
    };
    callCartApi(bodyItem);
  };

  const callCartApi = (cart) => {
    console.log("data final call before apii", cart);
    Calls.requestPost(api.addInCart, cart).then((res) => {
      if (res.data) {
        fetchCartData();
        successToast(res);
      } else {
        setSingleCartData(cart);
        setAlertPopupShow(true);
      }
    });
  };

  const addQuantity = (item) => {
    console.log("sss", item);
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

  const substractQuantity = (item) => {
    const restaurantID = searchParams.get("id");
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
    console.log("item", item);
    const token = localStorage.getItem("token");
    if (token) {
      let res = await Calls.requestPost(api.deleteDishFromCart, { dishID: item?.id });
      if (res.data) {
        toast.success(`${item?.dishName} deleted from cart successfully`);
        fetchCartData();
      } else {
        // errorToast(res)
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

  const goCheckout = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      setLoginShow(true);
    } else {
      navigate(
        `/confirm-order?id=${searchParams.get("id")}&tableno=${searchParams.get("tableno")
          ? searchParams.get("tableno")
          : localStorage.getItem("orderType")
        }`
      );
    }
  };

  const menuByCategory = async (categoryId, category) => {

    const restaurantId = searchParams.get("id");
    const res = await Calls.requestPost(api.getMenuByMenuCategory, {
      categoryId,
      restaurantId,
    });
    if (res.data) {
      setCategoryName(category)
      setShow(false)
      setFilteredMenuList(res.data.data);
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    categoryAndDishList?.length > 0 ?
      <>

        <section
          className="restaurant-details"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${restaurantDetail?.heroImage})`,
          }}
        >
          <div className="container-fluid">
            <div className="row ">
              {/* {restaurantDetail?.images?.length > 0 && ( */}
              <div className="col-md-12 col-lg-3 mt-5 slider-restaurant ">
                {/* {restaurantDetail?.images && ( */}
                <OwlCarousel
                  className="owl-theme"
                  loop
                  margin={10}
                  autoplaySpeed={2000}
                  autoplay={true}
                  responsiveClass={true}
                  responsive={{
                    0: { items: 1, nav: false },
                    768: { items: 1, nav: false },
                    990: { items: 1, nav: false },
                  }}
                  dots={false}
                  nav
                >
                  {restaurantDetail?.images?.length > 0 ? restaurantDetail?.images.map((item) => {
                    return (
                      <div class="item">
                        <img src={item} alt="" className="img-fluid" />
                      </div>
                    );
                  }) : <div class="item">
                    <img src={norestro} alt="" className="img-fluid" />
                  </div>}
                </OwlCarousel>
                {/* )} */}
              </div>
              {/* )} */}
              <div className="col-md-12 col-lg-6 align-self-center mt-5 ps-lg-5">
                <h2 className="text-white">{restaurantDetail?.name}</h2>
                <p className="text-white">{restaurantDetail?.address}</p>
                <div className="d-lg-flex d-block  detail-res">
                  <div className="br-2 ">
                    <p>
                      <FaStar className="text-pink align-baseline" />
                      <span className="text-white  ms-1">{restaurantDetail?.rating}</span>
                    </p>
                    <a
                      href="#"
                      className="text-white me-3 review-click"
                      onClick={() => setReviewShow(true)}
                    >
                      {ratingList?.data?.length} + ratings
                    </a>
                  </div>
                  <div className="br-2 ms-lg-4 ms-0 my-3 my-lg-0">
                    <p>
                      <FaLocationDot className="text-pink" />
                      <span className="text-white align-middle ms-1">
                        {restaurantDetail?.distanceKM} KM
                      </span>
                    </p>
                    <div
                      onClick={direction}
                      target="_blank"
                      className="text-pink me-3 cPointer getd"
                    >
                      Get Direction
                    </div>
                  </div>
                  <div className="ms-lg-4 ms-0 align-self-center">
                    <h5 className="text-white">Dine-in </h5>

                    <div className="d-flex">
                      <span className="">
                        <a
                          href={`tel:${restaurantDetail?.contact}`}
                          className="regis text-white"
                        >
                          <IoCall className="text-pink fs-6 me-1" />
                          <span className="h6  align-middle">
                            {restaurantDetail?.contact}
                          </span>
                        </a>
                      </span>
                      <span className="text-white  h6 align-middle ms-3">
                        <span className="text-pink">Open</span> :{" "}
                        {restaurantDetail?.openingTime}
                        <span className="px-2">to</span>
                        {restaurantDetail?.closingTime}
                      </span>
                    </div>
                  {!restaurantDetail?.openNow && <div className="text-danger">Closed</div>}  
                  </div>
                </div>
              </div>
             { offerList?.length > 0 &&
              <div className="col-md-12 col-lg-3 align-self-center mt-5 pe-4">
                <div className="offer-b">
                  <div className="d-flex justify-content-between">
                    <h4 className="text-pink mb-0">Offers</h4>
                  </div>
                  {offerList?.map((item) => {
                    return (
                      <p>
                        <BiSolidOffer size={30} className="text-pink" />
                        <span className="text-white fs-13">
                          {item?.description} min of ₹{item?.conditionValue} |{" "}
                          {item?.offerName}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </div>}
            </div>
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-3">
                <Form className="d-flex" id="search-wrapper">
                  <Form.Control
                    id="search"
                    type="search"
                    placeholder="Search for dish..."
                    className="pe-2"
                    onChange={searchHandler}
                    aria-label="Search"
                    value={searchValue}
                  />
                  <FaSearch type="submit" className="search-button" size={20} />
                </Form>
              </div>
              {/* <div className="col-md-1 w-favorite">
                <Form className="d-flex favourite-btn" id="search-wrapper">
                  <FaHeart className="search-button heart" />
                  <p className="align-self-center mb-0">Favourite</p>
                </Form>
              </div> */}
            </div>
          </div>
        </section>
        <section className="mt-5 sliderhome popular-items">
          <h3 className="heading ms-5 letter-s-1">Dishes</h3>
          {dishList?.length > 0 ? (
            <OwlCarousel
              className="owl-theme pt-3 dishes-owl"
              stagePadding={0}
              margin={12}
              autoplaySpeed={2000}
              autoplay={true}
              responsiveClass={true}
              responsive={{
                0: { items: 2, nav: false },
                768: { items: 4, nav: false },
                990: { items: 5, nav: false },
                1100: { items: 6, nav: false },
                1400: { items: 8, nav: false },
              }}
              dots={false}
              nav
            >
              {dishList?.map((item, index) => {
                return (
                  <div class="item justify-content-center" key={index}>
                    <div className="itemcard ">
                      <img
                        src={item?.dishImages[0] || noitem}
                        alt=""
                        className="img-fluid"
                      />
                      <p className="mb-0 py-2">{item?.dishName}</p>
                      {/* <div className="category-p">{item?.description}</div> */}

                      <div className="d-flex justify-content-between">
                        <div className="price">₹ {item?.price}</div>
                       {!item?.active && <div className="text-pink fw-600 fs-14">Out of stock</div>}  
                        <div>
                        {item?.active &&  <div
                            className="add-btn"
                            onClick={() => addToCart(item)}
                          >
                            Add +
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          ) : (
            <DataNotFound />
          )}
        </section>
        <section className="mt-lg-5 px-lg-5 py-4">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-md-3  d-none d-lg-block">
                {categoryAndDishList?.length > 0 &&
                  <div className="menu-card ">
                    <div className="text-white row justify-content-center">
                      <div className="col-md-11">
                        <div className="menu-head-bg text-center">
                          <span>
                            <img
                              src={menugif}
                              alt=""
                              className="img-fluid mx-2em"
                            />
                          </span>
                          <span className="align-middle ps-3">Item List</span>
                        </div>
                      </div>
                    </div>
                    {categoryAndDishList?.length > 0 &&
                      categoryAndDishList.map((item, index) => {
                        return (
                          <>
                            <h6
                              className="text-voilet text-center py-2 b-bottom-menu fw-600 cPointer"
                              onClick={() => menuByCategory(item?._id, item?.category)}
                            >
                              {item?.category}
                            </h6>
                            <ul>
                              {item?.dishes.map((item2) => {
                                return (
                                  <>
                                    <li>
                                      <div className="d-flex justify-content-between">
                                        <span>{item2?.dishName}</span>
                                      </div>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                          </>
                        );
                      })}
                  </div>}
              </div>
              <div className="col-md-5 dishes px-5 mt-4 mt-lg-0">
                <h3 className="heading  letter-s-1">{categoryName}</h3>
                {filteredMenuList?.map((item, index) => {
                  return (
                    <div className="row mt-4 b-dishes pb-3">
                      <div className="col-5 col-lg-3">
                        <img
                          src={item?.dishImages[0] || noitem}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-7 col-lg-9">
                        <div className=" d-flex justify-content-between">
                          <h5 className="text-bluec fw-600"> {item?.dishName}</h5>
                        </div>
                        <div className="category-p fs-12 text-justify">
                          {item?.description}
                        </div>
                        <div className="d-flex  mt-3 justify-content-between">
                          <div className="price ">₹ {item?.price}</div>
                          <a className="add-btn" onClick={() => addToCart(item)}>
                            Add +
                          </a>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              <div className="col-md-4 px-4 mt-4 mt-lg-0">
                <div className="cart">
                  <div className="row justify-content-center">
                    <div className="col-11 ">
                      <div className="heading  letter-s-1 text-center">
                        Cart
                      </div>
                      <hr />
                      <div className=" text-center text-pink fw-600">
                        {cartList?.restaurantName}
                      </div>

                      {cartList?.dishes?.length > 0 ? (
                        cartList?.dishes?.map((item) => {
                          return (
                            <div className="row b-dishes py-3">
                              <div className="col-3 px-0">
                                <img
                                  src={item.dishImages[0]}
                                  alt=""
                                  className="img-fluid dish-img"
                                />
                              </div>
                              <div className="col-9">
                                <h6 class="text-bluec fw-500">{item.dishName}</h6>
                                <div className="d-flex justify-content-between ">
                                  <div className="d-flex mt-3">
                                    <div className="inc-btn">
                                      <img
                                        src={minus}
                                        alt=""
                                        className="img-fluid"
                                        onClick={() => substractQuantity(item)}
                                      />
                                      <span className="px-3">
                                        {item.quantity}
                                      </span>
                                      <img
                                        src={plus}
                                        alt=""
                                        className="img-fluid"
                                        onClick={() => addQuantity(item)}
                                      />
                                    </div>
                                    <div className="price text-black ms-3 align-self-center fw-600">
                                      ₹ {item.price * item.quantity}
                                    </div>
                                  </div>
                                  <div
                                    className="price text-danger cPointer ms-3 align-self-center"
                                    onClick={() => deleteCrt(item)}
                                  >
                                    <FaTrashAlt className="fs-5 text-pink" />
                                  </div>
                                </div>
                                 {!item?.active && <div className="text-pink fw-600 fs-14 align-self-center ms-1 mt-1">Out of stock</div>} 
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center">
                          <img src={emptycart} alt="" className="img-fluid mx-10" />
                        </div>
                      )}
                      {cartList?.dishes?.length > 0 &&
                        <div className="row mt-4">
                          <div onClick={goCheckout} className="btn btn-custom">
                            View Cart
                          </div>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-mobile d-block d-lg-none">
            <div className="sticky-i my-4">
              <div className="bg-pink text-center">
                <span>
                  <img
                    src={menugif}
                    alt=""
                    className="img-fluid mx-2em"
                  />
                </span>
                <span className="align-middle ps-2 text-white fw-600" onClick={handleShow}>Item List</span>
              </div>
            </div>
          </div>
        </section>
        {/* =====item modal===== */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body>
            <div className="row justify-content-center">
              <div className="col-md-10">
                {categoryAndDishList?.length > 0 &&
                  <div className="menu-card ">
                    <div className="text-white row justify-content-center">
                      <div className="col-md-11">
                        <div className="menu-head-bg text-center">
                          <span>
                            <img
                              src={menugif}
                              alt=""
                              className="img-fluid mx-2em"
                            />
                          </span>
                          <span className="align-middle ps-3">Item List</span>
                        </div>
                      </div>
                    </div>
                    {categoryAndDishList?.length > 0 &&
                      categoryAndDishList.map((item, index) => {
                        return (
                          <>
                            <h6
                              className="text-voilet text-center py-2 b-bottom-menu fw-600 cPointer"
                              onClick={() => menuByCategory(item?._id, item?.category)}
                            >
                              {item?.category}
                            </h6>
                            <ul>
                              {item?.dishes.map((item2) => {
                                return (
                                  <>
                                    <li>
                                      <div className="d-flex justify-content-between">
                                        <span>{item2?.dishName}</span>
                                      </div>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                          </>
                        );
                      })}
                  </div>}
              </div>
            </div>
          </Modal.Body>

        </Modal>
        {/* =====item modal===== */}
        <Review
          show={reviewShow}
          setShow={setReviewShow}
          ratingList={ratingList}
        />

        <Slot show={slotShow} setShow={setSlotShow} />
        <AlertPopup
          show={alertPopupShow}
          setShow={setAlertPopupShow}
          singleCartData={singleCartData}
          callCartApi={callCartApi}
          setCartList={setCartList}
        />
        <Login show={loginShow} setShow={setLoginShow} />
      </>
      : <DataNotFound data={"This Restaurant not available yet"} />
  );
};

export default Restaurant;

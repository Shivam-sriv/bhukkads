import React, { useContext, useEffect, useState, useRef } from "react";
import logo from "../assets/images/home/logo.png";
import gplay from "../assets/images/home/gplay.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dinein from "../assets/images/home/dining.png";
import preorder from "../assets/images/home/preorder.png";
import takeway from "../assets/images/home/takeway.png";
import appstore from "../assets/images/home/appstore.png";
import res1 from "../assets/images/restaurant/1.png";
import { FaClock, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../components/filter";
import { BiSolidOffer } from "react-icons/bi";
import {Calls } from "../utils/call";
import { api } from "../urls";
import { handleLocationClick } from "../utils/location";
import CameraPopup from "../components/camera";
import { FaLocationDot } from "react-icons/fa6";
import closed from "../assets/images/others/closed.jpg";
const Home = () => {
const navigate = useNavigate();
// const {typeOfOrder,handleTypeOfOrder,setTypeOfOrder} = useContext(OrderTypeContext)
const [nearRestaurantList, setNearRestaurantList] = useState([]);
const [globalCategoriestList, setGlobalCategoriestList] = useState([]);
const [bestRestaurantList, setBestRestaurantList] = useState([]);
const [longLat, setLongLat] = useState({});
const [count, setCount] = useState(0);
const [orderType, setOrderType] = useState("");
const [isCameraOpen, setIsCameraOpen] = useState(false);
const [restaurantCategoryList, setRestaurantCategoryList] = useState([]);
useEffect(() => {
const type = localStorage.getItem("orderType");
if (type) {
setOrderType(type);
} else {
localStorage.setItem("orderType", "PRE_ORDER");
setOrderType("PRE_ORDER");
}
handleLocationClick(nearRestaurant, bestRetaurantSection);
globalCategories();
fetchRestaurantCategory();
}, []);
const fetchRestaurantCategory = async () => {
const res = await Calls.requestGet(api.getGlobalCategoriesTwo);
if (res.data) {
setRestaurantCategoryList(res.data.data);
}
};
const bestRetaurantSection = async (latitude, longitude) => {
const res = await Calls.requestPost(api.getRestaurantsByLevel2Category, {
latitude,
longitude,
});
if (res.data) {
setBestRestaurantList(res.data?.data);
} else {
setBestRestaurantList([]);
}
};
const nearRestaurant = async (latitude, longitude) => {
setLongLat({ latitude, longitude });
const res = await Calls.requestPost(api.getRestaurantsNearMe, {
latitude,
longitude,
});
if (res.data) {
setNearRestaurantList(res.data?.data);
} else {
setNearRestaurantList([]);
}
};
const globalCategories = async () => {
const res = await Calls.requestGet(api.getGlobalCategories);
if (res.data) {
setGlobalCategoriestList(res.data.data);
} else {
setGlobalCategoriestList([]);
}
};
const categoryRestaurant = async (categoryID, apiName,restaurantType) => {
longLat["categoryID"] = categoryID;
navigate("/restaurant-list", { state: { longLat, apiName,restaurantType } });
};
const saveOrderType = (type) => {
localStorage.setItem("orderType", type);
setOrderType(type);
};
const restaurantFilter = async (latitude, longitude, type) => {
const res = await Calls.requestPost(api.filters, { latitude, longitude, type });
if (res.data) {
setNearRestaurantList(res.data?.data);
} else {
setNearRestaurantList([]);
}
};
return (
<>
<section className="banner">
  <div className="container">
    <div className="row justify-content-end">
      <div className="col-md-12 col-lg-6 mt-5 pt-5 ">
        <img src={logo} alt="" className="img-fluid" />
        <p
          className="banner-para mt-4"
          onClick={() => setCount(count + 1)}
          >
          For better experience,download the Bhukkads app now
        </p>
        <a href="http://" target="_blank" className="">
        <img
          src={gplay}
          alt=""
          className="img-fluid mt-4 banner-store"
          />
        </a>
        <a href="http://" target="_blank" className="ms-3">
        <img
          src={appstore}
          alt=""
          className="img-fluid mt-4 banner-store"
          />
        </a>
      </div>
    </div>
    {/* 
    <Loader data={true}/>
    */}
    <div className="row justify-content-center tab-filter-box">
      <div className="col-5 tab-filter">
        <div className="d-flex pt-1 text-center justify-content-between">
          <div
            className="cPointer"
            onClick={() => saveOrderType("TAKE_AWAY")}
            >
            <img src={takeway} alt="" className="img-fluid takeway" />
            <p
            className={
            orderType === "TAKE_AWAY" ? "fw-600 text-pink" : "fw-600"
            }
            >
            Takeway
            </p>
          </div>
          <div
            className="cPointer"
            onClick={() => saveOrderType("PRE_ORDER")}
            >
            <img src={preorder} alt="" className=" img-fluid pre-o" />
            <p
            className={
            orderType === "PRE_ORDER" ? "fw-600 text-pink" : "fw-600"
            }
            >
            Pre-Order
            </p>
          </div>
          <div className="align-self-center cPointer">
            {/* 
            <MdOutlineQrCodeScanner className="fs-1 cl-tab" />
            */}
            <img
              src={dinein}
              alt=""
              className=" img-fluid dinein"
              onClick={() => setIsCameraOpen(true)}
            />
            <p className="pt-1 fw-600">Dine-in</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<CameraPopup show={isCameraOpen} setShow={setIsCameraOpen} />
{/* 
<Camera/>
*/}
<section className="mt-5em looking-for px-2 px-lg-0 mb-5">
  <h3 className="heading ms-lg-5 mb-4 text-uppercase">
    What are you looking for ?
  </h3>
  <div className="container-fluid cPointer">
    {restaurantCategoryList?.length > 0 && (
    <OwlCarousel
    className="owl-theme pt-3"
    loop
    margin={10}
    autoplaySpeed={2000}
    autoplay={false}
    responsiveClass={true}
    responsive={{
    0: { items: 2, nav: false },
    500: { items: 3, nav: false },
    768: { items: 5, nav: false },
    990: { items: 6, nav: true },
    1200: { items: 8, nav: true },
    }}
    dots={false}
    nav
    >
    {restaurantCategoryList.map((item) => {
    return (
    <div
      className="item"
      onClick={() =>
      categoryRestaurant(
      item._id,
      api.getRestaurantsByGlobalCategoriesTwo,
      item?.name
      )
      }
      >
      <div className="card-lf">
        <img src={item?.url} alt="" className="img-fluid" />
        <h6 className="text-center p-2 ">{item.name}</h6>
      </div>
    </div>
    );
    })}
    </OwlCarousel>
    )}
  </div>
</section>
<section className="mt-4 looking sliderhome px-2 px-lg-0">
  <h3 className="heading ms-lg-5 text-uppercase">Explore cravings </h3>
  {globalCategoriestList?.length > 0 && (
  <OwlCarousel
  className="owl-theme pt-3"
  loop
  margin={10}
  autoplaySpeed={2000}
  autoplay={true}
  responsiveClass={true}
  responsive={{
  0: { items: 2, nav: false },
  500: { items: 3, nav: false },
  768: { items: 5, nav: false },
  990: { items: 6, nav: true },
  1200: { items: 8, nav: true },
  }}
  dots={false}
  nav
  >
  {globalCategoriestList.map((item) => {
  return (
  <div
    class="item"
    onClick={() =>
    categoryRestaurant(
    item._id,
    api.getRestaurantsByGlobalCategories,
    item?.name
    )
    }
    >
    <img src={item.url} alt="" className="img-fluid  pb-2" />
    <h5 className="text-center">{item.name}</h5>
  </div>
  );
  })}
  </OwlCarousel>
  )}
</section>
{bestRestaurantList?.length > 0 &&
bestRestaurantList.map((item) => {
return (
<section className="mt-lg-4 partners chains sliderhome px-3 px-lg-0">
  {item?.restaurants?.length > 0 && (
  <>
  <h3 className="heading ms-lg-5 text-uppercase">
    {item.name}
  </h3>
  <OwlCarousel
  className="owl-theme pt-3"
  loop
  margin={12}
  autoplaySpeed={2000}
  autoplay={true}
  responsiveClass={true}
  responsive={{
  0: { items: 1, nav: false },
  600: { items: 2, nav: false },
  768: { items: 2, nav: false },
  990: { items: 3, nav: true },
  1200: { items: 4, nav: true },
  }}
  dots={false}
  nav
  >
  {item?.restaurants.map((item2) => {
  return (
  <div class="item ">
    <Link
    to={`${"/restaurant?id=" + item2._id
    }`}
    >
    <div className="restrocard">
      <span className="promoted">
        <FaClock className="text-time me-1"/>
        {item2?.openingTime} - {item2?.closingTime}
      </span>
      {item2?.offers?.length > 0 && (
      <span className="off">
        <BiSolidOffer size={20} />
        <span className="ms-1">
        {
        item2?.offers?.reduce(
        (max, obj) =>
        obj.offerValue > max.offerValue
        ? obj
        : max,
        item2?.offers[0]
        ).offerValue
        }
        % off
        </span>
      </span>
      )}
      <span className="promoted">
        <FaClock className="text-time me-1" />
       
        {item2?.openingTime} - {item2?.closingTime}
      </span>
      <img
      src={item2?.openNow ? item2.heroImage:closed}
      alt=""
      className={`img-fluid imgFixed`}
      />
      <span className="distance">
        <FaLocationDot
          size={15}
          className="text-pink"
          />
        <span className="ms-1">
        {item2?.distanceKM?.toFixed(1)} km
        </span>
      </span>
      <div className="d-flex justify-content-around pt-2">
        <div>
          <p className="restroname mb-0 ">
            {item2.name}
          </p>
          <p className="menu-p">{item2.address}</p>
        </div>
        <div>
          
          <p className="text-pink fw-bold">
            {!item2?.openNow && "Closed"}
          </p>
        </div>
        <div className="text-right">
          <p className="restroreview mb-1">
            <span>{item2?.rating}</span>
            <FaStar className="fs-6" />
          </p>
          <p className="price-p">
            Price Range ₹{item2?.minPrice}-₹
            {item2?.maxPrice}
          </p>
        </div>
      </div>
    </div>
    </Link>
  </div>
  );
  })}
  </OwlCarousel>
  </>
  )}
</section>
);
})}
<section className="filter">
  <Filter restaurantFilter={restaurantFilter} />
</section>
<section className="my-3 partners chains">
  <h3 className="heading ms-lg-5 mb-4 text-uppercase">
    Top restaurant chains near you
  </h3>
  <div className="container-fluid px-lg-5 px-2">
    <div className="row">
      {nearRestaurantList?.length > 0
      ? nearRestaurantList.map((item) => {
      return (
      <div class="col-md-6 col-12 col-lg-3">
        <Link to={`/restaurant?id=${item?._id}`}>
        <div className="restrocard ">
          {item?.offers?.length > 0 && (
          <span className="off">
            <BiSolidOffer size={20} />
            <span className="ms-1">
            {
            item?.offers?.reduce(
            (max, obj) =>
            obj.offerValue > max.offerValue
            ? obj
            : max,
            item?.offers[0]
            ).offerValue
            }
            % off
            </span>
          </span>
          )}
          <span className="promoted">
            <FaClock className="text-time me-1" />
            
            {item?.openingTime} - {item?.closingTime}
          </span>
          <img
          src={item?.openNow ? item?.heroImage?.url:closed}
          alt=""
          className="img-fluid"
          />
          <span className="distance">
            <FaLocationDot size={15} className="text-pink" />
            <span className="ms-1">
            {item?.distanceKM?.toFixed(1)} km
            </span>
          </span>
          <div className="d-flex justify-content-around pt-2">
            <div>
              <p className="restroname  mb-0">{item?.name}</p>
              <p className="menu-p">{item?.address}</p>
            </div>
            <div>             
              <p className="text-pink fw-bold">
                {!item?.openNow && "Closed"}
              </p>
            </div>
            <div className="text-right">
              <p className="restroreview mb-1">
                <span>{item?.rating}</span>
                <FaStar className="fs-6" />
              </p>
              <p className="price-p">
                Price Range ₹{item.minPrice}-₹{item.maxPrice}
              </p>
            </div>
          </div>
        </div>
        </Link>
      </div>
      );
      })
      : ""}
    </div>
  </div>
</section>
</>
);
};
export default Home;
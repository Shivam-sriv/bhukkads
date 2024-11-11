import React, { useEffect, useState } from "react";
import res1 from "../assets/images/restaurant/1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";
import { FaClock, FaStar } from "react-icons/fa";
import { api } from "../urls";
import { Calls } from "../utils/call";
import DataNotFound from "../components/data-not-found";
import { FaLocationDot } from "react-icons/fa6";
import closed from "../assets/images/others/closed.jpg";

const Restaurant_List = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchedList, setSearchedList] = useState([]);
  const [tempSearchName, setTempSearchName] = useState("");
  useEffect(
    (e) => {
      let value = location?.state?.name;
      let longLat = location?.state?.longLat;
      console.log("longLat", longLat);
      setTempSearchName(location?.state?.name);

      if (value?.length > 1) {
        let clear = setTimeout(() => {
          if (value) {
            Calls.requestPost(api.getRestaurantsByName, {
              search: value,
              ...location?.state?.latLong,
            }).then((res) => {
              if (res.data) {
                setSearchedList(res.data?.data);

                
              } else {
                setSearchedList([]);
              }
            });
          }
        }, 500);
        return () => clearTimeout(clear);
      } else if (longLat?.longitude) {
        Calls.requestPost(location.state?.apiName, longLat).then((res) => {
          if (res.data) {
            setSearchedList(res.data?.data); 
          } else {
            setSearchedList([]);
          }
        });
      } else {
        setSearchedList([]);
      }
    },
    [location.state.name]
  );
  useEffect(() => {
      navigate("/restaurant-list", {
        replace: true,
        state: { ...location.state, name: "" },
      });
  }, [navigate]);

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
            Restaurant list
          </li>
        </ol>
      </nav>
      <section className="my-5 partners chains">
        <div className="container-fluid">
          <div className="row justify-content-center px-4">
            <h4>{location.state?.restaurantType}</h4>
            {searchedList?.length > 0 ? (
              searchedList.map((item2) => {
                return (
                  <div class="col-md-3">
                    <Link
                      to={`${
                        item2?.openNow ? "/restaurant?id=" + item2?._id : "#"
                      }`}
                    >
                      <div className="restrocard">
                        {item2?.offers?.length > 0 && (
                          <span className="off">
                            <BiSolidOffer size={20} />
                            <span className="ms-1">
                              {
                                item2?.offers?.reduce(
                                  (max, obj) =>
                                    obj.offerValue > max.offerValue ? obj : max,
                                  item2?.offers[0]
                                ).offerValue
                              }
                              % off
                            </span>
                          </span>
                        )}
                        <span className="promoted">
                          <FaClock className="text-pink me-1" />{" "}
                          {item2?.openingTime} - {item2?.closingTime}
                        </span>
                        <img
                          src={item2?.openNow ? item2?.heroImage?.url : closed}
                          alt=""
                          className={`img-fluid imgFixed`}
                        />
                        <span className="distance">
                          <FaLocationDot size={15} className="text-voilet" />
                          <span className="ms-1">
                            {item2?.distanceKM?.toFixed(1)} km
                          </span>
                        </span>
                        <div className="d-flex justify-content-around pt-2">
                          <div>
                            <p className="restroname mb-0 ">{item2.name}</p>
                            <p className="menu-p">{item2?.address}</p>
                          </div>
                          <div>
                            {" "}
                            <p className="text-pink fw-bold">
                              {!item2?.openNow && "Closed"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="restroreview mb-1">
                              <span>{item2?.rating}</span>{" "}
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
              })
            ) : (
              <DataNotFound />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Restaurant_List;

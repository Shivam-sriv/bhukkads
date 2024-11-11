import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import filterimg from "../assets/images/home/filter.png";
import { MdOutlineArrowDropDown } from "react-icons/md";
const Filter = ({restaurantFilter}) => {
  const [filterType,setFilterType] = useState("with5Km")

  
  function handleLocationClick(type) {
    if (navigator?.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setFilterType(type)
          restaurantFilter(position.coords.latitude, position.coords.longitude,type)
        }, (error) => {
            console.log("error");
        });
    } else {
        console.log("Geolocation not supported");
    }
}

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 col-4 pe-0">
            <div className="filter-card filer-btn my-1 d-flex justify-content-evenly">
              <span>
                <img src={filterimg} alt="" className="img-fluid" />
              </span>
              <span className="align-self-center">Filter</span>{" "}
              <span className="align-self-center">
                <MdOutlineArrowDropDown className=" fs-5" />
              </span>
            </div>
          </div>
          <div className="col-md-11 col-8  pe-0 pt-2px">
            <OwlCarousel
              className="owl-theme"
              // loop
              margin={10}
              autoplaySpeed={2000}
              autoplay={true}
              responsiveClass={true}
              responsive={{
                0: { items: 2, nav: false },
                768: { items: 7, nav: false },
                990: { items: 10, nav: false },
              }}
              dots={false}
              nav
            >
              <div class="item" onClick={()=>handleLocationClick("with5Km")}>
                <div class={`filter-card my-1 cPointer ${filterType==="with5Km" && "filterStyle"}`}>
                  <span>With 5 KM</span>
                </div>
              </div>
              <div class="item" onClick={()=>handleLocationClick("rating4")}>
                <div class={`filter-card my-1 cPointer ${filterType==="rating4" && "filterStyle"}`}>
                  <span>Rating 4+</span>
                </div>
              </div>
              <div class="item" onClick={()=>handleLocationClick("openNow")}>
                <div class={`filter-card my-1 cPointer ${filterType==="openNow" && "filterStyle"}`}>
                  <span>Open Now</span>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;

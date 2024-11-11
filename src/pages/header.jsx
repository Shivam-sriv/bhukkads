import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { IoCartOutline } from "react-icons/io5";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../assets/images/logo/logo.png"
import logoword from "../assets/images/logo/logo-word.png"
import { FaSearch, FaHandPointer } from "react-icons/fa";
import { FaCartShopping, FaLocationArrow } from "react-icons/fa6";
import { BiDish } from "react-icons/bi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Login from "../components/login";
import Location from '../components/location';
import Add_Restaurant from '../components/add-restaurant';
import { UserContext } from '../provider-data/UserData';
import Profile_Dropdown from '../components/profile-dropdown';
import profileimg from "../assets/images/others/Profile.png"
import { CartContext } from '../provider-data/CartCount';
import Dropdown from 'react-bootstrap/Dropdown';
import { getLangLat } from '../utils/location';
import {Calls } from '../utils/call';
import { api } from '../urls';
const Header = () => {
const navigate = useNavigate()
const { globalInfo } = useContext(UserContext)
const {cartList,fetchCartData} = useContext(CartContext)
const [loginShow, setLoginShow] = useState(false);
const [addressPopup, setAddressPopup] = useState(false);
const [locationShow, setLocationShow] = useState(false);
const [searchValue, setSearchValue] = useState("")
const [userDetail, setUserDetail] = useState({})
const [currentAddress, setCurrentAddress] = useState({})
const [latLong,setLatLong] = useState({})
useEffect(() => {
let token = localStorage.getItem("token")
let user = localStorage.getItem("user")
fetchCartData()
fetchAddress()
if (user!==null) {
let parsed = JSON.parse(user)
setUserDetail(parsed)
} else if (globalInfo) {
setUserDetail(globalInfo)
}
}, [globalInfo])
const fetchAddress =async () =>{
let res = await getLangLat(setLatLong)
console.log("==err===",res);
setCurrentAddress(res)
}
const searchDishOrRestaurant = async (e) => {
let value = e.target.value?.trim()
setSearchValue(e.target.value.trim())
if (value) {
navigate("/restaurant-list", { state: { name: value,latLong } })
}
}
return (
<>
<Navbar expand="lg" className="bg-body-tertiary py-0 position-sticky top-0 bg-white shadow-nav">
  <Container fluid>
    <Navbar.Brand className="py-0 d-flex">
      <div>
        <img src={logo} alt="" className="img-fluid mx-2em" /> 
        <Link to="/" className='align-self-center'>
        <img src={logoword} alt="" className="img-fluid max-sm-8" /></Link>
      </div>
      <div> </div>
    </Navbar.Brand>
    <Link  to={`${ "/restaurant?id=" + cartList?.restaurantID}`} className=" align-self-center d-block d-lg-none ms-4" >
    <IoCartOutline className='fs-1 text-cblue'/>
    <Badge className='bg-pink text-white cart-badge'>{cartList?.dishes?.length} </Badge>
    </Link> 
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll" className="">
      <Nav className="w-75 w-smc-100 d-flex justify-content-evenly my-2 my-lg-0 ">
        <Form className="d-flex" id="search-wrapper">
          <BiDish className="search-icon" size={40} />
          <Form.Control
            id="search"
            type="search"
            placeholder="Search for Cuisine..."
            className=""
            aria-label="Search"
            value={searchValue}
            onChange={searchDishOrRestaurant}
            />
          <FaSearch className="search-button" size={20} />
        </Form>
        <Nav  className="py-0 mt-3 mt-lg-0 cPointer" onClick={() =>
          setLocationShow(true)}>
          <div className="d-flex">
            <div className="align-self-center me-3">
              <FaLocationArrow />
            </div>
            <div className="">
              <p className="text-pink mb-0 fs-12">Dine-in</p>
              <p className="text-cblue fs-14 mb-0">
                {currentAddress?.postcode} {currentAddress?.village}, {currentAddress?.state_district}, {currentAddress?.state}
                <span >
                  <MdOutlineArrowDropDown className="text-pink fs-5" />
                </span>
              </p>
            </div>
          </div>
        </Nav>
      </Nav>
      <Nav className="w-32 w-smc-100 d-flex justify-content-around header-nav">
        <Nav.Link className="text-cblue align-self-center asc-none fs-14" onClick={() => setAddressPopup(true)}>Add  restaurant</Nav.Link>
        <Link  to={`${ "/restaurant?id=" + cartList?.restaurantID}`} className=" align-self-center d-none d-lg-block" >
        <IoCartOutline className='fs-3 text-cblue'/>
        <Badge className='bg-pink text-white cart-badge'>{cartList?.dishes?.length ||0} </Badge>
        </Link>  
        {userDetail?.name ?  
        <Nav.Link className="nav-item dropdown pe-3">
          <Dropdown>
            <Dropdown.Toggle className="nav-link nav-profile d-flex align-items-center pe-0" id="dropdown-basic">
              <img src={profileimg} alt="Profile" className="rounded-circle profile"/>
              <span className="d-none d-md-block  ps-2"></span>
            </Dropdown.Toggle>
            {/* ======Profile Dropdown ======= */}
            <Profile_Dropdown />
            {/* ======Profile Dropdown end======= */}
          </Dropdown>
        </Nav.Link>
        :  
        <Nav.Link onClick={() => setLoginShow(true)} className="text-pink fw-bold">Log in</Nav.Link>
        }
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Login show={loginShow} setShow={setLoginShow} />
<Location show={locationShow} setShow={setLocationShow} />
<Add_Restaurant show={addressPopup} setShow={setAddressPopup} />
</>
)
}
export default Header;
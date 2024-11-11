import React, { useContext, useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { FiLogOut, FiUser } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineClipboardList } from "react-icons/hi";
import { UserContext } from "../provider-data/UserData";

const Profile_Dropdown = () => {
  const { logoutUser,globalInfo } = useContext(UserContext)
  const [userDetail,setUserDetail] = useState({})

  useEffect(() => {
    let token = localStorage.getItem("token")
    let user = localStorage.getItem("user")
    console.log("user", user);
    if (user) {
      let parsed = JSON.parse(user)
      setUserDetail(parsed)
    } else if (globalInfo) {
      setUserDetail(globalInfo)
    }
  }, [globalInfo])

  return (

    <>

      <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <Dropdown.Item href="#/action-1" className='dropdown-header'><h6>{userDetail?.name}</h6>
        </Dropdown.Item>
        <Dropdown.Item  className='border-top'> <Link className="dropdown-item d-flex align-items-center ps-0" to="/order-and-history">
          <HiOutlineClipboardList className='me-3 text-bluec fs-6' />
          <span>Orders & History</span>
        </Link></Dropdown.Item>
        <Dropdown.Item  className='border-top'><Link className="dropdown-item d-flex align-items-center ps-0" to="/profile-account">
          <CiSettings className="me-3 text-bluec fs-6" />
          <span>Account Settings</span>
        </Link></Dropdown.Item>
        <Dropdown.Item  className='border-top ' onClick={logoutUser}>  
          <FiLogOut className='me-3 text-bluec fs-6' />
          <span>Sign Out</span>
        </Dropdown.Item>
      </Dropdown.Menu>

    </>
  )
}

export default Profile_Dropdown
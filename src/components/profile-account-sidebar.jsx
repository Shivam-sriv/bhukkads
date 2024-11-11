import React from "react";
import profile from "../assets/images/others/Profile.png";
import { Link } from "react-router-dom";
import { FaChevronCircleRight, FaUserAlt } from "react-icons/fa";
import { FaChevronRight, FaLocationDot } from "react-icons/fa6";

const Profile_Account_Sidebar = () => {
    return (


        <>
            <div className="sidebar-profile p-3 rounded">

                <div className="profile text-center">
                    <img src={profile} alt="" className="img-fluid" />
                    <p className="fs-12 text-black fw-600">Lorem Ipsum</p>
                </div>
                <div className="tab-container bg-white  rounded">
                    <h6 className="p-3">General</h6>
                    <hr />
                    <ul className="list-unstyled p-3">
                        <li>
                            <Link to="" className="text-decoration-none">
                                <div className="row justify-content-center">
                                    <div className="col-1 align-self-center">
                                        <FaUserAlt className="icon-color" />
                                    </div>
                                    <div className="col-10 ps-4">
                                        <p className="text-bluec mb-1 fw-600">Account information</p>
                                        <p className="fs-12 mb-1 link-des">Change your Account information</p>
                                    </div>
                                    <div className="col-1 align-self-center ps-1">
                                        <FaChevronRight className="icon-color" />
                                    </div>
                                </div>

                            </Link>
                            <hr />
                        </li>
                        <li>
                            <Link to="" className="text-decoration-none">
                                <div className="row justify-content-center">
                                    <div className="col-1 align-self-center">
                                        <FaLocationDot className="icon-color" />
                                    </div>
                                    <div className="col-10 ps-4">
                                        <p className="text-bluec mb-1 fw-600">Dine-in Locations</p>
                                        <p className="fs-12 mb-1 link-des">Change your Delivery Locations</p>
                                    </div>
                                    <div className="col-1 align-self-center ps-1">
                                        <FaChevronRight className="icon-color" />
                                    </div>
                                </div>
                            </Link>
                            <hr />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Profile_Account_Sidebar
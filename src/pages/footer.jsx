import React, { useState } from "react";
import logosm from "../assets/images/logo/logo.png";
import logow from "../assets/images/logo/logo-word.png";
import gplay from "../assets/images/home/gplay.png";
import appstore from "../assets/images/home/appstore.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import Add_Restaurant from '../components/add-restaurant';
import { FaXTwitter } from "react-icons/fa6";
import menugif from "../assets/images/restaurant/menu.gif";
const Footer = () => {
    const [addrestroShow, setAddrestroShow] = useState(false);
    return (

        <>
            <section className="footer mt-5">

                <div className="footer-app">

                    <div className="container-lg">


                        <div className="row  ">
                            <div className="col-lg-6 col-md-12">
                                <h3 className="text-white fw-bold line-h-40">For better experience,<br />
                                    download the Bhukkads app now.</h3>
                            </div>
                            <div className="col-lg-6 col-md-12 align-self-center footer-link d-flex justify-content-evenly">
                                <Link> <img src={gplay} alt="" className="img-fluid" /></Link>
                                <Link> <img src={appstore} alt="" className="img-fluid" />



                                </Link>





                            </div>



                        </div>
                    </div>
                </div>
                <div className="footer-nav">
                    <div className="container-lg">
                        <div className="row">
                            <div className="col-md-4 d-flex">
                                <div className="">
                                    <img src={logosm} alt="" className="img-fluid" />
                                </div>
                                <div className="align-self-center pt-2">
                                    <img src={logow} alt="" className="img-fluid img2" />
                                    <p className="text-black mb-0 fs-10">© 2024 Copyright: Bhukkads.in. All Rights Reserved</p>
                                </div>
                            </div>
                            <div className="col-md-2 mt-lg-0 mt-4">
                                <h6 className="fw-bold">Company</h6>
                                <Link className=" text-decoration-none" to="/about-us">About us </Link>


                            </div>
                            <div className="col-md-2  mt-lg-0 mt-4">
                                <h6 className="fw-bold">Contact</h6>
                                <Link className=" text-decoration-none" to="/profile-account">Help & Support</Link>
                                <Link href="" className="  text-decoration-none" onClick={() => setAddrestroShow(true)}>Partner with us </Link>
                                <Link className=" text-decoration-none" to="/contact">Contact Us</Link>

                            </div>
                            <div className="col-md-2 align-self-center mt-lg-0 mt-4">
                                <h6 className="fw-bold">Legal</h6>
                                <Link to="/privacy-policy" className=" text-decoration-none">Privacy Policy </Link>
                                <Link to="/term-and-conditions" className=" text-decoration-none">Term & Condition</Link>
                                <Link to="refund-and-cencellation" className=" text-decoration-none">Refund & Cancellations</Link>

                            </div>
                            <div className="row justify-content-center  social-footer py-4 border-top mt-5">
                                <div className="col-md-6 col-lg-3 ">

                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0 fw-bold align-self-center">Follow us on:</h6>
                                        <a href=" https://www.facebook.com/bhukkadsindia2021" target="_blank" className=""><FaFacebookF size={20} /></a>
                                        <a href=" https://www.instagram.com/bhukkads.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className=""><FaInstagram size={20} /></a>
                                        <a href="https://www.linkedin.com/company/bhukkadsindia2021" className="" target="_blank"><FaLinkedinIn size={20} /></a>
                                        <a href="https://www.linkedin.com/company/bhukkadsindia2021" className="" target="_blank"><FaXTwitter size={20} /></a>


                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <Add_Restaurant show={addrestroShow} setShow={setAddrestroShow} />

            </section>



        </>
    )
}


export default Footer
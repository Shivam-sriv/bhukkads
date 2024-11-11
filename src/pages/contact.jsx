import React from "react";
import { Link, useNavigate } from "react-router-dom";
import who from "../assets/images/others/weare.jpg";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot, FaX } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
const Contact = () => {
const naviage = useNavigate()
const goSupportPage = () => {
naviage("/profile-account", { state: { isSupport: true } })
}
return (
<>
<nav aria-label="breadcrumb " className="mt-2 mb-5 ps-2">
  <ol className="breadcrumb">
    <li className="breadcrumb-item fs-12">
      <Link to="/" className="text-grayc text-decoration-none">
      Home</Link>
    </li>
    <li className="breadcrumb-item active text-black fs-12" aria-current="page">Contact Us</li>
  </ol>
</nav>
<section className="my-5 contact">
  <div className="container">
    <div className="row  px-4 ">
      <div className="col-12">
        <div className="s1">
          <h5 className="text-pink">We're Here to Help!</h5>
          <p className="text-justify">At Bhukkads, we believe in making your dining experience as seamless as possible. Whether you have questions about our services, need assistance with preordering, or have any other inquiries, we're here to help. <span className="support-link cPointer text-primary" onClick={goSupportPage}>Support</span></p>
        </div>
        <div className="s1 my-4">
          <h5 className="text-pink">Get in Touch</h5>
          <div className="d-flex">
            <div className="icon me-3">
              <MdMail className="fs-2 text-heroc" />
            </div>
            <div className="content align-self-center">
              <b className="me-2">Email:</b> <a href="mailto:support@bhukkads.in">support@bhukkads.in</a>, <a href="mailto:bhukkadsindia@gmail.com">bhukkadsindia@gmail.com</a>
            </div>
          </div>
          <div className="d-flex">
            <div className="icon me-3">
              <FaPhoneAlt className="fs-2 text-heroc" />
            </div>
            <div className="content align-self-center">
              <b className="me-2">Phone: </b> <a href="tel:70000 17917">+91 70000 17917</a>
            </div>
          </div>
          <div className="d-flex">
            <div className="icon me-3">
              <FaLocationDot className="fs-2 text-heroc" />
            </div>
            <div className="content align-self-center">
              <b className="me-2">Address: </b> Bhukkads Facility Services Pvt. Ltd. HQ, 43/037 RING ROAD NO-2,
              VASUNDHARA NAGAR,BILASPUR(C.G.)-495001
            </div>
          </div>
        </div>
        <div className="s3 my-4">
          <h5 className="text-pink">Preorder Assistance</h5>
          <p className="text-justify">For any issues or questions related to preordering, please reach out to our customer support team via email or phone. We're available 24x7.</p>
        </div>
        <div className="s4 my-4">
          <h5 className="text-pink">Contactless Dining Support</h5>
          <p className="text-justify">Have any questions about our contactless dining process? Whether it’s about making payments, navigating the menu, or any other concerns, we’re here to guide you. Feel free to drop us a line!</p>
        </div>
        <div className="s5 my-4">
          <h5 className="text-pink">Feedback</h5>
          <p className="text-justify">We value your feedback! If you have any suggestions or feedback about our services, please let us know. We’re always looking to improve and would love to hear from you.</p>
        </div>
        <div className="s6 my-4">
          <h5 className="text-pink">Social Media</h5>
          <p className="text-justify">Stay connected with us on social media for the latest updates, offers, and more!</p>
          <div className="d-flex mb-4">
            <div className="icon me-3">
              <a href="https://www.facebook.com/bhukkadsindia2021" target="_blank" >
                <FaFacebook className="fs-2 text-heroc" />
              </a>
            </div>
            <div className="icon me-3">
              <a href="https://www.instagram.com/bhukkads.in" target="_blank" >
                <FaInstagram className="fs-2 text-heroc" />
              </a>
            </div>
            <div className="icon me-3">
              <a href="https://x.com/BhukkadsIndia" target="_blank">
                <FaX className="fs-2 text-heroc" />
              </a>
            </div>
          </div>
          <p>If you need any additional sections or information, feel free to let me know!</p>
        </div>
      </div>
    </div>
  </div>
</section>
</>
)
}
export default Contact
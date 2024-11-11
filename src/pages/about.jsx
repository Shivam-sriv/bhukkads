import React from "react";
import { Link } from "react-router-dom";
import who from "../assets/images/others/weare.jpg";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
const About = () => {
  return (
    <>
      <nav aria-label="breadcrumb " className="mt-2 mb-5 ps-2">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fs-12"><Link to="/" className="text-grayc text-decoration-none">Home</Link></li>
          <li className="breadcrumb-item active text-black fs-12" aria-current="page">About Us</li>
        </ol>
      </nav>
      <section className="my-5 about">
        <div className="container">
          <div className="row  px-4 flex-wrap-reverse">
            <div className="col-md-6 mt-4 mt-lg-0">
              <h2 className="text-pink">Who are we?</h2>
              <p className="text-justify">Launched in (date) (month) 2024, Our technology platform connects customers and restaurant partners, serving their multiple needs. Customers use our platform to search and discover restaurants, read and write customer generated reviews and view and upload photos, pre-order food, order food using digital menu,  and make payments while dining-out at restaurants. On the other hand, we provide restaurant partners with industry-specific marketing tools which enable them to engage and acquire customers to grow their business.</p>
            </div>
            <div className="col-md-6">

              <img src={who} alt="" className="img-fluid img" />

            </div>
          </div>
          <div className="row  px-4 mt-lg-5 mt-0 pt-5 ">
            <div className="col-md-6">

              <img src={who} alt="" className="img-fluid img" />

            </div>
            <div className="col-md-6 mt-4 mt-lg-0">
              <h2 className="text-pink">Our Mission</h2>
              <p className="text-justify">Bhukkads is a startup platform that empowers entrepreneurs and small businesses with restaurants by providing full stack technology that increases earnings and eases operations. Bringing affordable and trusted accommodation that guests can book instantly.</p>
              <p className="text-justify">Pre-ordering food can save huge time for the new upcoming generations, business officials as well as the travellers travelling from one place to another.</p>
            </div>

          </div>

          <div className="row px-4">
            <div className="col-12">
              <h2 className="text-pink text-center my-5">Founder’s info  </h2>
              <div class="team-section">
                <div class="team-member">
                  <img src="https://cutt.ly/Hwn6Y0NL" alt="Team Member 1" />
                  <h5>Anmol Dodeja</h5>
                  <p class="role">Founder and CEO</p>
                  <a href="#" class="fa"><FaFacebook /></a>
                  <a href="#" class="fa"><FaX /></a>
                  <a href="#" class="fa"><FaLinkedinIn /></a>
                </div>
                <div class="team-member">
                  <img src="https://cutt.ly/Hwn6Y0NL" alt="Team Member 2" />
                  <h5>Rakesh Dodeja</h5>
                  <p class="role">Founder & Director</p>
                  <a href="#" class="fa"><FaFacebook /></a>
                  <a href="#" class="fa"><FaX /></a>
                  <a href="#" class="fa"><FaLinkedinIn /></a>
                </div>
                <div class="team-member">
                  <img src="https://cutt.ly/Hwn6Y0NL" alt="Team Member 3" />
                  <h5>Sanskar Tahlani</h5>
                  <p class="role">Operations Head</p>
                  <a href="#" class="fa"><FaFacebook /></a>
                  <a href="#" class="fa"><FaX /></a>
                  <a href="#" class="fa"><FaLinkedinIn /></a>
                </div>
                <div class="team-member">
                  <img src="https://cutt.ly/Hwn6Y0NL" alt="Team Member 3" />
                  <h5>Mihir Goyal</h5>
                  <p class="role">CMO (Chief Marketing Officer)</p>
                  <a href="#" class="fa"><FaFacebook /></a>
                  <a href="#" class="fa"><FaX /></a>
                  <a href="#" class="fa"><FaLinkedinIn /></a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


    </>
  )
}


export default About
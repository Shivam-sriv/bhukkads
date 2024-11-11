import React, { useContext, useEffect, useState } from "react";
import { MdMail } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Accordion from 'react-bootstrap/Accordion';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaBell, FaStar, FaBook, FaPhoneAlt } from "react-icons/fa";
import user from "../assets/images/others/Profile.png";
import { Link, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaChevronRight, FaLocationDot } from "react-icons/fa6";
import { MdHistory, MdLogout } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { UserContext } from "../provider-data/UserData";
import {Calls, successToast } from "../utils/call";
import { api } from "../urls";
import { validate } from "../utils/validation";
import { toast } from "react-toastify";
const initialValue ={
name:"",
phoneNo:"",
email:"",
image:""
}
const Profile_Account = () => {
const { logoutUser } = useContext(UserContext)
const location = useLocation()
const [formData,setFormData] = useState(initialValue)
const [formError,setFormError] = useState({})
const [profileData,setProfileData] = useState({})
const [tabIndex, setTabIndex] = useState(location?.state?.isSupport ? 5 :0);
useEffect(()=>{
const token = localStorage.getItem("token")
if(token){
getProfileData()
}
},[])
const getProfileData =async ()=>{
let res = await Calls.requestGet(api.getProfile)
if(res.data){
// setProfileData(res.data?.data)
formData.phoneNo=res.data?.data?.phoneNo
formData.email=res.data?.data?.email
formData.name=res.data?.data?.name
setFormData({...formData})
setProfileData(res.data?.data)
}
}
const changeHandler = (e)=>{
console.log("e.target",e.target.type);
let {name,value,type} = e.target
setFormData({...formData,[name]:value})
if(type=="file"){
setFormData({...formData,[name]:e.target.files[0]})
}
if(value && name==="phoneNo" && value?.length<11){
setFormData({...formData,[name]:value})
}
}
const submitData =async (e)=>{
e.preventDefault()
if(!formData?.name){
toast.error("Name is required..")
return
}
if(!formData?.email){
toast.error("Email is required..")
return
}
if(!formData?.phoneNo){
toast.error("Phone Number is required..")
return
}
let error ={}
if(formData?.image){
error =  validate(formData)
}else{
delete formData?.image
}
if(!error?.isError){
let formBody = new FormData();
formBody.append("name", formData.name);
formBody.append("email", formData.email);
formBody.append("phoneNo", formData.phoneNo);
formBody.append("image", formData?.image);
const res = await Calls.requestPost(api.updateProfile,formBody)
if(res?.data){
successToast(res)
getProfileData()
}
}else{
setFormError(error?.error)
toast.error("Only Image accepted..")
}
} 
return (
<>
<section className="my-5 profile-account">
  <div className="account-main ">
    <div className="container-fluid px-lg-4 px-md-0">
      {/* =================Tabs================ */}
      <Tabs selectedIndex={tabIndex} onSelect={(index) =>
        setTabIndex(index)}>
        <div className="row mt-4 justify-content-around align-items-stretch">
          <div className="col-md-5 col-lg-3 sidebar-profile p-3 rounded">
            <div className="account-detail text-center">
              <div className=" my-image">
                <img src={profileData?.userImage?.url} alt="" className="img-fluid" />
              </div>
              <h5 className="mt-3">Lorem Ipsum</h5>
            </div>
            <TabList className="d-grid ps-0 account-list mt-4">
              <div className="tab-container bg-white  rounded pb-2">
                <h6 className="p-3 mb-0 bb">General</h6>
                <Tab>
                  <div className="row justify-content-center py-3 bb ps-1">
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
                </Tab>
                <Tab >
                  <div className="row justify-content-center py-3 bb ps-1">
                    <div className="col-1 align-self-center">
                      <FaLocationDot className="icon-color" />
                    </div>
                    <div className="col-10 ps-4">
                      <p className="text-bluec mb-1 fw-600">Locations</p>
                      <p className="fs-12 mb-1 link-des">Change your Delivery Locations</p>
                    </div>
                    <div className="col-1 align-self-center ps-1">
                      <FaChevronRight className="icon-color" />
                    </div>
                  </div>
                </Tab>
                <Tab>
                  <div className="row justify-content-center py-3 bb ps-1">
                    <div className="col-1 align-self-center">
                      <FaBell className="icon-color" />
                    </div>
                    <div className="col-10 ps-4">
                      <p className="text-bluec mb-1 fw-600">Notifications</p>
                      <p className="fs-12 mb-1 link-des">You will receive daily update</p>
                    </div>
                    <div className="col-1 align-self-center ps-1">
                      <FaChevronRight className="icon-color" />
                    </div>
                  </div>
                </Tab>
                <Tab>
                  <Link to="/order-and-history" className="text-decoration-none">
                  <div className="row justify-content-center py-3 bb ps-1">
                    <div className="col-1 align-self-center">
                      <MdHistory className="icon-color fs-4" />
                    </div>
                    <div className="col-10 ps-4">
                      <p className="text-bluec mb-1 fw-600">Order & History</p>
                      <p className="fs-12 mb-1 link-des">You will receive daily update</p>
                    </div>
                    <div className="col-1 align-self-center ps-1">
                      <FaChevronRight className="icon-color" />
                    </div>
                  </div>
                  </Link>
                </Tab>
                <Tab>
                  <div className="row justify-content-center py-3 bb ps-1">
                    <div className="col-1 align-self-center">
                      <FaBook className="icon-color" />
                    </div>
                    <div className="col-10 ps-4">
                      <p className="text-bluec mb-1 fw-600">FAQ</p>
                      <p className="fs-12 mb-1 link-des">Frequently Asked Questions</p>
                    </div>
                    <div className="col-1 align-self-center ps-1">
                      <FaChevronRight className="icon-color" />
                    </div>
                  </div>
                </Tab>
                <Tab>
                  <div className="row justify-content-center py-3 ps-1">
                    <div className="col-1 align-self-center">
                      <BiSupport className="icon-color" />
                    </div>
                    <div className="col-10 ps-4">
                      <p className="text-bluec mb-1 fw-600">Support</p>
                      <p className="fs-12 mb-1 link-des">24*7 support</p>
                    </div>
                    <div className="col-1 align-self-center ps-1">
                      <FaChevronRight className="icon-color" />
                    </div>
                  </div>
                </Tab>
              </div>
              <div className="tab-container bg-white  rounded mt-3">
                <Link to="/" className="text-decoration-none">
                <div className="row justify-content-center p-3">
                  <div className="col-1 align-self-center">
                    <MdLogout className="icon-color" />
                  </div>
                  <div className="col-10 ps-4" onClick={logoutUser}>
                    <p className="text-bluec mb-1 fw-600">Logout</p>
                  </div>
                  <div className="col-1 align-self-center ps-1">
                    <FaChevronRight className="icon-color" />
                  </div>
                </div>
                </Link>
              </div>
            </TabList>
          </div>
          {/* =================Tabs end================ */}
          <div className="col-md-7 col-lg-8 detail-info ">
            {/* =================BASIC INFORMATION================ */}
            <TabPanel>
              <h4>BASIC INFORMATION</h4>
              <hr className="mt-0" />
              <Form onSubmit={submitData}>
                <div className="row ">
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="p1">
                      <Form.Label> Name </Form.Label>
                      <Form.Control type="text" name="name" value={formData.name} onChange={changeHandler} placeholder="" />
                      <small className='text-danger'>{formError?.name}</small>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="p2">
                      <Form.Label>Email Id</Form.Label>
                      <Form.Control type="email"name="email" value={formData.email} onChange={changeHandler} placeholder="info@example.com" />
                      <small className='text-danger'>{formError?.email}</small>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="p3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control type="text" name="phoneNo" value={formData.phoneNo} onChange={changeHandler} placeholder=" +91" />
                      <small className='text-danger'>{formError?.phoneNo}</small>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3" controlId="p4">
                      <Form.Label>Profile Picture</Form.Label>
                      <Form.Control type="file" accept="image/*"  name="image"  onChange={changeHandler}/>
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="my-3" controlId="p4">
                  <button className="btn btn-custom" type="submit" role="button">Save changes</button>
                </Form.Group>
              </Form>
            </TabPanel>
            {/* =================BASIC INFORMATION End================ */}
            {/* =================ADDRESS================ */}
            <TabPanel>
              <h4>LOCATIONS</h4>
              <hr className="mt-0" />
              <div className="billing-details">
                <div className="billing-address">
                  <div className="billing-address-detail ">
                    <div class="form-check mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        />
                      <label
                        class="form-check-label fw-bold"
                        for="flexRadioDefault1"
                        >
                      Home
                      </label>
                    </div>
                    <div className="billing-fulladdress ps-4 fs-12 text-justify">
                      <p>
                        C.P.-61, Viraj Khand-4, Viraj Khand, Gomti Nagar,
                        Lucknow near sanjivani hospital
                      </p>
                    </div>
                  </div>
                  <div className="billing-address-detail">
                    <div class="form-check mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        />
                      <label
                        class="form-check-label fw-bold"
                        for="flexRadioDefault1"
                        >
                      Office
                      </label>
                    </div>
                    <div className="billing-fulladdress ps-4 fs-12 text-justify">
                      <p>
                        C.P.-61, Viraj Khand-4, Viraj Khand, Gomti Nagar,
                        Lucknow near sanjivani hospital
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            {/* =================ADDRESS End================ */}
            {/* =================Notifications================ */}
            <TabPanel>
              <div className="d-flex justify-content-between">
                <div className="align-self-center">
                  <h4 className="text-uppercase">Notifications</h4>
                </div>
                <div class="checkbox-wrapper-5">
                  <div class="check">
                    <input id="check-5" type="checkbox" />
                    <label for="check-5"></label>
                  </div>
                </div>
              </div>
              <hr className="mt-0" />
              <div className="my-notifications  mt-5">
                <p>Stay updated with the latest news and updates by enabling notifications. Click the notification button to receive timely alerts directly to your device, ensuring you never miss out on important information and announcements.</p>
              </div>
            </TabPanel>
            {/* =================Notifications End================ */}
            {/* =================orders and history================ */}
            <TabPanel>
            </TabPanel>
            {/* =================orders and history End================ */}
            {/* =================faq================ */}
            <TabPanel>
              <div className="faq">
                <h4>Frequently Asked Questions (FAQs)</h4>
                <hr className="mt-0" />
                <p>Welcome to Bhukkads! Below are some of the most common questions we receive about our pre ordering and contactless dining services. If you don't find the answer to your question here, feel free to contact us.</p>
                <div className="row  mt-5 justify-content-center">
                  <div className="col-md-8 ">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>1. What is Bhukkads?</Accordion.Header>
                        <Accordion.Body>
                          Bhukkads is a platform designed to enhance your dining experience by allowing you to pre order meals and enjoy contactless dining. Whether you're dining in or getting food delivered, we make the process quick, easy, and safe.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>2. How does the pre ordering process work?</Accordion.Header>
                        <Accordion.Body>
                          With Bhukkads, you can browse the menu of participating restaurants on our website, place your order in advance, and choose your preferred pickup or arrival time. This way, your food is ready when you are!
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>3. What is contactless dining?</Accordion.Header>
                        <Accordion.Body>
                          Contactless dining is a safe and convenient way to enjoy your meal at a restaurant without direct interaction with staff. You can view the menu, place your order, and make payments through our platform, all from your smartphone. Your food will be delivered to your table without the need for physical menus, cash, or cards.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>4. How do I make a payment?</Accordion.Header>
                        <Accordion.Body>
                          Payments can be made directly through our platform using credit/debit cards, mobile wallets, or UPI. We use secure payment gateways to ensure your information is protected
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4">
                        <Accordion.Header>5. Is there a service fee for using Bhukkads?</Accordion.Header>
                        <Accordion.Body>
                          There may be a small service fee for using our platform, which helps us maintain and improve our services. Any applicable fees will be clearly displayed before you confirm your order.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="5">
                        <Accordion.Header>6. Can I modify or cancel my order?</Accordion.Header>
                        <Accordion.Body>
                          Yes, you can modify or cancel your order, but it depends on how far along the preparation process is. Please check your order status in your account and contact us immediately if you need to make changes.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="6">
                        <Accordion.Header>7. How do I know if my order has been confirmed?</Accordion.Header>
                        <Accordion.Body>
                          Once your order is placed, you'll receive an email or SMS confirmation with all the details. You can also check your order status on the Bhukkads website under "My Orders."
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="7">
                        <Accordion.Header>8. What if I have dietary restrictions or allergies?</Accordion.Header>
                        <Accordion.Body>
                          We encourage you to review the menu carefully and specify any dietary restrictions or allergies when placing your order. If you have any concerns, please contact the restaurant directly or you can contact our support team.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="8">
                        <Accordion.Header>9. What safety measures are in place for contactless dining?</Accordion.Header>
                        <Accordion.Body>
                          Bhukkads is committed to your safety. We ensure that all partner restaurants follow strict hygiene protocols, including regular sanitization and contactless food handling. Our platform allows for a fully contactless dining experience, from ordering to payment.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="9">
                        <Accordion.Header>10. How do I contact customer support?</Accordion.Header>
                        <Accordion.Body>
                          <p> If you need assistance, our customer support team is here to help. You can reach us via:</p>
                          <div className="d-flex">
                            <div className="icon me-3">
                              <MdMail className=" text-heroc" />
                            </div>
                            <div className="content align-self-center">
                              <b className="me-2">Email:</b> <a href="mailto:support@bhukkads.in">support@bhukkads.in</a>, <a href="mailto:bhukkadsindia@gmail.com">bhukkadsindia@gmail.com</a>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="icon me-3">
                              <FaPhoneAlt className="text-heroc" />
                            </div>
                            <div className="content align-self-center">
                              <b className="me-2">Phone: </b> <a href="tel:70000 17917">+91 70000 17917</a>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="10">
                        <Accordion.Header>11. Can I leave feedback or rate my experience?</Accordion.Header>
                        <Accordion.Body>
                          Yes! We value your feedback and encourage you to rate your dining experience and leave a review on our platform. This helps us improve our services and provide the best experience possible.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="11">
                        <Accordion.Header>12. Is my personal information safe?</Accordion.Header>
                        <Accordion.Body>
                          Absolutely. We prioritize your privacy and use advanced security measures to protect your personal information. Please refer to our 
                          <Link to="/privacy-policy" className="text-pink">
                          Privacy Policy</Link> for more details.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="12">
                        <Accordion.Header>13. How do I sign up?</Accordion.Header>
                        <Accordion.Body>
                          Signing up is easy! Simply visit our <span className="text-pink">Sign-Up </span> page, provide the required details, and you're all set to start preordering and enjoying contactless dining with Bhukkads.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </div>
            </TabPanel>
            {/* =================faq End================ */}
            {/* =================Notifications================ */}
            <TabPanel>
              <div className="">
                <div className="align-self-center">
                  <h4 className="text-uppercase">support</h4>
                </div>
              </div>
              <hr className="mt-0" />
              <div className="row  mt-5 justify-content-center">
                <div className="col-md-8 col-lg-6 shadow-support">
                  <Form className="p-4">
                    <Form.Group className="mb-3" controlId="p1">
                      <Form.Label>Your Name </Form.Label>
                      <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="p4">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control type="text" placeholder=" +91" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="p3">
                      <Form.Label>Email Id</Form.Label>
                      <Form.Control type="email" placeholder="info@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="p6">
                      <Form.Label>Message</Form.Label>
                      <textarea name="" id="" cols="20" rows="5" className="form-control"></textarea>
                    </Form.Group>
                    <Form.Group className="my-3 text-center" controlId="p4">
                      <button className="btn btn-custom" role="button">Submit</button>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </TabPanel>
            {/* =================Notifications End================ */}
          </div>
        </div>
      </Tabs>
    </div>
  </div>
</section>
</>
)
}
export default Profile_Account;
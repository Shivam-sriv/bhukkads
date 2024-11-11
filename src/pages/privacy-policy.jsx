import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return <>
  <nav aria-label="breadcrumb " className="mt-2 mb-5 ps-2">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item fs-12"><Link to="/" className="text-grayc text-decoration-none">Home</Link></li>
                    <li className="breadcrumb-item active text-black fs-12" aria-current="page">Privacy policy</li>
                </ol>
            </nav>
            <section className="my-5 contact">
                <div className="container">
                    <div className="row  px-4 ">
                        <div className="col-12">
                            <div className="s1">
                                <h5 className="text-pink">Introduction </h5>
                                <p className="text-justify">Welcome to Bhukkads! We at <b> Bhukkads Facility Services Private Limited </b>are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website,<a href="https://www.bhukkads.in/" target="_blank"> www.bhukkads.in </a></p>
                                <p>By using our website, you consent to the data practices described in this policy.</p>
                            </div>
                           
                            <div className="s3 my-4">
                                <h5 className="text-pink">Information We Collect : </h5>
                                <p className="text-justify"><h6 className="text-pink">Personal Information</h6> When you use our preordering and contactless dining services, we may collect personally identifiable information such as:</p>
                                <ul>
                                  <li>Name</li>
                                  <li>Email address</li>
                                  <li>Phone number</li>
                                  <li>Payment information</li>
                                </ul>
                            </div>
                            <div className="s4 my-4">
                            <h6 className="text-pink">Non-Personal Information </h6>
                                <p className="text-justify">We may also collect non-personal information such as: </p>
                                {/* <ul style={{listStyle:"none"}}> */}
                                  <div> - Browser type</div>
                                  <div> - IP address</div>
                                  <div> - Device information</div>
                                  <div> - Usage data (e.g., pages visited, time spent on the site)</div>
                                {/* </ul> */}
                            </div>
                            <div className="s5 my-4">
                            <h5 className="text-pink">How We Use Your Information</h5>
                                <p className="text-justify"><b>To Provide Our Services : </b> We use the information we collect to:</p>
                                <ul>
                                  <li>	Process your orders</li>
                                  <li>	Facilitate contactless dining</li>
                                  <li>Send you order confirmations and updates</li>
                                  <li>	Improve our website and services</li>
                                </ul>
                            </div>
                            <div className="s5 my-4">
                                <p className="text-justify"><b>For Communication : </b>We may use your contact information to:</p>
                                <ul>
                                  <li>	Send promotional offers and updates</li>
                                  <li>		Respond to your inquiries and support requests</li>
                                </ul>
                            </div>
                            <div className="s5 my-4">
                                <p className="text-justify"><b>For Security and Compliance : </b>We use your information to:</p>
                                <ul>
                                  <li>	Prevent fraud and unauthorized access</li>
                                  <li>		Comply with legal obligations</li>
                                </ul>
                            </div>
                            <div className="s5 my-4">
                            <h5 className="text-pink">How We Share Your Information</h5>
                                <p className="text-justify"><b>Third-Party Service Providers : </b>We may share your information with third-party service providers who assist us with:</p>
                                <ul>
                                  <li>	Payment processing</li>
                                  <li>	Delivery services</li>
                                  <li>	Email and SMS communication</li>
                                  <li>		Data analysis</li>
                                </ul>
                                <p className="text-justify">These third parties are obligated to protect your information and only use it for the purposes for which it was provided.</p>
                            </div>
                            <div className="s5 my-4">
                            <h5 className="text-pink">Legal Obligations</h5>
                                <p className="text-justify">We may disclose your information if required by law or to protect our rights, property, or safety</p>
                            </div>
                            <div className="s5 my-4">
                            <h5 className="text-pink">Cookies and Tracking Technologies</h5>
                                <p className="text-justify"><b>Cookies : </b> Our website uses cookies to improve your experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you use our site.</p>
                            </div>
                            <div className="s5 my-4">
                            <h5 className="text-pink">Analytics</h5>
                                <p className="text-justify">We may use third-party analytics tools (such as Google Analytics) to collect information about how visitors use our website. This information helps us improve our services and enhance user experience.</p>
                            </div>
                            <div className="s5 my-4">
                              <h5 className="text-pink">Data Security</h5>
                                <p className="text-justify">We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, please understand that no method of transmission over the Internet or method of electronic storage is completely secure.</p>
                            </div>
                            <div className="s5 my-4">
                            <h5 className="text-pink">Your Rights</h5>
                                <p className="text-justify"><b>Access and Correction : </b> You have the right to access the personal information we hold about you and to request corrections or updates.</p>
                            </div>
                            <div className="s5 my-4">
                                <p className="text-justify"><b>Opt-Out : </b>You can opt out of receiving promotional communications from us by following the unsubscribe instructions in our emails or contacting us directly.</p>
                            </div>
                            <div className="s5 my-4">
                                <p className="text-justify"><b>Data Deletion : </b>You may request the deletion of your personal information from our records. However, please note that we may need to retain certain information for legal or operational purposes.</p>
                            </div>
                            <div className="s5 my-4">
                              <h5 className="text-pink">Changes to This Privacy Policy</h5>
                                <p className="text-justify">We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our privacy practices.</p>
                            </div>
                            
                              
                            </div>
                        </div>

                    </div>

                
            </section>
  </>;
};

export default PrivacyPolicy
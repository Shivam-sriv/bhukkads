import React from "react";
import { Link } from "react-router-dom";

const TermAndCondition = () => {
    return <>

        <nav aria-label="breadcrumb " className="mt-2 mb-5 ps-2">
            <ol className="breadcrumb">
                <li className="breadcrumb-item fs-12"><Link to="/" className="text-grayc text-decoration-none">Home</Link></li>
                <li className="breadcrumb-item active text-black fs-12" aria-current="page">Term and conditions</li>
            </ol>
        </nav>
        <section className="my-5 contact">
            <div className="container">
                <div className="row  px-4 ">
                    <div className="col-12">
                        <div className="s1">
                            <h5 className="text-pink">Terms & Conditions</h5>
                            <p className="text-justify">Welcome to Bhukkads! These Terms and Conditions ("Terms") govern your use of our website, bhukkads.in (the "Site"), and the services provided by Bhukkads Facility Services Private Limited ("Bhukkads," "we," "our," or "us"). By accessing or using our Site and services, you agree to these Terms. If you do not agree with these Terms, please do not use our Site.</p>
                        </div>

                        <div className="s3 my-4">
                            <h5 className="text-pink">1. Pre-Ordering</h5>
                            <p className="text-justify"><b>1.1 Pre-Order Process:</b> You may place a pre-order from our dining services through our Site. A pre-order allows you to reserve and pay for food or services in advance.</p>
                        </div>
                        <div className="s4 my-4">
                            <p className="text-justify"><b>1.2 Payment:</b> Full payment is required at the time of placing the pre-order. Payments can be made using the available payment methods on our Site. </p>
                        </div>
                        <div className="s5 my-4">
                            <p className="text-justify"><b>1.3 Order Confirmation:</b> After placing your pre-order, you will receive a confirmation email with details of your order. Please review this confirmation and contact us immediately if there are any discrepancies.</p>
                        </div>
                        <div className="s5 my-4"> 
                            <p className="text-justify"><b>1.4 Cancellation and Refunds: </b> Pre-orders can be canceled or modified within 30 minutes - 120 minutes before arrival time at the restaurant it varies upon the different restaurant’s. Refunds will be issued to the original payment method within 5-7 business days of cancellation. Cancellations made after this period may not be eligible for a refund.</p>
                        </div>
                        <div className="s5 my-4">
                            <p className="text-justify"><b>1.5 Changes to Orders: </b> Requests to modify or change a pre-order must be made at least 60 minutes before arrival time. We will make reasonable efforts to accommodate changes, but cannot guarantee them.</p>
                        </div>
                        <div className="s5 my-4">
                            <h5 className="text-pink">2. Contactless Dining</h5>
                            <p className="text-justify"><b>2.1 Service Availability: </b> Our contactless dining services are subject to availability and may vary based on location and current health guidelines.</p>
                        </div>
                        <div className="s5 my-4">
                            <p className="text-justify"><b>2.2 Health and Safety: </b> We prioritize the health and safety of our customers and staff. All contactless dining procedures will be conducted in accordance with applicable health and safety regulations.</p>
                        </div>
                        <div className="s5 my-4">
                            <p className="text-justify"><b>2.3 User Responsibility: </b> It is your responsibility to ensure that you comply with any specific instructions or guidelines provided for contactless dining. Failure to follow these guidelines may affect the quality of service.</p>
                        </div>
                        <div className="s5 my-4">
                            <h5 className="text-pink">3. User Accounts</h5>
                            <p className="text-justify"><b>3.1 Account Creation: </b> You may need to create an account to use certain features of our Site. You agree to provide accurate and complete information and to keep your account credentials confidential.</p>
                        </div>
                        <div className="s5 my-4">
                            <p className="text-justify"><b>3.2 Account Security: </b> You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use of your account or any other security breach.</p>
                        </div>
                        <div className="s5 my-4">
                            <h5 className="text-pink">4. Intellectual Property</h5>
                            <p className="text-justify"><b>4.1 Ownership: </b> All content on our Site, including text, graphics, logos, and software, is the property of Bhukkads or its licensors and is protected by intellectual property laws.</p>
                        </div>
                        <div className="s5 my-4">
                            <p className="text-justify"><b>4.2 Use Restrictions: </b>You may not reproduce, distribute, or otherwise use any content from our Site without our express written permission.</p>
                        </div>
                        <div className="s5 my-4">
                            <h5 className="text-pink">5. Limitation of Liability</h5>
                            <p className="text-justify"><b>5.1 Disclaimer: </b> Our Site and services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of any content or services provided.</p>
                        </div>
                        <div className="s5 my-4">
                            <p className="text-justify"><b>5.2 Liability: </b> To the fullest extent permitted by law, Bhukkads shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Site or services.</p>
                        </div>
                        <div className="s5 my-4">
                            <h5 className="text-pink">6. Changes to Terms</h5>
                            <p className="text-justify"><b>6.1 Modifications:  </b> We may update these Terms from time to time. Any changes will be posted on this page, and your continued use of the Site constitutes acceptance of the revised Terms.</p>
                        </div>

                    </div>
                </div>

            </div>


        </section>



    </>;
};

export default TermAndCondition;

import React from "react"
import { Link } from "react-router-dom"
const RefundAndCencellation = ()=>{
  return (
    <>
    <nav aria-label="breadcrumb " className="mt-2 mb-5 ps-2">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item fs-12"><Link to="/" className="text-grayc text-decoration-none">Home</Link></li>
                    <li className="breadcrumb-item active text-black fs-12" aria-current="page">Refund and Cancellation Policy</li>
                </ol>
            </nav>
            <section className="my-5 contact">
                <div className="container">
                    <div className="row  px-4 ">
                        <div className="col-12">
                            <div className="s1">
                                <h5 className="text-pink">Refund and Cancellation Policy </h5>
                                <p className="text-justify">Welcome to Bhukkads! This Refund and Cancellation Policy ("Policy") outlines the terms under which you can cancel your pre-order and request a refund for our services. By placing a pre-order or using our contactless dining services, you agree to the terms outlined in this Policy.</p>
                            </div>
                           
                            <div className="s3 my-4">
                                <h5 className="text-pink">1. Pre-Order Cancellations</h5>
                                <p className="text-justify"><b>1.1 Cancellation Timeframe: </b> Pre-orders can be canceled or modified within 30 minutes - 120 minutes before arrival time at the restaurant it varies upon the different restaurant’s.</p>
                            </div>
                            <div className="s4 my-4">
                                <p className="text-justify"><b>1.2 Cancellation Process: </b> To cancel a pre-order, please contact our customer support team at support@bhukkads.in or +91-70000 17917 Provide your order details and reason for cancellation. </p>
                            </div>
                            <div className="s5 my-4">
                                <p className="text-justify"><b>1.3 Refund Eligibility: </b> If you cancel your pre-order within the allowed timeframe, a full refund will be issued to the original payment method. Cancellations made after the allowed timeframe may not be eligible for a refund.</p>
                            </div>
                            <div className="s5 my-4">
                                <p className="text-justify"><b>1.4 Refund Processing Time:  </b> Refunds will be processed within 5-7 business days of receiving your cancellation request. The time it takes for the refund to appear on your statement depends on your payment method and bank processing times.</p>
                            </div>
                          
                            <div className="s5 my-4">
                            <h5 className="text-pink">2. Contactless Dining Cancellations</h5>
                                <p className="text-justify"><b>2.1 Cancellation Timeframe:  </b> You may cancel a contactless dining reservation up to [specific time period, e.g., 24 hours] before the scheduled dining time.</p>
                            </div>
                            <div className="s5 my-4">
                                <p className="text-justify"><b>2.2 Cancellation Process: </b> To cancel a contactless dining reservation, please contact our customer support team at support@bhukkads.in or +91-70000 17917. Provide your reservation details and reason for cancellation.</p>
                            </div>
                            <div className="s5 my-4">
                                <p className="text-justify"><b>2.3 Refund Eligibility:  </b> For contactless dining reservations that have been canceled within the allowed timeframe, any pre-paid amounts will be refunded in full. Cancellations made after the allowed timeframe may not be eligible for a refund.</p>
                            </div>
                            <div className="s5 my-4">
                              <h5 className="text-pink">3. Exceptions</h5>
                                <p className="text-justify"><b>3.1 Force Majeure: </b> In the event of unforeseen circumstances beyond our control (e.g., natural disasters, government restrictions), we may not be able to process cancellations or refunds as usual. We will make reasonable efforts to notify you and offer alternative solutions.</p>
                            </div>
                            <div className="s5 my-4">
                                <p className="text-justify"><b>3.2 Service Issues:  </b> If you experience any issues with our services that are not related to your cancellation request, please contact our customer support team so that we can address the matter appropriately.</p>
                            </div>
                           
                            </div>
                        </div>

                    </div>

                
            </section>
    </>
  )
}

export default RefundAndCencellation
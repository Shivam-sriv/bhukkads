import axios from "axios";
import { api, baseUrl } from "../urls";
import { errorToast, Calls, successToast } from "../utils/call";
import { toast } from "react-toastify";
export const loadScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export async function DisplayRazorpay(navigate,preOrderData=null) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const response = await axios.get(baseUrl + api.createPaymentOrder, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { amount, currency, id: order_id } = response.data.data;

    const options = {
      key: "rzp_test_YzZNRoobmbhCfJ",
      amount,
      currency,
      name: "Bhukkads india.",
      description: "Test Transaction",
      order_id,
      prefill: {
        name: user?.name,
        email: user?.email ? user?.email : "",
        contact: user?.phoneNo,
      },
      theme: {
        color: "#F37254",
      },
      handler: (response) => {
        axios
          .post(baseUrl + api.verifyPayment, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
          .then((res) => {
            const orderType = localStorage.getItem("orderType");
            const resFinal = Calls.requestPost(api.createOrder, {
              paymentMethod: "online",
              transactionId: res.data.transactionId,
              orderType,
              slotId:preOrderData?.slotId || "",
              partySize:preOrderData?.partySize ||"",
              preOrderDate:preOrderData?.preOrderDate||"",
              tableNo:""
            });
            if (resFinal) {
              successToast(res);
              navigate("/order-and-history")
            } else {
              errorToast(res);
            }
          })
          .catch((err) => {
            alert("payment failed.");
          });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.log(err);
    alert("Failed to open payment gateway.");
  }
}

export async function DisplayRazorpayForDinIn(navigate,restaurantId,orderId) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const response = await axios.post(baseUrl + api.createPaymentOrderForDinIn,{restaurantId}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { amount, currency, id: order_id } = response.data.data;

    const options = {
      key: "rzp_test_YzZNRoobmbhCfJ",
      amount,
      currency,
      name: "Bhukkads india.",
      description: "Test Transaction",
      order_id,
      prefill: {
        name: user?.name,
        email: user?.email ? user?.email : "",
        contact: user?.phoneNo,
      },
      theme: {
        color: "#F37254",
      },
      handler: (response) => {
        axios
          .post(baseUrl + api.verifyPaymentForDinIn, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId
          })
          .then((res) => {
              successToast(res);
              navigate("/order-and-history")
          })
          .catch((err) => {
            toast.error("payment failed.")
          });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.log("error from payment",err);
    toast.error("Failed to open razerpay")
  }
}


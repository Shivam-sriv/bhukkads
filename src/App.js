import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/style.css";
import "../src/assets/css/responsive.css";
import "animate.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Header from "./pages/header";
import Footer from "./pages/footer";
import Restaurant from "./pages/restaurant";
import Confirm_Order from "./pages/confirm-order";
import Orders from "./pages/orders";
import Restaurant_List from "./pages/restaurant-list";
import Profile_Account from "./pages/profile-account";
import About from "./pages/about";
import Contact from "./pages/contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./provider-data/UserData";
import { TypeProvider } from "./provider-data/OrderType";
import { ScrollToTop } from "./utils/scrollToTop";
import PrivacyPolicy from "./pages/privacy-policy";
import TermAndCondition from "./pages/term-and-condition";
import RefundAndCencellation from "./pages/refund-and-cencellation";
import { CartProvider } from "./provider-data/CartCount";
import DataNotFound from "./components/data-not-found";
import Loader from "./components/loader";
import {Calls} from "./utils/call";

function App() {

  const [loader,setLoader] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
    Calls.loader = setLoader;
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <UserProvider>
        <TypeProvider>
          <CartProvider>
            <Header />
            <Loader data={loader}  />
            <Routes>
              <Route path="data-not-found" element={<DataNotFound/>}/>
              <Route path="/" element={<Home />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/confirm-order" element={<Confirm_Order />} />
              <Route path="/order-and-history" element={<Orders />} />
              <Route path="/restaurant-list" element={<Restaurant_List />} />
              <Route path="/profile-account" element={<Profile_Account />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/term-and-conditions"
                element={<TermAndCondition />}
              />
              <Route
                path="/refund-and-cencellation"
                element={<RefundAndCencellation />}
              />
            </Routes>
            <ToastContainer />
            <Footer />
          </CartProvider>
        </TypeProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

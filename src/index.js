import React from "react";
import ReactDOM from "react-dom";
import { Store } from "./store";
import { Provider } from "react-redux";
import "./index.css";
import "./customer/user/components/userOrder.css";
import App from "./App";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Product from "./customer/product/component/product";
import Navigation from "./customer/features/navigation/navigation";
import Footer from "./customer/features/footer/footer";
import CartPage from "./customer/cart/cartPage";
import CheckOut from "./customer/orders/checkOut";
import ProductDetail from "./customer/product/component/productDetails";
import Encryption from "./customer/pages/encryption";
import Protected from "./customer/auth/components/protected";
import PageNotFound from "./customer/pages/404";
import OrdreSuccessPage from "./customer/pages/ordreSuccessPage";
import Login from "./customer/auth/components/login";
import Signup from "./customer/auth/components/signup";
import UsersOrder from "./customer/user/components/usersOrder";
import UsersProfile from "./customer/user/components/usersProfile";
import UpdateAddress from "./customer/user/components/updateAddress";
import Logout from "./customer/auth/components/logout";
import ForgotPassword from "./customer/auth/components/forgotPassword";
import AdminProduct from "./customer/admin/components/adminProduct";
import AdminProductDetail from "./customer/admin/components/adminProductDetails";
import AdminForm from "./customer/admin/components/adminForm";
import AdminOrder from "./customer/admin/components/adminOrder";
import PaymentCheck from "./customer/pages/paymentCheck";
import StripeCheckout from "./customer/stripe/stripeCheckout";
import WishList from "./customer/pages/wishList";
import ResetPassword from "./customer/auth/components/resetPassword";
import VerificationMessage from "./customer/pages/verificationMessage";
import VerificationPage from "./customer/pages/verificationPage";
import OrderTracking from "./customer/pages/orderTracking";
import ScrollButton from "./customer/pages/scrollButton";
import PaymentSuccessPage from "./customer/pages/paymentSuccess";
import StripeCheckoutPayment from "./customer/stripe/stripeCheckoutPayment";
import Chat from "./customer/chat/components/chat";
import { ToastContainer } from "react-toastify";
import ProtectedAdmin from "./customer/auth/components/protectedAdmin";
ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <Navigation />
      <ScrollButton />
      <ToastContainer />
      <div style={{ minHeight: "60vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <App />
              </Protected>
            }
          />
          <Route path="/verification" element={<VerificationMessage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <AdminProduct />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/adminOrder"
            element={
              <ProtectedAdmin>
                <AdminOrder />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/:id"
            element={
              <ProtectedAdmin>
                <AdminProductDetail />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/adminForm"
            element={
              <ProtectedAdmin>
                <AdminForm />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/:id/adminForm"
            element={
              <Protected>
                <AdminForm />
              </Protected>
            }
          />
          <Route
            path="/auth/verify"
            element={
              <Protected>
                <VerificationPage />
              </Protected>
            }
          />
          <Route
            path="/store"
            element={
              <Protected>
                <Product />
              </Protected>
            }
          />
          <Route
            path="/chat"
            element={
              <Protected>
                <Chat />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={
              <Protected>
                <CartPage />
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <CheckOut />
              </Protected>
            }
          />
          <Route path="/enc" element={<Encryption />} />
          <Route path="/store/productDetails/:id" element={<ProductDetail />} />
          <Route
            path="/order-success"
            element={
              <Protected>
                <OrdreSuccessPage />
              </Protected>
            }
          />
          <Route
            path="/payment-success"
            element={
              <Protected>
                <PaymentSuccessPage />
              </Protected>
            }
          />
          <Route path="/order" element={<UsersOrder />} />
          <Route
            path="/profile"
            element={
              <Protected>
                <UsersProfile />
              </Protected>
            }
          />
          <Route
            path="/updateAddress"
            element={
              <Protected>
                <UpdateAddress />
              </Protected>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/check" element={<PaymentCheck />} />
          <Route
            path="/payment-stripe"
            element={
              <Protected>
                <StripeCheckoutPayment />
              </Protected>
            }
          />
          <Route
            path="/order-stripe"
            element={
              <Protected>
                <StripeCheckout />
              </Protected>
            }
          />
          <Route path="/ordert" element={<OrderTracking />} />
          <Route
            path="/wishList"
            element={
              <Protected>
                <WishList />
              </Protected>
            }
          />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
    <Footer />
  </Provider>,

  document.getElementById("root")
);

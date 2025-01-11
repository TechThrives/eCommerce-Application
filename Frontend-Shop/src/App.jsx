import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishListProvider } from "./features/WishListContext";
import { AppProvider } from "./features/AppContext";
import Layout from "./layout/Layout";
import UserLayout from "./layout/UserLayout";
// User Pages
import Account from "./pages/user/Account";
import Profile from "./pages/user/Profile";
import Invoices from "./pages/user/Invoices";
import Reviews from "./pages/user/Reviews";
import ViewInvoice from "./pages/user/ViewInvoice";
// Pages
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import { CartProvider } from "./features/CartContext";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import ProductReviews from "./pages/ProductReviews";

// Private Route
import PrivateRoute from "./utils/PrivateRoute";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PaymentMethods from "./pages/PaymentMethods";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <Router>
      <AppProvider>
        <ToastContainer />
        <WishListProvider>
          <CartProvider>
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/" element={<Layout />}>
                <Route path="/account" element={<UserLayout />}>
                  <Route index element={<Account />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="invoices" element={<Invoices />} />
                  <Route path="view-invoice/:invoiceId" element={<ViewInvoice />} />
                  <Route path="reviews" element={<Reviews />} />
                </Route>

                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                <Route path="/payment-success" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
                <Route path="/category/:categorySlug" element={<Category />} />
                <Route path="/product/:productSlug" element={<ProductDetails />} />
                <Route path="/product-reviews/:productSlug" element={<ProductReviews />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/payment-methods" element={<PaymentMethods />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CartProvider>
        </WishListProvider>
      </AppProvider>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishListProvider } from "./Features/WishListContext";
import { AppProvider } from "./Features/AppContext";
import Layout from "./Layout/Layout";
import UserLayout from "./Layout/UserLayout";
// User Pages
import Account from "./Pages/User/Account";
import Profile from "./Pages/User/Profile";
import Orders from "./Pages/User/Orders";
import Reviews from "./Pages/User/Reviews";
// Pages
import Home from "./Pages/Home";
import WishList from "./Pages/WishList";
import Category from "./Pages/Category";
import ProductDetails from "./Pages/ProductDetails";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import { CartProvider } from "./Features/CartContext";
import Checkout from "./Pages/Checkout";
import PaymentFailed from "./Pages/PaymentFailed";
import PaymentSuccess from "./Pages/PaymentSuccess";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { ToastContainer } from "react-toastify";

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
                  <Route path="orders" element={<Orders />} />
                  <Route path="reviews" element={<Reviews />} />
                </Route>

                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-failed" element={<PaymentFailed />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/category/:categorySlug" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CartProvider>
        </WishListProvider>
      </AppProvider>
    </Router>
  );
}

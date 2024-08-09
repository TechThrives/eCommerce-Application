import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { AppProvider } from "./utils/AppContext";
import { ToastContainer } from "react-toastify";

import SignIn from "./pages/auth/SignIn";
import RecoverPassword from "./pages/auth/RecoverPassword";
import NotFound from "./pages/error/NotFound";
import Dashboard from "./pages/Dashboard";
/*Product*/
import ProductList from "./pages/product/ProductList";
import EditProduct from "./pages/product/EditProduct";
import AddProduct from "./pages/product/AddProduct";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import CategoryList from "./pages/category/CategoryList";
import UserList from "./pages/user/UserList";
import ReviewList from "./pages/review/ReviewList";
import ViewUser from "./pages/user/ViewUser";
import InvoiceList from "./pages/invoice/InvoiceList";
import ViewInvoice from "./pages/invoice/ViewInvoice";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <AppProvider>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/recover-password" element={<RecoverPassword />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              {/* Product */}
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:productId" element={<EditProduct />} />
              {/* Category */}
              <Route path="/category-list" element={<CategoryList />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route
                path="/edit-category/:categoryId"
                element={<EditCategory />}
              />
              {/* User */}
              <Route path="/user-list" element={<UserList />} />
              <Route path="/view-user/:userId" element={<ViewUser />} />
              {/* Review */}
              <Route path="/review-list" element={<ReviewList />} />
              {/* Invoice */}
              <Route path="/invoice-list" element={<InvoiceList />} />
              <Route
                path="/view-invoice/:invoiceId"
                element={<ViewInvoice />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </Router>
    </>
  );
}

export default App;

import Nav from "./components/navigation/Nav";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Signin from "./components/auth/Signin";
import Signup from './components/auth/Signup'
import Footer from "../src/components/footer/Footer";
import mens_banner from "../src/components/assets/banner_mens.png";
import womens_banner from "../src/components/assets/banner_women.png";
import kids_banner from "../src/components/assets/banner_kids.png";
import ShippingInfo from "./components/checkouts/ShippingInfo";
import ConfirmOrder from "./components/checkouts/ConfirmOrder";
import MyProfile from "./components/profile/MyProfile";
import Protected from "./components/protected/Protected";
import UserOrders from "./components/orders/UserOrders";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import AdminRouter from "./admin/components/AdminRouter";
import OrdersTest from "./admin/components/OrdersTest";
import ProductDisplay from "./components/productDisplay/ProductDisplay";
import SearchProduct from "./components/navigation/SearchProduct";

const roles = localStorage.getItem("roles");

const USER_TYPE = {
  NORMAL_USER: "USER",
  ADMIN_USER: "ADMIN",
};
const CURRENT_USER_TYPE = roles;

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Shop />} />

        <Route
          path="/mens"
          element={<Product banner={mens_banner} category="Men" />}
        />
        <Route
          path="/womens"
          element={<Product banner={womens_banner} category="Women" />}
        />
        <Route
          path="/kids"
          element={<Product banner={kids_banner} category="Kids" />}
        />

        <Route path="/product/:productId" element={<ProductDisplay />}></Route>

        <Route path="/cart" element={<Protected Component={Cart} />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/shipping"
          element={<Protected Component={ShippingInfo} />}
        ></Route>
        <Route
          path="/order/confirm"
          element={<Protected Component={ConfirmOrder} />}
        ></Route>

        <Route
          path="/user/profile"
          element={<Protected Component={MyProfile} />}
        ></Route>
        <Route path="/user/orders" element={<UserOrders />}></Route>

        <Route
          path="/admin/*"
          element={
            <AdminElement>
              <AdminRouter />
            </AdminElement>
          }
        ></Route>

        <Route path="*" element={<PageNotFound />}></Route>

        {/* remove this */}
        <Route path="/product/search" element={<SearchProduct />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

function AdminElement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPE.ADMIN_USER) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default App;

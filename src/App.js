import "./App.css";
import { createBrowserRouter, createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
// import Products from "./pages/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Shipping from "./pages/Shipping/Shipping";
import Profile from "./pages/Profile/Profile";
import Payment from "./pages/Payment/Payment";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import SearchResults from "./pages/SearchResults/SearchResults";

export const URL = process.env.REACT_APP_SERVER_URL;
// { URL }


const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

// createHashRouter

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/shipping",
        element: <Shipping />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/placeorder",
        element: <PlaceOrder />,
      },
      {
        path: "/orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "/products",
        element: <SearchResults />,
      },
      {
        path: "/products/:category",
        element: <SearchResults />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

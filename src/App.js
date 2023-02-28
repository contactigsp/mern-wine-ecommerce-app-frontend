import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: `${URL}/`,
    element: <Layout />,
    children: [
      {
        path: `${URL}/`,
        element: <Home />,
      },
      {
        path: `${URL}/product/:id`,
        element: <ProductDetails />,
      },
      {
        path: `${URL}/signup`,
        element: <Signup />,
      },
      {
        path: `${URL}/login`,
        element: <Login />,
      },
      {
        path: `${URL}/shipping`,
        element: <Shipping />,
      },
      {
        path: `${URL}/profile`,
        element: <Profile />,
      },
      {
        path: `${URL}/payment`,
        element: <Payment />,
      },
      {
        path: `${URL}/placeorder`,
        element: <PlaceOrder />,
      },
      {
        path: `${URL}/orders/:id`,
        element: <OrderDetails />,
      },
      {
        path: `${URL}/products`,
        element: <SearchResults />,
      },
      {
        path: `${URL}/products/:category`,
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

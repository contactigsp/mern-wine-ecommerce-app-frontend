import React from "react";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./../Cart/Cart";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "../../hooks/useLogout";
import { toggleIsOpen } from "../../redux/cartReducer";

function Navbar() {
  // ========================= HANDLE MENU IS CHECKED =========================
  const [isChecked, setIsChecked] = useLocalStorageState("isChecked", false);
  const dispatch = useDispatch();

  const handleIsChecked = () => {
    setIsChecked(!isChecked);
    const navbarMainLeft = document.querySelector(".Navbar-main-left");
    const navbarMainRight = document.querySelector(".Navbar-main-right");

    if (isChecked) {
      navbarMainLeft.classList.remove("show-Navbar-main-left");
      navbarMainRight.classList.remove("show-Navbar-main-right");
    } else {
      navbarMainLeft.classList.add("show-Navbar-main-left");
      navbarMainRight.classList.add("show-Navbar-main-right");
    }
    // console.log("hello from custom hook!");
    // console.log(isChecked);
  };

  // ========================= HANDLE CART IS OPEN =========================
  // const [isOpen, setIsOpen] = useLocalStorageState("isOpen", true);

  const handleIsOpen = () => {
    dispatch(toggleIsOpen());
    // setIsOpen(!isOpen);
    // console.log(isOpen, "from Navbar");
  };

  const products = useSelector((state) => state.cart.products);

  const { runLogout } = useLogout();

  const handleLogout = () => {
    handleIsChecked();
    runLogout();
  };

  // ========================= GRAB USER'S NAME =========================
  const currentUser = useSelector((state) => state.auth.user);
  // ========================= GRAB URL PARAMS =========================

  const navigate = useNavigate();

  const handleClickColor = (keySearch) => {
    // console.log(color, "from color")
    // console.log(window.location.pathname)
    // console.log(location.search, "from location.search")
    // console.log(location.pathname, "from location.pathname")
    navigate(`/products?color=${keySearch}`);
  };

  const handleClickCategory = (keySearch) => {
    handleIsChecked();
    navigate(`/products/${keySearch}`);
  };

  return (
    <div className="Navbar">
      <div className="Navbar-main">
        <div className="Navbar-main-left">
          <ul className="Navbar-dropDownMenu">
            <li className="Navbar-dropDown-wines" value="Red">
              Wines
              <ul>
                <li onClick={() => handleClickColor("Red")}>Red</li>
                <li onClick={() => handleClickColor("White")}>White</li>
                <li onClick={() => handleClickColor("Rose")}>Rose</li>
                <li onClick={() => handleClickColor("Sparkling")}>Sparkling</li>
                {/* <a href="" data-attribute="Red"><li onClick={(e) => console.log(e.value) }>Red</li></a>
                <a href="/"><li>White</li></a>
                <a href="/"><li>Rose</li></a>
                <a href="/"><li>Sparkling</li></a> */}
              </ul>
            </li>
            <li className="Navbar-dropDown-categories">
              Categories
              <ul>
                <li onClick={() => handleClickCategory("gifts")}>Gifts</li>
                <li onClick={() => handleClickCategory("kits")}>Kits</li>
                <li onClick={() => handleClickCategory("combos")}>Combos</li>
                <li onClick={() => handleClickCategory("wood")}>Wooden Box</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="Navbar-main-center">
          <ul>
            <Link to={"/"}>
              <li className="logo">WINES</li>
            </Link>
          </ul>
        </div>

        <div className="Navbar-main-right">
          <ul>
            {currentUser ? (
              <>
                <li className="greetingForUser">
                  <p style={{ color: "rgb(239, 179, 101)" }}>
                    Hi, {currentUser.fullname.split(" ")[0]}
                  </p>
                </li>
                <li>
                  <p onClick={handleLogout}>Logout</p>{" "}
                </li>
              </>
            ) : (
              <>
                <Link to="/login" onClick={handleIsChecked}>
                  <li>Login</li>
                </Link>
                <Link to="/signup" onClick={handleIsChecked}>
                  <li>Sign up</li>
                </Link>{" "}
              </>
            )}
          </ul>
          <ul>
            <Link to={"/profile"} onClick={handleIsChecked}>
              <li>
                <PersonIcon />
              </li>
            </Link>
            {/* <li>
              <FavoriteBorderIcon />
            </li> */}
          </ul>
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="checkBox-container">
        <label htmlFor="toggler" className="checkBtn">
          <MenuIcon />
        </label>
        <input type="checkbox" id="toggler" onClick={handleIsChecked} />
      </div>
      <div className="shopping-cart" onClick={handleIsOpen}>
        <div className="shopping-cart-count-container">
          <ShoppingCartIcon />
          <span className="shopping-cart-count">{products.length}</span>
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <Cart /*isOpen={isOpen}*/ />
    </div>
  );
}

export default Navbar;

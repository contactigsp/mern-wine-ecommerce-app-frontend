import React, { useEffect, useState } from "react";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { runLogin, isLoading, error } = useLogin();

  const location = useLocation();
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/shipping";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // console.log(redirect, "from handleSubmit");
    e.preventDefault();
    await runLogin(email, password);
    // navigate("/")
    // console.log(email, password, "From handle Submit");
  };

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate(`/${redirect}`); // Change this line navigateLog(redirect) inside that useEffect in LoginScreen to this one: "navigateLog(`/${redirect}`);      " In your case it's redirecting to /login/shipping instead of /shipping, cause it's like you are calling navigateLog("shipping") since redirect is equal to "shipping", so it's used as a relative path. Which means it takes into account your current url, which is in your case /login.
    }
  }, [user, navigate, redirect]);

  return (
    <>
      {isLoading && <Loader />}
      <form className="Login" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <sub className="new-customer">
          New Customer? Click{" "}
          <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
            here
          </Link>{" "}
          to create a new Account
        </sub>

        <button disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useSignup } from "../../hooks/useSignup";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, fullname);
  };

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/shipping";

  useEffect(() => {
    if (user) {
      navigate(`/${redirect}`);
    }
  }, [user, navigate, redirect]);

  return (
    <form className="Signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label htmlFor="fullname">Full name</label>
      <input
        id="fullname"
        type="fullname"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      ></input>

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

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      {/* <div className="error">Error</div> */}
    </form>
  );
}

export default Signup;

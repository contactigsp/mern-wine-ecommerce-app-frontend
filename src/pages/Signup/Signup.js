import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useSignup } from "../../hooks/useSignup";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import Loader from "../../components/Loader/Loader";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const { signup, error, isLoading } = useSignup();

  // PASSWORD CHECK
  const [loUpCase, setLoUpCase] = useState(null);
  const [num, setNum] = useState(null);
  const [specialChar, setSpecialChar] = useState(null);
  const [lengthChar, setLengthChar] = useState(null);

  useEffect(() => {
    // Check Lowercase and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setLoUpCase(true);
    } else {
      setLoUpCase(false);
    }

    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }

    // Check For Special char
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }

    // Check for length
    if (password.length > 5) {
      setLengthChar(true);
    } else {
      setLengthChar(false);
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, fullname);
  };

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/shipping";

  useEffect(() => {
    if (user) {
      navigate(`/${redirect}`);
    }
  }, [user, navigate, redirect]);

  return (
    <>
      {isLoading && <Loader />}
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

        <div className="Signup-checkbox">
          <p>
            <span>
              {loUpCase ? (
                <DoneAllIcon fontSize="small" sx={{ color: "green" }} />
              ) : (
                <ClearIcon fontSize="small" sx={{ color: "red" }} />
              )}
            </span>{" "}
            Lowercase & Uppercase
          </p>
          <p>
            <span>
              {num ? (
                <DoneAllIcon fontSize="small" sx={{ color: "green" }} />
              ) : (
                <ClearIcon fontSize="small" sx={{ color: "red" }} />
              )}
            </span>{" "}
            Number (0-9)
          </p>
          <p>
            <span>
              {specialChar ? (
                <DoneAllIcon fontSize="small" sx={{ color: "green" }} />
              ) : (
                <ClearIcon fontSize="small" sx={{ color: "red" }} />
              )}
            </span>{" "}
            Special Character (!@#$%^&*)
          </p>
          <p>
            <span>
              {lengthChar ? (
                <DoneAllIcon fontSize="small" sx={{ color: "green" }} />
              ) : (
                <ClearIcon fontSize="small" sx={{ color: "red" }} />
              )}
            </span>{" "}
            At least 6 Characters
          </p>
        </div>

        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
        {/* <div className="error">Error</div> */}
      </form>
    </>
  );
}

export default Signup;

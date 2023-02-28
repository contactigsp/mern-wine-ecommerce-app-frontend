import { useState } from "react";
import { login } from "../redux/authReducer";
import { useDispatch } from "react-redux";
import { URL } from "../App";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const dispatch = useDispatch();

  const signup = async (email, password, fullname) => {
    setIsLoading(true);

    const response = await fetch(`${URL}/api/v1/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullname }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      console.log(json);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json.data));

      // update the auth context
      dispatch(login(json.data));
      setIsLoading(false);
      setError(false);
    }
  };
  return { signup, isLoading, error };
};

import { useState } from "react";
import { login } from "../redux/authReducer";
import { useDispatch } from "react-redux";
import { URL } from "../App";
import { getMyOrders } from "../redux/myListOrdersReducer";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const dispatch = useDispatch();

  const runLogin = async (email, password) => {
    setIsLoading(true);

    const response = await fetch(`${URL}/api/v1/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      dispatch(getMyOrders(json.data));

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json.data));

      // update the auth context
      dispatch(login(json.data));
      // console.log(json.data,"from useLogin")
      setIsLoading(false);
      setError(false);
    }
  };
  return { runLogin, isLoading, error };
};

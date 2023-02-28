import { useDispatch } from "react-redux";
import { logout } from "../redux/authReducer";

export const useLogout = () => {
  const dispatch = useDispatch();

  const runLogout = () => {
    //   remove user from storage
    localStorage.removeItem("user");

    //   dispatch logout action
    dispatch(logout());
  };
  return { runLogout };
};

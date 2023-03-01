import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { getMyOrders } from "../../redux/myListOrdersReducer";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Profile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const myOrders = useSelector((state) => state.myOrders.myOrders);

  const navigate = useNavigate();
  const handleClickDetails = (id) => {
    navigate(`/orders/${id}`);
  };

  const shouldRequest = useRef(true); //this hook has a "current" property that persists it's value throughout the lifetime of the component. So, even on the "mount" and "unmount" it will retain it's value.

  useEffect(() => {
    if (userInfo) {
      if (shouldRequest.current) {
        shouldRequest.current = false;
        dispatch(getMyOrders(userInfo));
        console.log(userInfo);
      }
    } else {
      navigate(`/login?redirect=profile`); // Change this line navigateLog(redirect) inside that useEffect in LoginScreen to this one: "navigateLog(`/${redirect}`);      " In your case it's redirecting to /login/shipping instead of /shipping, cause it's like you are calling navigateLog("shipping") since redirect is equal to "shipping", so it's used as a relative path. Which means it takes into account your current url, which is in your case /login.
    }
  }, [dispatch, userInfo, navigate]);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "orderDate", headerName: "DATE", type: "date", width: 130 },
    { field: "totalOrderPrice", headerName: "TOTAL", width: 130 },
    {
      field: "isPaid",
      headerName: "PAID",
      type: "boolean",
      sortable: true,
      width: 90,
    },
    {
      field: "isDelivered",
      headerName: "DELIVERED",
      type: "boolean",
      sortable: true,
      width: 110,
    },
    {
      field: " ",
      headerName: " ",
      sortable: false,
      renderCell: (params) => {
        return (
          <button
            onClick={() => handleClickDetails(params.id)}
            className="Profile-button"
          >
            Details
          </button>
        );
      },
    },
  ];

  const rows = myOrders;

  return !shouldRequest.current ? (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // checkboxSelection
        sx={{ m: "2rem" }}
      />
    </div>
  ) : (
    <Loader />
  );
}

export default Profile;

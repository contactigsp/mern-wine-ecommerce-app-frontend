import React from "react";
import "./Loader.css";
import loadingImg from "./../../assets/loading/loadingImg-6.gif";

function Loader() {
  return (
    <>
      <div className="Loader">
        <div className="Loader-panel"></div>
        <img className="loading" alt="loading..." src={loadingImg}></img>
      </div>
    </>
  );
}

export default Loader;

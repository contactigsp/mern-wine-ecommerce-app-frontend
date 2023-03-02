import React, { useEffect, useState } from "react";
import "./SearchResults.css";
// import { getWineList, selectWineList } from "../../redux/productReducer";
import { useDispatch } from "react-redux";
// import Loader from "../../components/Loader/Loader";
import { useLocation } from "react-router-dom";
import CardProduct from "../../components/Card/CardProduct";
import axios from "axios";
import { URL } from "../../App";
import Loader from "../../components/Loader/Loader";

function SearchResults() {
  const dispatch = useDispatch();
  const location = useLocation();

  //   console.log(color)
  const [wineListSearch, setWineListSearch] = useState();

  const keySearch = location.search.includes("=")
    ? location.search.split("=")[1]
    : location.pathname.split("/")[2];

  // console.log(keySearch);
  useEffect(() => {
    const keySearch = location.search.includes("=")
      ? location.search.split("=")[1]
      : location.pathname.split("/")[2];
    // console.log(keySearch);

    // ==================== AXIOS ====================
    const fetchData = async () => {
      const response = await axios.get(
        location.search.includes("=")
          ? `${URL}/api/v1/products?color=${keySearch}`
          : `${URL}/api/v1/products/${keySearch}`
      );
      // console.log(response);
      if (response.status === 200) {
        const resultSearch = response.data;
        setWineListSearch(response.data);
        // console.log(resultSearch);
        return resultSearch;
      }

      if (response.status !== 200) {
        // console.log(response);
        throw Error(response.error);
      }
    };

    fetchData();
  }, [dispatch, location.pathname, location.search, setWineListSearch]);

  return (
    <>
      <img src={"/img/banners/smaller1.jpg"} alt="promo"></img>
      <h3 className="SearchResults-title">
        Showing results for <span>{keySearch}</span>
      </h3>
      <div className="SearchResults">
        {wineListSearch ? (
          wineListSearch.map((wine) => (
            <CardProduct key={wine._id} wine={wine} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </>
  );

  // return <div>Search Results</div>;
}

export default SearchResults;

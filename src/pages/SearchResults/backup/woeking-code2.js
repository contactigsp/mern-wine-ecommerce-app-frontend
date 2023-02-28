import React, { useEffect, useState } from "react";
import "./SearchResults.css";
// import { getWineList, selectWineList } from "../../redux/productReducer";
import { useDispatch } from "react-redux";
// import Loader from "../../components/Loader/Loader";
import { useLocation } from "react-router-dom";
import CardProduct from "../../components/Card/CardProduct";
import axios from "axios";

function SearchResults() {
  const dispatch = useDispatch();
  const location = useLocation();

  //   console.log(color)
  const [wineListSearch, setWineListSearch] = useState();

  const keySearch = location.search.split("=")[1];
  useEffect(() => {
    const keySearch = location.search.split("=")[1];

    // ==================== AXIOS ====================
    const fetchData = async () => {
      const response = await axios.get(`/api/v1/products?color=${keySearch}`);
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
  }, [dispatch, location.search, setWineListSearch]);

  return (
    wineListSearch && (
      <>
        <img src={"/img/banners/smaller1.jpg"} alt="promo"></img>
        <h3 className="SearchResults-title">
          Searching results for <span>{keySearch}</span>
        </h3>
        <div className="SearchResults">
          {wineListSearch.map((wine) => (
            <CardProduct key={wine._id} wine={wine} />
          ))}
        </div>
      </>
    )
  );
  // return <div>Search Results</div>;
}

export default SearchResults;

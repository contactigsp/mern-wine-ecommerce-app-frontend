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

  useEffect(() => {
    const color = location.search.split("=")[1];

    // ==================== AXIOS ====================
    const fetchData = async () => {
      const response = await axios.get(`/api/v1/products?color=${color}`);
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
    // console.log(fetchData(), "from fetchData()");
  }, [dispatch, location.search, setWineListSearch]);

  //   const wineList = useSelector(selectWineList);
  // console.log(wineListSearch, "from wineListSearch");
  return (
    wineListSearch && (
      <div className="SearchResults">
        {wineListSearch.map((wine) => (
          <CardProduct key={wine._id} wine={wine} />
        ))}
      </div>
    )
  );
  // return <div>Search Results</div>;
}

export default SearchResults;

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`/api/v1/products?color=Red`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     };
//   }, []);

// ==================== FETCH ====================

// const fetchData = async () => {
//   const response = await fetch(`/api/v1/products?color=${color}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })

//   const json = await response.json();
//   if (response.ok) {
//       const data = JSON.stringify(json);
//       const parsedData = await JSON.parse(data);
//     return parsedData;
//   }

//   if (!response.ok) {
//     throw Error(json.error);
//   }
// };

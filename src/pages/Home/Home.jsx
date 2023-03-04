import React, { useRef, useState } from "react";
import "./Home.css";
// import axios from "axios";
import Slider from "./../../components/Slider/Slider";
import Categories from "../../components/Categories/Categories";
import News from "../../components/News/News";
// import CardProduct from "../../components/Card/CardProduct";
import WineList from "../../components/WineList/WineList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWineList, selectWineList } from "../../redux/productReducer";
import Loader from "../../components/Loader/Loader";

function Home() {
  // const [wineList, setWineList] = useState([]);

  // useEffect(() => {
  //   const fetchWineList = async () => {
  //     const { data } = await axios.get("/api/v1/products");

  //     setWineList(data);
  //   };

  //   fetchWineList();
  // }, []);

  const dispatch = useDispatch();

  //const shouldRequest = useRef(true); //this hook has a "current" property that persists it's value throughout the lifetime of the component. So, even on the "mount" and "unmount" it will retain it's value.

  useEffect(() => {
    //if (shouldRequest.current) {
      //shouldRequest.current = false;
      dispatch(getWineList());
    //}
  }, [dispatch]);

  const wineList = useSelector(selectWineList);

  const data = [...wineList].sort((a, b) =>
    b._id.split("")[b._id.length - 1] < a._id.split("")[a._id.length - 1]
      ? 1
      : b._id.split("")[b._id.length - 1] > a._id.split("")[a._id.length - 1]
      ? -1
      : 0
  );
  const result = data.slice(1, 20);

  // const wineList = useSelector(({ selectWineList }) => {
  //   return [...selectWineList].sort((a, b) => {
  //     return b._id - a._id;
  //   });
  // });

  return (
    <div className="home">
      <Slider />
      <Categories />
      {wineList ? <WineList wineList={result} /> : <Loader />}
      <News />
    </div>
  );
}

export default Home;

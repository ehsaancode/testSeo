import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ScreenWidthContext } from "../../routes/index";
import Home_desktop from "./Desktop/Home";
import Home_mobile from "./Mobile/Home";

const Home = () => {
   const screenWidth = useContext(ScreenWidthContext);
   if (screenWidth >= 800) {
      return <Home_desktop/>;
    } else {
      return <Home_mobile/>;
    }
};

export default Home;

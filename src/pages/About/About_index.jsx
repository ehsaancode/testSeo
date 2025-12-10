import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ScreenWidthContext } from "../../routes/index";
import About_desktop from "./Desktop/About";
import About_mobile from "./Mobile/About";

const About = () => {
   const screenWidth = useContext(ScreenWidthContext);
   if (screenWidth >= 800) {
      return <About_desktop/>;
    } else {
      return <About_mobile/>;
    }
};

export default About;

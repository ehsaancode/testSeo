import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ScreenWidthContext } from "../../routes/index";
import Contact_desktop from "./Desktop/Contact";
import Contact_mobile from "./Mobile/Contact";

const Contact = () => {
   const screenWidth = useContext(ScreenWidthContext);
   if (screenWidth >= 800) {
      return <Contact_desktop/>;
    } else {
      return <Contact_mobile/>;
    }
};

export default Contact;

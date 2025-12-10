import React, { useState } from "react";
import { ApiUtils, UIUtils, NavigationUtils } from "../../../utils/actionUtils";
import componentsMap from "../../../qlib/componentsMap";
import { useLocation } from "react-router-dom";
import { renderComponent } from "../../../qlib/renderComponent";
import { get, setFormErrorSet, set, subscribe } from "../../../store/index";
import AboutScene from "./AboutScene";

const { QActionFlow } = componentsMap;

export const About = () => {
  const [scene, setScene] = useState("AboutScene");
  

  return (
    <>
      {
        scene === "AboutScene" ? (
          <AboutScene/>
        ) :
       (
        <></>
      )}
    </>
  );
};

export default About;

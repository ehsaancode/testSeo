import React, { useState } from "react";
import { ApiUtils, UIUtils, NavigationUtils } from "../../../utils/actionUtils";
import componentsMap from "../../../qlib/componentsMap";
import { useLocation } from "react-router-dom";
import { renderComponent } from "../../../qlib/renderComponent";
import { get, setFormErrorSet, set, subscribe } from "../../../store/index";
import HomeScene from "./HomeScene";

const { QActionFlow } = componentsMap;

export const Home = () => {
  const [scene, setScene] = useState("HomeScene");
  

  return (
    <>
      {
        scene === "HomeScene" ? (
          <HomeScene/>
        ) :
       (
        <></>
      )}
    </>
  );
};

export default Home;

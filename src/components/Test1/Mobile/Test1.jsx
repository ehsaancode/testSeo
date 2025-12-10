import React, { useState } from "react";
import { ApiUtils, UIUtils, NavigationUtils } from "../../../utils/actionUtils";
import componentsMap from "../../../qlib/componentsMap";
import { useLocation } from "react-router-dom";
import { renderComponent } from "../../../qlib/renderComponent";
import { get, setFormErrorSet, set, subscribe } from "../../../store/index";
import Test1Scene from "./Test1Scene";
import Scene0 from "./Scene0";
import Test1Copy from "./Test1Copy";

const { QActionFlow } = componentsMap;

export const Test1 = () => {
  const [scene, setScene] = useState("Test1Scene");
  

  return (
    <>
      {
        scene === "Test1Scene" ? (
          <Test1Scene/>
        ) :
        scene === "Scene0" ? (
          <Scene0/>
        ) :
        scene === "Test1Copy" ? (
          <Test1Copy/>
        ) :
       (
        <></>
      )}
    </>
  );
};

export default Test1;

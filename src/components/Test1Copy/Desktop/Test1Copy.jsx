import React, { useState } from "react";
import { ApiUtils, UIUtils, NavigationUtils } from "../../../utils/actionUtils";
import componentsMap from "../../../qlib/componentsMap";
import { useLocation } from "react-router-dom";
import { renderComponent } from "../../../qlib/renderComponent";
import { get, setFormErrorSet, set, subscribe } from "../../../store/index";
import Test1CopyScene from "./Test1CopyScene";

const { QActionFlow } = componentsMap;

export const Test1Copy = () => {
  const [scene, setScene] = useState("Test1CopyScene");
  

  return (
    <>
      {
        scene === "Test1CopyScene" ? (
          <Test1CopyScene/>
        ) :
       (
        <></>
      )}
    </>
  );
};

export default Test1Copy;

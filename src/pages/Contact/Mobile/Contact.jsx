import React, { useState } from "react";
import { ApiUtils, UIUtils, NavigationUtils } from "../../../utils/actionUtils";
import componentsMap from "../../../qlib/componentsMap";
import { useLocation } from "react-router-dom";
import { renderComponent } from "../../../qlib/renderComponent";
import { get, setFormErrorSet, set, subscribe } from "../../../store/index";
import ContactScene from "./ContactScene";

const { QActionFlow } = componentsMap;

export const Contact = () => {
  const [scene, setScene] = useState("ContactScene");
  

  return (
    <>
      {
        scene === "ContactScene" ? (
          <ContactScene/>
        ) :
       (
        <></>
      )}
    </>
  );
};

export default Contact;

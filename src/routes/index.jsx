import React, { useState, useEffect, createContext } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { get, set, subscribe } from "../store/index";
import QModalContainer from "../qlib/qmodal/QModalContainer";
import QSeo from "../qlib/qseo/QSeo";
import { seoArray } from "../utils/SeoArray.jsx";

// ✅ Create context here (no separate file)
export const ScreenWidthContext = createContext();

// ✅ Layouts
import DefaultLayout from "../layouts/defaultlayout/index";


// ✅ Pages
import Home from "../pages/Home/Home_index";
import About from "../pages/About/About_index";
import Contact from "../pages/Contact/Contact_index";

// ✅ Model

function AppRoutes() {
  const location = useLocation();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  
  }, []);

  const routes = useRoutes([
      {
        element: <DefaultLayout />,
        children: [{ path: "/", element: <Home /> }],
      },
      {
        element: <DefaultLayout />,
        children: [{ path: "/Home", element: <Home /> }],
      },
      {
        element: <DefaultLayout />,
        children: [{ path: "/About", element: <About /> }],
      },
      {
        element: <DefaultLayout />,
        children: [{ path: "/Contact", element: <Contact /> }],
      },
  ]);


  //SEO
  const seoContentValues = Object.fromEntries(
  seoArray.map(item => [item.route_path, item])
  );

  // Normalize path: remove trailing slash unless it's just "/"
  const normalizedPath = location.pathname.length > 1 && location.pathname.endsWith("/") ? location.pathname.slice(0, -1)
  : location.pathname;

  const currentSEO = seoContentValues[normalizedPath] || seoContentValues["/"] || {};

  return (
    <>
    <QSeo {...currentSEO} />
    <ScreenWidthContext.Provider value={screenWidth}>
      {routes}
    </ScreenWidthContext.Provider>
    </>
  );
}

export default AppRoutes;
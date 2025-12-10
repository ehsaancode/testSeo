import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ApiUtils, UIUtils, NavigationUtils } from "../../../utils/actionUtils";
import componentsMap from "../../../qlib/componentsMap";
import { useLocation } from "react-router-dom";
import { renderComponent } from "../../../qlib/renderComponent";
import { Outlet } from "react-router-dom";
import { get, setFormErrorSet, set, subscribe } from "../../../store/index";
import { QFormSubmit } from "../../../qlib/qform/QFormSubmit";
import { useModal } from "../../../qlib/qmodal/QModalProvider";




const {
  QFullWidth,
  QRow,
  QDiv,
  QParagraph,
  QTextH6,
  QTextH5,
  QTextH4,
  QTextH3,
  QTextH2,
  QTextH1,
  QImage,
  QButton,
  QParallax,
  QMarquee,
  QStack,
  QIncrementCounter,
  QSlider,
  QAccordion,
  QAccordionItem,
  QAccordionBody,
  QWrap,
  QHorizontalParallax,
  QTabBar,
  QTab,
  QTabBody,
  QTabHeader,
  QFloatingButton,
  QDrawer,
  QDrawerBody,
  QStickyHeader,
  QHeaderBar,
  QForm,
  QFormInputElement,
  QInputText,
  QTextArea,
  QNSection,
  QMenuBar,
  QHMenuItem,
  QMenu,
  QSubMenu,
  QInputEmail,
  QInputNumber,
  QRadio,
  QCheckBox,
  QDropDown,
  QTableData,
  QTableWrapper,
  QRepeat,
  QTableSearch,
  QInputSearch,
  QIcon,
  QTablePagination,
  QTablePaginationButton,
  QPageIndicator,
  QTablePaginationInfo,
  QTablePaginationRPP,
  QTableSort,
  QTableFilter,
  QMap,
  QBottomMenu,
  QFlex,
  QVideo,
  QSection,
  QNavbar,
  QCustom,
  QGallery,
  QMasonary,
  QProgressbarWithPercentage,
  QProgressbarWithStepper,
  QDashedProgressbar,
  QProgressbarWithSlider,
  QBackDrop,
  QCarousel,
  QErrorMessage,
  QDatePicker,
  QTimePicker,
  QDateRangePicker,
   QTable,
  QColumnHeaders,
  QColumnHeader,
  QTableRows,
  QTableRow,
  QTableCell,
  QMultiSelectDropdown,
  QActionFlow,
  QModalContainer,
   QColumnChart,
  QAreaChart,
  QLineChart,
  QBarChart,
  QPieChart
} = componentsMap;



export const HomeScene = () => {
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const location = useLocation();
const lastSegment = location.pathname.split("/").filter(Boolean).pop();
const [openMenus, setOpenMenus] = useState({});
const [hoverTimeouts, setHoverTimeouts] = useState({});
const { openModal, closeModal  } = useModal();


const [defaultPieChartState943, setDefaultPieChartState943] = useState({"dataMap":{"Sales":60,"Marketing":25,"Support":15}});
const [defaultColumnChartState1101, setDefaultColumnChartState1101] = useState({"data":[{"label":"January","value":45,"color":"#A7D1FB"},{"label":"February","value":82,"color":"#8AC4FF"},{"label":"March","value":78,"color":"#A7D1FB"},{"label":"April","value":56,"color":"#CADDF0"},{"label":"May","value":89,"color":"#8AC4FF"}]});
const [defaultAreaChartState1109, setDefaultAreaChartState1109] = useState({"series":[{"name":"Product A","color":4285372612,"strokeWidth":3,"showMarkers":true,"markerSize":4,"markerShape":"circle","data":[{"x":1,"y":2},{"x":2,"y":5},{"x":3,"y":9},{"x":4,"y":2},{"x":5,"y":4},{"x":6,"y":9},{"x":7,"y":3},{"x":8,"y":6},{"x":9,"y":1},{"x":10,"y":2}]}],"showLegend":true,"enableTooltip":true,"animationDuration":2000,"animationCurve":"easeInOut","title":"Line Chart - Sales Data (10 Points)","backgroundColor":3825528926,"chartConfig":{"enableDataSampling":true,"maxDataPoints":20,"targetDataPoints":20,"showSamplingInfo":false},"xAxis":{"showGridLines":true,"showLabels":true,"gridLineWidth":1,"gridLineColor":4292927712,"minimum":0,"maximum":10},"yAxis":{"showGridLines":true,"showLabels":true,"gridLineWidth":1,"gridLineColor":4292927712,"minimum":0,"maximum":100}});
const [defaultLineChartState1263, setDefaultLineChartState1263] = useState({"series":[{"name":"Product A","color":"#6D98C4","strokeWidth":3,"showMarkers":true,"markerSize":4,"markerShape":"circle","data":[{"x":1,"y":2},{"x":2,"y":5},{"x":3,"y":9},{"x":4,"y":2},{"x":5,"y":4},{"x":6,"y":9},{"x":7,"y":3},{"x":8,"y":6},{"x":9,"y":1},{"x":10,"y":2}]}],"showLegend":true,"enableTooltip":true,"animationDuration":2000,"animationCurve":"easeInOut","title":"Line Chart - Sales Data","backgroundColor":"#04F05E","xAxis":{"showGridLines":true,"showLabels":true,"gridLineColor":"#E0E0E0","minimum":0,"maximum":10},"yAxis":{"showGridLines":true,"showLabels":true,"gridLineColor":"#E0E0E0","minimum":0,"maximum":100}});
const [defaultPieChartState1264, setDefaultPieChartState1264] = useState({"dataMap":{"Sales":60,"Marketing":25,"Support":15}});
const [defaultBarChartState1265, setDefaultBarChartState1265] = useState({"data":[{"label":"January","value":45,"color":"#A7D1FB"},{"label":"February","value":82,"color":"#8AC4FF"},{"label":"March","value":78,"color":"#A7D1FB"},{"label":"April","value":56,"color":"#CADDF0"},{"label":"May","value":89,"color":"#8AC4FF"}]});
const [defaultColumnChartState1266, setDefaultColumnChartState1266] = useState({"data":[{"label":"January","value":45,"color":"#A7D1FB"},{"label":"February","value":82,"color":"#8AC4FF"},{"label":"March","value":78,"color":"#A7D1FB"},{"label":"April","value":56,"color":"#CADDF0"},{"label":"May","value":89,"color":"#8AC4FF"}]});

  
useEffect(() => {
  Object.values(hoverTimeouts).forEach(clearTimeout);
  return () => {
    Object.values(hoverTimeouts).forEach(clearTimeout);
  };
}, [hoverTimeouts]);

useEffect(() => {
  setOpenMenus({});
}, [lastSegment]);

const handleMouseEnter = (menuId, parentIds = []) => {
  setOpenMenus((prev) => {
    let newMenus = { ...prev, [menuId]: true };
    // Ensure all parent menus in the array remain open
    parentIds.forEach((parent) => {
      newMenus[parent] = true;
    });

    const timeout = setTimeout(() => {
      // Close only sibling menus (menus at the same level)
      Object.keys(prev).forEach((key) => {
        if (key !== menuId && !parentIds.includes(key)) {
          delete newMenus[key];
        }
      });
    }, 1500);

    return newMenus;
  });
};

const handleMouseLeave = (menuId) => {
  // Set a timeout to close the menu with a delay (prevents flickering)
  const timeout = setTimeout(() => {
    setOpenMenus((prev) => {
      const updatedMenus = { ...prev };
      delete updatedMenus[menuId]; // Close only this menu
      return updatedMenus;
    });
  }, 1500);

  setHoverTimeouts((prev) => ({
    ...prev,
    [menuId]: timeout,
  }));
};

// CLOSE ALL MENUS WHEN MOVING TO A NEW TOP-LEVEL MENU
const handleTopMenuEnter = (menuId) => {
  // Clear all open submenus except the one being hovered
  setOpenMenus({});
  // Clear any timeout preventing closure
  if (hoverTimeouts[menuId]) {
    clearTimeout(hoverTimeouts[menuId]);
  }
};

useEffect(() => {
  return () => {
    // Cleanup all timeouts when component unmounts
    Object.values(hoverTimeouts).forEach(clearTimeout);
  };
}, [hoverTimeouts]);




const actions = {
  };


return (
<>
         <QSection
          widgetId="1763470248191508"
          tailwaindClasses="w-full min-h-[400px] h-auto relative block"
        >
            <QFlex
             widgetId="1764676791175412"
             headerText="Add Widgets"
             tailwaindClasses="w-full min-h-[100px] h-auto static block"
           >

            </QFlex>
            <QAreaChart
             widgetId="1764749324008545"
             tailwaindClasses="min-w-[400px] w-[auto] min-h-[300px] h-auto static"
           />

         </QSection>
         <QSection
          widgetId="1764241287552808"
          tailwaindClasses="w-full min-h-[400px] h-auto relative block"
        >
            <QStack
             widgetId="1764241291030651"
             headerText="Add widgets"
             tailwaindClasses="w-full min-h-[100px] h-[306.14px] static"
           >
               <QFlex
                isAbsoluteValue="true"
                widgetId="extra1764581299508387"
                headerText="Add widgets"
                tailwaindClasses="w-full h-full static flex flex-col justify-start items-start"
              >

               </QFlex>
               <QLineChart
                isAbsoluteValue="true"
                widgetId="1765274506053267"
                tailwaindClasses="min-w-[400px] w-[auto] min-h-[300px] h-auto static"
              />

            </QStack>
            <QBarChart
             widgetId="1765274514211920"
             tailwaindClasses="min-w-[400px] w-[auto] min-h-[300px] h-auto static"
           />
            <QColumnChart
             widgetId="1765274516917061"
             tailwaindClasses="min-w-[400px] w-[auto] min-h-[300px] h-auto static"
           />

         </QSection>
</> );
};

export default HomeScene;
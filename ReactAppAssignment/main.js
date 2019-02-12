// 1. Import React OM
import React from "react";
// 2. Import ReactDOM for rendering React Component in DOM
import ReactDom from "react-dom";
import "!style!css!bootstrap/dist/css/bootstrap.min.css";

import SimpleComponent from "./components/SimpleComponent.jsx";
import ProductComponent  from "./components/applications/ProductComponent.jsx";
import ProductUIComponent from "./components/applications/ProductUIComponent.jsx"

ReactDom.render(<ProductUIComponent/>, document.getElementById("app"));

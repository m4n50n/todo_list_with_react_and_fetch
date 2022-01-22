// import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include styles into the webpack bundle
import "../styles/index.css";

// import components
import Home from "./component/home.jsx";

// render react application
ReactDOM.render(<Home />, document.querySelector("#app"));

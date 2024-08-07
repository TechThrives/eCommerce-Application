import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/theme.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import { Config } from "./script";

const config = new Config();
config.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

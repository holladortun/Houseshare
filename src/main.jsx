import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

ReactDOM.createRoot(document.getElementById("roo")).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
        <ToastContainer transition={Slide} />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
